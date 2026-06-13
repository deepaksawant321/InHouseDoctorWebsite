'use client';

import { Box, Container, Typography, alpha, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

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
        pt: { xs: 20, md: 24 }, // Extra top padding to account for fixed header
        pb: { xs: 8, md: 10 },
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.default',
        borderBottom: `1px solid ${alpha(isDark ? '#fff' : '#000', 0.05)}`,
      }}
    >
      {/* Background Gradients */}
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}
          style={{
            position: 'absolute', top: '-20%', right: '-10%',
            width: 600, height: 600, borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(25, 118, 210, 0.12) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(25, 118, 210, 0.08) 0%, transparent 70%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.2 }}
          style={{
            position: 'absolute', bottom: '-10%', left: '-5%',
            width: 500, height: 500, borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(0, 191, 165, 0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(0, 191, 165, 0.06) 0%, transparent 70%)',
          }}
        />
      </Box>

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800, mb: 3,
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
              background: 'linear-gradient(135deg, #4F46E5, #0D9488)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="h6"
              sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
            >
              {subtitle}
            </Typography>
          )}
        </motion.div>
      </Container>
    </Box>
  );
};
