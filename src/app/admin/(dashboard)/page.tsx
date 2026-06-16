'use client';

import { Box, Typography, Button, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { StatsCard } from '@/features/admin/StatsCard';
import { ChartCard } from '@/features/admin/ChartCard';
import { DataTable } from '@/features/admin/DataTable';
import { StatusBadge, StatusType } from '@/features/admin/StatusBadge';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PaymentIcon from '@mui/icons-material/Payment';
import { adminApi } from '@/services/api';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = (showLoading = true) => {
    if (showLoading) setLoading(true);
    Promise.all([
      adminApi.getDashboardStats(),
      adminApi.getBookings(),
    ]).then(([statsRes, bookingsRes]) => {
      setStats(statsRes.data.data);
      // Show only the 5 most recent
      setRecentBookings((bookingsRes.data.data || []).slice(0, 5));
    }).catch(console.error).finally(() => { if (showLoading) setLoading(false); });
  };

  useEffect(() => {
    fetchDashboardData(true);
    // Poll for new bookings/stats every 10 seconds silently
    const interval = setInterval(() => {
      fetchDashboardData(false);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const columns = [
    { id: 'id' as const, label: 'ID', minWidth: 80, format: (v: string) => `#${String(v).slice(0, 6)}` },
    { id: 'patient' as const, label: 'Patient', minWidth: 150, format: (_: any, row: any) => row.patient?.fullName || '—' },
    { id: 'symptoms' as const, label: 'Symptoms', minWidth: 150 },
    { id: 'status' as const, label: 'Status', minWidth: 120, format: (value: StatusType) => <StatusBadge status={value} /> },
    { id: 'actions' as const, label: 'Actions', minWidth: 100, align: 'center' as const, format: (_: any, row: any) => (
      <Button component={Link} href={`/admin/bookings`} variant="outlined" size="small" sx={{ borderRadius: 2 }}>View</Button>
    )},
  ];

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Operations Overview</Typography>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
          <StatsCard title="Total Bookings" value={String(stats?.totalBookings ?? 0)} icon={<BookOnlineIcon />} trend="up" trendValue="Live" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
          <StatsCard title="Pending Bookings" value={String(stats?.pendingBookings ?? 0)} icon={<AssignmentIndIcon />} trend="down" trendValue="Pending" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
          <StatsCard title="Total Users" value={String(stats?.totalUsers ?? 0)} icon={<PeopleIcon />} trend="up" trendValue="Registered" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
          <StatsCard title="Active Doctors" value={String(stats?.totalDoctors ?? 0)} icon={<LocalHospitalIcon />} trend="up" trendValue="Active" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
          <StatsCard title="Payments Done" value={String(stats?.completedPayments ?? 0)} icon={<PaymentIcon />} trend="up" trendValue="Success" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
          <StatsCard title="Completed Visits" value={String(stats?.completedPayments ?? 0)} icon={<CheckCircleIcon />} trend="up" trendValue="Verified" />
        </Grid>
      </Grid>

      {/* Recent Bookings Table */}
      <Box sx={{ mb: 4 }}>
        <DataTable 
          title="Recent Bookings" 
          columns={columns} 
          rows={recentBookings} 
          actions={<Button component={Link} href="/admin/bookings" variant="contained">View All</Button>} 
        />
      </Box>
    </Box>
  );
}
