import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/features/home/CtaBanner';
import { Box, Container, Typography, alpha, Grid } from '@mui/material';
import { Metadata } from 'next';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SecurityIcon from '@mui/icons-material/Security';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Doctor Doorstep, our mission to connect patients with trusted healthcare professionals in Mumbai.',
  alternates: {
    canonical: 'https://www.doctordoorstep.com/about',
  },
  openGraph: {
    title: 'About Us',
    description: 'Learn about Doctor Doorstep, our mission to connect patients with trusted healthcare professionals in Mumbai.',
    url: 'https://www.doctordoorstep.com/about',
    type: 'website',
  },
};

const values = [
  { title: 'Trust', icon: SecurityIcon, desc: 'Every doctor on our platform is rigorously vetted and verified.' },
  { title: 'Care', icon: FavoriteIcon, desc: 'We deliver compassionate, patient-first medical care.' },
  { title: 'Convenience', icon: AccessTimeFilledIcon, desc: 'Professional healthcare delivered directly to your doorstep.' },
  { title: 'Reliability', icon: ThumbUpIcon, desc: 'Consistent, high-quality medical standards for every visit.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About InHouse Doctor"
        subtitle="Professional healthcare at your doorstep. We are revolutionizing home healthcare in Mumbai."
      />

      <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 8, md: 12 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: 1.5 }}>
                OUR MISSION
              </Typography>
              <Typography variant="h2" sx={{ mt: 1, mb: 3, fontWeight: 700 }}>
                Connecting patients with trusted healthcare professionals.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                We believe that accessing high-quality healthcare should be as simple as ordering a cab. 
                Our mission is to bridge the gap between patients and premium medical care by bringing 
                verified, experienced doctors directly to your home.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 1.5 }}>
                OUR VISION
              </Typography>
              <Typography variant="h2" sx={{ mt: 1, mb: 3, fontWeight: 700 }}>
                Become Mumbai&apos;s most trusted home healthcare platform.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                We envision a future where families no longer need to wait in crowded clinic lines for 
                general checkups or essential care. We aim to set the gold standard for home-based 
                medical services across the country.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 8, fontWeight: 700 }}>
            Our Core Values
          </Typography>
          <Grid container spacing={4}>
            {values.map((v) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={v.title}>
                <Box
                  sx={{
                    p: 4, height: '100%', borderRadius: '24px',
                    bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
                  }}
                >
                  <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: alpha('#4F46E5', 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, color: 'primary.main' }}>
                    <v.icon />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>{v.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{v.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <CtaBanner />
    </>
  );
}
