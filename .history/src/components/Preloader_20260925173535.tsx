import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

export const Preloader: React.FC<Props> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsDone(true), 300);
          setTimeout(onComplete, 1200);
          return 100;
        }
        return prev + 2;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 bg-obsidian-950 flex flex-col items-center justify-center text-cream-50 overflow-hidden"
        >
          {/* Стилизованная анимация отрисовки глаза и ресниц */}
          <div className="relative w-48 h-32 flex items-center justify-center">
            <svg viewBox="0 0 200 120" className="w-full h-full stroke-gold-400 fill-none">
              {/* Верхнее веко */}
              <motion.path
                d="M 20,70 Q 100,10 180,70"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              {/* Нижнее веко */}
              <motion.path
                d="M 20,70 Q 100,110 180,70"
                strokeWidth="1.2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
              />
              {/* Растущие ресницы (анимация взмаха) */}
              {[
                "M 40,55 Q 35,30 25,25",
                "M 60,42 Q 58,15 50,8",
                "M 80,34 Q 80,5 75,-2",
                "M 100,30 Q 102,-2 105,-8",
                "M 120,33 Q 125,5 132,-2",
                "M 140,40 Q 148,15 160,8",
                "M 160,52 Q 172,30 185,25",
              ].map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                />
              ))}
            </svg>
          </div>

          {/* Бренд и счетчик процентов */}
          <div className="mt-8 text-center">
            <div className="text-[11px] uppercase tracking-[0.3em] text-gold-400 font-medium mb-2">
              Lash Atelier Madrid
            </div>
            <div className="font-serif text-3xl font-light text-cream-100 tracking-wider">
              {percent < 10 ? `0${percent}` : percent}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};