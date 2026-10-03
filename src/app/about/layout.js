export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://k2paperliquid.com'),
  title: 'About K2PaperLiquid | Trusted K2 Paper, Spray, Powder & Etomidate Supplier',
  description: 'Learn about K2PaperLiquid — a trusted supplier of K2 paper sheets, K2 liquid spray, cannabinoid K2 powder and research-grade etomidate with discreet worldwide shipping.',
  keywords: [
    'K2PaperLiquid', 'k2 supplier', 'buy k2 online',
    'k2 paper sheets', 'k2 liquid spray', 'k2 powder', 'k2 spice',
    'etomidate', 'etomidate powder', 'buy etomidate',
    'discreet shipping',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About K2PaperLiquid | Trusted K2 Paper, Spray, Powder & Etomidate Supplier',
    description: 'K2PaperLiquid supplies premium K2 paper sheets, liquid spray, powder and etomidate worldwide with discreet shipping.',
    url: '/about',
    type: 'website',
  },
};

export default function AboutLayout({ children }) {
  return children;
}
