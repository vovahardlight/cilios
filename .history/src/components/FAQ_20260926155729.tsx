import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { content, type Lang } from '../translations';

interface Props {
  lang: Lang;
}

export const FAQ: React.FC<Props> = ({ lang }) => {
  const t = content[lang].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-28 bg-obsidian-950 border-t border-white/5 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-obsidian-850 border border-gold-500/20 text-gold-400 text-xs uppercase tracking-widest font-semibold mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            {t.tag}
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-cream-100 tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-cream-200/60 text-sm md:text-base font-light">
            {t.subtitle}
          </p>
        </div>

        {/* Аккордеон с золотой индикацией */}
        <div className="space-y-4">
          {t.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'bg-obsidian-900 border-gold-500/40 shadow-[0_0_25px_rgba(212,175,55,0.08)]' 
                    : 'bg-obsidian-900/50 border-white/5 hover:border-white/15'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 transition"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg sm:text-xl text-cream-100 font-normal">
                    {item.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                    isOpen 
                      ? 'bg-gold-500 text-obsidian-950 border-gold-400 rotate-180' 
                      : 'bg-obsidian-850 text-cream-200/60 border-white/10'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-xs sm:text-sm text-cream-200/70 font-light leading-relaxed border-t border-white/5 pt-4">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};