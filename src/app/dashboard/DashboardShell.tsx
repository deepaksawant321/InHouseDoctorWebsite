'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Drawer, Toolbar } from '@mui/material';
import { DashboardSidebar, DASHBOARD_DRAWER_WIDTH } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
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

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <DashboardHeader onDrawerToggle={handleDrawerToggle} />

      <Box component="nav" sx={{ width: { lg: DASHBOARD_DRAWER_WIDTH }, flexShrink: { lg: 0 } }}>
        {/* Mobile / tablet drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', lg: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DASHBOARD_DRAWER_WIDTH } }}
        >
          <DashboardSidebar onClick={handleDrawerToggle} />
        </Drawer>

        {/* Desktop sidebar */}
        <Drawer
          variant="permanent"
          open
          sx={{ display: { xs: 'none', lg: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DASHBOARD_DRAWER_WIDTH } }}
        >
          <DashboardSidebar />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          overflowWrap: 'anywhere',
          p: { xs: 2, sm: 3, md: 4 },
          width: { lg: `calc(100% - ${DASHBOARD_DRAWER_WIDTH}px)` },
        }}
      >
        <Toolbar /> {/* spacing below the fixed header */}
        <Box sx={{ maxWidth: 1100, mx: 'auto' }}>{children}</Box>
      </Box>
    </Box>
  );
}
