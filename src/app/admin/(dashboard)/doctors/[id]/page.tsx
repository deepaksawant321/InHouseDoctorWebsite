'use client';

import { Box, Typography, Button, Divider, alpha, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { StatusBadge } from '@/features/admin/StatusBadge';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function DoctorProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()} color="inherit">Back</Button>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Doctor Profile: {params.id}</Typography>
        <StatusBadge status="Active" />
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ p: 4, borderRadius: 4, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
            <Box sx={{ width: 100, height: 100, borderRadius: '50%', bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800, mx: 'auto', mb: 2 }}>
              SM
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Dr. Suresh Mehta</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>General Physician</Typography>
            <StatusBadge status="Available" />
            <Divider sx={{ my: 3 }} />
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Mobile</Typography>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>+91 9123456780</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Email</Typography>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>suresh.mehta@example.com</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Experience</Typography>
              <Typography variant="subtitle2">12 Years</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ p: 4, borderRadius: 4, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Coverage & Performance</Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ p: 3, borderRadius: 3, bgcolor: alpha(theme.palette.success.main, 0.05), border: '1px solid', borderColor: alpha(theme.palette.success.main, 0.2) }}>
                  <Typography variant="body2" color="text.secondary">Patient Rating</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: 'success.main' }}>4.8 / 5.0</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ p: 3, borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.05), border: '1px solid', borderColor: alpha(theme.palette.primary.main, 0.2) }}>
                  <Typography variant="body2" color="text.secondary">Total Completed Visits</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main' }}>142</Typography>
                </Box>
              </Grid>
            </Grid>
            
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 4, mb: 1 }}>Coverage Areas</Typography>
            <Typography variant="body1">Andheri West, Juhu, Vile Parle</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
