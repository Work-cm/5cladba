export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://5fadb5cladba.com'),
  title: 'FAQ | Buy Cannabinoids, Etomidate & Vapes Online | 5fadb5cladba',
  description: 'Get answers about buying cannabinoids, etomidate and research chemicals online, shipping, payments and product quality at 5fadb5cladba.',
  keywords: [
    'store FAQ', 'buy research chemicals online FAQ',
        'etomidate', 'etomidate powder', 'buy etomidate',
    'discreet shipping', 'payment methods',
    '5fadb5cladba support',
  ],
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'FAQ | Buy Cannabinoids, Etomidate & Vapes Online | 5fadb5cladba',
    description: 'Get answers about ordering, shipping, payments and product quality at 5fadb5cladba.',
    url: '/faq',
    type: 'website',
  },
};

export default function FAQLayout({ children }) {
  return children;
}
