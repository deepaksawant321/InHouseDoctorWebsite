import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/features/home/CtaBanner';
import { Box, Container, Typography, Breadcrumbs, Link as MuiLink, Grid } from '@mui/material';
import { Metadata } from 'next';
import Link from 'next/link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locationName = resolvedParams.slug.charAt(0).toUpperCase() + resolvedParams.slug.slice(1);
  return {
    title: `Doctor Home Visit in ${locationName} | Doctor Doorstep`,
    description: `Book verified doctors for home visits in ${locationName}, Mumbai. Get professional healthcare services including general physician and nursing care in ${locationName} 24x7.`,
    alternates: {
      canonical: `https://www.doctordoorstep.com/locations/${resolvedParams.slug}`,
    },
    openGraph: {
      title: `Doctor Home Visit in ${locationName} | Doctor Doorstep`,
      description: `Book verified doctors for home visits in ${locationName}, Mumbai. Get professional healthcare services including general physician and nursing care in ${locationName} 24x7.`,
      url: `https://www.doctordoorstep.com/locations/${resolvedParams.slug}`,
      type: 'website',
    },
  };
}

export default async function LocationDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const locationName = resolvedParams.slug.charAt(0).toUpperCase() + resolvedParams.slug.slice(1);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: `Doctor Doorstep - ${locationName}`,
            image: 'https://www.doctordoorstep.com/logo.png',
            telephone: '+919029190955',
            url: `https://www.doctordoorstep.com/locations/${resolvedParams.slug}`,
            areaServed: {
              '@type': 'Place',
              name: locationName
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: locationName,
              addressRegion: 'Mumbai',
              addressCountry: 'IN'
            }
          })
        }}
      />
      <Box sx={{ bgcolor: 'background.paper', pt: 12, pb: 4 }}>
        <Container maxWidth="lg">
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 4 }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Typography sx={{ '&:hover': { textDecoration: 'underline' } }} color="inherit">Home</Typography>
            </Link>
            <Link href="/locations" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Typography sx={{ '&:hover': { textDecoration: 'underline' } }} color="inherit">Locations</Typography>
            </Link>
            <Typography color="text.primary">{locationName}</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      <PageHero
        title={`Home Doctor Service in ${locationName}`}
        subtitle={`Professional, verified doctors available for home visits across ${locationName} and surrounding neighborhoods.`}
      />

      <Box component="section" sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 4 }}>Reliable Healthcare in {locationName}</Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 4, color: 'text.secondary' }}>
                Residents of {locationName} can now access premium healthcare without leaving their homes. Doctor Doorstep provides verified, highly experienced medical professionals directly to your door. Whether you need a general physician, nursing care, or physiotherapy, our team is equipped to help you in {locationName}.
              </Typography>
              
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>Available Services in {locationName}</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {['General Physician Consultation', 'Nursing & Post-Operative Care', 'Physiotherapy & Rehabilitation', 'Elder Care Services'].map(service => (
                  <Box key={service} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckCircleIcon color="primary" />
                    <Typography variant="body1">{service}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: '24px', border: '1px solid', borderColor: 'divider', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Book a Doctor</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Our doctors are available 24/7 in {locationName}. Call us directly or request a visit online.</Typography>
                <Box
                  component="a"
                  href="tel:+919029190955"
                  sx={{
                    display: 'block', textAlign: 'center', width: '100%', py: 2, borderRadius: '16px',
                    bgcolor: 'primary.main', color: 'white', fontWeight: 700, textDecoration: 'none',
                    mb: 2, transition: 'all 0.2s', '&:hover': { bgcolor: 'primary.dark' }
                  }}
                >
                  Call +91 90291 90955
                </Box>
                <Box
                  component={Link}
                  href="/request-doctor"
                  sx={{
                    display: 'block', textAlign: 'center', width: '100%', py: 2, borderRadius: '16px',
                    border: '1px solid', borderColor: 'primary.main', color: 'primary.main', fontWeight: 700, textDecoration: 'none',
                    transition: 'all 0.2s', '&:hover': { bgcolor: 'rgba(79, 70, 229, 0.04)' }
                  }}
                >
                  Request Online
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <CtaBanner />
    </>
  );
}
