'use client';

import { IconButton, Tooltip, alpha } from '@mui/material';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ActionIconProps {
  title: string;
  icon: ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'inherit';
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

/** Compact icon-only row action with tooltip + accessible label. */
export const ActionIcon = ({ title, icon, color = 'primary', onClick, href, disabled }: ActionIconProps) => (
  <Tooltip title={title}>
    <span>
      <IconButton
        size="small"
        aria-label={title}
        disabled={disabled}
        onClick={onClick}
        {...(href ? { component: Link, href } : {})}
        sx={(t) => {
          const c = color === 'inherit' ? t.palette.text.secondary : t.palette[color].main;
          return { color: c, bgcolor: alpha(c, 0.1), '&:hover': { bgcolor: alpha(c, 0.2) } };
        }}
      >
        {icon}
      </IconButton>
    </span>
  </Tooltip>
);
