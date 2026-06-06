import React, { useRef } from 'react';
import { Link } from 'wouter';
import { Heart } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Product } from '@/data/products';
import { useWishlist } from '@/store/useWishlist';
import { useCart } from '@/store/useCart';
import { toast } from 'sonner';
import { proxyImg } from '@/lib/imgProxy';
import { formatINR } from '@/lib/currency';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const toggleWishlist = useWishlist((state) => state.toggle);
  const isInWishlist = useWishlist((state) => state.hasItem(product.id));
  const addToCart = useCart((state) => state.addItem);
  const openCart = useCart((state) => state.toggleOpen);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 });
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['20%', '80%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['20%', '80%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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
    if (!isInWishlist) toast.success('Added to wishlist');
  };

  return (
    <Link href={`/product/${product.slug}`} className="group block" data-testid={`card-product-${product.id}`}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="relative"
      >
        <div className="relative aspect-[4/5] bg-secondary mb-4 overflow-hidden rounded-2xl">
          {/* Main image with scale on hover */}
          <img
            src={proxyImg(product.images[0])}
            alt={product.name}
            loading={priority ? 'eager' : 'lazy'}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          />

          {/* Gold glare overlay — desktop only */}
          <motion.div
            className="absolute inset-0 pointer-events-none hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(201,169,110,0.18) 0%, transparent 65%)`,
            }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {!product.inStock && (
              <span className="bg-background text-foreground text-[9px] uppercase tracking-[0.2em] px-2 py-1">Sold Out</span>
            )}
            {product.inStock && product.isNew && (
              <span className="bg-background text-foreground text-[9px] uppercase tracking-[0.2em] px-2 py-1">New</span>
            )}
            {product.inStock && product.isBestseller && !product.isNew && (
              <span className="bg-background text-foreground text-[9px] uppercase tracking-[0.2em] px-2 py-1">Bestseller</span>
            )}
          </div>

          {/* Wishlist */}
          <motion.button
            onClick={handleWishlist}
            whileTap={{ scale: 0.75 }}
            className="absolute top-3 right-3 p-2 rounded-full bg-background/30 backdrop-blur-sm hover:bg-background/60 transition-colors z-10"
            data-testid={`button-wishlist-${product.id}`}
          >
            <Heart
              size={18}
              className={`transition-colors ${isInWishlist ? 'fill-foreground text-foreground' : 'text-foreground'}`}
              strokeWidth={1.5}
            />
          </motion.button>

          {/* Quick Add — always visible on mobile, hover-only on desktop */}
          {product.inStock && (
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-0 opacity-100 sm:translate-y-full sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-300 ease-out">
              <motion.button
                onClick={handleQuickAdd}
                whileTap={{ scale: 0.96, backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
                className="w-full bg-background text-foreground uppercase text-[10px] tracking-[0.15em] font-medium py-3 hover:bg-foreground hover:text-background transition-colors duration-200 rounded-sm"
                data-testid={`button-quick-add-${product.id}`}
              >
                Quick Add
              </motion.button>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center text-center">
          <h3 className="font-serif text-base sm:text-lg mb-1 group-hover:text-[#C9A96E] transition-colors duration-300">{product.name}</h3>
          <div className="flex items-center gap-2 text-sm">
            {product.salePrice ? (
              <>
                <span className="text-muted-foreground line-through">{formatINR(product.price)}</span>
                <span className="text-primary">{formatINR(product.salePrice)}</span>
              </>
            ) : (
              <span className="text-foreground">{formatINR(product.price)}</span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
