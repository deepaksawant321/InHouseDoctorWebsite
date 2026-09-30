'use client';

import { Box, Container } from '@mui/material';
import { BookingStepper } from '@/features/booking/BookingStepper';
import { BookingProvider } from '@/providers/BookingProvider';

export default function BookingShell({ children }: { children: React.ReactNode }) {
  return (
    <BookingProvider>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <BookingStepper />
        <Box component="section" sx={{ py: { xs: 8, md: 10 } }}>
          <Container maxWidth="md">
            {children}
          </Container>
        </Box>
      </Box>
    </BookingProvider>
  );
}
