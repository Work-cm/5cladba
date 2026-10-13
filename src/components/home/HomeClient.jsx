'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaFlask, FaShoppingCart, FaStar, FaTruck, FaCheckCircle, FaQuoteLeft, FaShieldAlt, FaArrowRight, FaArrowLeft, FaVial, FaSprayCan, FaLeaf, FaBitcoin, FaTelegramPlane } from 'react-icons/fa';
import { HiOutlineArrowRight as HiArrowRight, HiOutlineArrowUpRight as HiArrowUpRight } from 'react-icons/hi2';
import { useCart } from '@/components/cart/CartProvider';
import SEOKeywords from '@/components/seo/SEOKeywords';
import HomeSEOContent from '@/components/seo/HomeSEOContent';
import Hero from '@/components/home/Hero';

export default function HomeClient({ featuredProducts = [] }) {
  return (
    <div className="min-h-screen bg-[#fdf6f9]">
      <SEOKeywords />
      <Hero />
      <PromiseStrip />
      <CategoryCollage />
      <FeaturedShelf products={featuredProducts} />
      <ProcessLedger />
      <TestimonialCarousel />
      <HomeSEOContent />
      <CTASlab />
    </div>
  );
}

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  );
}

function SectionHead({ eyebrow, title, link = '/products', linkText = 'View all' }) {
  return (
    <FadeUp>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
        <div>
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-ink tracking-tight leading-[1.02]">{title}</h2>
        </div>
        <Link href={link} className="group inline-flex items-center gap-2 text-ink text-sm font-bold w-fit">
          <span className="border-b-2 border-cyan-500 pb-0.5 group-hover:border-sky-600 transition-colors">{linkText}</span>
          <span className="w-7 h-7 rounded-full border border-ink/20 flex items-center justify-center group-hover:bg-sky-700 group-hover:border-sky-700 group-hover:text-white transition-all">
            <HiArrowUpRight size={12} />
          </span>
        </Link>
      </div>
    </FadeUp>
  );
}

