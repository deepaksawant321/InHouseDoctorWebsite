'use client';

import { Alert, Box, Button, Typography, TextField, Divider, alpha } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import PaymentsIcon from '@mui/icons-material/Payments';
import { WizardNav } from '@/features/booking/WizardNav';
import { StepHeader } from '@/features/booking/StepHeader';
import Grid from '@mui/material/Grid';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadZone } from '@/features/booking/UploadZone';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useBooking } from '@/providers/BookingProvider';
import { addressesApi, bookingsApi, paymentsApi, settingsApi } from '@/services/api';
import { formatDate } from '@/utils/date';

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
  const createdBookingNo = useRef<string | null>(null);
  const [settings, setSettings] = useState<{ primaryUpiId?: string | null; qrCodeImage?: string | null } | null>(null);
  const [addressText, setAddressText] = useState<string>('');
  const [formError, setFormError] = useState<{ message: string; fixHref?: string; fixLabel?: string } | null>(null);
  const [upiError, setUpiError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const upiId = settings?.primaryUpiId || '';
  const amountNum = Number(state.amount);
  const upiLink = upiId && amountNum > 0
    ? `upi://pay?pa=${encodeURIComponent(upiId)}&am=${amountNum}&cu=INR&tn=${encodeURIComponent('Doctor Doorstep booking')}`
    : '';

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked: the ID is still visible to copy by hand
    }
  };

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

  const submitLock = useRef(false);

  const handleBooking = async () => {
    if (submitLock.current) return;
    setFormError(null);
    setUpiError(null);
    setFileError(null);

    const finalAmount = Number(state.amount);
    if (isNaN(finalAmount) || finalAmount <= 0 || !state.serviceId) {
      setFormError({ message: 'The payment amount is missing. Please re-select your service.', fixHref: '/book/service', fixLabel: 'Choose service' });
      return;
    }
    if (!state.patientId) {
      setFormError({ message: 'Please select who this booking is for before confirming.', fixHref: '/book/patient', fixLabel: 'Choose patient' });
      return;
    }
    if (!state.scheduledDate) {
      setFormError({ message: 'Please choose a date and time slot before confirming.', fixHref: '/book/schedule', fixLabel: 'Choose date & time' });
      return;
    }

    // Proof of payment is required unless the dev-only simulated gateway is on and nothing was entered.
    if (upiRef || paymentFile || !ALLOW_SIMULATED_PAYMENT) {
      let invalid = false;
      if (!upiRef) { setUpiError('Enter the 12-digit UPI reference number from your payment app.'); invalid = true; }
      else if (!/^\d{12}$/.test(upiRef.trim())) { setUpiError('The UPI reference number must be exactly 12 digits.'); invalid = true; }
      if (!paymentFile) { setFileError('Upload a screenshot of your payment.'); invalid = true; }
      if (invalid) {
        // The fields sit above the Submit button: bring the first problem into view.
        const firstId = !upiRef || !/^\d{12}$/.test(upiRef.trim()) ? 'upi-ref-input' : 'payment-file-error';
        requestAnimationFrame(() => {
          const el = document.getElementById(firstId);
          el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (firstId === 'upi-ref-input') el?.focus();
        });
        return;
      }
    }

    submitLock.current = true;
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
        createdBookingNo.current = bookingRes.data.data.bookingNo ?? null;
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
      if (createdBookingNo.current) params.set('no', createdBookingNo.current);
      if (prescriptionFailed) params.set('rx', 'failed');
      resetBooking();
      router.push(`/booking-success?${params.toString()}`);
    } catch (error: any) {
      console.error(error);
      const serverMessage = error.response?.data?.message;
      const detail = Array.isArray(serverMessage) ? serverMessage.join(', ') : serverMessage;
      if (error.response?.status === 409) {
        setFormError({ message: 'This patient already has a booking at that time. Please pick a different time slot.', fixHref: '/book/schedule', fixLabel: 'Change time' });
      } else if (createdBookingId.current) {
        setFormError({ message: `Your booking was created, but the payment step failed${detail ? `: ${detail}` : ''}. Please try again; a second booking will not be created.` });
      } else {
        setFormError({ message: detail ? `We could not complete your booking: ${detail}` : 'We could not complete your booking. Please try again.' });
      }
      submitLock.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <StepHeader icon={<PaymentsIcon />} title="Payment & Confirmation" subtitle="Three quick steps: pay by UPI, enter the reference number, and upload a screenshot." />

      <Grid container spacing={4} sx={{ mb: 4 }}>
        {/* Left Column: QR Code & Upload */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={{ p: 3, borderRadius: '20px', border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', mb: 4, textAlign: 'center' }}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>Step 1</Typography>
            <Typography component="h2" variant="subtitle1" sx={{ fontSize: '1.05rem', fontWeight: 700, mb: 0.5 }}>
              Pay ₹{state.amount} with any UPI app
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Scan the QR code, or pay to the UPI ID below. Keep the app open for the next two steps.
            </Typography>
            <Box sx={{ width: 170, height: 170, mx: 'auto', mb: 2.5, bgcolor: alpha('#0A5CB8', 0.05), border: '2px solid', borderColor: 'primary.main', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {settings?.qrCodeImage ? (
                <Box component="img" src={settings.qrCodeImage} alt="UPI payment QR code" sx={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '20px', p: 1 }} />
              ) : (
                <QrCode2Icon sx={{ fontSize: 90, color: 'primary.main' }} />
              )}
            </Box>
            {upiId ? (
              <>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>UPI ID</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, letterSpacing: 1, wordBreak: 'break-all' }}>{upiId}</Typography>
                  <Button size="small" variant="outlined" onClick={copyUpiId} startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />} aria-live="polite">
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                </Box>
                {upiLink && (
                  <Button href={upiLink} variant="contained" fullWidth sx={{ mt: 3, display: { xs: 'inline-flex', md: 'none' } }}>
                    Open my UPI app
                  </Button>
                )}
              </>
            ) : (
              <Alert severity="warning" sx={{ textAlign: 'left' }}>
                {settings === null ? 'Payment details are loading or unavailable. ' : ''}If you cannot see a UPI ID, please contact our support team before paying.
              </Alert>
            )}
          </Box>

          <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>Step 2</Typography>
          <Typography component="h2" variant="subtitle1" sx={{ fontSize: '1.05rem', fontWeight: 700, mb: 0.5 }}>Enter the UPI reference number</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            After paying, open the payment details in your UPI app. It is shown as &quot;UPI Ref No.&quot; or &quot;UTR&quot; and is 12 digits long.
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth label="UPI Reference Number (12 digits)" variant="outlined"
                value={upiRef} onChange={(e) => { setUpiRef(e.target.value.replace(/\D/g, '').slice(0, 12)); setUpiError(null); }}
                error={!!upiError} helperText={upiError ?? `${upiRef.length}/12 digits`}
                slotProps={{ htmlInput: { inputMode: 'numeric', maxLength: 12, id: 'upi-ref-input' } }}
              />
            </Grid>
          </Grid>

          <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>Step 3</Typography>
          <Typography component="h2" variant="subtitle1" sx={{ fontSize: '1.05rem', fontWeight: 700, mb: 0.5 }}>Upload the payment screenshot</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            A screenshot of the successful payment screen helps us verify it faster.
          </Typography>
          <UploadZone onFileChange={(f) => { setPaymentFile(f); setFileError(null); }} />
          {fileError && <Typography id="payment-file-error" role="alert" variant="body2" color="error" sx={{ mt: 1 }}>{fileError}</Typography>}
        </Grid>

        {/* Right Column: Booking Summary */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ p: 3, borderRadius: '20px', border: '1px solid', borderColor: 'primary.main', bgcolor: alpha('#0A5CB8', 0.02) }}>
            <Typography component="h2" variant="subtitle1" sx={{ fontSize: '1.05rem', fontWeight: 700, mb: 3 }}>Booking Summary</Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Service</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{state.serviceName || 'General Consultation'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Date & Time</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{state.scheduledDate ? formatDate(state.scheduledDate, { utc: true }) + (state.preferredTime ? `, ${state.preferredTime}` : '') : 'Tomorrow'}</Typography>
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
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, bgcolor: alpha('#14B5A5', 0.1), borderRadius: 2 }}>
              <Typography component="span" variant="subtitle1" sx={{ fontSize: '1.05rem', fontWeight: 700, color: '#009688' }}>Total Payable</Typography>
              <Typography component="span" variant="subtitle1" sx={{ fontSize: '1.05rem', fontWeight: 800, color: '#009688' }}>₹{state.amount}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1, mt: 3, alignItems: 'center' }}>
              <CheckCircleIcon sx={{ color: 'secondary.main', fontSize: 16 }} />
              <Typography variant="caption" color="text.secondary">Our team verifies your payment before confirming</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {formError && (
        <Alert
          severity="error"
          role="alert"
          sx={{ mb: 3 }}
          action={formError.fixHref ? (
            <Button color="inherit" size="small" onClick={() => router.push(formError.fixHref as string)}>{formError.fixLabel}</Button>
          ) : undefined}
        >
          {formError.message}
        </Alert>
      )}

      <WizardNav onBack={() => router.back()} onNext={handleBooking} loading={isSubmitting} nextLabel={isSubmitting ? 'Processing...' : 'Submit Booking'} />
    </Box>
  );
}
