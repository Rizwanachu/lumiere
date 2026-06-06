import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Truck, RotateCcw, Shield, Clock } from 'lucide-react';
import { SectionReveal } from '@/components/SectionReveal';

const shippingOptions = [
  { name: 'Standard Delivery', time: '4–7 Business Days', price: 'Free on orders above ₹2,000', note: 'India only' },
  { name: 'Express Delivery', time: '2–3 Business Days', price: '₹299', note: 'India only' },
  { name: 'Overnight Delivery', time: 'Next Business Day', price: '₹599', note: 'Select cities only' },
  { name: 'International', time: '10–14 Business Days', price: 'Calculated at checkout', note: '40+ countries via DHL' },
];

const returnSteps = [
  { step: '01', title: 'Initiate', desc: 'Email care@lumierejewels.com with your order number and reason within 30 days of delivery.' },
  { step: '02', title: 'Label', desc: 'We\'ll send a prepaid insured return label to your email within 24 hours.' },
  { step: '03', title: 'Pack & Ship', desc: 'Pack the item in its original box and drop it off at any courier centre.' },
  { step: '04', title: 'Refund', desc: 'Once received and inspected, your refund is processed within 5–7 business days to the original payment method.' },
];

const highlights = [
  { icon: Truck, label: 'Free Shipping', sub: 'On all orders above ₹2,000' },
  { icon: RotateCcw, label: '30-Day Returns', sub: 'Hassle-free, no questions asked' },
  { icon: Shield, label: 'Fully Insured', sub: 'Every shipment covered' },
  { icon: Clock, label: 'Fast Processing', sub: 'Orders ship within 1–2 business days' },
];

export default function ShippingPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">

        {/* Header */}
        <SectionReveal>
          <div className="mb-16 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A96E] mb-3">Policies</p>
            <h1 className="font-serif text-4xl md:text-5xl mb-4">Shipping & Returns</h1>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              We want every Lumière experience to feel effortless — from checkout to your doorstep and back.
            </p>
          </div>
        </SectionReveal>

        {/* Highlights */}
        <SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {highlights.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="text-center">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mx-auto mb-3">
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <p className="font-medium text-sm mb-1">{label}</p>
                <p className="text-muted-foreground text-xs leading-snug">{sub}</p>
              </div>
            ))}
          </div>
        </SectionReveal>

        {/* Shipping Options */}
        <SectionReveal>
          <div className="mb-16">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] mb-6">Delivery Options</p>
            <div className="border-t border-border">
              {shippingOptions.map((opt, i) => (
                <motion.div
                  key={opt.name}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 py-5 border-b border-border items-center"
                >
                  <div>
                    <p className="font-medium text-sm">{opt.name}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{opt.note}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{opt.time}</p>
                  <p className="text-sm font-medium col-span-2 md:col-span-2">{opt.price}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 bg-secondary/50 rounded-xl p-5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">Please note:</span> Orders are processed Monday–Friday. Orders placed on weekends or public holidays will be dispatched the next business day. Delivery times are estimates and may vary during peak periods.
              </p>
            </div>
          </div>
        </SectionReveal>

        {/* Returns */}
        <SectionReveal>
          <div className="mb-16">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] mb-4">Returns & Exchanges</p>
            <h2 className="font-serif text-2xl md:text-3xl mb-4">30-Day Return Policy</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-2xl">
              We stand behind every piece we make. If you're not completely satisfied, return unworn items in their original packaging within 30 days for a full refund or exchange.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {returnSteps.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="flex gap-4"
                >
                  <span className="font-serif text-3xl text-[#C9A96E]/40 leading-none flex-shrink-0 mt-0.5">{s.step}</span>
                  <div>
                    <p className="font-medium text-sm mb-1">{s.title}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Non-returnable */}
        <SectionReveal>
          <div className="mb-16 bg-secondary/50 rounded-2xl p-6 md:p-8">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] mb-4">Non-Returnable Items</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                'Custom, personalised, or engraved pieces',
                'Items marked as Final Sale or purchased during clearance events',
                'Pieces that have been worn, altered, or damaged',
                'Items without original packaging or tags',
                'Earrings (for hygiene reasons, unless faulty)',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#C9A96E] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>

        {/* International */}
        <SectionReveal>
          <div className="mb-16">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] mb-4">International Orders</p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              International orders are shipped via DHL Express with full tracking and insurance. Import duties, taxes, and customs fees are not included in the product price and are the responsibility of the recipient. Lumière is not liable for delays caused by customs clearance. For international returns, shipping costs are borne by the customer.
            </p>
          </div>
        </SectionReveal>

        {/* CTA */}
        <SectionReveal>
          <div className="pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-medium text-sm mb-1">Questions about your order?</p>
              <p className="text-muted-foreground text-sm">Reach us at care@lumierejewels.com or via our Contact page.</p>
            </div>
            <a
              href="/contact"
              className="flex-shrink-0 inline-flex items-center gap-2 border border-foreground text-[11px] uppercase tracking-[0.15em] font-medium px-6 py-3 hover:bg-foreground hover:text-background transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </SectionReveal>

      </div>
    </div>
  );
}
