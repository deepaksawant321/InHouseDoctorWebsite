'use client';

import { ReactNode } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import { ThemeProvider } from './ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {/* Slim framer-motion: only the DOM animation features (the `m` components) instead of the full bundle */}
        <LazyMotion features={domAnimation}>{children}</LazyMotion>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
