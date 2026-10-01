'use client';

import { Alert, Box, Typography, Button } from '@mui/material';
import { ActionIcon } from '@/features/admin/ActionIcon';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { formatDoctorName } from '@/utils/doctorName';
import Grid from '@mui/material/Grid';
import { useEffect, useRef, useState } from 'react';
import { StatsCard } from '@/features/admin/StatsCard';
import { ChartCard } from '@/features/admin/ChartCard';
import { DataTable } from '@/features/admin/DataTable';
import { DateRangeFilter, rangeQuery, useInitialDateRange } from '@/features/admin/DateRangeFilter';
import { StatusBadge, StatusType } from '@/features/admin/StatusBadge';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PaymentIcon from '@mui/icons-material/Payment';
import { adminApi } from '@/services/api';
import Link from 'next/link';
import { formatDate } from '@/utils/date';


// Same statuses the Booking Confirmation Center treats as "awaiting assignment"
const AWAITING_ASSIGNMENT = 'Pending,Created,PaymentPending,PaymentVerified,Confirmed';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [queue, setQueue] = useState<{ rows: any[]; total: number }>({ rows: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const initialRange = useInitialDateRange(); // today by default
  const [startDate, setStartDate] = useState(initialRange.start);
  const [endDate, setEndDate] = useState(initialRange.end);
  const requestSeq = useRef(0);

  // Cards open the related page carrying the selected date range (and status where the card implies one).
  const rangeQs = (extra: Record<string, string> = {}) => rangeQuery(startDate, endDate, extra);

  // A backend that predates date-range support returns no `range` echo and silently reports all-time numbers.
  const backendIgnoresRange = (!!startDate || !!endDate) && !!stats && !stats.range;

  const rangeInvalid = !!startDate && !!endDate && startDate > endDate;
  const hasRange = !!startDate || !!endDate;

  const fetchDashboardData = (showLoading = true) => {
    if (rangeInvalid) return;
    const seq = ++requestSeq.current;
    if (showLoading) setLoading(true);
    const range = { startDate: startDate || undefined, endDate: endDate || undefined };
    Promise.all([
      adminApi.getDashboardStats(range),
      adminApi.getBookings({ page: 1, pageSize: 5, ...range }), // only the 5 most recent in range, fetched server-side
      adminApi.getBookings({ status: AWAITING_ASSIGNMENT, page: 1, pageSize: 5, ...range }), // Booking Confirmation Center queue preview
    ]).then(([statsRes, bookingsRes, queueRes]) => {
      if (seq !== requestSeq.current) return;
      setStats(statsRes.data.data);
      setRecentBookings(bookingsRes.data.data || []);
      setQueue({ rows: queueRes.data.data || [], total: queueRes.data.total ?? 0 });
    }).catch(console.error).finally(() => { if (seq === requestSeq.current) setLoading(false); });
  };

  useEffect(() => {
    fetchDashboardData(true);
    // Refresh every 30 seconds (both calls are cheap COUNT / LIMIT 5 queries), only while the tab is visible
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') fetchDashboardData(false);
    }, 30000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const columns = [
    { id: 'id' as const, label: 'ID', minWidth: 80, format: (v: string) => `#${String(v).slice(0, 6)}` },
    { id: 'patient' as const, label: 'Patient', minWidth: 150, format: (_: any, row: any) => row.patient?.fullName || '—' },
    { id: 'doctor' as const, label: 'Doctor', minWidth: 150, format: (_: any, row: any) => row.doctor ? formatDoctorName(row.doctor.name) : 'Unassigned' },
    { id: 'symptoms' as const, label: 'Symptoms', minWidth: 150, format: (v: string) => v || '—' },
    { id: 'scheduledDate' as const, label: 'Date', minWidth: 110, format: (v: string) => formatDate(v, { utc: true }) },
    { id: 'paymentStatus' as const, label: 'Payment', minWidth: 90, align: 'center' as const, format: (value: StatusType) => <StatusBadge iconOnly status={value} /> },
    { id: 'status' as const, label: 'Status', minWidth: 90, align: 'center' as const, format: (value: StatusType) => <StatusBadge iconOnly status={value} /> },
    { id: 'actions' as const, label: 'Actions', minWidth: 100, align: 'center' as const, format: (_: any, row: any) => (
      <ActionIcon title="View details" icon={<VisibilityIcon fontSize="small" />} color="inherit" href={`/admin/bookings/${row.id}`} />
    )},
  ];

  const queueColumns = [
    { id: 'id' as const, label: 'ID', minWidth: 80, format: (v: string) => `#${String(v).slice(0, 6)}` },
    { id: 'patient' as const, label: 'Patient', minWidth: 150, format: (_: any, row: any) => row.patient?.fullName || '—' },
    { id: 'symptoms' as const, label: 'Symptoms', minWidth: 160, format: (v: string) => v || '—' },
    { id: 'scheduledDate' as const, label: 'Date', minWidth: 110, format: (v: string) => formatDate(v, { utc: true }) },
    { id: 'status' as const, label: 'Status', minWidth: 80, align: 'center' as const, format: (value: StatusType) => <StatusBadge iconOnly status={value} /> },
    { id: 'actions' as const, label: 'Actions', minWidth: 100, align: 'left' as const, format: (_: any, row: any) => (
      <Box sx={{ display: 'flex', gap: 0.75 }}>
        <ActionIcon title="View details" icon={<VisibilityIcon fontSize="small" />} color="inherit" href={`/admin/bookings/${row.id}`} />
        <ActionIcon title="Assign professional" icon={<PersonAddAltIcon fontSize="small" />} href={`/admin/assignments${rangeQs()}`} />
      </Box>
    )},
  ];

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>Operations Overview</Typography>
        <Typography color="text.secondary">
          {hasRange ? `Showing ${startDate ? formatDate(startDate) : 'the beginning'} to ${endDate ? formatDate(endDate) : 'today'}` : 'Showing all time'}
        </Typography>
      </Box>

      {backendIgnoresRange && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          The API server is running an older version and ignored the date filter, so these cards show all-time totals. Restart the backend to apply the filter.
        </Alert>
      )}

      <Box sx={{ mb: 4 }}>
        <DateRangeFilter startDate={startDate} endDate={endDate} onChange={(s, e) => { setStartDate(s); setEndDate(e); }} />
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
          <StatsCard href={`/admin/bookings${rangeQs()}`} title="Total Bookings" value={String(stats?.totalBookings ?? 0)} icon={<BookOnlineIcon />} trend="up" trendValue="Live" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
          <StatsCard href={`/admin/bookings${rangeQs({ status: 'Pending' })}`} title="Pending Bookings" value={String(stats?.pendingBookings ?? 0)} icon={<AssignmentIndIcon />} trend="down" trendValue="Pending" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
          <StatsCard href={`/admin/users${rangeQs()}`} title="Total Users" value={String(stats?.totalUsers ?? 0)} icon={<PeopleIcon />} trend="up" trendValue="Registered" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
          <StatsCard href={`/admin/doctors${rangeQs({ status: 'Active' })}`} title="Active Doctors" value={String(stats?.totalDoctors ?? 0)} icon={<LocalHospitalIcon />} trend="up" trendValue="Active" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
          <StatsCard href={`/admin/payments${rangeQs({ status: 'Success' })}`} title="Payments Done" value={String(stats?.completedPayments ?? 0)} icon={<PaymentIcon />} trend="up" trendValue="Success" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
          <StatsCard href={`/admin/bookings${rangeQs({ status: 'Completed,VisitCompleted' })}`} title="Completed Visits" value={String(stats?.completedVisits ?? 0)} icon={<CheckCircleIcon />} trend="up" trendValue="Done" />
        </Grid>
      </Grid>

      {/* Booking Confirmation Center: bookings waiting for a professional */}
      <Box sx={{ mb: 4 }}>
        <DataTable
          title={`Booking Confirmation Center${queue.total ? ` · ${queue.total} awaiting assignment` : ''}`}
          columns={queueColumns}
          rows={queue.rows}
          loading={loading}
          hidePagination
          emptyMessage={hasRange ? 'Nothing is waiting for assignment in this date range.' : 'Nothing is waiting for assignment.'}
          actions={<Button component={Link} href={`/admin/assignments${rangeQs()}`} variant="contained">{queue.total > queue.rows.length ? `Open Center (${queue.total})` : 'Open Center'}</Button>}
        />
      </Box>

      {/* Recent Bookings Table */}
      <Box sx={{ mb: 4 }}>
        <DataTable 
          title="Recent Bookings" 
          columns={columns} 
          rows={recentBookings}
          loading={loading}
          hidePagination
          emptyMessage={hasRange ? 'No bookings in this date range.' : 'No bookings yet.'}
          actions={<Button component={Link} href={`/admin/bookings${rangeQs()}`} variant="contained">View All</Button>} 
        />
      </Box>
    </Box>
  );
}
