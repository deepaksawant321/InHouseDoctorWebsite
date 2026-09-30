import type { Metadata } from 'next';
import DashboardShell from './DashboardShell';

// Patient dashboard is private: keep it out of search indexes (matches the X-Robots-Tag header)
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
