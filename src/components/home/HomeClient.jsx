'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { FaFlask, FaShoppingCart, FaStar, FaTruck, FaCheckCircle, FaQuoteLeft, FaBoxOpen, FaAtom, FaEye, FaLeaf, FaFileAlt, FaSprayCan, FaShieldAlt } from 'react-icons/fa';
import { HiOutlineArrowRight as HiArrowRight } from 'react-icons/hi';
import { useCart } from '@/components/cart/CartProvider';
import SEOKeywords from '@/components/seo/SEOKeywords';
import HomeSEOContent from '@/components/seo/HomeSEOContent';
import HeroCarousel from '@/components/home/HeroCarousel';

export default function HomeClient({ featuredProducts = [] }) {
  return (
    <div className="min-h-screen bg-white">
      <SEOKeywords />
      <HeroCarousel />
      <HeroDivider />
      <K2CategoriesSection />
      <FeaturedProductsSection products={featuredProducts} />
      <HowItWorksSection />
      <QualityBanner />
      <TestimonialsSection />
      <HomeSEOContent />
      <CTABanner />
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

/* -- Hero Divider Ticker -- */
const TICKER_ITEMS = [
  '◆ K2 Paper Sheets', '◆ K2 Liquid Spray', '◆ K2 Powder',
  '◆ 50+ Countries Delivered', '◆ 48h Dispatch', '◆ 10K+ Happy Customers',
  '◆ Strong & Consistent', '◆ Discreet Packaging',
];

function HeroDivider() {
  return (
    <>
      <style>{`@keyframes synthaTicker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.syntha-ticker{animation:synthaTicker 32s linear infinite;}`}</style>
      <div className="relative overflow-hidden border-y border-sky-100 bg-sky-50/50">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-sky-50/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-sky-50/50 to-transparent z-10 pointer-events-none" />
        <div className="overflow-hidden py-3.5">
          <div className="syntha-ticker flex gap-10 whitespace-nowrap w-max">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="text-sky-500/60 text-[11px] font-bold uppercase tracking-[0.2em]">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* -- K2 Categories -- */
const k2Categories = [
  { href: '/products?category=k2-paper-sheets', Icon: FaFileAlt, title: 'K2 Paper Sheets', desc: 'Evenly coated A4 and letter-size infused sheets. Strong, odourless and discreet.' },
  { href: '/products?category=k2-liquid-spray', Icon: FaSprayCan, title: 'K2 Liquid Spray', desc: 'High-strength liquid spray in sealed bottles. Easy to apply and long-lasting.' },
  { href: '/products?category=k2-powder', Icon: FaLeaf, title: 'K2 Powder', desc: 'Pure cannabinoid powder for making your own paper, spray or blends.' },
];

function K2CategoriesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-14">
            <p className="text-sky-500 text-xs font-black uppercase tracking-[0.25em] mb-3">&#9670; Our Products</p>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter">Three Ways to Get K2</h2>
            <p className="text-gray-600 text-sm mt-3 max-w-xl mx-auto">Paper, spray or powder &mdash; pick the format that suits you.</p>
          </div>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {k2Categories.map(({ href, Icon, title, desc }, i) => (
            <FadeUp key={href} delay={i * 0.1}>
              <Link href={href} className={`group relative overflow-hidden rounded-3xl p-8 border border-gray-200 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-100 hover:-translate-y-1 transition-all h-full bg-gradient-to-br ${i === 0 ? 'from-sky-50 via-white to-white' : i === 1 ? 'from-cyan-50 via-white to-white' : 'from-emerald-50 via-white to-white'}`}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white text-sky-600 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Icon className="text-2xl" />
                </div>
                <h3 className="text-gray-900 font-black text-2xl mb-3 tracking-tight">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sky-600 text-sm font-bold">Shop now <HiArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -- Featured Products -- */
function ProductCard({ product, addedId, onAddToCart }) {
  const displayPrice = product.price && product.price > 0
    ? product.price
    : product.priceVariants && product.priceVariants.length > 0
      ? product.priceVariants.reduce((min, v) => v.price < min ? v.price : min, product.priceVariants[0]?.price || 0)
      : 0;

  return (
    <div className="relative group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-sky-300 transition-all duration-300 hover:shadow-xl hover:shadow-sky-100 flex flex-col h-full">
      {product.countInStock <= 0 && <div className="absolute top-3 left-3 z-10 bg-gray-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">Sold Out</div>}
      <Link href={`/products/${product.slug}`} className="relative block h-48 bg-gray-100 overflow-hidden shrink-0">
        {product.images?.[0] ? (
          <Image src={product.images[0]} alt={product.name} fill sizes="300px" className="object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.onerror = null; e.target.src = '/images/Laboratory-Science.jpg'; }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center"><FaFlask className="text-gray-400 text-4xl" /></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sky-500 text-[10px] font-black uppercase tracking-widest">{product.category}</span>
          <div className="flex gap-0.5">{[1,2,3,4,5].map(n => <FaStar key={n} className={`text-[9px] ${n <= Math.round(product.rating||0) ? 'text-amber-400' : 'text-gray-200'}`} />)}</div>
        </div>
        <Link href={`/products/${product.slug}`}><h3 className="text-gray-900 font-bold text-sm leading-snug hover:text-sky-500 transition-colors line-clamp-2 mb-1.5">{product.name}</h3></Link>
        <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 mb-3 flex-1">{product.description}</p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-xl font-black text-gray-900 leading-none">&euro;{displayPrice.toFixed(2)}</p>
            <p className={`text-[10px] mt-0.5 font-semibold ${product.countInStock > 0 ? 'text-emerald-600' : 'text-red-500'}`}>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</p>
          </div>
          {product.countInStock > 0 ? (
            <motion.button onClick={e => onAddToCart(e, product)} whileTap={{ scale: 0.93 }} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${addedId === product._id ? 'bg-emerald-500 text-white' : 'bg-sky-500 hover:bg-sky-600 text-white'}`}>
              {addedId === product._id ? <><FaCheckCircle /> Added</> : <><FaShoppingCart /> Add</>}
            </motion.button>
          ) : (
            <button disabled className="px-3 py-2 rounded-xl text-xs font-black uppercase bg-gray-100 text-gray-400 cursor-not-allowed">Sold Out</button>
          )}
        </div>
      </div>
    </div>
  );
}

function FeaturedProductsSection({ products = [] }) {
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
      dot.style.cssText = `position:fixed;z-index:9999;width:12px;height:12px;border-radius:50%;background:#16a34a;pointer-events:none;transition:transform 0.65s cubic-bezier(0.4,0,1,1),opacity 0.65s ease;top:${br.top + br.height / 2}px;left:${br.left + br.width / 2}px;`;
      document.body.appendChild(dot);
      requestAnimationFrame(() => { dot.style.transform = `translate(${cr.left - br.left}px,${cr.top - br.top}px) scale(0.3)`; dot.style.opacity = '0'; });
      setTimeout(() => { dot.remove(); cartIcon.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.35)' }, { transform: 'scale(1)' }], { duration: 300 }); }, 680);
    }
  };

  return (
    <section className="py-24 bg-gray-50/70 border-b border-gray-200">
      <div className="container mx-auto px-6">
        <FadeUp>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p className="text-sky-500 text-xs font-black uppercase tracking-[0.25em] mb-2">&#9670; Products</p>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter">Featured Products</h2>
              <p className="text-gray-600 text-sm mt-3">Our best-selling K2 paper sheets, liquid sprays and powders.</p>
            </div>
            <Link href="/products" className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-900 hover:border-sky-300 hover:text-sky-600 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">View all <HiArrowRight size={14} /></Link>
          </div>
        </FadeUp>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <FadeUp key={product._id} delay={i * 0.05}>
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

/* -- How It Works -- */
const steps = [
  { n: '01', Icon: FaBoxOpen, title: 'Pick Your Format', desc: 'Choose K2 paper sheets, liquid spray or powder. Add to cart and checkout securely in minutes.' },
  { n: '02', Icon: FaShieldAlt, title: 'Quality Checked', desc: 'Every batch is tested for strength and consistency before it leaves our hands.' },
  { n: '03', Icon: FaTruck, title: 'Discreet Delivery', desc: 'Orders dispatched within 48h in plain unmarked packaging. Full tracking provided at every step.' },
];

function HowItWorksSection() {
  return (
    <section className="py-24 bg-white border-t border-gray-200">
      <div className="container mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-14">
            <p className="text-sky-500 text-xs font-black uppercase tracking-[0.25em] mb-3">&#9670; Process</p>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter">How It Works</h2>
            <p className="text-gray-600 text-sm mt-3">Three simple steps from order to delivery.</p>
          </div>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map(({ n, Icon, title, desc }, i) => (
            <FadeUp key={n} delay={i * 0.1}>
              <div className="relative bg-sky-50/60 border border-sky-100 rounded-3xl p-8 hover:border-sky-300 transition-all group text-center shadow-sm hover:shadow-md">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-sm select-none">{n}</div>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-sky-200 mb-5 group-hover:bg-sky-100 transition-colors shadow-sm">
                  <Icon className="text-sky-500 text-2xl" />
                </div>
                <h3 className="text-gray-900 font-black text-lg mb-2 tracking-tight">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -- Quality Banner -- */
function QualityBanner() {
  const facts = [
    { Icon: FaAtom, label: '99%', sub: 'Purity Powder' },
    { Icon: FaEye, label: '3', sub: 'K2 Formats' },
    { Icon: FaLeaf, label: '10K+', sub: 'Customers Served' },
    { Icon: FaTruck, label: '48h', sub: 'Dispatch Time' },
  ];
  return (
    <section className="border-t border-gray-200 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[360px]">
        <div className="relative min-h-[240px] lg:min-h-auto">
          <Image src="/images/Laboratory-Science.jpg" alt="Laboratory quality" fill className="object-cover object-center" sizes="50vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/80 hidden lg:block" />
          <div className="absolute inset-0 bg-white/50 lg:hidden" />
          <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl px-5 py-3 shadow-sm">
            <p className="text-gray-900 font-black text-sm">Sealed & Fresh</p>
            <p className="text-gray-600 text-xs mt-0.5">Every order packed to order</p>
          </div>
        </div>
        <div className="bg-sky-50/70 px-10 py-16 flex flex-col justify-center">
          <FadeUp>
            <p className="text-sky-500 text-xs font-black uppercase tracking-[0.25em] mb-3">&#9670; Our Numbers</p>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-8">Quality You Can<br />Measure.</h2>
          </FadeUp>
          <div className="grid grid-cols-2 gap-6">
            {facts.map(({ Icon, label, sub }, i) => (
              <FadeUp key={sub} delay={i * 0.08}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-sky-200 flex items-center justify-center shrink-0 shadow-sm">
                    <Icon className="text-sky-500 text-lg" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-gray-900 leading-none">{label}</p>
                    <p className="text-gray-600 text-xs mt-0.5">{sub}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.3}>
            <Link href="/about" className="inline-flex items-center gap-2 mt-8 text-sky-500 hover:text-sky-600 text-sm font-bold transition-colors">
              Learn about our standards <HiArrowRight size={13} />
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* -- Testimonials -- */
const testimonials = [
  { text: "The K2 paper sheets are evenly coated and strong. Best I've ordered online, and it arrived in three days.", author: "J. Smith", role: "Verified Buyer", avatar: "J" },
  { text: "Fast shipping, excellent service. The liquid spray is consistent every single time we order.", author: "L. Johnson", role: "Repeat Customer", avatar: "L" },
  { text: "We rely on K2PaperLiquid for all our K2 needs. Packaging is plain and discreet, exactly as promised.", author: "M. Williams", role: "Verified Buyer", avatar: "M" },
  { text: "The powder is clean and potent. Made my own sheets with it and the results were great.", author: "A. Rodriguez", role: "Repeat Customer", avatar: "A" },
  { text: "Great results on every order. K2PaperLiquid is my go-to for paper and spray.", author: "K. Chen", role: "Verified Buyer", avatar: "K" },
  { text: "Prompt support and discreet packaging. Exactly what I needed.", author: "T. Okafor", role: "Verified Buyer", avatar: "T" },
];

function TestimonialsSection() {
  return (
    <section className="py-24 bg-gray-50/50 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-14">
            <p className="text-sky-500 text-xs font-black uppercase tracking-[0.25em] mb-3">&#9670; Testimonials</p>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter">What Customers Say</h2>
            <p className="text-gray-600 mt-3 text-sm">Trusted by thousands of K2 customers across the globe.</p>
          </div>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map(({ text, author, role, avatar }, i) => (
            <FadeUp key={i} delay={i * 0.06}>
              <div className="bg-white border border-gray-200 rounded-3xl p-7 hover:border-sky-300 transition-all h-full flex flex-col justify-between shadow-sm hover:shadow-md">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5">{[1,2,3,4,5].map(n => <FaStar key={n} className="text-amber-400 text-xs" />)}</div>
                    <FaQuoteLeft className="text-sky-200 text-xl" />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
                </div>
                <div className="flex items-center gap-3 pt-5 mt-5 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white font-black text-sm shrink-0">{avatar}</div>
                  <div>
                    <p className="text-gray-900 font-bold text-sm leading-tight">{author}</p>
                    <p className="text-sky-500 text-xs font-medium">{role}</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -- CTA Banner -- */
function CTABanner() {
  return (
    <section className="relative overflow-hidden border-t border-gray-200">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-sky-600 to-sky-700 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="relative z-10 container mx-auto px-6 py-24 text-center">
        <FadeUp>
          <p className="text-sky-200 text-xs font-black uppercase tracking-[0.3em] mb-4">&#9670; Get Started Today</p>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] mb-6">Order Your<br />K2 Today.</h2>
          <p className="text-sky-100 text-base max-w-xl mx-auto mb-10">Join thousands of customers who trust K2PaperLiquid for premium K2 paper sheets, liquid spray and powder &mdash; discreetly delivered.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/products" className="group inline-flex items-center gap-2.5 bg-white text-sky-700 font-black px-10 py-[1.125rem] rounded-2xl transition-all hover:bg-sky-50 hover:-translate-y-1 shadow-2xl text-base">
              Shop Now <HiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="https://t.me/+19102279379" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/30 text-white hover:text-white hover:border-white/60 font-bold px-10 py-[1.125rem] rounded-2xl transition-all hover:-translate-y-1 text-base">Telegram Us</a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
