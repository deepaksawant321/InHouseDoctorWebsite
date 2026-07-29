'use client';

import { Box, Typography, alpha } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useBooking } from '@/providers/BookingProvider';

const dates = ['Today', 'Tomorrow', 'Choose Date'];
const timeSlots = [
  { id: 'morning', label: 'Morning', time: '09:00 AM - 12:00 PM' },
  { id: 'afternoon', label: 'Afternoon', time: '12:00 PM - 04:00 PM' },
  { id: 'evening', label: 'Evening', time: '04:00 PM - 08:00 PM' },
];

export default function SchedulePage() {
  const router = useRouter();
  const { setScheduledDate } = useBooking();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [customDate, setCustomDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      let finalDate = new Date();
      if (selectedDate === 'Tomorrow') finalDate.setDate(finalDate.getDate() + 1);
      else if (selectedDate === 'Choose Date' && customDate) finalDate = new Date(customDate);
      
      // Keep it simple, just store the ISO string of the date
      setScheduledDate(finalDate.toISOString());
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
        {selectedDate === 'Choose Date' && (
          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: '16px', border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>Select Custom Date</Typography>
              <input 
                type="date" 
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                style={{
                  width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e0e0e0',
                  fontSize: '1rem', fontFamily: 'inherit'
                }}
              />
            </Box>
          </Grid>
        )}
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
          component="button" type="button" onClick={handleContinue} 
          disabled={!selectedDate || !selectedTime || (selectedDate === 'Choose Date' && !customDate)}
          sx={{
            py: 1.5, px: 6, borderRadius: '16px', border: 'none', 
            cursor: (selectedDate && selectedTime && (selectedDate !== 'Choose Date' || customDate)) ? 'pointer' : 'not-allowed',
            background: (selectedDate && selectedTime && (selectedDate !== 'Choose Date' || customDate)) ? 'linear-gradient(135deg, #4F46E5, #0D9488)' : 'action.disabledBackground', 
            color: (selectedDate && selectedTime && (selectedDate !== 'Choose Date' || customDate)) ? 'white' : 'text.disabled',  
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
