'use client';

import { Box, Typography, Button, Grid, Card, CardActionArea, CardContent, alpha, useTheme, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState, useEffect } from 'react';
import { patientsApi } from '@/services/api';
import { useBooking } from '@/providers/BookingProvider';

export default function SelectPatient() {
  const router = useRouter();
  const theme = useTheme();
  const { setPatient } = useBooking();

  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    patientsApi.getAll()
      .then(res => setPatients(Array.isArray(res.data) ? res.data : (res.data?.data || [])))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSelectPatient = (id: string, name: string) => {
    setPatient(id, name);
    router.push('/book/address');
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
        Who is this booking for?
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Select a family member or add a new patient to continue.
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {patients.map((p) => {
            // Calculate age roughly
            const age = p.dateOfBirth ? new Date().getFullYear() - new Date(p.dateOfBirth).getFullYear() : 'Unknown';
            return (
              <Grid size={{ xs: 12, sm: 6 }} key={p.id}>
                <Card elevation={0} sx={{ borderRadius: '24px', border: '1px solid', borderColor: 'divider', transition: 'all 0.3s ease', '&:hover': { borderColor: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.02), transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(79, 70, 229, 0.12)' } }}>
                  <CardActionArea onClick={() => handleSelectPatient(p.id, p.fullName)} sx={{ p: 3 }}>
                    <CardContent sx={{ p: 0 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {p.fullName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {p.relationship} • {age} yrs, {p.gender}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}

          <Grid size={{ xs: 12, sm: 6 }}>
            <Card elevation={0} sx={{ borderRadius: '24px', border: '2px dashed', borderColor: 'divider', height: '100%', minHeight: 120, transition: 'all 0.3s ease', '&:hover': { borderColor: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.02), transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(79, 70, 229, 0.12)' } }}>
              <CardActionArea onClick={() => router.push('/dashboard/patients/add')} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <CardContent sx={{ p: 0, textAlign: 'center' }}>
                  <AddCircleIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                    Add New Patient
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
