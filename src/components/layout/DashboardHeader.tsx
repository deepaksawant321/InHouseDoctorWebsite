'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  AppBar, Toolbar, IconButton, Box, Typography, Avatar, Badge, Menu, MenuItem, Divider, Tooltip, alpha, useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { notificationsApi } from '@/services/api';
import { dashboardMenuItems, DASHBOARD_DRAWER_WIDTH } from './DashboardSidebar';

export const DashboardHeader = ({ onDrawerToggle }: { onDrawerToggle: () => void }) => {
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [notifications, setNotifications] = useState<{ isRead?: boolean }[]>([]);
  const [anchorUser, setAnchorUser] = useState<null | HTMLElement>(null);

  // Same notifications call the public header used for signed-in patients.
  useEffect(() => {
    notificationsApi.getAll().then((res) => {
      setNotifications(Array.isArray(res.data) ? res.data : (res.data?.data || []));
    }).catch(console.error);
  }, [pathname]);

  // Heading = the current section's name (longest matching sidebar path).
  const current = dashboardMenuItems
    .filter((item) => pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href + '/')))
    .sort((a, b) => b.href.length - a.href.length)[0];
  const heading = current?.label ?? 'Dashboard';
  const unread = notifications.filter((n) => !n.isRead).length;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAnchorUser(null);
    router.push('/login');
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { lg: `calc(100% - ${DASHBOARD_DRAWER_WIDTH}px)` },
        ml: { lg: `${DASHBOARD_DRAWER_WIDTH}px` },
        bgcolor: 'background.default',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
        backgroundImage: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
          <IconButton color="inherit" edge="start" aria-label="Open menu" onClick={onDrawerToggle} sx={{ mr: 1.5, display: { lg: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="h1" noWrap sx={{ fontWeight: 700 }}>
            {heading}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
          <ThemeToggle />
          <Tooltip title="Notifications">
            <IconButton
              component={Link}
              href="/dashboard/notifications"
              aria-label="Notifications"
              sx={{ bgcolor: alpha(theme.palette.text.primary, 0.05) }}
            >
              <Badge badgeContent={unread} color="error">
                <NotificationsIcon sx={{ fontSize: 20 }} />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Account">
            <IconButton onClick={(e) => setAnchorUser(e.currentTarget)} aria-label="Account menu" sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: '#0A5CB8', width: 36, height: 36 }}>
                <PersonIcon />
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorUser}
            open={Boolean(anchorUser)}
            onClose={() => setAnchorUser(null)}
            slotProps={{ paper: { sx: { width: 220, mt: 1.5 } } }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem component={Link} href="/dashboard" onClick={() => setAnchorUser(null)}>Dashboard</MenuItem>
            <MenuItem component={Link} href="/dashboard/bookings" onClick={() => setAnchorUser(null)}>My Bookings</MenuItem>
            <MenuItem component={Link} href="/dashboard/profile" onClick={() => setAnchorUser(null)}>Profile Settings</MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
