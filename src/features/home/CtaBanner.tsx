'use client';

import Link from 'next/link';

import { Box, Container, Typography, useTheme, alpha } from '@mui/material';
import { m as motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PhoneIcon from '@mui/icons-material/Phone';

export const CtaBanner = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{ py: { xs: 8, md: 15 }, position: 'relative', overflow: 'hidden' }}
    >
      {/* Gradient background */}
      <Box
        sx={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #4F46E5 0%, #0D9488 100%)',
        }}
      />

      {/* Floating background shapes */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: 500, height: 500, borderRadius: '50%',
          border: `1px solid ${alpha('#ffffff', 0.12)}`,
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          position: 'absolute', bottom: '-20%', left: '-10%',
          width: 400, height: 400, borderRadius: '50%',
          border: `1px solid ${alpha('#ffffff', 0.1)}`,
        }}
      />
      <Box
        sx={{
          position: 'absolute', top: '15%', left: '10%',
          width: 120, height: 120, borderRadius: '50%',
          bgcolor: alpha('#ffffff', 0.06),
        }}
      />
      <Box
        sx={{
          position: 'absolute', bottom: '10%', right: '15%',
          width: 80, height: 80, borderRadius: '50%',
          bgcolor: alpha('#ffffff', 0.08),
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Box
            sx={{
              display: 'inline-flex', alignItems: 'center', gap: 1,
              px: 2, py: 0.75, borderRadius: 10, mb: 3,
              border: `1px solid ${alpha('#ffffff', 0.3)}`,
              bgcolor: alpha('#ffffff', 0.1),
            }}
          >
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4CAF50', boxShadow: '0 0 0 3px rgba(76,175,80,0.3)' }} />
            <Typography variant="caption" sx={{ fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
              Doctors Available Now
            </Typography>
          </Box>

          <Typography
            variant="h2"
            sx={{
              color: 'white', fontWeight: 800,
              fontSize: { xs: '2.2rem', md: '3.5rem' },
              lineHeight: 1.1, mb: 2,
            }}
          >
            Need a Doctor Today?
          </Typography>

          <Typography
            variant="h6"
            sx={{ color: alpha('#fff', 0.82), fontWeight: 400, mb: 5, maxWidth: 480, mx: 'auto', lineHeight: 1.7 }}
          >
            Professional healthcare delivered to your doorstep. Trusted doctors, fast response, and care you can rely on.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Box
              component={Link}
              href="/request-doctor"
              sx={{
                display: 'inline-flex', alignItems: 'center', gap: 1, textDecoration: 'none',
                py: 2, px: 4, borderRadius: '16px', border: 'none', cursor: 'pointer',
                bgcolor: 'white', color: '#4F46E5', fontWeight: 700, fontSize: '1rem',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2)', bgcolor: '#f8fafc' },
              }}
            >
              Request Home Visit <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </Box>
            <Box
              component="a"
              href="tel:+919029190955"
              sx={{
                display: 'inline-flex', alignItems: 'center', gap: 1, textDecoration: 'none',
                py: 2, px: 4, borderRadius: '16px', cursor: 'pointer',
                border: `2px solid ${alpha('#ffffff', 0.5)}`,
                bgcolor: 'transparent', color: 'white', fontWeight: 700, fontSize: '1rem',
                transition: 'all 0.3s ease',
                '&:hover': { bgcolor: alpha('#ffffff', 0.1), borderColor: 'white' },
              }}
            >
              <PhoneIcon sx={{ fontSize: 18 }} /> Call +91 90291 90955
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};
