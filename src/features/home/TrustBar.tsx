'use client';

import { Box, useTheme, alpha } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SpeedIcon from '@mui/icons-material/Speed';
import HomeIcon from '@mui/icons-material/Home';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ShieldIcon from '@mui/icons-material/Shield';
import StarIcon from '@mui/icons-material/Star';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const items = [
  { icon: <VerifiedUserIcon sx={{ fontSize: 18 }} />, label: 'Verified Doctors' },
  { icon: <ShieldIcon sx={{ fontSize: 18 }} />, label: 'Background Checked' },
  { icon: <LocalHospitalIcon sx={{ fontSize: 18 }} />, label: 'Licensed Practitioners' },
  { icon: <SpeedIcon sx={{ fontSize: 18 }} />, label: 'Fast Response' },
  { icon: <SupportAgentIcon sx={{ fontSize: 18 }} />, label: '24x7 Support' },
  { icon: <HomeIcon sx={{ fontSize: 18 }} />, label: 'Home Visits' },
  { icon: <StarIcon sx={{ fontSize: 18 }} />, label: '4.9★ Rated' },
  { icon: <MedicalServicesIcon sx={{ fontSize: 18 }} />, label: 'Expert Care' },
];

const TrustItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <Box
      sx={{
        display: 'inline-flex', alignItems: 'center', gap: 1.5,
        px: 3, py: 1.25, borderRadius: 10, flexShrink: 0,
        bgcolor: isDark ? alpha('#1F2937', 0.8) : 'white',
        border: '1px solid', borderColor: 'divider',
        color: 'text.secondary', mx: 1.5,
      }}
    >
      <Box sx={{ color: 'primary.main' }}>{icon}</Box>
      <Box component="span" sx={{ fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap', color: 'text.primary' }}>
        {label}
      </Box>
    </Box>
  );
};

export const TrustBar = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const doubledItems = [...items, ...items];

  return (
    <Box
      sx={{
        py: 4,
        bgcolor: isDark ? alpha('#111827', 0.8) : alpha('#F8FAFD', 1),
        borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Fade masks */}
      <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: `linear-gradient(to right, ${isDark ? '#111827' : '#F8FAFD'}, transparent)`, zIndex: 1 }} />
      <Box sx={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: `linear-gradient(to left, ${isDark ? '#111827' : '#F8FAFD'}, transparent)`, zIndex: 1 }} />

      <Box
        sx={{
          display: 'flex',
          width: 'max-content',
          animation: 'marquee 28s linear infinite',
          '@keyframes marquee': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-50%)' },
          },
        }}
      >
        {doubledItems.map((item, i) => (
          <TrustItem key={i} {...item} />
        ))}
      </Box>
    </Box>
  );
};
