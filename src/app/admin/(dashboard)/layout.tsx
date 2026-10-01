'use client';

import { Box, Toolbar } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AdminSidebar, collapsedDrawerWidth, drawerWidth } from '@/features/admin/AdminSidebar';
import { AdminHeader } from '@/features/admin/AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem('adminSidebarCollapsed') === '1');
    } catch { /* storage unavailable */ }
  }, []);

  const handleToggleCollapsed = () => {
    setCollapsed((c) => {
      try { localStorage.setItem('adminSidebarCollapsed', c ? '0' : '1'); } catch { /* ignore */ }
      return !c;
    });
  };

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

  // Fix: MUI Dialogs add overflow:hidden to <body> when open.
  // If user navigates away before closing, the scroll lock persists.
  // Reset it on every route change.
  const pathname = usePathname();
  useEffect(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, [pathname]);

  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AdminHeader onDrawerToggle={handleDrawerToggle} collapsed={collapsed} onToggleCollapsed={handleToggleCollapsed} />
      <AdminSidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} collapsed={collapsed} onToggleCollapsed={handleToggleCollapsed} />
      <Box
        component="main"
        sx={{ flexGrow: 1, minWidth: 0, p: { xs: 2, sm: 3, md: 4 }, width: { lg: `calc(100% - ${collapsed ? collapsedDrawerWidth : drawerWidth}px)` }, transition: 'width 200ms ease',
          // Admin-only type scale: readable body text, compact page titles (public site keeps theme defaults).
          '& .MuiTypography-h4': { fontSize: { xs: '1.5rem', md: '1.75rem' } },
          '& .MuiTypography-body1': { fontSize: '1rem' },
          '& .MuiTypography-body2': { fontSize: '0.95rem' },
          '& .MuiTypography-caption': { fontSize: '0.85rem' },
          '& .MuiButton-sizeSmall': { fontSize: '0.875rem', py: 0.5, px: 1.75 },
          '& .MuiInputBase-input, & .MuiInputLabel-root': { fontSize: '1rem' },
        }}
      >
        <Toolbar /> {/* For spacing below header */}
        {children}
      </Box>
    </Box>
  );
}
