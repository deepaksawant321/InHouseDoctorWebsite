'use client';

import { Box, Container, Typography, Grid, useTheme, alpha, Card, CardContent, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/constants/animations';
import VerifiedIcon from '@mui/icons-material/Verified';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

// Placeholder data - replace with real data from CMS/backend
const DOCTORS = [
  {
    id: 1,
    name: 'Dr. [Doctor Name]',
    specialization: 'General Physician',
    qualification: 'MBBS, MD',
    experience: '10+ Years',
    registration: '[Reg Number]',
    languages: ['English', 'Hindi', 'Marathi'],
  },
  {
    id: 2,
    name: 'Dr. [Doctor Name]',
    specialization: 'Physiotherapist',
    qualification: 'BPT, MPT',
    experience: '8+ Years',
    registration: '[Reg Number]',
    languages: ['English', 'Hindi'],
  },
  {
    id: 3,
    name: 'Dr. [Doctor Name]',
    specialization: 'General Physician',
    qualification: 'MBBS',
    experience: '5+ Years',
    registration: '[Reg Number]',
    languages: ['English', 'Hindi', 'Gujarati'],
  }
];

export const DoctorProfiles = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: isDark ? alpha('#111827', 0.5) : alpha('#F1F5F9', 0.7) }}>
      <Container maxWidth="lg">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <motion.div variants={fadeInUp}>
            <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
              <Typography variant="caption" sx={{ fontWeight: 600, color: 'primary.main', textTransform: 'uppercase', letterSpacing: 1.5 }}>
                Meet Our Experts
              </Typography>
              <Typography variant="h2" sx={{ mt: 1, mb: 1.5, fontSize: { xs: '2rem', md: '2.75rem' } }}>
                Verified Medical Professionals
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 600, mx: 'auto' }}>
                Every doctor on our platform is background-checked and highly experienced.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={4}>
            {DOCTORS.map((doctor) => (
              <Grid size={{ xs: 12, md: 4 }} key={doctor.id}>
                <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.03)' }}>
                    <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid', borderColor: 'divider', bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
                      <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: 'primary.main', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <MedicalInformationIcon fontSize="large" />
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {doctor.name}
                          <VerifiedIcon color="primary" sx={{ fontSize: 18 }} />
                        </Typography>
                        <Typography variant="body2" color="text.secondary">{doctor.specialization}</Typography>
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 3, flexGrow: 1 }}>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 6 }}>
                          <Typography variant="caption" color="text.secondary">Qualification</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{doctor.qualification}</Typography>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                          <Typography variant="caption" color="text.secondary">Experience</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{doctor.experience}</Typography>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <Typography variant="caption" color="text.secondary">Reg. No.</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{doctor.registration}</Typography>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>Languages</Typography>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {doctor.languages.map(lang => (
                              <Chip key={lang} label={lang} size="small" variant="outlined" />
                            ))}
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};
