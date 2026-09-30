'use client';

import { Box, Container, Typography, useTheme } from '@mui/material';
import { m as motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export const PageHero = ({ title, subtitle }: PageHeroProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="section"
      sx={{
        pt: { xs: 11, md: 13 }, // Extra top padding to account for fixed header
        pb: { xs: 4, md: 5 },
        position: 'relative',
        overflow: 'hidden',
        background: isDark
          ? 'linear-gradient(180deg, #0A1626 0%, #0D1B2E 100%)'
          : 'linear-gradient(180deg, #EAF5FD 0%, #F8FCFF 100%)',
      }}
    >
      <Box aria-hidden sx={{ position: 'absolute', top: '-30%', right: '-8%', width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, rgba(20,181,165,0.2) 0%, transparent 68%)', pointerEvents: 'none' }} />
      <Box aria-hidden sx={{ position: 'absolute', bottom: '-40%', left: '-6%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(10,92,184,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Typography
            variant="h1"
            sx={{ fontWeight: 800, mb: 1.5, color: 'text.primary', fontSize: { xs: '1.75rem', sm: '2.1rem', md: '2.5rem' } }}
          >
            {title}
          </Typography>
          <Box aria-hidden sx={{ width: 56, height: 4, borderRadius: 2, mx: 'auto', mb: subtitle ? 1.75 : 0, background: 'linear-gradient(90deg, #0A5CB8, #14B5A5)' }} />
          {subtitle && (
            <Typography
              sx={{ color: 'text.secondary', maxWidth: 620, mx: 'auto', lineHeight: 1.7, fontSize: { xs: '0.95rem', md: '1rem' } }}
            >
              {subtitle}
            </Typography>
          )}
        </motion.div>
      </Container>
    </Box>
  );
};
