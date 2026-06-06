import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionReveal } from '@/components/SectionReveal';

const metals = [
  {
    name: '14k & 18k Gold',
    colour: '#C9A96E',
    tips: [
      'Wipe with a soft lint-free cloth after each wear to remove oils and perspiration.',
      'Clean monthly with warm water, a drop of mild dish soap, and a soft toothbrush. Rinse thoroughly.',
      'Avoid chlorine, bleach, and harsh cleaning chemicals — they can weaken prongs and dull the finish.',
      'Remove before swimming, exercising, or applying perfume, hairspray, or lotion.',
      'Store separately in a fabric-lined box or pouch to prevent scratching.',
    ],
  },
  {
    name: 'Sterling Silver',
    colour: '#A0A0A0',
    tips: [
      'Silver tarnishes naturally when exposed to air and moisture — this is normal.',
      'Polish gently with a silver polishing cloth to restore shine.',
      'Store in an airtight zip-lock bag or anti-tarnish pouch between wears.',
      'Avoid rubber bands, which accelerate tarnishing.',
      'Do not use abrasive cloths or toothpaste — they can scratch the surface.',
    ],
  },
  {
    name: 'Platinum',
    colour: '#D0D0D0',
    tips: [
      'Platinum develops a natural patina over time — many customers appreciate this aged look.',
      'To restore high polish, visit a jeweller for professional buffing (free under our warranty).',
      'Clean with warm soapy water and a soft brush. Rinse and dry completely.',
      'Platinum is very durable but can still be scratched — store away from harder gemstones.',
      'Metal does not "disappear" — unlike gold-plate, scratches displace the metal rather than remove it.',
    ],
  },
];

const dos = [
  'Put jewellery on last, after applying makeup, perfume, and hairspray.',
  'Remove pieces before sleeping, showering, and physical activity.',
  'Store each piece separately in its own pouch or compartment.',
  'Have prongs and settings checked by a jeweller once a year.',
  'Bring your Lumière pieces in for a complimentary professional clean anytime.',
];

const donts = [
  'Expose to chlorine pools, hot tubs, or the sea.',
  'Use ultrasonic cleaners on pieces with pearls, opals, emeralds, or treated stones.',
  'Store jewellery in direct sunlight or high humidity.',
  'Wear rings while lifting weights or doing manual work.',
  'Apply lotions, oils, or sunscreen while wearing delicate pieces.',
];

const gemstones = [
  { stone: 'Diamonds', care: 'Extremely durable (Mohs 10). Clean with warm soapy water. Avoid grease — it dulls the sparkle quickly.' },
  { stone: 'Rubies & Sapphires', care: 'Very hard (Mohs 9). Safe to clean with warm water and brush. Avoid sudden temperature changes.' },
  { stone: 'Emeralds', care: 'Often treated with oils. Clean with a damp cloth only — never use ultrasonic cleaners or steam.' },
  { stone: 'Pearls', care: 'Organic and delicate. Wipe with a damp cloth immediately after wear. Store flat. Re-string annually if worn often.' },
  { stone: 'Opals', care: 'Sensitive to dryness and chemicals. Store with a slightly damp cloth in humid climates. Avoid ultrasonic cleaners.' },
  { stone: 'Amethyst & Citrine', care: 'Clean with warm soapy water. Avoid prolonged sunlight exposure — colour may fade over time.' },
];

export default function JewelryCarePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">

        {/* Header */}
        <SectionReveal>
          <div className="mb-16 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A96E] mb-3">Guide</p>
            <h1 className="font-serif text-4xl md:text-5xl mb-4">Jewellery Care</h1>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              With the right care, your Lumière pieces will last a lifetime — and then some. Follow these guidelines to keep every detail looking its finest.
            </p>
          </div>
        </SectionReveal>

        {/* By Metal */}
        <SectionReveal>
          <div className="mb-16">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] mb-8">Care by Metal</p>
            <div className="space-y-10">
              {metals.map((metal, mi) => (
                <motion.div
                  key={metal.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.55, delay: mi * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="border border-border rounded-2xl p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: metal.colour }} />
                    <h2 className="font-serif text-xl">{metal.name}</h2>
                  </div>
                  <ul className="space-y-3">
                    {metal.tips.map((tip, ti) => (
                      <li key={ti} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="mt-2 w-1 h-1 rounded-full bg-[#C9A96E] flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Dos and Don'ts */}
        <SectionReveal>
          <div className="mb-16">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] mb-8">General Dos & Don'ts</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-secondary/40 rounded-2xl p-6">
                <p className="text-[11px] uppercase tracking-[0.2em] font-medium mb-4 text-foreground">Do</p>
                <ul className="space-y-3">
                  {dos.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 text-[#C9A96E] font-bold text-xs flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-secondary/40 rounded-2xl p-6">
                <p className="text-[11px] uppercase tracking-[0.2em] font-medium mb-4 text-foreground">Don't</p>
                <ul className="space-y-3">
                  {donts.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 text-destructive font-bold text-xs flex-shrink-0">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Gemstones */}
        <SectionReveal>
          <div className="mb-16">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] mb-6">Care by Gemstone</p>
            <div className="border-t border-border">
              {gemstones.map((gem, i) => (
                <motion.div
                  key={gem.stone}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 py-4 border-b border-border"
                >
                  <p className="font-medium text-sm">{gem.stone}</p>
                  <p className="text-sm text-muted-foreground md:col-span-2 leading-relaxed">{gem.care}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Storage */}
        <SectionReveal>
          <div className="mb-16 bg-card border border-border rounded-2xl p-6 md:p-10">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] mb-3">Storage</p>
            <h2 className="font-serif text-2xl mb-4">How to Store Your Jewellery</h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
              Every Lumière piece arrives in a signature gift box with a soft insert — ideal for storage. For everyday access, use a fabric-lined jewellery tray with individual compartments to prevent pieces scratching each other. Keep silver in an airtight bag with an anti-tarnish strip. Avoid bathroom storage where humidity and hairsprays can accelerate tarnish and loosen settings.
            </p>
          </div>
        </SectionReveal>

        {/* CTA */}
        <SectionReveal>
          <div className="pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-medium text-sm mb-1">Covered by our lifetime warranty</p>
              <p className="text-muted-foreground text-sm">Manufacturing defects repaired free, forever.</p>
            </div>
            <a
              href="/faq"
              className="flex-shrink-0 inline-flex items-center gap-2 border border-foreground text-[11px] uppercase tracking-[0.15em] font-medium px-6 py-3 hover:bg-foreground hover:text-background transition-colors duration-200"
            >
              View FAQ
            </a>
          </div>
        </SectionReveal>

      </div>
    </div>
  );
}
