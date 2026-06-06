import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionReveal } from '@/components/SectionReveal';

const ringSizes = [
  { us: '4',    uk: 'H',  eu: '47', diameter: '14.9 mm', circumference: '46.8 mm' },
  { us: '4.5',  uk: 'I',  eu: '48', diameter: '15.3 mm', circumference: '48.0 mm' },
  { us: '5',    uk: 'J½', eu: '49', diameter: '15.7 mm', circumference: '49.3 mm' },
  { us: '5.5',  uk: 'K½', eu: '50', diameter: '16.1 mm', circumference: '50.6 mm' },
  { us: '6',    uk: 'L½', eu: '51.5', diameter: '16.5 mm', circumference: '51.9 mm' },
  { us: '6.5',  uk: 'M½', eu: '53', diameter: '16.9 mm', circumference: '53.1 mm' },
  { us: '7',    uk: 'N½', eu: '54', diameter: '17.3 mm', circumference: '54.4 mm' },
  { us: '7.5',  uk: 'O½', eu: '55.5', diameter: '17.7 mm', circumference: '55.7 mm' },
  { us: '8',    uk: 'P½', eu: '57', diameter: '18.1 mm', circumference: '57.0 mm' },
  { us: '8.5',  uk: 'Q½', eu: '58', diameter: '18.5 mm', circumference: '58.3 mm' },
  { us: '9',    uk: 'R½', eu: '59.5', diameter: '19.0 mm', circumference: '59.5 mm' },
  { us: '9.5',  uk: 'S½', eu: '61', diameter: '19.4 mm', circumference: '60.8 mm' },
  { us: '10',   uk: 'T½', eu: '62', diameter: '19.8 mm', circumference: '62.1 mm' },
];

const necklaceLengths = [
  { length: '14"', cm: '35 cm', fit: 'Choker', description: 'Sits high on the collarbone. Best for strapless and scoop necks.' },
  { length: '16"', cm: '40 cm', fit: 'Collar', description: 'Rests just below the collarbone. The most flattering all-rounder.' },
  { length: '18"', cm: '45 cm', fit: 'Princess', description: 'Falls at or just below the neckline. Our most popular length.' },
  { length: '20"', cm: '50 cm', fit: 'Matinee', description: 'Sits between collarbone and bust. Great for V-necks and layering.' },
  { length: '24"', cm: '60 cm', fit: 'Opera', description: 'Hangs to the bust or sternum. Elegant for evening wear.' },
  { length: '30"', cm: '75 cm', fit: 'Rope', description: 'Falls below the bust. Can be doubled for a layered look.' },
];

const braceletSizes = [
  { wrist: '5.5"–6"', cm: '14–15 cm', size: 'XS / S', fit: 'Snug fit' },
  { wrist: '6"–6.5"', cm: '15–16.5 cm', size: 'S / M', fit: 'Standard fit' },
  { wrist: '6.5"–7"', cm: '16.5–18 cm', size: 'M / L', fit: 'Comfortable fit' },
  { wrist: '7"–7.5"', cm: '18–19 cm', size: 'L / XL', fit: 'Relaxed fit' },
  { wrist: '7.5"+',   cm: '19+ cm',    size: 'XL',    fit: 'Loose fit' },
];

const measureMethods = [
  {
    step: '01',
    title: 'String Method',
    desc: 'Wrap a thin strip of paper or string around your finger. Mark where it overlaps. Measure the length in millimetres. Use the chart above to find your size.',
  },
  {
    step: '02',
    title: 'Existing Ring Method',
    desc: 'Place a ring you own that fits well on a ruler. Measure the internal diameter in millimetres. Match to the diameter column in the chart.',
  },
  {
    step: '03',
    title: 'Professional Sizing',
    desc: 'Visit any local jeweller for a free ring sizing. This is the most accurate method — especially for wide bands, which fit slightly snugger.',
  },
];

