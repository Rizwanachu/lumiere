import React, { useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import { useCart } from '@/store/useCart';

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  const subtotal = items.reduce((acc, item) => {
    const price = item.product.salePrice || item.product.price;
    return acc + price * item.quantity;
  }, 0);
  
  const shipping = subtotal > 150 ? 0 : 15;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    setIsComplete(true);
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  if (items.length === 0 && !isComplete) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-20">
        <h1 className="font-serif text-3xl mb-4">Your bag is empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your bag yet.</p>
        <Link href="/shop">
          <button className="bg-foreground text-background uppercase tracking-[0.12em] text-[11px] px-8 py-3 font-medium">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-20">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
          className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-8"
        >
          <Check size={40} strokeWidth={2} />
        </motion.div>
        <h1 className="font-serif text-4xl mb-4">Thank you for your order</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          We've received your order and will send a confirmation email with tracking details shortly. Order #LM-{Math.floor(Math.random() * 100000)}
        </p>
        <Link href="/shop">
          <button className="bg-foreground text-background uppercase tracking-[0.12em] text-[11px] px-8 py-3 font-medium">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  const inputClasses = "w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground";

  return (
    <div className="pt-24 pb-24 min-h-screen bg-card">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <Link href="/" className="font-serif text-3xl tracking-widest text-center block mb-12">
          LUMIÈRE
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left: Form */}
          <div className="w-full lg:w-3/5">
            {/* Stepper */}
            <div className="flex items-center text-[10px] uppercase tracking-widest font-medium mb-10 overflow-x-auto pb-2">
              <span className={`${step >= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>Information</span>
              <ChevronRight size={14} className="mx-3 text-muted-foreground flex-shrink-0" />
              <span className={`${step >= 2 ? 'text-foreground' : 'text-muted-foreground'}`}>Shipping</span>
              <ChevronRight size={14} className="mx-3 text-muted-foreground flex-shrink-0" />
              <span className={`${step >= 3 ? 'text-foreground' : 'text-muted-foreground'}`}>Payment</span>
            </div>

            <form onSubmit={step === 3 ? handleComplete : (e) => { e.preventDefault(); setStep(step + 1); }}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="font-serif text-2xl mb-4">Contact Information</h2>
                      <input type="email" placeholder="Email" className={inputClasses} required />
                    </div>
                    
                    <div>
                      <h2 className="font-serif text-2xl mb-4 mt-8">Shipping Address</h2>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <input type="text" placeholder="First Name" className={inputClasses} required />
                          <input type="text" placeholder="Last Name" className={inputClasses} required />
                        </div>
                        <input type="text" placeholder="Address" className={inputClasses} required />
                        <input type="text" placeholder="Apartment, suite, etc. (optional)" className={inputClasses} />
                        <div className="flex gap-4">
                          <input type="text" placeholder="City" className={inputClasses} required />
                          <select className={inputClasses} required defaultValue="">
                            <option value="" disabled>State / Province</option>
                            <option value="ca">California</option>
                            <option value="ny">New York</option>
                            <option value="tx">Texas</option>
                          </select>
                          <input type="text" placeholder="ZIP / Postal Code" className={inputClasses} required />
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="w-full md:w-auto bg-foreground text-background uppercase tracking-[0.12em] text-[11px] px-8 py-4 font-medium mt-8 hover:opacity-90">
                      Continue to Shipping
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="border border-border p-4 text-sm space-y-4 rounded-sm bg-background">
                      <div className="flex justify-between items-center pb-4 border-b border-border">
                        <div className="text-muted-foreground w-20">Contact</div>
                        <div className="flex-1">customer@example.com</div>
                        <button type="button" onClick={() => setStep(1)} className="text-[10px] uppercase tracking-widest underline">Change</button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-muted-foreground w-20">Ship to</div>
                        <div className="flex-1">123 Main St, New York NY 10001</div>
                        <button type="button" onClick={() => setStep(1)} className="text-[10px] uppercase tracking-widest underline">Change</button>
                      </div>
                    </div>

                    <h2 className="font-serif text-2xl mb-4 mt-8">Shipping Method</h2>
                    <div className="border border-border rounded-sm bg-background">
                      <label className="flex items-center justify-between p-4 cursor-pointer border-b border-border">
                        <div className="flex items-center gap-4">
                          <input type="radio" name="shipping" defaultChecked className="accent-foreground" />
                          <span className="text-sm font-medium">Standard Shipping (3-5 business days)</span>
                        </div>
                        <span className="text-sm">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                      </label>
                      <label className="flex items-center justify-between p-4 cursor-pointer">
                        <div className="flex items-center gap-4">
                          <input type="radio" name="shipping" className="accent-foreground" />
                          <span className="text-sm font-medium">Express Shipping (1-2 business days)</span>
                        </div>
                        <span className="text-sm">$25.00</span>
                      </label>
                    </div>

                    <div className="flex items-center gap-4 mt-8">
                      <button type="button" onClick={() => setStep(1)} className="text-[11px] uppercase tracking-widest hover:underline flex items-center">
                        <ChevronRight size={14} className="rotate-180 mr-1" /> Return
                      </button>
                      <button type="submit" className="flex-1 md:flex-none bg-foreground text-background uppercase tracking-[0.12em] text-[11px] px-8 py-4 font-medium hover:opacity-90">
                        Continue to Payment
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="font-serif text-2xl mb-4">Payment</h2>
                    <p className="text-sm text-muted-foreground mb-4">All transactions are secure and encrypted.</p>
                    
                    <div className="border border-border p-6 rounded-sm bg-background space-y-4">
                      <div className="flex gap-4">
                        <input type="text" placeholder="Card number" className={inputClasses} required />
                      </div>
                      <input type="text" placeholder="Name on card" className={inputClasses} required />
                      <div className="flex gap-4">
                        <input type="text" placeholder="Expiration date (MM/YY)" className={inputClasses} required />
                        <input type="text" placeholder="Security code" className={inputClasses} required />
                      </div>
                    </div>

                    <h2 className="font-serif text-2xl mb-4 mt-8">Billing Address</h2>
                    <div className="border border-border rounded-sm bg-background">
                      <label className="flex items-center gap-4 p-4 cursor-pointer border-b border-border">
                        <input type="radio" name="billing" defaultChecked className="accent-foreground" />
                        <span className="text-sm">Same as shipping address</span>
                      </label>
                      <label className="flex items-center gap-4 p-4 cursor-pointer">
                        <input type="radio" name="billing" className="accent-foreground" />
                        <span className="text-sm">Use a different billing address</span>
                      </label>
                    </div>

                    <div className="flex items-center gap-4 mt-8">
                      <button type="button" onClick={() => setStep(2)} className="text-[11px] uppercase tracking-widest hover:underline flex items-center">
                        <ChevronRight size={14} className="rotate-180 mr-1" /> Return
                      </button>
                      <button type="submit" className="flex-1 md:flex-none bg-foreground text-background uppercase tracking-[0.12em] text-[11px] px-8 py-4 font-medium hover:opacity-90">
                        Pay ${total.toFixed(2)}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-2/5">
            <div className="sticky top-28 bg-background border border-border p-6 rounded-sm">
              <h3 className="font-serif text-xl mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                    <div className="w-16 h-20 bg-secondary flex-shrink-0 relative">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-foreground text-background text-[10px] rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center text-sm">
                      <div className="flex justify-between">
                        <span className="font-serif">{item.product.name}</span>
                        <span className="font-medium">${(item.product.salePrice || item.product.price) * item.quantity}</span>
                      </div>
                      <span className="text-muted-foreground text-xs">{item.product.metal} {item.size && `/ Size ${item.size}`}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-border pt-6 space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Taxes</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t border-border mt-6 pt-6 flex justify-between items-end">
                <span className="text-base uppercase tracking-widest">Total</span>
                <div className="text-right">
                  <span className="text-xs text-muted-foreground mr-2">USD</span>
                  <span className="text-2xl font-serif">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
