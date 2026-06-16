'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Switch, FormControlLabel } from '@mui/material';
import { DataTable } from '@/features/admin/DataTable';
import { StatusBadge } from '@/features/admin/StatusBadge';
import AddIcon from '@mui/icons-material/Add';
import { staticPagesApi } from '@/services/api';

export default function PagesManagementPage() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const [addDialog, setAddDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState({ id: 0, title: '', slug: '', htmlContent: '', seoTitle: '', seoDescription: '', isPublished: true });

  const fetchPages = () => {
    staticPagesApi.getAll().then(res => {
      setPages(res.data.data || []);
    }).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleToggleStatus = async (row: any) => {
    try {
      await staticPagesApi.update(row.id, { ...row, isPublished: !row.isPublished });
      setSnackbar({ open: true, message: `Page status updated`, severity: 'success' });
      fetchPages();
    } catch {
      setSnackbar({ open: true, message: 'Failed to update status', severity: 'error' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this page?')) return;
    try {
      await staticPagesApi.delete(id);
      setSnackbar({ open: true, message: 'Page deleted', severity: 'success' });
      fetchPages();
    } catch {
      setSnackbar({ open: true, message: 'Failed to delete Page', severity: 'error' });
    }
  };

  const handleSavePage = async () => {
    try {
      if (isEditing) {
        await staticPagesApi.update(currentPage.id, currentPage);
        setSnackbar({ open: true, message: 'Page updated successfully!', severity: 'success' });
      } else {
        await staticPagesApi.create(currentPage);
        setSnackbar({ open: true, message: 'Page added successfully!', severity: 'success' });
      }
      setAddDialog(false);
      fetchPages();
    } catch (err: any) {
      setSnackbar({ open: true, message: 'Error saving Page', severity: 'error' });
    }
  };

  const openEdit = (row: any) => {
    setCurrentPage({
      id: row.id,
      title: row.title || '',
      slug: row.slug || '',
      htmlContent: row.htmlContent || '',
      seoTitle: row.seoTitle || '',
      seoDescription: row.seoDescription || '',
      isPublished: row.isPublished
    });
    setIsEditing(true);
    setAddDialog(true);
  };

  const columns = [
    { id: 'id' as const, label: 'ID', minWidth: 60 },
    { id: 'title' as const, label: 'Title', minWidth: 200 },
    { id: 'slug' as const, label: 'Slug', minWidth: 150 },
    { id: 'isPublished' as const, label: 'Status', minWidth: 100, format: (v: boolean) => <StatusBadge status={v ? 'Active' : 'Inactive'} /> },
    {
      id: 'actions' as const, label: 'Actions', minWidth: 200, align: 'center' as const,
      format: (_: any, row: any) => (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          <Button variant="outlined" size="small" sx={{ borderRadius: 2 }} onClick={() => openEdit(row)}>
            Edit
          </Button>
          <Button variant="outlined" size="small" color={row.isPublished ? 'warning' : 'success'} sx={{ borderRadius: 2 }} onClick={() => handleToggleStatus(row)}>
            {row.isPublished ? 'Unpublish' : 'Publish'}
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
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Pages Management (CMS)</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => {
          setIsEditing(false);
          setCurrentPage({ id: 0, title: '', slug: '', htmlContent: '', seoTitle: '', seoDescription: '', isPublished: true });
          setAddDialog(true);
        }}>Add Page</Button>
      </Box>

      <DataTable columns={columns} rows={pages} />

      {/* Add/Edit Dialog */}
      <Dialog open={addDialog} onClose={() => setAddDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>{isEditing ? 'Edit Page' : 'Add New Page'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Page Title" fullWidth value={currentPage.title} onChange={e => setCurrentPage(p => ({ ...p, title: e.target.value }))} />
            <TextField label="URL Slug" fullWidth value={currentPage.slug} onChange={e => setCurrentPage(p => ({ ...p, slug: e.target.value }))} />
          </Box>
          
          <TextField label="HTML Content" fullWidth multiline rows={10} value={currentPage.htmlContent} onChange={e => setCurrentPage(p => ({ ...p, htmlContent: e.target.value }))} />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="SEO Title" fullWidth value={currentPage.seoTitle} onChange={e => setCurrentPage(p => ({ ...p, seoTitle: e.target.value }))} />
            <TextField label="SEO Description" fullWidth value={currentPage.seoDescription} onChange={e => setCurrentPage(p => ({ ...p, seoDescription: e.target.value }))} />
          </Box>

          <FormControlLabel control={<Switch checked={currentPage.isPublished} onChange={e => setCurrentPage(p => ({ ...p, isPublished: e.target.checked }))} />} label="Is Published" />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setAddDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSavePage}>{isEditing ? 'Save Changes' : 'Add Page'}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
