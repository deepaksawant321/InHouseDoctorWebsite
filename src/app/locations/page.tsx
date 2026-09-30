import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/features/home/CtaBanner';
import { Box, Container, Typography, Grid } from '@mui/material';
import { Metadata } from 'next';
import Link from 'next/link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { LOCATIONS } from '@/constants/locations';

export const metadata: Metadata = {
  title: 'Service Areas | Home Doctor Across Mumbai',
  description: 'Find Doctor Doorstep home healthcare services and doctors in your local area across Mumbai, including Andheri, Bandra, Powai, and more.',
  alternates: {
    canonical: 'https://www.doctordoorstep.com/locations',
  },
  openGraph: {
    title: 'Service Areas | Doctor Doorstep Locations in Mumbai',
    description: 'Find Doctor Doorstep home healthcare services and doctors in your local area across Mumbai.',
    url: 'https://www.doctordoorstep.com/locations',
    type: 'website',
  },
};


export default function LocationsPage() {
  return (
    <>
      <PageHero
        title="Our Service Areas in Mumbai"
        subtitle="Professional healthcare delivered to your doorstep across Mumbai."
      />

      <Box component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 8, fontWeight: 700 }}>
            Find a Doctor Near You
          </Typography>
          <Grid container spacing={3}>
            {LOCATIONS.map((location) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={location}>
                <Link href={`/locations/${location.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 3,
                    borderRadius: '16px',
                    bgcolor: 'background.default',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <LocationOnIcon color="inherit" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{location}</Typography>
                </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <CtaBanner />
    </>
  );
}
