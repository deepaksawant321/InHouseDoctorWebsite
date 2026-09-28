import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/features/home/CtaBanner';
import { Box, Container, Typography, Grid } from '@mui/material';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Healthcare Blog | Doctor Doorstep',
  description: 'Read the latest healthcare articles, medical advice, and news from verified doctors at Doctor Doorstep.',
  alternates: {
    canonical: 'https://www.doctordoorstep.com/blog',
  },
  openGraph: {
    title: 'Healthcare Blog | Doctor Doorstep',
    description: 'Read the latest healthcare articles, medical advice, and news from verified doctors at Doctor Doorstep.',
    url: 'https://www.doctordoorstep.com/blog',
    type: 'website',
  },
};

// Placeholder blogs
const BLOGS = [
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
  }
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Healthcare Blog"
        subtitle="Insights, advice, and updates from our medical experts."
      />

      <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {BLOGS.map((blog) => (
              <Grid size={{ xs: 12, md: 6 }} key={blog.slug}>
                <Link href={`/blog/${blog.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box
                  sx={{
                    display: 'block',
                    p: 4,
                    height: '100%',
                    borderRadius: '24px',
                    bgcolor: 'background.default',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.05)',
                      borderColor: 'primary.main',
                    }
                  }}
                >
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>{blog.date}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{blog.title}</Typography>
                  <Typography variant="body1" color="text.secondary">{blog.excerpt}</Typography>
                </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <CtaBanner />
    </>
  );
}
