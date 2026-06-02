'use client';

import { AppBar, Toolbar, IconButton, Box, Typography, Avatar, InputBase, alpha, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { drawerWidth } from './AdminSidebar';

interface AdminHeaderProps {
  onDrawerToggle: () => void;
  title?: string;
}

export const AdminHeader = ({ onDrawerToggle, title = 'Dashboard' }: AdminHeaderProps) => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        bgcolor: 'background.default',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" edge="start" onClick={onDrawerToggle} sx={{ mr: 2, display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ fontWeight: 700, display: { xs: 'none', sm: 'block' } }}>
            {title}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', bgcolor: alpha(theme.palette.text.primary, 0.05), borderRadius: 8, px: 2, py: 0.5, border: '1px solid', borderColor: 'divider' }}>
            <SearchIcon sx={{ color: 'text.secondary', fontSize: 20, mr: 1 }} />
            <InputBase placeholder="Search anything..." sx={{ color: 'text.primary', fontSize: '0.9rem', width: 200 }} />
          </Box>
          <ThemeToggle />
          <IconButton sx={{ bgcolor: alpha(theme.palette.text.primary, 0.05) }}>
            <NotificationsIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36, fontWeight: 700, fontSize: '0.9rem' }}>AD</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
