'use client';

import { Box, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { usePathname } from 'next/navigation';
import { BookingStepper } from '@/features/booking/BookingStepper';
import { BookingSummary } from '@/features/booking/BookingSummary';
import { BookingAside } from '@/features/booking/BookingAside';
import { BookingProvider } from '@/providers/BookingProvider';

export default function BookingShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // The payment step already shows a detailed summary beside the payment form.
  const showSummary = pathname !== '/book/payment';

  return (
    <BookingProvider>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <BookingStepper />
        <Box component="section" sx={{ py: { xs: 4, md: 8 } }}>
          <Container maxWidth={showSummary ? 'lg' : 'md'}>
            {showSummary ? (
              <Grid container spacing={{ xs: 3, md: 6 }}>
                {/* Mobile: collapsible recap above the step. Desktop: sticky card beside it. */}
                <Grid size={{ xs: 12 }} sx={{ display: { md: 'none' } }}>
                  <BookingSummary collapsible />
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>{children}</Grid>
                <Grid size={{ md: 4 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Box sx={{ position: 'sticky', top: 96 }}>
                    <BookingAside />
                  </Box>
                </Grid>
              </Grid>
            ) : (
              children
            )}
          </Container>
        </Box>
      </Box>
    </BookingProvider>
  );
}
