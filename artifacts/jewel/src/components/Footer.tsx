import React, { useState } from 'react';
import { Link } from 'wouter';

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z" />
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-xl tracking-widest mb-4">LUMIÈRE</h3>
            <p className="text-muted-foreground text-sm leading-[1.7] max-w-xs mb-6">
              Heirloom-quality fine jewelry crafted with intention. Designed to be lived in and passed down.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <InstagramIcon />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <PinterestIcon />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <TikTokIcon />
              </a>
            </div>
          </div>

          {/* Shop */}
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

          {/* Customer Care */}
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

          {/* Newsletter */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] font-medium mb-6">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe for updates, exclusive access, and more.
            </p>
            {subscribed ? (
              <p className="text-sm text-foreground">Thank you for subscribing ✓</p>
            ) : (
              <form onSubmit={handleSubscribe}>
                <div className="flex border-b border-border mb-2">
                  <input
                    type="email"
                    placeholder="ENTER YOUR EMAIL"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(''); }}
                    className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground placeholder:text-[11px] placeholder:tracking-[0.15em]"
                  />
                  <button type="submit" className="text-[11px] uppercase tracking-[0.15em] font-medium hover:opacity-70 transition-opacity flex-shrink-0 pl-3">
                    Subscribe
                  </button>
                </div>
                {error && <p className="text-xs text-destructive">{error}</p>}
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border gap-4">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Lumière Jewels. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {/* Visa */}
            <svg viewBox="0 0 38 24" className="h-6 w-auto opacity-60"><rect width="38" height="24" rx="4" fill="#1A1F71"/><text x="4" y="17" fontFamily="Arial" fontSize="10" fontWeight="bold" fill="white">VISA</text></svg>
            {/* Mastercard */}
            <svg viewBox="0 0 38 24" className="h-6 w-auto opacity-60"><rect width="38" height="24" rx="4" fill="#252525"/><circle cx="14" cy="12" r="7" fill="#EB001B"/><circle cx="24" cy="12" r="7" fill="#F79E1B"/><path d="M19 6.8a7 7 0 0 1 0 10.4A7 7 0 0 1 19 6.8z" fill="#FF5F00"/></svg>
            {/* Amex */}
            <svg viewBox="0 0 38 24" className="h-6 w-auto opacity-60"><rect width="38" height="24" rx="4" fill="#2E77BC"/><text x="3" y="17" fontFamily="Arial" fontSize="8" fontWeight="bold" fill="white">AMEX</text></svg>
            {/* Apple Pay */}
            <svg viewBox="0 0 38 24" className="h-6 w-auto opacity-60"><rect width="38" height="24" rx="4" fill="#000"/><text x="4" y="16" fontFamily="Arial" fontSize="8" fill="white">Apple Pay</text></svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
