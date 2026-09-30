import type { Metadata } from 'next';
import BookingShell from './BookingShell';

// Booking is a private, transactional flow: keep it out of search indexes (matches the X-Robots-Tag header)
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <BookingShell>{children}</BookingShell>;
}
