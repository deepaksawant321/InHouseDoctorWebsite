import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/features/home/CtaBanner';
import { Box, Container, Typography, Grid } from '@mui/material';
import { Metadata } from 'next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const metadata: Metadata = {
  title: 'Physiotherapy at Home',
  description: 'Expert physiotherapy at home for back pain, sports injuries, post-surgery recovery, and mobility support.',
};

const benefits = [
  'Back & Joint Pain Relief',
  'Sports Injury Recovery',
  'Post Surgery Rehabilitation',
  'Mobility & Balance Support',
  'Stroke Rehabilitation',
  'Posture Correction',
];

export default function PhysiotherapyPage() {
  return (
    <>
      <PageHero
        title="Physiotherapy At Home"
        subtitle="Expert recovery support and physical therapy delivered to your doorstep."
      />

      <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 8, md: 12 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h2" sx={{ mb: 4, fontWeight: 700 }}>
                Regain Your Mobility with Expert Care
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Whether you're recovering from a sports injury, dealing with chronic back pain, or 
                rehabilitating after surgery, our certified physiotherapists bring the clinic to you. 
                We design personalized therapy plans to ensure a fast and effective recovery.
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {benefits.map((benefit, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckCircleIcon sx={{ color: 'secondary.main' }} />
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{benefit}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  width: '100%', height: 400, borderRadius: 6,
                  background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(0, 191, 165, 0.1))',
                  border: '1px solid', borderColor: 'divider',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Typography variant="subtitle1" color="text.secondary">Illustration Placeholder</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <CtaBanner />
    </>
  );
}
