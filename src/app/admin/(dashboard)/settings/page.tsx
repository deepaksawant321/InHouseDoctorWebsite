'use client';

import { Box, Typography, Button, TextField, Divider, alpha, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function SettingsPage() {
  const theme = useTheme();

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Platform Settings</Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ p: 4, borderRadius: '24px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Company Information</Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField fullWidth label="Company Name" defaultValue="InHouse Doctor" />
              <TextField fullWidth label="Support Email" defaultValue="support@inhousedoctor.com" type="email" />
              <TextField fullWidth label="Support Phone" defaultValue="1800-123-4567" />
              <TextField fullWidth label="WhatsApp Number" defaultValue="+91 9876543210" />
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ p: 4, borderRadius: '24px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Payment Configuration</Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField fullWidth label="Primary UPI ID" defaultValue="pay.inhousedoctor@upi" />
              <Box sx={{ p: 3, border: '2px dashed', borderColor: 'primary.main', borderRadius: '16px', textAlign: 'center', bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>Upload New QR Code</Typography>
                <Typography variant="caption" color="text.secondary">PNG, JPG up to 5MB</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 4 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" sx={{ borderRadius: 2 }}>Cancel</Button>
        <Button variant="contained" sx={{ borderRadius: 2 }}>Save Changes</Button>
      </Box>
    </Box>
  );
}
