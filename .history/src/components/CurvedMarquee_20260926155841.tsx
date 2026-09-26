import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  text: string;
}

export const Marquee: React.FC<Props> = ({ text }) => {
  const repeatedText = Array(6).fill(text).join(' ');

  return (
    <div className="relative w-full overflow-hidden py-8 bg-obsidian-900/40 border-y border-white/5 select-none z-10">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ ease: 'linear', duration: 35, repeat: Infinity }}
        className="flex whitespace-nowrap text-3xl sm:text-5xl md:text-6xl font-serif tracking-[0.15em] uppercase font-light"
      >
        <span 
          className="text-transparent"
          style={{ WebkitTextStroke: '1px rgba(212, 175, 55, 0.35)' }}
        >
          {repeatedText}
        </span>
      </motion.div>
    </div>
  );
};