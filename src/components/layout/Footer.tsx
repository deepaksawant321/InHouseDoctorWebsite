'use client';

import {
  Box, Container, Typography, Grid, IconButton, TextField,
  InputAdornment, alpha, useTheme
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';
import { contactApi, settingsApi } from '@/services/api';

const footerLinks = {
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
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
  const pathname = usePathname();
  const isPrivateArea = !!(pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin') || pathname?.startsWith('/login'));

  // Social links come from the admin-managed site settings; only configured ones are shown.
  const [socialLinks, setSocialLinks] = useState<{ label: string; href: string; icon: typeof FacebookIcon }[]>([]);
  useEffect(() => {
    if (isPrivateArea) return;
    settingsApi.get()
      .then((res) => {
        const data = res.data?.data || {};
        const candidates = [
          { label: 'Facebook', href: data.socialFacebook, icon: FacebookIcon },
          { label: 'Instagram', href: data.socialInstagram, icon: InstagramIcon },
          { label: 'Twitter', href: data.socialTwitter, icon: TwitterIcon },
        ];
        setSocialLinks(candidates.filter((c) => typeof c.href === 'string' && /^https?:\/\//i.test(c.href)) as typeof socialLinks);
      })
      .catch(() => setSocialLinks([]));
  }, [isPrivateArea]);

  // Newsletter sign-ups are forwarded to the admin inbox through the contact endpoint.
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletter, setNewsletter] = useState<{ status: 'idle' | 'sending' | 'ok' | 'error'; text?: string }>({ status: 'idle' });
  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = newsletterEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsletter({ status: 'error', text: 'Please enter a valid email address.' });
      return;
    }
    setNewsletter({ status: 'sending' });
    try {
      await contactApi.send({ name: 'Newsletter subscriber', email, message: 'Please add me to the newsletter.' });
      setNewsletter({ status: 'ok', text: 'Thanks for subscribing!' });
      setNewsletterEmail('');
    } catch {
      setNewsletter({ status: 'error', text: 'Could not subscribe right now. Please try again later.' });
    }
  };

  if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin') || pathname?.startsWith('/login')) {
    return null;
  }

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
          background: 'linear-gradient(90deg, #4F46E5, #0D9488, #6C63FF)',
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
                  background: 'linear-gradient(135deg, #4F46E5, #0D9488)',
                }}
              >
                <MedicalServicesIcon sx={{ fontSize: 22, color: 'white' }} />
              </Box>
              <Typography
                variant="h6"
                component="span"
                sx={{ fontWeight: 800, background: 'linear-gradient(135deg, #4F46E5, #0D9488)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
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
                { icon: <PhoneIcon fontSize="small" />, text: '+91 90291 90955', link: 'tel:+919029190955' },
                { icon: <EmailIcon fontSize="small" />, text: 'admindoctordoorstep@gmail.com', link: 'mailto:admindoctordoorstep@gmail.com' },
                { icon: <LocationOnIcon fontSize="small" />, text: 'Mumbai, Maharashtra, India', link: null },
              ].map((item) => (
                <Box key={item.text} sx={{ display: 'flex', gap: 1.5, alignItems: 'center', color: 'text.secondary' }}>
                  <Box sx={{ color: 'primary.main' }}>{item.icon}</Box>
                  {item.link ? (
                    <Typography variant="body2" component="a" href={item.link} sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                      {item.text}
                    </Typography>
                  ) : (
                    <Typography variant="body2">{item.text}</Typography>
                  )}
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
                      display: 'inline-block',
                      py: 0.5,
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
            <Box component="form" noValidate onSubmit={handleNewsletter}>
            <TextField
              fullWidth
              type="email"
              placeholder="Enter email"
              size="small"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              error={newsletter.status === 'error'}
              helperText={newsletter.text}
              disabled={newsletter.status === 'sending'}
              slotProps={{
                htmlInput: { 'aria-label': 'Email address for newsletter' },
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="submit"
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
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
            />
            </Box>
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
          {socialLinks.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${social.label} page`}
                  sx={{
                    color: 'text.secondary',
                    transition: 'all 0.2s',
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: alpha('#4F46E5', 0.08),
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <social.icon fontSize="small" />
                </IconButton>
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};
