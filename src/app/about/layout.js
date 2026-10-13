export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://5fadb5cladba.com'),
  title: 'About 5fadb5cladba | Trusted Cannabinoids, Etomidate & Vapes Supplier',
  description: 'Learn about 5fadb5cladba — a trusted supplier of cannabinoids, etomidate, vapes and research-grade chemicals with discreet worldwide shipping.',
  keywords: [
    '5fadb5cladba', 'etomidate supplier', 'buy research chemicals online',
     'etomidate', 'etomidate powder', 'buy etomidate',
    'discreet shipping',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About 5fadb5cladba | Trusted Cannabinoids, Etomidate & Vapes Supplier',
    description: '5fadb5cladba supplies premium cannabinoids, etomidate and research chemicals worldwide with discreet shipping.',
    url: '/about',
    type: 'website',
  },
};

export default function AboutLayout({ children }) {
  return children;
}
