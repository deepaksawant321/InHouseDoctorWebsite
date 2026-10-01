'use client';

import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography, alpha, useTheme } from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import DescriptionIcon from '@mui/icons-material/Description';

export const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
  { text: 'Bookings', icon: <BookOnlineIcon />, path: '/admin/bookings' },
  { text: 'Payments', icon: <PaymentIcon />, path: '/admin/payments' },
  { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
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

export const drawerWidth = 260;
export const collapsedDrawerWidth = 76;

interface AdminSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  /** Desktop only: render an icon-only rail. */
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
}

export const AdminSidebar = ({ mobileOpen, onClose, collapsed = false, onToggleCollapsed }: AdminSidebarProps) => {
  const pathname = usePathname();
  const theme = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
    onClose();
  };

  const renderContent = (rail: boolean) => (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', borderRight: '1px solid', borderColor: 'divider' }}>
      <Box sx={{ px: rail ? 1.5 : 3, py: 3, display: 'flex', alignItems: 'center', justifyContent: rail ? 'center' : 'flex-start', gap: 1.5, minHeight: 88 }}>
        <Box sx={{ width: 40, height: 40, flexShrink: 0, borderRadius: 2, background: 'linear-gradient(135deg, #0A5CB8, #14B5A5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <MedicalServicesIcon />
        </Box>
        {!rail && (
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: 'text.primary', flex: 1 }}>
            Operations
          </Typography>
        )}
        {!rail && onToggleCollapsed && (
          <Tooltip title="Collapse sidebar">
            <IconButton size="small" onClick={onToggleCollapsed} aria-label="Collapse sidebar" sx={{ display: { xs: 'none', lg: 'inline-flex' } }}>
              <ChevronLeftIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <List sx={{ px: rail ? 1 : 2, flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {menuItems.map((item) => {
          const isActive = item.path === '/admin' ? pathname === '/admin' : pathname === item.path || pathname.startsWith(`${item.path}/`);
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <Tooltip title={rail ? item.text : ''} placement="right">
                <ListItemButton
                  component={Link}
                  href={item.path}
                  onClick={onClose}
                  aria-label={item.text}
                  sx={{
                    borderRadius: 2, py: 1.25, px: rail ? 1 : 2, justifyContent: rail ? 'center' : 'flex-start',
                    bgcolor: isActive ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                    color: isActive ? 'primary.main' : 'text.secondary',
                    '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.12), color: 'primary.main' },
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: rail ? 0 : 40, justifyContent: 'center' }}>{item.icon}</ListItemIcon>
                  {!rail && <ListItemText primary={item.text} slotProps={{ primary: { sx: { fontWeight: isActive ? 700 : 500, fontSize: '1rem' } } }} />}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ p: rail ? 1 : 2, borderTop: '1px solid', borderColor: 'divider' }}>
        {rail && onToggleCollapsed && (
          <Tooltip title="Expand sidebar" placement="right">
            <IconButton onClick={onToggleCollapsed} aria-label="Expand sidebar" sx={{ display: 'flex', mx: 'auto', mb: 1 }}>
              <ChevronRightIcon />
            </IconButton>
          </Tooltip>
        )}
        <ListItem disablePadding>
          <Tooltip title={rail ? 'Logout' : ''} placement="right">
            <ListItemButton component={Link} href="/admin/login" onClick={handleLogout} aria-label="Logout" sx={{ borderRadius: 2, py: 1.25, px: rail ? 1 : 2, justifyContent: rail ? 'center' : 'flex-start', color: 'error.main', '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.08) } }}>
              <ListItemIcon sx={{ color: 'inherit', minWidth: rail ? 0 : 40, justifyContent: 'center' }}><LogoutIcon /></ListItemIcon>
              {!rail && <ListItemText primary="Logout" slotProps={{ primary: { sx: { fontWeight: 600, fontSize: '1rem' } } }} />}
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </Box>
    </Box>
  );

  const width = collapsed ? collapsedDrawerWidth : drawerWidth;

  return (
    <Box component="nav" aria-label="Admin navigation" sx={{ width: { lg: width }, flexShrink: { lg: 0 }, transition: 'width 200ms ease' }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile.
        sx={{ display: { xs: 'block', lg: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
      >
        {renderContent(false)}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{ display: { xs: 'none', lg: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width, overflowX: 'hidden', transition: 'width 200ms ease' } }}
        open
      >
        {renderContent(collapsed)}
      </Drawer>
    </Box>
  );
};
