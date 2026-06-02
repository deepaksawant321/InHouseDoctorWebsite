import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/features/home/CtaBanner';
import { Box, Container, Typography, Grid } from '@mui/material';
import { Metadata } from 'next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const metadata: Metadata = {
  title: 'Elder Care Services',
  description: 'Compassionate home support and senior citizen care. Medication support, routine monitoring, and health assistance.',
};

const benefits = [
  'Routine Health Monitoring',
  'Medication Management',
  'Mobility Assistance',
  'Companionship & Support',
  'Dietary Management',
  'Emergency Care Support',
];

export default function ElderCarePage() {
  return (
    <>
      <PageHero
        title="Senior Citizen Care"
        subtitle="Compassionate, professional home support designed to give elders the dignity and care they deserve."
      />

      <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 8, md: 12 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h2" sx={{ mb: 4, fontWeight: 700 }}>
                Trusted Care for Your Loved Ones
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Caring for aging family members requires patience, medical expertise, and compassion. 
                Our elder care specialists are trained to provide holistic support, ensuring senior citizens 
                maintain their health, independence, and peace of mind in familiar surroundings.
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
