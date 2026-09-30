'use client';

import { Box, Container, Typography, Grid, useTheme, alpha } from '@mui/material';
import { m as motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/constants/animations';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BoltIcon from '@mui/icons-material/Bolt';
import LockIcon from '@mui/icons-material/Lock';
import HomeIcon from '@mui/icons-material/Home';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const features = [
  {
    icon: <VerifiedUserIcon sx={{ fontSize: 28 }} />,
    title: 'Verified Doctors',
    description: 'Every doctor on our platform is thoroughly background-checked, license-verified, and peer-reviewed before joining.',
    color: '#4F46E5',
    large: true,
  },
  {
    icon: <BoltIcon sx={{ fontSize: 28 }} />,
    title: 'Fast Assignment',
    description: 'Our intelligent dispatch system assigns the nearest available doctor within minutes of your request.',
    color: '#0D9488',
    large: false,
  },
  {
    icon: <LockIcon sx={{ fontSize: 28 }} />,
    title: 'Secure Process',
    description: 'Your health data is encrypted and protected using enterprise-grade security standards.',
    color: '#6C63FF',
    large: false,
  },
  {
    icon: <HomeIcon sx={{ fontSize: 28 }} />,
    title: 'Home Convenience',
    description: 'No waiting rooms, no travel. Premium healthcare from the comfort of your home.',
    color: '#4F46E5',
    large: false,
  },
  {
    icon: <PriceCheckIcon sx={{ fontSize: 28 }} />,
    title: 'Affordable Pricing',
    description: 'Transparent, fair pricing with no hidden fees. Quality healthcare that fits your budget.',
    color: '#0D9488',
    large: false,
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 28 }} />,
    title: 'Trusted Support',
    description: 'Our dedicated support team is available 24x7 to handle any queries or emergencies.',
    color: '#6C63FF',
    large: false,
  },
];

const FeatureItem = ({ feature, large }: { feature: typeof features[0]; large: boolean }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <Box
      sx={{
        p: { xs: 3, md: large ? 5 : 3.5 },
        height: '100%',
        borderRadius: '24px',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: alpha(feature.color, 0.5),
          transform: 'translateY(-4px)',
          boxShadow: `0 16px 48px ${alpha(feature.color, isDark ? 0.2 : 0.12)}`,
          '& .feature-icon-box': {
            transform: 'scale(1.1) rotate(-5deg)',
          },
        },
      }}
    >
      <Box
        className="feature-icon-box"
        sx={{
          width: large ? 64 : 52, height: large ? 64 : 52,
          borderRadius: '16px',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          mb: 2.5,
          bgcolor: alpha(feature.color, 0.1),
          color: feature.color,
          transition: 'transform 0.3s ease',
        }}
      >
        {feature.icon}
      </Box>
      <Typography variant={large ? 'h5' : 'h6'} sx={{ fontWeight: 700, mb: 1.5 }}>
        {feature.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
        {feature.description}
      </Typography>
    </Box>
  );
};

export const WhyChooseUs = () => {
  const [main, ...rest] = features;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          {/* Header */}
          <motion.div variants={fadeInUp}>
            <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.75, borderRadius: 10, mb: 2, border: '1px solid', borderColor: alpha('#4F46E5', 0.3), bgcolor: alpha('#4F46E5', 0.06) }}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'primary.main' }}>Why Us</Typography>
              </Box>
              <Typography variant="h2" sx={{ mb: 1.5, fontSize: { xs: '2rem', md: '2.75rem' } }}>
                Why{' '}
                <Box component="span" sx={{ background: 'linear-gradient(135deg, #4F46E5, #6C63FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Choose Us
                </Box>
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 480, mx: 'auto' }}>
                Experience the very best in-home medical care with benefits designed around you.
              </Typography>
            </Box>
          </motion.div>

          {/* Bento Grid */}
          <Grid container spacing={3}>
            {/* Large featured card */}
            <Grid size={{ xs: 12, md: 5 }}>
              <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                <FeatureItem feature={main} large />
              </motion.div>
            </Grid>

            {/* Right 2x2 */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Grid container spacing={3} sx={{ height: '100%' }}>
                {rest.slice(0, 4).map((feature, i) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={i}>
                    <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                      <FeatureItem feature={feature} large={false} />
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Bottom last card */}
            <Grid size={{ xs: 12, md: 5 }}>
              <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                <FeatureItem feature={rest[4]} large={false} />
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};
