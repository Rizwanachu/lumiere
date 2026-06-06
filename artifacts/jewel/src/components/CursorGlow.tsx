import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const cursorX = useMotionValue(-300);
  const cursorY = useMotionValue(-300);

  const x = useSpring(cursorX, { damping: 28, stiffness: 180, mass: 0.6 });
  const y = useSpring(cursorY, { damping: 28, stiffness: 180, mass: 0.6 });

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 120);
      cursorY.set(e.clientY - 120);
      setMounted(true);
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-60 h-60 rounded-full pointer-events-none z-[9999] hidden md:block"
      style={{
        x,
        y,
        background: 'radial-gradient(circle, rgba(201,169,110,0.28) 0%, rgba(201,169,110,0.10) 35%, transparent 70%)',
        filter: 'blur(8px)',
      }}
    />
  );
}
