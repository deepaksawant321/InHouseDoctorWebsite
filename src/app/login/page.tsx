'use client';

import { Box, Container, Typography, TextField, InputAdornment } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OTPInput } from '@/features/booking/OTPInput';
import { BookingStepper } from '@/features/booking/BookingStepper';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendOTP = () => {
    if (mobile.length >= 10) setStep('otp');
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      router.push('/book/service');
    }
  };

  return (
    <>
      <BookingStepper />
      
      <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: 'background.default', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <Container maxWidth="sm">
          <Box
            sx={{
              p: { xs: 4, md: 6 }, borderRadius: 6,
              bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider',
              boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
              textAlign: 'center'
            }}
          >
            {step === 'mobile' ? (
              <>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  Login or Sign up
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
                  Enter your mobile number to proceed. We will send an OTP for verification.
                </Typography>

                <TextField
                  fullWidth
                  placeholder="Mobile Number"
                  variant="outlined"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  slotProps={{
                    input: {
                      startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                      sx: { fontSize: '1.1rem', py: 0.5 }
                    }
                  }}
                  sx={{ mb: 4 }}
                />

                <Box
                  component="button"
                  onClick={handleSendOTP}
                  disabled={mobile.length < 10}
                  sx={{
                    width: '100%', py: 2, borderRadius: 3, border: 'none', cursor: mobile.length >= 10 ? 'pointer' : 'not-allowed',
                    background: mobile.length >= 10 ? 'linear-gradient(135deg, #1976D2, #00BFA5)' : 'action.disabledBackground',
                    color: mobile.length >= 10 ? 'white' : 'text.disabled', 
                    fontWeight: 700, fontSize: '1rem',
                    boxShadow: mobile.length >= 10 ? '0 8px 24px rgba(25, 118, 210, 0.3)' : 'none',
                    transition: 'all 0.2s',
                    '&:hover': { transform: mobile.length >= 10 ? 'translateY(-2px)' : 'none' },
                  }}
                >
                  Send OTP
                </Box>
              </>
            ) : (
              <>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  Verify Mobile
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
                  Enter the 6-digit code sent to +91 {mobile}
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <OTPInput value={otp} onChange={setOtp} />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box
                    component="button"
                    onClick={handleVerifyOTP}
                    disabled={otp.length !== 6}
                    sx={{
                      width: '100%', py: 2, borderRadius: 3, border: 'none', cursor: otp.length === 6 ? 'pointer' : 'not-allowed',
                      background: otp.length === 6 ? 'linear-gradient(135deg, #1976D2, #00BFA5)' : 'action.disabledBackground',
                      color: otp.length === 6 ? 'white' : 'text.disabled', 
                      fontWeight: 700, fontSize: '1rem',
                      boxShadow: otp.length === 6 ? '0 8px 24px rgba(25, 118, 210, 0.3)' : 'none',
                      transition: 'all 0.2s',
                      '&:hover': { transform: otp.length === 6 ? 'translateY(-2px)' : 'none' },
                    }}
                  >
                    Verify & Continue
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ color: 'primary.main', fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                    onClick={() => setStep('mobile')}
                  >
                    Edit mobile number
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
