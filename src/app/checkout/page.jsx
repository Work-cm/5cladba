'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/components/cart/CartProvider';
import OrderSummary from '@/components/checkout/OrderSummary';
import OrderContactForm from '@/components/checkout/OrderContactForm';
import { FaLock, FaBitcoin } from 'react-icons/fa';

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({
    subtotal: 0,
    shipping: 40,
    tax: 0,
    total: 0
  });

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/cart');
      return;
    }

    const subtotal = cart.reduce((sum, item) => sum + ((item.price ?? 0) * item.quantity), 0);
    const shipping = 40; // Flat shipping fee
    const tax = 0; // No tax
    const total = subtotal + shipping + tax;

    setOrderDetails({ subtotal, shipping, tax, total });
    setLoading(false);
  }, [router, cart]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sky-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb + secure badge */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-900">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <Link href="/cart" className="hover:text-gray-900">Cart</Link>
            <span>/</span>
            <span className="text-gray-900">Checkout</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
            <FaLock className="text-xs" />
            Secure Checkout
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Complete Your Order</h1>

        {/* Payment method notice */}
        <div className="mb-6 flex items-center gap-3.5 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
          <div className="w-12 h-12 rounded-xl bg-amber-400/20 flex items-center justify-center shrink-0">
            <FaBitcoin className="text-amber-500 text-3xl" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">We accept Bitcoin (BTC) only</p>
            <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
              After you send your order on WhatsApp or Telegram, we&apos;ll reply with our BTC wallet address and exact payment instructions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order form */}
          <div className="lg:col-span-2 space-y-4">
            {/* Order contact form */}
            <OrderContactForm cart={cart} orderDetails={orderDetails} />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <OrderSummary cartItems={cart} orderDetails={orderDetails} />

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-2">Need help?</h3>
              <p className="text-gray-500 text-xs mb-4 leading-relaxed">
                Questions about your order? Our team is here to assist.
              </p>
              <a href="https://wa.me/19062613088" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sky-500 hover:text-sky-600 text-sm font-semibold transition-colors">
                Contact Support &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
