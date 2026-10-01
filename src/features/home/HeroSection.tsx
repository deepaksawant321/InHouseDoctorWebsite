'use client';

import Link from 'next/link';
import Image from 'next/image';

import { Box, Container, Typography, Grid, useTheme, alpha } from '@mui/material';
import { m as motion } from 'framer-motion';
import { fadeInUp, slideInRight, staggerContainer, floatAnimation } from '@/constants/animations';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { scriptFont } from '@/theme/fonts';

const stats = [
  { icon: <VerifiedIcon />, value: '500+', label: 'Verified Doctors' },
  { icon: <AccessTimeIcon />, value: '24x7', label: 'Care Support' },
  { icon: <StarIcon />, value: '4.9', label: 'Patient Rating' },
];

export const HeroSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const cardSx = {
    display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.5, borderRadius: '18px',
    bgcolor: isDark ? alpha('#0F2036', 0.96) : 'white',
    boxShadow: '0 12px 36px rgba(10, 92, 184, 0.16)',
    border: '1px solid', borderColor: alpha('#0A5CB8', 0.08),
  };

  return (
    <Box
      component="section"
      id="home"
      sx={{
        minHeight: { md: '92vh' },
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 12, md: 11 },
        pb: { xs: 8, md: 6 },
        background: isDark
          ? 'linear-gradient(180deg, #0A1626 0%, #0D1B2E 100%)'
          : 'linear-gradient(180deg, #EAF5FD 0%, #F8FCFF 70%, #FFFFFF 100%)',
      }}
    >
      <Box aria-hidden sx={{ position: 'absolute', top: '-12%', right: '-8%', width: 620, height: 620, borderRadius: '50%', background: 'radial-gradient(circle, rgba(20,181,165,0.22) 0%, transparent 68%)', pointerEvents: 'none' }} />
      <Box aria-hidden sx={{ position: 'absolute', bottom: '-18%', left: '-8%', width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, rgba(10,92,184,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 4, md: 6 }} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.div variants={fadeInUp}>
                <Typography sx={{ color: 'primary.main', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.14em', textTransform: 'uppercase', mb: 2 }}>
                  Your health. Our commitment.
                </Typography>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Typography
                  variant="h1"
                  sx={{ fontSize: { xs: '2.4rem', sm: '3.4rem', md: '3.4rem', lg: '4rem' }, mb: 2.5, color: 'text.primary' }}
                >
                  Doctor At Your<br />Doorstep<br />
                  <Box component="span" sx={{ background: isDark ? "linear-gradient(90deg, #6DB6F5 0%, #2DD4BF 100%)" : "linear-gradient(90deg, #0A5CB8 0%, #14B5A5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    In Minutes.
                  </Box>
                </Typography>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, mb: 4, maxWidth: 500, lineHeight: 1.7, fontSize: { xs: '1rem', md: '1.1rem' } }}>
                  Connect with trusted healthcare professionals for home visits, nursing care, physiotherapy, and elder care — right at your doorstep.
                </Typography>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 5 }}>
                  <Box
                    component={Link}
                    href="/request-doctor"
                    sx={{
                      display: 'inline-flex', alignItems: 'center', gap: 1, textDecoration: 'none',
                      py: 1.6, px: 3.5, minHeight: 48, borderRadius: '999px', border: 'none', cursor: 'pointer',
                      bgcolor: '#0A5CB8', color: 'white', fontWeight: 700, fontSize: '1rem',
                      boxShadow: '0 10px 26px rgba(10, 92, 184, 0.35)',
                      transition: 'all 0.25s ease',
                      '&:hover': { bgcolor: '#084A94', transform: 'translateY(-2px)' },
                    }}
                  >
                    Request Doctor <ArrowForwardIcon sx={{ fontSize: 18 }} />
                  </Box>
                  <Box
                    component="button"
                    sx={{
                      display: 'inline-flex', alignItems: 'center', gap: 1, minHeight: 48,
                      py: 1.6, px: 3.5, borderRadius: '999px', cursor: 'pointer',
                      border: '1.5px solid', borderColor: 'primary.main',
                      bgcolor: 'transparent', color: 'primary.main', fontWeight: 700, fontSize: '1rem', fontFamily: 'inherit',
                      transition: 'all 0.25s ease',
                      '&:hover': { bgcolor: alpha('#0A5CB8', 0.07) },
                    }}
                  >
                    <PhoneIcon sx={{ fontSize: 18 }} /> Call Now
                  </Box>
                </Box>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2.5, sm: 4 } }}>
                  {stats.map((s) => (
                    <Box key={s.label} sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                      <Box sx={{ color: 'primary.main', display: 'flex', '& svg': { fontSize: 28 } }}>{s.icon}</Box>
                      <Box>
                        <Typography sx={{ fontWeight: 800, lineHeight: 1.1 }}>{s.value}</Typography>
                        <Typography variant="caption" color="text.secondary">{s.label}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div variants={slideInRight} initial="hidden" animate="visible" style={{ position: 'relative' }}>
              <Box sx={{ position: 'relative', maxWidth: 520, mx: 'auto', aspectRatio: '4 / 4.6' }}>
                <Box aria-hidden sx={{ position: 'absolute', inset: '-6% -10% -4% 8%', borderRadius: '58% 42% 55% 45% / 48% 55% 45% 52%', background: isDark ? 'linear-gradient(145deg, rgba(45,212,191,0.28), rgba(91,168,240,0.22))' : 'linear-gradient(145deg, rgba(20,181,165,0.35), rgba(43,140,230,0.25))' }} />
                <Typography aria-hidden className={scriptFont.className} sx={{ display: { xs: 'none', lg: 'block' }, position: 'absolute', top: '-2%', right: '-18%', zIndex: 3, color: 'primary.main', fontSize: '1.9rem', lineHeight: 1.05, transform: 'rotate(-7deg)', textAlign: 'center' }}>Healthy People<br />Happier<br />Tomorrows</Typography>
                <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: '46% 54% 44% 56% / 38% 40% 60% 62%', boxShadow: isDark ? '0 24px 60px rgba(91, 168, 240, 0.2)' : '0 24px 60px rgba(10, 92, 184, 0.22)', border: isDark ? '1px solid rgba(255,255,255,0.14)' : 'none' }}>
                <Image src="/images/7345465.jpg" alt="A nurse smiling while checking a patient with a stethoscope during a home visit" fill priority sizes="(max-width: 900px) 90vw, 520px" style={{ objectFit: "cover", objectPosition: "45% 50%", filter: isDark ? "brightness(0.88)" : "none" }} />
                </Box>

                <motion.div animate={floatAnimation} style={{ position: 'absolute', top: '14%', left: '-4%', zIndex: 3 }}>
                  <Box sx={cardSx}>
                    <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: alpha('#14B5A5', 0.15), color: 'secondary.dark', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <VerifiedIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', color: 'text.primary' }}>Doctor Available</Typography>
                      <Typography variant="caption" sx={{ color: 'secondary.dark', fontWeight: 600 }}>● ETA 20 Minutes</Typography>
                    </Box>
                  </Box>
                </motion.div>

                <motion.div animate={{ ...floatAnimation, y: [8, -8, 8] }} style={{ position: 'absolute', top: '50%', right: '-2%', zIndex: 3 }}>
                  <Box sx={{ ...cardSx, flexDirection: 'column', alignItems: 'flex-start', gap: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FavoriteIcon sx={{ color: '#EF4444' }} />
                      <Typography sx={{ fontWeight: 800 }}>Home Visit</Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">Confirmed ✓</Typography>
                    <Box sx={{ display: 'flex', gap: 0.3 }}>
                      {[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} sx={{ fontSize: 13, color: '#F59E0B' }} />)}
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
