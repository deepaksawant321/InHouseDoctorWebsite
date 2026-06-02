'use client';

import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { StatsCard } from '@/features/admin/StatsCard';
import { ChartCard } from '@/features/admin/ChartCard';
import { DataTable } from '@/features/admin/DataTable';
import { StatusBadge, StatusType } from '@/features/admin/StatusBadge';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PaymentIcon from '@mui/icons-material/Payment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TodayIcon from '@mui/icons-material/Today';
import { mockBookings, mockRevenueData, mockBookingsTrend } from '@/services/mockAdminData';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const columns = [
    { id: 'id' as const, label: 'ID', minWidth: 100 },
    { id: 'patientName' as const, label: 'Patient', minWidth: 150 },
    { id: 'service' as const, label: 'Service', minWidth: 150 },
    { id: 'paymentStatus' as const, label: 'Payment', minWidth: 120, format: (value: StatusType) => <StatusBadge status={value} /> },
    { id: 'doctorStatus' as const, label: 'Doctor', minWidth: 120, format: (value: StatusType) => <StatusBadge status={value} /> },
    { id: 'actions' as const, label: 'Actions', minWidth: 100, align: 'center' as const, format: (value: any, row: any) => (
      <Button component={Link} href={`/admin/bookings/${row.id}`} variant="outlined" size="small" sx={{ borderRadius: 2 }}>View</Button>
    ) },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Operations Overview</Typography>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <StatsCard title="Total Bookings" value="1,284" icon={<BookOnlineIcon />} trend="up" trendValue="+12%" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <StatsCard title="Pending Payments" value="14" icon={<PaymentIcon />} trend="down" trendValue="-2%" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <StatsCard title="Pending Assign" value="8" icon={<AssignmentIndIcon />} trend="down" trendValue="-5%" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <StatsCard title="Completed Visits" value="842" icon={<CheckCircleIcon />} trend="up" trendValue="+18%" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <StatsCard title="Revenue Today" value="₹12.4k" icon={<TodayIcon />} trend="up" trendValue="+5%" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <StatsCard title="Monthly Rev." value="₹2.4M" icon={<AttachMoneyIcon />} trend="up" trendValue="+24%" />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <ChartCard title="Revenue Trend (Past 7 Days)" data={mockRevenueData} type="line" dataKey="revenue" xAxisKey="name" color="#00BFA5" />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ChartCard title="Bookings by Week" data={mockBookingsTrend} type="bar" dataKey="bookings" xAxisKey="name" color="#1976D2" />
        </Grid>
      </Grid>

      {/* Recent Bookings Table */}
      <Box sx={{ mb: 4 }}>
        <DataTable 
          title="Recent Bookings" 
          columns={columns} 
          rows={mockBookings} 
          actions={<Button component={Link} href="/admin/bookings" variant="contained">View All</Button>} 
        />
      </Box>
    </Box>
  );
}
