'use client';

import { Box, Typography, Button, Card, alpha, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { StatusBadge } from '@/features/admin/StatusBadge';
import { mockBookings, mockDoctors } from '@/services/mockAdminData';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

export default function AssignmentsPage() {
  const theme = useTheme();
  
  const pendingBookings = mockBookings.filter(b => b.doctorStatus === 'Unassigned');
  const availableDoctors = mockDoctors.filter(d => d.availability === 'Available');

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Doctor Assignment Center</Typography>
        <Typography variant="body1" color="text.secondary">Match pending bookings with available doctors in the same area.</Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Pending Bookings ({pendingBookings.length})</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {pendingBookings.map((booking) => (
              <Card key={booking.id} sx={{ p: 3, border: '1px solid', borderColor: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{booking.id}</Typography>
                  <StatusBadge status="Unassigned" />
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{booking.patientName}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{booking.service} • {booking.area}</Typography>
                <Typography variant="caption" sx={{ display: 'inline-block', bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', px: 1, py: 0.5, borderRadius: 1, fontWeight: 700 }}>
                  {booking.bookingDate} | {booking.visitTime}
                </Typography>
              </Card>
            ))}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Available Doctors ({availableDoctors.length})</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {availableDoctors.map((doctor) => (
              <Card key={doctor.id} sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{doctor.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{doctor.specialization} • {doctor.experience}</Typography>
                  <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>Coverage: {doctor.area}</Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'success.main' }}>Rating: ⭐ {doctor.rating}</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.primary' }}>Assignments Today: {doctor.assignmentsToday}</Typography>
                  </Box>
                </Box>
                <Button variant="contained" startIcon={<PersonAddAlt1Icon />}>Assign</Button>
              </Card>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
