'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, alpha, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { servicesApi } from '@/services/api';
import { useBooking } from '@/providers/BookingProvider';

export default function SelectServicePage() {
  const router = useRouter();
  const { state, setService } = useBooking();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    servicesApi.findAllActive().then(res => {
      setServices(res.data.data || []);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const handleContinue = () => {
    if (state.serviceId) {
      router.push('/book/patient');
    }
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>Select a Service</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
        Choose the type of medical service you require.
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      ) : services.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography color="text.secondary">No services available at the moment. Please try again later.</Typography>
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {services.map((svc) => {
            const isSelected = state.serviceId === svc.id;
            return (
              <Grid size={{ xs: 12, sm: 6 }} key={svc.id}>
                <Box
                  onClick={() => setService(svc.id, svc.serviceName, svc.basePrice)}
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
                      <LocalHospitalIcon />
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', bgcolor: alpha('#4F46E5', 0.1), px: 1.5, py: 0.5, borderRadius: 2 }}>
                      Starts at ₹{svc.basePrice}
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>{svc.serviceName}</Typography>
                  {svc.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {svc.description}
                    </Typography>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Box
          component="button" onClick={handleContinue} disabled={!state.serviceId}
          sx={{
            py: 1.5, px: 6, borderRadius: '16px', border: 'none', cursor: state.serviceId ? 'pointer' : 'not-allowed',
            background: state.serviceId ? 'linear-gradient(135deg, #4F46E5, #0D9488)' : 'action.disabledBackground',
            color: state.serviceId ? 'white' : 'text.disabled', fontWeight: 700, fontSize: '1rem',
            boxShadow: state.serviceId ? '0 8px 24px rgba(79, 70, 229, 0.3)' : 'none',
            transition: 'all 0.3s ease', '&:hover': { transform: state.serviceId ? 'translateY(-2px)' : 'none', boxShadow: state.serviceId ? '0 12px 32px rgba(79, 70, 229, 0.4)' : 'none' },
          }}
        >
          Continue to Patient Selection
        </Box>
      </Box>
    </Box>
  );
}
