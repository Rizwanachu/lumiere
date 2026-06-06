import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '@/store/useWishlist';
import { useCart } from '@/store/useCart';
import { ProductCard } from '@/components/ProductCard';
import { toast } from 'sonner';

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem, toggleOpen } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMoveToCart = (product: (typeof items)[0]) => {
    addItem({ product, quantity: 1 });
    removeItem(product.id);
    toast.success('Moved to bag');
    toggleOpen();
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center mb-16 text-center">
          <Heart size={32} strokeWidth={1} className="mb-6 text-muted-foreground" />
          <h1 className="font-serif text-4xl lg:text-5xl mb-4">Your Wishlist</h1>
          <p className="text-muted-foreground max-w-md">
            Save your favorite pieces here to easily find them later or share them with someone special.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 border-t border-border">
            <p className="text-muted-foreground mb-8 text-lg">Your wishlist is empty.</p>
            <Link href="/shop">
              <button className="bg-foreground text-background uppercase tracking-[0.12em] text-[11px] px-8 py-3 font-medium hover:opacity-90 transition-opacity">
                Shop Now
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
              <span className="text-sm text-muted-foreground">
                {items.length} {items.length === 1 ? 'Item' : 'Items'}
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="text-[11px] uppercase tracking-widest underline hover:opacity-70 transition-opacity"
              >
                Share Wishlist
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
              {items.map((product) => (
                <div key={product.id} className="flex flex-col">
                  <ProductCard product={product} />
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="mt-3 w-full flex items-center justify-center gap-2 py-3 border border-border text-[11px] uppercase tracking-[0.15em] font-medium hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-200"
                  >
                    <ShoppingBag size={14} strokeWidth={1.5} />
                    Move to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
