import { Box, Typography, Button, alpha } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  actionHref?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({ title, description, actionText, onAction, actionHref, icon }: EmptyStateProps) {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      py: 10, 
      px: 3,
      textAlign: 'center',
      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.02),
      borderRadius: '24px',
      border: '2px dashed',
      borderColor: 'divider',
      width: '100%'
    }}>
      <Box sx={{ color: 'text.secondary', mb: 2, '& > svg': { fontSize: 64, opacity: 0.5 } }}>
        {icon || <InboxIcon />}
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
        {description}
      </Typography>
      {actionText && (
        actionHref ? (
          <Button 
            component={Link}
            href={actionHref}
            variant="contained" 
            sx={{ borderRadius: 2, px: 4, py: 1.5, textTransform: 'none', fontWeight: 600 }}
          >
            {actionText}
          </Button>
        ) : (
          <Button 
            variant="contained" 
            onClick={onAction}
            sx={{ borderRadius: 2, px: 4, py: 1.5, textTransform: 'none', fontWeight: 600 }}
          >
            {actionText}
          </Button>
        )
      )}
    </Box>
  );
}
