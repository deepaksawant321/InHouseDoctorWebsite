'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, alpha, useTheme, CircularProgress, MenuItem, Select, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import { StatusBadge } from '@/features/admin/StatusBadge';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { adminApi, assignmentsApi } from '@/services/api';

export default function AssignmentsPage() {
  const theme = useTheme();
  
  const [bookings, setBookings] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Record<string, string>>({});
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    Promise.all([
      adminApi.getBookings(),
      adminApi.getDoctors(),
    ]).then(([bRes, dRes]) => {
      setBookings(bRes.data.data || []);
      setDoctors((dRes.data.data || []).filter((d: any) => d.status === 'Active'));
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const handleAssign = async (bookingId: string) => {
    const doctorId = selectedDoctor[bookingId];
    if (!doctorId) return;
    try {
      await assignmentsApi.assign(bookingId, doctorId);
      setBookings(prev => prev.map(b => {
        if (b.id === bookingId) {
          const doc = doctors.find(d => d.id === doctorId);
          return { ...b, status: 'Confirmed', doctor: doc };
        }
        return b;
      }));
      setSnackbar({ open: true, message: 'Doctor assigned successfully!', severity: 'success' });
    } catch (err: any) {
      setSnackbar({ open: true, message: err.response?.data?.message || 'Failed to assign doctor', severity: 'error' });
    }
  };

  const handleConfirm = async (id: string) => {
    try {
      await adminApi.updateBookingStatus(id, 'Confirmed');
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Confirmed' } : b));
      setSnackbar({ open: true, message: 'Booking confirmed!', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to update status', severity: 'error' });
    }
  };

  const pendingBookings = bookings.filter(b => b.status === 'Pending');

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Booking Confirmation Center</Typography>
        <Typography variant="body1" color="text.secondary">Review pending bookings, assign doctors, and confirm appointments.</Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Pending Bookings ({pendingBookings.length})</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {pendingBookings.map((booking) => (
              <Card key={booking.id} sx={{ p: 3, border: '1px solid', borderColor: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>#{String(booking.id).slice(0, 8)}</Typography>
                  <StatusBadge status="Pending" />
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{booking.patient?.fullName || '—'}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {booking.symptoms || 'No symptoms noted'} • {booking.scheduledDate ? new Date(booking.scheduledDate).toLocaleDateString() : '—'}
                </Typography>

                {/* Doctor Assignment Dropdown */}
                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel>Assign Doctor</InputLabel>
                  <Select
                    value={selectedDoctor[booking.id] || ''}
                    label="Assign Doctor"
                    onChange={e => setSelectedDoctor(prev => ({ ...prev, [booking.id]: e.target.value }))}
                  >
                    {doctors.map(d => (
                      <MenuItem key={d.id} value={d.id}>Dr. {d.name} — {d.specialization}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained" size="small" fullWidth
                    onClick={() => handleAssign(booking.id)}
                    disabled={!selectedDoctor[booking.id]}
                    startIcon={<PersonAddIcon />}
                  >
                    Assign & Confirm
                  </Button>
                  <Button variant="outlined" size="small" fullWidth onClick={() => handleConfirm(booking.id)} startIcon={<CheckCircleIcon />}>
                    Confirm Only
                  </Button>
                </Box>
              </Card>
            ))}
            {pendingBookings.length === 0 && (
              <Typography variant="body2" color="text.secondary">No pending bookings to confirm.</Typography>
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Active Doctors ({doctors.length})</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {doctors.map((doctor) => (
              <Card key={doctor.id} sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Dr. {doctor.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{doctor.specialization} • {doctor.experienceYears} Yrs Exp • ₹{doctor.consultationFee}</Typography>
                </Box>
                <StatusBadge status={doctor.isAvailable ? 'Available' : 'Unavailable'} />
              </Card>
            ))}
            {doctors.length === 0 && (
              <Typography variant="body2" color="text.secondary">No active doctors found. Add doctors first.</Typography>
            )}
          </Box>
        </Grid>
      </Grid>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
