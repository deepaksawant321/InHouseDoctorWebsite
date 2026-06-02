import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/features/home/CtaBanner';
import { Box, Container, Typography, Grid } from '@mui/material';
import { Metadata } from 'next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const metadata: Metadata = {
  title: 'Nursing Care at Home',
  description: 'Professional home nursing services for post-surgery, daily care, injection support, and senior care.',
};

const benefits = [
  'Daily Patient Care',
  'Post Surgery Recovery',
  'Injection & IV Support',
  'Wound Dressing',
  'Senior Care Assistance',
  'Vitals Monitoring',
];

export default function NursingCarePage() {
  return (
    <>
      <PageHero
        title="Professional Home Nursing"
        subtitle="Qualified nurses delivering compassionate care in the comfort of your home."
      />

      <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 8, md: 12 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h2" sx={{ mb: 4, fontWeight: 700 }}>
                Dedicated Care When You Need It Most
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Recovering from surgery or managing a chronic condition requires professional support. 
                Our certified nursing staff provides round-the-clock or scheduled daily care to ensure 
                you and your loved ones receive the highest medical attention without hospital stays.
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
