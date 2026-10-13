import Script from 'next/script';
import dbConnect from '@/lib/utils/db';
import Product from '@/models/Product';
import HomeClient from '@/components/home/HomeClient';
import { getOrganizationSchema, getWebsiteSchema } from '@/components/seo/SEOKeywords';

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://k2liquidstore.com';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Buy K2 Paper Sheets, K2 Liquid Spray, K2 Powder & Etomidate Online | K2LiquidStore',
  description: 'Buy K2 paper sheets, K2 liquid spray, cannabinoid K2 powder and research-grade etomidate online at K2LiquidStore.com. Premium quality, discreet packaging and fast worldwide shipping.',
  keywords: [
    'k2 paper sheets', 'k2 paper', 'k2 infused paper', 'k2 spice paper',
    'k2 liquid spray', 'k2 spray', 'liquid k2', 'k2 spice',
    'k2 powder', 'cannabinoids k2 powder',
    'etomidate', 'etomidate powder', 'etomidate crystal', 'buy etomidate',
    'buy k2 online', 'k2 for sale', 'k2liquidstore',
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'K2LiquidStore',
    title: 'Buy K2 Paper Sheets, K2 Liquid Spray, K2 Powder & Etomidate Online | K2LiquidStore',
    description: 'Premium K2 paper sheets, K2 liquid spray, K2 powder and research-grade etomidate. Worldwide discreet shipping. Shop K2LiquidStore today.',
    images: [
      {
        url: `${BASE_URL}/images/logo.png`,
        width: 1200,
        height: 630,
        alt: 'K2LiquidStore — K2 Paper, Spray & Powder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buy K2 Online | K2LiquidStore',
    description: 'Premium K2 paper sheets, K2 liquid spray and K2 powder. Worldwide discreet shipping.',
    images: [`${BASE_URL}/images/logo.png`],
  },
};

async function getFeaturedProducts() {
  await dbConnect();
  try {
    const products = await Product.find({ featured: true })
      .limit(12)
      .select('-reviews')
      .lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();

  return (
    <>
      <Script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomeClient featuredProducts={featuredProducts} />
    </>
  );
}
