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
        position: 'relative',
        overflow: 'hidden',
        color: 'rgba(255,255,255,0.74)',
        background: isDark
          ? 'linear-gradient(180deg, #08111F 0%, #060D18 100%)'
          : 'linear-gradient(180deg, #0B2A52 0%, #081D3A 100%)',
        pt: { xs: 6, md: 8 },
        pb: { xs: 3, md: 3.5 },
      }}
    >
      {/* Gradient accent top bar */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #0A5CB8, #14B5A5, #2B8CE6)' }} />
      <Box aria-hidden sx={{ position: 'absolute', top: '-30%', right: '-8%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(20,181,165,0.16) 0%, transparent 68%)', pointerEvents: 'none' }} />

      <Container maxWidth="xl" sx={{ position: 'relative' }}>
        {/* Row 1: brand + newsletter */}
        <Grid container spacing={{ xs: 4, md: 6 }} sx={{ alignItems: 'center', pb: { xs: 4, md: 5 }, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box component={Link} href="/" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25, textDecoration: 'none', mb: 1.75 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #0A5CB8, #14B5A5)' }}>
                <MedicalServicesIcon sx={{ fontSize: 24, color: 'white' }} />
              </Box>
              <Typography variant="h6" component="span" sx={{ fontWeight: 800, color: 'white', lineHeight: 1 }}>Doctor Doorstep</Typography>
            </Box>
            <Typography sx={{ maxWidth: 420, lineHeight: 1.7, fontSize: '0.95rem' }}>
              Getting a doctor at home should be as easy as ordering a cab. Premium healthcare, delivered to your doorstep.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Box component="form" noValidate onSubmit={handleNewsletter} sx={{ maxWidth: { md: 440 }, ml: { md: 'auto' } }}>
              <Typography sx={{ color: 'white', fontWeight: 700, mb: 0.5 }}>Get health tips and service updates</Typography>
              <Typography variant="body2" sx={{ mb: 1.75, color: 'rgba(255,255,255,0.6)' }}>Join our newsletter. No spam, unsubscribe any time.</Typography>
              <TextField
                fullWidth
                type="email"
                placeholder="Enter your email"
                size="small"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                error={newsletter.status === 'error'}
                helperText={newsletter.text}
                disabled={newsletter.status === 'sending'}
                slotProps={{
                  htmlInput: { 'aria-label': 'Email address for newsletter' },
                  formHelperText: { sx: { color: newsletter.status === 'error' ? '#FCA5A5' : '#86EFAC', ml: 1.5 } },
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="submit"
                          size="small"
                          aria-label="Subscribe to newsletter"
                          sx={{ bgcolor: '#14B5A5', color: 'white', borderRadius: '50%', '&:hover': { bgcolor: '#0E9486' } }}
                        >
                          <ArrowForwardIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '999px', color: 'white', bgcolor: 'rgba(255,255,255,0.08)',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.25)' },
                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                    '&.Mui-focused fieldset': { borderColor: '#5FD9CB' },
                  },
                  '& input::placeholder': { color: 'rgba(255,255,255,0.55)', opacity: 1 },
                }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Row 2: link columns (2x2 on phones, 4 across on desktop) */}
        <Grid container spacing={{ xs: 4, md: 5 }} sx={{ py: { xs: 4, md: 5 } }}>
          {[
            { title: 'Company', links: [...footerLinks.Company, { label: 'How It Works', href: '/how-it-works' }] },
            { title: 'Services', links: footerLinks.Services },
            { title: 'Support', links: footerLinks.Support },
          ].map((col) => (
            <Grid size={{ xs: col.title === 'Support' ? 12 : 6, sm: 4, md: 2.5 }} key={col.title}>
              <Typography component="h3" sx={{ color: 'white', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', mb: 2 }}>
                {col.title}
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: col.title === 'Support' ? '1fr 1fr' : '1fr', sm: '1fr' }, columnGap: 2, rowGap: 0.5 }}>
                {col.links.map((link) => (
                  <Typography
                    key={link.label}
                    component={Link}
                    href={link.href}
                    variant="body2"
                    sx={{ py: 0.5, textDecoration: 'none', color: 'inherit', transition: 'color 0.2s, transform 0.2s', '&:hover': { color: '#5FD9CB', transform: 'translateX(3px)' } }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Box>
            </Grid>
          ))}

          <Grid size={{ xs: 12, md: 4.5 }}>
            <Typography component="h3" sx={{ color: 'white', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', mb: 2 }}>
              Contact
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                { icon: <PhoneIcon sx={{ fontSize: 18 }} />, text: '+91 90291 90955', link: 'tel:+919029190955' },
                { icon: <EmailIcon sx={{ fontSize: 18 }} />, text: 'support@doctordoorstep.com', link: 'mailto:support@doctordoorstep.com' },
                { icon: <LocationOnIcon sx={{ fontSize: 18 }} />, text: 'Mumbai, Maharashtra, India', link: null },
              ].map((item) => (
                <Box key={item.text} sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}>
                  <Box sx={{ flexShrink: 0, width: 32, height: 32, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)', color: '#5FD9CB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                  </Box>
                  {item.link ? (
                    <Typography variant="body2" component="a" href={item.link} sx={{ pt: 0.6, color: 'inherit', textDecoration: 'none', wordBreak: 'break-word', '&:hover': { color: '#5FD9CB' } }}>
                      {item.text}
                    </Typography>
                  ) : (
                    <Typography variant="body2" sx={{ pt: 0.6 }}>{item.text}</Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Row 3: bottom bar */}
        <Box
          sx={{
            pt: 3, borderTop: '1px solid rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' }, gap: 2, textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            &copy; {new Date().getFullYear()} Doctor Doorstep. All rights reserved. Made with ❤️ in Mumbai.
          </Typography>
          {socialLinks.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${social.label} page`}
                  sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.25)', width: 38, height: 38, transition: 'all 0.2s', '&:hover': { bgcolor: '#14B5A5', borderColor: '#14B5A5', transform: 'translateY(-2px)' } }}
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
