'use client';

import { Box, Button, Container, Typography, alpha } from '@mui/material';
import Grid from '@mui/material/Grid';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { m as motion } from 'framer-motion';
import { BookingStepper } from '@/features/booking/BookingStepper';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

function BookingSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingRef = searchParams.get('no') || searchParams.get('ref');
  const prescriptionFailed = searchParams.get('rx') === 'failed';

  // Opening this page without a booking reference (typed URL, old bookmark) would claim a booking that doesn't exist.
  useEffect(() => {
    if (!bookingRef) router.replace('/dashboard/bookings');
  }, [bookingRef, router]);
  if (!bookingRef) return null;

  return (
    <>
      <BookingStepper />

      <Box component="section" sx={{ py: { xs: 5, md: 8 }, bgcolor: 'background.default', minHeight: '80vh' }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <CheckCircleOutlinedIcon sx={{ fontSize: 88, color: '#25D366', mb: 2 }} />
            </motion.div>

            <Typography component="h1" variant="subtitle1" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 800, lineHeight: 1.3, mb: 1.5 }}>
              Booking Created Successfully!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
              Our team will verify your payment and assign a doctor shortly.
            </Typography>

            <Box sx={{ display: 'inline-block', p: 3, borderRadius: '24px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', boxShadow: '0 8px 32px rgba(0,0,0,0.04)' }}>
              {bookingRef && (
                <>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Booking ID</Typography>
                  <Typography component="p" variant="subtitle1" sx={{ fontSize: '1.4rem', fontWeight: 800, color: 'primary.main', letterSpacing: 1, mb: 2 }}>
                    {bookingRef}
                  </Typography>
                </>
              )}

              {prescriptionFailed && (
                <Typography variant="body2" color="error" role="alert" sx={{ mb: 2 }}>
                  Your booking was created, but the prescription upload failed. Please share it from your dashboard or with our team.
                </Typography>
              )}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', bgcolor: alpha('#FFA000', 0.1), color: '#F57C00', py: 1, px: 3, borderRadius: 6 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Status: Pending Verification</Typography>
              </Box>
            </Box>
          </Box>

          <Grid container spacing={3} sx={{ mb: 5, maxWidth: 600, mx: 'auto' }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ p: 2, borderRadius: '16px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ bgcolor: alpha('#0A5CB8', 0.1), color: 'primary.main', p: 1, borderRadius: 2 }}><EmailIcon /></Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>Email</Typography>
                  <Typography variant="caption" color="text.secondary">Confirmation sent to your email</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ p: 2, borderRadius: '16px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ bgcolor: alpha('#0A5CB8', 0.1), color: 'primary.main', p: 1, borderRadius: 2 }}><NotificationsIcon /></Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>Dashboard</Typography>
                  <Typography variant="caption" color="text.secondary">Track status under My Bookings</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 3 }, justifyContent: 'center' }}>
            <Button variant="outlined" size="large" onClick={() => router.push('/dashboard')} sx={{ px: { xs: 3, sm: 6 } }}>
              Go to Dashboard
            </Button>
            <Button variant="contained" size="large" onClick={() => router.push('/book/service')} sx={{ px: { xs: 3, sm: 6 } }}>
              Book Another Service
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={null}>
      <BookingSuccessContent />
    </Suspense>
  );
}
