'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaFlask, FaShoppingCart, FaStar, FaTruck, FaCheckCircle, FaQuoteLeft, FaShieldAlt, FaArrowRight, FaArrowLeft, FaFileAlt, FaSprayCan, FaLeaf, FaBitcoin, FaTelegramPlane } from 'react-icons/fa';
import { HiOutlineArrowRight as HiArrowRight, HiOutlineArrowUpRight as HiArrowUpRight } from 'react-icons/hi2';
import { useCart } from '@/components/cart/CartProvider';
import SEOKeywords from '@/components/seo/SEOKeywords';
import HomeSEOContent from '@/components/seo/HomeSEOContent';
import Hero from '@/components/home/Hero';

export default function HomeClient({ featuredProducts = [] }) {
  return (
    <div className="min-h-screen bg-[#faf8f2]">
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
    <section className="bg-[#faf8f2] border-b border-ink/10">
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
  { href: '/products?category=k2-paper-sheets', img: '/images/k2-paper/diablo-k2-paper.webp', Icon: FaFileAlt, n: '01', title: 'K2 Paper Sheets', desc: 'Evenly coated A4 & letter-size infused sheets — strong, odourless, discreet.', tall: true },
  { href: '/products?category=k2-liquid-spray', img: '/images/k2-spray/diablo-k2-spray.jpg', Icon: FaSprayCan, n: '02', title: 'K2 Liquid Spray', desc: 'High-strength liquid spray in sealed bottles.' },
  { href: '/products?category=k2-powder', img: '/images/k2-powder/jwh-018-powder.jpg', Icon: FaLeaf, n: '03', title: 'K2 Powder', desc: 'Pure cannabinoid powder for your own blends.' },
  { href: '/products?category=etomidate', img: '/images/etomidate/etomidate-powder-pure.jpg', Icon: FaFlask, n: '04', title: 'Etomidate', desc: 'Research-grade powders and crystals.' },
];

function CategoryCollage() {
  const [main, ...rest] = collageCategories;
  return (
    <section className="py-24 bg-[#faf8f2]">
      <div className="container mx-auto px-6">
        <SectionHead eyebrow="The Catalog" title={<>Four formats.<br />One standard.</>} link="/products" linkText="All products" />

        <div className="grid lg:grid-cols-5 gap-5">
          {/* Tall feature card */}
          <FadeUp>
            <Link href={main.href} className="group relative block h-[340px] lg:h-full min-h-[480px] rounded-lg overflow-hidden lg:col-span-2">
              <Image src={main.img} alt={main.title} fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/95 via-ink-deep/30 to-transparent" />
              <div className="absolute top-5 left-5 flex items-center gap-2">
                <span className="bg-cyan-400 text-ink text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">Best Seller</span>
              </div>
              <span className="absolute top-5 right-5 font-display font-black text-white/25 text-6xl leading-none">{main.n}</span>
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <main.Icon className="text-cyan-300 text-lg mb-3" />
                <h3 className="font-display text-white font-black text-3xl tracking-tight">{main.title}</h3>
                <p className="text-white/60 text-sm mt-2 max-w-xs leading-relaxed">{main.desc}</p>
                <span className="inline-flex items-center gap-2 mt-4 text-cyan-300 text-xs font-black uppercase tracking-[0.2em]">
                  Shop now <FaArrowRight size={9} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </FadeUp>

          {/* Remaining 3 — horizontal list rows on cream */}
          <div className="lg:col-span-3 flex flex-col divide-y divide-ink/10 border-y border-ink/10">
            {rest.map(({ href, img, Icon, n, title, desc }, i) => (
              <FadeUp key={href} delay={0.08 + i * 0.06}>
                <Link href={href} className="group flex items-center gap-5 py-6 px-2 sm:px-4 hover:bg-white transition-colors">
                  <span className="font-display font-black text-ink/15 text-4xl sm:text-5xl w-14 shrink-0 group-hover:text-sky-700/30 transition-colors">{n}</span>
                  <span className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shrink-0 border border-ink/10">
                    <Image src={img} alt={title} fill sizes="96px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="flex items-center gap-2 mb-1">
                      <Icon className="text-cyan-600 text-[10px]" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700">Category</span>
                    </span>
                    <h3 className="font-display text-ink font-black text-xl sm:text-2xl tracking-tight group-hover:text-sky-700 transition-colors">{title}</h3>
                    <p className="text-ink/50 text-xs sm:text-sm mt-1 truncate">{desc}</p>
                  </span>
                  <span className="w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center text-ink/40 group-hover:bg-ink group-hover:border-ink group-hover:text-white transition-all shrink-0">
                    <HiArrowUpRight size={14} />
                  </span>
                </Link>
              </FadeUp>
            ))}
            <FadeUp delay={0.32}>
              <Link href="/products" className="flex items-center justify-center gap-2 py-5 text-xs font-black uppercase tracking-[0.25em] text-sky-700 hover:bg-white transition-colors">
                Browse everything <FaArrowRight size={9} />
              </Link>
            </FadeUp>
          </div>
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
      dot.style.cssText = `position:fixed;z-index:9999;width:12px;height:12px;border-radius:50%;background:#c98f12;box-shadow:0 0 12px rgba(201,143,18,.6);pointer-events:none;transition:transform 0.65s cubic-bezier(0.4,0,1,1),opacity 0.65s ease;top:${br.top + br.height / 2}px;left:${br.left + br.width / 2}px;`;
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
  { n: 'No. 1', title: 'Pick your format', desc: 'Choose K2 paper sheets, liquid spray or powder. Add to cart and checkout securely in minutes.' },
  { n: 'No. 2', title: 'We check the batch', desc: 'Every batch is tested for strength and consistency before it leaves our hands.' },
  { n: 'No. 3', title: 'Discreet delivery', desc: 'Orders dispatched within 48h in plain unmarked packaging. Full tracking provided.' },
];

function ProcessLedger() {
  return (
    <section className="py-24 bg-[#faf8f2]">
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
  { text: "The K2 paper sheets are evenly coated and strong. Best I've ordered online, and it arrived in three days.", author: "J. Smith", role: "Verified Buyer" },
  { text: "Fast shipping, excellent service. The liquid spray is consistent every single time we order.", author: "L. Johnson", role: "Repeat Customer" },
  { text: "We rely on K2LiquidStore for all our K2 needs. Packaging is plain and discreet, exactly as promised.", author: "M. Williams", role: "Verified Buyer" },
  { text: "The powder is clean and potent. Made my own sheets with it and the results were great.", author: "A. Rodriguez", role: "Repeat Customer" },
  { text: "Great results on every order. K2LiquidStore is my go-to for paper and spray.", author: "K. Chen", role: "Verified Buyer" },
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
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ecc84f 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }} />
      <div className="absolute -top-32 -left-24 w-[30rem] h-[30rem] rounded-full bg-sky-700/30 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-24 w-[26rem] h-[26rem] rounded-full bg-cyan-600/20 blur-[130px] pointer-events-none" />
      <div className="relative container mx-auto px-6 py-24 lg:py-28 text-center">
        <FadeUp>
          <p className="inline-flex items-center gap-2 text-cyan-300 text-xs font-black uppercase tracking-[0.3em] mb-6 border border-cyan-300/30 rounded-full px-4 py-1.5">Lab Standard Quality</p>
          <h2 className="font-display text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.02] mb-6">Order your K2<br /><span className="italic text-cyan-300">the discreet way.</span></h2>
          <p className="text-white/60 text-base max-w-xl mx-auto mb-10">Join thousands of customers who trust K2LiquidStore for premium paper sheets, liquid spray and powder — delivered fast and plain.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/products" className="group inline-flex items-center gap-2.5 bg-cyan-400 hover:bg-cyan-300 text-ink font-black px-10 py-4 rounded-full transition-all hover:-translate-y-1 text-base">
              Shop Now <HiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="https://t.me/+19102279379" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/25 text-white hover:bg-white/10 font-bold px-10 py-4 rounded-full transition-all hover:-translate-y-1 text-base">
              <FaTelegramPlane size={15} /> Telegram Us
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
