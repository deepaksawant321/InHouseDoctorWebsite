'use client';

import { Box, Typography, alpha } from '@mui/material';
import Grid from '@mui/material/Grid';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealingIcon from '@mui/icons-material/Healing';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const services = [
  { id: 'general', title: 'General Physician', desc: 'Fever, cold, routine checkups', fee: '₹999', icon: MedicalServicesIcon },
  { id: 'nursing', title: 'Nursing Care', desc: 'Post-surgery, daily care, injections', fee: '₹1499', icon: LocalHospitalIcon },
  { id: 'physio', title: 'Physiotherapy', desc: 'Back pain, sports injury recovery', fee: '₹1299', icon: AccessibilityNewIcon },
  { id: 'elder', title: 'Elder Care', desc: 'Senior citizen health monitoring', fee: '₹1999', icon: HealingIcon },
];

export default function SelectServicePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (selected) {
      router.push('/book/details');
    }
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
        Select a Service
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
        Choose the medical service you need at home.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {services.map((service) => {
          const isSelected = selected === service.id;
          return (
            <Grid size={{ xs: 12, sm: 6 }} key={service.id}>
              <Box
                onClick={() => setSelected(service.id)}
                sx={{
                  p: 3, borderRadius: 4, height: '100%', cursor: 'pointer',
                  bgcolor: isSelected ? alpha('#1976D2', 0.04) : 'background.paper',
                  border: '2px solid',
                  borderColor: isSelected ? 'primary.main' : 'divider',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    borderColor: isSelected ? 'primary.main' : alpha('#1976D2', 0.5)
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box 
                    sx={{ 
                      width: 48, height: 48, borderRadius: 2, 
                      bgcolor: isSelected ? 'primary.main' : alpha('#1976D2', 0.1), 
                      color: isSelected ? 'white' : 'primary.main', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center' 
                    }}
                  >
                    <service.icon />
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', bgcolor: alpha('#1976D2', 0.1), px: 1.5, py: 0.5, borderRadius: 2 }}>
                    {service.fee}
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>{service.title}</Typography>
                <Typography variant="body2" color="text.secondary">{service.desc}</Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Box
          component="button"
          onClick={handleContinue}
          disabled={!selected}
          sx={{
            py: 1.5, px: 6, borderRadius: 3, border: 'none', cursor: selected ? 'pointer' : 'not-allowed',
            background: selected ? 'linear-gradient(135deg, #1976D2, #00BFA5)' : 'action.disabledBackground',
            color: selected ? 'white' : 'text.disabled', 
            fontWeight: 700, fontSize: '1rem',
            boxShadow: selected ? '0 8px 24px rgba(25, 118, 210, 0.3)' : 'none',
            transition: 'all 0.2s',
            '&:hover': { transform: selected ? 'translateY(-2px)' : 'none' },
          }}
        >
          Continue to Details
        </Box>
      </Box>
    </Box>
  );
}
