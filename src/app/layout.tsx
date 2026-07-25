import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/providers/AppProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'InHouse Doctor | Premium Healthcare at Your Doorstep',
    template: '%s | InHouse Doctor',
  },
  description: 'Book verified, premium healthcare professionals for home visits in minutes. General physicians, nursing care, physiotherapy, and elder care delivered to your doorstep.',
  keywords: ['Home Doctor', 'Doctor Home Visit', 'Nursing Care at Home', 'Physiotherapy at Home', 'Elder Care', 'Premium Healthcare', 'Mumbai Doctors'],
  authors: [{ name: 'InHouse Doctor' }],
  creator: 'InHouse Doctor',
  publisher: 'InHouse Doctor',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'InHouse Doctor | Premium Healthcare at Your Doorstep',
    description: 'Getting a doctor at home should be as easy as ordering a cab. Premium healthcare, delivered to your doorstep.',
    url: 'https://doctordoorstep.com',
    siteName: 'InHouse Doctor',
    images: [
      {
        url: 'https://doctordoorstep.com/og-image.jpg', // Placeholder for actual OG image
        width: 1200,
        height: 630,
        alt: 'InHouse Doctor - Premium Healthcare at Home',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InHouse Doctor | Premium Healthcare at Your Doorstep',
    description: 'Book verified, premium healthcare professionals for home visits in minutes.',
    images: ['https://doctordoorstep.com/twitter-image.jpg'], // Placeholder
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
    canonical: 'https://doctordoorstep.com',
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
