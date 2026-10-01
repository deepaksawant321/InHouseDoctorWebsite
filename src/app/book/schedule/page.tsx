'use client';

import { Box, Typography, TextField, alpha } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import HealingIcon from '@mui/icons-material/Healing';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { WizardNav } from '@/features/booking/WizardNav';
import { StepHeader, SectionTitle } from '@/features/booking/StepHeader';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useBooking } from '@/providers/BookingProvider';

const dates = ['Today', 'Tomorrow', 'Choose Date'];
const timeSlots = [
  { id: 'morning', label: 'Morning', time: '09:00 AM - 12:00 PM', startHour: 9, icon: <WbSunnyIcon fontSize="small" /> },
  { id: 'afternoon', label: 'Afternoon', time: '12:00 PM - 04:00 PM', startHour: 12, icon: <WbTwilightIcon fontSize="small" /> },
  { id: 'evening', label: 'Evening', time: '04:00 PM - 08:00 PM', startHour: 16, icon: <NightsStayIcon fontSize="small" /> },
];

const pad = (n: number) => String(n).padStart(2, '0');
const toLocalDateInput = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/** Start of the chosen slot on the chosen day, in the user's local time. */
function buildSlotStart(selectedDate: string | null, customDate: string, startHour: number): Date | null {
  const base = new Date();
  if (selectedDate === 'Tomorrow') base.setDate(base.getDate() + 1);
  else if (selectedDate === 'Choose Date') {
    if (!customDate) return null;
    const [y, m, d] = customDate.split('-').map(Number);
    base.setFullYear(y, m - 1, d);
  } else if (selectedDate !== 'Today') return null;
  base.setHours(startHour, 0, 0, 0);
  return base;
}

const optionKeyHandler = (action: () => void) => (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    action();
  }
};

export default function SchedulePage() {
  const router = useRouter();
  const { state, setScheduledDate, setSymptoms } = useBooking();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [customDate, setCustomDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const chosenSlot = timeSlots.find((t) => t.id === selectedTime);
  const chosenStart = chosenSlot ? buildSlotStart(selectedDate, customDate, chosenSlot.startHour) : null;
  const chosenPast = !!chosenStart && chosenStart.getTime() <= Date.now();

  const handleContinue = () => {
    if (chosenStart && !chosenPast) {
      setScheduledDate(chosenStart.toISOString(), chosenSlot?.time);
      router.push('/book/prescription');
    }
  };

  return (
    <Box>
      <StepHeader icon={<CalendarMonthIcon />} title="Schedule Visit" subtitle="Pick a date and a time window for the doctor to arrive." />

      <SectionTitle icon={<EventIcon />}>Select date</SectionTitle>

      <Grid container spacing={1.5} sx={{ mb: 4 }}>
        {dates.map((date) => (
          <Grid size={{ xs: 4 }} key={date}>
            <Box
              role="button"
              tabIndex={0}
              aria-pressed={selectedDate === date}
              onClick={() => setSelectedDate(date)}
              onKeyDown={optionKeyHandler(() => setSelectedDate(date))}
              sx={{
                '&:focus-visible': { outline: '3px solid', outlineColor: 'primary.main', outlineOffset: 2 },
                p: 1.5, borderRadius: '14px', textAlign: 'center', cursor: 'pointer', fontSize: '0.95rem',
                bgcolor: selectedDate === date ? alpha('#0A5CB8', 0.1) : 'background.paper',
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
              <TextField
                type="date"
                fullWidth
                label="Select custom date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: toLocalDateInput(new Date()), 'aria-label': 'Custom visit date' } }}
              />
            </Box>
          </Grid>
        )}
      </Grid>

      <SectionTitle icon={<AccessTimeIcon />}>Select time slot</SectionTitle>

      <Grid container spacing={1.5} sx={{ mb: 4 }}>
        {timeSlots.map((slot) => {
          const start = selectedDate ? buildSlotStart(selectedDate, customDate, slot.startHour) : null;
          const isPast = !!start && start.getTime() <= Date.now();
          return (
          <Grid size={{ xs: 12, sm: 4 }} key={slot.id}>
            <Box
              role="button"
              tabIndex={isPast ? -1 : 0}
              aria-pressed={selectedTime === slot.id}
              aria-disabled={isPast}
              onClick={() => { if (!isPast) setSelectedTime(slot.id); }}
              onKeyDown={optionKeyHandler(() => { if (!isPast) setSelectedTime(slot.id); })}
              sx={{
                '&:focus-visible': { outline: '3px solid', outlineColor: 'primary.main', outlineOffset: 2 },
                opacity: isPast ? 0.45 : 1,
                p: 1.5, borderRadius: '14px', textAlign: 'center', cursor: isPast ? 'not-allowed' : 'pointer',
                bgcolor: selectedTime === slot.id ? alpha('#0A5CB8', 0.1) : 'background.paper',
                border: '2px solid', borderColor: selectedTime === slot.id ? 'primary.main' : 'divider',
                transition: 'all 0.2s', '&:hover': { borderColor: 'primary.main' }
              }}
            >
              <Box sx={{ color: selectedTime === slot.id ? 'primary.main' : 'text.secondary', display: 'flex', justifyContent: 'center', mb: 0.5 }}>{slot.icon}</Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: selectedTime === slot.id ? 'primary.main' : 'text.primary' }}>
                {slot.label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {isPast ? 'Not available' : slot.time}
              </Typography>
            </Box>
          </Grid>
          );
        })}
      </Grid>

      <SectionTitle icon={<HealingIcon />} sx={{ mb: 0.5 }}>What&apos;s the problem?</SectionTitle>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        Optional. A few words help the doctor prepare, for example &quot;fever and cold for 2 days&quot;.
      </Typography>
      <TextField
        fullWidth multiline minRows={3}
        label="Symptoms or reason for visit (optional)"
        value={state.symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        slotProps={{ htmlInput: { maxLength: 500 } }}
        helperText={`${state.symptoms.length}/500`}
        sx={{ mb: 4 }}
      />

      <WizardNav
        onBack={() => router.back()}
        onNext={handleContinue}
        nextDisabled={!selectedDate || !selectedTime || chosenPast || (selectedDate === 'Choose Date' && !customDate)}
        nextLabel="Continue to Prescription"
      />
    </Box>
  );
}
