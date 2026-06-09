'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { DataTable } from '@/features/admin/DataTable';
import { StatusBadge, StatusType } from '@/features/admin/StatusBadge';
import AddIcon from '@mui/icons-material/Add';
import { adminApi, doctorsApi } from '@/services/api';
import { parseValidationErrors } from '@/utils/errorParser';

export default function DoctorsManagementPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const [addDialog, setAddDialog] = useState(false);
  const [newDoctor, setNewDoctor] = useState({ name: '', phoneNumber: '', email: '', qualification: '', specialization: '', experienceYears: '', consultationFee: '', coverageArea: '' });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    adminApi.getDoctors().then(res => {
      setDoctors(res.data.data || []);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleToggleStatus = async (id: string) => {
    try {
      const res = await adminApi.toggleDoctorStatus(id);
      const updated = res.data.data;
      setDoctors(prev => prev.map(d => d.id === id ? { ...d, status: updated.status } : d));
      setSnackbar({ open: true, message: `Doctor status changed to ${updated.status}`, severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to update status', severity: 'error' });
    }
  };

  const handleAddDoctor = async () => {
    setFieldErrors({});
    try {
      await doctorsApi.create({
        ...newDoctor,
        experienceYears: Number(newDoctor.experienceYears),
        consultationFee: Number(newDoctor.consultationFee),
      });
      setSnackbar({ open: true, message: 'Doctor added successfully!', severity: 'success' });
      setAddDialog(false);
      setNewDoctor({ name: '', phoneNumber: '', email: '', qualification: '', specialization: '', experienceYears: '', consultationFee: '', coverageArea: '' });
      // Refresh list
      const res = await adminApi.getDoctors();
      setDoctors(res.data.data || []);
    } catch (err: any) {
      const { fieldErrors, generalMessage } = parseValidationErrors(err);
      setFieldErrors(fieldErrors);
      setSnackbar({ open: true, message: generalMessage, severity: 'error' });
    }
  };

  const columns = [
    { id: 'id' as const, label: 'Doctor ID', minWidth: 80, format: (v: string) => `#${String(v).slice(0, 6)}` },
    { id: 'name' as const, label: 'Name', minWidth: 180, format: (v: string) => `Dr. ${v}` },
    { id: 'specialization' as const, label: 'Specialization', minWidth: 150 },
    { id: 'experienceYears' as const, label: 'Experience', minWidth: 100, format: (v: number) => `${v} yrs` },
    { id: 'consultationFee' as const, label: 'Fee', minWidth: 80, format: (v: number) => `₹${v}` },
    { id: 'status' as const, label: 'Status', minWidth: 100, format: (value: StatusType) => <StatusBadge status={value} /> },
    { id: 'isAvailable' as const, label: 'Available', minWidth: 100, format: (v: boolean) => <StatusBadge status={v ? 'Available' : 'Unavailable'} /> },
    {
      id: 'actions' as const, label: 'Actions', minWidth: 150, align: 'center' as const,
      format: (_: any, row: any) => (
        <Button variant="outlined" size="small" sx={{ borderRadius: 2 }} onClick={() => handleToggleStatus(row.id)}>
          {row.status === 'Active' ? 'Deactivate' : 'Activate'}
        </Button>
      )
    },
  ];

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Doctor Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddDialog(true)}>Add Doctor</Button>
      </Box>

      <DataTable columns={columns} rows={doctors} />

      {/* Add Doctor Dialog */}
      <Dialog open={addDialog} onClose={() => setAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Add New Doctor</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          {(['name', 'phoneNumber', 'email', 'qualification', 'specialization'] as const).map(field => (
            <TextField key={field} label={field.charAt(0).toUpperCase() + field.slice(1)} fullWidth
              value={(newDoctor as any)[field]} onChange={e => setNewDoctor(prev => ({ ...prev, [field]: e.target.value }))}
              error={!!fieldErrors[field]} helperText={fieldErrors[field]} />
          ))}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Experience (years)" type="number" fullWidth value={newDoctor.experienceYears}
              onChange={e => setNewDoctor(prev => ({ ...prev, experienceYears: e.target.value }))}
              error={!!fieldErrors.experienceYears} helperText={fieldErrors.experienceYears} />
            <TextField label="Consultation Fee (₹)" type="number" fullWidth value={newDoctor.consultationFee}
              onChange={e => setNewDoctor(prev => ({ ...prev, consultationFee: e.target.value }))}
              error={!!fieldErrors.consultationFee} helperText={fieldErrors.consultationFee} />
          </Box>
          <TextField label="Coverage Area / Pincode" fullWidth value={newDoctor.coverageArea}
            onChange={e => setNewDoctor(prev => ({ ...prev, coverageArea: e.target.value }))}
            error={!!fieldErrors.coverageArea} helperText={fieldErrors.coverageArea} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setAddDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddDoctor}>Add Doctor</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
