import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionReveal } from '@/components/SectionReveal';
import { products } from '@/data/products';

const categories = [
  {
    label: 'Rings',
    href: '/shop?category=rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=80',
    description: 'Stacking rings, solitaires & bands',
  },
  {
    label: 'Necklaces',
    href: '/shop?category=necklaces',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80',
    description: 'Pendants, chains & layering pieces',
  },
  {
    label: 'Earrings',
    href: '/shop?category=earrings',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=80',
    description: 'Studs, hoops & drops',
  },
  {
    label: 'Bracelets',
    href: '/shop?category=bracelets',
    image: 'https://images.unsplash.com/photo-1573408301185-9519f94652b1?w=900&q=80',
    description: 'Tennis, cuffs & delicate chains',
  },
];

export default function CategoriesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">

        <SectionReveal>
          <div className="mb-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A96E] mb-3">Browse</p>
            <h1 className="font-serif text-4xl md:text-5xl mb-3">Shop by Category</h1>
            <p className="text-muted-foreground text-sm max-w-md">
              Explore our full range of solid gold, platinum, and sterling silver pieces, curated by collection.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {categories.map(({ label, href, image, description }, i) => {
            const count = products.filter(p => p.category === label.toLowerCase()).length;
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <Link href={href} className="group block relative rounded-2xl overflow-hidden" style={{ height: 'clamp(260px, 35vw, 420px)' }}>
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    style={{ backgroundImage: `url(${image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 transition-all duration-500 group-hover:from-black/90" />
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white flex items-end justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-white/60 mb-2">{count} pieces</p>
                      <h2 className="font-serif text-3xl md:text-4xl mb-1 group-hover:text-[#C9A96E] transition-colors duration-300">{label}</h2>
                      <p className="text-sm text-white/70 font-light">{description}</p>
                    </div>
                    <motion.div
                      className="flex-shrink-0 w-10 h-10 rounded-full border border-white/40 flex items-center justify-center group-hover:border-[#C9A96E] group-hover:bg-[#C9A96E]/20 transition-all duration-300 ml-4"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <SectionReveal>
          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">{products.length} pieces total across all collections</p>
            <Link
              href="/shop"
              className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-medium hover:opacity-70 transition-opacity"
            >
              Shop Everything
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
