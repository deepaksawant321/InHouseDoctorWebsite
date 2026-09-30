'use client';

import { Box, Typography, Card, CardContent, Grid, TextField, Button, Avatar, Divider, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import { authApi } from '@/services/api';

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '' });
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const [primaryLogin, setPrimaryLogin] = useState<'email' | 'phone'>('email');

  useEffect(() => {
    authApi.getProfile().then(res => {
      const data = res.data.data || res.data;
      setProfile(data);
      if (data) {
        const nameParts = (data.fullName || '').split(' ');
        setFormData({
          firstName: nameParts[0] || '',
          lastName: nameParts.slice(1).join(' ') || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
        });

        // Try to determine how they logged in
        const storedLoginId = localStorage.getItem('loginId');
        if (storedLoginId) {
          setPrimaryLogin(storedLoginId.includes('@') ? 'email' : 'phone');
        } else {
          // Fallback guess: if they have phone but no email, they probably logged in with phone
          if (data.phoneNumber && !data.email) setPrimaryLogin('phone');
          else setPrimaryLogin('email');
        }
      }
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      };
      await authApi.updateProfile(payload);
      setProfile({ ...profile, fullName, email: payload.email, phoneNumber: payload.phoneNumber });
      setSnackbar({ open: true, message: 'Profile updated successfully', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to update profile', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ maxWidth: 800 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
        My Profile
      </Typography>

      <Card elevation={0} sx={{ mb: 4, borderRadius: '24px', border: '1px solid', borderColor: 'divider' }}>
        <CardContent sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: '#0A5CB8', fontSize: '2rem' }}>
            {profile?.firstName?.charAt(0) || 'U'}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>{profile?.fullName || 'User Name'}</Typography>
            <Typography color="text.secondary">{profile?.phoneNumber} • {profile?.email}</Typography>
          </Box>
        </CardContent>
      </Card>

      <Card elevation={0} sx={{ borderRadius: '24px', border: '1px solid', borderColor: 'divider' }}>
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
            Personal Information
          </Typography>
          <form onSubmit={handleSave}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="First Name" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} required />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Last Name" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} required />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  disabled={primaryLogin === 'email'}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  value={formData.phoneNumber}
                  onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                  disabled={primaryLogin === 'phone'}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Button type="submit" variant="contained" size="large" disabled={saving} sx={{ borderRadius: 2, px: 4, py: 1.5, textTransform: 'none', fontWeight: 600 }}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
