import React from 'react';

export function Marquee({ text }: { text: string }) {
  return (
    <div className="w-full overflow-hidden bg-background text-foreground py-2 border-b border-border flex items-center">
      <div 
        className="whitespace-nowrap flex text-[11px] uppercase tracking-[0.15em]"
        style={{ animation: 'marquee 20s linear infinite' }}
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-4">{text}</span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
