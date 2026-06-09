'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, MenuItem, Stack, CircularProgress, Snackbar, Alert } from '@mui/material';
import { DataTable } from '@/features/admin/DataTable';
import { StatusBadge, StatusType } from '@/features/admin/StatusBadge';
import { adminApi } from '@/services/api';

export default function BookingsManagementPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    adminApi.getBookings().then(res => {
      const data = res.data.data || [];
      setBookings(data);
      setFiltered(data);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFiltered(statusFilter === 'All' ? bookings : bookings.filter(b => b.status === statusFilter));
  }, [statusFilter, bookings]);

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
    { id: 'patient' as const, label: 'Patient', minWidth: 150, format: (_: any, row: any) => row.patient?.fullName || '—' },
    { id: 'doctor' as const, label: 'Doctor', minWidth: 150, format: (_: any, row: any) => row.doctor ? `Dr. ${row.doctor.name}` : 'Unassigned' },
    { id: 'symptoms' as const, label: 'Symptoms', minWidth: 150, format: (v: string) => v || '—' },
    { id: 'scheduledDate' as const, label: 'Date', minWidth: 120, format: (v: string) => v ? new Date(v).toLocaleDateString() : '—' },
    { id: 'paymentStatus' as const, label: 'Payment', minWidth: 120, format: (value: StatusType) => <StatusBadge status={value} /> },
    { id: 'status' as const, label: 'Status', minWidth: 120, format: (value: StatusType) => <StatusBadge status={value} /> },
    {
      id: 'actions' as const, label: 'Actions', minWidth: 200, align: 'center' as const,
      format: (_: any, row: any) => (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          {row.status === 'Pending' && (
            <Button variant="contained" size="small" sx={{ borderRadius: 2 }} onClick={() => handleUpdateStatus(row.id, 'Confirmed')}>
              Confirm
            </Button>
          )}
          {row.status !== 'Cancelled' && row.status !== 'Completed' && (
            <Button variant="outlined" color="error" size="small" sx={{ borderRadius: 2 }} onClick={() => handleUpdateStatus(row.id, 'Cancelled')}>
              Cancel
            </Button>
          )}
          {row.status === 'Confirmed' && (
            <Button variant="outlined" color="success" size="small" sx={{ borderRadius: 2 }} onClick={() => handleUpdateStatus(row.id, 'Completed')}>
              Complete
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
        <Stack direction="row" spacing={2}>
          <TextField select size="small" label="Status" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} sx={{ width: 160 }}>
            <MenuItem value="All">All Statuses</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Confirmed">Confirmed</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </TextField>
        </Stack>
      </Box>

      <DataTable columns={columns} rows={filtered} />

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
