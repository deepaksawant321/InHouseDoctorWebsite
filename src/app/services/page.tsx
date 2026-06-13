import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/features/home/CtaBanner';
import dynamic from 'next/dynamic';

const ServicesSection = dynamic(() => import('@/features/home/ServicesSection').then(mod => mod.ServicesSection));
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore our range of home healthcare services including General Physician, Nursing Care, Physiotherapy, and Elder Care.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Healthcare Services At Home"
        subtitle="Comprehensive medical care tailored for your comfort and convenience."
      />
      <ServicesSection />
      <CtaBanner />
    </>
  );
}
