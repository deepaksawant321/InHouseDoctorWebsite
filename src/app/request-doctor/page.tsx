import { PageHero } from '@/components/ui/PageHero';
import { Box, Container, Typography, alpha } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Metadata } from 'next';
import Link from 'next/link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealingIcon from '@mui/icons-material/Healing';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

export const metadata: Metadata = {
  title: 'Request Doctor',
  description: 'Book trusted healthcare professionals for a home visit in minutes.',
};

const services = [
  { title: 'General Physician', icon: MedicalServicesIcon },
  { title: 'Nursing Care', icon: LocalHospitalIcon },
  { title: 'Physiotherapy', icon: AccessibilityNewIcon },
  { title: 'Elder Care', icon: HealingIcon },
];

export default function RequestDoctorPage() {
  return (
    <>
      <PageHero
        title="Need a Doctor at Home?"
        subtitle="Book trusted healthcare professionals in minutes. Safe, reliable, and verified medical care delivered to your doorstep."
      />

      <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 8, md: 12 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h2" sx={{ mb: 4, fontWeight: 700 }}>
                Why choose our Home Visit Doctors?
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 6 }}>
                {[
                  '100% Verified & Experienced Doctors',
                  'Fast Response & Arrival Time',
                  'Care in the Comfort of Your Home',
                  'Secure & Transparent Payment Process'
                ].map((benefit, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckCircleIcon sx={{ color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>{benefit}</Typography>
                  </Box>
                ))}
              </Box>

              <Link href="/login" style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    py: 2, px: 6, borderRadius: 3, textDecoration: 'none',
                    background: 'linear-gradient(135deg, #1976D2, #00BFA5)',
                    color: 'white', fontWeight: 700, fontSize: '1.1rem',
                    boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
                    transition: 'all 0.2s',
                    '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 32px rgba(25, 118, 210, 0.4)' },
                  }}
                >
                  Start Booking Now
                </Box>
              </Link>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Grid container spacing={3}>
                {services.map((service, index) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={index}>
                    <Box
                      sx={{
                        p: 4, borderRadius: 4, height: '100%',
                        bgcolor: 'background.default', border: '1px solid', borderColor: 'divider',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'translateY(-4px)', borderColor: 'primary.main' }
                      }}
                    >
                      <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: alpha('#1976D2', 0.1), color: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                        <service.icon />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>{service.title}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
