import Script from 'next/script';
import dbConnect from '@/lib/utils/db';
import Product from '@/models/Product';
import HomeClient from '@/components/home/HomeClient';
import { getOrganizationSchema, getWebsiteSchema } from '@/components/seo/SEOKeywords';

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://5fadb5cladba.com';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Buy Cannabinoids, Etomidate & Vapes Online | 5fadb5cladba',
  description: 'Buy cannabinoids, etomidate, etomidate vapes and research-grade chemicals online at 5fadb5cladba.com. Premium quality, discreet packaging and fast worldwide shipping.',
  keywords: [
    'cannabinoids', 'cannabinoid powder', 'buy cannabinoids', 'etomidate',
    'etomidate powder', 'etomidate crystal', 'etomidate vape', 'k-pods',
    'research chemicals', 'buy research chemicals online', '5fadb5cladba',
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: '5fadb5cladba',
    title: 'Buy Cannabinoids, Etomidate & Vapes Online | 5fadb5cladba',
    description: 'Premium cannabinoids, etomidate, vapes and research-grade chemicals. Worldwide discreet shipping. Shop 5fadb5cladba today.',
    images: [
      {
        url: `${BASE_URL}/images/logo.png`,
        width: 1200,
        height: 630,
        alt: '5fadb5cladba — Cannabinoids, Etomidate & Vapes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buy Research Chemicals Online | 5fadb5cladba',
    description: 'Premium cannabinoids, etomidate and research chemicals. Worldwide discreet shipping.',
    images: [`${BASE_URL}/images/logo.png`],
  },
};

async function getFeaturedProducts() {
  await dbConnect();
  try {
    const products = await Product.find({ featured: true, category: { $nin: ['k2-paper-sheets', 'k2-liquid-spray', 'k2-powder', 'opioids', 'nitazenes'] } })
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
