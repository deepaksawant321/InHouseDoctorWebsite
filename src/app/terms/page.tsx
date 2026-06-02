import { PageHero } from '@/components/ui/PageHero';
import { Box, Container, Typography } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'InHouse Doctor Terms & Conditions.',
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms & Conditions"
        subtitle="Last updated: October 2023"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
            1. Contractual Relationship
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
            These Terms of Use ("Terms") govern the access or use by you, an individual, from within India 
            of applications, websites, content, products, and services (the "Services") made available by 
            InHouse Doctor. PLEASE READ THESE TERMS CAREFULLY BEFORE ACCESSING OR USING THE SERVICES.
          </Typography>

          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
            2. The Services
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
            The Services constitute a technology platform that enables users of InHouse Doctor's mobile 
            applications or websites to arrange and schedule home healthcare services with independent 
            third party providers of such services.
          </Typography>

          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
            3. Medical Emergencies
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
            INHOUSE DOCTOR SERVICES ARE NOT FOR MEDICAL EMERGENCIES. If you are experiencing a medical 
            emergency, please immediately call your local emergency medical services or go to the nearest 
            hospital or emergency room.
          </Typography>
        </Container>
      </Box>
    </>
  );
}
