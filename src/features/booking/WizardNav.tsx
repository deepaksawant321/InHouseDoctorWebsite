'use client';

import { Box, Button, CircularProgress } from '@mui/material';

interface WizardNavProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel: string;
  nextDisabled?: boolean;
  loading?: boolean;
  /** Submit the surrounding <form> instead of calling onNext. */
  submit?: boolean;
  /** Optional low-emphasis action between Back and Next (e.g. "Skip for now"). */
  secondary?: { label: string; onClick: () => void };
}

/** Back / Continue row shared by every booking step. */
export const WizardNav = ({ onBack, onNext, nextLabel, nextDisabled, loading, submit, secondary }: WizardNavProps) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: onBack ? 'space-between' : 'flex-end', alignItems: 'center' }}>
    {onBack && (
      <Button type="button" variant="outlined" color="inherit" size="medium" onClick={onBack} disabled={loading} sx={{ borderColor: 'divider' }}>
        Back
      </Button>
    )}
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {secondary && (
        <Button type="button" variant="text" color="inherit" onClick={secondary.onClick} disabled={loading} sx={{ color: 'text.secondary' }}>
          {secondary.label}
        </Button>
      )}
      <Button
        type={submit ? 'submit' : 'button'}
        variant="contained"
        size="medium"
        onClick={submit ? undefined : onNext}
        disabled={nextDisabled || loading}
        startIcon={loading ? <CircularProgress size={18} color="inherit" /> : undefined}
        sx={{ px: { xs: 3, sm: 6 } }}
      >
        {nextLabel}
      </Button>
    </Box>
  </Box>
);
