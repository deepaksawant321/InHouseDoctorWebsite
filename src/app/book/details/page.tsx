'use client';

import { Box, Typography, TextField, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useBooking } from '@/providers/BookingProvider';

interface PatientForm {
  fullName: string;
  email: string;
  age: number | string;
  gender: string;
  symptoms: string;
}

export default function PatientDetailsPage() {
  const router = useRouter();
  const { setSymptoms } = useBooking();
  
  const { control, handleSubmit, formState: { errors } } = useForm<PatientForm>({
    defaultValues: {
      fullName: '',
      email: '',
      age: '',
      gender: '',
      symptoms: ''
    }
  });

  const onSubmit = (data: PatientForm) => {
    setSymptoms(data.symptoms);
    router.push('/book/address');
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
        Patient Details
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
        Provide information about the person who needs the consultation.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="fullName"
            control={control}
            rules={{ required: 'Full Name is required' }}
            render={({ field }) => (
              <TextField 
                {...field} 
                fullWidth label="Full Name" variant="outlined" 
                error={!!errors.fullName} helperText={errors.fullName?.message}
              />
            )}
          />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="email"
            control={control}
            rules={{ 
              required: 'Email is required',
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' }
            }}
            render={({ field }) => (
              <TextField 
                {...field} 
                fullWidth label="Email Address" variant="outlined" type="email"
                error={!!errors.email} helperText={errors.email?.message}
              />
            )}
          />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 3 }}>
          <Controller
            name="age"
            control={control}
            rules={{ required: 'Age is required', min: { value: 0, message: 'Invalid age' } }}
            render={({ field }) => (
              <TextField 
                {...field} 
                fullWidth label="Age" variant="outlined" type="number"
                error={!!errors.age} helperText={errors.age?.message}
              />
            )}
          />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 3 }}>
          <Controller
            name="gender"
            control={control}
            rules={{ required: 'Gender is required' }}
            render={({ field }) => (
              <TextField 
                {...field} select
                fullWidth label="Gender" variant="outlined"
                error={!!errors.gender} helperText={errors.gender?.message}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="symptoms"
            control={control}
            rules={{ required: 'Please describe the symptoms' }}
            render={({ field }) => (
              <TextField 
                {...field} 
                fullWidth label="Describe Symptoms / Reason for Visit" 
                variant="outlined" multiline rows={4}
                error={!!errors.symptoms} helperText={errors.symptoms?.message}
              />
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
          Continue to Address
        </Box>
      </Box>
    </Box>
  );
}
