import { Metadata } from 'next';
import { HeroSection } from '@/features/home/HeroSection';
import { TrustBar } from '@/features/home/TrustBar';
import { jsonLdString } from '@/utils/jsonLd';
import dynamic from 'next/dynamic';

const ServicesSection = dynamic(() => import('@/features/home/ServicesSection').then(mod => mod.ServicesSection));
const WhyChooseUs = dynamic(() => import('@/features/home/WhyChooseUs').then(mod => mod.WhyChooseUs));
const Testimonials = dynamic(() => import('@/features/home/Testimonials').then(mod => mod.Testimonials));
const CtaBanner = dynamic(() => import('@/features/home/CtaBanner').then(mod => mod.CtaBanner));
const TestimonialsSection = dynamic(() => import('@/features/home/TestimonialsSection').then(mod => mod.TestimonialsSection));

export const metadata: Metadata = {
  title: 'Doctor at Home in Mumbai | Doctor Doorstep',
  description: 'Book verified doctors for convenient home visits across Mumbai. Doctor Doorstep provides trusted home doctor consultations with easy booking and 24×7 support.',
  alternates: {
    canonical: 'https://www.doctordoorstep.com',
  },
  openGraph: {
    title: 'Doctor at Home in Mumbai | Doctor Doorstep',
    description: 'Book verified doctors for convenient home visits across Mumbai. Doctor Doorstep provides trusted home doctor consultations with easy booking and 24×7 support.',
    url: 'https://www.doctordoorstep.com',
    type: 'website',
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString({
            '@context': 'https://schema.org',
            '@type': 'MedicalBusiness',
            name: 'Doctor Doorstep',
            url: 'https://www.doctordoorstep.com',
            telephone: '+919029190955',
            areaServed: {
              '@type': 'City',
              name: 'Mumbai'
            }
          })
        }}
      />
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
