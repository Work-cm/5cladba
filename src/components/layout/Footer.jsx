'use client';

import Link from 'next/link';
import { FaTelegramPlane, FaWhatsapp, FaBitcoin } from 'react-icons/fa';
import { HiOutlineArrowRight as HiArrowRight } from 'react-icons/hi';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const footerLinks = {
  Shop: [
    { href: '/products', label: 'All Products' },
    { href: '/products?category=k2-paper-sheets', label: 'K2 Paper Sheets' },
    { href: '/products?category=k2-liquid-spray', label: 'K2 Liquid Spray' },
    { href: '/products?category=k2-powder', label: 'K2 Powder' },
    { href: '/products?category=etomidate', label: 'Etomidate' },
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/faq', label: 'FAQ' },
    { href: '/shipping', label: 'Shipping Info' },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => { setStatus('done'); setEmail(''); setTimeout(() => setStatus('idle'), 3000); }, 800);
  };

  return (
    <footer className="relative bg-sky-900 text-white overflow-hidden">

      {/* Watermark brand name */}
      <div className="absolute top-0 left-0 right-0 flex items-start justify-center pointer-events-none overflow-hidden select-none" aria-hidden>
        <span className="font-black text-transparent leading-none" style={{ fontSize: 'clamp(4rem,14vw,12rem)', WebkitTextStroke: '1px rgba(134,239,172,0.10)', marginTop: '-0.15em' }}>K2PaperLiquid</span>
      </div>{/* Main grid */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-14">

          {/* Brand — spans 2 cols */}
          <div className="col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shadow-xl shadow-sky-500/25 group-hover:scale-105 transition-transform">
                <span className="text-white font-black text-sm leading-none">K2</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-black text-lg tracking-tight">K2Paper<span className="text-sky-400">Liquid</span></span>
                <span className="text-sky-200/60 text-[9px] tracking-[0.2em] uppercase mt-0.5">k2paperliquid.com</span>
              </div>
            </Link>

            <p className="text-sky-100/70 text-sm leading-relaxed max-w-xs">Premium K2 paper sheets, K2 liquid spray and K2 powder. Strong, consistent quality with discreet worldwide shipping.</p>


            {/* Contact quick links */}
            <div className="space-y-2">
              <a href="https://t.me/+19102279379" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-sky-100/70 hover:text-white transition-colors">
                <FaTelegramPlane className="text-sky-400 text-xs shrink-0" /> Telegram &mdash; +1 910 227 9379
              </a>
              <a href="https://wa.me/19062613088" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-sky-100/70 hover:text-white transition-colors">
                <FaWhatsapp className="text-sky-400 text-xs shrink-0" /> WhatsApp Support
              </a>

              {/* Payment method */}
              <div className="flex items-center gap-2.5 text-sm pt-1">
                <FaBitcoin className="text-amber-400 text-2xl shrink-0" />
                <span className="text-sky-100/70 text-base">Payment: <span className="text-amber-300 font-bold">Bitcoin (BTC) only</span></span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-sky-300 mb-5">{section}</h4>
              <ul className="space-y-3">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="group text-sm text-sky-100/70 hover:text-white transition-colors flex items-center gap-1.5">
                      <span className="w-0 group-hover:w-2 h-px bg-sky-400 transition-all duration-200 shrink-0" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Trust badges row */}
      <div className="relative z-10 border-t border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {['Premium Quality', 'Strong & Consistent', 'Discreet Packaging', 'Secure Checkout', '48h Dispatch', 'Bitcoin (BTC) Payments'].map(b => (
              <span key={b} className="text-xs text-sky-100/60 font-medium flex items-center gap-1.5">
                <span className="w-1 h-1 bg-sky-400 rounded-full" /> {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/10">
        <div className="container mx-auto px-6 py-5 flex items-center justify-center">
          <p className="text-sky-100/40 text-xs">&copy; {new Date().getFullYear()} K2PaperLiquid.com. All rights reserved.</p>
        </div>
      </div>

    </footer>
  );
}
