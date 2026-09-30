'use client';

import { Box, Typography, Button, TextField, Grid, Card, CardContent, MenuItem, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { patientsApi } from '@/services/api';

interface PatientForm {
  fullName: string;
  relationship: string;
  age: number;
  gender: string;
  bloodGroup: string;
  mobileNo: string;
  emergencyContact: string;
  medicalNotes: string;
}

export default function EditPatient() {
  const router = useRouter();
  const params = useParams();
  const patientId = params.id as string;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const { control, handleSubmit, formState: { errors }, reset } = useForm<PatientForm>({
    defaultValues: {
      fullName: '',
      relationship: 'Self',
      age: 30,
      gender: 'Male',
      bloodGroup: 'O+',
      mobileNo: '',
      emergencyContact: '',
      medicalNotes: '',
    }
  });

  useEffect(() => {
    if (patientId) {
      patientsApi.getById(patientId).then(res => {
        const data = res.data;
        if (data) {
          reset({
            fullName: data.fullName || '',
            relationship: data.relationship || 'Self',
            age: data.age || 30,
            gender: data.gender || 'Male',
            bloodGroup: data.bloodGroup || 'O+',
            mobileNo: data.mobileNo || '',
            emergencyContact: data.emergencyContact || '',
            medicalNotes: data.medicalNotes || '',
          });
        }
      }).catch(err => {
        console.error(err);
        alert('Failed to load patient');
      }).finally(() => setLoading(false));
    }
  }, [patientId, reset]);

  const onSubmit = async (data: PatientForm) => {
    setIsSubmitting(true);
    try {
      await patientsApi.update(patientId, {
        fullName: data.fullName,
        relationship: data.relationship,
        age: Number(data.age),
        gender: data.gender,
        bloodGroup: data.bloodGroup,
        mobileNo: data.mobileNo,
        emergencyContact: data.emergencyContact,
        medicalNotes: data.medicalNotes,
      });
      router.push('/dashboard/patients');
    } catch (err) {
      console.error(err);
      alert('Failed to update patient. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ maxWidth: 800 }}>
      <Button
        component={Link}
        href="/dashboard/patients"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3, textTransform: 'none', color: 'text.secondary' }}
      >
        Back to Patients
      </Button>

      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
        Edit Patient
      </Typography>

      <Card elevation={0} sx={{ borderRadius: '24px', border: '1px solid', borderColor: 'divider' }}>
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller name="fullName" control={control} rules={{ required: 'Name is required', validate: (v: string) => v.trim().length >= 2 || 'Name must be at least 2 characters' }} render={({ field }) => (
                  <TextField {...field} fullWidth label="Full Name" required variant="outlined" error={!!errors.fullName} helperText={errors.fullName?.message} />
                )} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller name="relationship" control={control} rules={{ required: 'Relationship is required' }} render={({ field }) => (
                  <TextField {...field} select fullWidth label="Relationship" required>
                    <MenuItem value="Self">Self</MenuItem>
                    <MenuItem value="Spouse">Spouse</MenuItem>
                    <MenuItem value="Child">Child</MenuItem>
                    <MenuItem value="Parent">Parent</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                )} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Controller name="age" control={control} rules={{ required: 'Age is required', min: { value: 0, message: 'Age must be between 0 and 150' }, max: { value: 150, message: 'Age must be between 0 and 150' } }} render={({ field }) => (
                  <TextField {...field} fullWidth label="Age" type="number" required error={!!errors.age} helperText={errors.age?.message} />
                )} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Controller name="gender" control={control} rules={{ required: 'Gender is required' }} render={({ field }) => (
                  <TextField {...field} select fullWidth label="Gender" required>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                )} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Controller name="bloodGroup" control={control} render={({ field }) => (
                  <TextField {...field} select fullWidth label="Blood Group">
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                    <MenuItem value="AB+">AB+</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                  </TextField>
                )} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller name="mobileNo" control={control} rules={{ pattern: { value: /^$|^[6-9][0-9]{9}$/, message: 'Enter a valid 10-digit mobile number' } }} render={({ field }) => (
                  <TextField {...field} fullWidth label="Mobile Number" error={!!errors.mobileNo} helperText={errors.mobileNo?.message} slotProps={{ htmlInput: { inputMode: 'numeric', maxLength: 10 } }} />
                )} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller name="emergencyContact" control={control} rules={{ pattern: { value: /^$|^[6-9][0-9]{9}$/, message: 'Enter a valid 10-digit mobile number' } }} render={({ field }) => (
                  <TextField {...field} fullWidth label="Emergency Contact" error={!!errors.emergencyContact} helperText={errors.emergencyContact?.message} slotProps={{ htmlInput: { inputMode: 'numeric', maxLength: 10 } }} />
                )} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Controller name="medicalNotes" control={control} render={({ field }) => (
                  <TextField {...field} fullWidth label="Medical Notes (Allergies, chronic conditions, etc.)" multiline rows={4} />
                )} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Button type="submit" variant="contained" size="large" disabled={isSubmitting} sx={{ mt: 2, borderRadius: 2, px: 4, py: 1.5, textTransform: 'none', fontWeight: 600 }}>
                  {isSubmitting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Save Changes'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
