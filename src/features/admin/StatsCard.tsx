'use client';

import { Box, Card, CardActionArea, Typography, alpha, useTheme } from '@mui/material';
import Link from 'next/link';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: 'up' | 'down';
  trendValue?: string;
  /** When set, the whole card links to this page. */
  href?: string;
}

export const StatsCard = ({ title, value, icon, trend, trendValue, href }: StatsCardProps) => {
  const theme = useTheme();

  const body = (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ width: 48, height: 48, flexShrink: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: alpha(theme.palette.primary.main, 0.12), color: 'primary.main' }}>
          {icon}
        </Box>
        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: trend === 'up' ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.error.main, 0.1), color: trend === 'up' ? 'success.main' : 'error.main', px: 1.5, py: 0.5, borderRadius: 2 }}>
            {trend === 'up' ? <TrendingUpIcon sx={{ fontSize: 16 }} /> : <TrendingDownIcon sx={{ fontSize: 16 }} />}
            <Typography variant="caption" sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>{trendValue}</Typography>
          </Box>
        )}
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5, whiteSpace: 'nowrap' }}>{title}</Typography>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>{value}</Typography>
      </Box>
    </>
  );

  const inner = { p: 3, display: 'flex', flexDirection: 'column', gap: 2, flex: 1, alignItems: 'stretch' } as const;

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 32px rgba(10, 92, 184, 0.12)' } }}>
      {href ? (
        <CardActionArea component={Link} href={href} aria-label={`${title}: ${value}. Open details`} sx={inner}>{body}</CardActionArea>
      ) : (
        <Box sx={inner}>{body}</Box>
      )}
    </Card>
  );
};
