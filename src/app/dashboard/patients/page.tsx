'use client';

import { Box, Typography, Button, Grid, Card, CardContent, Chip, IconButton, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import { patientsApi } from '@/services/api';
import EmptyState from '@/components/EmptyState';
import PersonIcon from '@mui/icons-material/Person';

export default function MyPatients() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchPatients = () => {
    setLoading(true);
    patientsApi.getAll().then(res => {
      const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      const mapped = data.map((p: any) => ({
        id: p.id,
        name: p.fullName || 'Unknown',
        age: p.age || 'N/A',
        gender: p.gender || 'N/A',
        relationship: p.relationship || 'Self',
        lastBooking: 'N/A', // Would require joining bookings
      }));
      setPatients(mapped);
    }).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this patient?')) return;
    setDeleting(id);
    try {
      await patientsApi.delete(id);
      fetchPatients();
    } catch (err) {
      console.error(err);
      alert('Failed to delete patient. Ensure there are no active bookings.');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          My Patients
        </Typography>
        <Button
          component={Link}
          href="/dashboard/patients/add"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2, px: 3, py: 1, textTransform: 'none', fontWeight: 600 }}
        >
          Add Patient
        </Button>
      </Box>

      <Grid container spacing={3}>
        {patients.length === 0 ? (
          <EmptyState 
            title="No Patients Found" 
            description="You haven't added any family members or patients yet." 
            actionText="Add Patient"
            actionHref="/dashboard/patients/add"
            icon={<PersonIcon />}
          />
        ) : (
          patients.map((p) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={p.id}>
              <Card elevation={0} sx={{ borderRadius: '16px', border: '1px solid', borderColor: 'divider' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {p.name}
                    </Typography>
                    <Chip
                      label={p.relationship}
                      size="small"
                      color={p.relationship === 'Self' ? 'primary' : 'default'}
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {p.age} years • {p.gender}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Last Booking: <strong>{p.lastBooking}</strong>
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, borderTop: '1px solid', borderColor: 'divider', pt: 2 }}>
                    <Button variant="outlined" size="small" sx={{ borderRadius: 2, textTransform: 'none', flexGrow: 1 }}>
                      View History
                    </Button>
                    <IconButton size="small" color="primary" component={Link} href={`/dashboard/patients/edit/${p.id}`}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(p.id)} disabled={deleting === p.id}>
                      {deleting === p.id ? <CircularProgress size={20} /> : <DeleteIcon fontSize="small" />}
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
