import { MetadataRoute } from 'next';
import { LOCATION_SLUGS } from '@/constants/locations';

export const revalidate = 3600;

async function getServiceSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.doctordoorstep.com/api'}/services`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json?.data ?? []).map((s: { slug?: string }) => s.slug).filter(Boolean);
  } catch {
    return []; // API unavailable: omit service pages rather than fail the whole sitemap
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.doctordoorstep.com';
  const serviceUrls = (await getServiceSlugs()).map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  const locationUrls = LOCATION_SLUGS.map(loc => ({
    url: `${baseUrl}/locations/${loc}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...serviceUrls,
    ...locationUrls,
  ];
}
