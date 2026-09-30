import { Metadata } from 'next';
import { HeroSection } from '@/features/home/HeroSection';
import { TrustBar } from '@/features/home/TrustBar';
import { getPublicFaqs } from '@/services/serverApi';
import { jsonLdString } from '@/utils/jsonLd';
import dynamic from 'next/dynamic';

const HowItWorks = dynamic(() => import('@/features/home/HowItWorks').then(mod => mod.HowItWorks));
const ServicesSection = dynamic(() => import('@/features/home/ServicesSection').then(mod => mod.ServicesSection));
const WhyChooseUs = dynamic(() => import('@/features/home/WhyChooseUs').then(mod => mod.WhyChooseUs));
const Testimonials = dynamic(() => import('@/features/home/Testimonials').then(mod => mod.Testimonials));
const FaqSection = dynamic(() => import('@/features/home/FaqSection').then(mod => mod.FaqSection));
const CtaBanner = dynamic(() => import('@/features/home/CtaBanner').then(mod => mod.CtaBanner));
const TestimonialsSection = dynamic(() => import('@/features/home/TestimonialsSection').then(mod => mod.TestimonialsSection));
const DoctorProfiles = dynamic(() => import('@/features/home/DoctorProfiles').then(mod => mod.DoctorProfiles));

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

export default async function Home() {
  const faqs = await getPublicFaqs();
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
      <HowItWorks />
      <DoctorProfiles />
      <FaqSection initialFaqs={faqs} />
      <CtaBanner />
    </>
  );
}
