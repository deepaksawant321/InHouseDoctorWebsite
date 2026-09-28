import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/features/home/CtaBanner';
import dynamic from 'next/dynamic';

const FaqSection = dynamic(() => import('@/features/home/FaqSection').then(mod => mod.FaqSection));
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Doctor Doorstep FAQs | Home Doctor Visits in Mumbai',
  description: 'Find answers about doctor home visits, booking, pricing, availability, service areas and healthcare services provided by Doctor Doorstep.',
  alternates: {
    canonical: 'https://www.doctordoorstep.com/faq',
  },
  openGraph: {
    title: 'Doctor Doorstep FAQs | Home Doctor Visits in Mumbai',
    description: 'Find answers about doctor home visits, booking, pricing, availability, service areas and healthcare services provided by Doctor Doorstep.',
    url: 'https://www.doctordoorstep.com/faq',
    type: 'website',
  },
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about booking, payments, and our medical services."
      />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
