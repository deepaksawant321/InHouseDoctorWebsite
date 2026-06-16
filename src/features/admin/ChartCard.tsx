'use client';

import { Card, Typography, Box, useTheme } from '@mui/material';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  data: any[];
  type: 'line' | 'bar';
  dataKey: string;
  xAxisKey: string;
  color?: string;
  actions?: ReactNode;
}

export const ChartCard = ({ title, data, type, dataKey, xAxisKey, color, actions }: ChartCardProps) => {
  const theme = useTheme();
  const primaryColor = color || theme.palette.primary.main;

  return (
    <Card sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 400 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>{title}</Typography>
        {actions && <Box>{actions}</Box>}
      </Box>
      <Box sx={{ flexGrow: 1, width: '100%', minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          {type === 'line' ? (
            <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
              <XAxis dataKey={xAxisKey} stroke={theme.palette.text.secondary} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={theme.palette.text.secondary} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value >= 1000 ? `${value / 1000}k` : value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: theme.palette.background.paper, borderRadius: 8, border: `1px solid ${theme.palette.divider}` }}
                itemStyle={{ color: theme.palette.text.primary, fontWeight: 600 }}
              />
              <Line type="monotone" dataKey={dataKey} stroke={primaryColor} strokeWidth={3} dot={{ r: 4, fill: primaryColor, strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0 }} />
            </LineChart>
          ) : (
            <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
              <XAxis dataKey={xAxisKey} stroke={theme.palette.text.secondary} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={theme.palette.text.secondary} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value >= 1000 ? `${value / 1000}k` : value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: theme.palette.background.paper, borderRadius: 8, border: `1px solid ${theme.palette.divider}` }}
                itemStyle={{ color: theme.palette.text.primary, fontWeight: 600 }}
                cursor={{ fill: theme.palette.action.hover }}
              />
              <Bar dataKey={dataKey} fill={primaryColor} radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};
