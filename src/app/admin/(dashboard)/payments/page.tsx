'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import { DataTable } from '@/features/admin/DataTable';
import { DateRangeFilter, useInitialDateRange } from '@/features/admin/DateRangeFilter';
import { StatusBadge, StatusType } from '@/features/admin/StatusBadge';
import { adminApi } from '@/services/api';
import { ActionIcon } from '@/features/admin/ActionIcon';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function PaymentsManagementPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [total, setTotal] = useState(0);
  // Initial filters can come from the URL (e.g. dashboard cards link here with ?status=Pending&startDate=...).
  const range = useInitialDateRange(); // defaults to today unless the URL carries a range
  const [initial] = useState(() => {
    const q = new URLSearchParams(typeof window === 'undefined' ? '' : window.location.search);
    const status = q.get('status') ?? 'All';
    return { status: ['All', 'Pending', 'Success', 'Rejected'].includes(status) ? status : 'All' };
  });
  const [statusFilter, setStatusFilter] = useState(initial.status);
  const [startDate, setStartDate] = useState(range.start);
  const [endDate, setEndDate] = useState(range.end);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const [verifyDialog, setVerifyDialog] = useState<{ open: boolean; paymentId: string | null }>({ open: false, paymentId: null });
  const [verifyStatus, setVerifyStatus] = useState<'Success' | 'Rejected'>('Success');
  const [verifyRemarks, setVerifyRemarks] = useState('');

  const requestSeq = useRef(0);

  const fetchPayments = () => {
    if (startDate && endDate && startDate > endDate) return; // invalid range: wait for the user to fix it
    const seq = ++requestSeq.current;
    setLoading(true);
    adminApi.getPayments({
      status: statusFilter === 'All' ? undefined : statusFilter,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      page: page + 1,
      pageSize: rowsPerPage,
    }).then(res => {
      if (seq !== requestSeq.current) return;
      setPayments(res.data.data || []);
      setTotal(res.data.total ?? 0);
    }).catch(() => {
      if (seq === requestSeq.current) setSnackbar({ open: true, message: 'Could not load payments', severity: 'error' });
    }).finally(() => { if (seq === requestSeq.current) setLoading(false); });
  };

  useEffect(() => {
    fetchPayments();
  }, [statusFilter, startDate, endDate, page, rowsPerPage]);

  const dateRangeInvalid = !!startDate && !!endDate && startDate > endDate;
  const hasFilters = statusFilter !== 'All' || !!startDate || !!endDate;

  const openVerify = (id: string) => {
    setVerifyDialog({ open: true, paymentId: id });
    setVerifyStatus('Success');
    setVerifyRemarks('');
  };

  const handleVerify = async () => {
    if (!verifyDialog.paymentId) return;
    try {
      await adminApi.verifyPayment(verifyDialog.paymentId, verifyStatus, verifyRemarks);
      setPayments(prev => prev.map(p => p.id === verifyDialog.paymentId ? { ...p, status: verifyStatus } : p));
      setSnackbar({ open: true, message: `Payment marked as ${verifyStatus}`, severity: 'success' });
    } catch (err: any) {
      setSnackbar({ open: true, message: err.response?.data?.message || 'Failed to verify payment', severity: 'error' });
    } finally {
      setVerifyDialog({ open: false, paymentId: null });
    }
  };

  const columns = [
    { id: 'id' as const, label: 'Payment ID', minWidth: 100, format: (v: string) => `#${String(v).slice(0, 8)}` },
    { id: 'booking' as const, label: 'Booking Ref', minWidth: 120, format: (_: any, row: any) => row.booking?.id ? `#${String(row.booking.id).slice(0, 8)}` : '—' },
    { id: 'patient' as const, label: 'Patient', minWidth: 150, format: (_: any, row: any) => row.booking?.patient?.fullName || '—' },
    { id: 'amount' as const, label: 'Amount', minWidth: 100, format: (value: number) => `₹${value ?? 0}` },
    { id: 'transactionId' as const, label: 'UPI Ref', minWidth: 150, format: (v: string) => v || '—' },
    { id: 'status' as const, label: 'Status', minWidth: 120, align: 'center' as const, format: (value: StatusType) => <StatusBadge iconOnly status={value} /> },
    {
      id: 'actions' as const, label: 'Actions', minWidth: 180, align: 'left' as const,
      format: (_: any, row: any) => (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {row.booking?.id && (
            <ActionIcon title="View booking" icon={<VisibilityIcon fontSize="small" />} color="inherit" href={`/admin/bookings/${row.booking.id}`} />
          )}
          {row.status !== 'Success' && row.status !== 'Rejected' && (
            <ActionIcon title="Verify payment" icon={<VerifiedIcon fontSize="small" />} onClick={() => openVerify(row.id)} />
          )}
          {row.status === 'Success' && <Typography variant="caption" color="success.main" sx={{ fontWeight: 700 }}>✓ Verified</Typography>}
          {row.status === 'Rejected' && <Typography variant="caption" color="error.main" sx={{ fontWeight: 700 }}>✗ Rejected</Typography>}
        </Box>
      )
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>Payment Verification</Typography>
        <Typography color="text.secondary">{total} payment{total === 1 ? '' : 's'}{hasFilters ? ' match your filters' : ''}</Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 3 }}>
        <TextField select size="small" label="Status" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(0); }} sx={{ width: 200 }}>
          <MenuItem value="All">All Statuses</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Success">Success</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
        </TextField>
        <DateRangeFilter startDate={startDate} endDate={endDate} fromLabel="From" onChange={(s, e) => { setStartDate(s); setEndDate(e); setPage(0); }} />
      </Box>

      <DataTable
        columns={columns}
        rows={payments}
        loading={loading}
        searchable
        emptyMessage={hasFilters ? 'No payments match these filters.' : 'No payments yet.'}
        serverPagination={{ total, page, rowsPerPage, onPageChange: setPage, onRowsPerPageChange: (n) => { setRowsPerPage(n); setPage(0); } }}
      />

      {/* Verify Dialog */}
      <Dialog open={verifyDialog.open} onClose={() => setVerifyDialog({ open: false, paymentId: null })} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Verify Payment</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField select label="Decision" value={verifyStatus} onChange={e => setVerifyStatus(e.target.value as any)} fullWidth>
            <MenuItem value="Success">✓ Mark as Success</MenuItem>
            <MenuItem value="Rejected">✗ Reject Payment</MenuItem>
          </TextField>
          <TextField label="Remarks (optional)" value={verifyRemarks} onChange={e => setVerifyRemarks(e.target.value)} fullWidth multiline rows={2} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setVerifyDialog({ open: false, paymentId: null })}>Cancel</Button>
          <Button variant="contained" onClick={handleVerify}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
