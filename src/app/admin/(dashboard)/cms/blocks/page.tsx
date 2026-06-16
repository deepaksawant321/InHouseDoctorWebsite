'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Switch, FormControlLabel, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { DataTable } from '@/features/admin/DataTable';
import { StatusBadge } from '@/features/admin/StatusBadge';
import AddIcon from '@mui/icons-material/Add';
import { cmsBlocksApi } from '@/services/api';

export default function BlocksManagementPage() {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const [addDialog, setAddDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlock, setCurrentBlock] = useState({ id: 0, title: '', blockType: 'Section', content: '', imageUrl: '', callToActionText: '', callToActionLink: '', sortOrder: 0, isActive: true });

  const fetchBlocks = () => {
    cmsBlocksApi.getAll().then(res => {
      setBlocks(res.data.data || []);
    }).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBlocks();
  }, []);

  const handleToggleStatus = async (row: any) => {
    try {
      await cmsBlocksApi.update(row.id, { ...row, isActive: !row.isActive });
      setSnackbar({ open: true, message: `Block status updated`, severity: 'success' });
      fetchBlocks();
    } catch {
      setSnackbar({ open: true, message: 'Failed to update status', severity: 'error' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this block?')) return;
    try {
      await cmsBlocksApi.delete(id);
      setSnackbar({ open: true, message: 'Block deleted', severity: 'success' });
      fetchBlocks();
    } catch {
      setSnackbar({ open: true, message: 'Failed to delete Block', severity: 'error' });
    }
  };

  const handleSaveBlock = async () => {
    try {
      if (isEditing) {
        await cmsBlocksApi.update(currentBlock.id, currentBlock);
        setSnackbar({ open: true, message: 'Block updated successfully!', severity: 'success' });
      } else {
        await cmsBlocksApi.create(currentBlock);
        setSnackbar({ open: true, message: 'Block added successfully!', severity: 'success' });
      }
      setAddDialog(false);
      fetchBlocks();
    } catch (err: any) {
      setSnackbar({ open: true, message: 'Error saving Block', severity: 'error' });
    }
  };

  const openEdit = (row: any) => {
    setCurrentBlock({
      id: row.id,
      title: row.title || '',
      blockType: row.blockType || 'Section',
      content: row.content || '',
      imageUrl: row.imageUrl || '',
      callToActionText: row.callToActionText || '',
      callToActionLink: row.callToActionLink || '',
      sortOrder: row.sortOrder || 0,
      isActive: row.isActive
    });
    setIsEditing(true);
    setAddDialog(true);
  };

  const columns = [
    { id: 'id' as const, label: 'ID', minWidth: 60 },
    { id: 'title' as const, label: 'Title', minWidth: 200 },
    { id: 'blockType' as const, label: 'Type', minWidth: 100 },
    { id: 'sortOrder' as const, label: 'Order', minWidth: 80 },
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
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Blocks Management (CMS)</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => {
          setIsEditing(false);
          setCurrentBlock({ id: 0, title: '', blockType: 'Section', content: '', imageUrl: '', callToActionText: '', callToActionLink: '', sortOrder: 0, isActive: true });
          setAddDialog(true);
        }}>Add Block</Button>
      </Box>

      <DataTable columns={columns} rows={blocks} />

      {/* Add/Edit Dialog */}
      <Dialog open={addDialog} onClose={() => setAddDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>{isEditing ? 'Edit Block' : 'Add New Block'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField label="Title" fullWidth value={currentBlock.title} onChange={e => setCurrentBlock(p => ({ ...p, title: e.target.value }))} />
          
          <FormControl fullWidth>
            <InputLabel>Block Type</InputLabel>
            <Select value={currentBlock.blockType} label="Block Type" onChange={e => setCurrentBlock(p => ({ ...p, blockType: e.target.value }))}>
              <MenuItem value="Hero">Hero</MenuItem>
              <MenuItem value="Section">Section</MenuItem>
              <MenuItem value="Banner">Banner</MenuItem>
            </Select>
          </FormControl>

          <TextField label="Content (HTML allowed)" fullWidth multiline rows={4} value={currentBlock.content} onChange={e => setCurrentBlock(p => ({ ...p, content: e.target.value }))} />
          <TextField label="Image URL" fullWidth value={currentBlock.imageUrl} onChange={e => setCurrentBlock(p => ({ ...p, imageUrl: e.target.value }))} />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="CTA Text" fullWidth value={currentBlock.callToActionText} onChange={e => setCurrentBlock(p => ({ ...p, callToActionText: e.target.value }))} />
            <TextField label="CTA Link" fullWidth value={currentBlock.callToActionLink} onChange={e => setCurrentBlock(p => ({ ...p, callToActionLink: e.target.value }))} />
          </Box>
          
          <TextField label="Sort Order" type="number" fullWidth value={currentBlock.sortOrder} onChange={e => setCurrentBlock(p => ({ ...p, sortOrder: Number(e.target.value) }))} />

          <FormControlLabel control={<Switch checked={currentBlock.isActive} onChange={e => setCurrentBlock(p => ({ ...p, isActive: e.target.checked }))} />} label="Is Active" />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setAddDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveBlock}>{isEditing ? 'Save Changes' : 'Add Block'}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
