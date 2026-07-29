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
            <Box sx={{ width: 48, height: 48, borderRadius: 2, background: 'linear-gradient(135deg, #4F46E5, #0D9488)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <MedicalServicesIcon sx={{ fontSize: 28 }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: 'text.primary' }}>
              InHouse <Box component="span" sx={{ color: 'primary.main' }}>Ops</Box>
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Welcome Back</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>Sign in to manage operations</Typography>

          {generalError && (
            <Box sx={{ mb: 3, p: 2, borderRadius: 2, bgcolor: alpha('#f44336', 0.1), color: 'error.main', fontWeight: 600, fontSize: '0.9rem' }}>
              {generalError}
            </Box>
          )}

          <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth label="Admin Email" variant="outlined" type="email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              error={!!fieldErrors.email} helperText={fieldErrors.email}
            />
            <TextField
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
            />

            <Box
              component="button" type="submit" disabled={isLoading}
              sx={{
                width: '100%', py: 1.75, borderRadius: '16px', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer',
                background: isLoading ? 'action.disabledBackground' : 'linear-gradient(135deg, #4F46E5, #0D9488)', color: 'white',
                fontWeight: 700, fontSize: '1.1rem', boxShadow: isLoading ? 'none' : '0 8px 24px rgba(25, 118, 210, 0.3)',
                transition: 'all 0.2s', '&:hover': { transform: isLoading ? 'none' : 'translateY(-2px)' },
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1,
              }}
            >
              {isLoading ? <><CircularProgress size={18} sx={{ color: 'inherit' }} /> Signing in...</> : 'Secure Sign In'}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
