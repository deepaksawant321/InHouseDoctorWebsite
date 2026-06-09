'use client';

import { Box, Typography, TextField, Divider, alpha } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadZone } from '@/features/booking/UploadZone';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useBooking } from '@/providers/BookingProvider';
import { apiClient } from '@/services/apiClient';

export default function PaymentPage() {
  const router = useRouter();
  const { state } = useBooking();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBooking = async () => {
    setIsSubmitting(true);
    try {
      // 1. Create Booking
      const bookingRes = await apiClient.post('/bookings', {
        doctorId: state.doctorId,
        scheduledDate: state.scheduledDate,
        symptoms: state.symptoms
      });
      const bookingId = bookingRes.data.data.id;

      // 2. Initiate Payment Mock
      await apiClient.post('/payments/initiate', {
        bookingId,
        amount: state.amount,
        paymentMethod: 'UPI'
      });

      router.push('/booking-success');
    } catch (error) {
      console.error(error);
      alert('Failed to complete booking. Ensure you are logged in.');
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
        Payment & Confirmation
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
        Scan the QR code below to complete your booking.
      </Typography>

      <Grid container spacing={6} sx={{ mb: 6 }}>
        {/* Left Column: QR Code & Upload */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={{ p: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', mb: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              Scan with any UPI App
            </Typography>
            <Box sx={{ width: 200, height: 200, mx: 'auto', mb: 3, bgcolor: alpha('#1976D2', 0.05), border: '2px solid', borderColor: 'primary.main', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <QrCode2Icon sx={{ fontSize: 100, color: 'primary.main' }} />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>UPI ID</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, letterSpacing: 1 }}>pay.inhousedoctor@upi</Typography>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Payment Details</Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth label="UPI Reference Number (12 digits)" variant="outlined" />
            </Grid>
          </Grid>
          
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Upload Payment Screenshot</Typography>
          <UploadZone />
        </Grid>

        {/* Right Column: Booking Summary */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ p: 4, borderRadius: 4, border: '1px solid', borderColor: 'primary.main', bgcolor: alpha('#1976D2', 0.02) }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Booking Summary</Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Doctor</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{state.doctorName || 'Dr. Unknown'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Date & Time</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{state.scheduledDate ? new Date(state.scheduledDate).toLocaleString() : 'Tomorrow'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Location</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>123 Main St, Mumbai</Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1">Consultation Fee</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>₹{state.amount}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="body1">Platform Fee</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>₹0</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, bgcolor: alpha('#00BFA5', 0.1), borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#009688' }}>Total Payable</Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#009688' }}>₹{state.amount}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1, mt: 3, alignItems: 'center' }}>
              <CheckCircleIcon sx={{ color: 'secondary.main', fontSize: 16 }} />
              <Typography variant="caption" color="text.secondary">Secure encrypted payment</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box
          component="button" type="button" onClick={() => router.back()}
          sx={{
            py: 1.5, px: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider', cursor: 'pointer',
            bgcolor: 'transparent', color: 'text.primary', fontWeight: 600, fontSize: '1rem',
            transition: 'all 0.2s', '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          Back
        </Box>
        <Box
          component="button" type="button" onClick={handleBooking} disabled={isSubmitting}
          sx={{
            py: 1.5, px: 6, borderRadius: 3, border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer',
            background: isSubmitting ? 'action.disabledBackground' : 'linear-gradient(135deg, #1976D2, #00BFA5)', color: 'white', 
            fontWeight: 700, fontSize: '1rem', boxShadow: isSubmitting ? 'none' : '0 8px 24px rgba(25, 118, 210, 0.3)',
            transition: 'all 0.2s', '&:hover': { transform: isSubmitting ? 'none' : 'translateY(-2px)' },
          }}
        >
          {isSubmitting ? 'Processing...' : 'Submit Booking'}
        </Box>
      </Box>
    </Box>
  );
}
