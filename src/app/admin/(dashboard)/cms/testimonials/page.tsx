'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Switch, FormControlLabel } from '@mui/material';
import { DataTable } from '@/features/admin/DataTable';
import { StatusBadge, StatusType } from '@/features/admin/StatusBadge';
import AddIcon from '@mui/icons-material/Add';
import { cmsApi } from '@/services/api';

export default function TestimonialsManagementPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const [addDialog, setAddDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState({ id: 0, name: '', role: '', quote: '', rating: 5, isActive: true });

  const fetchTestimonials = () => {
    cmsApi.getAllTestimonials().then(res => {
      setTestimonials(res.data.data || []);
    }).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleToggleStatus = async (row: any) => {
    try {
      await cmsApi.updateTestimonial(row.id, { ...row, isActive: !row.isActive });
      setSnackbar({ open: true, message: `Testimonial status updated`, severity: 'success' });
      fetchTestimonials();
    } catch {
      setSnackbar({ open: true, message: 'Failed to update status', severity: 'error' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await cmsApi.deleteTestimonial(id);
      setSnackbar({ open: true, message: 'Testimonial deleted', severity: 'success' });
      fetchTestimonials();
    } catch {
      setSnackbar({ open: true, message: 'Failed to delete testimonial', severity: 'error' });
    }
  };

  const handleSaveTestimonial = async () => {
    try {
      const payload = {
        ...currentTestimonial,
        rating: Number(currentTestimonial.rating)
      };

      if (isEditing) {
        await cmsApi.updateTestimonial(currentTestimonial.id, payload);
        setSnackbar({ open: true, message: 'Testimonial updated successfully!', severity: 'success' });
      } else {
        await cmsApi.createTestimonial(payload);
        setSnackbar({ open: true, message: 'Testimonial added successfully!', severity: 'success' });
      }
      setAddDialog(false);
      fetchTestimonials();
    } catch (err: any) {
      setSnackbar({ open: true, message: 'Error saving testimonial', severity: 'error' });
    }
  };

  const openEdit = (row: any) => {
    setCurrentTestimonial({
      id: row.id,
      name: row.name || '',
      role: row.role || '',
      quote: row.quote || '',
      rating: row.rating || 5,
      isActive: row.isActive
    });
    setIsEditing(true);
    setAddDialog(true);
  };

  const columns = [
    { id: 'id' as const, label: 'ID', minWidth: 60 },
    { id: 'name' as const, label: 'Name', minWidth: 150 },
    { id: 'role' as const, label: 'Role', minWidth: 150 },
    { id: 'rating' as const, label: 'Rating', minWidth: 80, format: (v: number) => `${v}/5` },
    { id: 'isActive' as const, label: 'Status', minWidth: 100, format: (v: boolean) => <StatusBadge status={v ? 'Active' : 'Inactive'} /> },
    {
      id: 'actions' as const, label: 'Actions', minWidth: 200, align: 'center' as const,
      format: (_: any, row: any) => (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          <Button variant="outlined" size="small" sx={{ borderRadius: 2 }} onClick={() => openEdit(row)}>
            Edit
          </Button>
          <Button variant="outlined" size="small" color={row.isActive ? 'warning' : 'success'} sx={{ borderRadius: 2 }} onClick={() => handleToggleStatus(row)}>
            {row.isActive ? 'Hide' : 'Show'}
          </Button>
          <Button variant="outlined" size="small" color="error" sx={{ borderRadius: 2 }} onClick={() => handleDelete(row.id)}>
            Delete
          </Button>
        </Box>
      )
    },
  ];

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Testimonials Management (CMS)</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => {
          setIsEditing(false);
          setCurrentTestimonial({ id: 0, name: '', role: '', quote: '', rating: 5, isActive: true });
          setAddDialog(true);
        }}>Add Testimonial</Button>
      </Box>

      <DataTable columns={columns} rows={testimonials} />

      {/* Add/Edit Dialog */}
      <Dialog open={addDialog} onClose={() => setAddDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>{isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Reviewer Name" fullWidth value={currentTestimonial.name} onChange={e => setCurrentTestimonial(p => ({ ...p, name: e.target.value }))} />
            <TextField label="Role / Title" fullWidth value={currentTestimonial.role} onChange={e => setCurrentTestimonial(p => ({ ...p, role: e.target.value }))} placeholder="e.g. Recovering Patient" />
          </Box>
          <TextField label="Quote / Feedback" fullWidth multiline rows={4} value={currentTestimonial.quote} onChange={e => setCurrentTestimonial(p => ({ ...p, quote: e.target.value }))} />
          <TextField label="Rating (1-5)" type="number" fullWidth value={currentTestimonial.rating} onChange={e => setCurrentTestimonial(p => ({ ...p, rating: Number(e.target.value) }))} />
          <FormControlLabel control={<Switch checked={currentTestimonial.isActive} onChange={e => setCurrentTestimonial(p => ({ ...p, isActive: e.target.checked }))} />} label="Is Active" />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setAddDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveTestimonial}>{isEditing ? 'Save Changes' : 'Add Testimonial'}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
