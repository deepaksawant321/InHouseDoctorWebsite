import { PageHero } from '@/components/ui/PageHero';
import { HowItWorks } from '@/features/home/HowItWorks';
import { CtaBanner } from '@/features/home/CtaBanner';
import { Metadata } from 'next';
import { SEO } from '@/constants/seo';

export const metadata: Metadata = {
  title: { absolute: SEO.howItWorks.title },
  description: SEO.howItWorks.description,
  alternates: { canonical: 'https://www.doctordoorstep.com/how-it-works' },
  openGraph: {
    title: SEO.howItWorks.title,
    description: SEO.howItWorks.description,
    url: 'https://www.doctordoorstep.com/how-it-works',
    type: 'website',
  },
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        title={SEO.howItWorks.h1}
        subtitle="Getting professional medical care at home is as easy as ordering a cab. See our simple 4-step process."
      />
      <HowItWorks showHeader={false} />
      <CtaBanner />
    </>
  );
}
