'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, IconButton, Drawer, useTheme, useMediaQuery, alpha } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (!isAuthenticated) {
    return null;
  }

  const SIDEBAR_WIDTH = 280;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', pt: { xs: 8, md: 10 }, bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
      
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: SIDEBAR_WIDTH },
        }}
      >
        <DashboardSidebar onClick={handleDrawerToggle} />
      </Drawer>

      {/* Desktop Sidebar */}
      <Box
        component="nav"
        sx={{
          width: { md: SIDEBAR_WIDTH },
          flexShrink: { md: 0 },
          display: { xs: 'none', md: 'block' },
          borderRight: '1px solid',
          borderColor: 'divider',
          position: 'fixed',
          top: 80, // Accounts for root header
          bottom: 0,
          bgcolor: 'background.paper',
          zIndex: 10,
        }}
      >
        <DashboardSidebar />
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
          ml: { md: `${SIDEBAR_WIDTH}px` },
        }}
      >
        {/* Mobile Header Toggle */}
        {!isMdUp && (
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, bgcolor: 'background.paper', boxShadow: 1 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        )}

        <Container maxWidth="lg" disableGutters>
          {children}
        </Container>
      </Box>
    </Box>
  );
}
