// Server-side (RSC) data fetching for public content, so it is present in the initial HTML for SEO.
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.doctordoorstep.com/api';

export interface FaqItemData {
  q: string;
  a: string;
}

/** Active FAQs from the CMS, or null when the API is unreachable (the client component then retries). */
export async function getPublicFaqs(): Promise<FaqItemData[] | null> {
  try {
    const res = await fetch(`${API_URL}/cms/faqs`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data ?? []).map((f: { question: string; answer: string }) => ({ q: f.question, a: f.answer }));
  } catch {
    return null;
  }
}
