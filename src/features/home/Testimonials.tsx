'use client';

import { Box, Container, Typography, useTheme, alpha, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { fadeInUp, staggerContainer } from '@/constants/animations';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

import { cmsApi } from '@/services/api';
import { CircularProgress } from '@mui/material';

const FALLBACK_TESTIMONIALS = [
  {
    name: 'Rahul Sharma',
    role: 'Patient, Bandra',
    content: 'InHouse Doctor is truly incredible. When my father had a fever at midnight, they sent a verified doctor within 45 minutes. The doctor was thorough, professional, and incredibly calming. This service is a game-changer.',
    rating: 5,
    initials: 'RS',
    color: '#4F46E5',
  },
  {
    name: 'Priya Patel',
    role: 'Patient, Andheri',
    content: 'I was sceptical about home visits but InHouse Doctor exceeded my expectations. The doctor spent 40 minutes with me, addressed all my concerns, and followed up the next day. Absolutely remarkable service.',
    rating: 5,
    initials: 'PP',
    color: '#0D9488',
  },
];

const COLORS = ['#4F46E5', '#0D9488', '#6C63FF', '#9333EA', '#0284C7'];

const getInitials = (name: string) => {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

export const Testimonials = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cmsApi.getTestimonials().then(res => {
      const data = res.data.data || [];
      if (data.length > 0) {
        setTestimonials(data.map((t: any, i: number) => ({
          ...t,
          content: t.quote,
          initials: getInitials(t.name),
          color: COLORS[i % COLORS.length]
        })));
      } else {
        setTestimonials(FALLBACK_TESTIMONIALS);
      }
    }).catch(err => {
      console.error(err);
      setTestimonials(FALLBACK_TESTIMONIALS);
    }).finally(() => setLoading(false));
  }, []);

  const handleNext = () => {
    setDirection(1);
    setActive((prev) => (prev + 1) % testimonials.length);
  };
  const handlePrev = () => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (loading) {
    return (
      <Box sx={{ py: 15, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  const t = testimonials[active];
  if (!t) return null;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: 'background.default', overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          {/* Header */}
          <motion.div variants={fadeInUp}>
            <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.75, borderRadius: 10, mb: 2, border: '1px solid', borderColor: alpha('#6C63FF', 0.3), bgcolor: alpha('#6C63FF', 0.06) }}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: '#6C63FF' }}>Patient Stories</Typography>
              </Box>
              <Typography variant="h2" sx={{ mb: 1.5, fontSize: { xs: '2rem', md: '2.75rem' } }}>
                What Our{' '}
                <Box component="span" sx={{ background: 'linear-gradient(135deg, #6C63FF, #0D9488)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Patients Say
                </Box>
              </Typography>
            </Box>
          </motion.div>

          {/* Carousel */}
          <motion.div variants={fadeInUp}>
            <Box sx={{ position: 'relative', maxWidth: 800, mx: 'auto' }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -60 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Box
                    sx={{
                      p: { xs: 4, md: 6 },
                      borderRadius: 5,
                      bgcolor: 'background.paper',
                      border: '1px solid', borderColor: 'divider',
                      position: 'relative',
                      boxShadow: isDark ? '0 24px 64px rgba(0,0,0,0.4)' : '0 24px 64px rgba(25,118,210,0.08)',
                    }}
                  >
                    {/* Quote icon */}
                    <FormatQuoteIcon
                      sx={{
                        position: 'absolute', top: 24, right: 32,
                        fontSize: 64, color: alpha(t.color, 0.1),
                      }}
                    />

                    {/* Rating */}
                    <Box sx={{ display: 'flex', gap: 0.5, mb: 3 }}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <StarIcon key={i} sx={{ color: '#F59E0B', fontSize: 20 }} />
                      ))}
                    </Box>

                    {/* Content */}
                    <Typography variant="h6" sx={{ fontWeight: 400, lineHeight: 1.8, mb: 4, color: 'text.primary', fontStyle: 'italic' }}>
                      "{t.content}"
                    </Typography>

                    {/* Author */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 52, height: 52, borderRadius: '50%',
                          background: `linear-gradient(135deg, ${t.color}, ${t.color}99)`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'white', fontWeight: 800, fontSize: '1rem',
                          boxShadow: `0 4px 16px ${alpha(t.color, 0.4)}`,
                        }}
                      >
                        {t.initials}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{t.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{t.role}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 4 }}>
                <IconButton onClick={handlePrev} aria-label="Previous testimonial" sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', '&:hover': { bgcolor: alpha('#4F46E5', 0.08) } }}>
                  <ArrowBackIosIcon sx={{ fontSize: 16, ml: 0.5 }} />
                </IconButton>

                {/* Dots */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {testimonials.map((_, i) => (
                    <Box
                      key={i}
                      onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                      sx={{
                        width: i === active ? 24 : 8,
                        height: 8, borderRadius: 10, cursor: 'pointer',
                        bgcolor: i === active ? 'primary.main' : alpha('#94A3B8', 0.4),
                        transition: 'all 0.3s ease',
                      }}
                    />
                  ))}
                </Box>

                <IconButton onClick={handleNext} aria-label="Next testimonial" sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', '&:hover': { bgcolor: alpha('#4F46E5', 0.08) } }}>
                  <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};
