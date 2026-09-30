import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/features/home/CtaBanner';
import { Box, Container, Typography, Grid } from '@mui/material';
import { Metadata } from 'next';
import Link from 'next/link';
import { BLOGS } from '@/constants/blogs';

export const metadata: Metadata = {
  robots: { index: false, follow: true }, // placeholder content until real posts exist
  title: 'Healthcare Blog',
  description: 'Read the latest healthcare articles, medical advice, and news from verified doctors at Doctor Doorstep.',
  alternates: {
    canonical: 'https://www.doctordoorstep.com/blog',
  },
  openGraph: {
    title: 'Healthcare Blog',
    description: 'Read the latest healthcare articles, medical advice, and news from verified doctors at Doctor Doorstep.',
    url: 'https://www.doctordoorstep.com/blog',
    type: 'website',
  },
};


export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Healthcare Blog"
        subtitle="Insights, advice, and updates from our medical experts."
      />

      <Box component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: 'background.paper' }}>
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
