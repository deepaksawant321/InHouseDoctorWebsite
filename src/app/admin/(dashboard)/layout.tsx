'use client';

import { Box, Toolbar } from '@mui/material';
import { useState } from 'react';
import { AdminSidebar, drawerWidth } from '@/features/admin/AdminSidebar';
import { AdminHeader } from '@/features/admin/AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AdminHeader onDrawerToggle={handleDrawerToggle} />
      <AdminSidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: { xs: 2, sm: 3, md: 4 }, width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar /> {/* For spacing below header */}
        {children}
      </Box>
    </Box>
  );
}
