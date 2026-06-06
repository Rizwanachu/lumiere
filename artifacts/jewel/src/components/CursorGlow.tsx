import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };
    const hideCursor = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseleave', hideCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseleave', hideCursor);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{ x: x, y: y, translateX: '-50%', translateY: '-50%' }}
      className="fixed pointer-events-none z-[9999] hidden md:block"
    >
      <div
        className="w-48 h-48 rounded-full opacity-[0.06]"
        style={{
          background: 'radial-gradient(circle, #C9A96E 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
    </motion.div>
  );
}
