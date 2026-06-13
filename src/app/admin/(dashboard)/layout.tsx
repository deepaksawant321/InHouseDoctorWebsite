'use client';

import { Box, Toolbar } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminSidebar, drawerWidth } from '@/features/admin/AdminSidebar';
import { AdminHeader } from '@/features/admin/AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.replace('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }

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
