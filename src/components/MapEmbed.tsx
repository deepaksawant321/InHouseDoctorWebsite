'use client';

import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

/**
 * Click-to-load Google Map. The embed pulls ~0.5 MB of third-party JS/tiles, so it is only fetched
 * when the visitor asks for it; a plain "Open in Google Maps" link is always available.
 */
export function MapEmbed({ query, title }: { query: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  const q = encodeURIComponent(query);

  if (loaded) {
    return (
      <iframe
        title={title}
        src={`https://www.google.com/maps?q=${q}&output=embed`}
        width="100%"
        height="100%"
        style={{ border: 0, display: 'block' }}
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <Box sx={{ textAlign: 'center', px: 2 }}>
      <LocationOnIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
      <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>{title}</Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button variant="contained" onClick={() => setLoaded(true)}>Load interactive map</Button>
        <Button
          variant="outlined"
          component="a"
          href={`https://www.google.com/maps/search/?api=1&query=${q}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Google Maps
        </Button>
      </Box>
    </Box>
  );
}
