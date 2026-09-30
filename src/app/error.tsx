'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Box, Button, Container, Typography } from '@mui/material';

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 2 }}>
        Something went wrong
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        We hit an unexpected problem loading this page. Please try again, or head back to the homepage.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button variant="contained" onClick={() => unstable_retry()}>
          Try again
        </Button>
        <Button component={Link} href="/" variant="outlined">
          Go to homepage
        </Button>
      </Box>
    </Container>
  );
}
