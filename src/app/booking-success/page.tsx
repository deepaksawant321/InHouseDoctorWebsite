'use client';

import { Box, Container, Typography, alpha } from '@mui/material';
import Grid from '@mui/material/Grid';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { m as motion } from 'framer-motion';
import { BookingStepper } from '@/features/booking/BookingStepper';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function BookingSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingRef = searchParams.get('ref');
  const prescriptionFailed = searchParams.get('rx') === 'failed';

  return (
    <>
      <BookingStepper />

      <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: 'background.default', minHeight: '80vh' }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <CheckCircleOutlinedIcon sx={{ fontSize: 120, color: '#25D366', mb: 3 }} />
            </motion.div>

            <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
              Booking Created Successfully!
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 6 }}>
              Our team will verify your payment and assign a doctor shortly.
            </Typography>

            <Box sx={{ display: 'inline-block', p: 3, borderRadius: '24px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', boxShadow: '0 8px 32px rgba(0,0,0,0.04)' }}>
              {bookingRef && (
                <>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Booking ID</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', letterSpacing: 2, mb: 3 }}>
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

          <Grid container spacing={3} sx={{ mb: 8, maxWidth: 600, mx: 'auto' }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ p: 2, borderRadius: '16px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ bgcolor: alpha('#0A5CB8', 0.1), color: 'primary.main', p: 1, borderRadius: 2 }}><EmailIcon /></Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>Email</Typography>
                  <Typography variant="caption" color="text.secondary">Confirmation sent to your email on file</Typography>
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
            <Box
              component="button" onClick={() => router.push('/dashboard')}
              sx={{
                py: 2, px: { xs: 3, sm: 6 }, borderRadius: '999px', border: '1px solid', borderColor: 'primary.main', cursor: 'pointer',
                bgcolor: 'transparent', color: 'primary.main', fontWeight: 700, fontSize: '1rem',
                transition: 'all 0.2s', '&:hover': { bgcolor: alpha('#0A5CB8', 0.05) },
              }}
            >
              Go to Dashboard
            </Box>
            <Box
              component="button" onClick={() => router.push('/book/service')}
              sx={{
                py: 2, px: { xs: 3, sm: 6 }, borderRadius: '999px', border: 'none', cursor: 'pointer',
                background: '#0A5CB8', color: 'white',
                fontWeight: 700, fontSize: '1rem', boxShadow: '0 8px 24px rgba(10, 92, 184, 0.3)',
                transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)' },
              }}
            >
              Book Another Service
            </Box>
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
