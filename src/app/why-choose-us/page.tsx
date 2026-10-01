import { PageHero } from '@/components/ui/PageHero';
import { WhyChooseUs } from '@/features/home/WhyChooseUs';
import { CtaBanner } from '@/features/home/CtaBanner';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Choose Us',
  description: 'Discover why Doctor Doorstep is Mumbai\'s most trusted home healthcare platform.',
};

export default function WhyChooseUsPage() {
  return (
    <>
      <PageHero
        title="Why Choose Doctor Doorstep"
        subtitle="We bring medical-grade trust, speed, and reliability directly to your doorstep."
      />
      <WhyChooseUs />
      <CtaBanner />
    </>
  );
}
