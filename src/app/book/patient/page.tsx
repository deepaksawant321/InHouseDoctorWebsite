'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import {
  Alert, Box, Button, Card, CardActionArea, CardContent, CircularProgress, Collapse, MenuItem, TextField, Typography, alpha, useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { patientsApi } from '@/services/api';
import { useBooking } from '@/providers/BookingProvider';
import { WizardNav } from '@/features/booking/WizardNav';
import { StepHeader } from '@/features/booking/StepHeader';

interface NewPatientForm {
  fullName: string;
  relationship: string;
  age: number;
  gender: string;
  mobileNo: string;
}

interface PatientRow {
  id: string;
  fullName: string;
  age?: number | null;
  relationship?: string;
  gender?: string;
}

const RELATIONSHIPS = ['Self', 'Spouse', 'Child', 'Parent', 'Other'];
const GENDERS = ['Male', 'Female', 'Other'];

export default function SelectPatient() {
  const router = useRouter();
  const theme = useTheme();
  const { state, setPatient } = useBooking();

  const [patients, setPatients] = useState<PatientRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<NewPatientForm>({
    defaultValues: { fullName: '', relationship: 'Self', age: 30, gender: 'Male', mobileNo: '' },
  });

  const toList = (res: { data: PatientRow[] | { data?: PatientRow[] } }): PatientRow[] => (Array.isArray(res.data) ? res.data : (res.data?.data || []));

  useEffect(() => {
    patientsApi.getAll()
      .then((res) => {
        const list = toList(res);
        setPatients(list);
        // First-time users have nobody saved yet, so open the form straight away.
        if (list.length === 0) setAdding(true);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // A remembered choice only counts if that patient is still in the list (it may have been deleted).
  const selectedId = patients.some((p) => p.id === state.patientId) ? state.patientId : null;

  const handleContinue = () => {
    if (selectedId) router.push('/book/address');
  };

  const onSave = async (data: NewPatientForm) => {
    setSaveError(null);
    setSaving(true);
    try {
      const res = await patientsApi.create({
        fullName: data.fullName.trim(),
        relationship: data.relationship,
        age: Number(data.age),
        gender: data.gender,
        mobileNo: data.mobileNo,
      });
      const created = res.data?.data ?? res.data;
      // Refresh the list so the new patient shows up, then select them.
      const list = toList(await patientsApi.getAll());
      setPatients(list);
      const newId = created?.id ?? list.find((p) => p.fullName === data.fullName.trim())?.id;
      if (newId) setPatient(newId, data.fullName.trim());
      reset();
      setAdding(false);
    } catch (err) {
      console.error(err);
      setSaveError('We could not save this patient. Please check the details and try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <StepHeader icon={<PeopleIcon />} title="Who is this booking for?" subtitle="Choose a family member or add a new patient, then continue." />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={2}>
            {patients.map((p) => {
              const ageLabel = p.age != null ? `${p.age} yrs` : 'Age not set';
              const isSelected = selectedId === p.id;
              return (
                <Grid size={{ xs: 12, sm: 6 }} key={p.id}>
                  <Card elevation={0} sx={{ borderRadius: '20px', border: '2px solid', borderColor: isSelected ? 'primary.main' : 'divider', bgcolor: isSelected ? alpha(theme.palette.primary.main, 0.06) : undefined, transition: 'all 0.2s ease', '&:hover': { borderColor: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.04) } }}>
                    <CardActionArea onClick={() => setPatient(p.id, p.fullName)} aria-pressed={isSelected} sx={{ p: 2.5 }}>
                      <CardContent sx={{ p: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ width: 44, height: 44, flexShrink: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: isSelected ? 'primary.main' : alpha(theme.palette.primary.main, 0.1), color: isSelected ? 'white' : 'primary.main' }}>
                          <PersonIcon />
                        </Box>
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.3, overflowWrap: "anywhere" }}>{p.fullName}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {[p.relationship, ageLabel, p.gender].filter(Boolean).join(' • ')}
                          </Typography>
                        </Box>
                        {isSelected && <CheckCircleIcon color="primary" aria-label="Selected" />}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}

            {!adding && (
              <Grid size={{ xs: 12, sm: 6 }}>
                <Card elevation={0} sx={{ borderRadius: '20px', border: '2px dashed', borderColor: 'divider', height: '100%', minHeight: 88, transition: 'all 0.2s ease', '&:hover': { borderColor: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.04) } }}>
                  <CardActionArea onClick={() => setAdding(true)} sx={{ p: 2.5, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CardContent sx={{ p: 0, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <AddCircleIcon color="primary" sx={{ fontSize: 32 }} />
                      <Typography variant="subtitle1" color="primary" sx={{ fontSize: '1.05rem', fontWeight: 700 }}>
                        Add new patient
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            )}
          </Grid>

          <Collapse in={adding} unmountOnExit>
            <Box component="form" onSubmit={handleSubmit(onSave)} noValidate sx={{ mt: 3, p: { xs: 2.5, sm: 3 }, borderRadius: '20px', border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
              <Typography component="h2" variant="subtitle1" sx={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                <PersonAddIcon color="primary" /> New patient details
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller name="fullName" control={control} rules={{ required: 'Name is required', validate: (v) => v.trim().length >= 2 || 'Name must be at least 2 characters' }} render={({ field }) => (
                    <TextField {...field} fullWidth size="small" label="Full name" required error={!!errors.fullName} helperText={errors.fullName?.message} />
                  )} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller name="relationship" control={control} render={({ field }) => (
                    <TextField {...field} select fullWidth size="small" label="Relationship">
                      {RELATIONSHIPS.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                    </TextField>
                  )} />
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Controller name="age" control={control} rules={{ required: 'Age is required', min: { value: 0, message: 'Age must be 0 to 150' }, max: { value: 150, message: 'Age must be 0 to 150' } }} render={({ field }) => (
                    <TextField {...field} fullWidth size="small" type="number" label="Age" required error={!!errors.age} helperText={errors.age?.message} />
                  )} />
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Controller name="gender" control={control} render={({ field }) => (
                    <TextField {...field} select fullWidth size="small" label="Gender">
                      {GENDERS.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                    </TextField>
                  )} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Controller name="mobileNo" control={control} rules={{ pattern: { value: /^$|^[6-9][0-9]{9}$/, message: 'Enter a valid 10-digit mobile number' } }} render={({ field }) => (
                    <TextField {...field} fullWidth size="small" label="Mobile (optional)" error={!!errors.mobileNo} helperText={errors.mobileNo?.message} slotProps={{ htmlInput: { inputMode: 'numeric', maxLength: 10 } }} />
                  )} />
                </Grid>
              </Grid>

              {saveError && <Alert severity="error" role="alert" sx={{ mt: 2 }}>{saveError}</Alert>}

              <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'flex-end', mt: 3 }}>
                {patients.length > 0 && (
                  <Button type="button" color="inherit" onClick={() => { setAdding(false); setSaveError(null); reset(); }} disabled={saving} sx={{ color: 'text.secondary' }}>
                    Cancel
                  </Button>
                )}
                <Button type="submit" variant="contained" disabled={saving} startIcon={saving ? <CircularProgress size={16} color="inherit" /> : <PersonAddIcon />}>
                  {saving ? 'Saving...' : 'Save patient'}
                </Button>
              </Box>
            </Box>
          </Collapse>
        </>
      )}

      <Box sx={{ mt: 4 }}>
        <WizardNav onBack={() => router.back()} onNext={handleContinue} nextDisabled={!selectedId} nextLabel="Continue to Address" />
      </Box>
    </Box>
  );
}
