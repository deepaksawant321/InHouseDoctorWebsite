import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/features/home/CtaBanner';
import dynamic from 'next/dynamic';

const ServicesSection = dynamic(() => import('@/features/home/ServicesSection').then(mod => mod.ServicesSection));
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Healthcare Services in Mumbai',
  description: 'Explore Doctor Doorstep home healthcare services including doctor home visits, physiotherapy, nursing and other healthcare services across Mumbai.',
  alternates: {
    canonical: 'https://www.doctordoorstep.com/services',
  },
  openGraph: {
    title: 'Home Healthcare Services in Mumbai',
    description: 'Explore Doctor Doorstep home healthcare services including doctor home visits, physiotherapy, nursing and other healthcare services across Mumbai.',
    url: 'https://www.doctordoorstep.com/services',
    type: 'website',
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Healthcare Services At Home"
        subtitle="Comprehensive medical care tailored for your comfort and convenience."
      />
      <ServicesSection showHeader={false} />
      <CtaBanner />
    </>
  );
}
