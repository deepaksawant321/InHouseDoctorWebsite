'use client';

import { Box, Typography, TextField, alpha } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import MyLocationIcon from '@mui/icons-material/MyLocation';

interface AddressForm {
  addressLine1: string;
  addressLine2: string;
  area: string;
  city: string;
  pincode: string;
  landmark: string;
}

export default function AddressDetailsPage() {
  const router = useRouter();
  
  const { control, handleSubmit, formState: { errors }, setValue } = useForm<AddressForm>({
    defaultValues: { addressLine1: '', addressLine2: '', area: '', city: 'Mumbai', pincode: '', landmark: '' }
  });

  const onSubmit = (data: AddressForm) => {
    console.log(data);
    router.push('/book/schedule');
  };

  const handleCurrentLocation = () => {
    // Mock functionality
    setValue('addressLine1', '123 Main Street');
    setValue('area', 'Andheri West');
    setValue('pincode', '400053');
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            Address Details
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Where should the medical professional arrive?
          </Typography>
        </Box>
        <Box
          component="button" type="button" onClick={handleCurrentLocation}
          sx={{
            display: 'flex', alignItems: 'center', gap: 1,
            py: 1, px: 2, borderRadius: 2, border: '1px solid', borderColor: 'primary.main',
            bgcolor: alpha('#1976D2', 0.05), color: 'primary.main', cursor: 'pointer',
            fontWeight: 600, transition: 'all 0.2s', '&:hover': { bgcolor: alpha('#1976D2', 0.1) }
          }}
        >
          <MyLocationIcon fontSize="small" /> Use Current Location
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 6, mt: 4 }}>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="addressLine1" control={control} rules={{ required: 'Address Line 1 is required' }}
            render={({ field }) => (
              <TextField {...field} fullWidth label="House / Flat / Block No." variant="outlined" error={!!errors.addressLine1} helperText={errors.addressLine1?.message} />
            )}
          />
        </Grid>
        
        <Grid size={{ xs: 12 }}>
          <Controller
            name="addressLine2" control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth label="Apartment / Building Name" variant="outlined" />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="area" control={control} rules={{ required: 'Area is required' }}
            render={({ field }) => (
              <TextField {...field} fullWidth label="Area / Locality" variant="outlined" error={!!errors.area} helperText={errors.area?.message} />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="landmark" control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth label="Landmark (Optional)" variant="outlined" />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="city" control={control} rules={{ required: 'City is required' }}
            render={({ field }) => (
              <TextField {...field} fullWidth label="City" variant="outlined" disabled error={!!errors.city} helperText={errors.city?.message} />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="pincode" control={control} rules={{ required: 'Pincode is required', pattern: { value: /^[0-9]{6}$/, message: 'Valid 6 digit pincode required' } }}
            render={({ field }) => (
              <TextField {...field} fullWidth label="Pincode" variant="outlined" slotProps={{ htmlInput: { maxLength: 6 } }} error={!!errors.pincode} helperText={errors.pincode?.message} />
            )}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box
          component="button" type="button" onClick={() => router.back()}
          sx={{
            py: 1.5, px: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider', cursor: 'pointer',
            bgcolor: 'transparent', color: 'text.primary', fontWeight: 600, fontSize: '1rem',
            transition: 'all 0.2s', '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          Back
        </Box>
        <Box
          component="button" type="submit"
          sx={{
            py: 1.5, px: 6, borderRadius: 3, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #1976D2, #00BFA5)', color: 'white', 
            fontWeight: 700, fontSize: '1rem', boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
            transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)' },
          }}
        >
          Continue to Schedule
        </Box>
      </Box>
    </Box>
  );
}
