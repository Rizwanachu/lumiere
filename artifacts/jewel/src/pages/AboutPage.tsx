import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { SectionReveal } from '@/components/SectionReveal';
import { proxyImg } from '@/lib/imgProxy';

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useSpring(0, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (isInView) count.set(value);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      <motion.span>{count.get() > 0 || isInView ? Math.round(count.get()) : 0}</motion.span>
      {suffix}
    </span>
  );
}

export default function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const heroImgRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroImgRef, offset: ['start end', 'end start'] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* Hero Text */}
      <section className="container mx-auto px-4 md:px-8 mb-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#C9A96E] mb-5">Our Story</p>
            <h1 className="font-serif text-5xl md:text-6xl mb-6 leading-tight">
              Quiet Luxury,{' '}
              <motion.span
                className="italic"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
              >
                Loud Intentions.
              </motion.span>
            </h1>
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Lumière was born from a simple desire: to create fine jewelry that feels as good as it looks.
              Pieces that don't need a special occasion to see the light of day.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Full-bleed parallax image */}
      <section ref={heroImgRef} className="w-full h-[60vh] md:h-[80vh] mb-24 overflow-hidden">
        <motion.img
          style={{ y: heroImgY }}
          src={proxyImg("https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=2000&q=80")}
          alt="Jewelry on model"
          className="w-full h-[120%] object-cover -mt-[10%]"
        />
      </section>

      {/* Split Content */}
      <section className="container mx-auto px-4 md:px-8 mb-24">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-center">
          <div className="w-full md:w-1/2">
            <SectionReveal direction="left">
              <h2 className="font-serif text-4xl mb-6">Crafted With Intention</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>Every piece of Lumière jewelry is designed in our studio and crafted by master jewelers using only solid 14k and 18k gold, platinum, and responsibly sourced gemstones.</p>
                <p>We reject the traditional markup model. By working directly with our manufacturing partners, we're able to offer heirloom-quality materials without the traditional luxury price tag.</p>
                <p>Our aesthetic is rooted in restraint. We believe that true luxury whispers—it doesn't shout. It's the weight of a solid gold band, the perfect drape of a chain, the subtle glow of a step-cut diamond.</p>
              </div>
            </SectionReveal>
          </div>
          <div className="w-full md:w-1/2">
            <SectionReveal direction="right" delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                <motion.img
                  src={proxyImg("https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=600&q=80")}
                  alt="Detail"
                  className="w-full aspect-[4/5] object-cover rounded-2xl"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.img
                  src={proxyImg("https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80")}
                  alt="Detail"
                  className="w-full aspect-[4/5] object-cover mt-8 rounded-2xl"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border mb-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          >
            {[
              { value: 2018, label: 'Founded' },
              { value: 50000, suffix: '+', label: 'Pieces Crafted' },
              { value: 48, label: 'Countries Shipped' },
              { value: 4.9, label: 'Average Rating' },
            ].map(({ value, suffix = '', label }) => (
              <motion.div
                key={label}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
              >
                <div className="font-serif text-4xl md:text-5xl mb-2 text-[#C9A96E]">{value}{suffix}</div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-card py-24">
        <div className="container mx-auto px-4 md:px-8">
          <SectionReveal>
            <h2 className="font-serif text-3xl text-center mb-16">Our Commitments</h2>
          </SectionReveal>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {[
              { num: '1', title: 'Solid Materials', desc: 'No vermeil, no plating. Only solid gold and platinum that won\'t tarnish or turn your skin green.' },
              { num: '2', title: 'Ethical Sourcing', desc: 'We exclusively use recycled gold and conflict-free, traceably sourced natural and lab-grown diamonds.' },
              { num: '3', title: 'Lifetime Warranty', desc: 'We stand behind our craftsmanship. Every piece is backed by our comprehensive lifetime warranty.' },
            ].map(({ num, title, desc }) => (
              <motion.div
                key={num}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
              >
                <motion.div
                  className="w-12 h-12 border border-foreground mx-auto flex items-center justify-center mb-6 rounded-full"
                  whileHover={{ scale: 1.1, borderColor: '#C9A96E' }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="font-serif text-xl">{num}</span>
                </motion.div>
                <h3 className="font-medium uppercase tracking-widest text-[11px] mb-4">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
