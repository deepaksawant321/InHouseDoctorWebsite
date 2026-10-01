'use client';

import { useEffect, useState } from 'react';
import { formatDoctorName } from '@/utils/doctorName';
import { Box, Typography, Button, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import { DataTable } from '@/features/admin/DataTable';
import { DateRangeFilter, useInitialDateRange } from '@/features/admin/DateRangeFilter';
import { StatusBadge, StatusType } from '@/features/admin/StatusBadge';
import { ActionIcon } from '@/features/admin/ActionIcon';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { adminApi, doctorsApi } from '@/services/api';
import { parseValidationErrors } from '@/utils/errorParser';

export default function DoctorsManagementPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // Registration-date range: today by default, or whatever the URL carries (dashboard card links)
  const initialRange = useInitialDateRange();
  const [startDate, setStartDate] = useState(initialRange.start);
  const [endDate, setEndDate] = useState(initialRange.end);
  const dateRangeInvalid = !!startDate && !!endDate && startDate > endDate;
  const [statusFilter, setStatusFilter] = useState(() => {
    const s = typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('status');
    return s === 'Active' || s === 'Inactive' ? s : 'All';
  });
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null);
  const [newDoctor, setNewDoctor] = useState({ name: '', phoneNumber: '', email: '', qualification: '', specialization: '', experienceYears: '', consultationFee: '', coverageArea: '' });
  const [editDoctor, setEditDoctor] = useState({ name: '', phoneNumber: '', email: '', qualification: '', specialization: '', experienceYears: '', consultationFee: '', coverageArea: '' });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const fetchDoctors = () => {
    if (dateRangeInvalid) return;
    setLoading(true);
    adminApi.getDoctors({ status: statusFilter === 'All' ? undefined : statusFilter, startDate: startDate || undefined, endDate: endDate || undefined })
      .then(res => {
        setDoctors(res.data.data || []);
      }).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDoctors();
  }, [statusFilter, startDate, endDate]);

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
      fetchDoctors();
    } catch (err: any) {
      const { fieldErrors, generalMessage } = parseValidationErrors(err);
      setFieldErrors(fieldErrors);
      setSnackbar({ open: true, message: generalMessage, severity: 'error' });
    }
  };

  const openEditDialog = (doctor: any) => {
    setEditingDoctorId(doctor.id);
    setEditDoctor({
      name: doctor.name || '',
      phoneNumber: doctor.phoneNumber || '',
      email: doctor.email || '',
      qualification: doctor.qualification || '',
      specialization: doctor.specialization || '',
      experienceYears: String(doctor.experienceYears || ''),
      consultationFee: String(doctor.consultationFee || ''),
      coverageArea: doctor.coverageAreas?.[0]?.areaName || ''
    });
    setFieldErrors({});
    setEditDialog(true);
  };

  const handleEditDoctor = async () => {
    if (!editingDoctorId) return;
    setFieldErrors({});
    try {
      await doctorsApi.update(editingDoctorId, {
        ...editDoctor,
        experienceYears: Number(editDoctor.experienceYears),
        consultationFee: Number(editDoctor.consultationFee),
      });
      setSnackbar({ open: true, message: 'Doctor updated successfully!', severity: 'success' });
      setEditDialog(false);
      fetchDoctors();
    } catch (err: any) {
      const { fieldErrors, generalMessage } = parseValidationErrors(err);
      setFieldErrors(fieldErrors);
      setSnackbar({ open: true, message: generalMessage, severity: 'error' });
    }
  };

  const columns = [
    { id: 'id' as const, label: 'Doctor ID', minWidth: 80, format: (v: string) => `#${String(v).slice(0, 6)}` },
    { id: 'name' as const, label: 'Name', minWidth: 180, format: (v: string) => formatDoctorName(v) },
    { id: 'specialization' as const, label: 'Specialization', minWidth: 150 },
    { id: 'experienceYears' as const, label: 'Experience', minWidth: 100, format: (v: number) => `${v} yrs` },
    { id: 'consultationFee' as const, label: 'Fee', minWidth: 80, format: (v: number) => `₹${v}` },
    { id: 'status' as const, label: 'Status', minWidth: 100, align: 'center' as const, format: (value: StatusType) => <StatusBadge iconOnly status={value} /> },
    { id: 'isAvailable' as const, label: 'Available', minWidth: 100, align: 'center' as const, format: (v: boolean) => <StatusBadge iconOnly status={v ? 'Available' : 'Unavailable'} /> },
    {
      id: 'actions' as const, label: 'Actions', minWidth: 220, align: 'left' as const,
      format: (_: any, row: any) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <ActionIcon title="View profile" icon={<VisibilityIcon fontSize="small" />} color="inherit" href={`/admin/doctors/${row.id}`} />
          <ActionIcon title="Edit" icon={<EditIcon fontSize="small" />} color="info" onClick={() => openEditDialog(row)} />
          <ActionIcon
            title={row.status === 'Active' ? 'Deactivate' : 'Activate'}
            icon={row.status === 'Active' ? <BlockIcon fontSize="small" /> : <CheckCircleOutlineIcon fontSize="small" />}
            color={row.status === 'Active' ? 'error' : 'success'}
            onClick={() => handleToggleStatus(row.id)}
          />
        </Box>
      )
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Staff & Doctor Management</Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <DateRangeFilter startDate={startDate} endDate={endDate} fromLabel="Registered from" onChange={(s, e) => { setStartDate(s); setEndDate(e); }} />
          <TextField select size="small" label="Status" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} sx={{ width: 140 }}>
            <MenuItem value="All">All Statuses</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
          <Button variant="contained" startIcon={<PersonAddIcon />} onClick={() => setAddDialog(true)} sx={{ borderRadius: 2 }}>Add Professional</Button>
        </Box>
      </Box>

      <DataTable columns={columns} rows={doctors} loading={loading} searchable emptyMessage={statusFilter === 'All' && !startDate && !endDate ? 'No professionals added yet.' : `No ${statusFilter.toLowerCase()} professionals.`} />

      {/* Add Professional Dialog */}
      <Dialog open={addDialog} onClose={() => setAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Add New Professional</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          {(['name', 'phoneNumber', 'email', 'qualification'] as const).map(field => (
            <TextField key={field} label={field.charAt(0).toUpperCase() + field.slice(1)} fullWidth
              value={(newDoctor as any)[field]} onChange={e => setNewDoctor(prev => ({ ...prev, [field]: e.target.value }))}
              error={!!fieldErrors[field]} helperText={fieldErrors[field]} />
          ))}
          <TextField select label="Role / Specialization" fullWidth value={newDoctor.specialization}
            onChange={e => setNewDoctor(prev => ({ ...prev, specialization: e.target.value }))}
            error={!!fieldErrors.specialization} helperText={fieldErrors.specialization}>
            <MenuItem value="General Physician">General Physician</MenuItem>
            <MenuItem value="Elder Care">Elder Care</MenuItem>
            <MenuItem value="Nursing Care">Nursing Care</MenuItem>
            <MenuItem value="Physiotherapy">Physiotherapy</MenuItem>
            <MenuItem value="Cardiologist">Cardiologist</MenuItem>
            <MenuItem value="Dermatologist">Dermatologist</MenuItem>
            <MenuItem value="Pediatrician">Pediatrician</MenuItem>
          </TextField>
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
          <Button variant="contained" onClick={handleAddDoctor}>Add Professional</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Professional Dialog */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Edit Professional</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          {(['name', 'phoneNumber', 'email', 'qualification'] as const).map(field => (
            <TextField key={field} label={field.charAt(0).toUpperCase() + field.slice(1)} fullWidth
              value={(editDoctor as any)[field]} onChange={e => setEditDoctor(prev => ({ ...prev, [field]: e.target.value }))}
              error={!!fieldErrors[field]} helperText={fieldErrors[field]} />
          ))}
          <TextField select label="Role / Specialization" fullWidth value={editDoctor.specialization}
            onChange={e => setEditDoctor(prev => ({ ...prev, specialization: e.target.value }))}
            error={!!fieldErrors.specialization} helperText={fieldErrors.specialization}>
            <MenuItem value="General Physician">General Physician</MenuItem>
            <MenuItem value="Elder Care">Elder Care</MenuItem>
            <MenuItem value="Nursing Care">Nursing Care</MenuItem>
            <MenuItem value="Physiotherapy">Physiotherapy</MenuItem>
            <MenuItem value="Cardiologist">Cardiologist</MenuItem>
            <MenuItem value="Dermatologist">Dermatologist</MenuItem>
            <MenuItem value="Pediatrician">Pediatrician</MenuItem>
          </TextField>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Experience (years)" type="number" fullWidth value={editDoctor.experienceYears}
              onChange={e => setEditDoctor(prev => ({ ...prev, experienceYears: e.target.value }))}
              error={!!fieldErrors.experienceYears} helperText={fieldErrors.experienceYears} />
            <TextField label="Consultation Fee (₹)" type="number" fullWidth value={editDoctor.consultationFee}
              onChange={e => setEditDoctor(prev => ({ ...prev, consultationFee: e.target.value }))}
              error={!!fieldErrors.consultationFee} helperText={fieldErrors.consultationFee} />
          </Box>
          <TextField label="Coverage Area / Pincode" fullWidth value={editDoctor.coverageArea}
            onChange={e => setEditDoctor(prev => ({ ...prev, coverageArea: e.target.value }))}
            error={!!fieldErrors.coverageArea} helperText={fieldErrors.coverageArea} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button variant="contained" color="info" onClick={handleEditDoctor}>Save Changes</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
