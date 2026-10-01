'use client';

import { Box, Container, Typography, Grid, alpha, useTheme } from '@mui/material';
import { m as motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/constants/animations';
import { accent } from '@/theme/accent';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BoltIcon from '@mui/icons-material/Bolt';
import LockIcon from '@mui/icons-material/Lock';
import HomeIcon from '@mui/icons-material/Home';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const features = [
  {
    icon: <VerifiedUserIcon />,
    title: 'Verified Doctors',
    description: 'Every doctor on our platform is thoroughly background-checked, license-verified, and peer-reviewed before joining.',
    color: '#0A5CB8',
  },
  {
    icon: <BoltIcon />,
    title: 'Fast Assignment',
    description: 'Our intelligent dispatch system assigns the nearest available doctor within minutes of your request.',
    color: '#14B5A5',
  },
  {
    icon: <LockIcon />,
    title: 'Secure Process',
    description: 'Your health data is encrypted and protected using enterprise-grade security standards.',
    color: '#2B8CE6',
  },
  {
    icon: <HomeIcon />,
    title: 'Home Convenience',
    description: 'No waiting rooms, no travel. Premium healthcare from the comfort of your home.',
    color: '#0A5CB8',
  },
  {
    icon: <PriceCheckIcon />,
    title: 'Affordable Pricing',
    description: 'Transparent, fair pricing with no hidden fees. Quality healthcare that fits your budget.',
    color: '#14B5A5',
  },
  {
    icon: <SupportAgentIcon />,
    title: 'Trusted Support',
    description: 'Our dedicated support team is available 24x7 to handle any queries or emergencies.',
    color: '#2B8CE6',
  },
];

export const WhyChooseUs = () => {
  const isDark = useTheme().palette.mode === 'dark';

  return (
    <Box
      component="section"
      sx={{ py: { xs: 7, md: 10 }, bgcolor: isDark ? '#10284A' : '#EAF5FD', borderTop: isDark ? '1px solid rgba(255,255,255,0.08)' : 'none', borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : 'none' }}
    >
      <Container maxWidth="lg">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <motion.div variants={fadeInUp}>
            <Box sx={{ mb: { xs: 4, md: 6 } }}>
              <Typography variant="h2" sx={{ mb: 1, fontSize: { xs: '1.75rem', md: '2.4rem' } }}>
                Why Choose Us
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 520 }}>
                Experience the very best in-home medical care with benefits designed around you.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={{ xs: 4, md: 5 }}>
            {features.map((feature) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={feature.title}>
                <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, alignItems: 'flex-start', gap: { xs: 2, md: 1.25 } }}>
                    <Box
                      sx={{
                        width: 52, height: 52, borderRadius: '50%', mb: 0.5, flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        bgcolor: isDark ? alpha(accent(feature.color, true), 0.2) : 'background.paper', color: accent(feature.color, isDark),
                        boxShadow: isDark ? 'none' : '0 6px 18px rgba(10, 92, 184, 0.12)',
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Box><Typography component="h3" variant="subtitle1" sx={{ fontSize: "1.1rem", fontWeight: 700, mb: 0.75 }}>{feature.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{feature.description}</Typography></Box>
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
