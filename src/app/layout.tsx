import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/providers/AppProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/constants/seo';

const inter = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.doctordoorstep.com'),
  title: {
    default: SEO.home.title,
    template: '%s | Doctor Doorstep',
  },
  description: SEO.home.description,
  authors: [{ name: 'Doctor Doorstep' }],
  creator: 'Doctor Doorstep',
  publisher: 'Doctor Doorstep',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: SEO.home.title,
    description: SEO.home.description,
    url: 'https://www.doctordoorstep.com',
    siteName: 'Doctor Doorstep',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.home.title,
    description: SEO.home.description,
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
