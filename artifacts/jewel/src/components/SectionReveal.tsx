import React from 'react';
import { motion } from 'framer-motion';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'scale' | 'none';
  duration?: number;
  once?: boolean;
}

const variants = {
  up: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  none: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export function SectionReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.8,
  once = true,
}: SectionRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      variants={variants[direction]}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerRevealProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
  itemClassName?: string;
  direction?: 'up' | 'left' | 'right' | 'scale' | 'none';
}

export function StaggerReveal({
  children,
  className = '',
  staggerDelay = 0.1,
  itemClassName = '',
  direction = 'up',
}: StaggerRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div
          key={i}
          variants={variants[direction]}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className={itemClassName}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
