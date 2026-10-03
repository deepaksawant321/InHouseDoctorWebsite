'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';

const BOOKING_START = '/book/service';

// Every "Request Doctor" button lands here: send logged-in patients straight into the booking
// journey, everyone else to login (which returns them to the booking journey after sign-in).
// Renders only a spinner so no intermediate page is shown.
export function RequestDoctorGate() {
  const router = useRouter();

  useEffect(() => {
    let token: string | null = null;
    try {
      token = localStorage.getItem('token');
    } catch {
      // storage blocked: treat as logged out
    }
    router.replace(token ? BOOKING_START : `/login?redirect=${encodeURIComponent(BOOKING_START)}`);
  }, [router]);

  return (
    <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress aria-label="Redirecting" />
    </Box>
  );
}
