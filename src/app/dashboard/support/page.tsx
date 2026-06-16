'use client';

import { Box, Typography, Card, CardContent, CircularProgress, Stack, Button, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { settingsApi } from '@/services/api';

export default function SupportPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    settingsApi.get().then(res => {
      setSettings(res.data.data);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ maxWidth: 800 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
        Support & Contact
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        We are here to help! Reach out to us through any of the channels below for immediate assistance with your bookings or profile.
      </Typography>

      <Card elevation={0} sx={{ borderRadius: '24px', border: '1px solid', borderColor: 'divider', mb: 4 }}>
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Stack spacing={4}>
            {settings?.supportPhone && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box sx={{ p: 2, borderRadius: '50%', bgcolor: 'primary.50', color: 'primary.main', display: 'flex' }}>
                  <PhoneIcon />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Phone Support</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Available 24/7 for urgent queries</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{settings.supportPhone}</Typography>
                </Box>
              </Box>
            )}

            {settings?.supportPhone && <Divider />}

            {settings?.whatsappNumber && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box sx={{ p: 2, borderRadius: '50%', bgcolor: '#E8F5E9', color: '#2E7D32', display: 'flex' }}>
                  <WhatsAppIcon />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>WhatsApp Support</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Chat with our support team</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{settings.whatsappNumber}</Typography>
                </Box>
              </Box>
            )}

            {settings?.whatsappNumber && <Divider />}

            {settings?.supportEmail && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box sx={{ p: 2, borderRadius: '50%', bgcolor: 'grey.100', color: 'grey.700', display: 'flex' }}>
                  <EmailIcon />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Email Support</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>For non-urgent queries and documentation</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{settings.supportEmail}</Typography>
                </Box>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>

      <Card elevation={0} sx={{ borderRadius: '24px', border: '1px solid', borderColor: 'divider', bgcolor: 'primary.50' }}>
        <CardContent sx={{ p: { xs: 3, md: 4 }, display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box sx={{ p: 2, borderRadius: '50%', bgcolor: 'white', color: 'primary.main', display: 'flex' }}>
            <QuestionAnswerIcon />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Frequently Asked Questions</Typography>
            <Typography variant="body2" color="text.secondary">Find answers to common questions about our services.</Typography>
          </Box>
          <Button variant="contained" href="/faq" sx={{ borderRadius: 2, textTransform: 'none' }}>
            View FAQs
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
