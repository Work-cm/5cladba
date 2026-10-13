'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { useCart } from '@/components/cart/CartProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaUser, FaSearch, FaLeaf, FaFileAlt, FaSprayCan, FaTimes, FaChevronDown, FaSignOutAlt, FaUserShield, FaFlask, FaBitcoin, FaTruck, FaLock, FaTelegramPlane } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import Logo from '@/components/common/Logo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/about', label: 'About' },
];

const shopCategories = [
  { href: '/products?category=k2-paper-sheets', label: 'K2 Paper Sheets', Icon: FaFileAlt, desc: 'Infused A4 & letter sheets' },
  { href: '/products?category=k2-liquid-spray', label: 'K2 Liquid Spray', Icon: FaSprayCan, desc: 'High-strength liquid spray' },
  { href: '/products?category=k2-powder', label: 'K2 Powder', Icon: FaLeaf, desc: 'Pure cannabinoid powder' },
  { href: '/products?category=etomidate', label: 'Etomidate', Icon: FaFlask, desc: 'Etomidate powders & crystals' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const shopRef = useRef(null);
  const userRef = useRef(null);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const cartCount = cart ? cart.reduce((s, i) => s + i.quantity, 0) : 0;

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setShopOpen(false);
    setUserMenuOpen(false);
    setMobileShopOpen(false);
  }, [pathname]);
  useEffect(() => { if (searchOpen) searchRef.current?.focus(); }, [searchOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (shopRef.current && !shopRef.current.contains(e.target)) setShopOpen(false);
      if (userRef.current && !userRef.current.contains(e.target)) setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setShopOpen(false);
        setUserMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (menuOpen || searchOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, searchOpen]);

  const go = useCallback((q) => {
    if (q.trim()) window.location.href = `/products?search=${encodeURIComponent(q.trim())}`;
  }, []);

  return (
    <>
      {/* Gold announcement strip — scrolls away */}
      <div className="bg-cyan-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-8 flex items-center justify-center gap-2">
          <FaBitcoin className="text-ink" size={10} />
          <p className="text-ink text-[10px] font-black uppercase tracking-[0.22em]">Bitcoin accepted &middot; Discreet shipping to 50+ countries</p>
        </div>
      </div>

      {/* Floating pill bar */}
      <header className={`fixed left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'top-3' : 'top-10'}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className={`flex items-center justify-between gap-3 h-14 pl-3 pr-2 sm:pl-4 sm:pr-3 rounded-full bg-ink-deep/95 backdrop-blur-xl border border-white/10 transition-shadow duration-300 ${scrolled ? 'shadow-2xl shadow-ink-deep/40' : 'shadow-xl shadow-ink-deep/20'}`}>

            {/* Logo */}
            <Logo size={34} dark showDomain={false} className="shrink-0" />

            {/* Center links — desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ href, label }) => {
                const active = pathname === href || (href === '/products' && pathname.startsWith('/products'));
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative px-4 py-2 rounded-full text-[13px] font-semibold transition-all ${active ? 'bg-white/10 text-cyan-300' : 'text-white/60 hover:text-white hover:bg-white/[0.07]'}`}
                  >
                    {label}
                  </Link>
                );
              })}

              {/* Categories */}
              <div className="relative" ref={shopRef}>
                <button
                  onClick={() => setShopOpen(o => !o)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-all ${shopOpen ? 'bg-white/10 text-cyan-300' : 'text-white/60 hover:text-white hover:bg-white/[0.07]'}`}
                  aria-expanded={shopOpen}
                >
                  Categories <FaChevronDown size={7} className={`transition-transform duration-200 ${shopOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {shopOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50 w-[440px]"
                    >
                      <div className="bg-ink border border-white/10 rounded-3xl shadow-2xl shadow-ink-deep/50 overflow-hidden">
                        <div className="h-[3px] bg-gradient-to-r from-sky-700 via-sky-500 to-cyan-400" />
                        <div className="p-3 grid grid-cols-2 gap-1.5">
                          {shopCategories.map(({ href, label, Icon, desc }) => (
                            <Link key={href} href={href} onClick={() => setShopOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-white/[0.06] group/item transition-all">
                              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0 group-hover/item:bg-cyan-400 group-hover/item:border-cyan-400 transition-all">
                                <Icon className="text-cyan-300 text-xs group-hover/item:text-ink transition-colors" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-white text-sm font-bold leading-none group-hover/item:text-cyan-300 transition-colors">{label}</p>
                                <p className="text-white/35 text-[11px] mt-1 truncate">{desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <Link href="/products" onClick={() => setShopOpen(false)} className="flex items-center justify-between px-6 py-3.5 bg-white/[0.04] border-t border-white/10 text-[11px] font-black uppercase tracking-[0.18em] text-cyan-300 hover:bg-cyan-400 hover:text-ink transition-all">
                          Browse full catalog <FaChevronDown size={9} className="-rotate-90" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Search"
              >
                <FaSearch size={13} />
              </button>

              <Link href="/cart" className="relative cart-icon w-10 h-10 flex items-center justify-center rounded-full bg-cyan-400 text-ink hover:bg-cyan-300 transition-all">
                <FaShoppingCart size={13} />
                {cartCount > 0 && (
                  <motion.span key={cartCount} initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 bg-white text-ink text-[9px] font-black rounded-full w-[18px] h-[18px] flex items-center justify-center leading-none ring-2 ring-ink-deep">
                    {cartCount}
                  </motion.span>
                )}
              </Link>

              {mounted && user ? (
                <div className="relative hidden md:block" ref={userRef}>
                  <button
                    onClick={() => setUserMenuOpen(o => !o)}
                    className={`flex items-center gap-2 pl-1.5 pr-3 h-10 rounded-full border text-sm transition-all ${userMenuOpen ? 'border-cyan-400/50 text-cyan-300 bg-white/10' : 'border-white/15 bg-white/[0.06] hover:border-cyan-400/40 text-white/70 hover:text-white'}`}
                  >
                    <div className="w-7 h-7 rounded-full bg-sky-700 flex items-center justify-center text-white text-xs font-black">{user.name.charAt(0).toUpperCase()}</div>
                    <span className="hidden lg:block font-semibold text-xs">{user.name.split(' ')[0]}</span>
                    <FaChevronDown size={8} className={`transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-3 w-52 bg-ink border border-white/10 rounded-3xl shadow-2xl shadow-ink-deep/50 py-1.5 z-50"
                      >
                        <div className="px-4 py-2.5 border-b border-white/10 mb-1">
                          <p className="text-sm font-bold text-white truncate">{user.name}</p>
                          <p className="text-xs text-white/40 truncate">{user.email}</p>
                        </div>
                        <Link href="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors">
                          <FaUser size={11} className="text-cyan-300" /> Profile
                        </Link>
                        {user.isAdmin && (
                          <Link href="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors">
                            <FaUserShield size={11} className="text-cyan-300" /> Admin
                          </Link>
                        )}
                        <div className="border-t border-white/10 my-1" />
                        <button onClick={() => { setUserMenuOpen(false); logout(); }} className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors">
                          <FaSignOutAlt size={11} className="text-cyan-300" /> Sign out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : mounted && (
                <Link href="/login" className="hidden md:flex items-center gap-2 h-10 px-4 rounded-full border border-white/15 bg-white/[0.06] hover:border-cyan-400/40 text-white/70 hover:text-white text-xs font-bold transition-all">
                  <FaUser size={11} /> Sign in
                </Link>
              )}

              {/* Hamburger — mobile */}
              <button
                onClick={() => setMenuOpen(true)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.07] border border-white/10 text-white hover:bg-white/10 transition-all"
                aria-label="Open menu"
              >
                <HiMenu size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search overlay — dark card */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-24 sm:pt-32 bg-ink-deep/70 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-ink rounded-3xl shadow-2xl overflow-hidden border border-white/10"
            >
              <div className="h-[3px] bg-gradient-to-r from-sky-700 via-sky-500 to-cyan-400" />
              <form onSubmit={(e) => { e.preventDefault(); go(searchQuery); }} className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
                <FaSearch className="text-cyan-300 shrink-0" size={15} />
                <input
                  ref={searchRef}
                  type="search"
                  placeholder="Search K2 paper, spray, powder..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white text-base outline-none placeholder-white/35"
                />
                <button type="button" onClick={() => setSearchOpen(false)} className="text-white/40 hover:text-white shrink-0">
                  <FaTimes size={14} />
                </button>
              </form>
              <div className="p-3">
                <p className="text-[10px] text-white/35 uppercase tracking-widest font-bold px-2 pb-2">Quick categories</p>
                <div className="grid grid-cols-1 gap-1">
                  {shopCategories.map(({ href, label, Icon, desc }) => (
                    <Link key={href} href={href} onClick={() => setSearchOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.06] transition-all group/item">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0 group-hover/item:bg-cyan-400 transition-colors">
                        <Icon className="text-cyan-300 text-xs group-hover/item:text-ink transition-colors" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-sm font-semibold leading-none">{label}</p>
                        <p className="text-white/35 text-xs mt-0.5 truncate">{desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer — slides from right, dark */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-[60] md:hidden">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-ink-deep/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-[320px] bg-ink flex flex-col overflow-hidden border-l border-white/10"
            >
              <div className="h-[3px] bg-gradient-to-r from-sky-700 via-sky-500 to-cyan-400 shrink-0" />

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
                <Logo size={32} dark showDomain={false} />
                <button onClick={() => setMenuOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/10 text-white transition-all">
                  <FaTimes size={13} />
                </button>
              </div>

              {/* Search field */}
              <form
                onSubmit={(e) => { e.preventDefault(); setMenuOpen(false); go(searchQuery); }}
                className="flex items-center gap-2 mx-4 my-4 bg-white/[0.05] border border-white/10 rounded-full px-4 py-2.5 shrink-0"
              >
                <FaSearch className="text-cyan-300 text-xs shrink-0" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/40"
                />
              </form>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-3 py-2">
                <div className="space-y-1 mb-4">
                  {navLinks.map(({ href, label }, i) => (
                    <motion.div key={href} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i, duration: 0.2 }}>
                      <Link
                        href={href}
                        className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${pathname === href ? 'bg-cyan-400/15 text-cyan-300 border border-cyan-400/30' : 'text-white/70 hover:bg-white/[0.06] hover:text-white'}`}
                      >
                        {label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Categories accordion */}
                <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * navLinks.length, duration: 0.2 }}>
                  <button
                    onClick={() => setMobileShopOpen(o => !o)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${pathname.startsWith('/products') ? 'bg-cyan-400/15 text-cyan-300 border border-cyan-400/30' : 'text-white/70 hover:bg-white/[0.06] hover:text-white'}`}
                  >
                    Shop by Category
                    <FaChevronDown size={11} className={`transition-transform duration-200 ${mobileShopOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileShopOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-1 pt-1 pb-1">
                          {shopCategories.map(({ href, label, Icon, desc }) => (
                            <Link
                              key={href} href={href}
                              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/70 hover:bg-white/[0.06] hover:text-white text-sm transition-all"
                            >
                              <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0">
                                <Icon className="text-cyan-300 text-[10px]" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-medium leading-none">{label}</p>
                                <p className="text-xs text-white/35 mt-0.5 truncate">{desc}</p>
                              </div>
                            </Link>
                          ))}
                          <Link href="/products" className="flex items-center justify-center py-2 text-xs text-cyan-300 hover:text-cyan-200 font-semibold transition-colors">View all &rarr;</Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </nav>

              {/* Trust strip */}
              <div className="px-5 py-3 border-t border-white/10 flex items-center gap-4 text-[10px] text-white/35 font-semibold uppercase tracking-wider shrink-0">
                <span className="flex items-center gap-1.5"><FaTruck className="text-cyan-300" size={10} /> 48h</span>
                <span className="flex items-center gap-1.5"><FaLock className="text-cyan-300" size={9} /> Discreet</span>
                <span className="flex items-center gap-1.5"><FaBitcoin className="text-cyan-400" size={11} /> BTC</span>
              </div>

              {/* Bottom */}
              <div className="px-3 pb-6 pt-3 border-t border-white/10 space-y-2 shrink-0">
                <Link href="/cart" className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-cyan-400 text-ink hover:bg-cyan-300 text-sm font-black transition-all">
                  <span className="flex items-center gap-2.5"><FaShoppingCart size={13} /> View cart</span>
                  {cartCount > 0 && <span className="bg-ink text-cyan-300 text-xs font-black px-2 py-0.5 rounded-full">{cartCount}</span>}
                </Link>

                {mounted && user && (
                  <>
                    <Link href="/profile" className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-white/70 hover:text-white text-sm font-semibold transition-all">
                      <FaUser size={12} /> Profile
                    </Link>
                    {user.isAdmin && (
                      <Link href="/admin" className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-white/70 hover:text-white text-sm font-semibold transition-all">
                        Admin Panel
                      </Link>
                    )}
                    <button onClick={logout} className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/[0.05] text-sm font-semibold transition-all text-left">
                      Sign out
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
