'use client';

import Link from 'next/link';
import Image from 'next/image';

import { Box, Container, Typography, alpha, useTheme } from '@mui/material';
import { m as motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PhoneIcon from '@mui/icons-material/Phone';
import { scriptFont } from '@/theme/fonts';

export const CtaBanner = () => {
  const isDark = useTheme().palette.mode === 'dark';
  return (
  <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
    <Container maxWidth="lg">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Box
          sx={{
            position: 'relative', overflow: 'hidden', borderRadius: { xs: '24px', md: '32px' },
            px: { xs: 3, md: 7 }, py: { xs: 5, md: 7 },
            background: isDark ? 'linear-gradient(120deg, #12457F 0%, #0F6AA8 60%, #14A89E 100%)' : 'linear-gradient(120deg, #0B2A52 0%, #0A4C96 60%, #0E8A9A 100%)',
            border: isDark ? '1px solid rgba(255,255,255,0.18)' : 'none',
            display: 'flex', flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between', gap: 4,
          }}
        >
          <Image src="/images/39192361.jpg" alt="" fill sizes="(max-width: 1200px) 100vw, 1200px" style={{ objectFit: 'cover', opacity: isDark ? 0.16 : 0.22 }} />
          <Box aria-hidden sx={{ position: 'absolute', top: '-40%', right: '-6%', width: 380, height: 380, borderRadius: '50%', border: `1px solid ${alpha('#ffffff', 0.14)}` }} />
          <Box aria-hidden sx={{ position: 'absolute', bottom: '-50%', right: '22%', width: 300, height: 300, borderRadius: '50%', bgcolor: alpha('#ffffff', 0.05) }} />

          <Box sx={{ position: 'relative', maxWidth: 560 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.5, borderRadius: 10, mb: 2.5, border: `1px solid ${alpha('#ffffff', 0.3)}`, bgcolor: alpha('#ffffff', 0.1) }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4CAF50', boxShadow: '0 0 0 3px rgba(76,175,80,0.3)' }} />
              <Typography variant="caption" sx={{ fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>Doctors Available Now</Typography>
            </Box>
            <Typography variant="h2" sx={{ color: 'white', fontSize: { xs: '1.75rem', md: '2.4rem' }, mb: 1.5 }}>
              Need a Doctor Today?
            </Typography>
            <Typography sx={{ color: alpha('#fff', 0.82), lineHeight: 1.7 }}>
              Professional healthcare delivered to your doorstep. Trusted doctors, fast response, and care you can rely on.
            </Typography>
          </Box>

          <Box sx={{ position: 'relative', display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box
              component={Link}
              href="/request-doctor"
              sx={{
                display: 'inline-flex', alignItems: 'center', gap: 1, textDecoration: 'none', minHeight: 48,
                py: 1.5, px: 3.5, borderRadius: '999px', cursor: 'pointer',
                bgcolor: 'white', color: '#0A5CB8', fontWeight: 700, fontSize: '1rem',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)', transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-2px)', bgcolor: '#f8fafc' },
              }}
            >
              Request Home Visit <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </Box>
            <Box
              component="a"
              href="tel:+919029190955"
              sx={{
                display: 'inline-flex', alignItems: 'center', gap: 1, textDecoration: 'none', minHeight: 48,
                py: 1.5, px: 3.5, borderRadius: '999px', cursor: 'pointer',
                border: `2px solid ${alpha('#ffffff', 0.5)}`, color: 'white', fontWeight: 700, fontSize: '1rem',
                transition: 'all 0.3s ease',
                '&:hover': { bgcolor: alpha('#ffffff', 0.1), borderColor: 'white' },
              }}
            >
              <PhoneIcon sx={{ fontSize: 18 }} /> Call +91 90291 90955
            </Box>
          </Box>
        </Box>
      </motion.div>
    </Container>
  </Box>
  );
};
