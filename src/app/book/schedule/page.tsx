'use client';

import { Box, Typography, alpha } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const dates = ['Today', 'Tomorrow', 'Choose Date'];
const timeSlots = [
  { id: 'morning', label: 'Morning', time: '09:00 AM - 12:00 PM' },
  { id: 'afternoon', label: 'Afternoon', time: '12:00 PM - 04:00 PM' },
  { id: 'evening', label: 'Evening', time: '04:00 PM - 08:00 PM' },
];

export default function SchedulePage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      router.push('/book/prescription');
    }
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
        Schedule Visit
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
        Select your preferred date and time for the doctor to arrive.
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <CalendarMonthIcon color="primary" /> Select Date
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 6 }}>
        {dates.map((date) => (
          <Grid size={{ xs: 4 }} key={date}>
            <Box
              onClick={() => setSelectedDate(date)}
              sx={{
                p: 2, borderRadius: '16px', textAlign: 'center', cursor: 'pointer',
                bgcolor: selectedDate === date ? alpha('#4F46E5', 0.1) : 'background.paper',
                border: '2px solid', borderColor: selectedDate === date ? 'primary.main' : 'divider',
                fontWeight: selectedDate === date ? 700 : 500,
                color: selectedDate === date ? 'primary.main' : 'text.primary',
                transition: 'all 0.2s', '&:hover': { borderColor: 'primary.main' }
              }}
            >
              {date}
            </Box>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <AccessTimeIcon color="primary" /> Select Time Slot
      </Typography>

      <Grid container spacing={2} sx={{ mb: 8 }}>
        {timeSlots.map((slot) => (
          <Grid size={{ xs: 12, sm: 4 }} key={slot.id}>
            <Box
              onClick={() => setSelectedTime(slot.id)}
              sx={{
                p: 2, borderRadius: '16px', textAlign: 'center', cursor: 'pointer',
                bgcolor: selectedTime === slot.id ? alpha('#4F46E5', 0.1) : 'background.paper',
                border: '2px solid', borderColor: selectedTime === slot.id ? 'primary.main' : 'divider',
                transition: 'all 0.2s', '&:hover': { borderColor: 'primary.main' }
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: selectedTime === slot.id ? 'primary.main' : 'text.primary' }}>
                {slot.label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {slot.time}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box
          component="button" type="button" onClick={() => router.back()}
          sx={{
            py: 1.5, px: 4, borderRadius: '16px', border: '1px solid', borderColor: 'divider', cursor: 'pointer',
            bgcolor: 'transparent', color: 'text.primary', fontWeight: 600, fontSize: '1rem',
            transition: 'all 0.2s', '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          Back
        </Box>
        <Box
          component="button" type="button" onClick={handleContinue} disabled={!selectedDate || !selectedTime}
          sx={{
            py: 1.5, px: 6, borderRadius: '16px', border: 'none', cursor: (selectedDate && selectedTime) ? 'pointer' : 'not-allowed',
            background: (selectedDate && selectedTime) ? 'linear-gradient(135deg, #4F46E5, #0D9488)' : 'action.disabledBackground', 
            color: (selectedDate && selectedTime) ? 'white' : 'text.disabled', 
            fontWeight: 700, fontSize: '1rem', boxShadow: (selectedDate && selectedTime) ? '0 8px 24px rgba(25, 118, 210, 0.3)' : 'none',
            transition: 'all 0.2s', '&:hover': { transform: (selectedDate && selectedTime) ? 'translateY(-2px)' : 'none' },
          }}
        >
          Continue to Prescription
        </Box>
      </Box>
    </Box>
  );
}
