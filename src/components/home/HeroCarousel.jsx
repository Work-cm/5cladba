'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaArrowLeft, FaTruck, FaCheckCircle, FaFlask, FaGlobeAmericas, FaBoxOpen, FaStar, FaFileAlt, FaSprayCan, FaLeaf } from 'react-icons/fa';

const slides = [
  {
    id: 0,
    image: '/images/Laboratory-Science.jpg',
    imagePos: 'object-center',
    pill: { color: 'bg-sky-500/20 border-sky-400/30', dot: 'bg-sky-400', text: 'text-sky-300', label: 'K2 Paper Sheets' },
    headline: 'K2 Infused',
    accent: 'Paper Sheets.',
    accentColor: 'from-sky-300 via-cyan-300 to-sky-400',
    sub: 'Evenly coated A4 and letter-size K2 paper sheets. Strong, consistent and odourless — discreetly shipped in plain packaging worldwide.',
    href: '/products?category=k2-paper-sheets',
    cta: 'Shop K2 Paper Sheets',
    ctaStyle: 'bg-sky-500 hover:bg-sky-400 shadow-sky-900/40',
    overlay: 'from-sky-900 via-sky-900/95 to-sky-900/60',
    stats: [
      { Icon: FaFileAlt, value: 'A4', label: 'Full Sheets' },
      { Icon: FaCheckCircle, value: 'Even', label: 'Coating' },
      { Icon: FaBoxOpen, value: 'Plain', label: 'Packaging' },
    ],
  },
  {
    id: 1,
    image: '/images/GettyImages-563374209.png',
    imagePos: 'object-top',
    pill: { color: 'bg-sky-500/20 border-sky-400/30', dot: 'bg-sky-400', text: 'text-sky-300', label: 'K2 Liquid Spray' },
    headline: 'K2 Liquid',
    accent: 'Spray.',
    accentColor: 'from-sky-300 via-cyan-300 to-sky-400',
    sub: 'High-strength K2 liquid spray in sealed bottles. Easy to apply on paper or herbs, long-lasting and reliably potent every time.',
    href: '/products?category=k2-liquid-spray',
    cta: 'Shop K2 Liquid Spray',
    ctaStyle: 'bg-sky-500 hover:bg-sky-400 shadow-sky-900/40',
    overlay: 'from-sky-900 via-sky-900/95 to-sky-900/60',
    stats: [
      { Icon: FaSprayCan, value: 'Sealed', label: 'Bottles' },
      { Icon: FaTruck, value: '48h', label: 'Dispatch' },
      { Icon: FaGlobeAmericas, value: '50+', label: 'Countries' },
    ],
  },
  {
    id: 2,
    image: '/images/MA_0449a.webp',
    imagePos: 'object-center',
    pill: { color: 'bg-sky-500/20 border-sky-400/30', dot: 'bg-sky-400', text: 'text-sky-300', label: 'K2 Powder' },
    headline: 'Cannabinoid',
    accent: 'K2 Powder.',
    accentColor: 'from-sky-300 via-cyan-300 to-sky-400',
    sub: 'Pure cannabinoid K2 powder for making your own paper, spray or blends. Lab-tested purity, sold by the gram with fast discreet delivery.',
    href: '/products?category=k2-powder',
    cta: 'Shop K2 Powder',
    ctaStyle: 'bg-sky-500 hover:bg-sky-400 shadow-sky-900/40',
    overlay: 'from-sky-900 via-sky-900/95 to-sky-900/60',
    stats: [
      { Icon: FaLeaf, value: 'Pure', label: 'Cannabinoid' },
      { Icon: FaFlask, value: 'Lab', label: 'Tested' },
      { Icon: FaStar, value: '10K+', label: 'Customers' },
    ],
  },
];

const DURATION = 7000;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
  exit:   { transition: { staggerChildren: 0.06, staggerDirection: -1 } },
};

const itemVariants = {
  hidden:   { opacity: 0, y: 28, filter: 'blur(4px)' },
  visible:  { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.6,  ease: [0.22, 1, 0.36, 1] } },
  exit:     { opacity: 0, y: -16, filter: 'blur(4px)', transition: { duration: 0.28, ease: 'easeIn' } },
};

const headVariants = {
  hidden:   { opacity: 0, y: 44, filter: 'blur(6px)' },
  visible:  { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.7,  ease: [0.22, 1, 0.36, 1] } },
  exit:     { opacity: 0, y: -22, filter: 'blur(6px)', transition: { duration: 0.28, ease: 'easeIn' } },
};

