'use client';

import {
  Box, Container, Typography, Grid, IconButton, TextField,
  InputAdornment, alpha, useTheme
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Link from 'next/link';

const footerLinks = {
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/about' }, // Placeholder for now
    { label: 'Press', href: '/about' }, // Placeholder for now
    { label: 'Blog', href: '/about' }, // Placeholder for now
  ],
  Services: [
    { label: 'General Physician', href: '/services/general-physician' },
    { label: 'Nursing Care', href: '/services/nursing-care' },
    { label: 'Physiotherapy', href: '/services/physiotherapy' },
    { label: 'Elder Care', href: '/services/elder-care' },
  ],
  Support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Refund Policy', href: '/refund-policy' },
    { label: 'Contact Us', href: '/contact' },
  ],
};

export const Footer = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: isDark ? '#0B1220' : '#FFFFFF', // Use the deepest dark background for footer
        borderTop: '1px solid',
        borderColor: 'divider',
        pt: 10,
        pb: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gradient accent top bar */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'linear-gradient(90deg, #1976D2, #00BFA5, #6C63FF)',
        }}
      />

      <Container maxWidth="xl">
        <Grid container spacing={6}>
          {/* Brand Column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 40, height: 40, borderRadius: 2,
                  background: 'linear-gradient(135deg, #1976D2, #00BFA5)',
                }}
              >
                <MedicalServicesIcon sx={{ fontSize: 22, color: 'white' }} />
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, background: 'linear-gradient(135deg, #1976D2, #00BFA5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                InHouse Doctor
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8, maxWidth: 300 }}>
              Getting a doctor at home should be as easy as ordering a cab. Premium healthcare, delivered to your doorstep.
            </Typography>
            {/* Contact Info */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                { icon: <PhoneIcon fontSize="small" />, text: '1800-123-4567' },
                { icon: <EmailIcon fontSize="small" />, text: 'support@inhousedoctor.com' },
                { icon: <LocationOnIcon fontSize="small" />, text: 'Mumbai, Maharashtra, India' },
              ].map((item) => (
                <Box key={item.text} sx={{ display: 'flex', gap: 1.5, alignItems: 'center', color: 'text.secondary' }}>
                  <Box sx={{ color: 'primary.main' }}>{item.icon}</Box>
                  <Typography variant="body2">{item.text}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={title}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2.5, color: 'text.primary' }}>
                {title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {links.map((link) => (
                  <Typography
                    key={link.label}
                    component={Link}
                    href={link.href}
                    variant="body2"
                    sx={{
                      textDecoration: 'none',
                      color: 'text.secondary',
                      cursor: 'pointer',
                      transition: 'color 0.2s',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Box>
            </Grid>
          ))}

          {/* Newsletter */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2.5 }}>
              Newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Get health tips and service updates.
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter email"
              size="small"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        aria-label="Subscribe to newsletter"
                        sx={{
                          bgcolor: 'primary.main',
                          color: 'white',
                          borderRadius: 1.5,
                          '&:hover': { bgcolor: 'primary.dark' },
                        }}
                      >
                        <ArrowForwardIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
            />
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            mt: 8,
            pt: 3,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} InHouse Doctor. All rights reserved. Made with ❤️ in Mumbai.
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {[{ icon: FacebookIcon, label: 'Facebook' }, { icon: TwitterIcon, label: 'Twitter' }, { icon: InstagramIcon, label: 'Instagram' }, { icon: LinkedInIcon, label: 'LinkedIn' }, { icon: YouTubeIcon, label: 'YouTube' }].map((social, i) => (
              <IconButton
                key={i}
                size="small"
                aria-label={`Visit our ${social.label} page`}
                sx={{
                  color: 'text.secondary',
                  transition: 'all 0.2s',
                  '&:hover': {
                    color: 'primary.main',
                    bgcolor: alpha('#1976D2', 0.08),
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <social.icon fontSize="small" />
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
