// Page-level SEO copy (title / meta description / H1) from the marketing SEO sheet.
// Titles are used with `title: { absolute }` so the root layout's " | Doctor Doorstep" template is not appended.
export interface PageSeo {
  title: string;
  description: string;
  h1: string;
}

export const SEO = {
  home: {
    title: 'Doctor at Home in Mira Road, Bhayandar & Dahisar | 24 x 7',
    description: 'Get certified doctors, nurses, and physiotherapists at home in Mira Road, Bhayandar & Dahisar. 24/7 home healthcare services. Book a home visit today.',
    h1: 'Reliable Doctor at Home & Home Healthcare Services in Mira Bhayandar',
  },
  services: {
    title: 'Home Healthcare Services in Mira Road, Bhayandar and Dahisar | Doctor Doorstep',
    description: 'Explore our complete range of home healthcare services in Mira Bhayandar, including general physicians, nursing care, physiotherapy, and elder care.',
    h1: 'Our Home Healthcare & Medical Services',
  },
  howItWorks: {
    title: 'How Doctor Doorstep Works | Simple Booking Process',
    description: 'Learn how to book a doctor, nurse, or physiotherapist at home with Doctor Doorstep in Mira Road and Bhayandar in 3 simple steps.',
    h1: 'How It Works: Booking Healthcare Services at Your Doorstep',
  },
  about: {
    title: 'About Doctor Doorstep | Trusted Home Healthcare in Mumbai',
    description: 'Learn about Doctor Doorstep, your trusted provider for home doctor visits, nursing, and physiotherapy across Mira Road, Bhayandar, and Dahisar.',
    h1: 'About Doctor Doorstep – Your Trusted Home Healthcare Partner',
  },
  faq: {
    title: 'Frequently Asked Questions | Doctor Doorstep',
    description: 'Find answers to common questions about booking a doctor at home, home nursing, charges, service areas, and availability in Mira Road and Bhayandar.',
    h1: 'Frequently Asked Questions About Our Services',
  },
  contact: {
    title: 'Contact Doctor Doorstep | Book Home Doctor & Nurse in Mira Road',
    description: 'Contact Doctor Doorstep for urgent doctor visits, home nursing, or physiotherapy in Mira Road, Bhayandar, and Dahisar. Call us or book online.',
    h1: 'Get in Touch With Doctor Doorstep',
  },
} satisfies Record<string, PageSeo>;

// Service detail pages, keyed by service slug. Services without an entry fall back to the generated copy.
export const SERVICE_SEO: Record<string, PageSeo> = {
  'elder-care': {
    title: 'Elder Care Services in Mira Road, Bhayandar Dahisar | Doctor Doorstep',
    description: 'Compassionate old age and elder care at home in Mira Road and Bhayandar. Professional caregivers and geriatric support for your loved ones.',
    h1: 'Dedicated Elder Care & Senior Support at Home in Mira Bhayandar',
  },
  'general-physician': {
    title: 'Doctor on Call & General Physician at Home | Doctor Doorstep',
    description: 'Need a doctor on call in Bhayandar or Mira Road? Get an experienced general physician for a home visit for checkups, viral fevers, and chronic illness.',
    h1: 'General Physician & Doctor on Call at Home in Mira Road',
  },
  'nursing-care': {
    title: 'Home Nursing Services & ICU Setup in Mira Road | Doctor Doorstep',
    description: 'Professional home nursing services, injection administration, wound care, and home ICU nursing setup in Mira Road, Bhayandar, and Dahisar.',
    h1: 'Certified Home Nursing Care & ICU Setup in Mira Bhayandar',
  },
  physiotherapy: {
    title: 'Physiotherapist Home Visit in Mira Road | Doctor Doorstep',
    description: 'Get expert physiotherapist home visits in Mira Road and Bhayandar. Specialized rehabilitation for orthopedic, neurological, and post-surgical recovery.',
    h1: 'Expert Physiotherapy at Home in Mira Road & Bhayandar',
  },
};

// Hero social proof, shown in the homepage banner and the achievements strip.
// TODO(marketing): replace with real, verifiable figures before launch.
export const SOCIAL_PROOF = {
  reviewsLabel: '10k+ Positive Reviews',
  achievements: [
    { value: '15k+', label: 'Happy Patients' },
    { value: '97%', label: 'Customer Satisfied' },
    { value: '2k+', label: 'Home Visits' },
  ],
};
