'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, alpha, useTheme, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import { StatusBadge } from '@/features/admin/StatusBadge';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { apiClient } from '@/services/apiClient';

export default function AssignmentsPage() {
  const theme = useTheme();
  
  const [bookings, setBookings] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiClient.get('/bookings/admin/all'),
      apiClient.get('/doctors')
    ]).then(([bRes, dRes]) => {
      setBookings(bRes.data.data || []);
      setDoctors(dRes.data.data || []);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const handleConfirm = async (id: string) => {
    try {
      await apiClient.patch(`/bookings/${id}/status`, { status: 'Confirmed' });
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Confirmed' } : b));
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const pendingBookings = bookings.filter(b => b.status === 'Pending');

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Booking Confirmation Center</Typography>
        <Typography variant="body1" color="text.secondary">Review and confirm pending patient bookings.</Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Pending Bookings ({pendingBookings.length})</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {pendingBookings.map((booking) => (
              <Card key={booking.id} sx={{ p: 3, border: '1px solid', borderColor: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>#{booking.id.split('-')[0]}</Typography>
                  <StatusBadge status="Pending" />
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{booking.patient?.firstName} {booking.patient?.lastName}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Dr. {booking.doctor?.user?.firstName} • {booking.symptoms}</Typography>
                <Typography variant="caption" sx={{ display: 'inline-block', bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', px: 1, py: 0.5, borderRadius: 1, fontWeight: 700 }}>
                  {new Date(booking.scheduledDate).toLocaleString()}
                </Typography>
                <Button variant="contained" size="small" fullWidth sx={{ mt: 2 }} onClick={() => handleConfirm(booking.id)} startIcon={<CheckCircleIcon />}>Confirm Booking</Button>
              </Card>
            ))}
            {pendingBookings.length === 0 && (
              <Typography variant="body2" color="text.secondary">No pending bookings to confirm.</Typography>
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Active Doctors ({doctors.length})</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {doctors.map((doctor) => (
              <Card key={doctor.id} sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Dr. {doctor.user?.firstName} {doctor.user?.lastName}</Typography>
                  <Typography variant="body2" color="text.secondary">{doctor.specialization} • {doctor.experienceYears} Years Exp</Typography>
                </Box>
              </Card>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
