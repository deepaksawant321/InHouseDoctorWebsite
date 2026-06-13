'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, alpha, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import StarIcon from '@mui/icons-material/Star';
import { doctorsApi } from '@/services/api';
import { useBooking } from '@/providers/BookingProvider';

export default function SelectServicePage() {
  const router = useRouter();
  const { state, setDoctor } = useBooking();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    doctorsApi.getAll().then(res => {
      setDoctors(res.data.data || []);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const handleContinue = () => {
    if (state.doctorId) {
      router.push('/book/details');
    }
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>Select a Doctor</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
        Choose a verified medical professional for your home visit.
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      ) : doctors.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography color="text.secondary">No doctors available at the moment. Please try again later.</Typography>
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {doctors.map((doc) => {
            const isSelected = state.doctorId === doc.id;
            return (
              <Grid size={{ xs: 12, sm: 6 }} key={doc.id}>
                <Box
                  onClick={() => setDoctor(doc.id, `Dr. ${doc.name}`, doc.consultationFee)}
                  sx={{
                    p: 3, borderRadius: '24px', height: '100%', cursor: 'pointer',
                    bgcolor: isSelected ? alpha('#4F46E5', 0.04) : 'background.paper',
                    border: '2px solid',
                    borderColor: isSelected ? 'primary.main' : 'divider',
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'translateY(-4px)', borderColor: isSelected ? 'primary.main' : alpha('#4F46E5', 0.5), boxShadow: '0 8px 24px rgba(79, 70, 229, 0.12)' }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: isSelected ? 'primary.main' : alpha('#4F46E5', 0.1), color: isSelected ? 'white' : 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MedicalServicesIcon />
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', bgcolor: alpha('#4F46E5', 0.1), px: 1.5, py: 0.5, borderRadius: 2 }}>
                      ₹{doc.consultationFee}
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>Dr. {doc.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {doc.specialization} • {doc.experienceYears} Years Exp
                  </Typography>
                  {doc.qualification && (
                    <Typography variant="caption" color="text.secondary">{doc.qualification}</Typography>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Box
          component="button" onClick={handleContinue} disabled={!state.doctorId}
          sx={{
            py: 1.5, px: 6, borderRadius: '16px', border: 'none', cursor: state.doctorId ? 'pointer' : 'not-allowed',
            background: state.doctorId ? 'linear-gradient(135deg, #4F46E5, #0D9488)' : 'action.disabledBackground',
            color: state.doctorId ? 'white' : 'text.disabled', fontWeight: 700, fontSize: '1rem',
            boxShadow: state.doctorId ? '0 8px 24px rgba(79, 70, 229, 0.3)' : 'none',
            transition: 'all 0.3s ease', '&:hover': { transform: state.doctorId ? 'translateY(-2px)' : 'none', boxShadow: state.doctorId ? '0 12px 32px rgba(79, 70, 229, 0.4)' : 'none' },
          }}
        >
          Continue to Details
        </Box>
      </Box>
    </Box>
  );
}
