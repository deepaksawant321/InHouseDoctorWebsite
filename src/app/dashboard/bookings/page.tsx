'use client';

import { Box, Typography, Tabs, Tab, Card, CardContent, Chip, Button, Stack, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import { bookingsApi, servicesApi } from '@/services/api';
import { useRouter } from 'next/navigation';
import EmptyState from '@/components/EmptyState';
import { openPrivateFile } from '@/utils/files';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function MyBookings() {
  const [tab, setTab] = useState(0);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);
  const [files, setFiles] = useState<any[] | null>(null);

  const router = useRouter();

  useEffect(() => {
    Promise.all([
      bookingsApi.getMyBookings(),
      servicesApi.findAllActive().catch(() => null),
    ]).then(([res, servicesRes]) => {
      const serviceNames = new Map<string, string>(
        (servicesRes?.data?.data || []).map((svc: any) => [String(svc.id), svc.serviceName]),
      );
      // Map backend booking format to the UI format
      const mapped = (res.data.data || []).map((b: any) => ({
        rawId: String(b.id),
        paymentStatus: b.paymentStatus,
        id: b.bookingNo || `#${String(b.id).slice(0, 6)}`,
        service: serviceNames.get(String(b.serviceId)) || 'Home healthcare visit',
        patient: b.patient?.fullName || 'Self',
        // PreferredDate is a date-only column, so format it in UTC to avoid shifting the day
        date: new Date(b.scheduledDate).toLocaleDateString('en-IN', { timeZone: 'UTC', dateStyle: 'medium' }) + (b.preferredTime ? `, ${b.preferredTime}` : ''),
        status: b.status,
      }));
      setBookings(mapped);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const openDetails = (booking: any) => {
    setSelected(booking);
    setFiles(null);
    bookingsApi.getPrescriptions(booking.rawId)
      .then((res) => setFiles(res.data.data || []))
      .catch(() => setFiles([]));
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
        My Bookings
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)} aria-label="booking tabs">
          <Tab label="Upcoming" sx={{ textTransform: 'none', fontWeight: 600, fontSize: '1rem' }} />
          <Tab label="Completed" sx={{ textTransform: 'none', fontWeight: 600, fontSize: '1rem' }} />
          <Tab label="Cancelled" sx={{ textTransform: 'none', fontWeight: 600, fontSize: '1rem' }} />
        </Tabs>
      </Box>

      {[0, 1, 2].map((tabIndex) => {
        const statuses = [
          ['Created', 'Pending', 'Confirmed', 'DoctorAssigned', 'PaymentPending', 'PaymentVerified', 'DoctorConfirmed', 'VisitStarted'], 
          ['Completed', 'VisitCompleted'], 
          ['Cancelled']
        ];
        const filtered = bookings.filter((b) => statuses[tabIndex].includes(b.status));

        return (
          <CustomTabPanel value={tab} index={tabIndex} key={tabIndex}>
            {filtered.length === 0 ? (
              <EmptyState
                title="No Bookings Found"
                description={`You don't have any ${statuses[tabIndex].join(' or ').toLowerCase()} bookings.`}
                actionText={tabIndex === 0 ? "Book a Service" : undefined}
                actionHref={tabIndex === 0 ? "/book/service" : undefined}
              />
            ) : (
              <Stack spacing={2}>
                {filtered.map((booking) => (
                  <Card key={booking.id} elevation={0} sx={{ borderRadius: '16px', border: '1px solid', borderColor: 'divider' }}>
                    <CardContent sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>{booking.service}</Typography>
                          <Chip
                            label={booking.status}
                            size="small"
                            color={booking.status === 'Upcoming' ? 'primary' : booking.status === 'Completed' ? 'success' : 'error'}
                            sx={{ fontWeight: 600 }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Patient: <strong>{booking.patient}</strong> • ID: {booking.id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Scheduled: {booking.date}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button onClick={() => openDetails(booking)} variant="outlined" size="small" sx={{ borderRadius: 2, textTransform: 'none' }}>
                          View Details
                        </Button>
                        {booking.status === 'Cancelled' && (
                          <Button onClick={() => router.push('/book/service')} variant="contained" size="small" sx={{ borderRadius: 2, textTransform: 'none' }}>
                            Rebook
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            )}
          </CustomTabPanel>
        );
      })}
      <Dialog open={!!selected} onClose={() => setSelected(null)} fullWidth maxWidth="sm" aria-labelledby="booking-details-title">
        <DialogTitle id="booking-details-title">Booking {selected?.id}</DialogTitle>
        <DialogContent dividers>
          {selected && (
            <Stack spacing={1.5}>
              <Typography variant="body2"><strong>Service:</strong> {selected.service}</Typography>
              <Typography variant="body2"><strong>Patient:</strong> {selected.patient}</Typography>
              <Typography variant="body2"><strong>Scheduled:</strong> {selected.date}</Typography>
              <Typography variant="body2"><strong>Status:</strong> {selected.status}</Typography>
              <Typography variant="body2"><strong>Payment:</strong> {selected.paymentStatus || 'Not paid'}</Typography>
              <Divider />
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Documents you uploaded</Typography>
              {files === null ? (
                <CircularProgress size={20} />
              ) : files.length === 0 ? (
                <Typography variant="body2" color="text.secondary">No documents were uploaded for this booking.</Typography>
              ) : (
                files.map((f) => (
                  <Box key={f.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                    <Typography variant="body2" noWrap sx={{ minWidth: 0 }}>{f.fileName}</Typography>
                    <Button size="small" variant="outlined" onClick={() => openPrivateFile(f.filePath)}>View</Button>
                  </Box>
                ))
              )}
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelected(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
