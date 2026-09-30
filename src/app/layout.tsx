import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/providers/AppProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.doctordoorstep.com'),
  title: {
    default: 'Doctor at Home in Mumbai | Doctor Doorstep',
    template: '%s | Doctor Doorstep',
  },
  description: 'Book verified doctors for convenient home visits across Mumbai. Doctor Doorstep provides trusted home doctor consultations with easy booking and 24×7 support.',
  authors: [{ name: 'InHouse Doctor' }],
  creator: 'InHouse Doctor',
  publisher: 'InHouse Doctor',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Doctor at Home in Mumbai | Doctor Doorstep',
    description: 'Book verified doctors for convenient home visits across Mumbai. Doctor Doorstep provides trusted home doctor consultations with easy booking and 24×7 support.',
    url: 'https://www.doctordoorstep.com',
    siteName: 'Doctor Doorstep',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Doctor at Home in Mumbai | Doctor Doorstep',
    description: 'Book verified doctors for convenient home visits across Mumbai. Doctor Doorstep provides trusted home doctor consultations with easy booking and 24×7 support.',
    creator: '@InHouseDoctor',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: './', // resolved per route; pages may override with an absolute URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AppProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
