import { PageHero } from '@/components/ui/PageHero';
import { Box, Container, Typography, TextField, alpha, Grid } from '@mui/material';
import { Metadata } from 'next';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with InHouse Doctor for any queries or to book a home visit.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact InHouse Doctor"
        subtitle="We're here to help. Reach out to us for any medical assistance or queries."
      />

      <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 8, md: 12 }}>
            {/* Left: Contact Info */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography variant="h3" sx={{ mb: 4, fontWeight: 700 }}>
                Get in Touch
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
                Have a question about our services or need immediate medical assistance?
                Our support team is available 24/7.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: alpha('#4F46E5', 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', flexShrink: 0 }}>
                    <PhoneIcon />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>Phone</Typography>
                    <Typography variant="body1" color="text.secondary">9029190955</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: alpha('#25D366', 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#25D366', flexShrink: 0 }}>
                    <WhatsAppIcon />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>WhatsApp</Typography>
                    <Typography variant="body1" color="text.secondary">+91 9029190955</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: alpha('#4F46E5', 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', flexShrink: 0 }}>
                    <EmailIcon />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>Email</Typography>
                    <Typography variant="body1" color="text.secondary">admindoctordoorstep@gmail.com</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: alpha('#4F46E5', 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', flexShrink: 0 }}>
                    <LocationOnIcon />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>Headquarters</Typography>
                    <Typography variant="body1" color="text.secondary">Shop No.3, Sai Sarovar, C-wing, S.V. Road, R.N.P., RNP Park, Jesal Park, Bhayandar East, Mumbai, Maharashtra 401105, India</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Right: Static Form UI */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Box
                component="form"
                sx={{
                  p: { xs: 4, md: 6 }, borderRadius: 6,
                  bgcolor: 'background.default',
                  border: '1px solid', borderColor: 'divider',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
                }}
              >
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
                  Send us a Message
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Full Name" variant="outlined" />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Mobile Number" variant="outlined" />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField fullWidth label="Email Address" type="email" variant="outlined" />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField fullWidth label="Your Message" multiline rows={4} variant="outlined" />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Box
                      component="button"
                      type="button"
                      sx={{
                        width: '100%', py: 2, borderRadius: '16px', border: 'none', cursor: 'pointer',
                        background: 'linear-gradient(135deg, #4F46E5, #0D9488)',
                        color: 'white', fontWeight: 700, fontSize: '1rem',
                        boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'translateY(-2px)' },
                      }}
                    >
                      Send Message
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Static Map Placeholder */}
      <Box sx={{ width: '100%', height: 400, bgcolor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <iframe
          title="Priya Clinic Location"
          src="https://www.google.com/maps?q=Priya+Clinic,+Bhayandar+East,+Mumbai&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Box>
    </>
  );
}
