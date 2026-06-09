'use client';

import { Box, TextField } from '@mui/material';
import { useRef, useState, KeyboardEvent, ClipboardEvent } from 'react';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const OTPInput = ({ value, onChange }: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(value.split('').concat(Array(4).fill('')).slice(0, 4));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1); // Keep only the last character entered
    setOtp(newOtp);
    onChange(newOtp.join(''));

    // Move to next input
    if (val && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, 4).replace(/\D/g, '');
    if (!pasteData) return;

    const newOtp = [...otp];
    pasteData.split('').forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    onChange(newOtp.join(''));

    // Focus last filled input
    const focusIndex = Math.min(pasteData.length, 3);
    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, justifyContent: 'center' }}>
      {otp.map((digit, index) => (
        <TextField
          key={index}
          inputRef={(el) => { inputsRef.current[index] = el; }}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          slotProps={{
            htmlInput: {
              maxLength: 1,
              style: { textAlign: 'center', fontSize: '1.5rem', fontWeight: 700, padding: '16px 14px' },
            }
          }}
          sx={{
            width: { xs: 45, sm: 56 },
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '&.Mui-focused fieldset': {
                borderWidth: '2px',
              },
            },
          }}
        />
      ))}
    </Box>
  );
};
