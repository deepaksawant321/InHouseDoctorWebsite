'use client';

import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { UploadZone } from '@/features/booking/UploadZone';

export default function PrescriptionPage() {
  const router = useRouter();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Upload Prescription
        </Typography>
        <Box sx={{ bgcolor: 'action.hover', px: 1.5, py: 0.5, borderRadius: 2 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>OPTIONAL</Typography>
        </Box>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
        If you have a past prescription or medical report related to this visit, upload it here to help our doctors prepare.
      </Typography>

      <Box sx={{ mb: 8 }}>
        <UploadZone />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box
          component="button" type="button" onClick={() => router.back()}
          sx={{
            py: 1.5, px: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider', cursor: 'pointer',
            bgcolor: 'transparent', color: 'text.primary', fontWeight: 600, fontSize: '1rem',
            transition: 'all 0.2s', '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          Back
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography 
            variant="body2" 
            sx={{ color: 'text.secondary', fontWeight: 600, cursor: 'pointer', '&:hover': { color: 'primary.main', textDecoration: 'underline' } }}
            onClick={() => router.push('/book/payment')}
          >
            Skip for now
          </Typography>
          <Box
            component="button" type="button" onClick={() => router.push('/book/payment')}
            sx={{
              py: 1.5, px: 6, borderRadius: 3, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #1976D2, #00BFA5)', color: 'white', 
              fontWeight: 700, fontSize: '1rem', boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
              transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)' },
            }}
          >
            Continue to Payment
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
