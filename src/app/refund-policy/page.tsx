import { PageHero } from '@/components/ui/PageHero';
import { Box, Container, Typography } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy',
  description: 'InHouse Doctor Refund and Cancellation Policy.',
};

export default function RefundPolicyPage() {
  return (
    <>
      <PageHero
        title="Refund & Cancellation Policy"
        subtitle="Transparent policies for your peace of mind."
      />

      <Box component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
            1. Cancellation by User
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
            You may cancel your booking request at any time prior to the assigned healthcare 
            professional arriving at your location. If you cancel within 2 hours of the scheduled 
            appointment time, a nominal cancellation fee may apply to compensate the medical professional 
            for their reserved time.
          </Typography>

          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
            2. Cancellation by Provider
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
            In rare circumstances (such as extreme weather or medical emergencies), a doctor may need 
            to cancel or reschedule your appointment. In such cases, you will be notified immediately 
            and given the option to rebook with priority or receive a full refund of any advance payments.
          </Typography>

          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
            3. Refund Processing
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
            Any eligible refunds (including QR Code or online payment reversals) will be processed 
            within 5-7 business days to the original method of payment.
          </Typography>
        </Container>
      </Box>
    </>
  );
}
