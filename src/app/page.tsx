import { HeroSection } from '@/features/home/HeroSection';
import { TrustBar } from '@/features/home/TrustBar';
import dynamic from 'next/dynamic';

const HowItWorks = dynamic(() => import('@/features/home/HowItWorks').then(mod => mod.HowItWorks));
const ServicesSection = dynamic(() => import('@/features/home/ServicesSection').then(mod => mod.ServicesSection));
const WhyChooseUs = dynamic(() => import('@/features/home/WhyChooseUs').then(mod => mod.WhyChooseUs));
const Testimonials = dynamic(() => import('@/features/home/Testimonials').then(mod => mod.Testimonials));
const FaqSection = dynamic(() => import('@/features/home/FaqSection').then(mod => mod.FaqSection));
const CtaBanner = dynamic(() => import('@/features/home/CtaBanner').then(mod => mod.CtaBanner));

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <HowItWorks />
      <ServicesSection />
      <WhyChooseUs />
      <Testimonials />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