export default function SizeGuidePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [unit, setUnit] = useState<'us' | 'uk' | 'eu'>('us');

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">

        {/* Header */}
        <SectionReveal>
          <div className="mb-16 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A96E] mb-3">Guide</p>
            <h1 className="font-serif text-4xl md:text-5xl mb-4">Size Guide</h1>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Getting the right fit makes every difference. Use our charts and tips to find your perfect size — or contact us and we'll help.
            </p>
          </div>
        </SectionReveal>

        {/* Ring Sizes */}
        <SectionReveal>
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96E]">Ring Sizes</p>
              {/* Unit Switcher */}
              <div className="flex gap-1 bg-secondary rounded-lg p-1">
                {(['us', 'uk', 'eu'] as const).map(u => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] rounded-md transition-colors duration-200 ${unit === u ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left pb-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-normal">Size ({unit.toUpperCase()})</th>
                    <th className="text-left pb-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-normal">Diameter</th>
                    <th className="text-left pb-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-normal">Circumference</th>
                  </tr>
                </thead>
                <tbody>
                  {ringSizes.map((row, i) => (
                    <motion.tr
                      key={row.us}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.02 }}
                      className="border-b border-border/60 hover:bg-secondary/40 transition-colors"
                    >
                      <td className="py-3 font-medium">{row[unit]}</td>
                      <td className="py-3 text-muted-foreground">{row.diameter}</td>
                      <td className="py-3 text-muted-foreground">{row.circumference}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              * Wide band rings (4mm+) may feel tighter — consider going half a size up. If you're between sizes, we recommend sizing up.
            </p>
          </div>
        </SectionReveal>

        {/* How to Measure */}
        <SectionReveal>
          <div className="mb-16">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] mb-8">How to Find Your Ring Size</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {measureMethods.map((m, i) => (
                <motion.div
                  key={m.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="border border-border rounded-2xl p-6"
                >
                  <span className="font-serif text-3xl text-[#C9A96E]/40 block mb-3">{m.step}</span>
                  <p className="font-medium text-sm mb-2">{m.title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 bg-secondary/50 rounded-xl p-4">
              <p className="text-xs text-muted-foreground">
                <span className="text-foreground font-medium">Pro tip:</span> Measure in the evening when fingers tend to be slightly larger. Avoid measuring when cold, as fingers shrink. Take 2–3 measurements and average them.
              </p>
            </div>
          </div>
        </SectionReveal>

        {/* Necklace Lengths */}
        <SectionReveal>
          <div className="mb-16">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] mb-6">Necklace Lengths</p>
            <div className="border-t border-border">
              {necklaceLengths.map((row, i) => (
                <motion.div
                  key={row.length}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-10px' }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="grid grid-cols-3 md:grid-cols-4 gap-4 py-4 border-b border-border items-start"
                >
                  <div>
                    <p className="font-medium text-sm">{row.length}</p>
                    <p className="text-muted-foreground text-xs">{row.cm}</p>
                  </div>
                  <p className="text-sm font-medium text-[#C9A96E]">{row.fit}</p>
                  <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 leading-snug">{row.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Bracelet Sizes */}
        <SectionReveal>
          <div className="mb-16">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] mb-4">Bracelet Sizes</p>
            <p className="text-sm text-muted-foreground mb-6">Measure your wrist snugly with a tape measure or string, then add 1–1.5 cm for a comfortable fit.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left pb-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-normal">Wrist Size</th>
                    <th className="text-left pb-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-normal">CM</th>
                    <th className="text-left pb-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-normal">Size</th>
                    <th className="text-left pb-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-normal">Fit</th>
                  </tr>
                </thead>
                <tbody>
                  {braceletSizes.map((row, i) => (
                    <motion.tr
                      key={row.wrist}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className="border-b border-border/60 hover:bg-secondary/40 transition-colors"
                    >
                      <td className="py-3 font-medium">{row.wrist}</td>
                      <td className="py-3 text-muted-foreground">{row.cm}</td>
                      <td className="py-3 text-muted-foreground">{row.size}</td>
                      <td className="py-3 text-muted-foreground">{row.fit}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </SectionReveal>

        {/* Still Unsure */}
        <SectionReveal>
          <div className="bg-card border border-border rounded-2xl p-6 md:p-10 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A96E] mb-3">Still unsure?</p>
            <h2 className="font-serif text-2xl md:text-3xl mb-4">We'll help you find your fit</h2>
            <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
              All Lumière rings include one complimentary resize within 30 days of delivery. Order the closest size — we'll take care of the rest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center bg-foreground text-background text-[11px] uppercase tracking-[0.15em] font-medium px-8 py-4 hover:opacity-90 transition-opacity"
              >
                Contact Us
              </a>
              <a
                href="/faq"
                className="inline-flex items-center justify-center border border-border text-[11px] uppercase tracking-[0.15em] font-medium px-8 py-4 hover:border-foreground transition-colors"
              >
                Read FAQ
              </a>
            </div>
          </div>
        </SectionReveal>

      </div>
    </div>
  );
}
