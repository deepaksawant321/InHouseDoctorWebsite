'use client';

import { Box, Container, Typography, TextField, InputAdornment } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OTPInput } from '@/features/booking/OTPInput';
// BookingStepper removed
import { authApi } from '@/services/api';
import { parseValidationErrors } from '@/utils/errorParser';
import { alpha } from '@mui/material';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSendOTP = async () => {
    setGeneralError('');
    setFieldErrors({});
    if (mobile.length >= 10) {
      setIsLoading(true);
      try {
        const res = await authApi.sendOtp(`+91${mobile}`);
        // Dev Note: For ease of testing, logging the OTP generated
        console.log('OTP Dev Hint:', res.data.data.devOtpHint);
        setStep('otp');
      } catch (err: any) {
        console.error('Failed to send OTP:', err);
        const { fieldErrors, generalMessage } = parseValidationErrors(err);
        setFieldErrors(fieldErrors);
        setGeneralError(generalMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length === 4) {
      setGeneralError('');
      setFieldErrors({});
      setIsLoading(true);
      try {
        const res = await authApi.loginWithOtp(`+91${mobile}`, otp);
        const { accessToken, user } = res.data.data;
        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Redirect based on role or to dashboard
        if (user.role === 'Admin') router.push('/admin/dashboard');
        else if (user.role === 'Doctor') router.push('/doctor/dashboard');
        else router.push('/dashboard');
      } catch (err: any) {
        console.error('Failed to verify OTP:', err);
        const { fieldErrors, generalMessage } = parseValidationErrors(err);
        setFieldErrors(fieldErrors);
        setGeneralError(generalMessage || 'Invalid OTP');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
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

                {generalError && (
                  <Box sx={{ mb: 3, p: 2, borderRadius: 2, bgcolor: alpha('#f44336', 0.1), color: 'error.main', fontWeight: 600, fontSize: '0.9rem' }}>
                    {generalError}
                  </Box>
                )}

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
                  error={!!fieldErrors.phoneNumber}
                  helperText={fieldErrors.phoneNumber}
                />

                <Box
                  component="button"
                  onClick={handleSendOTP}
                  disabled={mobile.length < 10 || isLoading}
                  sx={{
                    width: '100%', py: 2, borderRadius: '16px', border: 'none', cursor: mobile.length >= 10 && !isLoading ? 'pointer' : 'not-allowed',
                    background: mobile.length >= 10 && !isLoading ? 'linear-gradient(135deg, #4F46E5, #0D9488)' : 'action.disabledBackground',
                    color: mobile.length >= 10 && !isLoading ? 'white' : 'text.disabled', 
                    fontWeight: 700, fontSize: '1rem',
                    boxShadow: mobile.length >= 10 && !isLoading ? '0 8px 24px rgba(25, 118, 210, 0.3)' : 'none',
                    transition: 'all 0.2s',
                    '&:hover': { transform: mobile.length >= 10 && !isLoading ? 'translateY(-2px)' : 'none' },
                  }}
                >
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </Box>
              </>
            ) : (
              <>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  Verify Mobile
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
                  Enter the 4-digit code sent to +91 {mobile}
                </Typography>

                {generalError && (
                  <Box sx={{ mb: 3, p: 2, borderRadius: 2, bgcolor: alpha('#f44336', 0.1), color: 'error.main', fontWeight: 600, fontSize: '0.9rem' }}>
                    {generalError}
                  </Box>
                )}

                <Box sx={{ mb: 4 }}>
                  <OTPInput value={otp} onChange={setOtp} />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box
                    component="button"
                    onClick={handleVerifyOTP}
                    disabled={otp.length !== 4 || isLoading}
                    sx={{
                      width: '100%', py: 2, borderRadius: '16px', border: 'none', cursor: otp.length === 4 && !isLoading ? 'pointer' : 'not-allowed',
                      background: otp.length === 4 && !isLoading ? 'linear-gradient(135deg, #4F46E5, #0D9488)' : 'action.disabledBackground',
                      color: otp.length === 4 && !isLoading ? 'white' : 'text.disabled', 
                      fontWeight: 700, fontSize: '1rem',
                      boxShadow: otp.length === 4 && !isLoading ? '0 8px 24px rgba(25, 118, 210, 0.3)' : 'none',
                      transition: 'all 0.2s',
                      '&:hover': { transform: otp.length === 4 && !isLoading ? 'translateY(-2px)' : 'none' },
                    }}
                  >
                    {isLoading ? 'Verifying...' : 'Verify & Continue'}
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
