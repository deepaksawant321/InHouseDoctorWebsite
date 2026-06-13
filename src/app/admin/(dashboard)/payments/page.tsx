'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import { DataTable } from '@/features/admin/DataTable';
import { StatusBadge, StatusType } from '@/features/admin/StatusBadge';
import { adminApi } from '@/services/api';

export default function PaymentsManagementPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const [verifyDialog, setVerifyDialog] = useState<{ open: boolean; paymentId: string | null }>({ open: false, paymentId: null });
  const [verifyStatus, setVerifyStatus] = useState<'Success' | 'Rejected'>('Success');
  const [verifyRemarks, setVerifyRemarks] = useState('');

  const fetchPayments = () => {
    setLoading(true);
    adminApi.getPayments({
      status: statusFilter === 'All' ? undefined : statusFilter,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    }).then(res => {
      setPayments(res.data.data || []);
    }).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPayments();
  }, [statusFilter]);

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
    { id: 'amount' as const, label: 'Amount', minWidth: 100, format: (value: number) => `₹${value ?? 0}` },
    { id: 'transactionId' as const, label: 'UPI Ref', minWidth: 150, format: (v: string) => v || '—' },
    { id: 'status' as const, label: 'Status', minWidth: 120, format: (value: StatusType) => <StatusBadge status={value} /> },
    {
      id: 'actions' as const, label: 'Actions', minWidth: 150, align: 'center' as const,
      format: (_: any, row: any) => (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          {row.status !== 'Success' && row.status !== 'Rejected' && (
            <Button variant="contained" size="small" sx={{ borderRadius: 2 }} onClick={() => openVerify(row.id)}>
              Verify
            </Button>
          )}
          {row.status === 'Success' && <Typography variant="caption" color="success.main" sx={{ fontWeight: 700 }}>✓ Verified</Typography>}
          {row.status === 'Rejected' && <Typography variant="caption" color="error.main" sx={{ fontWeight: 700 }}>✗ Rejected</Typography>}
        </Box>
      )
    },
  ];

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Payment Verification</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
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
          <Button variant="contained" onClick={fetchPayments} sx={{ borderRadius: 2 }}>
            Apply Filter
          </Button>

          <TextField select size="small" label="Status" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} sx={{ width: 160 }}>
            <MenuItem value="All">All Statuses</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Success">Success</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </TextField>
        </Box>
      </Box>

      <DataTable columns={columns} rows={payments} />

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
