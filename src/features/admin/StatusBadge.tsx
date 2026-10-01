'use client';

import { Box, Tooltip, Typography, alpha, useTheme } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import BlockIcon from '@mui/icons-material/Block';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import InfoIcon from '@mui/icons-material/Info';

export type StatusType =
  | 'Pending' | 'Verified' | 'Assigned' | 'Unassigned' | 'Completed' | 'Confirmed' | 'Pending Verification'
  | 'Processing' | 'Delivered' | 'Read' | 'Success' | 'Bounced' | 'Partial' | 'Active' | 'Inactive' | 'In Visit'
  | 'On Leave' | 'Unavailable' | 'Available'
  | 'Created' | 'PaymentPending' | 'PaymentVerified' | 'DoctorAssigned' | 'DoctorConfirmed' | 'VisitStarted'
  | 'VisitCompleted' | 'Cancelled' | 'Rejected' | 'Failed' | 'Paid';

interface StatusBadgeProps {
  status: StatusType;
  /** Render a coloured icon (label in tooltip) instead of the text pill. */
  iconOnly?: boolean;
}

const SUCCESS = ['Verified', 'Completed', 'Delivered', 'Read', 'Success', 'Active', 'Available', 'Paid', 'VisitCompleted', 'PaymentVerified'];
const WARNING = ['Pending', 'Pending Verification', 'Unassigned', 'Processing', 'On Leave', 'Created', 'PaymentPending'];
const ERROR = ['Bounced', 'Unavailable', 'Partial', 'Inactive', 'Cancelled', 'Rejected', 'Failed'];
const SECONDARY = ['Assigned', 'Confirmed', 'In Visit', 'DoctorAssigned', 'DoctorConfirmed', 'VisitStarted'];

/** "DoctorAssigned" -> "Doctor Assigned" */
const humanize = (s: string) => s.replace(/([a-z])([A-Z])/g, '$1 $2');

const ICONS: Record<string, SvgIconComponent> = {
  Available: CheckCircleIcon, Active: CheckCircleIcon, Success: CheckCircleIcon, Paid: CheckCircleIcon, Verified: CheckCircleIcon, PaymentVerified: CheckCircleIcon,
  Unavailable: CancelIcon, Cancelled: CancelIcon, Rejected: CancelIcon, Failed: CancelIcon,
  Inactive: BlockIcon,
  Completed: DoneAllIcon, VisitCompleted: DoneAllIcon,
  Confirmed: EventAvailableIcon,
  DoctorAssigned: AssignmentIndIcon, Assigned: AssignmentIndIcon, DoctorConfirmed: AssignmentIndIcon,
  VisitStarted: PlayCircleIcon, 'In Visit': PlayCircleIcon,
  Pending: ScheduleIcon, Created: ScheduleIcon, PaymentPending: ScheduleIcon, 'Pending Verification': ScheduleIcon, Unassigned: ScheduleIcon,
};

export const StatusBadge = ({ status, iconOnly = false }: StatusBadgeProps) => {
  const theme = useTheme();

  let color = theme.palette.primary.main;

  if (SUCCESS.includes(status)) color = theme.palette.success.main;
  else if (WARNING.includes(status)) color = theme.palette.warning.main;
  else if (ERROR.includes(status)) color = theme.palette.error.main;
  else if (SECONDARY.includes(status)) color = theme.palette.secondary.main;

  const label = status ? humanize(status) : 'N/A';

  if (iconOnly) {
    const Icon = ICONS[status] ?? (SUCCESS.includes(status) ? CheckCircleIcon : WARNING.includes(status) ? ScheduleIcon : ERROR.includes(status) ? CancelIcon : InfoIcon);
    return (
      <Tooltip title={label}>
        <Box role="img" aria-label={label} sx={{ display: 'inline-flex', color }}>
          <Icon fontSize="small" />
        </Box>
      </Tooltip>
    );
  }

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: alpha(color, 0.12), px: 1.5, py: 0.5, borderRadius: '24px', whiteSpace: 'nowrap' }}>
      <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: color }} />
      <Typography variant="caption" sx={{ fontWeight: 700, color, fontSize: '0.8125rem' }}>{status ? humanize(status) : 'N/A'}</Typography>
    </Box>
  );
};
