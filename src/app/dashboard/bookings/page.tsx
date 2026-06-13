'use client';

import { Box, Typography, Tabs, Tab, Card, CardContent, Chip, Button, Stack, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { bookingsApi } from '@/services/api';
import { useRouter } from 'next/navigation';

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

  const router = useRouter();

  useEffect(() => {
    bookingsApi.getMyBookings().then(res => {
      // Map backend booking format to the UI format
      const mapped = (res.data.data || []).map((b: any) => ({
        id: b.bookingNo || `#${b.id.slice(0,6)}`,
        service: b.symptoms || 'General Consultation',
        patient: b.patient?.fullName || 'Self',
        date: new Date(b.scheduledDate).toLocaleDateString() + (b.preferredTime ? `, ${b.preferredTime}` : ''),
        status: b.status,
      }));
      setBookings(mapped);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

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
        const statuses = [['Pending', 'Confirmed'], ['Completed'], ['Cancelled']];
        const filtered = bookings.filter((b) => statuses[tabIndex].includes(b.status));

        return (
          <CustomTabPanel value={tab} index={tabIndex} key={tabIndex}>
            {filtered.length === 0 ? (
              <Box sx={{ py: 8, textAlign: 'center' }}>
                <Typography color="text.secondary">No bookings found in this category.</Typography>
              </Box>
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
                        <Button onClick={() => alert('View Details coming soon!')} variant="outlined" size="small" sx={{ borderRadius: 2, textTransform: 'none' }}>
                          View Details
                        </Button>
                        {booking.status === 'Completed' && (
                          <Button onClick={() => alert('Prescription download coming soon!')} variant="text" size="small" startIcon={<ReceiptIcon />} sx={{ borderRadius: 2, textTransform: 'none' }}>
                            Prescription
                          </Button>
                        )}
                        {booking.status === 'Cancelled' && (
                          <Button onClick={() => router.push('/book/patient')} variant="contained" size="small" sx={{ borderRadius: 2, textTransform: 'none' }}>
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
    </Box>
  );
}
