'use client';

import { Box, Typography, Card, CardContent, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemIcon, ListItemText, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { recordsApi } from '@/services/api';
import EmptyState from '@/components/EmptyState';

export default function MedicalRecords() {
  const [recordsGroups, setRecordsGroups] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({ patientId: '', recordType: 'Lab Report', description: '' });
  const [file, setFile] = useState<File | null>(null);

  const fetchRecords = () => {
    setLoading(true);
    recordsApi.getAll().then(res => {
      const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      const grouped = data.reduce((acc: any, record: any) => {
        const pName = record.patient?.fullName || 'Self';
        if (!acc[pName]) acc[pName] = [];
        acc[pName].push({
          id: record.id,
          title: record.recordType || 'Document',
          date: new Date(record.createdDate).toLocaleDateString(),
          type: record.recordType,
          fileUrl: record.fileUrl,
          icon: record.recordType?.includes('Prescription') ? <DescriptionIcon color="primary" /> : <AssessmentIcon color="secondary" />,
        });
        return acc;
      }, {});
      
      const mapped = Object.keys(grouped).map(patient => ({
        patient,
        items: grouped[patient]
      }));
      setRecordsGroups(mapped);
    }).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRecords();
    import('@/services/api').then(({ patientsApi }) => {
      patientsApi.getAll().then(res => setPatients(Array.isArray(res.data) ? res.data : (res.data?.data || [])));
    });
  }, []);

  const handleUpload = async () => {
    if (!file || !formData.patientId) return alert('Please select a patient and a file.');
    setUploading(true);
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('patientId', formData.patientId);
      data.append('recordType', formData.recordType);
      if (formData.description) data.append('description', formData.description);

      await recordsApi.upload(data);
      setUploadOpen(false);
      setFile(null);
      setFormData({ patientId: '', recordType: 'Lab Report', description: '' });
      fetchRecords();
    } catch (err) {
      console.error(err);
      alert('Failed to upload record');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ maxWidth: 800 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Medical Records
        </Typography>
        <Button variant="contained" onClick={() => setUploadOpen(true)} sx={{ borderRadius: 2 }}>
          Upload Record
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Access all prescriptions, test reports, and invoices grouped by patient.
        </Typography>

        {recordsGroups.length === 0 ? (
          <EmptyState 
            title="No Records Found" 
            description="You don't have any medical records uploaded yet." 
            actionText="Upload Record"
            onAction={() => setUploadOpen(true)}
            icon={<DescriptionIcon />}
          />
        ) : (
          recordsGroups.map((group, idx) => (
            <Accordion key={idx} elevation={0} defaultExpanded={idx === 0} sx={{ mb: 2, border: '1px solid', borderColor: 'divider', '&:before': { display: 'none' }, borderRadius: '12px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Patient: {group.patient}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0, px: 0 }}>
                <List disablePadding>
                  {group.items.map((item: any, itemIdx: number) => (
                    <ListItem key={itemIdx} sx={{ px: 3, py: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                      <ListItemIcon>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={<Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{item.title}</Typography>}
                        secondary={item.date} 
                      />
                      <Button size="small" variant="outlined" startIcon={<DownloadIcon />} sx={{ borderRadius: 2, textTransform: 'none' }} href={`http://localhost:3001${item.fileUrl}`} target="_blank">
                        Download
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Box>

      <Dialog open={uploadOpen} onClose={() => setUploadOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Upload Medical Record</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Select Patient</InputLabel>
            <Select value={formData.patientId} label="Select Patient" onChange={e => setFormData({ ...formData, patientId: e.target.value })}>
              {patients.map(p => (
                <MenuItem key={p.id} value={p.id}>{p.fullName} ({p.relationship})</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Record Type</InputLabel>
            <Select value={formData.recordType} label="Record Type" onChange={e => setFormData({ ...formData, recordType: e.target.value })}>
              <MenuItem value="Lab Report">Lab Report</MenuItem>
              <MenuItem value="Prescription">Prescription</MenuItem>
              <MenuItem value="Invoice">Invoice</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField fullWidth label="Description (Optional)" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
          
          <Button variant="outlined" component="label" sx={{ py: 2 }}>
            {file ? file.name : 'Select File'}
            <input type="file" hidden onChange={e => setFile(e.target.files?.[0] || null)} />
          </Button>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={() => setUploadOpen(false)} disabled={uploading}>Cancel</Button>
          <Button onClick={handleUpload} variant="contained" disabled={uploading || !file || !formData.patientId}>
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
