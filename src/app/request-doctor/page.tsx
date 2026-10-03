import { Metadata } from 'next';
import { RequestDoctorGate } from './RequestDoctorGate';

// Pure redirect entry point (login or booking journey); nothing here should be indexed.
export const metadata: Metadata = {
  title: 'Request Doctor',
  robots: { index: false, follow: false },
};

export default function RequestDoctorPage() {
  return <RequestDoctorGate />;
}
