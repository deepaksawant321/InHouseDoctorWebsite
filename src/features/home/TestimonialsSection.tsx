'use client';

import { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, useTheme, alpha, Avatar, Rating } from '@mui/material';
import { m as motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/constants/animations';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { cmsApi } from '@/services/api';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

const MAX_TESTIMONIALS = 6;

const clampRating = (value: unknown) => {
  const n = Math.round(Number(value));
  return Number.isFinite(n) ? Math.min(5, Math.max(1, n)) : 5;
};

export const TestimonialsSection = () => {
  const theme = useTheme();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    let cancelled = false;
    cmsApi.getTestimonials()
      .then(res => {
        if (cancelled) return;
        const data: Testimonial[] = Array.isArray(res.data?.data) ? res.data.data : [];
        setTestimonials(data.filter(t => t.name && t.quote).slice(0, MAX_TESTIMONIALS));
      })
      .catch(() => { if (!cancelled) setTestimonials([]); });
    return () => { cancelled = true; };
  }, []);

  // Nothing to show (none active, or the API failed): hide the section rather than render placeholders.
  if (testimonials.length === 0) return null;

  return (
    <Box component="section" sx={{ py: { xs: 7, md: 10 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <motion.div variants={fadeInUp}>
            <Box sx={{ mb: { xs: 4, md: 5 } }}>
              <Typography variant="h2" sx={{ mb: 1, fontSize: { xs: '1.75rem', md: '2.4rem' } }}>
                What Our Patients Say
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 520 }}>
                Real experiences from people who trusted us with their health.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={3}>
            {testimonials.map((testimonial) => (
              <Grid size={{ xs: 12, md: 4 }} key={testimonial.id}>
                <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                  <Box
                    sx={{
                      p: 2.5, height: '100%', borderRadius: '18px',
                      bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider',
                      boxShadow: '0 8px 28px rgba(10,92,184,0.07)',
                      display: 'flex', gap: 2, alignItems: 'flex-start',
                    }}
                  >
                    <Avatar sx={{ width: 56, height: 56, bgcolor: alpha(theme.palette.primary.main, 0.12), color: 'primary.main', fontWeight: 700, flexShrink: 0 }}>
                      {testimonial.name.replace(/[^A-Za-z]/g, '').charAt(0).toUpperCase() || 'P'}
                    </Avatar>
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, flexGrow: 1 }}>
                        &quot;{testimonial.quote}&quot;
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{testimonial.name}</Typography>
                      {testimonial.role && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', mb: 0.5 }}>
                          <LocationOnIcon sx={{ fontSize: 14 }} />
                          <Typography variant="caption">{testimonial.role}</Typography>
                        </Box>
                      )}
                      <Rating value={clampRating(testimonial.rating)} readOnly size="small" sx={{ color: '#F59E0B' }} />
                    </Box>
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
