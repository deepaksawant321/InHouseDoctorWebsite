'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Divider, alpha, useTheme, CircularProgress, Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import { adminApi } from '@/services/api';

export default function SettingsPage() {
  const theme = useTheme();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    companyName: '',
    supportEmail: '',
    supportPhone: '',
    whatsappNumber: '',
    primaryUpiId: '',
    qrCodeImage: '',
    logoUrl: '',
    faviconUrl: '',
    socialFacebook: '',
    socialInstagram: '',
    socialTwitter: '',
    googleMapsLink: '',
    bookingPrefix: '',
    smsTemplates: '',
    emailTemplates: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getSettings();
      if (res.data?.success && res.data?.data) {
        setFormData({
          companyName: res.data.data.companyName || '',
          supportEmail: res.data.data.supportEmail || '',
          supportPhone: res.data.data.supportPhone || '',
          whatsappNumber: res.data.data.whatsappNumber || '',
          primaryUpiId: res.data.data.primaryUpiId || '',
          qrCodeImage: res.data.data.qrCodeImage || '',
          logoUrl: res.data.data.logoUrl || '',
          faviconUrl: res.data.data.faviconUrl || '',
          socialFacebook: res.data.data.socialFacebook || '',
          socialInstagram: res.data.data.socialInstagram || '',
          socialTwitter: res.data.data.socialTwitter || '',
          googleMapsLink: res.data.data.googleMapsLink || '',
          bookingPrefix: res.data.data.bookingPrefix || '',
          smsTemplates: res.data.data.smsTemplates || '',
          emailTemplates: res.data.data.emailTemplates || '',
        });
      }
    } catch (err: any) {
      console.error('Error fetching settings:', err);
      setError('Failed to load settings.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccessMessage(null);
      
      const res = await adminApi.updateSettings(formData);
      if (res.data?.success) {
        setSuccessMessage('Settings updated successfully!');
      } else {
        setError('Failed to update settings.');
      }
    } catch (err: any) {
      console.error('Error updating settings:', err);
      setError(err.response?.data?.message || 'An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Platform Settings</Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {successMessage && <Alert severity="success" sx={{ mb: 3 }}>{successMessage}</Alert>}

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ p: 4, borderRadius: '24px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Company Information</Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField 
                fullWidth 
                label="Company Name" 
                name="companyName"
                value={formData.companyName} 
                onChange={handleChange}
              />
              <TextField 
                fullWidth 
                label="Support Email" 
                type="email" 
                name="supportEmail"
                value={formData.supportEmail} 
                onChange={handleChange}
              />
              <TextField 
                fullWidth 
                label="Support Phone" 
                name="supportPhone"
                value={formData.supportPhone} 
                onChange={handleChange}
              />
              <TextField 
                fullWidth 
                label="WhatsApp Number" 
                name="whatsappNumber"
                value={formData.whatsappNumber} 
                onChange={handleChange}
              />
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ p: 4, borderRadius: '24px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Payment Configuration</Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField 
                fullWidth 
                label="Primary UPI ID" 
                name="primaryUpiId"
                value={formData.primaryUpiId} 
                onChange={handleChange}
              />
              <TextField 
                fullWidth 
                label="QR Code URL" 
                name="qrCodeImage"
                value={formData.qrCodeImage} 
                onChange={handleChange}
                placeholder="https://example.com/qr-code.png"
              />
              <Box sx={{ p: 3, border: '2px dashed', borderColor: 'primary.main', borderRadius: '16px', textAlign: 'center', bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>Upload New QR Code (Coming soon)</Typography>
                <Typography variant="caption" color="text.secondary">Use the QR Code URL field for now</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      
      <Grid container spacing={4} sx={{ mt: 0 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ p: 4, borderRadius: '24px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Branding & Links</Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField fullWidth label="Logo URL" name="logoUrl" value={formData.logoUrl} onChange={handleChange} />
              <TextField fullWidth label="FavIcon URL" name="faviconUrl" value={formData.faviconUrl} onChange={handleChange} />
              <TextField fullWidth label="Facebook Link" name="socialFacebook" value={formData.socialFacebook} onChange={handleChange} />
              <TextField fullWidth label="Instagram Link" name="socialInstagram" value={formData.socialInstagram} onChange={handleChange} />
              <TextField fullWidth label="Twitter Link" name="socialTwitter" value={formData.socialTwitter} onChange={handleChange} />
              <TextField fullWidth label="Google Maps Link" name="googleMapsLink" value={formData.googleMapsLink} onChange={handleChange} />
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ p: 4, borderRadius: '24px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>System Config</Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField fullWidth label="Booking Prefix (e.g. BKG-)" name="bookingPrefix" value={formData.bookingPrefix} onChange={handleChange} />
              <TextField fullWidth label="SMS Templates (JSON)" name="smsTemplates" value={formData.smsTemplates} onChange={handleChange} multiline rows={4} />
              <TextField fullWidth label="Email Templates (JSON)" name="emailTemplates" value={formData.emailTemplates} onChange={handleChange} multiline rows={4} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 4 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" sx={{ borderRadius: 2 }} onClick={fetchSettings} disabled={saving}>Cancel</Button>
        <Button variant="contained" sx={{ borderRadius: 2 }} onClick={handleSave} disabled={saving}>
          {saving ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
        </Button>
      </Box>
    </Box>
  );
}
