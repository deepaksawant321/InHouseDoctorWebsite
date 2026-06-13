'use client';

import { Box, Typography, Card, CardContent, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemIcon, ListItemText, Button, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { recordsApi } from '@/services/api';

export default function MedicalRecords() {
  const [recordsGroups, setRecordsGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    recordsApi.getAll().then(res => {
      const data = res.data.data || [];
      // Group records by patient name
      const grouped = data.reduce((acc: any, record: any) => {
        const pName = record.patient?.fullName || 'Self';
        if (!acc[pName]) acc[pName] = [];
        acc[pName].push({
          title: record.recordType || 'Document',
          date: new Date(record.createdDate).toLocaleDateString(),
          type: record.recordType,
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
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ maxWidth: 800 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
        Medical Records
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Access all prescriptions, test reports, and invoices grouped by patient.
        </Typography>

        {recordsGroups.length === 0 ? (
          <Typography color="text.secondary">No records found.</Typography>
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
                      <Button size="small" variant="outlined" startIcon={<DownloadIcon />} sx={{ borderRadius: 2, textTransform: 'none' }}>
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
    </Box>
  );
}
