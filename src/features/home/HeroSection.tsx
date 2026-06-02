'use client';

import { Box, Container, Typography, Grid, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { fadeInUp, slideInLeft, slideInRight, staggerContainer, floatAnimation } from '@/constants/animations';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PhoneIcon from '@mui/icons-material/Phone';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';


export const HeroSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const statsRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      component="section"
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 12, md: 10 },
        pb: { xs: 8, md: 6 },
        bgcolor: 'background.default',
      }}
    >
      {/* Animated gradient blobs */}
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}
          style={{
            position: 'absolute', top: '-20%', right: '-10%',
            width: 600, height: 600, borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(25, 118, 210, 0.18) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(25, 118, 210, 0.12) 0%, transparent 70%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.2 }}
          style={{
            position: 'absolute', bottom: '-10%', left: '-5%',
            width: 500, height: 500, borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(0, 191, 165, 0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(0, 191, 165, 0.1) 0%, transparent 70%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.4 }}
          style={{
            position: 'absolute', top: '30%', left: '40%',
            width: 400, height: 400, borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(108, 99, 255, 0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(108, 99, 255, 0.07) 0%, transparent 70%)',
          }}
        />
      </Box>

      {/* Dot grid pattern */}
      <Box
        sx={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: isDark ? 0.15 : 0.06,
          backgroundImage: 'radial-gradient(circle, #1976D2 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 4, md: 8 }} sx={{ alignItems: 'center' }}>
          {/* Left: Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              {/* Trust badge */}
              <motion.div variants={fadeInUp}>
                <Box
                  sx={{
                    display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.75,
                    borderRadius: 10, mb: 3,
                    border: '1px solid',
                    borderColor: alpha('#1976D2', 0.3),
                    bgcolor: alpha('#1976D2', 0.06),
                  }}
                >
                  <VerifiedIcon sx={{ fontSize: 16, color: 'secondary.main' }} />
                  <Typography variant="caption" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                    500+ Verified Doctors Across Mumbai
                  </Typography>
                </Box>
              </motion.div>

              {/* Headline */}
              <motion.div variants={fadeInUp}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.6rem', sm: '3.2rem', md: '3.8rem', lg: '4.2rem' },
                    lineHeight: 1.05,
                    mb: 2,
                    color: 'text.primary',
                  }}
                >
                  Doctor At Your{' '}
                  <Box
                    component="span"
                    sx={{ background: 'linear-gradient(135deg, #1976D2 0%, #00BFA5 60%, #6C63FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline' }}
                  >
                    Doorstep
                  </Box>
                  <br />
                  In Minutes.
                </Typography>
              </motion.div>

              {/* Sub */}
              <motion.div variants={fadeInUp}>
                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, mb: 4, maxWidth: 480, lineHeight: 1.7 }}>
                  Connect with trusted healthcare professionals for home visits, nursing care, physiotherapy, and elder care — right at your doorstep.
                </Typography>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={fadeInUp}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 5 }}>
                  <Box
                    component="button"
                    sx={{
                      display: 'inline-flex', alignItems: 'center', gap: 1,
                      py: 1.75, px: 3.5, borderRadius: 3, border: 'none', cursor: 'pointer',
                      background: 'linear-gradient(135deg, #1976D2, #00BFA5)',
                      color: 'white', fontWeight: 700, fontSize: '1rem',
                      boxShadow: '0 8px 24px rgba(25, 118, 210, 0.4)',
                      transition: 'all 0.3s ease',
                      '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 32px rgba(25, 118, 210, 0.5)' },
                    }}
                  >
                    Request Doctor <ArrowForwardIcon sx={{ fontSize: 18 }} />
                  </Box>
                  <Box
                    component="button"
                    sx={{
                      display: 'inline-flex', alignItems: 'center', gap: 1,
                      py: 1.75, px: 3.5, borderRadius: 3, cursor: 'pointer',
                      border: '2px solid', borderColor: alpha('#00BFA5', 0.5),
                      bgcolor: 'transparent', color: 'text.primary', fontWeight: 700, fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      '&:hover': { borderColor: 'secondary.main', bgcolor: alpha('#00BFA5', 0.06) },
                    }}
                  >
                    <PhoneIcon sx={{ fontSize: 18 }} /> Call Now
                  </Box>
                </Box>
              </motion.div>
            </motion.div>

          </Grid>

          {/* Right: Visual */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div variants={slideInRight} initial="hidden" animate="visible" style={{ position: 'relative' }}>
              {/* Central Orb Illustration */}
              <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 480 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
                  style={{
                    position: 'absolute',
                    width: 380, height: 380,
                    borderRadius: '50%',
                    border: `2px dashed ${alpha('#1976D2', 0.2)}`,
                  }}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
                  style={{
                    position: 'absolute',
                    width: 280, height: 280,
                    borderRadius: '50%',
                    border: `2px dashed ${alpha('#00BFA5', 0.25)}`,
                  }}
                />

                {/* Core circle */}
                <Box
                  sx={{
                    width: 220, height: 220, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1976D2 0%, #00BFA5 50%, #6C63FF 100%)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 20px 60px rgba(25, 118, 210, 0.4)',
                    zIndex: 2,
                  }}
                >
                  <LocalHospitalIcon sx={{ fontSize: 56, color: 'white', mb: 1 }} />
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700, fontSize: '0.85rem', textAlign: 'center', px: 2 }}>
                    Premium<br />Healthcare
                  </Typography>
                </Box>

                {/* Floating Card 1 - Doctor Available */}
                <motion.div
                  animate={floatAnimation}
                  style={{ position: 'absolute', top: '8%', right: '2%', zIndex: 3 }}
                >
                  <Box
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 1.5,
                      px: 2.5, py: 1.5, borderRadius: 3,
                      bgcolor: isDark ? alpha('#1F2937', 0.95) : 'white',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                      border: '1px solid', borderColor: alpha('#00BFA5', 0.2),
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#00BFA5', flexShrink: 0, boxShadow: '0 0 0 3px rgba(0,191,165,0.2)' }} />
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', color: 'text.primary' }}>
                        Doctor Available
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ETA 20 Minutes
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>

                {/* Floating Card 2 - Verified Doctor */}
                <motion.div
                  animate={{ ...floatAnimation, y: [8, -8, 8] }}
                  style={{ position: 'absolute', bottom: '18%', left: '-5%', zIndex: 3 }}
                >
                  <Box
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 1.5,
                      px: 2.5, py: 1.5, borderRadius: 3,
                      bgcolor: isDark ? alpha('#1F2937', 0.95) : 'white',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                      border: '1px solid', borderColor: alpha('#1976D2', 0.2),
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 2, background: 'linear-gradient(135deg, #1976D2, #6C63FF)' }}>
                      <VerifiedIcon sx={{ fontSize: 18, color: 'white' }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', color: 'text.primary' }}>
                        Verified Doctor
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.3 }}>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <StarIcon key={i} sx={{ fontSize: 10, color: '#F59E0B' }} />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </motion.div>

                {/* Floating Card 3 - Home Visit */}
                <motion.div
                  animate={{ y: [8, -8, 8], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' as const, delay: 1 } }}
                  style={{ position: 'absolute', top: '48%', right: '-8%', zIndex: 3 }}
                >
                  <Box
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 1.5,
                      px: 2.5, py: 1.5, borderRadius: 3,
                      bgcolor: isDark ? alpha('#1F2937', 0.95) : 'white',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                      border: '1px solid', borderColor: alpha('#6C63FF', 0.2),
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 2, background: 'linear-gradient(135deg, #00BFA5, #6C63FF)' }}>
                      <AccessTimeIcon sx={{ fontSize: 18, color: 'white' }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', color: 'text.primary' }}>
                        Home Visit
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6C63FF', fontWeight: 600 }}>
                        Confirmed ✓
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
