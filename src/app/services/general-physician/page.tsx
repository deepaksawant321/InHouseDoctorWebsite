import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/features/home/CtaBanner';
import { Box, Container, Typography, alpha, Grid } from '@mui/material';
import { Metadata } from 'next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const metadata: Metadata = {
  title: 'General Physician Home Visit',
  description: 'Book a general physician for a home visit. Treatment for fever, cold, diabetes, BP, and routine checkups.',
};

const benefits = [
  'Fever & Viral Infections',
  'Cold & Cough',
  'Diabetes Monitoring',
  'Blood Pressure Management',
  'Routine Health Checkups',
  'Prescription Refills',
];

export default function GeneralPhysicianPage() {
  return (
    <>
      <PageHero
        title="General Physician Home Visit"
        subtitle="Expert medical consultation delivered right to your living room. Skip the waiting room."
      />

      <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 8, md: 12 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h2" sx={{ mb: 4, fontWeight: 700 }}>
                Comprehensive Care for Your Daily Health Needs
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Our general physicians are highly qualified and experienced in diagnosing and treating 
                everyday illnesses. Whether it's a sudden fever or routine chronic care management, 
                our doctors provide dedicated time and attention without the rush of a clinic.
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
