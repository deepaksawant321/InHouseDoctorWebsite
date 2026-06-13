'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Container, Typography, Grid, CircularProgress } from '@mui/material';
import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/features/home/CtaBanner';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { servicesApi } from '@/services/api';

export default function ServiceDetailsPage() {
  const { slug } = useParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    servicesApi.findBySlug(slug as string)
      .then(res => setService(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 20 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!service) {
    return (
      <Box sx={{ py: 20, textAlign: 'center' }}>
        <Typography variant="h3">Service Not Found</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          The requested service could not be found or is no longer active.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <PageHero
        title={service.serviceName}
        subtitle={service.description || 'Professional healthcare services at home.'}
      />

      <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 8, md: 12 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h2" sx={{ mb: 4, fontWeight: 700 }}>
                Comprehensive {service.serviceName}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, whiteSpace: 'pre-line' }}>
                {service.longDescription || 'Detailed information about this service will be updated shortly. Contact us for more info.'}
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CheckCircleIcon sx={{ color: 'secondary.main' }} />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Base Price: ₹{service.basePrice}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CheckCircleIcon sx={{ color: 'secondary.main' }} />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Certified Professionals</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CheckCircleIcon sx={{ color: 'secondary.main' }} />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Flexible Timings</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  width: '100%', height: 400, borderRadius: 6,
                  backgroundImage: service.imageUrl ? `url(${service.imageUrl})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  background: !service.imageUrl ? 'linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(0, 191, 165, 0.1))' : undefined,
                  border: '1px solid', borderColor: 'divider',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {!service.imageUrl && (
                  <Typography variant="subtitle1" color="text.secondary">Illustration Placeholder</Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <CtaBanner />
    </>
  );
}
