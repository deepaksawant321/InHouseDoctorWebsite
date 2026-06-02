'use client';

import { Box, Typography, Button, TextField, MenuItem, Stack } from '@mui/material';
import { DataTable } from '@/features/admin/DataTable';
import { StatusBadge, StatusType } from '@/features/admin/StatusBadge';
import { mockBookings } from '@/services/mockAdminData';
import Link from 'next/link';

export default function BookingsManagementPage() {
  const columns = [
    { id: 'id' as const, label: 'Booking ID', minWidth: 100 },
    { id: 'patientName' as const, label: 'Patient Name', minWidth: 150 },
    { id: 'mobile' as const, label: 'Mobile', minWidth: 120 },
    { id: 'service' as const, label: 'Service', minWidth: 150 },
    { id: 'area' as const, label: 'Area', minWidth: 120 },
    { id: 'bookingDate' as const, label: 'Date', minWidth: 120 },
    { id: 'paymentStatus' as const, label: 'Payment Status', minWidth: 120, format: (value: StatusType) => <StatusBadge status={value} /> },
    { id: 'doctorStatus' as const, label: 'Doctor Status', minWidth: 120, format: (value: StatusType) => <StatusBadge status={value} /> },
    { id: 'actions' as const, label: 'Actions', minWidth: 100, align: 'center' as const, format: (value: any, row: any) => (
      <Button component={Link} href={`/admin/bookings/${row.id}`} variant="contained" size="small" sx={{ borderRadius: 2 }}>Details</Button>
    ) },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Bookings Management</Typography>
        <Stack direction="row" spacing={2}>
          <TextField select size="small" label="Status" defaultValue="All" sx={{ width: 150 }}>
            <MenuItem value="All">All Statuses</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Confirmed">Confirmed</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>
          <TextField select size="small" label="Service" defaultValue="All" sx={{ width: 150 }}>
            <MenuItem value="All">All Services</MenuItem>
            <MenuItem value="General Physician">General Physician</MenuItem>
            <MenuItem value="Nursing Care">Nursing Care</MenuItem>
          </TextField>
        </Stack>
      </Box>

      <DataTable columns={columns} rows={mockBookings} />
    </Box>
  );
}
