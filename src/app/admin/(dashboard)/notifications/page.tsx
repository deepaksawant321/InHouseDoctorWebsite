'use client';

import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { DataTable } from '@/features/admin/DataTable';
import { StatusBadge, StatusType } from '@/features/admin/StatusBadge';
import { notificationsApi } from '@/services/api';

export default function NotificationsManagementPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    notificationsApi.getAll().then(res => {
      const data = res.data.data || [];
      const mapped = data.map((n: any) => ({
        id: n.id,
        bookingId: n.booking?.bookingNo || `#${String(n.booking?.id || '').slice(0, 6)}`,
        channel: n.channel || 'SMS',
        type: n.type,
        sentDate: n.sentDate ? new Date(n.sentDate).toLocaleString() : 'Pending',
        deliveryStatus: n.status || (n.isRead ? 'Delivered' : 'Pending'),
      }));
      setNotifications(mapped);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);
  const columns = [
    { id: 'bookingId' as const, label: 'Booking Ref', minWidth: 120 },
    { id: 'channel' as const, label: 'Channel', minWidth: 100 },
    { id: 'type' as const, label: 'Type', minWidth: 120 },
    { id: 'sentDate' as const, label: 'Sent Date', minWidth: 180 },
    { id: 'deliveryStatus' as const, label: 'Status', minWidth: 120, format: (value: StatusType) => <StatusBadge status={value} /> },
    { id: 'actions' as const, label: 'Actions', minWidth: 150, align: 'center' as const, format: (value: any, row: any) => (
      <Button variant="outlined" size="small" sx={{ borderRadius: 2 }}>Resend</Button>
    ) },
  ];

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Notification Center</Typography>
      </Box>
      <DataTable columns={columns} rows={notifications} />
    </Box>
  );
}
