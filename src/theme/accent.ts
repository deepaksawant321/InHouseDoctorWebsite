// Brand accent colours are tuned for light backgrounds. On the dark theme they are too dim, so
// they are swapped for lighter equivalents of the same hue.
const DARK_ACCENTS: Record<string, string> = {
  '#0A5CB8': '#5BA8F0',
  '#2B8CE6': '#6DB6F5',
  '#14B5A5': '#2DD4BF',
  '#9333EA': '#C084FC',
  '#0284C7': '#38BDF8',
};

export const accent = (color: string, isDark: boolean) => (isDark ? DARK_ACCENTS[color] ?? color : color);
