import type { Metadata } from 'next';
import { jsonLdString } from '@/utils/jsonLd';
import { notFound } from 'next/navigation';
import { Box, Container, Typography, Grid } from '@mui/material';
import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/features/home/CtaBanner';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface ServiceDetail {
  serviceName: string;
  description?: string | null;
  longDescription?: string | null;
  basePrice: number;
  imageUrl?: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.doctordoorstep.com/api';

// Fetched on the server so the title, description and content are in the initial HTML (SEO).
// Returns null only for a genuine 404; any other failure throws so the error boundary renders.
async function getService(slug: string): Promise<ServiceDetail | null> {
  const res = await fetch(`${API_URL}/services/slug/${encodeURIComponent(slug)}`, {
    next: { revalidate: 300 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to load service (${res.status})`);
  const json = await res.json();
  return json?.data ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: 'Service Not Found', robots: { index: false } };
  // Short DB descriptions make weak snippets, so pad them with a generic, factual sentence
  const base = (service.description || '').trim();
  const tail = `Book ${service.serviceName} at home in Mumbai with Doctor Doorstep.`;
  const description = base.length >= 90 ? base : base ? `${base.replace(/[.\s]+$/, '')}. ${tail}` : tail;
  return {
    title: `${service.serviceName} at Home in Mumbai`,
    description,
    alternates: { canonical: `https://www.doctordoorstep.com/services/${slug}` },
    openGraph: {
      title: `${service.serviceName} at Home in Mumbai | Doctor Doorstep`,
      description,
      url: `https://www.doctordoorstep.com/services/${slug}`,
      type: 'website',
    },
  };
}

export default async function ServiceDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.serviceName,
            description: service.description || undefined,
            url: `https://www.doctordoorstep.com/services/${slug}`,
            areaServed: { '@type': 'City', name: 'Mumbai' },
            provider: { '@type': 'MedicalBusiness', name: 'Doctor Doorstep', url: 'https://www.doctordoorstep.com' },
            ...(Number(service.basePrice) > 0
              ? { offers: { '@type': 'Offer', price: Number(service.basePrice), priceCurrency: 'INR' } }
              : {}),
          }),
        }}
      />
      <PageHero
        title={service.serviceName}
        subtitle={service.description || 'Professional healthcare services at home.'}
      />

      <Box component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 8, md: 12 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h2" sx={{ mb: 4, fontWeight: 700 }}>
                Comprehensive {service.serviceName}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, whiteSpace: 'pre-line' }}>
                {service.longDescription || 'Detailed information about this service will be updated shortly. Contact us for more info.'}
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CheckCircleIcon sx={{ color: 'secondary.main' }} />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Base Price: ₹{service.basePrice}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CheckCircleIcon sx={{ color: 'secondary.main' }} />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Certified Professionals</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CheckCircleIcon sx={{ color: 'secondary.main' }} />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Flexible Timings</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  width: '100%', height: 400, borderRadius: '28px',
                  backgroundImage: service.imageUrl ? `url(${service.imageUrl})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  background: !service.imageUrl ? 'linear-gradient(135deg, rgba(10, 92, 184, 0.1), rgba(20, 181, 165, 0.1))' : undefined,
                  border: '1px solid', borderColor: 'divider',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {!service.imageUrl && (
                  <LocalHospitalIcon aria-hidden sx={{ fontSize: 96, color: 'primary.main', opacity: 0.5 }} />
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <CtaBanner />
    </>
  );
}
