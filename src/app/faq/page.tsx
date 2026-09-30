import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/features/home/CtaBanner';
import dynamic from 'next/dynamic';

const FaqSection = dynamic(() => import('@/features/home/FaqSection').then(mod => mod.FaqSection));
import { getPublicFaqs } from '@/services/serverApi';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs | Home Doctor Visits in Mumbai',
  description: 'Find answers about doctor home visits, booking, pricing, availability, service areas and healthcare services provided by Doctor Doorstep.',
  alternates: {
    canonical: 'https://www.doctordoorstep.com/faq',
  },
  openGraph: {
    title: 'FAQs | Home Doctor Visits in Mumbai | Doctor Doorstep',
    description: 'Find answers about doctor home visits, booking, pricing, availability, service areas and healthcare services provided by Doctor Doorstep.',
    url: 'https://www.doctordoorstep.com/faq',
    type: 'website',
  },
};

export default async function FaqPage() {
  const faqs = await getPublicFaqs();
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about booking, payments, and our medical services."
      />
      <FaqSection initialFaqs={faqs} showHeader={false} />
      <CtaBanner />
    </>
  );
}
