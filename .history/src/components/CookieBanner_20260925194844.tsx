import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';
import { content, type Lang } from '../translations';

interface Props {
  lang: Lang;
  isLoading: boolean; // Ждем окончания анимации прелоадера
}

export const CookieBanner: React.FC<Props> = ({ lang, isLoading }) => {
  const [isVisible, setIsVisible] = useState(false);
  const t = content[lang].cookies;

  useEffect(() => {
    // Если сайт еще грузится — не показываем
    if (isLoading) return;

    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Показываем плавно через 1.5 секунды ПОСЛЕ открытия сайта
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleConsent = (type: 'all' | 'rejected') => {
    localStorage.setItem('cookie_consent', type);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          role="dialog"
          aria-label="Gestión de cookies"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          /* Позиционирование: компактно сбоку на десктопе, над нижней панелью на мобилке */
          className="fixed bottom-24 left-4 right-4 sm:right-auto sm:left-8 sm:bottom-8 sm:max-w-sm z-40 bg-[#141312] border border-gold-500/30 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.95)] text-cream-100"
        >
          {/* Верхняя строка с иконкой и статусом AEPD */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-gold-400 text-xs uppercase tracking-widest font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Privacidad AEPD</span>
            </div>
            <button
              onClick={() => handleConsent('rejected')}
              className="text-cream-200/50 hover:text-white transition p-1"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Текст без полупрозрачности для максимальной читаемости */}
          <p className="text-[12px] leading-relaxed text-cream-200/80 mb-4 font-light">
            {t.text}
          </p>

          {/* Кнопки одинакового веса (требование закона Испании) */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => handleConsent('rejected')}
              className="py-2.5 px-3 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 text-cream-200 text-xs font-medium border border-white/10 transition active:scale-95 text-center"
            >
              {t.reject}
            </button>
            <button
              onClick={() => handleConsent('all')}
              className="py-2.5 px-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-xs font-bold transition shadow-[0_0_15px_rgba(212,175,55,0.2)] active:scale-95 text-center"
            >
              {t.accept}
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};