const statVariants = {
  hidden:  { opacity: 0, scale: 0.82, y: 18 },
  visible: (i) => ({ opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] } }),
  exit:    { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  const goTo = useCallback((i) => { setCurrent(i); setProgress(0); }, []);
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    if (paused) { clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(() => {
      setProgress(p => { if (p >= 100) { next(); return 0; } return p + (100 / (DURATION / 50)); });
    }, 50);
    return () => clearInterval(intervalRef.current);
  }, [paused, next]);

  const slide = slides[current];

  return (
    <section
      className="relative w-full h-screen min-h-[620px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background images */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`bg-${slide.id}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image src={slide.image} alt="" fill className={`object-cover ${slide.imagePos}`} priority sizes="100vw" />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />
          <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-sky-900 via-sky-900/70 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Soft green glow orbs */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-24 w-[34rem] h-[34rem] rounded-full bg-sky-500/20 blur-[120px]" />
        <div className="absolute bottom-0 -left-32 w-[28rem] h-[28rem] rounded-full bg-cyan-300/[0.15] blur-[110px]" />
        <div className="absolute top-1/3 left-1/2 w-[20rem] h-[20rem] rounded-full bg-sky-300/10 blur-[100px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center pt-20 pb-24">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${slide.id}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col bg-sky-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl"
            >
              {/* Category pill */}
              <motion.div variants={itemVariants} className={`inline-flex items-center gap-2 border backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 ${slide.pill.color}`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${slide.pill.dot}`} />
                <span className={`text-xs font-bold uppercase tracking-widest ${slide.pill.text}`}>{slide.pill.label}</span>
              </motion.div>

              {/* Headline */}
              <motion.h1 variants={headVariants} className="font-black text-white tracking-tighter leading-[0.9] mb-5" style={{ fontSize: 'clamp(2.6rem,6.5vw,5.6rem)' }}>
                {slide.headline}
                <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${slide.accentColor}`}>
                  {slide.accent}
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p variants={itemVariants} className="text-gray-100/90 text-base leading-relaxed max-w-xl mb-8">{slide.sub}</motion.p>

              {/* Mini stats strip */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-8">
                {slide.stats.map(({ Icon, value, label }, i) => (
                  <motion.div
                    key={label}
                    custom={i}
                    variants={statVariants}
                    className="flex items-center gap-2.5 bg-sky-900/40 backdrop-blur-md border border-sky-300/20 rounded-2xl px-4 py-2.5 hover:border-sky-300/40 transition-colors"
                  >
                    <Icon className="text-sky-300 text-sm shrink-0" />
                    <div>
                      <p className="text-white font-black text-sm leading-none">{value}</p>
                      <p className="text-gray-300 text-[10px] mt-0.5">{label}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Buttons */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
                <Link
                  href={slide.href}
                  className={`group inline-flex items-center gap-2.5 ${slide.ctaStyle} text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-xl hover:-translate-y-1 text-base`}
                >
                  {slide.cta}
                  <FaArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="https://wa.me/19062613088"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.15] backdrop-blur-sm border border-white/[0.15] text-white font-semibold px-8 py-4 rounded-2xl transition-all hover:-translate-y-1 text-base"
                >
                  Contact Us
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* Bottom control bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-[2px] bg-white/10">
          <motion.div className="h-full bg-gradient-to-r from-sky-400 to-cyan-300" style={{ width: `${progress}%` }} />
        </div>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Slide dots */}
          <div className="flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 rounded-full ${i === current ? 'w-10 h-2.5 bg-sky-300' : 'w-2.5 h-2.5 bg-white/25 hover:bg-sky-300/60'}`}
              />
            ))}
          </div>
          {/* Slide label */}
          <p className="text-white/30 text-xs font-mono hidden sm:block">
            <span className="text-white/70 font-bold">0{current + 1}</span> / 0{slides.length}
          </p>
          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button onClick={prev} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.08] hover:bg-white/20 border border-white/10 text-white/50 hover:text-white transition-all backdrop-blur-sm">
              <FaArrowLeft size={12} />
            </button>
            <button onClick={next} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.08] hover:bg-white/20 border border-white/10 text-white/50 hover:text-white transition-all backdrop-blur-sm">
              <FaArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
