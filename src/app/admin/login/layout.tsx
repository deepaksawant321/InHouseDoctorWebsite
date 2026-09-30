import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
  alternates: { canonical: '/admin/login' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
