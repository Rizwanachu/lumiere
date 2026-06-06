import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { SectionReveal } from '@/components/SectionReveal';

const faqs = [
  {
    category: 'Orders & Payment',
    items: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express), UPI, Net Banking, and EMI options via Razorpay. All transactions are encrypted and secure.',
      },
      {
        q: 'Can I modify or cancel my order after placing it?',
        a: 'Orders can be modified or cancelled within 2 hours of placement by contacting our support team. Once the order enters processing, changes may not be possible. Custom or engraved pieces cannot be cancelled once confirmed.',
      },
      {
        q: 'Do you offer gift wrapping?',
        a: 'Every Lumière order arrives in our signature matte-black gift box with a satin ribbon, tissue paper, and care card — at no extra charge. If you\'d like a personalised message card, add it at checkout.',
      },
      {
        q: 'Is my personal and payment information secure?',
        a: 'Yes. Our site uses TLS encryption for all data in transit, and we never store full card details. Payment processing is handled by PCI-DSS certified partners.',
      },
    ],
  },
  {
    category: 'Products & Materials',
    items: [
      {
        q: 'What metals do you use?',
        a: 'We work exclusively with solid 14k gold, 18k gold, 950 platinum, and 925 sterling silver. We never use gold-plating or gold-fill on structural pieces — what you receive is what we describe.',
      },
      {
        q: 'Are your gemstones ethically sourced?',
        a: 'Absolutely. All our diamonds are conflict-free and Kimberley Process certified. Coloured stones are sourced from audited suppliers who meet responsible mining standards. Lab-grown diamond options are available on select pieces.',
      },
      {
        q: 'Do you offer jewellery customisation or engraving?',
        a: 'Yes — personalised engraving is available on rings, pendants, and some bangles. Custom sizing, metal upgrades, and stone swaps can be arranged for select styles. Contact us with your requirements.',
      },
      {
        q: 'How do I know my ring size?',
        a: 'Visit our Size Guide page for detailed instructions on measuring at home. You can also visit any local jeweller for a free sizing. When in doubt, order the size you think you need — we offer one complimentary resize within 30 days.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    items: [
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery within India takes 4–7 business days. Express (2–3 days) and overnight options are available at checkout. International orders ship within 10–14 business days via DHL.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes, we ship to 40+ countries. International orders may be subject to customs duties and import taxes, which are the responsibility of the recipient. We ship with full insurance and tracking.',
      },
      {
        q: 'Is my order insured during shipping?',
        a: 'All orders above ₹5,000 are fully insured for their retail value during transit at no additional cost to you.',
      },
    ],
  },
  {
    category: 'Returns & Warranty',
    items: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 30-day return window for unworn, unaltered pieces in original packaging. Sale items and customised or engraved pieces are final sale. See our Shipping & Returns page for the full process.',
      },
      {
        q: 'Do you offer a warranty?',
        a: 'Yes — all Lumière pieces carry a lifetime craftsmanship warranty against manufacturing defects. Normal wear, accidental damage, and lost stones after purchase are not covered, but we offer repair services at preferred rates.',
      },
      {
        q: 'How do I initiate a return or repair?',
        a: 'Email us at care@lumierejewels.com or use the Contact page with your order number. We\'ll send a prepaid shipping label within 24 hours for returns, or a repair estimate within 48 hours.',
      },
    ],
  },
];

function AccordionItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
      >
        <span className="font-medium text-sm md:text-base leading-snug group-hover:text-[#C9A96E] transition-colors duration-200">{q}</span>
        <span className="flex-shrink-0 mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors">
          {isOpen ? <Minus size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground text-sm leading-relaxed pb-5 max-w-2xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openItem, setOpenItem] = useState<string | null>('Orders & Payment-0');

  const toggle = (key: string) => setOpenItem(prev => prev === key ? null : key);

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">

        {/* Header */}
        <SectionReveal>
          <div className="mb-16 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A96E] mb-3">Support</p>
            <h1 className="font-serif text-4xl md:text-5xl mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Can't find what you're looking for? <a href="/contact" className="underline hover:text-foreground transition-colors">Contact our team</a> — we usually respond within a few hours.
            </p>
          </div>
        </SectionReveal>

        {/* FAQ Sections */}
        <div className="space-y-12">
          {faqs.map((section, si) => (
            <SectionReveal key={section.category} delay={si * 0.05}>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] mb-4">{section.category}</p>
                <div className="border-t border-border">
                  {section.items.map((item, ii) => {
                    const key = `${section.category}-${ii}`;
                    return (
                      <AccordionItem
                        key={key}
                        q={item.q}
                        a={item.a}
                        isOpen={openItem === key}
                        onToggle={() => toggle(key)}
                      />
                    );
                  })}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* CTA */}
        <SectionReveal delay={0.1}>
          <div className="mt-20 pt-12 border-t border-border text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Still have questions?</p>
            <h2 className="font-serif text-2xl mb-4">We're here to help</h2>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-foreground text-background text-[11px] uppercase tracking-[0.15em] font-medium px-8 py-4 hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </a>
          </div>
        </SectionReveal>

      </div>
    </div>
  );
}
