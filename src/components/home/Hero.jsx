'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaTruck, FaBitcoin, FaLock, FaStar, FaArrowRight } from 'react-icons/fa';
import { LogoMark } from '@/components/common/Logo';

const chips = [
  { Icon: FaTruck, text: '48h dispatch' },
  { Icon: FaLock, text: 'Plain packaging' },
  { Icon: FaBitcoin, text: 'Bitcoin accepted' },
  { Icon: FaStar, text: '10K+ customers' },
];

const words = [
  { text: 'Premium', cls: '' },
  { text: 'K2,', cls: 'italic text-cyan-300' },
  { text: 'Lab', cls: '' },
  { text: 'Standard.', cls: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-300' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const word = {
  hidden: { y: '110%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(query.trim() ? `/products?search=${encodeURIComponent(query.trim())}` : '/products');
  };

  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-lab.jpg"
          alt="Laboratory grade K2 products"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-deep/85 via-ink-deep/75 to-ink-deep/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-deep/60 to-transparent" />
      </div>

      <div className="relative container mx-auto px-6 pt-28 pb-24 lg:pt-36 lg:pb-32 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 border border-white/15 bg-white/[0.07] backdrop-blur-md rounded-full pl-2 pr-5 py-2 mb-10"
        >
          <LogoMark size={22} />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/70">K2LiquidStore.com</span>
        </motion.div>

        {/* Word-by-word masked headline */}
        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="font-display font-black text-white leading-[1.02] tracking-tight mx-auto"
          style={{ fontSize: 'clamp(3rem,8vw,6.8rem)' }}
        >
          {words.map(({ text, cls }) => (
            <span key={text} className="inline-block overflow-hidden align-bottom pb-1 -mb-1">
              <motion.span variants={word} className={`inline-block ${cls}`}>{text}&nbsp;</motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl mx-auto mt-6"
        >
          K2 paper sheets, liquid spray and cannabinoid powder — lab-checked, sealed fresh and shipped in plain packaging to 50+ countries.
        </motion.p>

        {/* Inline search */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex w-full max-w-lg mx-auto mt-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 p-1.5 focus-within:border-cyan-300/60 focus-within:bg-white/15 transition-all"
        >
          <div className="flex items-center pl-4 pr-2 text-white/50">
            <FaSearch size={13} />
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search paper sheets, sprays, powders..."
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/40 min-w-0"
          />
          <button
            type="submit"
            className="group inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-ink font-black text-sm px-6 py-3 rounded-full transition-all shrink-0"
          >
            Search <FaArrowRight size={10} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </motion.form>

        {/* Trust chips */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-10"
        >
          {chips.map(({ Icon, text }) => (
            <span key={text} className="inline-flex items-center gap-2 text-white/60 text-xs font-semibold border border-white/15 rounded-full px-4 py-2 bg-white/[0.05]">
              <Icon className="text-cyan-300 text-[11px]" /> {text}
            </span>
          ))}
        </motion.div>

        {/* Shop link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-12"
        >
          <Link href="/products" className="group inline-flex items-center gap-3 text-white/80 hover:text-white text-sm font-bold uppercase tracking-[0.2em] transition-colors">
            <span className="border-b-2 border-cyan-300 pb-1 group-hover:border-cyan-200 transition-colors">Browse the catalog</span>
            <span className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center group-hover:bg-cyan-400 group-hover:border-cyan-400 group-hover:text-ink transition-all">
              <FaArrowRight size={10} />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Bottom edge curve into page */}
      <div className="relative h-14 overflow-hidden">
        <svg viewBox="0 0 1440 56" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" aria-hidden>
          <path d="M0 56 C360 0 1080 0 1440 56 L1440 56 L0 56 Z" fill="#faf8f2" />
        </svg>
      </div>
    </section>
  );
}
