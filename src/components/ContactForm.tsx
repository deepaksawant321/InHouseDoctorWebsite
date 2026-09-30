'use client';

import { useState } from 'react';
import { Alert, Box, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { contactApi } from '@/services/api';

interface FormValues {
  name: string;
  mobile: string;
  email: string;
  message: string;
}

type Errors = Partial<Record<keyof FormValues, string>>;

const EMPTY: FormValues = { name: '', mobile: '', email: '', message: '' };

function validate(v: FormValues): Errors {
  const errors: Errors = {};
  if (v.name.trim().length < 2) errors.name = 'Please enter your name';
  if (v.mobile.trim() && !/^\+?[0-9 -]{8,15}$/.test(v.mobile.trim())) errors.mobile = 'Enter a valid mobile number';
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) errors.email = 'Enter a valid email address';
  if (!v.mobile.trim() && !v.email.trim()) errors.mobile = 'Please give a mobile number or an email so we can reply';
  if (v.message.trim().length < 5) errors.message = 'Please write a short message';
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null);

  const set = (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setSubmitting(true);
    try {
      const res = await contactApi.send({
        name: values.name.trim(),
        mobile: values.mobile.trim() || undefined,
        email: values.email.trim() || undefined,
        message: values.message.trim(),
      });
      setResult({ ok: true, text: res.data?.message || 'Thanks! Your message has been sent.' });
      setValues(EMPTY);
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      setResult({
        ok: false,
        text: status === 429
          ? 'Too many messages sent. Please try again later or call us.'
          : 'We could not send your message. Please try again or call us.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        p: { xs: 4, md: 6 }, borderRadius: 6,
        bgcolor: 'background.default',
        border: '1px solid', borderColor: 'divider',
        boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
      }}
    >
      <Typography variant="h4" component="h2" sx={{ mb: 4, fontWeight: 700 }}>
        Send us a Message
      </Typography>
      {result && (
        <Alert severity={result.ok ? 'success' : 'error'} role={result.ok ? 'status' : 'alert'} sx={{ mb: 3 }}>
          {result.text}
        </Alert>
      )}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField fullWidth required label="Full Name" value={values.name} onChange={set('name')} error={!!errors.name} helperText={errors.name} autoComplete="name" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField fullWidth label="Mobile Number" type="tel" value={values.mobile} onChange={set('mobile')} error={!!errors.mobile} helperText={errors.mobile} autoComplete="tel" />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField fullWidth label="Email Address" type="email" value={values.email} onChange={set('email')} error={!!errors.email} helperText={errors.email} autoComplete="email" />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField fullWidth required multiline rows={4} label="Your Message" value={values.message} onChange={set('message')} error={!!errors.message} helperText={errors.message} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box
            component="button"
            type="submit"
            disabled={submitting}
            sx={{
              width: '100%', py: 2, borderRadius: '16px', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer',
              background: 'linear-gradient(135deg, #4F46E5, #0D9488)',
              color: 'white', fontWeight: 700, fontSize: '1rem',
              boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
              opacity: submitting ? 0.7 : 1,
              transition: 'transform 0.2s',
              '&:hover': { transform: submitting ? 'none' : 'translateY(-2px)' },
            }}
          >
            {submitting ? 'Sending…' : 'Send Message'}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
