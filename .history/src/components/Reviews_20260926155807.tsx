import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { content, type Lang } from '../translations';

interface Props {
  lang: Lang;
}

export const Reviews: React.FC<Props> = ({ lang }) => {
  const t = content[lang].reviews;

  return (
    <section id="reviews" className="py-28 bg-obsidian-900/60 border-t border-white/5 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Заголовок с бейджем Google 5.0 */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs uppercase tracking-widest font-semibold mb-4">
            <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
            {t.tag}
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-cream-100 tracking-tight">
            {t.title}
          </h2>
          
          <div className="mt-4 inline-flex items-center gap-2 text-xs text-cream-200/70 bg-obsidian-850 border border-white/10 px-4 py-1.5 rounded-full">
            <span className="flex text-gold-400">★★★★★</span>
            <span>{t.googleBadge}</span>
          </div>
        </div>

        {/* Сетка цитат в стиле глянца */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="p-8 rounded-3xl bg-obsidian-850/80 border border-white/5 hover:border-gold-500/30 transition-all duration-500 flex flex-col justify-between shadow-xl"
            >
              <div>
                <Quote className="w-8 h-8 text-gold-400/30 mb-6" />
                <p className="text-sm md:text-base text-cream-200/85 font-serif italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest font-bold text-cream-100 flex items-center gap-1.5">
                    <span>{item.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                  </div>
                  <div className="text-[11px] text-cream-200/50 mt-0.5">{item.location}</div>
                </div>
                <div className="text-xs text-gold-400 font-serif">5.0 ★</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};