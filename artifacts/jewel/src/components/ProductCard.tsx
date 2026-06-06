import React from 'react';
import { Link } from 'wouter';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/data/products';
import { useWishlist } from '@/store/useWishlist';
import { useCart } from '@/store/useCart';
import { toast } from 'sonner';
import { proxyImg } from '@/lib/imgProxy';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const toggleWishlist = useWishlist((state) => state.toggle);
  const isInWishlist = useWishlist((state) => state.hasItem(product.id));
  const addToCart = useCart((state) => state.addItem);
  const openCart = useCart((state) => state.toggleOpen);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ product, quantity: 1 });
    toast.success('Added to bag');
    openCart();
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    if (!isInWishlist) {
      toast.success('Added to wishlist');
    }
  };

  return (
    <Link href={`/product/${product.slug}`} className="group block" data-testid={`card-product-${product.id}`}>
      <div className="relative aspect-[4/5] bg-secondary mb-4 overflow-hidden">
        <img
          src={proxyImg(product.images[0])}
          alt={product.name}
          loading={priority ? 'eager' : 'lazy'}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {!product.inStock && (
            <span className="bg-background text-foreground text-[9px] uppercase tracking-[0.2em] px-2 py-1">
              Sold Out
            </span>
          )}
          {product.inStock && product.isNew && (
            <span className="bg-background text-foreground text-[9px] uppercase tracking-[0.2em] px-2 py-1">
              New
            </span>
          )}
          {product.inStock && product.isBestseller && !product.isNew && (
            <span className="bg-background text-foreground text-[9px] uppercase tracking-[0.2em] px-2 py-1">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-transparent hover:bg-background/50 transition-colors z-10"
          data-testid={`button-wishlist-${product.id}`}
        >
          <Heart 
            size={18} 
            className={`transition-colors ${isInWishlist ? 'fill-foreground text-foreground' : 'text-foreground'}`} 
            strokeWidth={1.5}
          />
        </button>

        {/* Quick Add Button */}
        {product.inStock && (
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={handleQuickAdd}
              className="w-full bg-background text-foreground uppercase text-[11px] tracking-[0.15em] font-medium py-3 hover:bg-foreground hover:text-background transition-colors"
              data-testid={`button-quick-add-${product.id}`}
            >
              Quick Add
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center text-center">
        <h3 className="font-serif text-lg mb-1">{product.name}</h3>
        <div className="flex items-center gap-2 text-sm">
          {product.salePrice ? (
            <>
              <span className="text-muted-foreground line-through">${product.price}</span>
              <span className="text-primary">${product.salePrice}</span>
            </>
          ) : (
            <span className="text-foreground">${product.price}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
