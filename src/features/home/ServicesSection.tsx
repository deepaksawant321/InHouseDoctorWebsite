'use client';

import { Box, Container, Typography, Grid, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/constants/animations';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MasksIcon from '@mui/icons-material/Masks';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import ElderlyIcon from '@mui/icons-material/Elderly';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const services = [
  {
    icon: <LocalHospitalIcon sx={{ fontSize: 36 }} />,
    title: 'General Physician',
    description: 'Expert consultation for general health issues, fevers, infections, and routine checkups — all in the comfort of your home.',
    color: '#1976D2',
    gradient: 'linear-gradient(135deg, #1976D2, #42A5F5)',
  },
  {
    icon: <MasksIcon sx={{ fontSize: 36 }} />,
    title: 'Nursing Care',
    description: 'Professional nursing support for injections, wound dressing, IV therapy, catheter care, and post-operative care.',
    color: '#00BFA5',
    gradient: 'linear-gradient(135deg, #00BFA5, #33CCBB)',
  },
  {
    icon: <DirectionsWalkIcon sx={{ fontSize: 36 }} />,
    title: 'Physiotherapy',
    description: 'Customised rehabilitation and pain management through expert physical therapy sessions at your home.',
    color: '#6C63FF',
    gradient: 'linear-gradient(135deg, #6C63FF, #9D97FF)',
  },
  {
    icon: <ElderlyIcon sx={{ fontSize: 36 }} />,
    title: 'Elder Care',
    description: 'Compassionate, specialised care designed for senior citizens — medical attention, companionship, and dignity at home.',
    color: '#1976D2',
    gradient: 'linear-gradient(135deg, #1565C0, #6C63FF)',
  },
];

export const ServicesSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

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
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.75, borderRadius: 10, mb: 2, border: '1px solid', borderColor: alpha('#00BFA5', 0.3), bgcolor: alpha('#00BFA5', 0.06) }}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'secondary.main' }}>What We Offer</Typography>
              </Box>
              <Typography variant="h2" sx={{ mb: 1.5, fontSize: { xs: '2rem', md: '2.75rem' } }}>
                Our{' '}
                <Box component="span" sx={{ background: 'linear-gradient(135deg, #00BFA5, #6C63FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Services
                </Box>
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 480, mx: 'auto' }}>
                Comprehensive medical services brought directly to your doorstep.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={3}>
            {services.map((service, index) => (
              <Grid size={{ xs: 12, sm: 6 }} key={index}>
                <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                  <Box
                    sx={{
                      height: '100%',
                      p: 4,
                      borderRadius: 4,
                      bgcolor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.35s ease',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: `0 20px 60px ${alpha(service.color, isDark ? 0.25 : 0.15)}`,
                        borderColor: alpha(service.color, 0.5),
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
                        background: `radial-gradient(circle at 0% 0%, ${alpha(service.color, 0.06)} 0%, transparent 60%)`,
                        opacity: 0, transition: 'opacity 0.4s ease', pointerEvents: 'none',
                      }}
                    />

                    {/* Icon */}
                    <Box
                      sx={{
                        width: 68, height: 68, borderRadius: 3, mb: 3,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: service.gradient,
                        boxShadow: `0 8px 20px ${alpha(service.color, 0.35)}`,
                        color: 'white',
                      }}
                    >
                      {service.icon}
                    </Box>

                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.75, mb: 3 }}>
                      {service.description}
                    </Typography>

                    <Box
                      className="service-arrow"
                      sx={{
                        display: 'inline-flex', alignItems: 'center', gap: 0.5,
                        color: service.color, fontWeight: 700, fontSize: '0.875rem',
                        opacity: 0, transform: 'translateX(-8px)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Learn more <ArrowForwardIcon sx={{ fontSize: 16 }} />
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};
