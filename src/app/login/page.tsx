'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box, Container, Paper, Typography, TextField,
  Button, Alert, CircularProgress, InputAdornment,
  Divider, alpha, useTheme
} from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

export default function LoginPage() {
  const [loginId, setLoginId] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginId);
  const isMobile = /^\d{10}$/.test(loginId);

  // Mask identifier for display at OTP step
  const maskIdentifier = (id: string): string => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(id)) {
      // Email: d***1@gmail.com
      const [local, domain] = id.split('@');
      const masked = local.length <= 2
        ? local[0] + '*'.repeat(local.length - 1)
        : local[0] + '*'.repeat(local.length - 2) + local[local.length - 1];
      return `${masked}@${domain}`;
    }
    if (/^\d{10}$/.test(id)) {
      // Mobile: 98*****10
      return id.slice(0, 2) + '*'.repeat(6) + id.slice(-2);
    }
    return id;
  };

  const maskedId = maskIdentifier(loginId);

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');

    if (isEmail || isMobile) {
      setLoading(true);
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            identifier: loginId,
            channel: isEmail ? 'EMAIL' : 'SMS',
            purpose: 'LOGIN'
          })
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || 'Failed to send OTP');
        }

        setOtpSent(true);
        setTimer(30);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please enter a valid 10-digit mobile number or email address.');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (otp.length > 3) {
      setLoading(true);
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/login-with-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            identifier: loginId,
            otp: otp,
            purpose: 'LOGIN'
          })
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || 'Invalid OTP');
        }

        const responseData = await response.json();
        const token = responseData.data?.accessToken;

        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('loginId', loginId);
          router.push('/dashboard');
        } else {
          throw new Error('No token received from server');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to verify OTP');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please enter a valid OTP.');
    }
  };

  const gradientBg = 'linear-gradient(135deg, #4F46E5, #0D9488)';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: { xs: 10, md: 12 }, // offset for fixed Header
        pb: 6,
        background: isDark
          ? `linear-gradient(135deg, ${alpha('#111827', 0.98)}, ${alpha('#1e293b', 0.98)})`
          : `linear-gradient(135deg, ${alpha('#EEF2FF', 1)} 0%, ${alpha('#f0fdf4', 1)} 100%)`,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            border: '1px solid',
            borderColor: isDark ? alpha('#fff', 0.08) : alpha('#4F46E5', 0.12),
            bgcolor: isDark ? alpha('#1e293b', 0.8) : alpha('#fff', 0.9),
            backdropFilter: 'blur(20px)',
            boxShadow: isDark
              ? `0 25px 50px ${alpha('#000', 0.4)}`
              : `0 25px 50px ${alpha('#4F46E5', 0.1)}`,
          }}
        >
          {/* Logo + Brand */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Box
              component={Link}
              href="/"
              sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 52, height: 52, borderRadius: 3,
                background: gradientBg,
                mb: 2, boxShadow: `0 8px 24px ${alpha('#4F46E5', 0.35)}`,
              }}
            >
              <MedicalServicesIcon sx={{ fontSize: 28, color: 'white' }} />
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                background: gradientBg,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
                mb: 0.5,
              }}
            >
              {otpSent ? 'Verify OTP' : 'Login or Sign up'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', lineHeight: 1.6 }}>
              {otpSent
                ? `OTP sent to ${maskedId}`
                : 'Enter your mobile number or email to continue'
              }
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {!otpSent ? (
            /* ── Step 1: Enter Phone or Email ── */
            <Box component="form" onSubmit={handleSendOtp} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                id="login-identifier"
                label="Mobile Number or Email ID"
                placeholder="9876543210 or you@email.com"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                autoFocus
                autoComplete="username"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 2.5 },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                id="send-otp-btn"
                size="large"
                sx={{
                  py: 1.5,
                  borderRadius: 2.5,
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  background: loading ? undefined : gradientBg,
                  boxShadow: loading ? 'none' : `0 4px 15px ${alpha('#4F46E5', 0.4)}`,
                  '&:hover': {
                    background: gradientBg,
                    boxShadow: `0 6px 20px ${alpha('#4F46E5', 0.5)}`,
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                {loading ? <CircularProgress size={22} color="inherit" /> : 'Send OTP'}
              </Button>

              <Divider sx={{ my: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  New users will be registered automatically
                </Typography>
              </Divider>
            </Box>
          ) : (
            /* ── Step 2: Enter OTP ── */
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Identifier display + Edit */}
              <Box
                sx={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  px: 2, py: 1.5, borderRadius: 2,
                  bgcolor: isDark ? alpha('#fff', 0.05) : alpha('#4F46E5', 0.05),
                  border: '1px solid',
                  borderColor: isDark ? alpha('#fff', 0.1) : alpha('#4F46E5', 0.15),
                  gap: 1,
                  overflow: 'hidden',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    minWidth: 0,
                    flexShrink: 1,
                  }}
                >
                  {maskedId}
                </Typography>
                <Button
                  size="small"
                  startIcon={<ArrowBackIcon sx={{ fontSize: '14px !important' }} />}
                  onClick={() => { setOtpSent(false); setTimer(30); setOtp(''); setError(''); }}
                  sx={{
                    flexShrink: 0,
                    color: 'primary.main',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    whiteSpace: 'nowrap',
                    '&:hover': { bgcolor: alpha('#4F46E5', 0.08) },
                  }}
                >
                  Edit
                </Button>
              </Box>

              <Box component="form" onSubmit={handleVerifyOtp} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  id="otp-input"
                  label="Enter OTP"
                  placeholder="• • • • • •"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  autoFocus
                  autoComplete="one-time-code"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    },
                    htmlInput: {
                      maxLength: 6,
                      style: { textAlign: 'center', letterSpacing: '8px', fontWeight: 700, fontSize: '1.2rem' },
                    },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2.5 } }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  id="verify-otp-btn"
                  size="large"
                  sx={{
                    py: 1.5,
                    borderRadius: 2.5,
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    background: loading ? undefined : gradientBg,
                    boxShadow: loading ? 'none' : `0 4px 15px ${alpha('#4F46E5', 0.4)}`,
                    '&:hover': {
                      background: gradientBg,
                      boxShadow: `0 6px 20px ${alpha('#4F46E5', 0.5)}`,
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  {loading ? <CircularProgress size={22} color="inherit" /> : 'Verify & Login'}
                </Button>
              </Box>

              {/* Resend OTP */}
              <Box sx={{ textAlign: 'center' }}>
                {timer > 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    Resend OTP in <strong style={{ color: theme.palette.text.primary }}>{timer}s</strong>
                  </Typography>
                ) : (
                  <Button
                    variant="text"
                    disabled={loading}
                    onClick={() => handleSendOtp()}
                    sx={{ fontWeight: 700, color: 'primary.main' }}
                  >
                    Resend OTP
                  </Button>
                )}
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
