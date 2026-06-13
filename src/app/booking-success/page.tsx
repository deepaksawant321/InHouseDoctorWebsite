'use client';

import { Box, Container, Typography, alpha } from '@mui/material';
import Grid from '@mui/material/Grid';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import SmsIcon from '@mui/icons-material/Sms';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';
import { BookingStepper } from '@/features/booking/BookingStepper';
import { useRouter } from 'next/navigation';

export default function BookingSuccessPage() {
  const router = useRouter();

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
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Booking ID</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', letterSpacing: 2, mb: 3 }}>
                IH20260001
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', bgcolor: alpha('#FFA000', 0.1), color: '#F57C00', py: 1, px: 3, borderRadius: 6 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Status: Pending Verification</Typography>
              </Box>
            </Box>
          </Box>

          <Grid container spacing={3} sx={{ mb: 8, maxWidth: 600, mx: 'auto' }}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box sx={{ p: 2, borderRadius: '16px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ bgcolor: alpha('#4F46E5', 0.1), color: 'primary.main', p: 1, borderRadius: 2 }}><SmsIcon /></Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>SMS</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>Scheduled <CheckCircleIcon sx={{ fontSize: 14, color: 'secondary.main' }} /></Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box sx={{ p: 2, borderRadius: '16px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ bgcolor: alpha('#25D366', 0.1), color: '#25D366', p: 1, borderRadius: 2 }}><WhatsAppIcon /></Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>WhatsApp</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>Scheduled <CheckCircleIcon sx={{ fontSize: 14, color: 'secondary.main' }} /></Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box sx={{ p: 2, borderRadius: '16px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ bgcolor: alpha('#4F46E5', 0.1), color: 'primary.main', p: 1, borderRadius: 2 }}><EmailIcon /></Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>Email</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>Scheduled <CheckCircleIcon sx={{ fontSize: 14, color: 'secondary.main' }} /></Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
            <Box
              component="button" onClick={() => router.push('/')}
              sx={{
                py: 2, px: 6, borderRadius: '16px', border: '1px solid', borderColor: 'primary.main', cursor: 'pointer',
                bgcolor: 'transparent', color: 'primary.main', fontWeight: 700, fontSize: '1rem',
                transition: 'all 0.2s', '&:hover': { bgcolor: alpha('#4F46E5', 0.05) },
              }}
            >
              Go to Home
            </Box>
            <Box
              component="button" onClick={() => router.push('/book/service')}
              sx={{
                py: 2, px: 6, borderRadius: '16px', border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #4F46E5, #0D9488)', color: 'white', 
                fontWeight: 700, fontSize: '1rem', boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
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
