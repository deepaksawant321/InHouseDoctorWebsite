'use client';

import { Box, Typography, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ChartCard } from '@/features/admin/ChartCard';
import { useEffect, useState } from 'react';
import { adminApi } from '@/services/api';

export default function ReportsPage() {
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [bookingsTrend, setBookingsTrend] = useState<any[]>([]);
  const [doctorUtilization, setDoctorUtilization] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getDashboardTrends().then(res => {
      const { revenueData, bookingsTrend, doctorUtilization } = res.data.data;
      setRevenueData(revenueData || []);
      setBookingsTrend(bookingsTrend || []);
      setDoctorUtilization(doctorUtilization || []);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Business Reports</Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard title="Revenue Trend (Last 7 Days)" data={revenueData} type="line" dataKey="revenue" xAxisKey="name" color="#14B5A5" />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard title="Weekly Bookings" data={bookingsTrend} type="bar" dataKey="bookings" xAxisKey="name" color="#0A5CB8" />
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <ChartCard title="Top Doctors by Booking Volume" data={doctorUtilization} type="bar" dataKey="utilization" xAxisKey="name" color="#2B8CE6" />
        </Grid>
      </Grid>
    </Box>
  );
}
