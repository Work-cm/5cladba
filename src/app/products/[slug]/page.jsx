import { notFound } from 'next/navigation';
import Link from 'next/link';
import dbConnect from '@/lib/utils/db';
import Product from '@/models/Product';
import ProductDetail from '@/components/product/ProductDetail';
import ProductCard from '@/components/product/ProductCard';

export const dynamic = 'force-dynamic';

// Convert MongoDB document to plain object
function convertToPlainObject(doc) {
  const plainObject = { ...doc };
  if (plainObject._id) {
    plainObject._id = plainObject._id.toString();
  }
  Object.keys(plainObject).forEach((key) => {
    const val = plainObject[key];
    if (val && typeof val === 'object') {
      if (val instanceof Date) {
        plainObject[key] = val.toISOString();
      } else if (Array.isArray(val)) {
        plainObject[key] = val.map((item) => {
          if (item && typeof item === 'object' && item._id) return convertToPlainObject(item);
          return item;
        });
      } else if (val._id) {
        plainObject[key] = convertToPlainObject(val);
      }
    }
  });
  return plainObject;
}

async function getProduct(slug) {
  try {
    await dbConnect();
    const product = await Product.findOne({ slug }).lean();
    if (!product) return null;
    return convertToPlainObject(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

async function getRelatedProducts(category, excludeId) {
  try {
    await dbConnect();
    const related = await Product.find({
      category,
      _id: { $ne: excludeId },
    })
      .sort({ rating: -1 })
      .limit(4)
      .select('-reviews')
      .lean();
    return related.map((p) => convertToPlainObject(p));
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: 'Product Not Found | K2LiquidStore' };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://k2liquidstore.com';
  const minPrice =
    product.price && product.price > 0
      ? product.price
      : product.priceVariants?.reduce(
          (min, v) => (v.price < min ? v.price : min),
          product.priceVariants[0]?.price ?? 0
        ) ?? 0;

  return {
    metadataBase: new URL(baseUrl),
    title: `${product.name} | K2LiquidStore`,
    description:
      product.description?.slice(0, 155) ||
      `Buy ${product.name} online at K2LiquidStore. Discreet worldwide shipping.`,
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      title: `${product.name} | K2LiquidStore`,
      description: product.description?.slice(0, 155) || `Buy ${product.name} online.`,
      url: `/products/${slug}`,
      type: 'website',
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category, product._id);

  return (
    <div className="min-h-screen bg-white">
      <ProductDetail product={product} />

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="container mx-auto px-6 pb-20">
          <div className="flex items-center justify-between mb-8 pt-10 border-t border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Related Products</h2>
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="text-sky-500 text-sm font-bold hover:underline"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
