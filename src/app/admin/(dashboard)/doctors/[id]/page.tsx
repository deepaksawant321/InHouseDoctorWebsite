'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Typography, Button, Divider, CircularProgress, alpha, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { StatusBadge, StatusType } from '@/features/admin/StatusBadge';
import { adminApi } from '@/services/api';
import { formatDoctorName } from '@/utils/doctorName';

interface DoctorProfile {
  id: string;
  name: string;
  phoneNumber?: string;
  email?: string | null;
  qualification?: string | null;
  specialization?: string;
  experienceYears?: number;
  consultationFee?: number | string;
  status?: string;
  isAvailable?: boolean;
}

export default function DoctorProfilePage() {
  const router = useRouter();
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApi.getDoctorById(id)
      .then((res) => setDoctor(res.data.data))
      .catch((err) => setError(err.response?.status === 404 ? 'Doctor not found.' : 'Could not load this doctor.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  if (error || !doctor) {
    return (
      <Box sx={{ py: 6 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()} color="inherit">Back</Button>
        <Typography role="alert" color="error" sx={{ mt: 3 }}>{error || 'Doctor not found.'}</Typography>
      </Box>
    );
  }

  const displayName = formatDoctorName(doctor.name);
  const initials = (doctor.name || '?').replace(/^dr\.?\s+/i, '').split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join('');

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()} color="inherit">Back</Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>Doctor Profile</Typography>
        {doctor.status && <StatusBadge status={doctor.status as StatusType} />}
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ p: 4, borderRadius: '24px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
            <Box sx={{ width: 100, height: 100, borderRadius: '50%', bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800, mx: 'auto', mb: 2 }}>
              {initials}
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>{displayName}</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>{doctor.specialization || '—'}</Typography>
            <StatusBadge status={(doctor.isAvailable ? 'Available' : 'Unavailable') as StatusType} />
            <Divider sx={{ my: 3 }} />
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Mobile</Typography>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>{doctor.phoneNumber || '—'}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Email</Typography>
              <Typography variant="subtitle2" sx={{ mb: 2, wordBreak: 'break-word' }}>{doctor.email || '—'}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Experience</Typography>
              <Typography variant="subtitle2">{doctor.experienceYears != null ? `${doctor.experienceYears} Years` : '—'}</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ p: 4, borderRadius: '24px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Details</Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ p: 3, borderRadius: '16px', bgcolor: alpha(theme.palette.primary.main, 0.05), border: '1px solid', borderColor: alpha(theme.palette.primary.main, 0.2) }}>
                  <Typography variant="body2" color="text.secondary">Consultation Fee</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main' }}>₹{Number(doctor.consultationFee ?? 0)}</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ p: 3, borderRadius: '16px', bgcolor: alpha(theme.palette.success.main, 0.05), border: '1px solid', borderColor: alpha(theme.palette.success.main, 0.2) }}>
                  <Typography variant="body2" color="text.secondary">Qualification</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'success.main' }}>{doctor.qualification || '—'}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
