'use client';

import { Box, Container } from '@mui/material';
import { BookingStepper } from '@/features/booking/BookingStepper';

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <BookingStepper />
      <Box component="section" sx={{ py: { xs: 8, md: 10 } }}>
        <Container maxWidth="md">
          {children}
        </Container>
      </Box>
    </Box>
  );
}
