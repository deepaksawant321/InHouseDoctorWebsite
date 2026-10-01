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
import LogoutIcon from '@mui/icons-material/Logout';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

export const DASHBOARD_DRAWER_WIDTH = 260;

export const dashboardMenuItems = [
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
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', borderRight: '1px solid', borderColor: 'divider' }}>
      <Box component={Link} href="/" onClick={onClick} sx={{ px: 2.5, py: 3, display: 'flex', alignItems: 'center', gap: 1.25, textDecoration: 'none' }}>
        <Box sx={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #0A5CB8, #14B5A5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <MedicalServicesIcon />
        </Box>
        <Typography variant="h6" noWrap sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: 'text.primary', fontSize: '1rem' }}>
          Doctor Doorstep
        </Typography>
      </Box>

      <List sx={{ px: 2, flex: 1 }}>
        {dashboardMenuItems.map((item) => {
          const isActive = item.href === '/dashboard' ? pathname === '/dashboard' : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={onClick}
                sx={{
                  borderRadius: 2,
                  py: 1.25,
                  bgcolor: isActive ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                  color: isActive ? 'primary.main' : 'text.secondary',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.12),
                    color: 'primary.main',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  slotProps={{ primary: { sx: { fontWeight: isActive ? 700 : 500, fontSize: '0.9rem' } } }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/login"
            onClick={handleLogout}
            sx={{ borderRadius: 2, py: 1.25, color: 'error.main', '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.08) } }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" slotProps={{ primary: { sx: { fontWeight: 600, fontSize: '0.9rem' } } }} />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );
};
