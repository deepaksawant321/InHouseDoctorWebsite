import { PageHero } from '@/components/ui/PageHero';
import { HowItWorks } from '@/features/home/HowItWorks';
import { CtaBanner } from '@/features/home/CtaBanner';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Learn how to book a home doctor visit in 5 easy steps.',
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        title="How InHouse Doctor Works"
        subtitle="Getting professional medical care at home is as easy as ordering a cab. See our simple 4-step process."
      />
      <HowItWorks showHeader={false} />
      <CtaBanner />
    </>
  );
}
