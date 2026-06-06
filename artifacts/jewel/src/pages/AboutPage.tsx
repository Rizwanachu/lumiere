import React, { useEffect } from 'react';
import { SectionReveal } from '@/components/SectionReveal';
import { proxyImg } from '@/lib/imgProxy';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* Hero */}
      <section className="container mx-auto px-4 md:px-8 mb-24">
        <div className="max-w-3xl mx-auto text-center">
          <SectionReveal>
            <h1 className="font-serif text-5xl md:text-6xl mb-6 leading-tight">Quiet Luxury, <br/>Loud Intentions.</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Lumière was born from a simple desire: to create fine jewelry that feels as good as it looks. 
              Pieces that don't need a special occasion to see the light of day.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Image Full Bleed */}
      <section className="w-full h-[60vh] md:h-[80vh] mb-24">
        <img 
          src={proxyImg("https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=2000&q=80")}
          alt="Jewelry on model" 
          className="w-full h-full object-cover"
        />
      </section>

      {/* Split Content */}
      <section className="container mx-auto px-4 md:px-8 mb-24">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-center">
          <div className="w-full md:w-1/2">
            <SectionReveal>
              <h2 className="font-serif text-4xl mb-6">Crafted With Intention</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Every piece of Lumière jewelry is designed in our studio and crafted by master jewelers 
                  using only solid 14k and 18k gold, platinum, and responsibly sourced gemstones.
                </p>
                <p>
                  We reject the traditional markup model. By working directly with our manufacturing partners, 
                  we're able to offer heirloom-quality materials without the traditional luxury price tag.
                </p>
                <p>
                  Our aesthetic is rooted in restraint. We believe that true luxury whispers—it doesn't shout. 
                  It's the weight of a solid gold band, the perfect drape of a chain, the subtle glow of a 
                  step-cut diamond.
                </p>
              </div>
            </SectionReveal>
          </div>
          <div className="w-full md:w-1/2">
            <SectionReveal>
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src={proxyImg("https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=600&q=80")}
                  alt="Detail" 
                  className="w-full aspect-[4/5] object-cover"
                />
                <img 
                  src={proxyImg("https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80")}
                  alt="Detail" 
                  className="w-full aspect-[4/5] object-cover mt-8"
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-card py-24">
        <div className="container mx-auto px-4 md:px-8">
          <SectionReveal>
            <h2 className="font-serif text-3xl text-center mb-16">Our Commitments</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-5xl mx-auto">
              <div>
                <div className="w-12 h-12 border border-foreground mx-auto flex items-center justify-center mb-6 rounded-full">
                  <span className="font-serif text-xl">1</span>
                </div>
                <h3 className="font-medium uppercase tracking-widest text-[11px] mb-4">Solid Materials</h3>
                <p className="text-sm text-muted-foreground">No vermeil, no plating. Only solid gold and platinum that won't tarnish or turn your skin green.</p>
              </div>
              <div>
                <div className="w-12 h-12 border border-foreground mx-auto flex items-center justify-center mb-6 rounded-full">
                  <span className="font-serif text-xl">2</span>
                </div>
                <h3 className="font-medium uppercase tracking-widest text-[11px] mb-4">Ethical Sourcing</h3>
                <p className="text-sm text-muted-foreground">We exclusively use recycled gold and conflict-free, traceably sourced natural and lab-grown diamonds.</p>
              </div>
              <div>
                <div className="w-12 h-12 border border-foreground mx-auto flex items-center justify-center mb-6 rounded-full">
                  <span className="font-serif text-xl">3</span>
                </div>
                <h3 className="font-medium uppercase tracking-widest text-[11px] mb-4">Lifetime Warranty</h3>
                <p className="text-sm text-muted-foreground">We stand behind our craftsmanship. Every piece is backed by our comprehensive lifetime warranty.</p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
