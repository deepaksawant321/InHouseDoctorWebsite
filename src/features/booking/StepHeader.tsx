'use client';

import { Box, Typography, alpha, useTheme } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ElderlyIcon from '@mui/icons-material/Elderly';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

/** Icon for a service, picked from its name (falls back to a generic hospital icon). */
export const serviceIconFor = (name: string = ''): React.ReactElement => {
  const n = name.toLowerCase();
  if (n.includes('elder')) return <ElderlyIcon />;
  if (n.includes('nurs')) return <HealthAndSafetyIcon />;
  if (n.includes('physio')) return <AccessibilityNewIcon />;
  if (n.includes('physician') || n.includes('consult') || n.includes('doctor')) return <MedicalServicesIcon />;
  return <LocalHospitalIcon />;
};

interface StepHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
}

/** Compact heading for a booking step: icon tile, title, one-line helper text. */
export const StepHeader = ({ icon, title, subtitle, badge }: StepHeaderProps) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: { xs: 3, md: 4 } }}>
      <Box
        sx={{
          width: 48, height: 48, flexShrink: 0, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main',
        }}
      >
        {icon}
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Typography component="h1" variant="subtitle1" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 800, lineHeight: 1.3, letterSpacing: '-0.01em' }}>
            {title}
          </Typography>
          {badge && (
            <Typography component="span" variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', bgcolor: 'action.hover', px: 1, py: 0.25, borderRadius: 1.5, letterSpacing: 0.5 }}>
              {badge}
            </Typography>
          )}
        </Box>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

/** Smaller heading inside a step (for example "Select Date"). */
export const SectionTitle = ({ icon, children, sx }: { icon?: React.ReactNode; children: React.ReactNode; sx?: object }) => (
  <Typography component="h2" variant="subtitle1" sx={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1, mb: 2, '& svg': { fontSize: 22, color: 'primary.main' }, ...sx }}>
    {icon}
    {children}
  </Typography>
);
