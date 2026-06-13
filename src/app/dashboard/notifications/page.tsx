'use client';

import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, alpha, useTheme } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Notifications() {
  const theme = useTheme();

  const notifications = [
    { id: 1, title: 'Booking Confirmed', desc: 'Your booking BKG-101 has been confirmed. A doctor will be assigned shortly.', time: '2 hours ago', icon: <CheckCircleIcon />, color: theme.palette.success.main, unread: true },
    { id: 2, title: 'Payment Successful', desc: 'Payment of ₹1,499 was successful for booking BKG-101.', time: '2 hours ago', icon: <PaymentIcon />, color: theme.palette.primary.main, unread: true },
    { id: 3, title: 'Visit Reminder', desc: 'Dr. Sharma is arriving today at 10:00 AM for patient Ramesh.', time: '1 day ago', icon: <NotificationsActiveIcon />, color: theme.palette.warning.main, unread: false },
  ];

  return (
    <Box sx={{ maxWidth: 800 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
        Notifications
      </Typography>

      <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '24px', overflow: 'hidden', bgcolor: 'background.paper' }}>
        <List disablePadding>
          {notifications.map((notif, index) => (
            <Box key={notif.id}>
              <ListItem 
                alignItems="flex-start" 
                sx={{ 
                  p: 3, 
                  bgcolor: notif.unread ? alpha(theme.palette.primary.main, 0.04) : 'transparent',
                  transition: 'background-color 0.2s',
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08) }
                }}
              >
                <ListItemAvatar sx={{ mt: 0.5 }}>
                  <Avatar sx={{ bgcolor: alpha(notif.color, 0.1), color: notif.color }}>
                    {notif.icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: notif.unread ? 700 : 500 }}>
                        {notif.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap', ml: 2 }}>
                        {notif.time}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" color={notif.unread ? 'text.primary' : 'text.secondary'}>
                      {notif.desc}
                    </Typography>
                  }
                />
              </ListItem>
              {index < notifications.length - 1 && <Divider component="li" />}
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );
}
