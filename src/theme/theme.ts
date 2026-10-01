import { createTheme, responsiveFontSizes, ThemeOptions } from '@mui/material/styles';
import { Plus_Jakarta_Sans } from 'next/font/google';

const inter = Plus_Jakarta_Sans({ subsets: ['latin'] });

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
  }
}

const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#5BA8F0' : '#0A5CB8', // Healthcare blue (lighter on dark for contrast)
      light: mode === 'dark' ? '#8EC5F7' : '#4F95DB',
      dark: mode === 'dark' ? '#3B8FE0' : '#084A94',
    },
    secondary: {
      main: '#14B5A5', // Teal
      light: '#5FD9CB',
      dark: mode === 'dark' ? '#5FD9CB' : '#0E9486',
    },
    accent: {
      main: '#2B8CE6',
      light: '#7DB8F0',
      dark: '#1A6FC4',
    },
    success: {
      main: '#2E7D32',
    },
    warning: {
      main: '#ED6C02',
    },
    error: {
      main: '#D32F2F',
    },
    background: {
      default: mode === 'light' ? '#F3F9FD' : '#0A1626',
      paper: mode === 'light' ? '#FFFFFF' : '#14294A',
    },
    text: {
      primary: mode === 'light' ? '#0B1F3A' : '#F1F5F9',
      secondary: mode === 'light' ? '#51627A' : '#94A3B8',
    },
    divider: mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.14)',
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: { fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.08 },
    h2: { fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.2 },
    h3: { fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3 },
    h4: { fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.4 },
    h5: { fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.5 },
    h6: { fontWeight: 600, letterSpacing: '0', lineHeight: 1.6 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
    body1: { lineHeight: 1.75, letterSpacing: '0' },
    body2: { fontSize: '0.9rem', lineHeight: 1.65, letterSpacing: '0' },
    caption: { fontSize: '0.8125rem', lineHeight: 1.5 },
    subtitle1: { fontWeight: 600, lineHeight: 1.6, letterSpacing: '0' },
    subtitle2: { fontWeight: 600, lineHeight: 1.57, letterSpacing: '0' },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      // Raw <button>, <input> and <select> elements do not inherit the page font by default.
      styleOverrides: { html: { colorScheme: mode }, 'button, input, select, textarea': { fontFamily: 'inherit' } },
    },
    MuiTypography: {
      // Render h6 as <h3> so heading levels never skip (h1 -> h2 -> h3); MUI's default <h6> breaks the outline
      defaultProps: { variantMapping: { h6: 'h3' } },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '999px',
          boxShadow: 'none',
          padding: '12px 28px',
          fontSize: '0.95rem',
          '&:hover': { boxShadow: 'none' },
          '&.MuiButton-containedPrimary': {
            background: '#0A5CB8',
            '&:hover': {
              background: '#084A94',
              boxShadow: '0 6px 20px rgba(10, 92, 184, 0.4)',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          border: mode === 'light' ? '1px solid rgba(10,92,184,0.08)' : '1px solid rgba(255,255,255,0.12)',
          boxShadow:
            mode === 'light'
              ? '0px 8px 30px rgba(10, 92, 184, 0.07)'
              : '0px 8px 30px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

// responsiveFontSizes scales headings down on narrow screens (MUI's default h1-h2 sizes overflow at 320-414px).
export const lightTheme = responsiveFontSizes(createTheme(getDesignTokens('light')));
export const darkTheme = responsiveFontSizes(createTheme(getDesignTokens('dark')));
