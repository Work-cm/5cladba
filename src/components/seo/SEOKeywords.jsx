// Primary keywords — matches actual products listed on the site
export const primaryKeywords = [
  'k2 paper sheets', 'k2 paper', 'k2 infused paper', 'k2 spice paper', 'k2 paper for sale',
  'k2 liquid spray', 'k2 spray', 'k2 liquid', 'liquid k2 on paper', 'k2 spray for sale',
  'k2 powder', 'cannabinoids k2 powder', 'k2 cannabinoid powder', 'buy k2 powder',
];

export const secondaryKeywords = [
  'buy k2 online',
  'k2 for sale',
  'k2 spice',
  'synthetic cannabinoids',
  'k2paperliquid',
  'k2paperliquid.com',
];

export const allKeywords = [...primaryKeywords, ...secondaryKeywords];

// Schema.org structured data for better SEO
export const getProductSchema = (product) => {
  const startingPrice = product.priceVariants?.[0]?.price ?? product.price;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://k2paperliquid.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images?.[0] || `${BASE_URL}/images/logo.png`,
    brand: { '@type': 'Brand', name: 'K2PaperLiquid' },
    offers: {
      '@type': 'Offer',
      price: startingPrice ?? 0,
      priceCurrency: 'EUR',
      availability: product.countInStock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${BASE_URL}/products/${product.slug}`,
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.numReviews || 1,
    } : undefined,
  };
};

// Get base URL for schemas
const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://k2paperliquid.com';
};

// Organization schema
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'K2PaperLiquid',
  description: 'Premium K2 paper sheets, K2 liquid spray and cannabinoid K2 powder with discreet worldwide shipping.',
  url: getBaseUrl(),
  logo: {
    '@type': 'ImageObject',
    url: `${getBaseUrl()}/images/logo.png`,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'order@researchchems.online',
    availableLanguage: 'English',
  },
  sameAs: [],
});

// Website schema with SearchAction for sitelinks search box
export const getWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'K2PaperLiquid',
  description: 'K2 paper sheets, K2 liquid spray and K2 powder for sale online.',
  url: getBaseUrl(),
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${getBaseUrl()}/products?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

export default function SEOKeywords() {
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
