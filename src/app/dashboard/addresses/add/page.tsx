'use client';

import { Box, Typography, Button, TextField, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { usersApi } from '@/services/api';

interface AddressForm {
  addressLine1: string;
  addressLine2: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
}

export default function AddAddress() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<AddressForm>({
    defaultValues: {
      addressLine1: '',
      addressLine2: '',
      area: '',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '',
      landmark: '',
    }
  });

  const onSubmit = async (data: AddressForm) => {
    setIsSubmitting(true);
    try {
      await usersApi.addAddress(data);
      router.push('/dashboard/addresses');
    } catch (err) {
      console.error(err);
      alert('Failed to save address. Please check console for details.');
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800 }}>
      <Button
        component={Link}
        href="/dashboard/addresses"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3, textTransform: 'none', color: 'text.secondary' }}
      >
        Back to Address Book
      </Button>

      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
        Add New Address
      </Typography>

      <Card elevation={0} sx={{ borderRadius: '24px', border: '1px solid', borderColor: 'divider' }}>
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Controller name="addressLine1" control={control} rules={{ required: 'Address Line 1 is required' }} render={({ field }) => (
                  <TextField {...field} fullWidth label="House / Flat / Block No." required variant="outlined" error={!!errors.addressLine1} helperText={errors.addressLine1?.message} />
                )} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Controller name="addressLine2" control={control} render={({ field }) => (
                  <TextField {...field} fullWidth label="Apartment / Building Name" variant="outlined" />
                )} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller name="area" control={control} rules={{ required: 'Area is required' }} render={({ field }) => (
                  <TextField {...field} fullWidth label="Area / Locality" required variant="outlined" error={!!errors.area} helperText={errors.area?.message} />
                )} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller name="landmark" control={control} render={({ field }) => (
                  <TextField {...field} fullWidth label="Landmark (Optional)" variant="outlined" />
                )} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller name="city" control={control} rules={{ required: 'City is required' }} render={({ field }) => (
                  <TextField {...field} fullWidth label="City" required variant="outlined" error={!!errors.city} helperText={errors.city?.message} />
                )} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller name="pincode" control={control} rules={{ required: 'Pincode is required', pattern: { value: /^[0-9]{6}$/, message: 'Valid 6 digit pincode required' } }} render={({ field }) => (
                  <TextField {...field} fullWidth label="Pincode" required variant="outlined" slotProps={{ htmlInput: { maxLength: 6 } }} error={!!errors.pincode} helperText={errors.pincode?.message} />
                )} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Button type="submit" variant="contained" size="large" disabled={isSubmitting} sx={{ borderRadius: 2, px: 4, py: 1.5, textTransform: 'none', fontWeight: 600 }}>
                  {isSubmitting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Save Address'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
