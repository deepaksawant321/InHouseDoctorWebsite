'use client';

import { Box, Typography, TextField, alpha, RadioGroup, FormControlLabel, Radio, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useEffect, useState } from 'react';
import { usersApi } from '@/services/api';
import { useBooking } from '@/providers/BookingProvider';

interface AddressForm {
  addressLine1: string;
  addressLine2: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
}

export default function AddressDetailsPage() {
  const router = useRouter();
  const { setAddress } = useBooking();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState<string | 'new'>('new');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { control, handleSubmit, formState: { errors }, setValue } = useForm<AddressForm>({
    defaultValues: { addressLine1: '', addressLine2: '', area: '', city: 'Mumbai', state: 'Maharashtra', pincode: '', landmark: '' }
  });

  useEffect(() => {
    usersApi.getAddresses().then(res => {
      const fetchedAddresses = res.data.data || [];
      setAddresses(fetchedAddresses);
      if (fetchedAddresses.length > 0) {
        setSelectedAddressId(fetchedAddresses[0].id);
      }
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const onSubmit = async (data: AddressForm) => {
    if (selectedAddressId !== 'new') {
      setAddress(selectedAddressId);
      router.push('/book/schedule');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await usersApi.addAddress(data);
      const newAddressId = res.data.data.id || res.data.data.addressId;
      setAddress(newAddressId);
      router.push('/book/schedule');
    } catch (err) {
      console.error(err);
      alert('Failed to save address. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleCurrentLocation = () => {
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
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>
      ) : (
        <Box sx={{ mt: 4, mb: 4 }}>
          {addresses.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Select an Address</Typography>
              <RadioGroup value={selectedAddressId} onChange={(e) => setSelectedAddressId(e.target.value)}>
                {addresses.map(addr => (
                  <Box key={addr.id} sx={{ p: 2, mb: 2, border: '1px solid', borderColor: selectedAddressId === addr.id ? 'primary.main' : 'divider', borderRadius: 2, bgcolor: selectedAddressId === addr.id ? alpha('#4F46E5', 0.05) : 'background.paper' }}>
                    <FormControlLabel 
                      value={addr.id} 
                      control={<Radio />} 
                      label={
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{addr.addressLine1}</Typography>
                          <Typography variant="body2" color="text.secondary">{addr.area}, {addr.city}, {addr.state} - {addr.pincode}</Typography>
                        </Box>
                      } 
                    />
                  </Box>
                ))}
                <Box sx={{ p: 2, border: '1px solid', borderColor: selectedAddressId === 'new' ? 'primary.main' : 'divider', borderRadius: 2, bgcolor: selectedAddressId === 'new' ? alpha('#4F46E5', 0.05) : 'background.paper' }}>
                  <FormControlLabel value="new" control={<Radio />} label={<Typography sx={{ fontWeight: 600 }}>Add a New Address</Typography>} />
                </Box>
              </RadioGroup>
            </Box>
          )}

          {selectedAddressId === 'new' && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Box component="button" type="button" onClick={handleCurrentLocation} sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1, px: 2, borderRadius: 2, border: '1px solid', borderColor: 'primary.main', bgcolor: alpha('#4F46E5', 0.05), color: 'primary.main', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s', '&:hover': { bgcolor: alpha('#4F46E5', 0.1) } }}>
                  <MyLocationIcon fontSize="small" /> Use Current Location
                </Box>
              </Box>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Controller name="addressLine1" control={control} rules={{ required: 'Address Line 1 is required' }} render={({ field }) => (
                    <TextField {...field} fullWidth label="House / Flat / Block No." variant="outlined" error={!!errors.addressLine1} helperText={errors.addressLine1?.message} />
                  )} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Controller name="addressLine2" control={control} render={({ field }) => (
                    <TextField {...field} fullWidth label="Apartment / Building Name" variant="outlined" />
                  )} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller name="area" control={control} rules={{ required: 'Area is required' }} render={({ field }) => (
                    <TextField {...field} fullWidth label="Area / Locality" variant="outlined" error={!!errors.area} helperText={errors.area?.message} />
                  )} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller name="landmark" control={control} render={({ field }) => (
                    <TextField {...field} fullWidth label="Landmark (Optional)" variant="outlined" />
                  )} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller name="city" control={control} rules={{ required: 'City is required' }} render={({ field }) => (
                    <TextField {...field} fullWidth label="City" variant="outlined" error={!!errors.city} helperText={errors.city?.message} />
                  )} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller name="pincode" control={control} rules={{ required: 'Pincode is required', pattern: { value: /^[0-9]{6}$/, message: 'Valid 6 digit pincode required' } }} render={({ field }) => (
                    <TextField {...field} fullWidth label="Pincode" variant="outlined" slotProps={{ htmlInput: { maxLength: 6 } }} error={!!errors.pincode} helperText={errors.pincode?.message} />
                  )} />
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box component="button" type="button" onClick={() => router.back()} sx={{ py: 1.5, px: 4, borderRadius: '16px', border: '1px solid', borderColor: 'divider', cursor: 'pointer', bgcolor: 'transparent', color: 'text.primary', fontWeight: 600, fontSize: '1rem', transition: 'all 0.2s', '&:hover': { bgcolor: 'action.hover' } }}>
          Back
        </Box>
        <Box component="button" type="submit" disabled={isSubmitting} sx={{ py: 1.5, px: 6, borderRadius: '16px', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', background: isSubmitting ? 'action.disabledBackground' : 'linear-gradient(135deg, #4F46E5, #0D9488)', color: 'white', fontWeight: 700, fontSize: '1rem', boxShadow: isSubmitting ? 'none' : '0 8px 24px rgba(25, 118, 210, 0.3)', transition: 'all 0.2s', '&:hover': { transform: isSubmitting ? 'none' : 'translateY(-2px)' } }}>
          {isSubmitting ? 'Saving...' : 'Continue to Schedule'}
        </Box>
      </Box>
    </Box>
  );
}
