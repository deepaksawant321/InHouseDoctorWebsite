// Placeholder blog index. Real post content must come from a CMS / reviewed source.
export const BLOGS = [
  {
    slug: 'when-to-call-doctor-home-visit',
    title: 'When Should You Book a Home Doctor?',
    excerpt: 'Understanding the situations where a home doctor visit is more beneficial than visiting a clinic or hospital.',
    date: 'August 10, 2026',
  },
  {
    slug: 'benefits-of-home-healthcare-seniors',
    title: 'Benefits of Home Healthcare Services for Senior Citizens',
    excerpt: 'Why elderly patients thrive with home healthcare and how it improves their quality of life.',
    date: 'August 5, 2026',
  },
];

export const getBlog = (slug: string) => BLOGS.find((b) => b.slug === slug);
