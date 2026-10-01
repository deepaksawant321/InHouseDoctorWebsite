'use client';

import { Autocomplete, Box, Chip, TextField, Typography, createFilterOptions } from '@mui/material';

export interface Professional {
  id: string;
  name?: string;
  specialization?: string;
  experienceYears?: number;
  isAvailable?: boolean;
  [key: string]: unknown;
}

const NON_PHYSICIAN = ['Elder Care', 'Nursing Care', 'Physiotherapy'];

/** "Dr." only for physician roles. */
export const professionalLabel = (d?: Professional | null) =>
  d ? `${NON_PHYSICIAN.includes(d.specialization ?? '') ? '' : 'Dr. '}${String(d.name ?? '').replace(/^dr\.?\s+/i, '')}` : '';

// Search matches name, type (specialization) and experience text
const filterOptions = createFilterOptions<Professional>({
  stringify: (d) => `${professionalLabel(d)} ${d.specialization ?? ''}`,
});

interface ProfessionalSelectProps {
  options: Professional[];
  value: string;
  onChange: (id: string) => void;
  placeholder?: string;
  label?: string;
  ariaLabel: string;
  minWidth?: number;
  disabled?: boolean;
}

/** Searchable professional picker: type to filter by name or type, results grouped by type. */
export const ProfessionalSelect = ({ options, value, onChange, placeholder = 'Search professional…', label, ariaLabel, minWidth = 260, disabled }: ProfessionalSelectProps) => {
  // Sorted by type so the group headers are contiguous (MUI requires this for groupBy)
  const sorted = [...options].sort((a, b) => (a.specialization ?? '').localeCompare(b.specialization ?? '') || (a.name ?? '').localeCompare(b.name ?? ''));
  const selected = options.find((o) => o.id === value) ?? null;

  return (
    <Autocomplete<Professional>
      size="small"
      disabled={disabled}
      options={sorted}
      value={selected}
      onChange={(_e, v) => onChange(v?.id ?? '')}
      isOptionEqualToValue={(a, b) => a.id === b.id}
      getOptionLabel={professionalLabel}
      groupBy={(o) => o.specialization || 'Other'}
      filterOptions={filterOptions}
      noOptionsText="No matching professionals"
      sx={{ minWidth, width: '100%' }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} slotProps={{ ...params.slotProps, htmlInput: { ...params.slotProps.htmlInput, 'aria-label': ariaLabel } }} />
      )}
      renderOption={(props, o) => {
        const { key, ...rest } = props as typeof props & { key: string };
        return (
          <li key={key} {...rest}>
            <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
              <Typography sx={{ fontWeight: 600 }} noWrap>{professionalLabel(o)}</Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {[o.specialization, o.experienceYears != null ? `${o.experienceYears} yrs` : null].filter(Boolean).join(' • ')}
              </Typography>
            </Box>
            {o.isAvailable === false && <Chip size="small" label="Unavailable" color="warning" variant="outlined" sx={{ ml: 1 }} />}
          </li>
        );
      }}
    />
  );
};
