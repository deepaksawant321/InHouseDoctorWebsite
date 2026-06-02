'use client';

import { Box, Typography, Button } from '@mui/material';
import { DataTable } from '@/features/admin/DataTable';
import { StatusBadge, StatusType } from '@/features/admin/StatusBadge';
import { mockPayments } from '@/services/mockAdminData';

export default function PaymentsManagementPage() {
  const columns = [
    { id: 'id' as const, label: 'Payment ID', minWidth: 100 },
    { id: 'bookingId' as const, label: 'Booking Ref', minWidth: 120 },
    { id: 'patient' as const, label: 'Patient Name', minWidth: 150 },
    { id: 'amount' as const, label: 'Amount', minWidth: 100, format: (value: number) => `₹${value}` },
    { id: 'upiRef' as const, label: 'UPI Ref No.', minWidth: 150 },
    { id: 'date' as const, label: 'Date', minWidth: 150 },
    { id: 'status' as const, label: 'Status', minWidth: 150, format: (value: StatusType) => <StatusBadge status={value} /> },
    { id: 'actions' as const, label: 'Actions', minWidth: 150, align: 'center' as const, format: (value: any, row: any) => (
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
        <Button variant="outlined" size="small" sx={{ borderRadius: 2 }}>Verify</Button>
      </Box>
    ) },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Payment Verification</Typography>
      </Box>
      <DataTable columns={columns} rows={mockPayments} />
    </Box>
  );
}
