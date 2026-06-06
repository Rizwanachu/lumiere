import React from 'react';
import { Link } from 'wouter';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h3 className="font-serif text-xl tracking-widest mb-4">LUMIÈRE</h3>
            <p className="text-muted-foreground text-sm leading-[1.7] max-w-xs">
              Heirloom-quality fine jewelry crafted with intention. Designed to be lived in and passed down.
            </p>
          </div>
          
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] font-medium mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/shop" className="hover:text-foreground transition-colors">All Jewelry</Link></li>
              <li><Link href="/shop?category=rings" className="hover:text-foreground transition-colors">Rings</Link></li>
              <li><Link href="/shop?category=necklaces" className="hover:text-foreground transition-colors">Necklaces</Link></li>
              <li><Link href="/shop?category=earrings" className="hover:text-foreground transition-colors">Earrings</Link></li>
              <li><Link href="/shop?category=bracelets" className="hover:text-foreground transition-colors">Bracelets</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] font-medium mb-6">Customer Care</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-foreground transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/care" className="hover:text-foreground transition-colors">Jewelry Care</Link></li>
              <li><Link href="/size-guide" className="hover:text-foreground transition-colors">Size Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] font-medium mb-6">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex border-b border-border" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="ENTER YOUR EMAIL" 
                className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground placeholder:text-[11px] placeholder:tracking-[0.15em]"
                required
              />
              <button type="submit" className="text-[11px] uppercase tracking-[0.15em] font-medium hover:opacity-70 transition-opacity">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Lumière Jewels. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0 text-[10px] uppercase tracking-widest">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Amex</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
