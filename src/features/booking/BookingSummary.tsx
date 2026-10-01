'use client';

import { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import { useBooking } from '@/providers/BookingProvider';
import { addressesApi } from '@/services/api';
import { formatDate } from '@/utils/date';

const Row = ({ label, value, icon }: { label: string; value?: string; icon: React.ReactNode }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
    <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 0.75, '& svg': { fontSize: 18 } }}>{icon}{label}</Typography>
    <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'right', color: value ? 'text.primary' : 'text.disabled' }}>
      {value || '—'}
    </Typography>
  </Box>
);

/** Live "Your booking" recap. Reads the wizard state, so it updates as the user moves through the steps. */
export const BookingSummary = ({ collapsible = false }: { collapsible?: boolean }) => {
  const { state } = useBooking();
  // Keyed by id so a stale address is never shown after the user picks a different one.
  const [address, setAddress] = useState<{ id: string; text: string } | null>(null);
  const addressText = address && address.id === state.addressId ? address.text : '';

  useEffect(() => {
    const id = state.addressId;
    if (!id) return;
    let cancelled = false;
    addressesApi.getById(id)
      .then((res) => {
        const a = res.data.data ?? res.data;
        if (!cancelled) setAddress({ id, text: [a.addressLine1, a.area, a.city].filter(Boolean).join(', ') });
      })
      .catch(() => { /* summary just shows the placeholder */ });
    return () => { cancelled = true; };
  }, [state.addressId]);

  const when = state.scheduledDate
    ? `${formatDate(state.scheduledDate)}${state.preferredTime ? `, ${state.preferredTime}` : ''}`
    : '';
  const total = state.serviceId ? `₹${state.amount}` : '';

  const body = (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Row icon={<MedicalServicesIcon />} label="Service" value={state.serviceName} />
      <Row icon={<PersonIcon />} label="Patient" value={state.patientName} />
      <Row icon={<LocationOnIcon />} label="Address" value={addressText} />
      <Row icon={<EventIcon />} label="When" value={when} />
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Total</Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'primary.main' }}>{total || '—'}</Typography>
      </Box>
    </Box>
  );

  if (collapsible) {
    return (
      <Accordion disableGutters elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '16px !important', '&::before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="booking-summary-body" id="booking-summary-header">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', pr: 1, alignItems: 'center' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Your booking</Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'primary.main' }}>{total || 'No service yet'}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails id="booking-summary-body">{body}</AccordionDetails>
      </Accordion>
    );
  }

  return (
    <Box sx={{ p: 3, borderRadius: '24px', border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Your booking</Typography>
      {body}
    </Box>
  );
};
