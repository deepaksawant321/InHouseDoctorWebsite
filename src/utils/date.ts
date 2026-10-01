const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const pad = (n: number) => String(n).padStart(2, '0');

function toDate(value: string | number | Date | null | undefined, utc = false): Date | null {
  if (value == null || value === '') return null;
  // A bare YYYY-MM-DD (e.g. from <input type="date">) is a calendar date: parse it in the same zone it is read in so it never shifts a day.
  const d = typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? (utc ? new Date(value + 'T00:00:00Z') : new Date(Number(value.slice(0, 4)), Number(value.slice(5, 7)) - 1, Number(value.slice(8, 10))))
    : new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * App-wide date format: dd/MMM/yyyy (e.g. 01/Oct/2026).
 * `utc: true` reads the calendar date in UTC — use it for date-only values stored as UTC midnight (e.g. scheduledDate).
 */
export function formatDate(value: string | number | Date | null | undefined, opts: { utc?: boolean; fallback?: string } = {}): string {
  const d = toDate(value, opts.utc);
  if (!d) return opts.fallback ?? '—';
  const day = opts.utc ? d.getUTCDate() : d.getDate();
  const month = opts.utc ? d.getUTCMonth() : d.getMonth();
  const year = opts.utc ? d.getUTCFullYear() : d.getFullYear();
  return `${pad(day)}/${MONTHS[month]}/${year}`;
}

/** dd/MMM/yyyy, hh:mm AM/PM (local time). */
export function formatDateTime(value: string | number | Date | null | undefined, opts: { fallback?: string } = {}): string {
  const d = toDate(value);
  if (!d) return opts.fallback ?? '—';
  const h = d.getHours();
  return `${formatDate(d)}, ${pad(h % 12 || 12)}:${pad(d.getMinutes())} ${h < 12 ? 'AM' : 'PM'}`;
}
