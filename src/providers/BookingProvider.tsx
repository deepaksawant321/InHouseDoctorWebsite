'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface BookingState {
  patientId: string | null;
  patientName: string;
  serviceId: number | null;
  serviceName: string;
  addressId: string | null;
  symptoms: string;
  scheduledDate: string | null;
  amount: number;
}

interface BookingContextType {
  state: BookingState;
  setPatient: (id: string, name: string) => void;
  setService: (id: number, name: string, basePrice: number) => void;
  setAddress: (id: string) => void;
  setSymptoms: (symptoms: string) => void;
  setScheduledDate: (date: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>({
    patientId: null,
    patientName: '',
    serviceId: null,
    serviceName: '',
    addressId: null,
    symptoms: '',
    scheduledDate: new Date(Date.now() + 86400000).toISOString(), // Default Tomorrow
    amount: 0,
  });

  const setPatient = (id: string, name: string) => setState(s => ({ ...s, patientId: id, patientName: name }));
  const setService = (id: number, name: string, basePrice: number) => setState(s => ({ ...s, serviceId: id, serviceName: name, amount: basePrice }));
  const setAddress = (id: string) => setState(s => ({ ...s, addressId: id }));
  const setSymptoms = (symptoms: string) => setState(s => ({ ...s, symptoms }));
  const setScheduledDate = (date: string) => setState(s => ({ ...s, scheduledDate: date }));

  return (
    <BookingContext.Provider value={{ state, setPatient, setService, setAddress, setSymptoms, setScheduledDate }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within BookingProvider');
  return context;
}
