'use client';

import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, alpha, useTheme } from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import DescriptionIcon from '@mui/icons-material/Description';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
  { text: 'Bookings', icon: <BookOnlineIcon />, path: '/admin/bookings' },
  { text: 'Payments', icon: <PaymentIcon />, path: '/admin/payments' },
  { text: 'Staff & Doctors', icon: <LocalHospitalIcon />, path: '/admin/doctors' },
  { text: 'Assignments', icon: <AssignmentIndIcon />, path: '/admin/assignments' },
  { text: 'Services', icon: <MedicalServicesIcon />, path: '/admin/services' },
  { text: 'FAQs (CMS)', icon: <QuestionAnswerIcon />, path: '/admin/cms/faqs' },
  { text: 'Testimonials', icon: <RateReviewIcon />, path: '/admin/cms/testimonials' },
  { text: 'Blocks (CMS)', icon: <ViewModuleIcon />, path: '/admin/cms/blocks' },
  { text: 'Pages (CMS)', icon: <DescriptionIcon />, path: '/admin/cms/pages' },
  { text: 'Notifications', icon: <NotificationsIcon />, path: '/admin/notifications' },
  { text: 'Reports', icon: <BarChartIcon />, path: '/admin/reports' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' },
];

export const drawerWidth = 280;

interface AdminSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar = ({ mobileOpen, onClose }: AdminSidebarProps) => {
  const pathname = usePathname();
  const theme = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
    onClose();
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', borderRight: '1px solid', borderColor: 'divider' }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ width: 40, height: 40, borderRadius: 2, background: 'linear-gradient(135deg, #0A5CB8, #14B5A5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <MedicalServicesIcon />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: 'text.primary' }}>
          Operations
        </Typography>
      </Box>

      <List sx={{ px: 2, flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = item.path === '/admin' ? pathname === '/admin' : pathname === item.path || pathname.startsWith(`${item.path}/`);
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={item.path}
                onClick={onClose}
                sx={{
                  borderRadius: 2, py: 1.25,
                  bgcolor: isActive ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                  color: isActive ? 'primary.main' : 'text.secondary',
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.12), color: 'primary.main' },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} slotProps={{ primary: { sx: { fontWeight: isActive ? 700 : 500, fontSize: '0.9rem' } } }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/admin/login" onClick={handleLogout} sx={{ borderRadius: 2, py: 1.25, color: 'error.main', '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.08) } }}>
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" slotProps={{ primary: { sx: { fontWeight: 600, fontSize: '0.9rem' } } }} />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile.
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};
