import React, { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Marquee } from '@/components/Marquee';
import { SectionReveal, StaggerReveal } from '@/components/SectionReveal';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';

export default function HomePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '35%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.12]);

  const storyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ['start end', 'end start'],
  });
  const storyImgY = useTransform(storyProgress, [0, 1], ['-8%', '8%']);

  const featuredProducts = products.filter(p => p.isBestseller).slice(0, 4);
  const headline = "Fine Jewelry, Reimagined.";

  const collections = [
    { label: 'Rings', href: '/shop?category=rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80' },
    { label: 'Necklaces', href: '/shop?category=necklaces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80' },
    { label: 'Earrings', href: '/shop?category=earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with parallax */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] w-full bg-black overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=80"
            alt="Fine jewelry on model"
            className="w-full h-full object-cover opacity-60"
          />
        </motion.div>

        {/* Floating shimmer particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
                background: '#C9A96E',
                opacity: 0.4,
              }}
              animate={{
                y: [-15, 15, -15],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.7,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.4,
              }}
            />
          ))}
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 container mx-auto px-4 text-center text-white flex flex-col items-center"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="flex flex-wrap justify-center overflow-hidden flex-row mb-[24px] pb-[0px] pt-[10px]"
          >
            {headline.split(' ').map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 50, rotateX: -40 },
                  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.9, ease: [0.2, 0.65, 0.3, 0.9] } },
                }}
                className="font-serif sm:text-5xl md:text-7xl lg:text-8xl tracking-wide mx-[0.2em] pb-[10px] text-[42px] pt-[0px] mt-[-8px] mb-[-8px]"
                style={{ display: 'inline-block' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="max-w-xl text-sm md:text-base font-light tracking-wide opacity-90 mb-[75px]"
          >
            Heirloom-quality pieces crafted with intention. Designed to be lived in, loved, and passed down.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.04, backgroundColor: '#000', color: '#fff', borderColor: '#fff' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="bg-white text-black uppercase tracking-[0.15em] text-[11px] px-10 py-4 font-medium border border-transparent rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]"
              >
                Explore the Collection
              </motion.button>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 justify-start items-center flex-col pb-[10px]"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/60">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"
            />
          </motion.div>
        </motion.div>
      </section>
      <Marquee text="Free Shipping · Ethically Sourced · Lifetime Warranty · Free Returns" />
      {/* Featured Products with stagger */}
      <section className="py-24 px-4 md:px-8 container mx-auto">
        <SectionReveal>
          <div className="flex md:flex-row text-center justify-center items-center gap-[10px] flex-col mb-[48px] font-normal">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl mb-2">Curated for You</h2>
              <p className="text-muted-foreground text-sm">Our most loved everyday essentials.</p>
            </div>
            <Link href="/shop" className="group flex items-center text-[11px] uppercase tracking-[0.15em] font-medium hover:opacity-70 transition-opacity">
              Shop All <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </SectionReveal>

        <StaggerReveal
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8"
          staggerDelay={0.12}
          direction="up"
        >
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </StaggerReveal>
      </section>
      {/* Collections Grid with parallax images */}
      <section className="py-12 px-4 md:px-8">
        <SectionReveal>
          <div className="md:mb-10 text-center mb-[35px]">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A96E] mb-3">Shop by Category</p>
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <h2 className="font-serif text-3xl md:text-4xl">Explore the Collection</h2>
              <Link href="/categories" className="group flex text-[11px] uppercase tracking-[0.15em] font-medium hover:opacity-70 transition-opacity justify-center items-center flex-row">
                View All <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-4 mb-2 md:mb-4" style={{ height: 'clamp(200px, 40vw, 620px)' }}>
            {collections.map(({ label, href, image }, i) => (
              <CollectionTile key={label} label={label} href={href} image={image} index={i} />
            ))}
          </div>

          <Link href="/shop?category=bracelets" className="block rounded-xl md:rounded-2xl overflow-hidden cursor-pointer" style={{ height: 'clamp(120px, 25vw, 240px)' }}>
            <div className="group relative h-full">
              {/* Scalable bg image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1400&q=80)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/75" />
              {/* shine sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              <div className="absolute inset-0 flex items-center">
                <div className="pl-12 text-white">
                  <motion.h3
                    className="font-serif text-4xl md:text-5xl mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                  >
                    Bracelets
                  </motion.h3>
                  <span className="text-[11px] uppercase tracking-[0.15em] flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                    Shop Now <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </SectionReveal>
      </section>
      {/* Story Split Section */}
      <section className="py-24 bg-card overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div ref={storyRef} className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
            <div className="w-full md:w-1/2">
              <SectionReveal direction="left">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                  <motion.img
                    style={{ y: storyImgY }}
                    src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=80"
                    alt="Atelier detail"
                    className="w-full h-[115%] object-cover -mt-[7.5%]"
                  />
                </div>
              </SectionReveal>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <SectionReveal direction="right" delay={0.15}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A96E] mb-4">Our Story</p>
                <h2 className="font-serif text-4xl lg:text-5xl mb-6">Crafted with Intention</h2>
                <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
                  We believe fine jewelry should be accessible, enduring, and responsibly made.
                  By working directly with master jewelers, we bypass traditional markups to
                  bring you heirloom-quality pieces for everyday wear.
                </p>
                <Link href="/about">
                  <motion.button
                    whileHover={{ x: 6 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="text-[11px] uppercase tracking-[0.15em] font-medium flex items-center gap-2 group"
                  >
                    Our Story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
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
        </SectionReveal>
        <StaggerReveal
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          staggerDelay={0.08}
          direction="scale"
        >
          {[
            'photo-1602173574767-37ac01994b2a',
            'photo-1589128777073-263566ae5e4d',
            'photo-1611085583191-a3b181a88401',
            'photo-1610694955371-d4a3e0ce4b52',
            'photo-1584302179602-e4c3d3fd629d',
            'photo-1588444837495-c6cfeb53f32d',
          ].map((id, i) => (
            <a key={i} href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="group block aspect-square relative overflow-hidden bg-secondary rounded-xl"
            >
              <img
                src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&q=80`}
                alt={`Instagram photo ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-[10px] uppercase tracking-widest">View</span>
              </div>
            </a>
          ))}
        </StaggerReveal>
      </section>
    </div>
  );
}

function CollectionTile({ label, href, image }: { label: string; href: string; image: string; index: number }) {
  return (
    <Link href={href} className="block h-full rounded-2xl overflow-hidden cursor-pointer">
      <div className="group relative h-full">
        {/* Scalable bg image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          style={{ backgroundImage: `url(${image})` }}
        />
        {/* Darkening overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/90" />
        {/* Shine sweep */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        {/* Label */}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-8 z-10 text-white translate-y-1 group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <h3 className="font-serif text-base sm:text-2xl md:text-3xl mb-1 md:mb-3">{label}</h3>
          <span className="hidden md:flex text-[11px] uppercase tracking-[0.15em] items-center gap-2 opacity-0 group-hover:opacity-100 group-hover:gap-3 transition-all duration-300">
            Shop Now <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}
