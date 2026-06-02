import { PageHero } from '@/components/ui/PageHero';
import { ServicesSection } from '@/features/home/ServicesSection';
import { CtaBanner } from '@/features/home/CtaBanner';
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
