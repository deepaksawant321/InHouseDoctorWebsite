import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/dashboard/', '/login'],
    },
    sitemap: 'https://www.doctordoorstep.com/sitemap.xml',
  };
}
