'use client';

import { Box, Container, Typography, useTheme, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { fadeInUp, staggerContainer } from '@/constants/animations';
import PersonIcon from '@mui/icons-material/Person';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HouseIcon from '@mui/icons-material/House';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const flowSteps = [
  {
    icon: <PersonIcon sx={{ fontSize: 28 }} />,
    title: 'Patient Request',
    subtitle: 'You submit a request',
    detail: 'Specify symptoms, time & location',
    color: '#4F46E5',
    status: 'Submitted',
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 28 }} />,
    title: 'Admin Review',
    subtitle: 'Our team reviews',
    detail: 'Matching best available doctor',
    color: '#6C63FF',
    status: 'Processing',
  },
  {
    icon: <LocalHospitalIcon sx={{ fontSize: 28 }} />,
    title: 'Doctor Confirmed',
    subtitle: 'Doctor is assigned',
    detail: 'You receive ETA confirmation',
    color: '#0D9488',
    status: 'Confirmed ✓',
  },
  {
    icon: <HouseIcon sx={{ fontSize: 28 }} />,
    title: 'Doctor Arrives',
    subtitle: 'Care at your home',
    detail: 'Professional consultation begins',
    color: '#4F46E5',
    status: 'Completed',
  },
];

export const LiveExperience = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % flowSteps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        bgcolor: isDark ? alpha('#111827', 0.6) : alpha('#EFF6FF', 0.7),
      }}
    >
      <Container maxWidth="lg">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          {/* Header */}
          <motion.div variants={fadeInUp}>
            <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.75, borderRadius: 10, mb: 2, border: '1px solid', borderColor: alpha('#4F46E5', 0.3), bgcolor: alpha('#4F46E5', 0.06) }}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'primary.main' }}>Live Flow</Typography>
              </Box>
              <Typography variant="h2" sx={{ mb: 1.5, fontSize: { xs: '2rem', md: '2.75rem' } }}>
                The{' '}
                <Box component="span" sx={{ background: 'linear-gradient(135deg, #4F46E5, #6C63FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  InHouse Experience
                </Box>
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 520, mx: 'auto' }}>
                From request to doorstep — watch how seamlessly healthcare comes to you.
              </Typography>
            </Box>
          </motion.div>

          {/* Flow Visual */}
          <motion.div variants={fadeInUp}>
            <Box
              sx={{
                maxWidth: 520,
                mx: 'auto',
                bgcolor: 'background.paper',
                borderRadius: 5,
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
                boxShadow: isDark
                  ? '0 32px 80px rgba(0,0,0,0.5)'
                  : '0 32px 80px rgba(25,118,210,0.12)',
              }}
            >
              {/* Header bar */}
              <Box sx={{ px: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ display: 'flex', gap: 0.75 }}>
                  {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
                    <Box key={c} sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: c }} />
                  ))}
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, ml: 1 }}>
                  InHouse Doctor — Live Booking
                </Typography>
              </Box>

              {/* Steps */}
              <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 0 }}>
                {flowSteps.map((step, index) => {
                  const isActive = index === activeStep;
                  const isCompleted = index < activeStep;

                  return (
                    <Box key={index}>
                      <Box
                        sx={{
                          display: 'flex', gap: 2, alignItems: 'flex-start',
                          p: 2, borderRadius: '16px',
                          transition: 'all 0.4s ease',
                          bgcolor: isActive ? alpha(step.color, isDark ? 0.15 : 0.07) : 'transparent',
                          border: '1px solid',
                          borderColor: isActive ? alpha(step.color, 0.4) : 'transparent',
                        }}
                      >
                        {/* Icon */}
                        <Box
                          sx={{
                            width: 48, height: 48, borderRadius: 2, flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.4s ease',
                            bgcolor: isCompleted
                              ? alpha('#0D9488', 0.12)
                              : isActive
                              ? alpha(step.color, 0.12)
                              : alpha('#94A3B8', 0.08),
                            color: isCompleted ? '#0D9488' : isActive ? step.color : 'text.disabled',
                          }}
                        >
                          {isCompleted ? <CheckCircleIcon sx={{ fontSize: 28, color: '#0D9488' }} /> : step.icon}
                        </Box>

                        {/* Content */}
                        <Box sx={{ flexGrow: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: isActive ? step.color : 'text.primary' }}>
                              {step.title}
                            </Typography>
                            <AnimatePresence>
                              {(isActive || isCompleted) && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0 }}
                                >
                                  <Box
                                    sx={{
                                      px: 1.5, py: 0.4, borderRadius: 10, fontSize: '0.7rem', fontWeight: 700,
                                      bgcolor: isCompleted ? alpha('#0D9488', 0.12) : alpha(step.color, 0.12),
                                      color: isCompleted ? '#0D9488' : step.color,
                                    }}
                                  >
                                    {isCompleted ? 'Done ✓' : step.status}
                                  </Box>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                            {step.detail}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Arrow connector */}
                      {index < flowSteps.length - 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', pl: 4, py: 0.25 }}>
                          <ArrowDownwardIcon
                            sx={{
                              fontSize: 18,
                              color: index < activeStep ? '#0D9488' : alpha('#94A3B8', 0.5),
                              transition: 'color 0.4s ease',
                            }}
                          />
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </Box>

              {/* Bottom badge */}
              <Box sx={{ px: 3, py: 2, bgcolor: isDark ? alpha('#1F2937', 0.5) : alpha('#F0FDF4', 0.8), borderTop: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#0D9488', boxShadow: '0 0 0 3px rgba(0,191,165,0.2)' }} />
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  Average doorstep time:{' '}
                  <Box component="span" sx={{ color: '#0D9488' }}>Under 60 minutes</Box>
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};
