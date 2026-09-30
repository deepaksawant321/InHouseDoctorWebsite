import { Box, Typography, CardContent, CardActionArea, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { Card } from '@/components/ui/Card';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  const theme = useTheme();
  return (
    <Card sx={{ height: '100%', transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'translateY(-8px)' } }}>
      <CardActionArea sx={{ height: '100%' }}>
        <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%' }}>
          <Box sx={{ color: 'secondary.main', mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', width: 64, height: 64, borderRadius: '50%', bgcolor: theme.palette.mode === 'light' ? '#E0F2F1' : 'rgba(20, 181, 165, 0.1)' }}>
            {icon}
          </Box>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
