'use client';

import Link from 'next/link';
import { FaTelegramPlane, FaWhatsapp, FaBitcoin, FaCheckCircle } from 'react-icons/fa';
import { HiOutlineArrowRight as HiArrowRight } from 'react-icons/hi2';
import { useState } from 'react';
import Logo, { LogoMark } from '@/components/common/Logo';

const footerLinks = {
  Shop: [
    { href: '/products', label: 'All Products' },
    { href: '/products?category=cannabinoids', label: 'Cannabinoids' },
    { href: '/products?category=etomidate', label: 'Etomidate' },
    { href: '/products?category=vapes-kpods', label: 'Vapes / K-Pods' },
    { href: '/products?category=research%20chemicals', label: 'Research Chems' },
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/faq', label: 'FAQ' },
    { href: '/shipping', label: 'Shipping Info' },
    { href: '/contact', label: 'Contact' },
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
    <footer className="relative bg-ink text-white overflow-hidden">
      {/* Giant serif wordmark band */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-6 pt-14 pb-8 flex flex-col items-center text-center">
          <LogoMark size={56} />
          <p className="font-display font-black tracking-tight mt-5 leading-none" style={{ fontSize: 'clamp(2.2rem,6vw,4.2rem)' }}>
            5FADB<span className="text-cyan-400">5CLADBA</span>
          </p>
          <p className="text-white/35 text-xs tracking-[0.3em] uppercase font-semibold mt-3">Lab standard &middot; Discreet &middot; Worldwide</p>
        </div>
      </div>

      {/* Main grid */}
      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 lg:gap-12">

          {/* Newsletter + brand blurb */}
          <div className="col-span-2 md:col-span-5 space-y-6">
            <div>
              <h4 className="font-display font-black text-2xl tracking-tight mb-2">Restocks &amp; new drops.</h4>
              <p className="text-white/45 text-sm leading-relaxed max-w-xs">One short email when new batches land. No spam.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full max-w-sm gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 bg-white/[0.06] border border-white/15 rounded-full px-5 py-3 text-sm text-white placeholder-white/35 outline-none focus:border-cyan-400 transition-colors"
              />
              <button
                type="submit"
                disabled={status !== 'idle'}
                className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-70 text-ink font-black text-sm px-5 py-3 rounded-full transition-all whitespace-nowrap"
              >
                {status === 'done' ? <><FaCheckCircle /> In</> : status === 'loading' ? '...' : <>Join <HiArrowRight size={13} /></>}
              </button>
            </form>

            <div className="space-y-2.5 pt-2">
              <a href="https://t.me/+19102279379" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-white/55 hover:text-white transition-colors">
                <span className="w-8 h-8 rounded-full bg-white/[0.07] border border-white/10 flex items-center justify-center shrink-0"><FaTelegramPlane className="text-cyan-300 text-xs" /></span> Telegram &mdash; +1 910 227 9379
              </a>
              <a href="https://wa.me/15125922145" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-white/55 hover:text-white transition-colors">
                <span className="w-8 h-8 rounded-full bg-white/[0.07] border border-white/10 flex items-center justify-center shrink-0"><FaWhatsapp className="text-cyan-300 text-xs" /></span> WhatsApp Support
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="md:col-span-2">
              <h4 className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-400 mb-5">{section}</h4>
              <ul className="space-y-3">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="group text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1.5">
                      <span className="w-0 group-hover:w-2 h-[2px] bg-cyan-400 rounded-full transition-all duration-200 shrink-0" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Assurance column */}
          <div className="col-span-2 md:col-span-3">
            <h4 className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-400 mb-5">Guaranteed</h4>
            <ul className="space-y-3">
              {['Dispatched within 48 hours', 'Plain, discreet packaging', 'Batch-tested consistency', 'Secure BTC checkout'].map((text) => (
                <li key={text} className="flex items-center gap-2.5 text-sm text-white/50">
                  <FaCheckCircle className="text-sky-400 text-[11px] shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
            <div className="inline-flex items-center gap-2.5 text-sm bg-white/[0.06] border border-white/10 rounded-2xl px-4 py-3 mt-6">
              <FaBitcoin className="text-cyan-400 text-xl shrink-0" />
              <span className="text-white/60">Payment: <span className="text-cyan-300 font-bold">Bitcoin (BTC) only</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-ink-deep">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">&copy; {new Date().getFullYear()} 5fadb5cladba.com. All rights reserved.</p>
          <div className="flex items-center gap-5 text-xs text-white/30">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/refund" className="hover:text-white transition-colors">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
