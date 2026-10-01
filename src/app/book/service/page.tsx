'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, alpha, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { servicesApi } from '@/services/api';
import { useBooking } from '@/providers/BookingProvider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { WizardNav } from '@/features/booking/WizardNav';
import { StepHeader, serviceIconFor } from '@/features/booking/StepHeader';

export default function SelectServicePage() {
  const router = useRouter();
  const { state, setService } = useBooking();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    servicesApi.findAllActive().then(res => {
      setServices(res.data.data || []);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoadError(true);
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
      <StepHeader icon={<LocalHospitalIcon />} title="Select a Service" subtitle="Choose the type of care you need at home." />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      ) : services.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography color="text.secondary">{loadError ? "We couldn't load our services. Please check your connection and refresh the page." : 'No services available at the moment. Please try again later.'}</Typography>
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {services.map((svc) => {
            const isSelected = state.serviceId === svc.id;
            return (
              <Grid size={{ xs: 12, sm: 6 }} key={svc.id}>
                <Box
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onClick={() => setService(svc.id, svc.serviceName, svc.basePrice)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setService(svc.id, svc.serviceName, svc.basePrice);
                    }
                  }}
                  sx={{
                    '&:focus-visible': { outline: '3px solid', outlineColor: 'primary.main', outlineOffset: 2 },
                    p: 2.5, borderRadius: '20px', height: '100%', cursor: 'pointer',
                    bgcolor: isSelected ? alpha('#0A5CB8', 0.04) : 'background.paper',
                    border: '2px solid',
                    borderColor: isSelected ? 'primary.main' : 'divider',
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'translateY(-4px)', borderColor: isSelected ? 'primary.main' : alpha('#0A5CB8', 0.5), boxShadow: '0 8px 24px rgba(10, 92, 184, 0.12)' }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: '12px', bgcolor: isSelected ? 'primary.main' : alpha('#0A5CB8', 0.1), color: isSelected ? 'white' : 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                      {serviceIconFor(svc.serviceName)}
                    </Box>
                    {isSelected ? (
                      <CheckCircleIcon color="primary" aria-label="Selected" />
                    ) : (
                      <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main', bgcolor: alpha('#0A5CB8', 0.1), px: 1.25, py: 0.4, borderRadius: 2 }}>
                        ₹{svc.basePrice}
                      </Typography>
                    )}
                  </Box>
                  <Typography component="h2" variant="subtitle1" sx={{ fontSize: '1.05rem', fontWeight: 700, mb: 0.5 }}>{svc.serviceName}</Typography>
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

      <WizardNav onNext={handleContinue} nextDisabled={!state.serviceId} nextLabel="Continue to Patient Selection" />
    </Box>
  );
}
