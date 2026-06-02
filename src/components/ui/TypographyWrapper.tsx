import { Box, Typography, TypographyProps } from '@mui/material';

interface TypographyWrapperProps {
  title: string;
  subtitle?: string;
  align?: TypographyProps['align'];
  color?: TypographyProps['color'];
}

export const TypographyWrapper = ({ title, subtitle, align = 'center', color = 'text.primary' }: TypographyWrapperProps) => {
  return (
    <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: align }}>
      <Typography variant="h2" component="h2" color={color} gutterBottom sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};
