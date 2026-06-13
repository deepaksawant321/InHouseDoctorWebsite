'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Switch, FormControlLabel } from '@mui/material';
import { DataTable } from '@/features/admin/DataTable';
import { StatusBadge, StatusType } from '@/features/admin/StatusBadge';
import AddIcon from '@mui/icons-material/Add';
import { servicesApi } from '@/services/api';

export default function ServicesManagementPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const [addDialog, setAddDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState({ id: 0, serviceName: '', slug: '', description: '', longDescription: '', basePrice: '', imageUrl: '', isActive: true });

  const fetchServices = () => {
    servicesApi.findAll().then(res => {
      setServices(res.data.data || []);
    }).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleToggleStatus = async (id: number) => {
    try {
      await servicesApi.toggleStatus(id);
      setSnackbar({ open: true, message: `Service status updated`, severity: 'success' });
      fetchServices();
    } catch {
      setSnackbar({ open: true, message: 'Failed to update status', severity: 'error' });
    }
  };

  const handleSaveService = async () => {
    try {
      const payload = {
        ...currentService,
        basePrice: Number(currentService.basePrice)
      };

      if (isEditing) {
        await servicesApi.update(currentService.id, payload);
        setSnackbar({ open: true, message: 'Service updated successfully!', severity: 'success' });
      } else {
        await servicesApi.create(payload);
        setSnackbar({ open: true, message: 'Service added successfully!', severity: 'success' });
      }
      setAddDialog(false);
      fetchServices();
    } catch (err: any) {
      setSnackbar({ open: true, message: 'Error saving service', severity: 'error' });
    }
  };

  const openEdit = (row: any) => {
    setCurrentService({
      id: row.id,
      serviceName: row.serviceName || '',
      slug: row.slug || '',
      description: row.description || '',
      longDescription: row.longDescription || '',
      basePrice: row.basePrice || '',
      imageUrl: row.imageUrl || '',
      isActive: row.isActive
    });
    setIsEditing(true);
    setAddDialog(true);
  };

  const columns = [
    { id: 'id' as const, label: 'ID', minWidth: 60 },
    { id: 'serviceName' as const, label: 'Name', minWidth: 150 },
    { id: 'slug' as const, label: 'Slug', minWidth: 120 },
    { id: 'basePrice' as const, label: 'Base Price', minWidth: 100, format: (v: number) => `₹${v}` },
    { id: 'isActive' as const, label: 'Status', minWidth: 100, format: (v: boolean) => <StatusBadge status={v ? 'Active' : 'Inactive'} /> },
    {
      id: 'actions' as const, label: 'Actions', minWidth: 200, align: 'center' as const,
      format: (_: any, row: any) => (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          <Button variant="outlined" size="small" sx={{ borderRadius: 2 }} onClick={() => openEdit(row)}>
            Edit
          </Button>
          <Button variant="outlined" size="small" color={row.isActive ? 'error' : 'success'} sx={{ borderRadius: 2 }} onClick={() => handleToggleStatus(row.id)}>
            {row.isActive ? 'Deactivate' : 'Activate'}
          </Button>
        </Box>
      )
    },
  ];

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Services Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => {
          setIsEditing(false);
          setCurrentService({ id: 0, serviceName: '', slug: '', description: '', longDescription: '', basePrice: '', imageUrl: '', isActive: true });
          setAddDialog(true);
        }}>Add Service</Button>
      </Box>

      <DataTable columns={columns} rows={services} />

      {/* Add/Edit Dialog */}
      <Dialog open={addDialog} onClose={() => setAddDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>{isEditing ? 'Edit Service' : 'Add New Service'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Service Name" fullWidth value={currentService.serviceName} onChange={e => setCurrentService(p => ({ ...p, serviceName: e.target.value }))} />
            <TextField label="Slug (URL Path)" fullWidth value={currentService.slug} onChange={e => setCurrentService(p => ({ ...p, slug: e.target.value }))} placeholder="e.g. nursing-care" />
          </Box>
          <TextField label="Short Description (Homepage)" fullWidth multiline rows={2} value={currentService.description} onChange={e => setCurrentService(p => ({ ...p, description: e.target.value }))} />
          <TextField label="Long Description (Details Page)" fullWidth multiline rows={4} value={currentService.longDescription} onChange={e => setCurrentService(p => ({ ...p, longDescription: e.target.value }))} />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Base Price (₹)" type="number" fullWidth value={currentService.basePrice} onChange={e => setCurrentService(p => ({ ...p, basePrice: e.target.value }))} />
            <TextField label="Image URL (Optional)" fullWidth value={currentService.imageUrl} onChange={e => setCurrentService(p => ({ ...p, imageUrl: e.target.value }))} />
          </Box>
          <FormControlLabel control={<Switch checked={currentService.isActive} onChange={e => setCurrentService(p => ({ ...p, isActive: e.target.checked }))} />} label="Is Active" />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setAddDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveService}>{isEditing ? 'Save Changes' : 'Add Service'}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
