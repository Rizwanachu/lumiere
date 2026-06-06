import React, { useState, useEffect, useRef } from 'react';
import { useRoute, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Heart, Minus, Plus, X, Truck, Plus as PlusIcon } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/store/useCart';
import { useWishlist } from '@/store/useWishlist';
import { useRecentlyViewed } from '@/store/useRecentlyViewed';
import { toast } from 'sonner';
import { ProductCard } from '@/components/ProductCard';

const SIZE_GUIDE = [
  { size: '5', mm: '15.7', inches: '6 3/16' },
  { size: '6', mm: '16.5', inches: '6 1/2' },
  { size: '7', mm: '17.3', inches: '6 13/16' },
  { size: '8', mm: '18.2', inches: '7 3/16' },
  { size: '9', mm: '18.9', inches: '7 1/2' },
  { size: '10', mm: '19.8', inches: '7 13/16' },
];

export default function ProductDetailPage() {
  const [, params] = useRoute('/product/:slug');
  const slug = params?.slug;
  const product = products.find(p => p.slug === slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedMetal, setSelectedMetal] = useState<string>('Yellow Gold');
  const [activeAccordion, setActiveAccordion] = useState<string | null>('description');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [zoom, setZoom] = useState({ active: false, x: 0, y: 0 });
  const imgRef = useRef<HTMLDivElement>(null);

  const addToCart = useCart((state) => state.addItem);
  const toggleCart = useCart((state) => state.toggleOpen);
  const toggleWishlist = useWishlist((state) => state.toggle);
  const isInWishlist = useWishlist((state) => product ? state.hasItem(product.id) : false);
  const addRecentlyViewed = useRecentlyViewed((state) => state.addItem);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(0);
    setQuantity(1);
    setSelectedSize('');
    if (product) addRecentlyViewed(product);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-serif text-3xl mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The item you're looking for doesn't exist.</p>
        <Link href="/shop">
          <button className="bg-foreground text-background uppercase tracking-[0.12em] text-[11px] px-8 py-3 font-medium">
            Return to Shop
          </button>
        </Link>
      </div>
    );
  }

  const needsSize = product.category === 'rings';
  const ringSizes = ['5', '6', '7', '8', '9', '10'];
  const metals = ['Yellow Gold', 'White Gold', 'Rose Gold'];
  const displayPrice = (product.salePrice || product.price) * quantity;

  const handleAddToCart = () => {
    if (needsSize && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addToCart({ product, quantity, metal: selectedMetal, size: selectedSize || undefined });
    toast.success('Added to bag');
    toggleCart();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoom({ active: true, x, y });
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pt-20 pb-32 md:pb-24 min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center text-[10px] uppercase tracking-widest text-muted-foreground gap-1">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href={`/shop?category=${product.category}`} className="hover:text-foreground transition-colors capitalize">
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Left: Images */}
          <div className="w-full lg:w-3/5 flex flex-col gap-4">
            <div
              ref={imgRef}
              className="aspect-[4/5] bg-secondary relative overflow-hidden cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setZoom({ active: false, x: 0, y: 0 })}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={product.images[selectedImage]}
                  alt={`${product.name} - View ${selectedImage + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={zoom.active ? { transformOrigin: `${zoom.x}% ${zoom.y}%`, transform: 'scale(1.8)' } : {}}
                />
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 flex-shrink-0 overflow-hidden transition-all border-2 ${selectedImage === i ? 'border-[#C9A96E]' : 'border-transparent hover:border-border'}`}
                >
                  <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-2/5">
            <div className="lg:sticky lg:top-28">

              {/* Name & Price */}
              <h1 className="font-serif text-[2.2rem] leading-tight mb-2">{product.name}</h1>

              <div className="flex items-center gap-3 mb-2">
                {product.salePrice ? (
                  <>
                    <span className="text-muted-foreground line-through text-lg">${product.price}</span>
                    <span className="text-xl font-medium" style={{ color: '#C9A96E' }}>${product.salePrice}</span>
                  </>
                ) : (
                  <span className="text-xl" style={{ color: '#C9A96E' }}>${product.price}</span>
                )}
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
                <span className="text-amber-400 tracking-tight">★★★★★</span>
                <span>4.8</span>
                <span className="text-xs">(47 reviews)</span>
              </div>

              <div className="border-t border-border mb-6" />

              {/* Metal Selector */}
              <div className="mb-6">
                <h3 className="text-[11px] uppercase tracking-[0.15em] font-medium mb-3">Metal</h3>
                <div className="flex flex-wrap gap-2">
                  {metals.map(m => (
                    <button
                      key={m}
                      onClick={() => setSelectedMetal(m)}
                      className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 ${
                        selectedMetal === m
                          ? 'bg-foreground text-background border-foreground'
                          : 'border-border hover:border-foreground'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              {needsSize && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-[11px] uppercase tracking-[0.15em] font-medium">Size</h3>
                    <button
                      onClick={() => setShowSizeGuide(true)}
                      className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground underline transition-colors"
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {ringSizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 text-sm border transition-all duration-200 ${
                          selectedSize === size
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-border hover:border-foreground'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-[11px] uppercase tracking-[0.15em] font-medium mb-3">Quantity</h3>
                <div className="flex items-center border border-border w-32 h-11">
                  <button
                    className="px-3 h-full hover:bg-secondary transition-colors disabled:opacity-40"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus size={14} strokeWidth={1.5} />
                  </button>
                  <span className="flex-1 text-center text-sm font-medium">{quantity}</span>
                  <button
                    className="px-3 h-full hover:bg-secondary transition-colors"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full py-4 text-[11px] uppercase tracking-[0.15em] font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-3 hidden md:block"
                style={{ background: product.inStock ? '#1A1A1A' : undefined, color: 'white' }}
                onMouseEnter={e => { if (product.inStock) (e.currentTarget as HTMLButtonElement).style.background = '#333'; }}
                onMouseLeave={e => { if (product.inStock) (e.currentTarget as HTMLButtonElement).style.background = '#1A1A1A'; }}
              >
                {product.inStock ? `Add to Cart — $${displayPrice}` : 'Sold Out'}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => {
                  toggleWishlist(product);
                  if (!isInWishlist) toast.success('Added to wishlist');
                }}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 hidden md:block"
              >
                {isInWishlist ? '♥ In Your Wishlist' : '♡ Add to Wishlist'}
              </button>

              {/* Free Shipping Badge */}
              <div className="flex items-center gap-3 py-4 border-y border-border mb-6">
                <Truck size={18} strokeWidth={1.5} className="text-muted-foreground flex-shrink-0" />
                <span className="text-xs text-muted-foreground">Free shipping on orders over $150</span>
              </div>

              {/* Low Stock */}
              {product.lowStock && product.inStock && (
                <p className="text-destructive text-sm flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-destructive inline-block animate-pulse" />
                  Only a few left
                </p>
              )}

              {/* Accordions */}
              <div className="border-t border-border">
                {[
                  { id: 'description', title: 'Product Details', content: product.description },
                  { id: 'materials', title: 'Materials & Care', content: product.materials },
                  { id: 'shipping', title: 'Shipping & Returns', content: 'Free standard shipping on orders over $150. Express shipping available at checkout. Free returns within 30 days of delivery — no questions asked.' },
                ].map((item) => (
                  <div key={item.id} className="border-b border-border">
                    <button
                      className="w-full py-4 flex justify-between items-center text-sm font-medium hover:text-muted-foreground transition-colors"
                      onClick={() => setActiveAccordion(activeAccordion === item.id ? null : item.id)}
                    >
                      {item.title}
                      <span className="text-lg leading-none transition-transform duration-300">
                        {activeAccordion === item.id ? '−' : '+'}
                      </span>
                    </button>
                    <AnimatePresence>
                      {activeAccordion === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="pb-4 text-sm text-muted-foreground leading-relaxed">
                            {item.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 md:hidden bg-background border-t border-border z-30 flex items-center gap-4 px-4 py-3">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Price</span>
          <span className="font-medium" style={{ color: '#C9A96E' }}>${displayPrice}</span>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="flex-1 py-3 text-[11px] uppercase tracking-[0.15em] font-medium text-white disabled:opacity-50 transition-colors"
          style={{ background: '#1A1A1A' }}
        >
          {product.inStock ? 'Add to Cart' : 'Sold Out'}
        </button>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="container mx-auto px-4 md:px-8 mt-24">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl mb-2">You May Also Like</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      <AnimatePresence>
        {showSizeGuide && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSizeGuide(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[480px] bg-background z-50 p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-2xl">Ring Size Guide</h3>
                <button onClick={() => setShowSizeGuide(false)} className="p-1 hover:opacity-70">
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left pb-3 text-[11px] uppercase tracking-[0.15em] font-medium">US Size</th>
                    <th className="text-left pb-3 text-[11px] uppercase tracking-[0.15em] font-medium">Diameter (mm)</th>
                    <th className="text-left pb-3 text-[11px] uppercase tracking-[0.15em] font-medium">Circumference (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_GUIDE.map(row => (
                    <tr key={row.size} className="border-b border-border">
                      <td className="py-3">{row.size}</td>
                      <td className="py-3">{row.mm}</td>
                      <td className="py-3">{row.inches}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-muted-foreground mt-4">
                Measure your finger at the end of the day when it's at its largest. If between sizes, choose the larger size.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
