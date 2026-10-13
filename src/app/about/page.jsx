'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { HiOutlineArrowRight } from 'react-icons/hi';

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50 to-white pointer-events-none" />
        <div className="relative z-10 container mx-auto px-6 pt-36 pb-20 max-w-3xl">
          <nav className="flex items-center gap-2 text-xs text-gray-900 mb-10">
            <Link href="/" className="hover:text-sky-500 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900">About</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sky-500 text-xs font-bold uppercase tracking-[0.25em] mb-4">About Us</p>
            <h1 className="font-black text-gray-900 tracking-tight leading-[1.05] mb-6 text-4xl md:text-5xl">
              Premium K2 paper sheets, liquid spray and powder shipped fast and discreet, worldwide.
            </h1>
            <p className="text-gray-900 text-lg leading-relaxed">
              K2LiquidStore is a specialist supplier of K2 paper sheets, K2 liquid spray and cannabinoid K2 powder. We serve customers across more than 50 countries with consistent quality, fast dispatch and plain, discreet packaging on every order.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-gray-100">
        <div className="container mx-auto px-6 py-10 max-w-3xl">
          <div className="flex flex-wrap justify-between gap-y-6 gap-x-10">
            {[
              ['3', 'K2 product lines'],
              ['100%', 'Discreet packaging'],
              ['10K+', 'Customers served'],
              ['48h', 'Dispatch time'],
            ].map(([val, label]) => (
              <FadeUp key={label}>
                <div>
                  <p className="text-3xl font-black text-gray-900 leading-none">{val}</p>
                  <p className="text-gray-900 text-sm mt-1">{label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-6 py-20 max-w-3xl">
        <FadeUp>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-6">Our story</h2>
          <div className="space-y-5 text-gray-900 leading-relaxed">
            <p>
              K2LiquidStore was founded on a simple premise: getting strong, high-quality K2 products shouldn't be complicated or risky. We set out to build a store that pairs consistent product with the speed and discretion customers expect.
            </p>
            <p>
              Today our catalog focuses on <strong className="text-gray-900">K2 paper sheets, K2 liquid spray and cannabinoid K2 powder</strong>. Every batch we stock is quality-checked before it's listed, so you get the same strong product every time.
            </p>
            <p>
              Our team understands what reliable supply means. Orders are packed in plain unmarked packaging, dispatched within 48 hours, and shipped discreetly to over 50 countries.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* Image break */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <Image src="/images/Laboratory-Science.jpg" alt="Laboratory" fill className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-sky-900/30" />
      </section>

      {/* What we stand for */}
      <section className="container mx-auto px-6 py-20 max-w-3xl">
        <FadeUp>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-6">What we stand for</h2>
        </FadeUp>

        <div className="space-y-10">
          {[
            {
              title: 'Consistent quality',
              text: 'Every batch is checked before it goes on sale, so you get the same strength and quality on every single order — no exceptions.',
            },
            {
              title: 'Discreet and secure delivery',
              text: 'Orders are packaged in plain, unmarked parcels with no external branding. Transactions are processed through industry-standard encryption. We never share or sell customer data.',
            },
            {
              title: 'Worldwide reach, local speed',
              text: 'Express and standard courier options to most countries. Every shipment includes tracking from door to door. Our average dispatch time is under 48 hours from confirmation.',
            },
            {
              title: 'Dedicated customer support',
              text: 'Our support team responds quickly via email and WhatsApp. Whether you need help choosing a product or resolving a shipping issue, we are here to help.',
            },
            {
              title: 'Focused catalog',
              text: 'We keep our range tight — K2 paper, spray and powder — so every product stays in stock and up to standard.',
            },
            {
              title: 'Fair dispute resolution',
              text: 'If something goes wrong, we fix it. Claims and refunds are processed within 7 business days. No automated runaround, no lengthy disputes.',
            },
          ].map(({ title, text }, i) => (
            <FadeUp key={title} delay={i * 0.04}>
              <div className="flex gap-4">
                <span className="w-1.5 rounded-full bg-sky-400 shrink-0 mt-1.5 self-stretch" />
                <div>
                  <h3 className="text-gray-900 font-bold text-lg mb-1">{title}</h3>
                  <p className="text-gray-900 leading-relaxed">{text}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Commitments — simple numbered list */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6 py-20 max-w-3xl">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-10">Our four promises</h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
            {[
              ['Quality-checked batches', 'Every batch is inspected before listing to keep quality consistent.'],
              ['No substitutions — ever', 'You receive exactly what you order, every time. No silent swaps.'],
              ['48-hour dispatch', 'Orders are processed and dispatched within two business days of confirmation.'],
              ['Plain packaging worldwide', 'Discreet, unmarked parcels on every shipment, to every destination.'],
            ].map(([title, desc], i) => (
              <FadeUp key={title} delay={i * 0.06}>
                <div className="flex gap-3">
                  <span className="text-sky-400 font-black text-lg leading-none mt-0.5">0{i + 1}</span>
                  <div>
                    <h3 className="text-gray-900 font-bold text-sm mb-1">{title}</h3>
                    <p className="text-gray-900 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-20 max-w-3xl text-center">
        <FadeUp>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">Ready to get started?</h2>
          <p className="text-gray-900 max-w-lg mx-auto mb-8 leading-relaxed">
            Browse our K2 paper sheets, K2 liquid spray and cannabinoid K2 powder. Every order ships fast and discreet.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/products" className="group inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-8 py-3.5 rounded-2xl transition-all hover:-translate-y-0.5 text-sm shadow-lg shadow-sky-500/20">
              Browse Products <HiOutlineArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="https://wa.me/19062613088" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-gray-300 text-gray-900 hover:text-sky-600 hover:border-sky-400 font-bold px-8 py-3.5 rounded-2xl transition-all hover:-translate-y-0.5 text-sm">
              Contact Us
            </a>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
