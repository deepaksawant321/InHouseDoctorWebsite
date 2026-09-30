'use client';

import { jsonLdString } from '@/utils/jsonLd';
import { Box, Container, Typography, useTheme, alpha } from '@mui/material';
import { m as motion } from 'framer-motion';
import { useState } from 'react';
import { fadeInUp, staggerContainer } from '@/constants/animations';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { cmsApi } from '@/services/api';
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';

const FaqItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <Box
        sx={{
          borderRadius: '16px',
          border: '1px solid',
          borderColor: open ? alpha('#0A5CB8', 0.4) : 'divider',
          overflow: 'hidden',
          transition: 'border-color 0.3s ease',
          mb: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Box
          onClick={() => setOpen(!open)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setOpen(!open);
            }
          }}
          role="button"
          tabIndex={0}
          aria-expanded={open}
          aria-controls={`faq-content-${index}`}
          id={`faq-header-${index}`}
          sx={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            px: 3, py: 2.5, cursor: 'pointer',
            bgcolor: open ? alpha('#0A5CB8', isDark ? 0.12 : 0.04) : 'transparent',
            transition: 'background 0.3s ease',
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 600, pr: 2, color: open ? 'primary.main' : 'text.primary' }}>
            {q}
          </Typography>
          <Box
            sx={{
              flexShrink: 0, width: 32, height: 32, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              bgcolor: open ? 'primary.main' : alpha('#94A3B8', 0.12),
              color: open ? 'white' : 'text.secondary',
              transition: 'all 0.3s ease',
            }}
          >
            {open ? <RemoveIcon sx={{ fontSize: 16 }} /> : <AddIcon sx={{ fontSize: 16 }} />}
          </Box>
        </Box>

        <motion.div
          id={`faq-content-${index}`}
          role="region"
          aria-labelledby={`faq-header-${index}`}
          initial={false}
          animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: 'hidden' }}
        >
          <Box sx={{ px: 3, pb: 3 }}>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              {a}
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </motion.div>
  );
};

/**
 * `initialFaqs` is fetched on the server so the questions/answers are in the initial HTML (SEO + FAQ rich results).
 * When it is null (API unreachable at render time) the component falls back to fetching in the browser.
 */
export const FaqSection = ({ initialFaqs = null, showHeader = true }: { initialFaqs?: { q: string; a: string }[] | null; showHeader?: boolean }) => {
  const [faqs, setFaqs] = useState<{ q: string; a: string }[]>(initialFaqs ?? []);
  const [loading, setLoading] = useState(initialFaqs === null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (initialFaqs !== null) return;
    cmsApi.getFaqs().then(res => {
      const data = res.data.data || [];
      setFaqs(data.map((f: any) => ({ q: f.question, a: f.answer })));
    }).catch(err => {
      console.error(err);
      setFailed(true);
    }).finally(() => setLoading(false));
  }, [initialFaqs]);

  return (
    <Box component="section" sx={{ py: { xs: 7, md: 10 }, bgcolor: 'background.default' }}>
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdString({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map(faq => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a
                }
              }))
            })
          }}
        />
      )}
      <Container maxWidth="md">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          {showHeader && (
          <motion.div variants={fadeInUp}>
            <Box sx={{ mb: { xs: 4, md: 5 } }}>
              <Typography variant="h2" sx={{ mb: 1, fontSize: { xs: '1.75rem', md: '2.4rem' } }}>Frequently Asked Questions</Typography>
              <Typography color="text.secondary">Everything you need to know about InHouse Doctor.</Typography>
            </Box>
          </motion.div>
          )}

          <Box>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><CircularProgress /></Box>
            ) : (
              faqs.length > 0 ? (
                faqs.map((faq, i) => (
                  <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
                ))
              ) : (
                <Typography color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                  {failed ? 'We could not load the FAQs right now. Please try again shortly or contact us.' : 'No FAQs are published yet. Please contact us with any questions.'}
                </Typography>
              )
            )}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};
