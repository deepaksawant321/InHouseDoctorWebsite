'use client';

import { Box, Typography, Grid, Card, CardActionArea, CardContent, alpha, useTheme } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import Link from 'next/link';

export default function DashboardHome() {
  const theme = useTheme();

  const cards = [
    {
      title: 'My Patients',
      desc: 'Manage your family members and their details',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      href: '/dashboard/patients',
      color: theme.palette.primary.main,
    },
    {
      title: 'My Bookings',
      desc: 'View upcoming and past appointments',
      icon: <EventNoteIcon sx={{ fontSize: 40 }} />,
      href: '/dashboard/bookings',
      color: theme.palette.secondary.main,
    },
    {
      title: 'Book Service',
      desc: 'Schedule a new home visit for a patient',
      icon: <AddCircleIcon sx={{ fontSize: 40 }} />,
      href: '/book/service',
      color: '#14B5A5',
    },
    {
      title: 'Medical Records',
      desc: 'Access prescriptions and reports',
      icon: <FolderSharedIcon sx={{ fontSize: 40 }} />,
      href: '/dashboard/records',
      color: theme.palette.warning.main,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
        Welcome back, User!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage your family healthcare easily from your dashboard.
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 6 }} key={index}>
            <Card
              elevation={0}
              sx={{
                borderRadius: '24px',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: `0 8px 24px ${alpha(card.color, 0.15)}`,
                  borderColor: card.color,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <CardActionArea component={Link} href={card.href} sx={{ p: 3, height: '100%' }}>
                <CardContent sx={{ p: 0 }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      p: 1.5,
                      borderRadius: '16px',
                      bgcolor: alpha(card.color, 0.1),
                      color: card.color,
                      mb: 2,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.desc}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
