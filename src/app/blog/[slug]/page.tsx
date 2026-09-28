import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/features/home/CtaBanner';
import { Box, Container, Typography, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Metadata } from 'next';
import Link from 'next/link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// This would typically fetch from CMS
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `${resolvedParams.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} | Doctor Doorstep`,
    description: `Read about ${resolvedParams.slug.replace(/-/g, ' ')} on the Doctor Doorstep healthcare blog.`,
    alternates: {
      canonical: `https://www.doctordoorstep.com/blog/${resolvedParams.slug}`,
    },
    openGraph: {
      title: `${resolvedParams.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} | Doctor Doorstep`,
      description: `Read about ${resolvedParams.slug.replace(/-/g, ' ')} on the Doctor Doorstep healthcare blog.`,
      url: `https://www.doctordoorstep.com/blog/${resolvedParams.slug}`,
      type: 'article',
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const title = resolvedParams.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: title,
            author: {
              '@type': 'Organization',
              name: 'Doctor Doorstep'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Doctor Doorstep',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.doctordoorstep.com/logo.png'
              }
            }
          })
        }}
      />
      <Box sx={{ bgcolor: 'background.paper', pt: 12, pb: 4 }}>
        <Container maxWidth="md">
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 4 }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Typography sx={{ '&:hover': { textDecoration: 'underline' } }} color="inherit">Home</Typography>
            </Link>
            <Link href="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Typography sx={{ '&:hover': { textDecoration: 'underline' } }} color="inherit">Blog</Typography>
            </Link>
            <Typography color="text.primary">{title}</Typography>
          </Breadcrumbs>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 4 }}>{title}</Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
            Published on August 10, 2026 • Medically reviewed by Dr. [Placeholder Name]
          </Typography>
        </Container>
      </Box>

      <Box component="section" sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="md">
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 4 }}>
            This is a placeholder for the actual blog post content regarding {title}. It should be fetched from a CMS or database.
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            Ensure that any medical claims are properly reviewed and cite authoritative sources.
          </Typography>
        </Container>
      </Box>
      <CtaBanner />
    </>
  );
}
