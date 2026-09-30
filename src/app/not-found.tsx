'use client';

import { Box, Container, Typography, alpha, useTheme } from '@mui/material';
import { m as motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}
          style={{
            position: 'absolute', top: '-10%', left: '-10%',
            width: 600, height: 600, borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(10, 92, 184, 0.12) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(10, 92, 184, 0.08) 0%, transparent 70%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.2 }}
          style={{
            position: 'absolute', bottom: '-10%', right: '-5%',
            width: 500, height: 500, borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(20, 181, 165, 0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(20, 181, 165, 0.06) 0%, transparent 70%)',
          }}
        />
      </Box>

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '5rem', md: '7rem' },
              lineHeight: 1,
              background: '#0A5CB8',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            404
          </Typography>
          <Typography variant="h2" sx={{ mb: 2, fontSize: { xs: '1.6rem', md: '2.1rem' } }}>
            Page Not Found
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </Typography>

          <Box
            component={Link}
            href="/"
            sx={{
              display: 'inline-flex', alignItems: 'center', gap: 1,
              py: 2, px: 4, borderRadius: '999px', textDecoration: 'none',
              background: '#0A5CB8',
              color: 'white', fontWeight: 700, fontSize: '1rem',
              boxShadow: '0 8px 24px rgba(10, 92, 184, 0.3)',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-2px)' },
            }}
          >
            Back to Home
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
