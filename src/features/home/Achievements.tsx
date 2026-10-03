'use client';

import { Box, Container, Typography, Grid } from '@mui/material';
import { SOCIAL_PROOF } from '@/constants/seo';

export const Achievements = () => (
  <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: 'background.default' }}>
    <Container maxWidth="lg">
      <Grid container spacing={{ xs: 4, md: 6 }} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography sx={{ color: 'secondary.dark', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.14em', textTransform: 'uppercase', mb: 1.5 }}>
            Our Achievements
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.4rem' } }}>
            Achieving Best from Our Services
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Grid container spacing={2}>
            {SOCIAL_PROOF.achievements.map((a) => (
              <Grid size={{ xs: 4 }} key={a.label}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontWeight: 800, color: 'secondary.dark', fontSize: { xs: '1.9rem', md: '3.2rem' }, lineHeight: 1.1 }}>
                    {a.value}
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontSize: { xs: '0.8rem', md: '1.05rem' }, mt: 0.5 }}>
                    {a.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  </Box>
);
