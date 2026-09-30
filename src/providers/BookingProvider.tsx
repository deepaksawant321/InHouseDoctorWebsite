'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface BookingState {
  patientId: string | null;
  patientName: string;
  serviceId: number | null;
  serviceName: string;
  addressId: string | null;
  symptoms: string;
  scheduledDate: string | null;
  preferredTime: string;
  amount: number;
}

interface BookingContextType {
  state: BookingState;
  setPatient: (id: string, name: string) => void;
  setService: (id: number, name: string, basePrice: number) => void;
  setAddress: (id: string) => void;
  setSymptoms: (symptoms: string) => void;
  setScheduledDate: (date: string, slotLabel?: string) => void;
  prescriptionFile: File | null;
  setPrescriptionFile: (file: File | null) => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const STORAGE_KEY = 'bookingWizardState';

const initialState = (): BookingState => ({
  patientId: null,
  patientName: '',
  serviceId: null,
  serviceName: '',
  addressId: null,
  symptoms: '',
  scheduledDate: null,
  preferredTime: '',
  amount: 0,
});

export function BookingProvider({ children }: { children: ReactNode }) {
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [state, setState] = useState<BookingState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  // Restore wizard progress after a refresh or a login redirect (sessionStorage is per-tab).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setState((s) => ({ ...s, ...JSON.parse(raw) }));
    } catch {
      // ignore corrupt/blocked storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage unavailable — wizard still works in memory
    }
  }, [state, hydrated]);

  const setPatient = (id: string, name: string) => setState(s => ({ ...s, patientId: id, patientName: name }));
  const setService = (id: number, name: string, basePrice: number) => setState(s => ({ ...s, serviceId: id, serviceName: name, amount: basePrice }));
  const setAddress = (id: string) => setState(s => ({ ...s, addressId: id }));
  const setSymptoms = (symptoms: string) => setState(s => ({ ...s, symptoms }));
  const setScheduledDate = (date: string, slotLabel?: string) => setState(s => ({ ...s, scheduledDate: date, preferredTime: slotLabel ?? '' }));
  const resetBooking = () => {
    setState(initialState());
    setPrescriptionFile(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <BookingContext.Provider value={{ state, setPatient, setService, setAddress, setSymptoms, setScheduledDate, prescriptionFile, setPrescriptionFile, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within BookingProvider');
  return context;
}
