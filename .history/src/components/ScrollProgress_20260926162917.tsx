import React from 'react';
import { motion, useScroll } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-gold-600 via-gold-300 to-gold-500 shadow-[0_1px_12px_rgba(212,175,55,0.95),0_0_4px_rgba(255,245,200,0.8)] z-50 pointer-events-none"
    />
  );
};