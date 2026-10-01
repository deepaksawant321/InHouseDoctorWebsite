'use client';

import { useEffect, useRef, useState } from 'react';
import { formatDoctorName } from '@/utils/doctorName';
import { Box, Typography, Button, TextField, MenuItem, Stack, Snackbar, Alert } from '@mui/material';
import { DataTable } from '@/features/admin/DataTable';
import { DateRangeFilter, useInitialDateRange } from '@/features/admin/DateRangeFilter';
import { StatusBadge, StatusType } from '@/features/admin/StatusBadge';
import { adminApi } from '@/services/api';
import { ActionIcon } from '@/features/admin/ActionIcon';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { formatDate } from '@/utils/date';

const BOOKING_STATUSES = ['Created', 'Pending', 'PaymentPending', 'PaymentVerified', 'Confirmed', 'DoctorAssigned', 'VisitStarted', 'VisitCompleted', 'Completed', 'Cancelled'];

// Same status set the dashboard's "Completed Visits" card counts
const COMPLETED_VISITS = 'Completed,VisitCompleted';

export default function BookingsManagementPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [total, setTotal] = useState(0);
  // Initial filters can come from the URL (e.g. dashboard cards link here with ?status=Pending&startDate=...).
  const range = useInitialDateRange(); // defaults to today unless the URL carries a range
  const [initial] = useState(() => {
    const q = new URLSearchParams(typeof window === 'undefined' ? '' : window.location.search);
    const status = q.get('status') ?? 'All';
    return { status: ['All', COMPLETED_VISITS, 'Created', 'Pending', 'PaymentPending', 'PaymentVerified', 'Confirmed', 'DoctorAssigned', 'VisitStarted', 'VisitCompleted', 'Completed', 'Cancelled'].includes(status) ? status : 'All' };
  });
  const [statusFilter, setStatusFilter] = useState(initial.status);
  const [startDate, setStartDate] = useState(range.start);
  const [endDate, setEndDate] = useState(range.end);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const requestSeq = useRef(0);

  const fetchBookings = (showLoading = true) => {
    if (startDate && endDate && startDate > endDate) return; // invalid range: wait for the user to fix it
    const seq = ++requestSeq.current;
    if (showLoading) setLoading(true);
    adminApi.getBookings({
      status: statusFilter === 'All' ? undefined : statusFilter,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      page: page + 1,
      pageSize: rowsPerPage,
    }).then(res => {
      if (seq !== requestSeq.current) return; // a newer request superseded this one
      setBookings(res.data.data || []);
      setTotal(res.data.total ?? 0);
    }).catch(() => {
      if (seq === requestSeq.current) setSnackbar({ open: true, message: 'Could not load bookings', severity: 'error' });
    }).finally(() => { if (seq === requestSeq.current) setLoading(false); });
  };

  useEffect(() => {
    fetchBookings(true);
    // Refresh every 30 seconds while the tab is visible
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') fetchBookings(false);
    }, 30000);
    return () => clearInterval(interval);
  }, [statusFilter, startDate, endDate, page, rowsPerPage]);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await adminApi.updateBookingStatus(id, status);
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      setSnackbar({ open: true, message: `Booking marked as ${status}`, severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to update status', severity: 'error' });
    }
  };

  const columns = [
    { id: 'id' as const, label: 'Booking ID', minWidth: 100, format: (v: string) => `#${String(v).slice(0, 8)}` },
    {
      id: 'patient' as const, label: 'Patient', minWidth: 180, format: (_: any, row: any) => (
        <Box>
          <Typography variant="body2">{row.patient?.fullName || '—'}</Typography>
          {row.patient?.mobileNo && (
            <Typography variant="caption" color="text.secondary">📞 {row.patient.mobileNo}</Typography>
          )}
        </Box>
      )
    },
    { id: 'doctor' as const, label: 'Doctor', minWidth: 150, format: (_: any, row: any) => row.doctor ? formatDoctorName(row.doctor.name) : 'Unassigned' },
    { id: 'symptoms' as const, label: 'Symptoms', minWidth: 150, format: (v: string) => v || '—' },
    { id: 'scheduledDate' as const, label: 'Date', minWidth: 120, format: (v: string) => formatDate(v, { utc: true }) },
    { id: 'paymentStatus' as const, label: 'Payment', minWidth: 120, align: 'center' as const, format: (value: StatusType) => <StatusBadge iconOnly status={value} /> },
    { id: 'status' as const, label: 'Status', minWidth: 120, align: 'center' as const, format: (value: StatusType) => <StatusBadge iconOnly status={value} /> },
    {
      id: 'actions' as const, label: 'Actions', minWidth: 300, align: 'left' as const,
      format: (_: any, row: any) => (
        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'nowrap' }}>
          <ActionIcon title="View details" icon={<VisibilityIcon fontSize="small" />} color="inherit" href={`/admin/bookings/${row.id}`} />
          {(row.status === 'Pending' || row.status === 'Created') && (
            <ActionIcon title="Confirm booking" icon={<CheckCircleOutlineIcon fontSize="small" />} onClick={() => handleUpdateStatus(row.id, 'Confirmed')} />
          )}
          {row.status === 'Confirmed' && (
            <ActionIcon title="Assign doctor" icon={<PersonAddAltIcon fontSize="small" />} color="secondary" href="/admin/assignments" />
          )}
          {row.status === 'DoctorAssigned' && (
            <ActionIcon title="Start visit" icon={<PlayArrowIcon fontSize="small" />} color="info" onClick={() => handleUpdateStatus(row.id, 'VisitStarted')} />
          )}
          {row.status === 'VisitStarted' && (
            <ActionIcon title="End visit" icon={<StopIcon fontSize="small" />} color="warning" onClick={() => handleUpdateStatus(row.id, 'VisitCompleted')} />
          )}
          {(row.status === 'VisitCompleted' || row.status === 'Confirmed' || row.status === 'DoctorAssigned') && (
            <ActionIcon title="Mark completed" icon={<DoneAllIcon fontSize="small" />} color="success" onClick={() => handleUpdateStatus(row.id, 'Completed')} />
          )}
          {row.status !== 'Cancelled' && row.status !== 'Completed' && (
            <ActionIcon title="Cancel booking" icon={<CancelOutlinedIcon fontSize="small" />} color="error" onClick={() => { if (confirm('Cancel this booking?')) handleUpdateStatus(row.id, 'Cancelled'); }} />
          )}
        </Box>
      )
    },
  ];

  const dateRangeInvalid = !!startDate && !!endDate && startDate > endDate;
  const hasFilters = statusFilter !== 'All' || !!startDate || !!endDate;

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>Bookings Management</Typography>
        <Typography color="text.secondary">{total} booking{total === 1 ? '' : 's'}{hasFilters ? ' match your filters' : ''}</Typography>
      </Box>

      <Stack direction="row" sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <TextField select size="small" label="Status" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(0); }} sx={{ width: 200 }}>
          <MenuItem value="All">All Statuses</MenuItem>
          {BOOKING_STATUSES.map(s => <MenuItem key={s} value={s}>{s.replace(/([a-z])([A-Z])/g, '$1 $2')}</MenuItem>)}
          <MenuItem value={COMPLETED_VISITS}>Completed Visits (Completed + Visit Completed)</MenuItem>
        </TextField>
        <DateRangeFilter startDate={startDate} endDate={endDate} fromLabel="From" onChange={(s, e) => { setStartDate(s); setEndDate(e); setPage(0); }} />
      </Stack>

      <DataTable
        columns={columns}
        rows={bookings}
        loading={loading}
        searchable
        emptyMessage={hasFilters ? 'No bookings match these filters.' : 'No bookings yet.'}
        serverPagination={{ total, page, rowsPerPage, onPageChange: setPage, onRowsPerPageChange: (n) => { setRowsPerPage(n); setPage(0); } }}
      />

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
