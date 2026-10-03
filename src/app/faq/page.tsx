import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/features/home/CtaBanner';
import dynamic from 'next/dynamic';

const FaqSection = dynamic(() => import('@/features/home/FaqSection').then(mod => mod.FaqSection));
import { getPublicFaqs } from '@/services/serverApi';
import type { Metadata } from 'next';
import { SEO } from '@/constants/seo';

export const metadata: Metadata = {
  title: { absolute: SEO.faq.title },
  description: SEO.faq.description,
  alternates: {
    canonical: 'https://www.doctordoorstep.com/faq',
  },
  openGraph: {
    title: SEO.faq.title,
    description: SEO.faq.description,
    url: 'https://www.doctordoorstep.com/faq',
    type: 'website',
  },
};

export default async function FaqPage() {
  const faqs = await getPublicFaqs();
  return (
    <>
      <PageHero
        title={SEO.faq.h1}
        subtitle="Everything you need to know about booking, payments, and our medical services."
      />
      <FaqSection initialFaqs={faqs} showHeader={false} />
      <CtaBanner />
    </>
  );
}
