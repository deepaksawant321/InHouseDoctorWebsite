'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Box, Typography, Button, Divider, CircularProgress, alpha, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { StatusBadge, StatusType } from '@/features/admin/StatusBadge';
import { adminApi } from '@/services/api';
import { formatDoctorName } from '@/utils/doctorName';
import { openPrivateFile } from '@/utils/files';

interface BookingDetail {
  id: string;
  bookingNo: string;
  status: string;
  symptoms?: string | null;
  scheduledDate?: string | null;
  preferredTime?: string | null;
  patient?: { fullName?: string; mobileNo?: string } | null;
  user?: { fullName?: string; email?: string; phoneNumber?: string } | null;
  doctor?: { id: string; name?: string; specialization?: string; experienceYears?: number; phoneNumber?: string } | null;
  address?: { addressLine1?: string; addressLine2?: string; area?: string; city?: string; state?: string; pincode?: string; landmark?: string } | null;
  service?: { serviceName?: string } | null;
  payment?: { amount?: number | string; status?: string; transactionId?: string; screenshotPath?: string } | null;
}

export default function BookingDetailsPage() {
  const router = useRouter();
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApi.getBookingById(id)
      .then((res) => setBooking(res.data.data))
      .catch((err) => setError(err.response?.status === 404 ? 'Booking not found.' : 'Could not load this booking.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  if (error || !booking) {
    return (
      <Box sx={{ py: 6 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()} color="inherit">Back</Button>
        <Typography role="alert" color="error" sx={{ mt: 3 }}>{error || 'Booking not found.'}</Typography>
      </Box>
    );
  }

  const addr = booking.address;
  const addressLines = addr
    ? [
        [addr.addressLine1, addr.addressLine2, addr.landmark].filter(Boolean).join(', '),
        [addr.area, addr.city, addr.state].filter(Boolean).join(', ') + (addr.pincode ? ` - ${addr.pincode}` : ''),
      ].filter((l) => l.trim())
    : [];
  const doc = booking.doctor;
  const pay = booking.payment;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()} color="inherit">Back</Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>Booking {booking.bookingNo || `#${booking.id}`}</Typography>
        <StatusBadge status={booking.status as StatusType} />
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ p: 4, borderRadius: '24px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Patient Information</Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="body2" color="text.secondary">Full Name</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{booking.patient?.fullName || '—'}</Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="body2" color="text.secondary">Mobile</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{booking.patient?.mobileNo || booking.user?.phoneNumber || '—'}</Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="body2" color="text.secondary">Booked by (email)</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, wordBreak: 'break-word' }}>{booking.user?.email || '—'}</Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="body2" color="text.secondary">Service</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{booking.service?.serviceName || '—'}</Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="body2" color="text.secondary">Scheduled</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {booking.scheduledDate
                    ? new Date(booking.scheduledDate).toLocaleDateString('en-IN', { timeZone: 'UTC', dateStyle: 'medium' })
                    : '—'}
                  {booking.preferredTime ? ` · ${booking.preferredTime}` : ''}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="body2" color="text.secondary">Symptoms</Typography>
                <Typography variant="body1">{booking.symptoms || 'No symptoms noted'}</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Visit Address</Typography>
            {addressLines.length ? (
              <Typography variant="body1">
                {addressLines.map((line, i) => (
                  <span key={i}>{line}{i < addressLines.length - 1 && <br />}</span>
                ))}
              </Typography>
            ) : (
              <Typography color="text.secondary">No address on file</Typography>
            )}
          </Box>

          <Box sx={{ p: 4, borderRadius: '24px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Doctor Assignment</Typography>
              <StatusBadge status={(doc ? 'Assigned' : 'Unassigned') as StatusType} />
            </Box>
            {doc ? (
              <Box sx={{ p: 3, borderRadius: '16px', bgcolor: alpha(theme.palette.primary.main, 0.05), border: '1px solid', borderColor: 'primary.main' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main' }}>{formatDoctorName(doc.name)}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {[doc.specialization, doc.experienceYears != null ? `${doc.experienceYears} Years Experience` : null].filter(Boolean).join(' • ')}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {doc.phoneNumber && <Button variant="contained" size="small" component="a" href={`tel:${doc.phoneNumber}`}>Contact Doctor</Button>}
                  <Button variant="outlined" size="small" color="error" component={Link} href="/admin/assignments">Re-assign</Button>
                </Box>
              </Box>
            ) : (
              <Box>
                <Typography color="text.secondary" sx={{ mb: 2 }}>No doctor assigned yet.</Typography>
                <Button variant="contained" size="small" component={Link} href="/admin/assignments">Assign a doctor</Button>
              </Box>
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ p: 4, borderRadius: '24px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Payment</Typography>
              {pay?.status && <StatusBadge status={pay.status as StatusType} />}
            </Box>
            {pay ? (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Reference</Typography>
                  <Typography variant="subtitle2" sx={{ wordBreak: 'break-all', textAlign: 'right' }}>{pay.transactionId || '—'}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Amount</Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: pay.status === 'Success' ? 'success.main' : 'text.primary' }}>₹{Number(pay.amount ?? 0)}</Typography>
                </Box>
                {pay.screenshotPath ? (
                  <Button fullWidth variant="outlined" onClick={() => openPrivateFile(pay.screenshotPath as string)}>View Screenshot</Button>
                ) : (
                  <Typography variant="body2" color="text.secondary">No payment screenshot uploaded.</Typography>
                )}
              </>
            ) : (
              <Typography color="text.secondary">No payment recorded for this booking.</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
