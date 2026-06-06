import React, { useEffect, useState } from 'react';
import { SectionReveal } from '@/components/SectionReveal';
import { toast } from 'sonner';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Message sent successfully. We will get back to you shortly.');
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const inputClasses = "w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground rounded-xl";

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <SectionReveal>
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl lg:text-5xl mb-4">Get in Touch</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Whether you have a question about a piece, need sizing advice, or want to discuss a custom design, our team is here to help.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Form */}
            <div className="w-full lg:w-1/2">
              <h2 className="font-serif text-2xl mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className={inputClasses} required />
                  <input type="text" placeholder="Last Name" className={inputClasses} required />
                </div>
                <input type="email" placeholder="Email Address" className={inputClasses} required />
                <select className={inputClasses} required defaultValue="">
                  <option value="" disabled>Subject</option>
                  <option value="order">Order Inquiry</option>
                  <option value="product">Product Question</option>
                  <option value="custom">Custom Design</option>
                  <option value="other">Other</option>
                </select>
                <textarea 
                  placeholder="Your Message" 
                  rows={6} 
                  className={`${inputClasses} resize-none`} 
                  required 
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-foreground text-background uppercase tracking-[0.12em] text-[11px] px-8 py-4 font-medium hover:opacity-90 transition-opacity w-full sm:w-auto mt-4 disabled:opacity-50 rounded-xl"
                >
                  {isSubmitting ? 'Sending...' : 'Submit Message'}
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="w-full lg:w-1/2">
              <div className="space-y-12">
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.15em] font-medium mb-4">Customer Care</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    Available Monday to Friday, <br/>9:00 AM - 5:00 PM EST
                  </p>
                  <a href="mailto:care@lumierejewels.com" className="text-sm font-medium hover:underline block mb-1">
                    care@lumierejewels.com
                  </a>
                  <a href="tel:+18005550199" className="text-sm font-medium hover:underline block">
                    +1 (800) 555-0199
                  </a>
                </div>

                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.15em] font-medium mb-4">Flagship Atelier</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    124 Grand Street, Floor 3<br/>
                    New York, NY 10013<br/>
                    By appointment only
                  </p>
                  
                  {/* Fake Map */}
                  <div className="w-full h-48 bg-secondary border border-border rounded-xl flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80')] opacity-30 object-cover grayscale mix-blend-multiply" />
                    <span className="text-[10px] uppercase tracking-widest font-medium z-10 border-b border-foreground pb-1 group-hover:opacity-70 transition-opacity cursor-pointer">
                      View on Maps
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
