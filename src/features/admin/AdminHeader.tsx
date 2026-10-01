'use client';

import { AppBar, Toolbar, IconButton, Box, Typography, Avatar, InputBase, Tooltip, alpha, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { usePathname, useRouter } from 'next/navigation';
import { collapsedDrawerWidth, drawerWidth, menuItems } from './AdminSidebar';

interface AdminHeaderProps {
  onDrawerToggle: () => void;
  title?: string;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
}

export const AdminHeader = ({ onDrawerToggle, title, collapsed = false, onToggleCollapsed }: AdminHeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();
  // Show the current section's name (longest matching sidebar path), falling back to the prop or 'Dashboard'.
  const current = menuItems
    .filter((item) => pathname === item.path || (item.path !== '/admin' && pathname?.startsWith(item.path + '/')))
    .sort((a, b) => b.path.length - a.path.length)[0];
  const heading = title ?? current?.text ?? 'Dashboard';
  const theme = useTheme();
  const width = collapsed ? collapsedDrawerWidth : drawerWidth;

  // Jump-to-section search: Enter opens the first sidebar section matching the query.
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    const q = e.currentTarget.value.trim().toLowerCase();
    if (!q) return;
    const match = menuItems.find((m) => m.text.toLowerCase().includes(q));
    if (match) {
      router.push(match.path);
      e.currentTarget.value = '';
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { lg: `calc(100% - ${width}px)` },
        ml: { lg: `${width}px` },
        transition: 'width 200ms ease, margin 200ms ease',
        bgcolor: 'background.default',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" edge="start" onClick={onDrawerToggle} aria-label="Open menu" sx={{ mr: 2, display: { lg: 'none' } }}>
            <MenuIcon />
          </IconButton>
          {onToggleCollapsed && (
            <Tooltip title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
              <IconButton color="inherit" edge="start" onClick={onToggleCollapsed} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} sx={{ mr: 2, display: { xs: 'none', lg: 'inline-flex' } }}>
                <MenuIcon />
              </IconButton>
            </Tooltip>
          )}
          <Typography variant="h5" component="p" noWrap sx={{ fontWeight: 700, display: { xs: 'none', sm: 'block' } }}>
            {heading}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', bgcolor: alpha(theme.palette.text.primary, 0.05), borderRadius: 8, px: 2, py: 0.5, border: '1px solid', borderColor: 'divider' }}>
            <SearchIcon sx={{ color: 'text.secondary', fontSize: 20, mr: 1 }} />
            <InputBase placeholder="Jump to section…" onKeyDown={handleSearch} inputProps={{ 'aria-label': 'Jump to section' }} sx={{ color: 'text.primary', fontSize: '1rem', width: 200 }} />
          </Box>
          <ThemeToggle />
          <Tooltip title="Notifications">
            <IconButton aria-label="Notifications" onClick={() => router.push('/admin/notifications')} sx={{ bgcolor: alpha(theme.palette.text.primary, 0.05) }}>
              <NotificationsIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
          <Avatar sx={{ bgcolor: '#0A5CB8', width: 36, height: 36, fontWeight: 700, fontSize: '0.9rem' }}>AD</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
