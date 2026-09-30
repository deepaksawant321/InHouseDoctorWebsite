/** "Dr." prefix that never doubles up when the stored name already starts with "Dr". */
export const formatDoctorName = (name?: string | null): string => {
  const n = (name || '').trim();
  if (!n) return 'Unassigned';
  return /^dr\.?(\s|$)/i.test(n) ? n : `Dr. ${n}`;
};
