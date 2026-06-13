'use client';

import { Box, Typography, Button, Divider, alpha, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { StatusBadge } from '@/features/admin/StatusBadge';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function BookingDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()} color="inherit">Back</Button>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Booking {params.id}</Typography>
        <StatusBadge status="Confirmed" />
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ p: 4, borderRadius: '24px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Patient Information</Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="body2" color="text.secondary">Full Name</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Rahul Sharma</Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="body2" color="text.secondary">Mobile</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>+91 9876543210</Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="body2" color="text.secondary">Email</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>rahul.s@example.com</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="body2" color="text.secondary">Symptoms</Typography>
                <Typography variant="body1">High fever, cough, and body ache since 2 days.</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Visit Address</Typography>
            <Typography variant="body1">
              Flat 402, Sunshine Apartments, 3rd Cross Road,<br />
              Andheri West, Mumbai - 400053
            </Typography>
          </Box>

          <Box sx={{ p: 4, borderRadius: '24px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Doctor Assignment</Typography>
              <StatusBadge status="Assigned" />
            </Box>
            <Box sx={{ p: 3, borderRadius: '16px', bgcolor: alpha(theme.palette.primary.main, 0.05), border: '1px solid', borderColor: 'primary.main' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main' }}>Dr. Suresh Mehta</Typography>
              <Typography variant="body2" color="text.secondary">General Physician • 12 Years Experience</Typography>
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" size="small" sx={{ mr: 2 }}>Contact Doctor</Button>
                <Button variant="outlined" size="small" color="error">Re-assign</Button>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ p: 4, borderRadius: '24px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Payment</Typography>
              <StatusBadge status="Verified" />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Service Fee</Typography>
              <Typography variant="subtitle2">₹999</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Platform Fee</Typography>
              <Typography variant="subtitle2">₹50</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Total Paid</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'success.main' }}>₹1049</Typography>
            </Box>
            <Button fullWidth variant="outlined">View Screenshot</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
