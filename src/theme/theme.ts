import { createTheme, ThemeOptions } from '@mui/material/styles';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

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
      main: '#4F46E5', // Indigo
      light: '#818CF8',
      dark: '#3730A3',
    },
    secondary: {
      main: '#0D9488', // Teal
      light: '#2DD4BF',
      dark: '#0F766E',
    },
    accent: {
      main: '#6C63FF',
      light: '#9D97FF',
      dark: '#4B44CC',
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
      default: mode === 'light' ? '#F8FAFD' : '#0B1220',
      paper: mode === 'light' ? '#FFFFFF' : '#111827',
    },
    text: {
      primary: mode === 'light' ? '#0D1117' : '#F1F5F9',
      secondary: mode === 'light' ? '#4B5563' : '#94A3B8',
    },
    divider: mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: { fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.1 },
    h2: { fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.2 },
    h3: { fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3 },
    h4: { fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.4 },
    h5: { fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.5 },
    h6: { fontWeight: 600, letterSpacing: '0', lineHeight: 1.6 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
    body1: { lineHeight: 1.75, letterSpacing: '0' },
    body2: { lineHeight: 1.65, letterSpacing: '0' },
    subtitle1: { fontWeight: 600, lineHeight: 1.6, letterSpacing: '0' },
    subtitle2: { fontWeight: 600, lineHeight: 1.57, letterSpacing: '0' },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '14px',
          boxShadow: 'none',
          padding: '12px 28px',
          fontSize: '0.95rem',
          '&:hover': { boxShadow: 'none' },
          '&.MuiButton-containedPrimary': {
            background: 'linear-gradient(135deg, #4F46E5 0%, #0D9488 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #3730A3 0%, #0F766E 100%)',
              boxShadow: '0 6px 20px rgba(79, 70, 229, 0.4)',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          boxShadow:
            mode === 'light'
              ? '0px 8px 30px rgba(0, 0, 0, 0.04)' // Softer and more dispersed shadow
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

export const lightTheme = createTheme(getDesignTokens('light'));
export const darkTheme = createTheme(getDesignTokens('dark'));
