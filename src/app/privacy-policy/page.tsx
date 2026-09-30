import { PageHero } from '@/components/ui/PageHero';
import { Box, Container, Typography } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'InHouse Doctor Privacy Policy. Learn how we handle and protect your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        subtitle="Last updated: October 2023"
      />

      <Box component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
            1. Information We Collect
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
            We collect information you provide directly to us, such as when you create or modify your account, 
            request on-demand medical services, contact customer support, or otherwise communicate with us. 
            This information may include: name, email, phone number, postal address, profile picture, payment method, 
            and other personal medical information you choose to provide.
          </Typography>

          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
            2. How We Use Your Information
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
            We use the information we collect about you to provide, maintain, and improve our services, 
            including to facilitate medical appointments, process payments, send receipts, provide customer support, 
            and develop new safety features.
          </Typography>

          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
            3. Sharing of Information
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
            We may share the information we collect about you as described in this Statement or as described 
            at the time of collection or sharing, including sharing with the healthcare professionals who will 
            be providing your medical care.
          </Typography>
        </Container>
      </Box>
    </>
  );
}
