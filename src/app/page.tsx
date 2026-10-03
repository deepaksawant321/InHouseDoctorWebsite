import { Metadata } from 'next';
import { HeroSection } from '@/features/home/HeroSection';
import { TrustBar } from '@/features/home/TrustBar';
import { Achievements } from '@/features/home/Achievements';
import { jsonLdString } from '@/utils/jsonLd';
import dynamic from 'next/dynamic';
import { SEO } from '@/constants/seo';

const ServicesSection = dynamic(() => import('@/features/home/ServicesSection').then(mod => mod.ServicesSection));
const WhyChooseUs = dynamic(() => import('@/features/home/WhyChooseUs').then(mod => mod.WhyChooseUs));
const CtaBanner = dynamic(() => import('@/features/home/CtaBanner').then(mod => mod.CtaBanner));
const TestimonialsSection = dynamic(() => import('@/features/home/TestimonialsSection').then(mod => mod.TestimonialsSection));

export const metadata: Metadata = {
  title: { absolute: SEO.home.title },
  description: SEO.home.description,
  alternates: {
    canonical: 'https://www.doctordoorstep.com',
  },
  openGraph: {
    title: SEO.home.title,
    description: SEO.home.description,
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
              name: 'Mira Road, Bhayandar & Dahisar, Mumbai'
            }
          })
        }}
      />
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <Achievements />
      <WhyChooseUs />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
