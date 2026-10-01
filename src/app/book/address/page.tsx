'use client';

import { Alert, Box, Typography, TextField, alpha, RadioGroup, FormControlLabel, Radio, CircularProgress } from '@mui/material';
import { WizardNav } from '@/features/booking/WizardNav';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { StepHeader, SectionTitle } from '@/features/booking/StepHeader';
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
  const [formError, setFormError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

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

    setFormError(null);
    setIsSubmitting(true);
    try {
      const res = await usersApi.addAddress(data);
      const newAddressId = res.data.data.id || res.data.data.addressId;
      setAddress(newAddressId);
      router.push('/book/schedule');
    } catch (err) {
      console.error(err);
      setFormError('We could not save your address. Please check the details and try again.');
      setIsSubmitting(false);
    }
  };

  const [gettingLocation, setGettingLocation] = useState(false);

  const handleCurrentLocation = () => {
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError('Location is not supported by your browser. Please fill in the address manually.');
      return;
    }

    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        // Basic reverse geocoding using OpenStreetMap Nominatim API (Free)
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        const data = await response.json();
        
        if (data && data.address) {
          setValue('area', data.address.suburb || data.address.neighbourhood || data.address.residential || '');
          setValue('city', data.address.city || data.address.town || data.address.county || 'Mumbai');
          setValue('state', data.address.state || 'Maharashtra');
          setValue('pincode', data.address.postcode || '');
          if (data.address.road) {
            setValue('addressLine1', data.address.road);
          }
        }
      } catch (err) {
        console.error('Failed to fetch address from coordinates:', err);
        setLocationError('We could not work out your address from your location. Please fill it in manually.');
      } finally {
        setGettingLocation(false);
      }
    }, (error) => {
      console.error(error);
      setLocationError('We could not get your location. Please allow location access in your browser, or fill in the address manually.');
      setGettingLocation(false);
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <StepHeader icon={<LocationOnIcon />} title="Address Details" subtitle="Where should the medical professional arrive?" />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>
      ) : (
        <Box sx={{ mb: 4 }}>
          {addresses.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <SectionTitle icon={<HomeIcon />}>Saved addresses</SectionTitle>
              <RadioGroup value={selectedAddressId} onChange={(e) => setSelectedAddressId(e.target.value)}>
                {addresses.map(addr => (
                  <Box key={addr.id} sx={{ px: 2, py: 1, mb: 1.5, border: '2px solid', borderColor: selectedAddressId === addr.id ? 'primary.main' : 'divider', borderRadius: '16px', bgcolor: selectedAddressId === addr.id ? alpha('#0A5CB8', 0.05) : 'background.paper' }}>
                    <FormControlLabel
                      value={addr.id}
                      control={<Radio />}
                      sx={{ width: '100%', m: 0 }}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 0.5 }}>
                          <HomeIcon sx={{ color: 'primary.main', fontSize: 22 }} />
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, overflowWrap: 'anywhere' }}>{addr.addressLine1}</Typography>
                            <Typography variant="body2" color="text.secondary">{addr.area}, {addr.city}, {addr.state} - {addr.pincode}</Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </Box>
                ))}
                <Box sx={{ px: 2, py: 1, border: '2px solid', borderColor: selectedAddressId === 'new' ? 'primary.main' : 'divider', borderRadius: '16px', bgcolor: selectedAddressId === 'new' ? alpha('#0A5CB8', 0.05) : 'background.paper' }}>
                  <FormControlLabel value="new" control={<Radio />} sx={{ width: '100%', m: 0 }} label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 0.5 }}>
                      <AddLocationAltIcon sx={{ color: 'primary.main', fontSize: 22 }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Add a new address</Typography>
                    </Box>
                  } />
                </Box>
              </RadioGroup>
            </Box>
          )}

          {selectedAddressId === 'new' && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Box component="button" type="button" onClick={handleCurrentLocation} disabled={gettingLocation} sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1, px: 2, borderRadius: 2, border: '1px solid', borderColor: 'primary.main', bgcolor: alpha('#0A5CB8', 0.05), color: 'primary.main', cursor: gettingLocation ? 'wait' : 'pointer', fontWeight: 600, transition: 'all 0.2s', '&:hover': { bgcolor: alpha('#0A5CB8', 0.1) }, opacity: gettingLocation ? 0.7 : 1 }}>
                  {gettingLocation ? <CircularProgress size={16} color="primary" /> : <MyLocationIcon fontSize="small" />} 
                  {gettingLocation ? 'Locating...' : 'Use Current Location'}
                </Box>
              </Box>
              {locationError && <Alert severity="warning" role="alert" onClose={() => setLocationError(null)} sx={{ mb: 2 }}>{locationError}</Alert>}
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <Controller name="addressLine1" control={control} rules={{ required: 'Address Line 1 is required' }} render={({ field }) => (
                    <TextField {...field} fullWidth size="small" label="House / Flat / Block No." variant="outlined" error={!!errors.addressLine1} helperText={errors.addressLine1?.message} />
                  )} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Controller name="addressLine2" control={control} render={({ field }) => (
                    <TextField {...field} fullWidth size="small" label="Apartment / Building Name" variant="outlined" />
                  )} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller name="area" control={control} rules={{ required: 'Area is required' }} render={({ field }) => (
                    <TextField {...field} fullWidth size="small" label="Area / Locality" variant="outlined" error={!!errors.area} helperText={errors.area?.message} />
                  )} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller name="landmark" control={control} render={({ field }) => (
                    <TextField {...field} fullWidth size="small" label="Landmark (Optional)" variant="outlined" />
                  )} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller name="city" control={control} rules={{ required: 'City is required' }} render={({ field }) => (
                    <TextField {...field} fullWidth size="small" label="City" variant="outlined" error={!!errors.city} helperText={errors.city?.message} />
                  )} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller name="pincode" control={control} rules={{ required: 'Pincode is required', pattern: { value: /^[0-9]{6}$/, message: 'Valid 6 digit pincode required' } }} render={({ field }) => (
                    <TextField {...field} fullWidth size="small" label="Pincode" variant="outlined" slotProps={{ htmlInput: { maxLength: 6 } }} error={!!errors.pincode} helperText={errors.pincode?.message} />
                  )} />
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      )}

      {formError && <Alert severity="error" role="alert" sx={{ mb: 3 }}>{formError}</Alert>}

      <WizardNav onBack={() => router.back()} submit loading={isSubmitting} nextLabel={isSubmitting ? 'Saving...' : 'Continue to Schedule'} />
    </Box>
  );
}
