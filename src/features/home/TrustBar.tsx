'use client';

import { Box, Container, Typography, Grid, alpha } from '@mui/material';
import { m as motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/constants/animations';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HomeIcon from '@mui/icons-material/Home';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const items = [
  { icon: <AssignmentIcon />, title: 'Request a Doctor', text: 'Tell us what you need in a few taps', color: '#0A5CB8' },
  { icon: <VerifiedUserIcon />, title: 'Verified Doctors', text: 'Background-checked, licensed practitioners', color: '#14B5A5' },
  { icon: <HomeIcon />, title: 'Home Visits', text: 'Care delivered right to your doorstep', color: '#2B8CE6' },
  { icon: <SupportAgentIcon />, title: '24x7 Support', text: 'Help whenever you need it', color: '#14B5A5' },
];

export const TrustBar = () => (
  <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: 'background.paper' }}>
    <Container maxWidth="xl">
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
        <Grid container spacing={{ xs: 3, md: 2 }} sx={{ alignItems: 'center' }}>
          {items.map((item) => (
            <Grid size={{ xs: 6, md: 2 }} key={item.title}>
              <motion.div variants={fadeInUp}>
                <Box sx={{ textAlign: 'center', px: 1 }}>
                  <Box
                    sx={{
                      width: 72, height: 72, borderRadius: '22px', mx: 'auto', mb: 2,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      bgcolor: alpha(item.color, 0.12), color: item.color,
                      '& svg': { fontSize: 34 },
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 0.5 }}>{item.title}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{item.text}</Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
          <Grid size={{ xs: 12, md: 4 }}>
            <motion.div variants={fadeInUp}>
              <Box
                sx={{
                  pl: { md: 4 }, pt: { xs: 3, md: 0 },
                  borderLeft: { md: '1px solid' }, borderTop: { xs: '1px solid', md: 'none' }, borderColor: 'divider',
                  display: 'flex', gap: 1.5, alignItems: 'flex-start',
                }}
              >
                <Typography aria-hidden sx={{ fontSize: '4rem', lineHeight: 0.8, color: alpha('#0A5CB8', 0.2), fontFamily: 'Georgia, serif' }}>&ldquo;</Typography>
                <Box>
                  <Typography sx={{ fontSize: '1.05rem', color: 'text.secondary', lineHeight: 1.6 }}>
                    Good health is not a luxury, it&apos;s a foundation for a brighter tomorrow.
                  </Typography>
                  <Typography sx={{ mt: 1, color: 'secondary.dark', fontWeight: 700, fontStyle: 'italic' }}>Stay Healthy</Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  </Box>
);
