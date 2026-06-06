import React, { useState, useRef } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Lock, Package, Truck, CreditCard } from 'lucide-react';
import { useCart } from '@/store/useCart';
import { formatINR, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST, EXPRESS_SHIPPING_COST, GST_RATE } from '@/lib/currency';

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa',
  'Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala',
  'Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland',
  'Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura',
  'Uttar Pradesh','Uttarakhand','West Bengal',
  'Delhi (NCT)','Jammu & Kashmir','Ladakh','Puducherry','Chandigarh',
];

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
  billingOption: 'same' | 'different';
  shippingMethod: 'standard' | 'express';
}

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isComplete, setIsComplete] = useState(false);
  const [orderNumber] = useState(() => `LM-${Math.floor(Math.random() * 90000) + 10000}`);
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState<FormData>({
    email: '', firstName: '', lastName: '', address: '', apartment: '',
    city: '', state: '', zip: '', cardNumber: '', cardName: '',
    expiry: '', cvv: '', billingOption: 'same', shippingMethod: 'standard',
  });

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const subtotal = items.reduce((acc, item) => acc + (item.product.salePrice || item.product.price) * item.quantity, 0);
  const shippingCost = form.shippingMethod === 'express' ? EXPRESS_SHIPPING_COST : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  const tax = subtotal * GST_RATE;
  const total = subtotal + shippingCost + tax;

  const inputCls = "w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground rounded-lg";

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    setIsComplete(true);
    clearCart();
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(s => (s < 3 ? (s + 1) as 1 | 2 | 3 : s));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stepLabels = ['Information', 'Shipping', 'Payment'];

  if (items.length === 0 && !isComplete) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-20">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
          <Package size={28} strokeWidth={1.5} className="text-muted-foreground" />
        </div>
        <h1 className="font-serif text-3xl mb-3">Your bag is empty</h1>
        <p className="text-muted-foreground mb-8">Add some pieces to your bag before checking out.</p>
        <Link href="/shop">
          <button className="bg-foreground text-background uppercase tracking-[0.12em] text-[11px] px-8 py-3 font-medium rounded-lg hover:opacity-90 transition-opacity">
            Browse the Collection
          </button>
        </Link>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16 pb-24">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.4, duration: 0.7 }}
          className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
          style={{ background: '#C9A96E20' }}
        >
          <Check size={36} strokeWidth={2} style={{ color: '#C9A96E' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-md"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Order Confirmed</p>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Thank You{form.firstName ? `, ${form.firstName}` : ''}!</h1>
          <p className="text-muted-foreground mb-2">
            Your order <span className="text-foreground font-medium">{orderNumber}</span> has been placed successfully.
          </p>
          <p className="text-muted-foreground text-sm mb-10">
            We'll send a confirmation to{form.email ? ` ${form.email}` : ' your email'} with tracking details once your order ships.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-10 text-center">
            {[
              { icon: <Package size={22} strokeWidth={1.5} />, label: 'Processing', sub: 'Today' },
              { icon: <Truck size={22} strokeWidth={1.5} />, label: 'Shipping', sub: '1–3 days' },
              { icon: <Check size={22} strokeWidth={1.5} />, label: 'Delivered', sub: '3–5 days' },
            ].map((s, i) => (
              <div key={i} className="bg-secondary rounded-xl p-4 flex flex-col items-center gap-2">
                <div className="text-muted-foreground">{s.icon}</div>
                <p className="text-xs font-medium">{s.label}</p>
                <p className="text-[10px] text-muted-foreground">{s.sub}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/shop">
              <button className="bg-foreground text-background uppercase tracking-[0.12em] text-[11px] px-8 py-3 font-medium rounded-lg hover:opacity-90 transition-opacity">
                Continue Shopping
              </button>
            </Link>
            <Link href="/wishlist">
              <button className="border border-border uppercase tracking-[0.12em] text-[11px] px-8 py-3 font-medium rounded-lg hover:bg-secondary transition-colors">
                View Wishlist
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-24 min-h-screen bg-[#FAFAF9]">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">

        {/* Logo */}
        <Link href="/" className="font-serif text-2xl tracking-widest text-center block py-8">
          LUMIÈRE
        </Link>

        {/* Step progress */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {stepLabels.map((label, i) => {
            const num = i + 1;
            const done = step > num;
            const active = step === num;
            return (
              <React.Fragment key={label}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                      done ? 'bg-foreground text-background' :
                      active ? 'border-2 border-foreground text-foreground' :
                      'border-2 border-border text-muted-foreground'
                    }`}
                  >
                    {done ? <Check size={14} strokeWidth={2.5} /> : num}
                  </div>
                  <span className={`mt-1.5 text-[10px] uppercase tracking-widest hidden sm:block ${active ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {label}
                  </span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div className={`h-px w-16 md:w-24 mx-2 mb-5 sm:mb-0 transition-colors duration-300 ${step > num ? 'bg-foreground' : 'bg-border'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 xl:gap-14">

          {/* Left: Form */}
          <div className="w-full lg:w-3/5">
            <AnimatePresence mode="wait">

              {/* Step 1: Information */}
              {step === 1 && (
                <motion.form
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  onSubmit={handleNext}
                  className="space-y-8"
                >
                  <div className="bg-background border border-border rounded-2xl p-6 space-y-4">
                    <h2 className="font-serif text-xl mb-2">Contact</h2>
                    <input
                      type="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={set('email')}
                      className={inputCls}
                      required
                    />
                  </div>

                  <div className="bg-background border border-border rounded-2xl p-6 space-y-4">
                    <h2 className="font-serif text-xl mb-2">Shipping Address</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="First name" value={form.firstName} onChange={set('firstName')} className={inputCls} required />
                      <input type="text" placeholder="Last name" value={form.lastName} onChange={set('lastName')} className={inputCls} required />
                    </div>
                    <input type="text" placeholder="Street address" value={form.address} onChange={set('address')} className={inputCls} required />
                    <input type="text" placeholder="Apartment, suite, etc. (optional)" value={form.apartment} onChange={set('apartment')} className={inputCls} />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <input type="text" placeholder="City" value={form.city} onChange={set('city')} className={inputCls} required />
                      <select value={form.state} onChange={set('state')} className={inputCls} required>
                        <option value="" disabled>State / UT</option>
                        {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <input type="text" placeholder="PIN code" value={form.zip} onChange={set('zip')} className={inputCls} required maxLength={6} />
                    </div>
                  </div>

                  <button type="submit" className="w-full py-4 text-[11px] uppercase tracking-[0.15em] font-medium text-white rounded-xl hover:opacity-90 transition-opacity" style={{ background: '#1A1A1A' }}>
                    Continue to Shipping
                  </button>
                </motion.form>
              )}

              {/* Step 2: Shipping */}
              {step === 2 && (
                <motion.form
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  onSubmit={handleNext}
                  className="space-y-6"
                >
                  {/* Address summary */}
                  <div className="bg-background border border-border rounded-2xl p-5 text-sm space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-muted-foreground w-16 flex-shrink-0">Contact</span>
                      <span className="flex-1 ml-4 truncate">{form.email || 'Not provided'}</span>
                      <button type="button" onClick={() => setStep(1)} className="text-[10px] uppercase tracking-widest underline ml-4 hover:opacity-70">Change</button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground w-16 flex-shrink-0">Ship to</span>
                      <span className="flex-1 ml-4 text-sm">
                        {[form.address, form.city, form.state, form.zip].filter(Boolean).join(', ') || 'Address not provided'}
                      </span>
                      <button type="button" onClick={() => setStep(1)} className="text-[10px] uppercase tracking-widest underline ml-4 hover:opacity-70">Change</button>
                    </div>
                  </div>

                  <div className="bg-background border border-border rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-border">
                      <h2 className="font-serif text-xl">Shipping Method</h2>
                    </div>
                    <label
                      className={`flex items-center justify-between px-5 py-4 cursor-pointer border-b border-border transition-colors ${form.shippingMethod === 'standard' ? 'bg-secondary/50' : 'hover:bg-secondary/30'}`}
                      onClick={() => setForm(f => ({ ...f, shippingMethod: 'standard' }))}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${form.shippingMethod === 'standard' ? 'border-foreground' : 'border-border'}`}>
                          {form.shippingMethod === 'standard' && <div className="w-2 h-2 rounded-full bg-foreground" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium">Standard Shipping</p>
                          <p className="text-xs text-muted-foreground">3–5 business days</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium">{subtotal >= FREE_SHIPPING_THRESHOLD ? 'Free' : formatINR(STANDARD_SHIPPING_COST)}</span>
                    </label>
                    <label
                      className={`flex items-center justify-between px-5 py-4 cursor-pointer transition-colors ${form.shippingMethod === 'express' ? 'bg-secondary/50' : 'hover:bg-secondary/30'}`}
                      onClick={() => setForm(f => ({ ...f, shippingMethod: 'express' }))}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${form.shippingMethod === 'express' ? 'border-foreground' : 'border-border'}`}>
                          {form.shippingMethod === 'express' && <div className="w-2 h-2 rounded-full bg-foreground" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium">Express Shipping</p>
                          <p className="text-xs text-muted-foreground">1–2 business days</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium">{formatINR(EXPRESS_SHIPPING_COST)}</span>
                    </label>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <button type="button" onClick={() => setStep(1)} className="flex items-center gap-1 text-[11px] uppercase tracking-widest hover:opacity-70 transition-opacity">
                      <ChevronRight size={14} className="rotate-180" /> Back
                    </button>
                    <button type="submit" className="flex-1 py-4 text-[11px] uppercase tracking-[0.15em] font-medium text-white rounded-xl hover:opacity-90 transition-opacity" style={{ background: '#1A1A1A' }}>
                      Continue to Payment
                    </button>
                  </div>
                </motion.form>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <motion.form
                  key="step3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  onSubmit={handleComplete}
                  className="space-y-6"
                >
                  <div className="bg-background border border-border rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                      <h2 className="font-serif text-xl">Payment</h2>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Lock size={12} strokeWidth={1.5} />
                        Secure & encrypted
                      </div>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Card number"
                          value={form.cardNumber}
                          onChange={e => {
                            const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                            const formatted = v.match(/.{1,4}/g)?.join(' ') || v;
                            setForm(f => ({ ...f, cardNumber: formatted }));
                          }}
                          className={inputCls}
                          required
                          maxLength={19}
                        />
                        <CreditCard size={18} strokeWidth={1.5} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      </div>
                      <input
                        type="text"
                        placeholder="Name on card"
                        value={form.cardName}
                        onChange={set('cardName')}
                        className={inputCls}
                        required
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="MM / YY"
                          value={form.expiry}
                          onChange={e => {
                            const v = e.target.value.replace(/\D/g, '').slice(0, 4);
                            const formatted = v.length > 2 ? `${v.slice(0, 2)} / ${v.slice(2)}` : v;
                            setForm(f => ({ ...f, expiry: formatted }));
                          }}
                          className={inputCls}
                          required
                          maxLength={7}
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          value={form.cvv}
                          onChange={e => setForm(f => ({ ...f, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                          className={inputCls}
                          required
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-background border border-border rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-border">
                      <h2 className="font-serif text-xl">Billing Address</h2>
                    </div>
                    <label
                      className={`flex items-center gap-3 px-5 py-4 cursor-pointer border-b border-border transition-colors ${form.billingOption === 'same' ? 'bg-secondary/50' : 'hover:bg-secondary/30'}`}
                      onClick={() => setForm(f => ({ ...f, billingOption: 'same' }))}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${form.billingOption === 'same' ? 'border-foreground' : 'border-border'}`}>
                        {form.billingOption === 'same' && <div className="w-2 h-2 rounded-full bg-foreground" />}
                      </div>
                      <span className="text-sm">Same as shipping address</span>
                    </label>
                    <label
                      className={`flex items-center gap-3 px-5 py-4 cursor-pointer transition-colors ${form.billingOption === 'different' ? 'bg-secondary/50' : 'hover:bg-secondary/30'}`}
                      onClick={() => setForm(f => ({ ...f, billingOption: 'different' }))}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${form.billingOption === 'different' ? 'border-foreground' : 'border-border'}`}>
                        {form.billingOption === 'different' && <div className="w-2 h-2 rounded-full bg-foreground" />}
                      </div>
                      <span className="text-sm">Use a different billing address</span>
                    </label>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <button type="button" onClick={() => setStep(2)} className="flex items-center gap-1 text-[11px] uppercase tracking-widest hover:opacity-70 transition-opacity">
                      <ChevronRight size={14} className="rotate-180" /> Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-4 text-[11px] uppercase tracking-[0.15em] font-medium text-white rounded-xl hover:opacity-90 transition-opacity"
                      style={{ background: '#1A1A1A' }}
                    >
                      Pay {formatINR(Math.round(total))}
                    </button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5">
                    <Lock size={11} strokeWidth={1.5} />
                    Your payment information is encrypted and secure.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-2/5 order-first lg:order-last">
            <div className="lg:sticky lg:top-24 bg-background border border-border rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-border">
                <h3 className="font-serif text-xl">Order Summary</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
              </div>

              {/* Items */}
              <div className="px-6 py-5 space-y-5 max-h-[320px] overflow-y-auto border-b border-border">
                {items.map(item => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                    <div className="w-16 h-20 bg-secondary rounded-xl flex-shrink-0 relative overflow-hidden">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-foreground text-background text-[10px] rounded-full flex items-center justify-center font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <p className="font-serif text-sm leading-tight truncate">{item.product.name}</p>
                        <p className="text-sm font-medium flex-shrink-0">{formatINR((item.product.salePrice || item.product.price) * item.quantity)}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.metal || item.product.metal}{item.size ? ` / Size ${item.size}` : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Discount code */}
              <div className="px-6 py-4 border-b border-border">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Discount code"
                    className="flex-1 border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground bg-transparent"
                  />
                  <button type="button" className="px-4 py-2.5 border border-border rounded-lg text-[11px] uppercase tracking-widest font-medium hover:bg-secondary transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="px-6 py-5 space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0
                      ? <span className="text-foreground">Free</span>
                      : formatINR(shippingCost)
                    }
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>GST (3%)</span>
                  <span>{formatINR(Math.round(tax))}</span>
                </div>

                <div className="border-t border-border pt-4 flex justify-between items-center">
                  <span className="font-medium">Total</span>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground mr-1.5">INR</span>
                    <span className="text-2xl font-serif">{formatINR(Math.round(total))}</span>
                  </div>
                </div>
              </div>

              {/* Free shipping notice */}
              {subtotal < FREE_SHIPPING_THRESHOLD && (
                <div className="px-6 pb-5">
                  <div className="bg-secondary rounded-xl p-3 text-xs text-muted-foreground flex items-center gap-2">
                    <Truck size={14} strokeWidth={1.5} className="flex-shrink-0" />
                    Add {formatINR(FREE_SHIPPING_THRESHOLD - subtotal)} more for free standard shipping
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
