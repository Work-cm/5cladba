'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { FaFlask, FaBoxOpen, FaGlobeAmericas, FaHeadset, FaLayerGroup, FaShieldAlt } from 'react-icons/fa';

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  );
}

const values = [
  {
    Icon: FaFlask,
    title: 'Consistent quality',
    text: 'Every batch is checked before it goes on sale, so you get the same strength and quality on every single order — no exceptions.',
  },
  {
    Icon: FaBoxOpen,
    title: 'Discreet and secure delivery',
    text: 'Orders are packaged in plain, unmarked parcels with no external branding. Transactions are processed through industry-standard encryption. We never share or sell customer data.',
  },
  {
    Icon: FaGlobeAmericas,
    title: 'Worldwide reach, local speed',
    text: 'Express and standard courier options to most countries. Every shipment includes tracking from door to door. Our average dispatch time is under 48 hours from confirmation.',
  },
  {
    Icon: FaHeadset,
    title: 'Dedicated customer support',
    text: 'Our support team responds quickly via email and WhatsApp. Whether you need help choosing a product or resolving a shipping issue, we are here to help.',
  },
  {
    Icon: FaLayerGroup,
    title: 'Focused catalog',
    text: 'We keep our range tight — cannabinoids, etomidate and research chemicals — so every product stays in stock and up to standard.',
  },
  {
    Icon: FaShieldAlt,
    title: 'Fair dispute resolution',
    text: 'If something goes wrong, we fix it. Claims and refunds are processed within 7 business days. No automated runaround, no lengthy disputes.',
  },
];

const promises = [
  ['Quality-checked batches', 'Every batch is inspected before listing to keep quality consistent.'],
  ['No substitutions — ever', 'You receive exactly what you order, every time. No silent swaps.'],
  ['48-hour dispatch', 'Orders are processed and dispatched within two business days of confirmation.'],
  ['Plain packaging worldwide', 'Discreet, unmarked parcels on every shipment, to every destination.'],
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ink-deep text-white">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_15%_0%,rgba(34,211,238,0.14),transparent),radial-gradient(ellipse_45%_40%_at_90%_90%,rgba(56,189,248,0.08),transparent)]" />
        <div className="relative z-10 container mx-auto px-6 pt-36 pb-20 max-w-3xl">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-10">
            <Link href="/" className="hover:text-cyan-300 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">About</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-cyan-300 text-[11px] font-black uppercase tracking-[0.22em] mb-5">
              <span className="w-6 h-px bg-cyan-300" /> About Us
            </span>
            <h1 className="font-display font-black text-white tracking-tight leading-[1.05] mb-6 text-4xl md:text-5xl">
              Premium cannabinoids, etomidate and research chemicals shipped fast and discreet, worldwide.
            </h1>
            <p className="text-white/55 text-lg leading-relaxed">
              5fadb5cladba is a specialist supplier of cannabinoids, etomidate vapes and research chemicals. We serve customers across more than 50 countries with consistent quality, fast dispatch and plain, discreet packaging on every order.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-white/10">
        <div className="container mx-auto px-6 py-10 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-10">
            {[
              ['3', 'specialist product lines'],
              ['100%', 'Discreet packaging'],
              ['10K+', 'Customers served'],
              ['48h', 'Dispatch time'],
            ].map(([val, label]) => (
              <FadeUp key={label}>
                <div className="border-l border-cyan-300/30 pl-5">
                  <p className="font-display text-4xl font-black text-white leading-none">{val}</p>
                  <p className="text-white/45 text-[11px] uppercase tracking-[0.18em] font-bold mt-2">{label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Story + image */}
      <section className="container mx-auto px-6 py-24 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeUp>
            <div>
              <span className="inline-flex items-center gap-2 text-cyan-300 text-[11px] font-black uppercase tracking-[0.22em] mb-5">
                <span className="w-6 h-px bg-cyan-300" /> Our Story
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-black text-white tracking-tight mb-6">Built for reliable supply</h2>
              <div className="space-y-5 text-white/55 leading-relaxed">
                <p>
                  5fadb5cladba was founded on a simple premise: getting premium research-grade products shouldn't be complicated or risky. We set out to build a store that pairs consistent product with the speed and discretion customers expect.
                </p>
                <p>
                  Today our catalog focuses on <strong className="text-white">cannabinoids, etomidate vapes and research chemicals</strong>. Every batch we stock is quality-checked before it's listed, so you get the same strong product every time.
                </p>
                <p>
                  Orders are packed in plain unmarked packaging, dispatched within 48 hours, and shipped discreetly to over 50 countries.
                </p>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="relative h-[380px] md:h-[460px] rounded-2xl overflow-hidden border border-white/10 group">
              <Image
                src="/images/hero-lab.jpg"
                alt="Research vials and pipette in the lab"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/80 via-ink-deep/10 to-transparent" />
              <span className="absolute bottom-5 left-5 bg-cyan-400 text-ink text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">Lab Verified</span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* What we stand for — card grid */}
      <section className="relative overflow-hidden border-y border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_85%_0%,rgba(34,211,238,0.09),transparent)]" />
        <div className="relative container mx-auto px-6 py-24 max-w-5xl">
          <FadeUp>
            <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
              <div>
                <span className="inline-flex items-center gap-2 text-cyan-300 text-[11px] font-black uppercase tracking-[0.22em]">
                  <span className="w-6 h-px bg-cyan-300" /> Principles
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-black text-white tracking-tight mt-3">What we stand for</h2>
              </div>
            </div>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map(({ Icon, title, text }, i) => (
              <FadeUp key={title} delay={i * 0.05}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:border-cyan-300/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/15 text-cyan-300 mb-5 group-hover:bg-cyan-400 group-hover:text-ink transition-colors">
                    <Icon className="text-sm" />
                  </span>
                  <h3 className="font-display text-white font-black text-lg tracking-tight mb-2">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Four promises — ghost numbers */}
      <section className="container mx-auto px-6 py-24 max-w-5xl">
        <FadeUp>
          <span className="inline-flex items-center gap-2 text-cyan-300 text-[11px] font-black uppercase tracking-[0.22em] mb-3">
            <span className="w-6 h-px bg-cyan-300" /> Commitments
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-black text-white tracking-tight mb-12">Our four promises</h2>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
          {promises.map(([title, desc], i) => (
            <FadeUp key={title} delay={i * 0.06}>
              <div className="flex gap-5 items-start">
                <span className="font-display font-black text-5xl leading-none text-white/15 select-none">0{i + 1}</span>
                <div>
                  <h3 className="text-white font-bold mb-1.5">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_120%,rgba(34,211,238,0.15),transparent)]" />
        <div className="relative container mx-auto px-6 py-24 max-w-3xl text-center">
          <FadeUp>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to get started?</h2>
            <p className="text-white/55 max-w-lg mx-auto mb-8 leading-relaxed">
              Browse our cannabinoids, etomidate vapes and research chemicals. Every order ships fast and discreet.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/products" className="group inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-ink font-bold px-8 py-3.5 rounded-2xl transition-all hover:-translate-y-0.5 text-sm shadow-lg shadow-cyan-500/25">
                Browse Products <HiOutlineArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a href="https://wa.me/15125922145" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/20 text-white hover:text-cyan-300 hover:border-cyan-300/50 font-bold px-8 py-3.5 rounded-2xl transition-all hover:-translate-y-0.5 text-sm">
                Contact Us
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
