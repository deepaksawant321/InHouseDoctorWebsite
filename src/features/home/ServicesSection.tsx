'use client';

import { Box, Container, Typography, Grid, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/constants/animations';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MasksIcon from '@mui/icons-material/Masks';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import ElderlyIcon from '@mui/icons-material/Elderly';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useEffect, useState } from 'react';
import { servicesApi } from '@/services/api';
import { CircularProgress } from '@mui/material';

const SERVICE_UI_MAP: Record<string, any> = {
  'General Physician': {
    icon: <LocalHospitalIcon sx={{ fontSize: 36 }} />,
    color: '#4F46E5', // Indigo
    gradient: 'linear-gradient(135deg, #4F46E5, #818CF8)',
  },
  'Nursing Care': {
    icon: <MasksIcon sx={{ fontSize: 36 }} />,
    color: '#0D9488', // Teal
    gradient: 'linear-gradient(135deg, #0D9488, #2DD4BF)',
  },
  'Physiotherapy': {
    icon: <DirectionsWalkIcon sx={{ fontSize: 36 }} />,
    color: '#9333EA', // Purple
    gradient: 'linear-gradient(135deg, #9333EA, #C084FC)',
  },
  'Elder Care': {
    icon: <ElderlyIcon sx={{ fontSize: 36 }} />,
    color: '#0284C7', // Sky Blue
    gradient: 'linear-gradient(135deg, #0284C7, #38BDF8)',
  },
};

const DEFAULT_UI = {
  icon: <LocalHospitalIcon sx={{ fontSize: 36 }} />,
  color: '#4F46E5',
  gradient: 'linear-gradient(135deg, #4F46E5, #818CF8)',
};

const FALLBACK_SERVICES = [
  {
    serviceName: 'General Physician',
    description: 'Expert consultation for general health issues, fevers, infections, and routine checkups — all in the comfort of your home.',
  },
  {
    serviceName: 'Nursing Care',
    description: 'Professional nursing support for injections, wound dressing, IV therapy, catheter care, and post-operative care.',
  },
  {
    serviceName: 'Physiotherapy',
    description: 'Customised rehabilitation and pain management through expert physical therapy sessions at your home.',
  },
  {
    serviceName: 'Elder Care',
    description: 'Compassionate, specialised care designed for senior citizens — medical attention, companionship, and dignity at home.',
  },
];

export const ServicesSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    servicesApi.findAllActive().then(res => {
      const data = res.data.data || [];
      if (data.length > 0) {
        setServices(data);
      } else {
        setServices(FALLBACK_SERVICES);
      }
    }).catch(err => {
      console.error(err);
      setServices(FALLBACK_SERVICES);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <Box
      component="section"
      id="services"
      sx={{
        py: { xs: 8, md: 15 },
        bgcolor: isDark ? alpha('#111827', 0.5) : alpha('#F1F5F9', 0.7),
      }}
    >
      <Container maxWidth="lg">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          {/* Section Header */}
          <motion.div variants={fadeInUp}>
            <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.75, borderRadius: 10, mb: 2, border: '1px solid', borderColor: alpha('#0D9488', 0.3), bgcolor: alpha('#0D9488', 0.06) }}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'secondary.main' }}>What We Offer</Typography>
              </Box>
              <Typography variant="h2" sx={{ mb: 1.5, fontSize: { xs: '2rem', md: '2.75rem' } }}>
                Our{' '}
                <Box component="span" sx={{ background: 'linear-gradient(135deg, #4F46E5, #0D9488)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Services
                </Box>
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 480, mx: 'auto' }}>
                Comprehensive medical services brought directly to your doorstep.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={3}>
            {loading ? (
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress />
              </Box>
            ) : (
              services.map((service, index) => {
                const ui = SERVICE_UI_MAP[service.serviceName] || DEFAULT_UI;
                return (
                  <Grid size={{ xs: 12, sm: 6 }} key={service.id || index}>
                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ height: '100%' }}>
                        <Box
                          onClick={() => {
                            if (service.slug) {
                              window.location.href = `/services/${service.slug}`;
                            }
                          }}
                          sx={{
                            height: '100%',
                            p: 4,
                            borderRadius: '32px', // Was 4 which evaluated to 64px!
                            bgcolor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'divider',
                            position: 'relative',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            transition: 'all 0.35s ease',
                            '&:hover': {
                              transform: 'translateY(-6px)',
                              boxShadow: `0 20px 60px ${alpha(ui.color, isDark ? 0.25 : 0.15)}`,
                              borderColor: alpha(ui.color, 0.5),
                              '& .service-arrow': { opacity: 1, transform: 'translateX(0)' },
                              '& .service-glow': { opacity: 1 },
                            },
                          }}
                        >
                        {/* Glow bg */}
                        <Box
                          className="service-glow"
                          sx={{
                            position: 'absolute', inset: 0,
                            background: `radial-gradient(circle at 0% 0%, ${alpha(ui.color, 0.06)} 0%, transparent 60%)`,
                            opacity: 0, transition: 'opacity 0.4s ease', pointerEvents: 'none',
                          }}
                        />

                        {/* Icon */}
                        <Box
                          sx={{
                            width: 68, height: 68, borderRadius: '16px', mb: 3,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: ui.gradient,
                            boxShadow: `0 8px 20px ${alpha(ui.color, 0.35)}`,
                            color: 'white',
                          }}
                        >
                          {ui.icon}
                        </Box>

                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                          {service.serviceName}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.75, mb: 3 }}>
                          {service.description || 'Professional home healthcare service tailored to your needs.'}
                        </Typography>

                        <Box
                          className="service-arrow"
                          sx={{
                            display: 'inline-flex', alignItems: 'center', gap: 0.5,
                            color: ui.color, fontWeight: 700, fontSize: '0.875rem',
                            opacity: 0, transform: 'translateX(-8px)',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          Learn more <ArrowForwardIcon sx={{ fontSize: 16 }} />
                        </Box>
                      </Box>
                    </motion.div>
                  </Grid>
                );
              })
            )}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};
