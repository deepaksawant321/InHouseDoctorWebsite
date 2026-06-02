'use client';

import { Box, Container, Typography, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/constants/animations';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

const steps = [
  {
    number: '01',
    icon: <AssignmentIcon sx={{ fontSize: 28 }} />,
    title: 'Request Service',
    description: 'Tell us your health concern and preferred time. No waiting rooms, no hassle.',
    color: '#1976D2',
  },
  {
    number: '02',
    icon: <ManageAccountsIcon sx={{ fontSize: 28 }} />,
    title: 'Admin Assigns Doctor',
    description: 'Our team carefully matches you with the most suitable verified doctor.',
    color: '#00BFA5',
  },
  {
    number: '03',
    icon: <DirectionsCarIcon sx={{ fontSize: 28 }} />,
    title: 'Doctor Visits Home',
    description: 'Your doctor arrives at your home, fully equipped for the consultation.',
    color: '#6C63FF',
  },
  {
    number: '04',
    icon: <HealthAndSafetyIcon sx={{ fontSize: 28 }} />,
    title: 'Receive Care',
    description: 'Get professional diagnosis, treatment, and a personalised care plan.',
    color: '#00BFA5',
  },
];

export const HowItWorks = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="section"
      id="how-it-works"
      sx={{ py: { xs: 8, md: 15 }, bgcolor: 'background.default' }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <motion.div variants={fadeInUp}>
            <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.75, borderRadius: 10, mb: 2, border: '1px solid', borderColor: alpha('#6C63FF', 0.3), bgcolor: alpha('#6C63FF', 0.06) }}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: '#6C63FF' }}>Simple Process</Typography>
              </Box>
              <Typography variant="h2" sx={{ mb: 1.5, fontSize: { xs: '2rem', md: '2.75rem' } }}>
                How It{' '}
                <Box component="span" sx={{ background: 'linear-gradient(135deg, #1976D2, #00BFA5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Works
                </Box>
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 500, mx: 'auto' }}>
                Four simple steps to get premium healthcare delivered to your doorstep.
              </Typography>
            </Box>
          </motion.div>

          {/* Steps — horizontal timeline on desktop, vertical on mobile */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
              gap: { xs: 2, md: 0 },
              position: 'relative',
            }}
          >
            {/* Connector line (desktop only) */}
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                position: 'absolute',
                top: 56,
                left: '12.5%',
                right: '12.5%',
                height: 2,
                background: `linear-gradient(90deg, #1976D2, #00BFA5, #6C63FF, #00BFA5)`,
                zIndex: 0,
              }}
            />

            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                custom={index}
                style={{ position: 'relative', zIndex: 1 }}
              >
                <Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, alignItems: { xs: 'flex-start', md: 'center' }, gap: 3, textAlign: { xs: 'left', md: 'center' }, px: { md: 2 } }}>
                  {/* Icon Circle */}
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: 72, height: 72, borderRadius: '50%',
                      bgcolor: 'background.paper',
                      border: '3px solid',
                      borderColor: step.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 8px 24px ${alpha(step.color, 0.25)}`,
                      position: 'relative',
                      mx: { md: 'auto' },
                      color: step.color,
                    }}
                  >
                    {step.icon}
                    <Box
                      sx={{
                        position: 'absolute', top: -10, right: -10,
                        width: 28, height: 28, borderRadius: '50%',
                        bgcolor: step.color, color: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.65rem', fontWeight: 800,
                      }}
                    >
                      {step.number}
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.75 }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {step.description}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};
