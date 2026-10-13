// Primary keywords — matches actual products listed on the site
export const primaryKeywords = [
  'synthetic cannabinoids', 'cannabinoid powder', 'buy cannabinoids online', 'cannabinoids for sale',
  'etomidate', 'etomidate powder', 'etomidate crystal', 'buy etomidate', 'etomidate for sale',
  'etomidate vape', 'etomidate pods', 'k-pods', 'buy etomidate vape',
];

export const secondaryKeywords = [
  'research chemicals',
  'buy research chemicals online',
  'lab grade chemicals',
  'research chemicals for sale',
  '5fadb5cladba',
  '5fadb5cladba.com',
];

export const allKeywords = [...primaryKeywords, ...secondaryKeywords];

// Schema.org structured data for better SEO
export const getProductSchema = (product) => {
  const startingPrice = product.priceVariants?.[0]?.price ?? product.price;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://5fadb5cladba.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images?.[0] || `${BASE_URL}/images/logo.png`,
    brand: { '@type': 'Brand', name: '5fadb5cladba' },
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
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://5fadb5cladba.com';
};

// Organization schema
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '5fadb5cladba',
  description: 'Premium cannabinoids, etomidate, etomidate vapes and research-grade chemicals with discreet worldwide shipping.',
  url: getBaseUrl(),
  logo: {
    '@type': 'ImageObject',
    url: `${getBaseUrl()}/images/logo.png`,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'order@5fadb5cladba.com',
    availableLanguage: 'English',
  },
  sameAs: [],
});

// Website schema with SearchAction for sitelinks search box
export const getWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '5fadb5cladba',
  description: 'Cannabinoids, etomidate, vapes and research chemicals for sale online.',
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
