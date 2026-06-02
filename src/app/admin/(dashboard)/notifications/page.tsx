'use client';

import { Box, Typography, Button } from '@mui/material';
import { DataTable } from '@/features/admin/DataTable';
import { StatusBadge, StatusType } from '@/features/admin/StatusBadge';
import { mockNotifications } from '@/services/mockAdminData';

export default function NotificationsManagementPage() {
  const columns = [
    { id: 'bookingId' as const, label: 'Booking Ref', minWidth: 120 },
    { id: 'smsStatus' as const, label: 'SMS', minWidth: 120, format: (value: StatusType) => <StatusBadge status={value} /> },
    { id: 'whatsappStatus' as const, label: 'WhatsApp', minWidth: 120, format: (value: StatusType) => <StatusBadge status={value} /> },
    { id: 'emailStatus' as const, label: 'Email', minWidth: 120, format: (value: StatusType) => <StatusBadge status={value} /> },
    { id: 'sentDate' as const, label: 'Sent Date', minWidth: 180 },
    { id: 'deliveryStatus' as const, label: 'Overall Status', minWidth: 150, format: (value: StatusType) => <StatusBadge status={value} /> },
    { id: 'actions' as const, label: 'Actions', minWidth: 150, align: 'center' as const, format: (value: any, row: any) => (
      <Button variant="outlined" size="small" sx={{ borderRadius: 2 }}>Resend All</Button>
    ) },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Notification Center</Typography>
      </Box>
      <DataTable columns={columns} rows={mockNotifications} />
    </Box>
  );
}
