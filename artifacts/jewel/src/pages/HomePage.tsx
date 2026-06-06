import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Marquee } from '@/components/Marquee';
import { SectionReveal } from '@/components/SectionReveal';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { proxyImg } from '@/lib/imgProxy';

export default function HomePage() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredProducts = products.filter(p => p.isBestseller).slice(0, 4);

  const headline = "Fine Jewelry, Reimagined.";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] w-full bg-black overflow-hidden flex items-center justify-center">
        <img 
          src={proxyImg("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=80")}
          alt="Fine jewelry on model" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white flex flex-col items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="flex flex-wrap justify-center overflow-hidden mb-6"
          >
            {headline.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
                }}
                className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-wide mx-[0.2em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-xl text-sm md:text-base font-light tracking-wide opacity-90 mb-10"
          >
            Heirloom-quality pieces crafted with intention. Designed to be lived in, loved, and passed down.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="/shop">
              <button className="bg-white text-black uppercase tracking-[0.15em] text-[11px] px-10 py-4 font-medium hover:bg-black hover:text-white transition-colors duration-300 border border-transparent hover:border-white">
                Explore the Collection
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Marquee text="Free Shipping · Ethically Sourced · Lifetime Warranty · Free Returns" />

      {/* Featured Products */}
      <section className="py-24 px-4 md:px-8 container mx-auto">
        <SectionReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl mb-2">Curated for You</h2>
              <p className="text-muted-foreground text-sm">Our most loved everyday essentials.</p>
            </div>
            <Link href="/shop" className="group flex items-center text-[11px] uppercase tracking-[0.15em] font-medium hover:opacity-70 transition-opacity">
              Shop All <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 md:px-8">
        <SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 h-[1200px] md:h-[600px]">
            <Link href="/shop?category=rings" className="group relative w-full h-full overflow-hidden block cursor-pointer">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
              <img 
                src={proxyImg("https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80")}
                alt="Rings" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-8 left-8 z-20 text-white">
                <h3 className="font-serif text-3xl mb-2">Rings</h3>
                <span className="text-[11px] uppercase tracking-[0.15em] border-b border-white pb-1">Shop Now</span>
              </div>
            </Link>
            <Link href="/shop?category=necklaces" className="group relative w-full h-full overflow-hidden block cursor-pointer">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
              <img 
                src={proxyImg("https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=800&q=80")}
                alt="Necklaces" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-8 left-8 z-20 text-white">
                <h3 className="font-serif text-3xl mb-2">Necklaces</h3>
                <span className="text-[11px] uppercase tracking-[0.15em] border-b border-white pb-1">Shop Now</span>
              </div>
            </Link>
            <Link href="/shop?category=earrings" className="group relative w-full h-full overflow-hidden block cursor-pointer">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
              <img 
                src={proxyImg("https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80")}

                alt="Earrings" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-8 left-8 z-20 text-white">
                <h3 className="font-serif text-3xl mb-2">Earrings</h3>
                <span className="text-[11px] uppercase tracking-[0.15em] border-b border-white pb-1">Shop Now</span>
              </div>
            </Link>
          </div>
        </SectionReveal>
      </section>

      {/* Story Split Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
            <div className="w-full md:w-1/2">
              <SectionReveal>
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={proxyImg("https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=80")}

                    alt="Atelier detail" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </SectionReveal>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <SectionReveal>
                <h2 className="font-serif text-4xl lg:text-5xl mb-6">Crafted with Intention</h2>
                <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
                  We believe fine jewelry should be accessible, enduring, and responsibly made. 
                  By working directly with master jewelers, we bypass traditional markups to 
                  bring you heirloom-quality pieces for everyday wear.
                </p>
                <Link href="/about">
                  <button className="text-[11px] uppercase tracking-[0.15em] font-medium border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors">
                    Our Story
                  </button>
                </Link>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* UGC Grid */}
      <section className="py-24 container mx-auto px-4 md:px-8">
        <SectionReveal>
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl mb-2">#LumiereJewels</h2>
            <p className="text-muted-foreground text-sm">Follow us on Instagram @lumierejewels</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "photo-1602173574767-37ac01994b2a",
              "photo-1589128777073-263566ae5e4d",
              "photo-1611085583191-a3b181a88401",
              "photo-1610694955371-d4a3e0ce4b52",
              "photo-1584302179602-e4c3d3fd629d",
              "photo-1588444837495-c6cfeb53f32d",
            ].map((id, i) => (
              <a key={i} href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group block aspect-square relative overflow-hidden bg-secondary">
                <img 
                  src={proxyImg(`https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&q=80`)}
                  alt={`Instagram photo ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </a>
            ))}
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
