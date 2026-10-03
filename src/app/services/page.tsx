import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/features/home/CtaBanner';
import dynamic from 'next/dynamic';

const ServicesSection = dynamic(() => import('@/features/home/ServicesSection').then(mod => mod.ServicesSection));
import { Metadata } from 'next';
import { SEO } from '@/constants/seo';

export const metadata: Metadata = {
  title: { absolute: SEO.services.title },
  description: SEO.services.description,
  alternates: {
    canonical: 'https://www.doctordoorstep.com/services',
  },
  openGraph: {
    title: SEO.services.title,
    description: SEO.services.description,
    url: 'https://www.doctordoorstep.com/services',
    type: 'website',
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title={SEO.services.h1}
        subtitle="Comprehensive medical care tailored for your comfort and convenience."
      />
      <ServicesSection showHeader={false} />
      <CtaBanner />
    </>
  );
}
