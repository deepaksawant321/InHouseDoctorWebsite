import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/features/home/CtaBanner';
import { Box, Container, Typography, alpha, Grid } from '@mui/material';
import { Metadata } from 'next';
import Image from 'next/image';
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

      <Box component="section" sx={{ py: { xs: 7, md: 10 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 5, md: 8 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ position: 'relative', overflow: 'hidden', aspectRatio: '4 / 4.4', borderRadius: '160px 32px 120px 32px', boxShadow: '0 24px 60px rgba(10, 92, 184, 0.18)' }}>
                <Image src="/images/7653136.jpg" alt="A doctor examining a child at home while her mother looks on" fill sizes="(max-width: 900px) 100vw, 40vw" style={{ objectFit: 'cover', objectPosition: '42% 50%' }} />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              {[
                {
                  label: 'OUR MISSION', color: 'secondary.dark',
                  title: 'Connecting patients with trusted healthcare professionals.',
                  text: 'We believe that accessing high-quality healthcare should be as simple as ordering a cab. Our mission is to bridge the gap between patients and premium medical care by bringing verified, experienced doctors directly to your home.',
                },
                {
                  label: 'OUR VISION', color: 'primary.main',
                  title: "Become Mumbai's most trusted home healthcare platform.",
                  text: 'We envision a future where families no longer need to wait in crowded clinic lines for general checkups or essential care. We aim to set the gold standard for home-based medical services across the country.',
                },
              ].map((b, i) => (
                <Box key={b.label} sx={{ mb: i === 0 ? { xs: 4, md: 5 } : 0 }}>
                  <Typography sx={{ color: b.color, fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.14em' }}>{b.label}</Typography>
                  <Typography variant="h2" sx={{ mt: 1, mb: 1.5, fontSize: { xs: '1.6rem', md: '2.1rem' } }}>{b.title}</Typography>
                  <Typography color="text.secondary">{b.text}</Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 7, md: 10 }, bgcolor: '#EAF5FD' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ mb: { xs: 4, md: 6 }, fontSize: { xs: '1.75rem', md: '2.4rem' } }}>
            Our Core Values
          </Typography>
          <Grid container spacing={3}>
            {values.map((v) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={v.title}>
                <Box
                  sx={{
                    p: 3.5, height: '100%', borderRadius: '20px',
                    bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
                  }}
                >
                  <Box sx={{ width: 56, height: 56, borderRadius: '50%', bgcolor: alpha('#0A5CB8', 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, color: 'primary.main' }}>
                    <v.icon />
                  </Box>
                  <Typography component="h3" variant="subtitle1" sx={{ fontSize: "1.15rem", fontWeight: 700, mb: 1 }}>{v.title}</Typography>
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
