'use client';

import { Box, Typography, Button, TextField, Grid, Card, CardContent, MenuItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AddPatient() {
  const router = useRouter();

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
        Add New Patient
      </Typography>

      <Card elevation={0} sx={{ borderRadius: '24px', border: '1px solid', borderColor: 'divider' }}>
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <form onSubmit={(e) => { e.preventDefault(); router.push('/dashboard/patients'); }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Full Name" required variant="outlined" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField select fullWidth label="Relationship" required defaultValue="">
                  <MenuItem value="Self">Self</MenuItem>
                  <MenuItem value="Spouse">Spouse</MenuItem>
                  <MenuItem value="Child">Child</MenuItem>
                  <MenuItem value="Parent">Parent</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField fullWidth label="Age" type="number" required />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField select fullWidth label="Gender" required defaultValue="">
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField select fullWidth label="Blood Group" defaultValue="">
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="AB-">AB-</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Mobile Number" required />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Emergency Contact" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth label="Medical Notes (Allergies, chronic conditions, etc.)" multiline rows={4} />
              </Grid>
              <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
                <Button type="submit" variant="contained" size="large" sx={{ borderRadius: 2, px: 4, py: 1.5, textTransform: 'none', fontWeight: 600 }}>
                  Save Patient
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
