'use client';

import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { DataTable } from '@/features/admin/DataTable';
import { StatusBadge, StatusType } from '@/features/admin/StatusBadge';
import { notificationsApi } from '@/services/api';
import { formatDateTime } from '@/utils/date';

export default function NotificationsManagementPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    notificationsApi.getAllAdmin().then(res => {
      const data = res.data.data || [];
      const mapped = data.map((n: any) => ({
        id: n.id,
        bookingId: n.booking?.bookingNo || `#${String(n.booking?.id || '').slice(0, 6)}`,
        type: n.notificationType,
        message: n.message,
        sentDate: n.sentDate ? formatDateTime(n.sentDate) : 'Pending',
        deliveryStatus: n.deliveryStatus || (n.isRead ? 'Read' : 'Pending'),
      }));
      setNotifications(mapped);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);
  const columns = [
    { id: 'bookingId' as const, label: 'Booking Ref', minWidth: 120 },
    { id: 'type' as const, label: 'Type', minWidth: 140 },
    { id: 'message' as const, label: 'Message', minWidth: 280 },
    { id: 'sentDate' as const, label: 'Sent Date', minWidth: 180 },
    { id: 'deliveryStatus' as const, label: 'Status', minWidth: 120, format: (value: StatusType) => <StatusBadge status={value} /> },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Notification Center</Typography>
      </Box>
      <DataTable columns={columns} rows={notifications} loading={loading} searchable emptyMessage="No notifications yet." />
    </Box>
  );
}
