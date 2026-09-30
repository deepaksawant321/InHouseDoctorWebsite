'use client';

import { Box, Container, Typography, Grid, useTheme, alpha, Avatar, Rating } from '@mui/material';
import { m as motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/constants/animations';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Placeholder data - replace with real data from CMS/backend
const TESTIMONIALS = [
  {
    id: 1,
    name: '[Patient Name]',
    location: 'Mumbai',
    review: 'The doctor arrived exactly on time and provided excellent care. Highly recommended for home visits in Mumbai.',
    rating: 5,
  },
  {
    id: 2,
    name: '[Patient Name]',
    location: 'Andheri',
    review: 'Very professional and courteous. It was a relief not to have to travel to a clinic while feeling unwell.',
    rating: 5,
  },
  {
    id: 3,
    name: '[Patient Name]',
    location: 'Bandra',
    review: 'Booking was easy and the service was prompt. The doctor took the time to explain everything clearly.',
    rating: 4,
  }
];

export const TestimonialsSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <motion.div variants={fadeInUp}>
            <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
              <Typography variant="caption" sx={{ fontWeight: 600, color: 'primary.main', textTransform: 'uppercase', letterSpacing: 1.5 }}>
                Patient Stories
              </Typography>
              <Typography variant="h2" sx={{ mt: 1, mb: 1.5, fontSize: { xs: '2rem', md: '2.75rem' } }}>
                What Our Patients Say
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 480, mx: 'auto' }}>
                Real experiences from people who trusted us with their health.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={4}>
            {TESTIMONIALS.map((testimonial) => (
              <Grid size={{ xs: 12, md: 4 }} key={testimonial.id}>
                <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                  <Box
                    sx={{
                      p: 4,
                      height: '100%',
                      borderRadius: '24px',
                      bgcolor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Rating value={testimonial.rating} readOnly sx={{ mb: 2, color: 'primary.main' }} />
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4, flexGrow: 1, fontStyle: 'italic' }}>
                      &quot;{testimonial.review}&quot;
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }}>
                        {testimonial.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          {testimonial.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                          <LocationOnIcon sx={{ fontSize: 14 }} />
                          <Typography variant="caption">{testimonial.location}</Typography>
                        </Box>
                      </Box>
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
