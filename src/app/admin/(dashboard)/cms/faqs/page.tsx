'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Switch, FormControlLabel } from '@mui/material';
import { DataTable } from '@/features/admin/DataTable';
import { StatusBadge, StatusType } from '@/features/admin/StatusBadge';
import AddIcon from '@mui/icons-material/Add';
import { cmsApi } from '@/services/api';

export default function FaqsManagementPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const [addDialog, setAddDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFaq, setCurrentFaq] = useState({ id: 0, question: '', answer: '', isActive: true });

  const fetchFaqs = () => {
    cmsApi.getAllFaqs().then(res => {
      setFaqs(res.data.data || []);
    }).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleToggleStatus = async (row: any) => {
    try {
      await cmsApi.updateFaq(row.id, { ...row, isActive: !row.isActive });
      setSnackbar({ open: true, message: `FAQ status updated`, severity: 'success' });
      fetchFaqs();
    } catch {
      setSnackbar({ open: true, message: 'Failed to update status', severity: 'error' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await cmsApi.deleteFaq(id);
      setSnackbar({ open: true, message: 'FAQ deleted', severity: 'success' });
      fetchFaqs();
    } catch {
      setSnackbar({ open: true, message: 'Failed to delete FAQ', severity: 'error' });
    }
  };

  const handleSaveFaq = async () => {
    try {
      if (isEditing) {
        await cmsApi.updateFaq(currentFaq.id, currentFaq);
        setSnackbar({ open: true, message: 'FAQ updated successfully!', severity: 'success' });
      } else {
        await cmsApi.createFaq(currentFaq);
        setSnackbar({ open: true, message: 'FAQ added successfully!', severity: 'success' });
      }
      setAddDialog(false);
      fetchFaqs();
    } catch (err: any) {
      setSnackbar({ open: true, message: 'Error saving FAQ', severity: 'error' });
    }
  };

  const openEdit = (row: any) => {
    setCurrentFaq({
      id: row.id,
      question: row.question || '',
      answer: row.answer || '',
      isActive: row.isActive
    });
    setIsEditing(true);
    setAddDialog(true);
  };

  const columns = [
    { id: 'id' as const, label: 'ID', minWidth: 60 },
    { id: 'question' as const, label: 'Question', minWidth: 250 },
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
        <Typography variant="h4" sx={{ fontWeight: 800 }}>FAQs Management (CMS)</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => {
          setIsEditing(false);
          setCurrentFaq({ id: 0, question: '', answer: '', isActive: true });
          setAddDialog(true);
        }}>Add FAQ</Button>
      </Box>

      <DataTable columns={columns} rows={faqs} />

      {/* Add/Edit Dialog */}
      <Dialog open={addDialog} onClose={() => setAddDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>{isEditing ? 'Edit FAQ' : 'Add New FAQ'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField label="Question" fullWidth value={currentFaq.question} onChange={e => setCurrentFaq(p => ({ ...p, question: e.target.value }))} />
          <TextField label="Answer" fullWidth multiline rows={4} value={currentFaq.answer} onChange={e => setCurrentFaq(p => ({ ...p, answer: e.target.value }))} />
          <FormControlLabel control={<Switch checked={currentFaq.isActive} onChange={e => setCurrentFaq(p => ({ ...p, isActive: e.target.checked }))} />} label="Is Active" />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setAddDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveFaq}>{isEditing ? 'Save Changes' : 'Add FAQ'}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