/* ============ Promise strip — bordered stat row ============ */
function PromiseStrip() {
  const items = [
    { Icon: FaTruck, label: 'Dispatched in 48h', sub: 'Tracked worldwide' },
    { Icon: FaShieldAlt, label: 'Batch tested', sub: 'Every order QC checked' },
    { Icon: FaBitcoin, label: 'BTC only', sub: 'Private & secure checkout' },
    { Icon: FaCheckCircle, label: '50+ countries', sub: 'Discreet packaging' },
  ];
  return (
    <section className="bg-[#fdf6f9] border-b border-ink/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-ink/10 border-x border-ink/10">
          {items.map(({ Icon, label, sub }, i) => (
            <FadeUp key={label} delay={i * 0.05}>
              <div className="flex items-center gap-4 px-6 py-7">
                <span className="w-10 h-10 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center shrink-0">
                  <Icon className="text-sky-700 text-sm" />
                </span>
                <div>
                  <p className="text-ink font-black text-sm leading-tight">{label}</p>
                  <p className="text-ink/40 text-xs mt-0.5">{sub}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Categories — asymmetric editorial collage ============ */
const collageCategories = [
  { href: '/products?category=cannabinoids', img: '/images/k2-powder/5-fadb-powder.jpg', Icon: FaLeaf, n: '01', title: 'Cannabinoids', desc: 'Synthetic cannabinoid powders and precursor kits — lab-tested, batch-verified.', tall: true },
  { href: '/products?category=etomidate', img: '/images/etomidate/etomidate-powder-pure.jpg', Icon: FaFlask, n: '02', title: 'Etomidate', desc: 'High-purity etomidate powders and crystals, COA included.' },
  { href: '/products?category=vapes-kpods', img: '/images/vapes/etomidate-vape-k-pod-classic.jpg', Icon: FaSprayCan, n: '03', title: 'Vapes / K-Pods', desc: 'Pre-filled etomidate vape pods, disposables and starter kits.' },
  { href: '/products?category=research%20chemicals', img: '/images/Laboratory-Science.jpg', Icon: FaVial, n: '04', title: 'Research Chemicals', desc: 'Lab-grade research chemicals, batch-tested for consistency.' },
];

function CategoryCollage() {
  return (
    <section className="relative py-24 bg-ink-deep overflow-hidden">
      {/* Ambient glow accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_15%_0%,rgba(34,211,238,0.12),transparent),radial-gradient(ellipse_50%_40%_at_85%_100%,rgba(56,189,248,0.10),transparent)]" />

      <div className="container mx-auto px-6 relative">
        {/* Dark section header */}
        <FadeUp>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div>
              <span className="inline-flex items-center gap-2 text-cyan-300 text-[11px] font-black uppercase tracking-[0.22em]">
                <span className="w-6 h-px bg-cyan-300" /> The Catalog
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.02] mt-3">
                Four lines.<br />One standard.
              </h2>
            </div>
            <Link href="/products" className="group inline-flex items-center gap-2 text-cyan-300 text-xs font-black uppercase tracking-[0.22em] border-b border-cyan-300/30 pb-1 hover:border-cyan-300 transition-colors">
              All products <FaArrowRight size={10} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeUp>

        {/* Portrait image cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {collageCategories.map(({ href, img, Icon, n, title, desc }, i) => (
            <FadeUp key={href} delay={0.05 + i * 0.07}>
              <Link
                href={href}
                className="group relative block h-[440px] rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-300/50 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                <Image
                  src={img}
                  alt={title}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/35 to-ink-deep/10" />

                {/* Ghost index number */}
                <span className="absolute top-5 right-5 font-display font-black text-white/15 text-6xl leading-none group-hover:text-cyan-300/40 transition-colors">{n}</span>

                {i === 0 && (
                  <span className="absolute top-5 left-5 bg-cyan-400 text-ink text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">Flagship</span>
                )}

                {/* Card content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-cyan-300 mb-4 group-hover:bg-cyan-400 group-hover:text-ink transition-colors">
                    <Icon className="text-sm" />
                  </span>
                  <h3 className="font-display text-white font-black text-2xl tracking-tight">{title}</h3>
                  <p className="text-white/55 text-xs leading-relaxed mt-2 line-clamp-2">{desc}</p>
                  <span className="inline-flex items-center gap-2 mt-4 text-cyan-300 text-[11px] font-black uppercase tracking-[0.2em]">
                    Shop now <FaArrowRight size={9} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Featured — sharp product shelf ============ */
function ProductCard({ product, addedId, onAddToCart }) {
  const displayPrice = product.price && product.price > 0
    ? product.price
    : product.priceVariants && product.priceVariants.length > 0
      ? product.priceVariants.reduce((min, v) => v.price < min ? v.price : min, product.priceVariants[0]?.price || 0)
      : 0;

  return (
    <div className="relative group bg-white border border-ink/10 rounded-lg overflow-hidden hover:border-sky-500 transition-all duration-300 hover:shadow-xl hover:shadow-sky-200/60 hover:-translate-y-1 flex flex-col">
      {product.countInStock <= 0 && <div className="absolute top-3 left-3 z-10 bg-ink text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">Sold Out</div>}
      <Link href={`/products/${product.slug}`} className="relative block aspect-square bg-sky-50 overflow-hidden shrink-0">
        {product.images?.[0] ? (
          <Image src={product.images[0]} alt={product.name} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.onerror = null; e.target.src = '/images/Laboratory-Science.jpg'; }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center"><FaFlask className="text-gray-400 text-4xl" /></div>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-cyan-700 text-[10px] font-black uppercase tracking-widest">{product.category}</span>
          <div className="flex gap-0.5">{[1,2,3,4,5].map(n => <FaStar key={n} className={`text-[9px] ${n <= Math.round(product.rating||0) ? 'text-cyan-500' : 'text-gray-200'}`} />)}</div>
        </div>
        <Link href={`/products/${product.slug}`}><h3 className="text-ink font-bold text-sm leading-snug hover:text-sky-700 transition-colors line-clamp-2 mb-2">{product.name}</h3></Link>
        <p className="text-ink/45 text-xs leading-relaxed line-clamp-2 mb-4 flex-1">{product.description}</p>
        <div className="flex items-center justify-between pt-3 border-t border-ink/10">
          <div>
            <p className="text-xl font-black text-ink leading-none">&euro;{displayPrice.toFixed(2)}</p>
            <p className={`text-[10px] mt-1 font-semibold ${product.countInStock > 0 ? 'text-sky-700' : 'text-red-500'}`}>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</p>
          </div>
          {product.countInStock > 0 ? (
            <motion.button onClick={e => onAddToCart(e, product)} whileTap={{ scale: 0.93 }} className={`flex items-center gap-1.5 px-4 py-2.5 rounded-md text-xs font-black uppercase tracking-wider transition-all ${addedId === product._id ? 'bg-cyan-400 text-ink' : 'bg-ink hover:bg-sky-700 text-white'}`}>
              {addedId === product._id ? <><FaCheckCircle /> Added</> : <><FaShoppingCart /> Add</>}
            </motion.button>
          ) : (
            <button disabled className="px-4 py-2.5 rounded-md text-xs font-black uppercase bg-gray-100 text-gray-400 cursor-not-allowed">Sold Out</button>
          )}
        </div>
      </div>
    </div>
  );
}

function FeaturedShelf({ products = [] }) {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);

  const handleAddToCart = (e, product) => {
    e.preventDefault(); e.stopPropagation();
    addToCart(product, 1);
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1800);
    const button = e.currentTarget;
    const br = button.getBoundingClientRect();
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
      const cr = cartIcon.getBoundingClientRect();
      const dot = document.createElement('div');
      dot.style.cssText = `position:fixed;z-index:9999;width:12px;height:12px;border-radius:50%;background:#f089ac;box-shadow:0 0 12px rgba(240,137,172,.6);pointer-events:none;transition:transform 0.65s cubic-bezier(0.4,0,1,1),opacity 0.65s ease;top:${br.top + br.height / 2}px;left:${br.left + br.width / 2}px;`;
      document.body.appendChild(dot);
      requestAnimationFrame(() => { dot.style.transform = `translate(${cr.left - br.left}px,${cr.top - br.top}px) scale(0.3)`; dot.style.opacity = '0'; });
      setTimeout(() => { dot.remove(); cartIcon.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.35)' }, { transform: 'scale(1)' }], { duration: 300 }); }, 680);
    }
  };

  return (
    <section className="py-24 bg-white border-y border-ink/10">
      <div className="container mx-auto px-6">
        <SectionHead eyebrow="Featured" title={<>Best sellers,<br />fresh stock.</>} link="/products" linkText="View all" />

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.slice(0, 8).map((product, i) => (
              <FadeUp key={product._id} delay={(i % 4) * 0.06}>
                <ProductCard product={product} addedId={addedId} onAddToCart={handleAddToCart} />
              </FadeUp>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-600"><FaFlask className="text-5xl mx-auto mb-4 opacity-20" /><p className="text-sm">No featured products at the moment.</p></div>
        )}
      </div>
    </section>
  );
}

/* ============ Process — editorial ledger rows ============ */
const ledgerSteps = [
  { n: 'No. 1', title: 'Pick your product', desc: 'Choose from cannabinoids, etomidate, vapes and more. Add to cart and checkout securely in minutes.' },
  { n: 'No. 2', title: 'We check the batch', desc: 'Every batch is tested for strength and consistency before it leaves our hands.' },
  { n: 'No. 3', title: 'Discreet delivery', desc: 'Orders dispatched within 48h in plain unmarked packaging. Full tracking provided.' },
];

function ProcessLedger() {
  return (
    <section className="py-24 bg-[#fdf6f9]">
      <div className="container mx-auto px-6 max-w-4xl">
        <FadeUp>
          <div className="text-center mb-14">
            <p className="eyebrow justify-center mb-4">Process</p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-ink tracking-tight">How it works</h2>
          </div>
        </FadeUp>

        <div className="border-y border-ink/10 divide-y divide-ink/10">
          {ledgerSteps.map(({ n, title, desc }, i) => (
            <FadeUp key={n} delay={i * 0.1}>
              <div className="group grid grid-cols-1 md:grid-cols-[140px_1fr_auto] items-center gap-3 md:gap-8 py-8 px-2 hover:bg-white transition-colors">
                <span className="font-display font-black text-cyan-600 text-lg italic">{n}</span>
                <div>
                  <h3 className="font-display text-ink font-black text-2xl tracking-tight group-hover:text-sky-700 transition-colors">{title}</h3>
                  <p className="text-ink/50 text-sm leading-relaxed mt-1.5 max-w-lg">{desc}</p>
                </div>
                <span className="hidden md:flex w-10 h-10 rounded-full border border-ink/15 items-center justify-center text-ink/30 group-hover:bg-sky-700 group-hover:border-sky-700 group-hover:text-white transition-all">
                  <FaCheckCircle size={14} />
                </span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Testimonials — single quote carousel ============ */
const testimonials = [
  { text: "The etomidate powder is pure and consistent. Best I've ordered online, and it arrived in three days.", author: "J. Smith", role: "Verified Buyer" },
  { text: "Fast shipping, excellent service. The liquid spray is consistent every single time we order.", author: "L. Johnson", role: "Repeat Customer" },
  { text: "We rely on 5fadb5cladba for all our research chemical needs. Packaging is plain and discreet, exactly as promised.", author: "M. Williams", role: "Verified Buyer" },
  { text: "The powder is clean and potent. Made my own sheets with it and the results were great.", author: "A. Rodriguez", role: "Repeat Customer" },
  { text: "Great results on every order. 5fadb5cladba is my go-to for etomidate and vapes.", author: "K. Chen", role: "Verified Buyer" },
  { text: "Prompt support and discreet packaging. Exactly what I needed.", author: "T. Okafor", role: "Verified Buyer" },
];

function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const next = useCallback(() => { setDir(1); setIndex(i => (i + 1) % testimonials.length); }, []);
  const prev = () => { setDir(-1); setIndex(i => (i - 1 + testimonials.length) % testimonials.length); };

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  const t = testimonials[index];

  return (
    <section className="py-24 bg-white border-y border-ink/10">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <FadeUp>
          <p className="eyebrow justify-center mb-4">Testimonials</p>
          <FaQuoteLeft className="text-cyan-500 text-3xl mx-auto mb-6" />
        </FadeUp>

        <div className="relative min-h-[190px] sm:min-h-[160px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.4 }}
            >
              <p className="font-display text-ink text-2xl md:text-3xl font-semibold leading-snug tracking-tight">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center justify-center gap-3 mt-7">
                <div className="w-10 h-10 rounded-full bg-sky-700 flex items-center justify-center text-white font-black text-sm">{t.author[0]}</div>
                <div className="text-left">
                  <p className="text-ink font-bold text-sm leading-tight">{t.author}</p>
                  <p className="text-cyan-600 text-[11px] font-semibold">{t.role}</p>
                </div>
              </div>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-6 mt-10">
          <button onClick={prev} aria-label="Previous testimonial" className="w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center text-ink/60 hover:bg-ink hover:text-white hover:border-ink transition-all">
            <FaArrowLeft size={12} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }} aria-label={`Go to testimonial ${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-sky-700' : 'w-1.5 bg-ink/15 hover:bg-ink/30'}`} />
            ))}
          </div>
          <button onClick={next} aria-label="Next testimonial" className="w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center text-ink/60 hover:bg-ink hover:text-white hover:border-ink transition-all">
            <FaArrowRight size={12} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============ CTA — dark green slab ============ */
function CTASlab() {
  return (
    <section className="relative overflow-hidden bg-ink-deep">
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#f6b3cb 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }} />
      <div className="absolute -top-32 -left-24 w-[30rem] h-[30rem] rounded-full bg-sky-700/30 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-24 w-[26rem] h-[26rem] rounded-full bg-cyan-600/20 blur-[130px] pointer-events-none" />
      <div className="relative container mx-auto px-6 py-24 lg:py-28 text-center">
        <FadeUp>
          <p className="inline-flex items-center gap-2 text-cyan-300 text-xs font-black uppercase tracking-[0.3em] mb-6 border border-cyan-300/30 rounded-full px-4 py-1.5">Lab Standard Quality</p>
          <h2 className="font-display text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.02] mb-6">Order your chems<br /><span className="italic text-cyan-300">the discreet way.</span></h2>
          <p className="text-white/60 text-base max-w-xl mx-auto mb-10">Join thousands of customers who trust 5fadb5cladba for premium cannabinoids, etomidate and research chemicals — delivered fast and plain.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/products" className="group inline-flex items-center gap-2.5 bg-cyan-400 hover:bg-cyan-300 text-ink font-black px-10 py-4 rounded-full transition-all hover:-translate-y-1 text-base">
              Shop Now <HiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="https://t.me/cannachem" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/25 text-white hover:bg-white/10 font-bold px-10 py-4 rounded-full transition-all hover:-translate-y-1 text-base">
              <FaTelegramPlane size={15} /> Telegram Us
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
