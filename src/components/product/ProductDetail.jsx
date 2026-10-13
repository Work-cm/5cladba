'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaStar, FaShoppingCart, FaCheck, FaShieldAlt, FaTruck, FaBoxOpen } from 'react-icons/fa';
import { useCart } from '@/components/cart/CartProvider';
import ProductReviews from '@/components/product/ProductReviews';

// Exact variant label format used by the source store:
// k2-paper-sheets -> "1 A4 sheet" / "2 A4 sheets"
// k2-liquid-spray -> "100ml" (no space)
// powders/others  -> "50g", or "1kg" when quantity >= 1000
// vapes-kpods     -> "1 pod" / "50 pods"
function variantLabel(product, variant) {
  if (variant.label) return variant.label;
  const cat = (product.category || '').toLowerCase();
  const q = variant.quantity;
  if (cat === 'k2-paper-sheets') return `${q} ${q === 1 ? 'A4 sheet' : 'A4 sheets'}`;
  if (cat === 'k2-liquid-spray') return `${q}ml`;
  if (cat === 'vapes-kpods') return `${q} ${q === 1 ? 'pod' : 'pods'}`;
  return q >= 1000 ? `${q / 1000}kg` : `${q}g`;
}

export default function ProductDetail({ product }) {
  const router = useRouter();
  const { addToCart } = useCart();

  const variants = product.priceVariants && product.priceVariants.length > 0
    ? product.priceVariants
    : [{ quantity: 1, price: product.price }];

  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  const inStock = product.countInStock > 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant);
    router.push('/cart');
  };

  const images = product.images && product.images.length > 0
    ? product.images
    : ['/images/Laboratory-Science.jpg'];

  return (
    <div className="container mx-auto px-6 pt-28 pb-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-sky-500 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-sky-500 transition-colors">Products</Link>
        <span>/</span>
        <span className="text-gray-900 truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Image gallery */}
        <div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
            <Image
              src={images[activeImage]}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
              quality={90}
            />
            {!inStock && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center">
                <span className="bg-gray-900 text-white text-sm font-bold px-5 py-2 rounded-full">Sold Out</span>
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    i === activeImage ? 'border-sky-500' : 'border-gray-200 hover:border-sky-300'
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="text-sky-500 text-xs font-bold uppercase tracking-widest mb-2">
            {product.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-3">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-amber-400' : 'text-gray-200'}`} />
              ))}
            </div>
            <span className="text-gray-400 text-sm">({product.numReviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-4xl font-black text-gray-900">&euro;{selectedVariant.price.toFixed(2)}</span>
            {variants.length > 1 && (
              <span className="text-gray-400 text-sm ml-2">for {variantLabel(product, selectedVariant)}</span>
            )}
          </div>

          {/* Variant picker */}
          {variants.length > 1 && (
            <div className="mb-6">
              <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">Select Quantity</p>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v._id || v.quantity}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                      selectedVariant.quantity === v.quantity && selectedVariant.price === v.price
                        ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/20'
                        : 'bg-white text-gray-900 border-gray-200 hover:border-sky-300'
                    }`}
                  >
                    {variantLabel(product, v)} &mdash; &euro;{v.price.toFixed(2)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">Quantity</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-xl border border-gray-200 text-gray-900 font-bold hover:border-sky-300 transition-colors"
                aria-label="Decrease quantity"
              >
                &minus;
              </button>
              <span className="w-12 text-center font-black text-lg text-gray-900">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-xl border border-gray-200 text-gray-900 font-bold hover:border-sky-300 transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
              <span className={`text-sm font-bold ml-2 ${inStock ? 'text-green-600' : 'text-red-500'}`}>
                {inStock ? `${product.countInStock} in stock` : 'Out of stock'}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              disabled={!inStock}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all ${
                added
                  ? 'bg-green-500 text-white'
                  : 'bg-white border-2 border-sky-500 text-sky-500 hover:bg-sky-50'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {added ? <><FaCheck /> Added to Cart</> : <><FaShoppingCart /> Add to Cart</>}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleBuyNow}
              disabled={!inStock}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/25 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buy Now
            </motion.button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-gray-100">
            {[
              { icon: FaTruck, label: 'Discreet Shipping' },
              { icon: FaShieldAlt, label: 'Lab Tested' },
              { icon: FaBoxOpen, label: 'Secure Packaging' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                <Icon className="w-5 h-5 text-sky-500" />
                <span className="text-[11px] font-bold text-gray-900">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-14 max-w-3xl">
        <h2 className="text-xl font-black text-gray-900 tracking-tight mb-4">Description</h2>
        <div className="text-gray-900 text-[15px] leading-relaxed whitespace-pre-line">
          {product.description}
        </div>
      </div>

      {/* Reviews */}
      <ProductReviews
        slug={product.slug}
        initialReviews={(product.reviews || []).slice().reverse()}
        initialRating={product.rating || 0}
      />
    </div>
  );
}
