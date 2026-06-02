'use client';

import { Box, Typography, Button } from '@mui/material';
import { DataTable } from '@/features/admin/DataTable';
import { StatusBadge, StatusType } from '@/features/admin/StatusBadge';
import { mockDoctors } from '@/services/mockAdminData';
import AddIcon from '@mui/icons-material/Add';

export default function DoctorsManagementPage() {
  const columns = [
    { id: 'id' as const, label: 'Doctor ID', minWidth: 100 },
    { id: 'name' as const, label: 'Name', minWidth: 180 },
    { id: 'specialization' as const, label: 'Specialization', minWidth: 150 },
    { id: 'area' as const, label: 'Coverage Area', minWidth: 150 },
    { id: 'rating' as const, label: 'Rating', minWidth: 100, format: (value: number) => `⭐ ${value}` },
    { id: 'status' as const, label: 'Status', minWidth: 100, format: (value: StatusType) => <StatusBadge status={value} /> },
    { id: 'availability' as const, label: 'Availability', minWidth: 120, format: (value: StatusType) => <StatusBadge status={value} /> },
    { id: 'actions' as const, label: 'Actions', minWidth: 150, align: 'center' as const, format: (value: any, row: any) => (
      <Button variant="outlined" size="small" sx={{ borderRadius: 2 }}>Profile</Button>
    ) },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Doctor Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>Add Doctor</Button>
      </Box>
      <DataTable columns={columns} rows={mockDoctors} />
    </Box>
  );
}
