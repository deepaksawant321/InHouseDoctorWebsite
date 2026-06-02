'use client';

import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ChartCard } from '@/features/admin/ChartCard';
import { mockRevenueData, mockBookingsTrend } from '@/services/mockAdminData';

export default function ReportsPage() {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Business Reports</Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard title="Revenue Trend" data={mockRevenueData} type="line" dataKey="revenue" xAxisKey="name" color="#00BFA5" />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard title="Weekly Bookings" data={mockBookingsTrend} type="bar" dataKey="bookings" xAxisKey="name" color="#1976D2" />
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <ChartCard title="Doctor Utilization (Mock Data)" data={mockRevenueData} type="bar" dataKey="revenue" xAxisKey="name" color="#6C63FF" />
        </Grid>
      </Grid>
    </Box>
  );
}
