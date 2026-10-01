'use client';

import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, alpha, useTheme, CircularProgress } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState, useEffect } from 'react';
import { notificationsApi } from '@/services/api';
import EmptyState from '@/components/EmptyState';
import { formatDate } from '@/utils/date';

export default function Notifications() {
  const theme = useTheme();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    notificationsApi.getAll()
      .then(res => {
        setNotifications(Array.isArray(res.data) ? res.data : (res.data?.data || []));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ maxWidth: 800 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
        Notifications
      </Typography>

      <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '24px', overflow: 'hidden', bgcolor: 'background.paper' }}>
        {loading ? (
          <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : notifications.length === 0 ? (
          <EmptyState
            title="No Notifications"
            description="You are all caught up. Booking and payment updates will appear here."
            icon={<NotificationsActiveIcon />}
          />
        ) : (
          <List disablePadding>
            {notifications.map((notif, index) => {
              // Determine icon/color based on message content for visual variety
              let icon = <NotificationsActiveIcon />;
              let color = theme.palette.primary.main;
              if (notif.message.toLowerCase().includes('confirm')) {
                icon = <CheckCircleIcon />;
                color = theme.palette.success.main;
              } else if (notif.message.toLowerCase().includes('payment')) {
                icon = <PaymentIcon />;
                color = theme.palette.info.main;
              }
              
              return (
                <Box key={notif.id}>
                  <ListItem 
                    alignItems="flex-start" 
                    sx={{ 
                      p: 3, 
                      bgcolor: !notif.isRead ? alpha(theme.palette.primary.main, 0.04) : 'transparent',
                      transition: 'background-color 0.2s',
                      '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08) }
                    }}
                  >
                    <ListItemAvatar sx={{ mt: 0.5 }}>
                      <Avatar sx={{ bgcolor: alpha(color, 0.1), color: color }}>
                        {icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: !notif.isRead ? 700 : 500 }}>
                            {notif.message.split('.')[0] || 'Notification'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap', ml: 2 }}>
                            {notif.sentDate ? formatDate(notif.sentDate) : ''}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Typography variant="body2" color={!notif.isRead ? 'text.primary' : 'text.secondary'}>
                          {notif.message}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < notifications.length - 1 && <Divider component="li" />}
                </Box>
              );
            })}
          </List>
        )}
      </Box>
    </Box>
  );
}
