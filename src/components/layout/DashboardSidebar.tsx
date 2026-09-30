'use client';

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const menuItems = [
  { label: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
  { label: 'My Patients', href: '/dashboard/patients', icon: <PeopleIcon /> },
  { label: 'My Bookings', href: '/dashboard/bookings', icon: <EventNoteIcon /> },
  { label: 'Address Book', href: '/dashboard/addresses', icon: <LocationOnIcon /> },
  { label: 'Medical Records', href: '/dashboard/records', icon: <FolderSharedIcon /> },
  { label: 'Notifications', href: '/dashboard/notifications', icon: <NotificationsIcon /> },
  { label: 'Profile', href: '/dashboard/profile', icon: <PersonIcon /> },
];

export const DashboardSidebar = ({ onClick }: { onClick?: () => void }) => {
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
    if (onClick) onClick();
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
      <Box sx={{ p: 3, pb: 1 }}>
        <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 600 }}>
          Manage Account
        </Typography>
      </Box>

      <List sx={{ flexGrow: 1, px: 2 }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={onClick}
                sx={{
                  borderRadius: '14px',
                  py: 1.5,
                  bgcolor: isActive ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                  color: isActive ? 'primary.main' : 'text.primary',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    color: 'primary.main',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive ? 'primary.main' : 'text.secondary',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: { sx: { fontWeight: isActive ? 600 : 500, fontSize: '0.95rem' } },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              href="/login"
              sx={{ borderRadius: 2, py: 1 }}
              onClick={handleLogout}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'error.main' }}>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                slotProps={{ primary: { sx: { fontSize: '0.9rem', color: 'error.main' } } }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
