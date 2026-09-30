import type { Metadata } from 'next';

// Admin area is private: keep it out of search indexes (matches the X-Robots-Tag header)
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
