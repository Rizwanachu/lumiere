import React, { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Heart, Minus, Plus, ChevronDown, Check } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/store/useCart';
import { useWishlist } from '@/store/useWishlist';
import { useRecentlyViewed } from '@/store/useRecentlyViewed';
import { toast } from 'sonner';
import { ProductCard } from '@/components/ProductCard';
import { proxyImg } from '@/lib/imgProxy';

export default function ProductDetailPage() {
  const [, params] = useRoute('/product/:slug');
  const slug = params?.slug;
  const product = products.find(p => p.slug === slug);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeAccordion, setActiveAccordion] = useState<string | null>('description');
  
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
    
    if (product) {
      addRecentlyViewed(product);
    }
  }, [slug, product, addRecentlyViewed]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-serif text-3xl mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The item you are looking for does not exist or is no longer available.</p>
        <Link href="/shop">
          <button className="bg-foreground text-background uppercase tracking-[0.12em] text-[11px] px-8 py-3 font-medium">
            Return to Shop
          </button>
        </Link>
      </div>
    );
  }

  const needsSize = product.category === 'rings';
  const ringSizes = ['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9'];

  const handleAddToCart = () => {
    if (needsSize && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    
    addToCart({ 
      product, 
      quantity, 
      metal: product.metal,
      size: selectedSize || undefined 
    });
    
    toast.success('Added to bag');
    toggleCart();
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    if (!isInWishlist) {
      toast.success('Added to wishlist');
    }
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pt-20 pb-24 min-h-screen">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center text-[10px] uppercase tracking-widest text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={12} className="mx-2" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-foreground transition-colors">
            {product.category}
          </Link>
          <ChevronRight size={12} className="mx-2" />
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left: Images */}
          <div className="w-full lg:w-3/5 flex flex-col gap-4">
            <div className="aspect-[4/5] md:aspect-square bg-secondary relative overflow-hidden group cursor-crosshair">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={proxyImg(product.images[selectedImage])}
                  alt={`${product.name} - View ${selectedImage + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </AnimatePresence>
            </div>
            
            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 md:w-24 aspect-[4/5] flex-shrink-0 bg-secondary border-b-2 transition-colors ${selectedImage === i ? 'border-foreground' : 'border-transparent hover:border-border'}`}
                >
                  <img src={proxyImg(img)} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-2/5">
            <div className="sticky top-28">
              
              <div className="mb-6 border-b border-border pb-6">
                <div className="flex justify-between items-start mb-2">
                  <h1 className="font-serif text-3xl md:text-4xl">{product.name}</h1>
                  <button 
                    onClick={handleWishlist}
                    className="p-2 hover:bg-secondary rounded-full transition-colors -mr-2"
                  >
                    <Heart 
                      size={24} 
                      className={`transition-colors ${isInWishlist ? 'fill-foreground text-foreground' : 'text-muted-foreground hover:text-foreground'}`} 
                      strokeWidth={1.5}
                    />
                  </button>
                </div>
                
                <div className="flex items-center gap-3 text-lg mb-4">
                  {product.salePrice ? (
                    <>
                      <span className="text-muted-foreground line-through">${product.price}</span>
                      <span className="text-primary font-medium">${product.salePrice}</span>
                    </>
                  ) : (
                    <span>${product.price}</span>
                  )}
                </div>
                
                {product.isNew && (
                  <span className="text-[10px] uppercase tracking-widest px-2 py-1 bg-secondary inline-block">New Arrival</span>
                )}
              </div>

              {/* Form Options */}
              <div className="mb-8 space-y-6">
                
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.15em] font-medium mb-3">Metal</h3>
                  <div className="text-sm">{product.metal}</div>
                </div>

                {needsSize && (
                  <div>
                    <div className="flex justify-between mb-3">
                      <h3 className="text-[11px] uppercase tracking-[0.15em] font-medium">Size</h3>
                      <button className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground underline">
                        Size Guide
                      </button>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {ringSizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-3 text-sm border transition-colors ${
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

                <div className="flex items-end gap-4">
                  <div className="w-32">
                    <h3 className="text-[11px] uppercase tracking-[0.15em] font-medium mb-3">Quantity</h3>
                    <div className="flex items-center justify-between border border-border h-12">
                      <button 
                        className="px-4 h-full hover:bg-secondary transition-colors"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus size={14} strokeWidth={1.5} />
                      </button>
                      <span className="text-sm font-medium">{quantity}</span>
                      <button 
                        className="px-4 h-full hover:bg-secondary transition-colors"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 h-12 bg-foreground text-background uppercase tracking-[0.12em] text-[11px] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {product.inStock ? `Add to Bag - $${(product.salePrice || product.price) * quantity}` : 'Sold Out'}
                  </button>
                </div>

                {product.lowStock && product.inStock && (
                  <p className="text-destructive text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-destructive inline-block animate-pulse" />
                    Low stock available
                  </p>
                )}
              </div>

              {/* Accordions */}
              <div className="border-t border-border">
                {[
                  { id: 'description', title: 'Description', content: product.description },
                  { id: 'materials', title: 'Materials & Care', content: product.materials },
                  { id: 'shipping', title: 'Shipping & Returns', content: 'Free standard shipping on orders over $150. Free returns within 30 days.' }
                ].map((item) => (
                  <div key={item.id} className="border-b border-border">
                    <button 
                      className="w-full py-4 flex justify-between items-center text-sm font-medium hover:text-muted-foreground transition-colors"
                      onClick={() => setActiveAccordion(activeAccordion === item.id ? null : item.id)}
                    >
                      {item.title}
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-300 ${activeAccordion === item.id ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {activeAccordion === item.id && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
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

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="container mx-auto px-4 md:px-8 mt-32">
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
    </div>
  );
}
