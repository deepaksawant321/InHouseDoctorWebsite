'use client';

import { Box, Container, Typography, TextField, alpha, useTheme } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const theme = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/admin');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', py: 12 }}>
      <Container maxWidth="sm">
        <Box sx={{ p: { xs: 4, md: 6 }, borderRadius: 4, bgcolor: 'background.paper', boxShadow: theme.palette.mode === 'light' ? '0 12px 48px rgba(0,0,0,0.06)' : '0 12px 48px rgba(0,0,0,0.5)', border: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
          
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
            <Box sx={{ width: 48, height: 48, borderRadius: 2, background: 'linear-gradient(135deg, #1976D2, #00BFA5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <MedicalServicesIcon sx={{ fontSize: 28 }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: 'text.primary' }}>
              InHouse <Box component="span" sx={{ color: 'primary.main' }}>Ops</Box>
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Welcome Back</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>Sign in to manage operations</Typography>

          <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField 
              fullWidth label="Admin Email" variant="outlined" type="email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <TextField 
              fullWidth label="Password" variant="outlined" type="password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                Forgot Password?
              </Typography>
            </Box>

            <Box
              component="button" type="submit"
              sx={{
                width: '100%', py: 1.75, borderRadius: 3, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #1976D2, #00BFA5)', color: 'white', 
                fontWeight: 700, fontSize: '1.1rem', boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
                transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)' },
              }}
            >
              Secure Sign In
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
