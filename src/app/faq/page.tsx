import { PageHero } from '@/components/ui/PageHero';
import { FaqSection } from '@/features/home/FaqSection';
import { CtaBanner } from '@/features/home/CtaBanner';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Have questions? We have answers. Learn more about our home visit doctors and services.',
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
