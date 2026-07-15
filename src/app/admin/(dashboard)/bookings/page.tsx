'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, MenuItem, Stack, CircularProgress, Snackbar, Alert } from '@mui/material';
import { DataTable } from '@/features/admin/DataTable';
import { StatusBadge, StatusType } from '@/features/admin/StatusBadge';
import { adminApi } from '@/services/api';

export default function BookingsManagementPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const fetchBookings = (showLoading = true) => {
    if (showLoading) setLoading(true);
    adminApi.getBookings({
      status: statusFilter === 'All' ? undefined : statusFilter,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    }).then(res => {
      setBookings(res.data.data || []);
    }).catch(console.error).finally(() => { if (showLoading) setLoading(false); });
  };

  useEffect(() => {
    fetchBookings(true);
    // Poll for new bookings every 10 seconds silently
    const interval = setInterval(() => {
      fetchBookings(false);
    }, 10000);
    return () => clearInterval(interval);
  }, [statusFilter, startDate, endDate]);

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
    { id: 'doctor' as const, label: 'Doctor', minWidth: 150, format: (_: any, row: any) => row.doctor ? `Dr. ${row.doctor.name}` : 'Unassigned' },
    { id: 'symptoms' as const, label: 'Symptoms', minWidth: 150, format: (v: string) => v || '—' },
    { id: 'scheduledDate' as const, label: 'Date', minWidth: 120, format: (v: string) => v ? new Date(v).toLocaleDateString() : '—' },
    { id: 'paymentStatus' as const, label: 'Payment', minWidth: 120, format: (value: StatusType) => <StatusBadge status={value} /> },
    { id: 'status' as const, label: 'Status', minWidth: 120, format: (value: StatusType) => <StatusBadge status={value} /> },
    {
      id: 'actions' as const, label: 'Actions', minWidth: 350, align: 'center' as const,
      format: (_: any, row: any) => (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', minWidth: 'max-content' }}>
          {(row.status === 'Pending' || row.status === 'Created') && (
            <Button variant="contained" size="small" sx={{ borderRadius: 2, whiteSpace: 'nowrap' }} onClick={() => handleUpdateStatus(row.id, 'Confirmed')}>
              Confirm
            </Button>
          )}
          {row.status === 'Confirmed' && (
            <Button variant="contained" color="secondary" size="small" sx={{ borderRadius: 2, whiteSpace: 'nowrap' }} onClick={() => handleUpdateStatus(row.id, 'DoctorAssigned')}>
              Assign Dr
            </Button>
          )}
          {row.status === 'DoctorAssigned' && (
            <Button variant="contained" color="info" size="small" sx={{ borderRadius: 2, whiteSpace: 'nowrap' }} onClick={() => handleUpdateStatus(row.id, 'VisitStarted')}>
              Start Visit
            </Button>
          )}
          {row.status === 'VisitStarted' && (
            <Button variant="contained" color="warning" size="small" sx={{ borderRadius: 2, whiteSpace: 'nowrap' }} onClick={() => handleUpdateStatus(row.id, 'VisitCompleted')}>
              End Visit
            </Button>
          )}
          {(row.status === 'VisitCompleted' || row.status === 'Confirmed' || row.status === 'DoctorAssigned') && (
            <Button variant="outlined" color="success" size="small" sx={{ borderRadius: 2, whiteSpace: 'nowrap' }} onClick={() => handleUpdateStatus(row.id, 'Completed')}>
              Complete
            </Button>
          )}
          {row.status !== 'Cancelled' && row.status !== 'Completed' && (
            <Button variant="outlined" color="error" size="small" sx={{ borderRadius: 2, whiteSpace: 'nowrap' }} onClick={() => handleUpdateStatus(row.id, 'Cancelled')}>
              Cancel
            </Button>
          )}
        </Box>
      )
    },
  ];

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Bookings Management</Typography>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <TextField
            type="date"
            size="small"
            label="Start Date"
            slotProps={{ inputLabel: { shrink: true } }}
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
          <TextField
            type="date"
            size="small"
            label="End Date"
            slotProps={{ inputLabel: { shrink: true } }}
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
          <Button variant="contained" onClick={() => fetchBookings()} sx={{ borderRadius: 2 }}>
            Apply Filter
          </Button>

          <TextField select size="small" label="Status" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} sx={{ width: 160 }}>
            <MenuItem value="All">All Statuses</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Confirmed">Confirmed</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </TextField>
        </Stack>
      </Box>

      <DataTable columns={columns} rows={bookings} />

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
