'use client';

import { Box, Container, Typography, TextField, alpha, useTheme, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAuthApi } from '@/services/api';
import { parseValidationErrors } from '@/utils/errorParser';

export default function AdminLoginPage() {
  const theme = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const [mode, setMode] = useState<'login' | 'forgot' | 'reset'>('login');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [info, setInfo] = useState('');

  const switchMode = (next: 'login' | 'forgot' | 'reset') => {
    setMode(next);
    setGeneralError('');
    setFieldErrors({});
    setInfo('');
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');
    setInfo('');
    setIsLoading(true);
    try {
      await adminAuthApi.forgotPassword(email);
      setMode('reset');
      setInfo('If this email belongs to an admin account, a 6-digit code has been sent to it.');
    } catch (err: any) {
      const { fieldErrors, generalMessage } = parseValidationErrors(err);
      setFieldErrors(fieldErrors);
      setGeneralError(generalMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');
    setFieldErrors({});
    if (newPassword !== confirmPassword) {
      setFieldErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }
    setIsLoading(true);
    try {
      await adminAuthApi.resetPassword(email, otp, newPassword);
      setPassword('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
      setMode('login');
      setInfo('Password reset successful. Please sign in with your new password.');
    } catch (err: any) {
      const { fieldErrors, generalMessage } = parseValidationErrors(err);
      setFieldErrors(fieldErrors);
      setGeneralError(generalMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');
    setFieldErrors({});
    setIsLoading(true);
    try {
      const res = await adminAuthApi.login(email, password);
      const { accessToken, admin } = res.data.data;
      localStorage.setItem('adminToken', accessToken);
      localStorage.setItem('adminUser', JSON.stringify(admin));
      router.push('/admin');
    } catch (err: any) {
      if (err.response?.status === 401) {
        setGeneralError('Invalid email or password');
      } else {
        const { fieldErrors, generalMessage } = parseValidationErrors(err);
        setFieldErrors(fieldErrors);
        setGeneralError(generalMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', py: 12 }}>
      <Container maxWidth="sm">
        <Box sx={{ p: { xs: 4, md: 6 }, borderRadius: '24px', bgcolor: 'background.paper', boxShadow: theme.palette.mode === 'light' ? '0 12px 48px rgba(0,0,0,0.06)' : '0 12px 48px rgba(0,0,0,0.5)', border: '1px solid', borderColor: 'divider', textAlign: 'center' }}>

          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
            <Box sx={{ width: 48, height: 48, borderRadius: 2, background: 'linear-gradient(135deg, #0A5CB8, #14B5A5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <MedicalServicesIcon sx={{ fontSize: 28 }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: 'text.primary' }}>
              Doctor Doorstep <Box component="span" sx={{ color: 'primary.main' }}>Ops</Box>
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            {mode === 'login' ? 'Welcome Back' : mode === 'forgot' ? 'Forgot Password' : 'Reset Password'}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {mode === 'login' ? 'Sign in to manage operations'
              : mode === 'forgot' ? 'Enter your admin email and we will send you a verification code'
              : 'Enter the code from your email and choose a new password'}
          </Typography>

          {info && (
            <Box sx={{ mb: 3, p: 2, borderRadius: 2, bgcolor: alpha('#2e7d32', 0.1), color: 'success.main', fontWeight: 600, fontSize: '0.9rem' }}>
              {info}
            </Box>
          )}

          {generalError && (
            <Box sx={{ mb: 3, p: 2, borderRadius: 2, bgcolor: alpha('#f44336', 0.1), color: 'error.main', fontWeight: 600, fontSize: '0.9rem' }}>
              {generalError}
            </Box>
          )}

          <Box component="form" onSubmit={mode === 'login' ? handleLogin : mode === 'forgot' ? handleForgot : handleReset} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth label="Admin Email" variant="outlined" type="email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              disabled={mode === 'reset'}
              error={!!fieldErrors.email} helperText={fieldErrors.email}
            />
            {mode === 'reset' && (
              <>
                <TextField
                  fullWidth label="6-digit code" variant="outlined" required
                  value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  autoComplete="one-time-code"
                  error={!!fieldErrors.otp} helperText={fieldErrors.otp}
                />
                <TextField
                  fullWidth label="New Password" variant="outlined" type={showPassword ? 'text' : 'password'} required
                  value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                  error={!!fieldErrors.newPassword} helperText={fieldErrors.newPassword || 'At least 8 characters'}
                />
                <TextField
                  fullWidth label="Confirm New Password" variant="outlined" type={showPassword ? 'text' : 'password'} required
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  error={!!fieldErrors.confirmPassword} helperText={fieldErrors.confirmPassword}
                />
              </>
            )}
            {mode === 'login' && <TextField
              fullWidth label="Password" variant="outlined" type={showPassword ? "text" : "password"} required
              value={password} onChange={(e) => setPassword(e.target.value)}
              error={!!fieldErrors.password} helperText={fieldErrors.password}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((show) => !show)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />}

            {mode === 'login' && (
              <Box sx={{ textAlign: 'right', mt: -1.5 }}>
                <Box component="button" type="button" onClick={() => switchMode('forgot')}
                  sx={{ background: 'none', border: 'none', cursor: 'pointer', color: 'primary.main', fontWeight: 600, fontSize: '0.9rem', p: 0 }}>
                  Forgot password?
                </Box>
              </Box>
            )}

            <Box
              component="button" type="submit" disabled={isLoading}
              sx={{
                width: '100%', py: 1.75, borderRadius: '999px', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer',
                background: isLoading ? 'action.disabledBackground' : '#0A5CB8', color: 'white',
                fontWeight: 700, fontSize: '1.1rem', boxShadow: isLoading ? 'none' : '0 8px 24px rgba(10, 92, 184, 0.3)',
                transition: 'all 0.2s', '&:hover': { transform: isLoading ? 'none' : 'translateY(-2px)' },
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1,
              }}
            >
              {isLoading
                ? <><CircularProgress size={18} sx={{ color: 'inherit' }} /> {mode === 'login' ? 'Signing in...' : 'Please wait...'}</>
                : mode === 'login' ? 'Secure Sign In' : mode === 'forgot' ? 'Send Verification Code' : 'Reset Password'}
            </Box>

            {mode !== 'login' && (
              <Box component="button" type="button" onClick={() => switchMode('login')}
                sx={{ background: 'none', border: 'none', cursor: 'pointer', color: 'text.secondary', fontWeight: 600, fontSize: '0.9rem', p: 0 }}>
                Back to sign in
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
