'use client';

import { ReactNode, createContext, useContext, useMemo } from 'react';
import { ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '@/theme/theme';
import { useThemeMode } from '@/hooks/useThemeMode';

interface ThemeContextType {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  mode: 'light',
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { mode, toggleTheme, mounted } = useThemeMode();

  // The server (and the first client render) always use the light theme; the stored/system preference is
  // applied right after mount. Keeping the element tree identical avoids remounting the whole app (which
  // previously ran every page's effects twice) and avoids serving the page as visibility:hidden.
  const theme = useMemo(() => (mounted && mode === 'dark' ? darkTheme : lightTheme), [mode, mounted]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
