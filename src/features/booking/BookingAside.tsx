'use client';

import Image from 'next/image';
import { Box, Typography, alpha, useTheme } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HomeIcon from '@mui/icons-material/Home';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { BookingSummary } from './BookingSummary';

const reassurance = [
  { icon: <VerifiedUserIcon />, text: 'Background-checked, licensed practitioners' },
  { icon: <HomeIcon />, text: 'Care delivered right to your doorstep' },
  { icon: <SupportAgentIcon />, text: '24x7 support whenever you need it' },
];

/** Desktop side column: photo, live booking summary and reassurance points. */
export const BookingAside = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ position: 'relative', height: 130, borderRadius: '20px', overflow: 'hidden' }}>
        <Image src="/images/7345465.jpg" alt="A doctor examining a patient at home" fill sizes="320px" style={{ objectFit: 'cover', objectPosition: '60% 40%' }} />
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,36,70,0) 35%, rgba(10,36,70,0.78) 100%)' }} />
        <Typography variant="subtitle2" sx={{ position: 'absolute', left: 16, bottom: 12, right: 16, color: 'white', fontWeight: 700 }}>
          A doctor at your doorstep
        </Typography>
      </Box>

      <BookingSummary />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, px: 0.5 }}>
        {reassurance.map((r) => (
          <Box key={r.text} sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <Box sx={{ width: 30, height: 30, flexShrink: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: alpha(theme.palette.secondary.main, 0.14), color: 'secondary.main', '& svg': { fontSize: 17 } }}>
              {r.icon}
            </Box>
            <Typography variant="caption" color="text.secondary">{r.text}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
