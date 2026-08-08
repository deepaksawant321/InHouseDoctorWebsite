'use client';

import {
  AppBar, Toolbar, Typography, Box, IconButton, Button,
  Drawer, List, ListItem, ListItemButton, ListItemText,
  useTheme, Container, alpha, Avatar, Menu, MenuItem, Badge, Divider, Tooltip, CircularProgress
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PhoneIcon from '@mui/icons-material/Phone';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useScrolled } from '@/hooks/useScrolled';
import { usePathname } from 'next/navigation';
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
  const [token, setToken] = useState<string | null>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElNotif, setAnchorElNotif] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const scrolled = useScrolled(60);
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) {
      setToken(t);
      // Fetch notifications
      import('@/services/api').then(({ notificationsApi }) => {
        notificationsApi.getAll().then(res => {
          setNotifications(Array.isArray(res.data) ? res.data : (res.data?.data || []));
        }).catch(console.error);
      });
    }
  }, [pathname]);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleOpenNotifMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNotif(event.currentTarget);
  const handleCloseNotifMenu = () => setAnchorElNotif(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    handleCloseUserMenu();
    router.push('/login');
  };

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const drawer = (
    <Box sx={{ width: 280, height: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, background: 'linear-gradient(135deg, #4F46E5, #0D9488)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
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
              sx={{ borderRadius: '16px', py: 1.5, '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08) } }}
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
              sx={{ borderRadius: '16px', py: 1.5, '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08) } }}
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
            width: '100%', py: 1.5, px: 3, borderRadius: '16px', border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #4F46E5, #0D9488)',
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
            ? `0 4px 30px ${alpha(isDark ? '#000' : '#4F46E5', 0.08)}`
            : 'none',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: scrolled ? 0.5 : 1.5, transition: 'all 0.3s ease', minHeight: 'unset !important' }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
              <Box component={Link} href="/" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 2, background: 'linear-gradient(135deg, #4F46E5, #0D9488)', flexShrink: 0 }}>
                <MedicalServicesIcon sx={{ fontSize: 20, color: 'white' }} />
              </Box>
              <Typography
                component={Link}
                href="/"
                variant="h6"
                sx={{ textDecoration: 'none', fontWeight: 800, background: 'linear-gradient(135deg, #4F46E5, #0D9488)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}
              >
                InHouse Doctor
              </Typography>
            </Box>

            {/* Desktop Nav */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center', flexGrow: 1, gap: { md: 0.25, lg: 0.5 } }}>
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
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: { md: 1, lg: 1.5 }, flexShrink: 0 }}>
              <ThemeToggle />
              
              {!token ? (
                <>
                  <Box
                    component="a"
                    href="tel:18001234567"
                    sx={{
                      display: { xs: 'none', lg: 'inline-flex' }, alignItems: 'center', gap: 0.75,
                      py: 1, px: 2, borderRadius: '16px', textDecoration: 'none',
                      border: '1px solid', borderColor: 'divider',
                      color: 'text.primary', fontWeight: 600, fontSize: '0.875rem',
                      transition: 'all 0.2s',
                      '&:hover': { bgcolor: alpha('#4F46E5', 0.08), borderColor: 'primary.main', color: 'primary.main' },
                    }}
                  >
                    <PhoneIcon sx={{ fontSize: 16 }} /> 9029190955
                  </Box>
                  <Box
                    component={Link}
                    href="/login"
                    sx={{
                      display: 'inline-flex', alignItems: 'center', textDecoration: 'none',
                      py: 1, px: 2.5, borderRadius: '16px', border: '1px solid', borderColor: 'primary.main',
                      color: 'primary.main', fontWeight: 700, fontSize: '0.875rem',
                      transition: 'all 0.2s',
                      '&:hover': { bgcolor: alpha('#4F46E5', 0.05) },
                    }}
                  >
                    Login
                  </Box>
                  <Box
                    component={Link}
                    href="/request-doctor"
                    aria-label="Request Doctor Home Visit"
                    sx={{
                      display: 'inline-flex', alignItems: 'center', textDecoration: 'none',
                      py: 1, px: 2.5, borderRadius: '16px', border: 'none', cursor: 'pointer',
                      background: 'linear-gradient(135deg, #4F46E5, #0D9488)',
                      color: 'white', fontWeight: 700, fontSize: '0.875rem',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      boxShadow: '0 4px 15px rgba(79, 70, 229, 0.4)',
                      '&:hover': { transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(79, 70, 229, 0.5)' },
                    }}
                  >
                    Request Doctor
                  </Box>
                </>
              ) : (
                <>
                  <Tooltip title="Notifications">
                    <IconButton onClick={handleOpenNotifMenu} sx={{ ml: 1 }}>
                      <Badge badgeContent={notifications.filter(n => !n.isRead).length} color="error">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorElNotif}
                    open={Boolean(anchorElNotif)}
                    onClose={handleCloseNotifMenu}
                    slotProps={{ paper: { sx: { width: 320, maxHeight: 400, mt: 1.5 } } }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <Box sx={{ px: 2, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Notifications</Typography>
                      {notifications.length > 0 && <Button size="small" component={Link} href="/dashboard/notifications" onClick={handleCloseNotifMenu}>View All</Button>}
                    </Box>
                    <Divider />
                    {notifications.length === 0 ? (
                      <MenuItem disabled sx={{ py: 3, justifyContent: 'center' }}>No new notifications</MenuItem>
                    ) : (
                      notifications.slice(0, 5).map(n => (
                        <MenuItem key={n.id} onClick={handleCloseNotifMenu} component={Link} href="/dashboard/notifications" sx={{ py: 1.5, whiteSpace: 'normal' }}>
                          <Typography variant="body2" sx={{ fontWeight: n.isRead ? 400 : 600 }}>{n.message}</Typography>
                        </MenuItem>
                      ))
                    )}
                  </Menu>

                  <Tooltip title="Account settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1, border: '2px solid', borderColor: 'divider' }}>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
                        <PersonIcon />
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    slotProps={{ paper: { sx: { width: 220, mt: 1.5 } } }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem component={Link} href="/dashboard" onClick={handleCloseUserMenu}>Dashboard</MenuItem>
                    <MenuItem component={Link} href="/dashboard/bookings" onClick={handleCloseUserMenu}>My Bookings</MenuItem>
                    <MenuItem component={Link} href="/dashboard/profile" onClick={handleCloseUserMenu}>Profile Settings</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>Logout</MenuItem>
                  </Menu>
                </>
              )}
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
