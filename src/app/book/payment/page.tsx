'use client';

import { Box, Typography, TextField, Divider, alpha } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadZone } from '@/features/booking/UploadZone';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useBooking } from '@/providers/BookingProvider';
import { addressesApi, bookingsApi, paymentsApi, settingsApi } from '@/services/api';

// Development only: lets testers book without paying when the API's mock gateway is on. Never set in production.
const ALLOW_SIMULATED_PAYMENT = process.env.NEXT_PUBLIC_ALLOW_SIMULATED_PAYMENT === 'true';

export default function PaymentPage() {
  const router = useRouter();
  const { state, prescriptionFile, resetBooking } = useBooking();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [upiRef, setUpiRef] = useState('');
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  // If the booking was created but the payment step failed, retry only the payment (no duplicate booking).
  const createdBookingId = useRef<string | null>(null);
  const [settings, setSettings] = useState<{ primaryUpiId?: string | null; qrCodeImage?: string | null } | null>(null);
  const [addressText, setAddressText] = useState<string>('');

  useEffect(() => {
    settingsApi.get().then((res) => setSettings(res.data.data)).catch(() => setSettings(null));
  }, []);

  useEffect(() => {
    if (!state.addressId) return;
    addressesApi.getById(state.addressId)
      .then((res) => {
        const a = res.data.data ?? res.data;
        setAddressText([a.addressLine1, a.area, a.city, a.pincode].filter(Boolean).join(', '));
      })
      .catch(() => setAddressText(''));
  }, [state.addressId]);

  const handleBooking = async () => {
    const finalAmount = Number(state.amount);
    if (isNaN(finalAmount) || finalAmount <= 0 || !state.serviceId) {
      alert('Invalid payment amount. Please go back and re-select the service.');
      return;
    }
    if (!state.patientId) {
      alert('Please select a patient before confirming your booking.');
      router.push('/book/patient');
      return;
    }
    if (!state.scheduledDate) {
      alert('Please choose a date and time slot before confirming your booking.');
      router.push('/book/schedule');
      return;
    }

    if (upiRef && !/^\d{12}$/.test(upiRef.trim())) {
      alert('The UPI Reference Number must be exactly 12 digits.');
      return;
    }

    if ((upiRef && !paymentFile) || (!upiRef && paymentFile) || (!ALLOW_SIMULATED_PAYMENT && !(upiRef && paymentFile))) {
      alert('Please pay via UPI, then enter the 12-digit UPI Reference Number and upload the payment screenshot.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Create Booking (skipped when a previous attempt already created it)
      if (!createdBookingId.current) {
        const bookingRes = await bookingsApi.create({
          patientId: state.patientId,
          serviceId: state.serviceId || undefined,
          addressId: state.addressId || undefined,
          scheduledDate: state.scheduledDate,
          preferredTime: state.preferredTime || undefined,
          symptoms: state.symptoms || undefined
        });
        createdBookingId.current = bookingRes.data.data.id;
      }
      const bookingId = createdBookingId.current as string;

      // 2. Upload Payment or Initiate Simulated Payment
      if (paymentFile && upiRef) {
        await paymentsApi.uploadPaymentProof(bookingId, finalAmount, upiRef.trim(), paymentFile);
      } else {
        await paymentsApi.initiate(bookingId, finalAmount);
      }

      // 3. Attach the prescription chosen in the earlier step (booking already exists; don't fail it on upload errors)
      let prescriptionFailed = false;
      if (prescriptionFile) {
        try {
          await bookingsApi.uploadPrescription(bookingId, prescriptionFile);
        } catch (uploadError) {
          console.error(uploadError);
          prescriptionFailed = true;
        }
      }

      const params = new URLSearchParams({ ref: String(bookingId) });
      if (prescriptionFailed) params.set('rx', 'failed');
      resetBooking();
      router.push(`/booking-success?${params.toString()}`);
    } catch (error: any) {
      console.error(error);
      const serverMessage = error.response?.data?.message;
      const detail = Array.isArray(serverMessage) ? serverMessage.join(', ') : serverMessage;
      if (error.response?.status === 409) {
        alert('You already have a booking scheduled for this exact time and patient.');
      } else if (createdBookingId.current) {
        alert(`Your booking was created, but the payment step failed${detail ? `: ${detail}` : ''}. Please try again.`);
      } else {
        alert(detail ? `Failed to complete booking: ${detail}` : 'Failed to complete booking. Please try again.');
      }
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
          <Box sx={{ p: 4, borderRadius: '24px', border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', mb: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              Scan with any UPI App
            </Typography>
            <Box sx={{ width: 200, height: 200, mx: 'auto', mb: 3, bgcolor: alpha('#4F46E5', 0.05), border: '2px solid', borderColor: 'primary.main', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {settings?.qrCodeImage ? (
                <Box component="img" src={settings.qrCodeImage} alt="UPI payment QR code" sx={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '20px', p: 1 }} />
              ) : (
                <QrCode2Icon sx={{ fontSize: 100, color: 'primary.main' }} />
              )}
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>UPI ID</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, letterSpacing: 1 }}>{settings?.primaryUpiId || 'pay.inhousedoctor@upi'}</Typography>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Payment Details</Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12 }}>
              <TextField 
                fullWidth label="UPI Reference Number (12 digits)" variant="outlined"
                value={upiRef} onChange={(e) => setUpiRef(e.target.value.replace(/\D/g, '').slice(0, 12))}
                slotProps={{ htmlInput: { inputMode: 'numeric', maxLength: 12 } }}
              />
            </Grid>
          </Grid>
          
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Upload Payment Screenshot</Typography>
          <UploadZone onFileChange={setPaymentFile} />
        </Grid>

        {/* Right Column: Booking Summary */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ p: 4, borderRadius: '24px', border: '1px solid', borderColor: 'primary.main', bgcolor: alpha('#4F46E5', 0.02) }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Booking Summary</Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Service</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{state.serviceName || 'General Consultation'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Date & Time</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{state.scheduledDate ? new Date(state.scheduledDate).toLocaleString() : 'Tomorrow'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Location</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, textAlign: 'right' }}>{addressText || '—'}</Typography>
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
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, bgcolor: alpha('#0D9488', 0.1), borderRadius: 2 }}>
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
            py: 1.5, px: 4, borderRadius: '16px', border: '1px solid', borderColor: 'divider', cursor: 'pointer',
            bgcolor: 'transparent', color: 'text.primary', fontWeight: 600, fontSize: '1rem',
            transition: 'all 0.2s', '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          Back
        </Box>
        <Box
          component="button" type="button" onClick={handleBooking} disabled={isSubmitting}
          sx={{
            py: 1.5, px: 6, borderRadius: '16px', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer',
            background: isSubmitting ? 'action.disabledBackground' : 'linear-gradient(135deg, #4F46E5, #0D9488)', color: 'white', 
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
