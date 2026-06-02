import { Box, Container, ContainerProps } from '@mui/material';
import { ReactNode } from 'react';

interface SectionContainerProps extends ContainerProps {
  children: ReactNode;
  bgColor?: 'default' | 'paper' | 'primary' | 'secondary';
  py?: number | object;
}

export const SectionContainer = ({ children, bgColor = 'default', py = { xs: 8, md: 12 }, ...props }: SectionContainerProps) => {
  return (
    <Box sx={{ bgcolor: bgColor === 'default' ? 'background.default' : bgColor === 'paper' ? 'background.paper' : `${bgColor}.main`, py }}>
      <Container {...props}>
        {children}
      </Container>
    </Box>
  );
};
