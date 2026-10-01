'use client';

import { Box, Container, Typography, LinearProgress, useTheme } from '@mui/material';
import Link from 'next/link';
import CheckIcon from '@mui/icons-material/Check';
import { usePathname } from 'next/navigation';

const steps = [
  { path: '/book/service', label: 'Service' },
  { path: '/book/patient', label: 'Patient' },
  { path: '/book/address', label: 'Address' },
  { path: '/book/schedule', label: 'Schedule' },
  { path: '/book/prescription', label: 'Prescription' },
  { path: '/book/payment', label: 'Payment' },
  { path: '/booking-success', label: 'Success' },
];

export const BookingStepper = () => {
  const pathname = usePathname();
  const theme = useTheme();
  
  const currentIndex = steps.findIndex(s => pathname === s.path);
  if (currentIndex === -1) return null;
  const onSuccessPage = pathname === '/booking-success';

  const currentStep = currentIndex + 1;
  const totalSteps = steps.length;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <Box sx={{ width: '100%', borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', pt: 11, pb: 1.5 }}>
      <Container maxWidth="lg">
        {/* Mobile View: Step X of Y */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, textAlign: 'center', mb: 2 }}>
          <Typography variant="subtitle2" color="primary.main" sx={{ fontWeight: 700, mb: 1 }}>
            Step {currentStep} of {totalSteps}
          </Typography>
          <Typography component="p" variant="subtitle1" sx={{ fontSize: '1.05rem', fontWeight: 700 }}>
            {steps[currentIndex].label}
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ mt: 2, height: 6, borderRadius: '16px', bgcolor: 'action.hover' }}
          />
        </Box>

        {/* Desktop View: Full Progress Bar */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <Box sx={{ position: 'absolute', top: '19px', left: 0, right: 0, height: 2, bgcolor: 'divider', zIndex: 0 }} />
          <Box 
            sx={{ 
              position: 'absolute', top: '19px', left: 0, height: 2, 
              bgcolor: 'primary.main', zIndex: 1, 
              width: `${(currentIndex / (totalSteps - 1)) * 100}%`,
              transition: 'width 0.4s ease'
            }} 
          />
          
          {steps.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isActive = index === currentIndex;
            // Earlier steps can be revisited to change a choice. Not after the booking is done (its state is cleared).
            const canGoBack = isCompleted && !onSuccessPage;
            const linkProps = canGoBack
              ? {
                  component: Link,
                  href: step.path,
                  'aria-label': `Go back to ${step.label}`,
                  sx: {
                    textDecoration: 'none', cursor: 'pointer', borderRadius: 2, px: 1,
                    '&:hover .step-circle': { boxShadow: `0 0 0 4px ${theme.palette.primary.main}33` },
                    '&:focus-visible': { outline: '3px solid', outlineColor: 'primary.main', outlineOffset: 2 },
                  },
                }
              : {};

            return (
              <Box key={step.path} {...linkProps} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, ...linkProps.sx }}>
                <Box
                  className="step-circle"
                  sx={{
                    width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    bgcolor: isActive || isCompleted ? 'primary.main' : 'background.paper',
                    color: isActive || isCompleted ? 'white' : 'text.secondary',
                    border: '2px solid',
                    borderColor: isActive || isCompleted ? 'primary.main' : 'divider',
                    fontWeight: 700, mb: 1,
                    transition: 'all 0.3s ease',
                    boxShadow: isActive ? `0 0 0 4px ${theme.palette.primary.main}33` : 'none',
                  }}
                >
                  {isCompleted ? <CheckIcon sx={{ fontSize: 20 }} /> : index + 1}
                </Box>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    fontWeight: isActive ? 700 : 500, 
                    color: isActive ? 'text.primary' : 'text.secondary' 
                  }}
                >
                  {step.label}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};
