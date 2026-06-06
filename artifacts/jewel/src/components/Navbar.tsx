import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { useCart } from '@/store/useCart';
import { useWishlist } from '@/store/useWishlist';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const cartItems = useCart((state) => state.items);
  const toggleCart = useCart((state) => state.toggleOpen);
  const wishlistItems = useWishlist((state) => state.items);

  const isHome = location === '/';
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const isTransparent = isHome && !isScrolled && !isMobileMenuOpen;

  const navClasses = `fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
    isTransparent
      ? 'bg-transparent text-white'
      : 'bg-background text-foreground border-b border-border'
  }`;

  return (
    <>
      <nav className={navClasses} data-testid="navbar">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex-1 flex items-center md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2"
              data-testid="button-mobile-menu"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>

          <div className="hidden md:flex flex-1 items-center gap-8 text-[11px] uppercase tracking-[0.15em] font-medium">
            <Link href="/shop" className="hover:opacity-70 transition-opacity">Shop</Link>
            <Link href="/shop?category=collections" className="hover:opacity-70 transition-opacity">Collections</Link>
            <Link href="/about" className="hover:opacity-70 transition-opacity">About</Link>
            <Link href="/contact" className="hover:opacity-70 transition-opacity">Contact</Link>
          </div>

          <Link href="/" className="font-serif text-2xl tracking-widest text-center flex-1 md:flex-none">
            LUMIÈRE
          </Link>

          <div className="flex-1 flex items-center justify-end gap-4 md:gap-6">
            <Link href="/search" className="hover:opacity-70 transition-opacity hidden md:block">
              <Search size={20} strokeWidth={1.5} />
            </Link>
            <Link href="/wishlist" className="hover:opacity-70 transition-opacity relative">
              <Heart size={20} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-[9px] font-medium">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button 
              onClick={toggleCart}
              className="hover:opacity-70 transition-opacity relative"
              data-testid="button-cart"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-[9px] font-medium">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background text-foreground flex flex-col"
          >
            <div className="flex items-center justify-between p-4 h-16 border-b border-border">
              <span className="font-serif text-xl tracking-widest">LUMIÈRE</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 -mr-2"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col pt-8 px-6 gap-6 text-sm uppercase tracking-[0.15em]">
              <Link href="/shop" className="py-2 border-b border-border">Shop All</Link>
              <Link href="/shop?category=rings" className="py-2 border-b border-border">Rings</Link>
              <Link href="/shop?category=necklaces" className="py-2 border-b border-border">Necklaces</Link>
              <Link href="/shop?category=earrings" className="py-2 border-b border-border">Earrings</Link>
              <Link href="/about" className="py-2 border-b border-border">Our Story</Link>
              <Link href="/contact" className="py-2 border-b border-border">Contact</Link>
              <Link href="/search" className="py-2 border-b border-border flex items-center gap-2">
                <Search size={16} strokeWidth={1.5} /> Search
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
