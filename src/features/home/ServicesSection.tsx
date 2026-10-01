'use client';

import { jsonLdString } from '@/utils/jsonLd';
import { Box, Container, Typography, Grid, useTheme, alpha } from '@mui/material';
import { m as motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { accent } from '@/theme/accent';
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
    color: '#0A5CB8', // Indigo
    gradient: 'linear-gradient(135deg, #0A5CB8, #4F95DB)',
  },
  'Nursing Care': {
    icon: <MasksIcon sx={{ fontSize: 36 }} />,
    color: '#14B5A5', // Teal
    gradient: 'linear-gradient(135deg, #14B5A5, #5FD9CB)',
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
  color: '#0A5CB8',
  gradient: 'linear-gradient(135deg, #0A5CB8, #4F95DB)',
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

export const ServicesSection = ({ showHeader = true }: { showHeader?: boolean }) => {
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
        py: { xs: 7, md: 10 },
        bgcolor: isDark ? '#0A1626' : 'background.paper',
      }}
    >
      {services.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdString(
              services.map(service => ({
                "@context": "https://schema.org",
                "@type": "Service",
                name: service.serviceName,
                description: service.description || "Professional home healthcare service.",
                provider: {
                  "@type": "Organization",
                  name: "Doctor Doorstep"
                },
                areaServed: {
                  "@type": "City",
                  name: "Mumbai"
                }
              }))
            )
          }}
        />
      )}
      <Container maxWidth="lg">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <Grid container spacing={{ xs: 4, md: 6 }} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 7 }}>
          {/* Section Header */}
          {showHeader && (
          <motion.div variants={fadeInUp}>
            <Box sx={{ mb: { xs: 4, md: 5 } }}>
              <Typography variant="h2" sx={{ mb: 1, fontSize: { xs: '1.75rem', md: '2.4rem' } }}>
                Complete Care for Every Stage of Life
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 480 }}>
                Comprehensive medical services brought directly to your doorstep.
              </Typography>
            </Box>
          </motion.div>
          )}

          <Grid container spacing={2}>
            {loading ? (
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress />
              </Box>
            ) : (
              services.map((service, index) => {
                const ui = SERVICE_UI_MAP[service.serviceName] || DEFAULT_UI;
                const uiColor = accent(ui.color, isDark);
                return (
                  <Grid size={{ xs: 6 }} key={service.id || index}>
                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ height: '100%' }}>
                      <Box
                        {...(service.slug ? { component: Link, href: `/services/${service.slug}` } : {})}
                        sx={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                          color: 'inherit', textDecoration: 'none', height: '100%',
                          p: { xs: 2, md: 2.5 }, borderRadius: '18px',
                          bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider',
                          boxShadow: isDark ? 'none' : '0 4px 16px rgba(10, 92, 184, 0.05)',
                          cursor: 'pointer', transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: `0 14px 36px ${alpha(uiColor, isDark ? 0.25 : 0.16)}`,
                            borderColor: alpha(uiColor, 0.5),
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 52, height: 52, borderRadius: '50%', mb: 1.5,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            bgcolor: alpha(uiColor, 0.12), color: uiColor,
                          }}
                        >
                          {ui.icon}
                        </Box>
                        <Typography component="h3" variant="subtitle1" sx={{ fontSize: '1rem', fontWeight: 700, mb: 0.5 }}>
                          {service.serviceName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {service.description || 'Professional home healthcare service tailored to your needs.'}
                        </Typography>
                        <Box sx={{ mt: 1.25, display: 'inline-flex', alignItems: 'center', gap: 0.5, color: uiColor, fontWeight: 700, fontSize: '0.8rem' }}>
                          Learn more <ArrowForwardIcon sx={{ fontSize: 14 }} />
                        </Box>
                      </Box>
                    </motion.div>
                  </Grid>
                );
              })
            )}
          </Grid>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
            Available 24/7 across Mumbai · Pricing varies by location and service type.
          </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div variants={fadeInUp}>
              <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '28px', minHeight: { xs: 280, md: 400 }, bgcolor: '#E3F1FB', boxShadow: isDark ? '0 16px 48px rgba(91, 168, 240, 0.16)' : '0 16px 48px rgba(10, 92, 184, 0.12)', border: isDark ? '1px solid rgba(255,255,255,0.14)' : 'none' }}>
                <Image src="/images/7653136.jpg" alt="A doctor checking a young girl while her mother looks on, at home" fill sizes="(max-width: 900px) 100vw, 40vw" style={{ objectFit: 'cover', objectPosition: '38% 50%', filter: isDark ? 'brightness(0.85)' : 'none' }} />
                <Box sx={{ position: 'absolute', inset: 0, background: isDark ? 'linear-gradient(90deg, rgba(10,22,38,0.95) 0%, rgba(10,22,38,0.7) 45%, transparent 80%)' : 'linear-gradient(90deg, rgba(234,245,253,0.97) 0%, rgba(234,245,253,0.78) 42%, transparent 78%)' }} />
                <Box sx={{ position: 'relative', p: { xs: 3, md: 4 }, maxWidth: { xs: '75%', md: '58%' }, display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: { xs: 280, md: 400 } }}>
                  <Typography component="h3" variant="subtitle1" sx={{ fontSize: { xs: '1.5rem', md: '1.9rem' }, fontWeight: 800, lineHeight: 1.15, mb: 1.5 }}>
                    Care for Every Generation
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontSize: '0.95rem' }}>Because every life stage matters.</Typography>
                  <Box aria-hidden sx={{ width: 36, height: 3, borderRadius: 2, mt: 2, bgcolor: 'secondary.main' }} />
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};
