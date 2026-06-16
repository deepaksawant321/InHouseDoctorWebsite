'use client';

import { Box, Container, Typography, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { fadeInUp, staggerContainer } from '@/constants/animations';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { cmsApi } from '@/services/api';
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';

const FALLBACK_FAQS = [
  {
    q: 'How quickly can a doctor arrive?',
    a: 'In most areas of Mumbai, a doctor can reach your home within 30–60 minutes of your confirmed request. Our intelligent dispatch system ensures the nearest available doctor is assigned to you.',
  },
  {
    q: 'Are all doctors verified and licensed?',
    a: 'Absolutely. Every doctor on our platform undergoes a rigorous vetting process including license verification, background checks, and peer reviews before being approved to take home visits.',
  },
  {
    q: 'How do payments work?',
    a: 'Payment is handled securely after the consultation. We accept all major UPI apps, credit/debit cards, and net banking. A detailed receipt is sent to your email after every visit.',
  },
];

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
          borderColor: open ? alpha('#4F46E5', 0.4) : 'divider',
          overflow: 'hidden',
          transition: 'border-color 0.3s ease',
          mb: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Box
          onClick={() => setOpen(!open)}
          role="button"
          aria-expanded={open}
          aria-controls={`faq-content-${index}`}
          id={`faq-header-${index}`}
          sx={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            px: 3, py: 2.5, cursor: 'pointer',
            bgcolor: open ? alpha('#4F46E5', isDark ? 0.12 : 0.04) : 'transparent',
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

export const FaqSection = () => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cmsApi.getFaqs().then(res => {
      const data = res.data.data || [];
      if (data.length > 0) {
        setFaqs(data.map((f: any) => ({ q: f.question, a: f.answer })));
      } else {
        setFaqs(FALLBACK_FAQS);
      }
    }).catch(err => {
      console.error(err);
      setFaqs(FALLBACK_FAQS);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <motion.div variants={fadeInUp}>
            <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.75, borderRadius: 10, mb: 2, border: '1px solid', borderColor: alpha('#0D9488', 0.3), bgcolor: alpha('#0D9488', 0.06) }}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'secondary.main' }}>FAQ</Typography>
              </Box>
              <Typography variant="h2" sx={{ mb: 1.5, fontSize: { xs: '2rem', md: '2.75rem' } }}>
                Frequently Asked{' '}
                <Box component="span" sx={{ background: 'linear-gradient(135deg, #0D9488, #4F46E5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Questions
                </Box>
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
                Everything you need to know about InHouse Doctor.
              </Typography>
            </Box>
          </motion.div>

          <Box>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><CircularProgress /></Box>
            ) : (
              faqs.map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
              ))
            )}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};
