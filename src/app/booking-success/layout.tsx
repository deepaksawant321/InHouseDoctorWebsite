import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Booking Confirmed',
  robots: { index: false, follow: false },
  alternates: { canonical: '/booking-success' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
