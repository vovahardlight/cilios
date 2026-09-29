import React from 'react';
import { motion, useScroll } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-gold-600 via-gold-300 to-gold-500 shadow-[0_0_6px_rgba(212,175,55,0.35)] z-50 pointer-events-none"
    />
  );
};