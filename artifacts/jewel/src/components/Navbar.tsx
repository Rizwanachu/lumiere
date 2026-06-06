import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { useCart } from '@/store/useCart';
import { useWishlist } from '@/store/useWishlist';
import { products } from '@/data/products';

const shopCategories = [
  {
    label: 'Rings',
    href: '/shop?category=rings',
    description: 'Stacking rings, solitaires & bands',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80',
  },
  {
    label: 'Necklaces',
    href: '/shop?category=necklaces',
    description: 'Pendants, chains & layering pieces',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80',
  },
  {
    label: 'Earrings',
    href: '/shop?category=earrings',
    description: 'Studs, hoops & drops',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80',
  },
  {
    label: 'Bracelets',
    href: '/shop?category=bracelets',
    description: 'Tennis, cuffs & delicate chains',
    image: 'https://images.unsplash.com/photo-1573408301185-9519f94652b1?w=400&q=80',
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [location, navigate] = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const shopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cartItems = useCart((state) => state.items);
  const toggleCart = useCart((state) => state.toggleOpen);
  const wishlistItems = useWishlist((state) => state.items);

  const isHome = location === '/';
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;
  const isTransparent = isHome && !isScrolled && !isMobileMenuOpen && !isSearchOpen;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery('');
    setIsShopOpen(false);
  }, [location]);

  useEffect(() => {
    if (isSearchOpen) setTimeout(() => searchInputRef.current?.focus(), 50);
  }, [isSearchOpen]);

  const openShop = () => {
    if (shopTimeoutRef.current) clearTimeout(shopTimeoutRef.current);
    setIsShopOpen(true);
  };

  const closeShop = () => {
    shopTimeoutRef.current = setTimeout(() => setIsShopOpen(false), 120);
  };

  const searchResults = searchQuery.trim().length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const navBg = isTransparent
    ? 'bg-transparent text-white'
    : 'bg-background text-foreground border-b border-[#E8E4DF] shadow-sm';

  const mobileLinks = [
    { label: 'Shop All', href: '/shop' },
    { label: 'Rings', href: '/shop?category=rings' },
    { label: 'Necklaces', href: '/shop?category=necklaces' },
    { label: 'Earrings', href: '/shop?category=earrings' },
    { label: 'Bracelets', href: '/shop?category=bracelets' },
    { label: 'Our Story', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${navBg}`}
        data-testid="navbar"
      >
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Left: hamburger (mobile) / nav links (desktop) */}
          <div className="flex-1 flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 md:hidden"
              data-testid="button-mobile-menu"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>

            <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.15em] font-medium">
              {/* Shop with dropdown */}
              <div
                className="relative"
                onMouseEnter={openShop}
                onMouseLeave={closeShop}
              >
                <Link
                  href="/shop"
                  className="relative group flex items-center gap-1 hover:opacity-80 transition-opacity py-1"
                >
                  Shop
                  <motion.span
                    animate={{ rotate: isShopOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={12} strokeWidth={1.5} />
                  </motion.span>
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C9A96E] group-hover:w-full transition-all duration-300 ease-out" />
                </Link>

                {/* Dropdown panel */}
                <AnimatePresence>
                  {isShopOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      onMouseEnter={openShop}
                      onMouseLeave={closeShop}
                      className="absolute top-full left-0 mt-3 w-52 bg-background text-foreground border border-border shadow-xl rounded-xl overflow-hidden z-50"
                    >
                      {shopCategories.map(({ label, href }, i) => (
                        <motion.div
                          key={label}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04, duration: 0.18 }}
                        >
                          <Link
                            href={href}
                            className="flex items-center justify-between px-4 py-3 text-[11px] uppercase tracking-[0.15em] font-medium hover:bg-secondary hover:text-[#C9A96E] transition-colors duration-150 group border-b border-border last:border-0"
                          >
                            {label}
                            <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-150" />
                          </Link>
                        </motion.div>
                      ))}
                      <Link
                        href="/shop"
                        className="flex items-center justify-between px-4 py-3 text-[11px] uppercase tracking-[0.15em] font-medium bg-secondary hover:bg-muted transition-colors duration-150 group text-muted-foreground hover:text-foreground"
                      >
                        Shop All
                        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-150" />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* About */}
              <Link href="/about" className="relative group hover:opacity-80 transition-opacity">
                About
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C9A96E] group-hover:w-full transition-all duration-300 ease-out" />
              </Link>
            </div>
          </div>

          {/* Center: Logo */}
          <Link href="/" className="font-serif text-2xl tracking-widest text-center flex-shrink-0 mx-4">
            LUMIÈRE
          </Link>

          {/* Right: icons */}
          <div className="flex-1 flex items-center justify-end gap-4 md:gap-5">
            <button
              onClick={() => setIsSearchOpen(s => !s)}
              className="hover:opacity-70 transition-opacity hidden md:block"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            <Link href="/wishlist" className="hover:opacity-70 transition-opacity relative">
              <Heart size={20} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#C9A96E] text-white rounded-full flex items-center justify-center text-[9px] font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={toggleCart}
              className="hover:opacity-70 transition-opacity relative"
              data-testid="button-cart"
              aria-label="Cart"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#C9A96E] text-white rounded-full flex items-center justify-center text-[9px] font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-border bg-background text-foreground"
            >
              <div className="container mx-auto px-4 md:px-8 py-4 relative">
                <div className="flex items-center gap-4">
                  <Search size={18} strokeWidth={1.5} className="text-muted-foreground flex-shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search jewelry..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                        setIsSearchOpen(false);
                      }
                      if (e.key === 'Escape') setIsSearchOpen(false);
                    }}
                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                  />
                  <button onClick={() => setIsSearchOpen(false)} className="hover:opacity-70 transition-opacity">
                    <X size={18} strokeWidth={1.5} />
                  </button>
                </div>

                {searchResults.length > 0 && (
                  <div className="absolute left-0 right-0 top-full bg-background border border-border shadow-lg z-50 mx-4 md:mx-8 rounded-xl overflow-hidden mt-1">
                    {searchResults.map(p => (
                      <Link
                        key={p.id}
                        href={`/product/${p.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-4 px-4 py-3 hover:bg-secondary transition-colors"
                      >
                        <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{p.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{p.category}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">₹{p.price.toLocaleString('en-IN')}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-y-0 left-0 w-full max-w-sm bg-background text-foreground flex flex-col z-50 md:hidden"
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-border flex-shrink-0">
                <span className="font-serif text-xl tracking-widest">LUMIÈRE</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2">
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 pt-8">
                {mobileLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className="block font-serif text-2xl py-4 border-b border-border/50 hover:text-muted-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="px-6 py-6 border-t border-border flex items-center gap-6">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Instagram</a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Pinterest</a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">TikTok</a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
