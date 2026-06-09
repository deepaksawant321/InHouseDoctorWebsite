'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface BookingState {
  doctorId: string | null;
  doctorName: string;
  symptoms: string;
  scheduledDate: string | null;
  amount: number;
}

interface BookingContextType {
  state: BookingState;
  setDoctor: (id: string, name: string, fee: number) => void;
  setSymptoms: (symptoms: string) => void;
  setScheduledDate: (date: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>({
    doctorId: null,
    doctorName: '',
    symptoms: '',
    scheduledDate: new Date(Date.now() + 86400000).toISOString(), // Default Tomorrow
    amount: 0,
  });

  const setDoctor = (id: string, name: string, fee: number) => setState(s => ({ ...s, doctorId: id, doctorName: name, amount: fee }));
  const setSymptoms = (symptoms: string) => setState(s => ({ ...s, symptoms }));
  const setScheduledDate = (date: string) => setState(s => ({ ...s, scheduledDate: date }));

  return (
    <BookingContext.Provider value={{ state, setDoctor, setSymptoms, setScheduledDate }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within BookingProvider');
  return context;
}
