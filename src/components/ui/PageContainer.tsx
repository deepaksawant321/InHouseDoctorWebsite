import { Box, BoxProps } from '@mui/material';
import { ReactNode } from 'react';

export const PageContainer = ({ children, ...props }: BoxProps & { children: ReactNode }) => {
  return (
    <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', pt: '80px' }} {...props}>
      {children}
    </Box>
  );
};
