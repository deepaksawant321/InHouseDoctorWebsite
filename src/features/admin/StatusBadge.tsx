'use client';

import { Box, Typography, alpha, useTheme } from '@mui/material';

export type StatusType = 'Pending' | 'Verified' | 'Assigned' | 'Unassigned' | 'Completed' | 'Confirmed' | 'Pending Verification' | 'Processing' | 'Delivered' | 'Read' | 'Success' | 'Bounced' | 'Partial' | 'Active' | 'In Visit' | 'On Leave' | 'Unavailable' | 'Available';

interface StatusBadgeProps {
  status: StatusType;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const theme = useTheme();

  let color = theme.palette.primary.main;
  
  if (['Verified', 'Completed', 'Delivered', 'Read', 'Success', 'Active', 'Available'].includes(status)) {
    color = theme.palette.success.main;
  } else if (['Pending', 'Pending Verification', 'Unassigned', 'Processing', 'On Leave'].includes(status)) {
    color = theme.palette.warning.main;
  } else if (['Bounced', 'Unavailable', 'Partial'].includes(status)) {
    color = theme.palette.error.main;
  } else if (['Assigned', 'Confirmed', 'In Visit'].includes(status)) {
    color = theme.palette.secondary.main;
  }

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: alpha(color, 0.1), px: 1.5, py: 0.5, borderRadius: 4 }}>
      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: color }} />
      <Typography variant="caption" sx={{ fontWeight: 700, color }}>{status}</Typography>
    </Box>
  );
};
