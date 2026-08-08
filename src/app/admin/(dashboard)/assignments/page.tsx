'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, alpha, useTheme, CircularProgress, MenuItem, Select, FormControl, InputLabel, Snackbar, Alert, Tabs, Tab } from '@mui/material';
import Grid from '@mui/material/Grid';
import { StatusBadge } from '@/features/admin/StatusBadge';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { adminApi, assignmentsApi, servicesApi } from '@/services/api';

export default function AssignmentsPage() {
  const theme = useTheme();
  
  const [bookings, setBookings] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Record<string, string>>({});
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    Promise.all([
      adminApi.getBookings(),
      adminApi.getDoctors(),
      servicesApi.findAllActive(),
    ]).then(([bRes, dRes, sRes]) => {
      setBookings(bRes.data.data || []);
      setDoctors((dRes.data.data || []).filter((d: any) => d.status === 'Active'));
      setServices(sRes.data.data || []);
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
          return { ...b, status: 'DoctorAssigned', doctor: doc };
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

  const getFilteredDoctors = (bookingServiceId: number) => {
    const service = services.find(s => s.id === bookingServiceId);
    if (!service) return doctors; // Fallback
    
    const svcName = service.serviceName;
    if (['Elder Care', 'Nursing Care', 'Physiotherapy'].includes(svcName)) {
      const filtered = doctors.filter(d => d.specialization === svcName);
      return filtered.length > 0 ? filtered : doctors;
    }
    
    // For normal Doctor Consultations, show those who are not specifically Elder/Nursing/Physio
    return doctors.filter(d => !['Elder Care', 'Nursing Care', 'Physiotherapy'].includes(d.specialization));
  };

  const pendingBookings = bookings.filter(b => b.status === 'Pending' || b.status === 'Created' || b.status === 'PaymentVerified' || b.status === 'PaymentPending');
  const assignedBookings = bookings.filter(b => b.status === 'DoctorAssigned' || b.status === 'DoctorConfirmed' || b.status === 'VisitStarted' || b.status === 'VisitCompleted');

  const handleRevoke = async (id: string) => {
    try {
      await assignmentsApi.revoke(id);
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'PaymentVerified', doctor: null } : b));
      setSnackbar({ open: true, message: 'Doctor assignment revoked!', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to revoke assignment', severity: 'error' });
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Booking Confirmation Center</Typography>
        <Typography variant="body1" color="text.secondary">Review pending bookings, assign doctors, and confirm appointments.</Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
          <Tab label={`Pending Assignments (${pendingBookings.length})`} />
          <Tab label={`Assigned Bookings (${assignedBookings.length})`} />
        </Tabs>
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {tabValue === 0 && pendingBookings.map((booking) => (
              <Card key={booking.id} sx={{ p: 3, border: '1px solid', borderColor: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>#{String(booking.id).slice(0, 8)}</Typography>
                  <StatusBadge status={booking.status} />
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{booking.patient?.fullName || '—'}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {booking.symptoms || 'No symptoms noted'} • {booking.scheduledDate ? new Date(booking.scheduledDate).toLocaleDateString() : '—'}
                </Typography>

                {/* Professional Assignment Dropdown */}
                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel>Assign Professional</InputLabel>
                  <Select
                    value={selectedDoctor[booking.id] || ''}
                    label="Assign Professional"
                    onChange={e => setSelectedDoctor(prev => ({ ...prev, [booking.id]: e.target.value }))}
                  >
                    {getFilteredDoctors(booking.serviceId).map(d => (
                      <MenuItem key={d.id} value={d.id}>{d.specialization !== 'General Physician' && d.specialization !== 'Cardiologist' && d.specialization !== 'Dermatologist' && d.specialization !== 'Pediatrician' ? '' : 'Dr. '}{d.name} — {d.specialization}</MenuItem>
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
                    Assign Professional
                  </Button>
                </Box>
              </Card>
            ))}
            {tabValue === 0 && pendingBookings.length === 0 && (
              <Typography variant="body2" color="text.secondary">No pending bookings to assign.</Typography>
            )}

            {tabValue === 1 && assignedBookings.map((booking) => (
              <Card key={booking.id} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>#{String(booking.id).slice(0, 8)}</Typography>
                  <StatusBadge status={booking.status} />
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>Patient: {booking.patient?.fullName || '—'}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {booking.scheduledDate ? new Date(booking.scheduledDate).toLocaleDateString() : '—'}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}>
                  Assigned to: {booking.doctor?.specialization !== 'General Physician' && booking.doctor?.specialization !== 'Cardiologist' && booking.doctor?.specialization !== 'Dermatologist' && booking.doctor?.specialization !== 'Pediatrician' ? '' : 'Dr. '}{booking.doctor?.name || 'Unknown'}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="outlined" color="error" size="small" fullWidth onClick={() => handleRevoke(booking.id)}>
                    Revoke Assignment
                  </Button>
                </Box>
              </Card>
            ))}
            {tabValue === 1 && assignedBookings.length === 0 && (
              <Typography variant="body2" color="text.secondary">No assigned bookings found.</Typography>
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Active Professionals ({doctors.length})</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {doctors.map((doctor) => (
              <Card key={doctor.id} sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {doctor.specialization !== 'General Physician' && doctor.specialization !== 'Cardiologist' && doctor.specialization !== 'Dermatologist' && doctor.specialization !== 'Pediatrician' ? '' : 'Dr. '}{doctor.name}
                  </Typography>
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
