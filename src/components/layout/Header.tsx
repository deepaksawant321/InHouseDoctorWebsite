'use client';

import {
  AppBar, Toolbar, Typography, Box, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText,
  useTheme, Container, alpha,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PhoneIcon from '@mui/icons-material/Phone';
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useScrolled } from '@/hooks/useScrolled';
import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

const mobileLegalItems = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms' },
];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled(60);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const drawer = (
    <Box sx={{ width: 280, height: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, background: 'linear-gradient(135deg, #1976D2, #00BFA5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          InHouse Doctor
        </Typography>
        <IconButton onClick={handleDrawerToggle} size="small" aria-label="Close menu">
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              href={item.href}
              onClick={handleDrawerToggle}
              sx={{ borderRadius: 3, py: 1.5, '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08) } }}
            >
              <ListItemText primary={item.label} slotProps={{ primary: { sx: { fontWeight: 500 } } }} />
            </ListItemButton>
          </ListItem>
        ))}
        {mobileLegalItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              href={item.href}
              onClick={handleDrawerToggle}
              sx={{ borderRadius: 3, py: 1.5, '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08) } }}
            >
              <ListItemText primary={item.label} slotProps={{ primary: { sx: { fontWeight: 400, color: 'text.secondary', fontSize: '0.9rem' } } }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
        <Box
          component={Link}
          href="/request-doctor"
          onClick={handleDrawerToggle}
          sx={{
            display: 'block', textAlign: 'center', textDecoration: 'none',
            width: '100%', py: 1.5, px: 3, borderRadius: 3, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #1976D2, #00BFA5)',
            color: 'white', fontWeight: 700, fontSize: '0.95rem',
          }}
        >
          Request Doctor
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        component={motion.nav}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        position="fixed"
        elevation={0}
        sx={{
          transition: 'all 0.3s ease',
          bgcolor: scrolled
            ? isDark
              ? alpha('#111827', 0.85)
              : alpha('#ffffff', 0.85)
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? `1px solid ${alpha(isDark ? '#fff' : '#000', 0.06)}` : 'none',
          boxShadow: scrolled
            ? `0 4px 30px ${alpha(isDark ? '#000' : '#1976D2', 0.08)}`
            : 'none',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: scrolled ? 0.5 : 1.5, transition: 'all 0.3s ease', minHeight: 'unset !important' }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
              <Box component={Link} href="/" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 2, background: 'linear-gradient(135deg, #1976D2, #00BFA5)' }}>
                <MedicalServicesIcon sx={{ fontSize: 20, color: 'white' }} />
              </Box>
              <Typography
                component={Link}
                href="/"
                variant="h6"
                sx={{ textDecoration: 'none', fontWeight: 800, background: 'linear-gradient(135deg, #1976D2, #00BFA5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em' }}
              >
                InHouse Doctor
              </Typography>
            </Box>

            {/* Desktop Nav */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
              {navItems.map((item) => (
                <Box
                  key={item.label}
                  component={Link}
                  href={item.href}
                  sx={{
                    px: 2, py: 1, borderRadius: 2, textDecoration: 'none',
                    color: 'text.primary', fontWeight: 500, fontSize: '0.9rem',
                    transition: 'all 0.2s',
                    '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08), color: 'primary.main' },
                  }}
                >
                  {item.label}
                </Box>
              ))}
            </Box>

            {/* Right Actions */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5, ml: 2 }}>
              <ThemeToggle />
              <Box
                component="a"
                href="tel:18001234567"
                sx={{
                  display: 'inline-flex', alignItems: 'center', gap: 0.75,
                  py: 1, px: 2, borderRadius: 3, textDecoration: 'none',
                  border: '1px solid', borderColor: 'divider',
                  color: 'text.primary', fontWeight: 600, fontSize: '0.875rem',
                  transition: 'all 0.2s',
                  '&:hover': { bgcolor: alpha('#1976D2', 0.08), borderColor: 'primary.main', color: 'primary.main' },
                }}
              >
                <PhoneIcon sx={{ fontSize: 16 }} /> 1800-123-4567
              </Box>
              <Box
                component={Link}
                href="/request-doctor"
                aria-label="Request Doctor Home Visit"
                sx={{
                  display: 'inline-flex', alignItems: 'center', textDecoration: 'none',
                  py: 1, px: 2.5, borderRadius: 3, border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #1976D2, #00BFA5)',
                  color: 'white', fontWeight: 700, fontSize: '0.875rem',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 15px rgba(25, 118, 210, 0.4)',
                  '&:hover': { transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(25, 118, 210, 0.5)' },
                }}
              >
                Request Doctor
              </Box>
            </Box>

            {/* Mobile */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
              <ThemeToggle />
              <IconButton onClick={handleDrawerToggle} color="inherit" edge="end" aria-label="Open mobile menu">
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        slotProps={{ paper: { elevation: 0, sx: { border: 'none' } } }}
      >
        {drawer}
      </Drawer>
    </>
  );
};
