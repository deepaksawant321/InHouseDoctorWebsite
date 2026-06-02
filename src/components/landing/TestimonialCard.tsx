import { Box, Typography, Rating } from '@mui/material';
import { Card } from '@/components/ui/Card';

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
}

export const TestimonialCard = ({ name, role, content, rating }: TestimonialCardProps) => {
  return (
    <Card sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Rating value={rating} readOnly sx={{ mb: 2 }} />
      <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 3, flexGrow: 1 }}>
        "{content}"
      </Typography>
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {role}
        </Typography>
      </Box>
    </Card>
  );
};
