import { PageHero } from '@/components/ui/PageHero';
import { Box, Container, Typography, TextField, alpha, Grid } from '@mui/material';
import { Metadata } from 'next';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { ContactForm } from '@/components/ContactForm';
import { MapEmbed } from '@/components/MapEmbed';

export const metadata: Metadata = {
  title: 'Contact Us | Book a Home Doctor in Mumbai',
  description: 'Get in touch with Doctor Doorstep for any queries or to book a home doctor visit in Mumbai. 24x7 support available.',
  alternates: {
    canonical: 'https://www.doctordoorstep.com/contact',
  },
  openGraph: {
    title: 'Contact Doctor Doorstep | Book Home Doctor in Mumbai',
    description: 'Get in touch with Doctor Doorstep for any queries or to book a home doctor visit in Mumbai. 24x7 support available.',
    url: 'https://www.doctordoorstep.com/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Doctor Doorstep"
        subtitle="We're here to help. Reach out to us for any medical assistance or queries."
      />

      <Box component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 5, md: 8 }}>
            {/* Left: Contact Info */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography variant="h2" sx={{ mb: 3, fontSize: { xs: "1.6rem", md: "2.1rem" } }}>
                Get in Touch
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
                Have a question about our services or need immediate medical assistance?
                Our support team is available 24/7.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: alpha('#0A5CB8', 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', flexShrink: 0 }}>
                    <PhoneIcon />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>Phone</Typography>
                    <Typography variant="body1" color="text.secondary">
                      <a href="tel:+919029190955" style={{ color: 'inherit', textDecoration: 'none' }}>+91 90291 90955</a>
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: alpha('#25D366', 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#25D366', flexShrink: 0 }}>
                    <WhatsAppIcon />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>WhatsApp</Typography>
                    <Typography variant="body1" color="text.secondary">
                      <a href="https://wa.me/919029190955" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>+91 90291 90955</a>
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: alpha('#0A5CB8', 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', flexShrink: 0 }}>
                    <EmailIcon />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>Email</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ overflowWrap: 'anywhere' }}>admindoctordoorstep@gmail.com</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: alpha('#0A5CB8', 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', flexShrink: 0 }}>
                    <LocationOnIcon />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>Headquarters</Typography>
                    <Typography variant="body1" color="text.secondary">Shop No.3, Sai Sarovar, C-wing, S.V. Road, R.N.P., RNP Park, Jesal Park, Bhayandar East, Mumbai, Maharashtra 401105, India</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Right: contact form */}
            <Grid size={{ xs: 12, md: 7 }}>
              <ContactForm />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Map loads on demand (see MapEmbed) */}
      <Box sx={{ width: '100%', height: 400, bgcolor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <MapEmbed query="Priya Clinic, Bhayandar East, Mumbai" title="Priya Clinic, Bhayandar East, Mumbai" />
      </Box>
    </>
  );
}
