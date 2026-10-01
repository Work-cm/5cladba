export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://k2paperliquid.com'),
  title: 'FAQ | Buy K2 Paper, Spray & Powder Online | K2PaperLiquid',
  description: 'Get answers about buying K2 paper sheets, K2 liquid spray and K2 powder online, shipping, payments and product quality at K2PaperLiquid.',
  keywords: [
    'k2 FAQ', 'buy k2 online FAQ',
    'k2 paper sheets', 'k2 liquid spray', 'k2 powder',
    'k2 shipping', 'payment methods',
    'K2PaperLiquid support',
  ],
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'FAQ | Buy K2 Paper, Spray & Powder Online | K2PaperLiquid',
    description: 'Get answers about ordering, shipping, payments and product quality at K2PaperLiquid.',
    url: '/faq',
    type: 'website',
  },
};

export default function FAQLayout({ children }) {
  return children;
}
