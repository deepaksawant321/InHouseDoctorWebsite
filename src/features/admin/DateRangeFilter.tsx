'use client';

import { Box, Button, Chip, TextField } from '@mui/material';
import { useState } from 'react';

/** Local-time YYYY-MM-DD (toISOString would shift the day in timezones ahead of UTC). */
const toYmd = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const daysAgo = (n: number) => { const d = new Date(); d.setDate(d.getDate() - n); return toYmd(d); };
export const today = () => daysAgo(0);

export const DATE_PRESETS = [
  { label: 'Today', from: () => daysAgo(0), to: () => daysAgo(0) },
  { label: 'Last 7 days', from: () => daysAgo(6), to: () => daysAgo(0) },
  { label: 'Last 30 days', from: () => daysAgo(29), to: () => daysAgo(0) },
  { label: 'All time', from: () => '', to: () => '' },
];

const isYmd = (v: string | null) => (v && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : '');

/**
 * Initial range for a page: from the URL when present (`startDate` / `endDate`, or `range=all` for explicitly
 * unfiltered), otherwise today. Lets dashboard cards deep-link to a list with the exact range they counted.
 */
export function useInitialDateRange() {
  const [initial] = useState(() => {
    const q = new URLSearchParams(typeof window === 'undefined' ? '' : window.location.search);
    const start = isYmd(q.get('startDate'));
    const end = isYmd(q.get('endDate'));
    if (start || end) return { start, end };
    if (q.get('range') === 'all') return { start: '', end: '' };
    return { start: today(), end: today() };
  });
  return initial;
}

/** Query string carrying a range to another page; unfiltered is spelled out so the target doesn't default to today. */
export function rangeQuery(start: string, end: string, extra: Record<string, string> = {}) {
  const p = new URLSearchParams(extra);
  if (start || end) {
    if (start) p.set('startDate', start);
    if (end) p.set('endDate', end);
  } else {
    p.set('range', 'all');
  }
  return `?${p.toString()}`;
}

interface DateRangeFilterProps {
  startDate: string;
  endDate: string;
  onChange: (start: string, end: string) => void;
  fromLabel?: string;
}

export const DateRangeFilter = ({ startDate, endDate, onChange, fromLabel = 'From' }: DateRangeFilterProps) => {
  const invalid = !!startDate && !!endDate && startDate > endDate;
  const activePreset = DATE_PRESETS.find((p) => p.from() === startDate && p.to() === endDate)?.label;
  const isToday = startDate === today() && endDate === today();

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>
      {DATE_PRESETS.map((p) => (
        <Chip
          key={p.label}
          label={p.label}
          clickable
          color={activePreset === p.label ? 'primary' : 'default'}
          variant={activePreset === p.label ? 'filled' : 'outlined'}
          onClick={() => onChange(p.from(), p.to())}
        />
      ))}
      <TextField type="date" size="small" label={fromLabel} slotProps={{ inputLabel: { shrink: true }, htmlInput: { max: endDate || undefined } }}
        value={startDate} error={invalid} onChange={(e) => onChange(e.target.value, endDate)} />
      <TextField type="date" size="small" label="To" slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: startDate || undefined } }}
        value={endDate} error={invalid} helperText={invalid ? 'End is before start' : undefined} onChange={(e) => onChange(startDate, e.target.value)} />
      {!isToday && <Button variant="text" onClick={() => onChange(today(), today())}>Clear</Button>}
    </Box>
  );
};
