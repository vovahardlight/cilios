import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MoveHorizontal, ShieldCheck } from 'lucide-react';
import { content, type Lang } from '../translations';

interface Props {
  lang: Lang;
  onSelectCase: (effectName: string) => void;
}

export const BeforeAfter: React.FC<Props> = ({ lang, onSelectCase }) => {
  const t = content[lang].slider;
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const eyeBefore = "/grok-image-b269b255-7b01-464e-b918-b72d29f639d0.jpg";
  const eyeAfter = "/grok-image-9f5b9f4b-7ed3-4a95-87d0-53dff3a9a780.jpg";

  // Мгновенный расчет позиции без задержек и лагов
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  // Фиксация захвата указателя
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  // Мягкое угасание текста у краев
  const beforeOpacity = Math.min(1, Math.max(0, (sliderPos - 10) / 18));
  const afterOpacity = Math.min(1, Math.max(0, (90 - sliderPos) / 18));

  return (
    <section id="results" className="relative py-28 bg-obsidian-900 text-cream-50 overflow-hidden z-10">
      
      {/* Мягкое фоновое свечение */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Заголовок */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-obsidian-850 border border-gold-500/30 text-gold-400 text-xs uppercase tracking-widest font-medium mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t.tag} · 1:1 Macro Studio
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-serif text-cream-100 tracking-tight">
            {t.title}
          </h2>
          
          <p className="mt-4 text-cream-200/70 text-sm md:text-base font-light">
            {t.subtitle}
          </p>
        </div>

        {/* СТАБИЛИЗИРОВАННЫЙ ИНТЕРАКТИВНЫЙ ВИЗОР (РАДИУС rounded-[20px]) */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          data-cursor="drag"
          data-cursor-text={lang === 'es' ? 'DESLIZAR' : 'DRAG'}
          className="gsap-ba-container relative w-full aspect-[4/3] md:aspect-[16/9] rounded-[20px] overflow-hidden select-none cursor-ew-resize border border-gold-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-obsidian-950 touch-none"
          style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
        >
          {/* Слой «ПОСЛЕ» (С ресницами) - z-0 */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={eyeAfter}
              alt="Después"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              className="w-full h-full object-cover object-center filter contrast-105 pointer-events-none select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Плашка «ПОСЛЕ» (Signature Set) */}
          <div 
            className="absolute top-6 right-6 z-10 bg-obsidian-950/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-gold-500/30 text-[11px] font-semibold tracking-widest text-gold-300 uppercase pointer-events-none transition-opacity duration-150"
            style={{ opacity: afterOpacity }}
          >
            {t.after}
          </div>

          {/* Слой «ДО» (Натуральный без ресниц) - z-20 */}
          <div
            className="absolute inset-0 overflow-hidden z-20 will-change-[clip-path]"
            style={{ 
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
            }}
          >
            <div className="absolute inset-0 w-full h-full">
              <img
                src={eyeBefore}
                alt="Antes"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                className="w-full h-full object-cover object-center filter grayscale-[20%] pointer-events-none select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Плашка «ДО» (Natural Lashes) */}
            <div 
              className="absolute top-6 left-6 z-20 bg-obsidian-950/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[11px] font-semibold tracking-widest text-cream-200 uppercase pointer-events-none transition-opacity duration-150"
              style={{ opacity: beforeOpacity }}
            >
              {t.before}
            </div>
          </div>

          {/* Золотая лазерная линия-разделитель - z-30 */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-600 shadow-[0_0_7px_rgba(212,175,55,0.55)] pointer-events-none z-30 will-change-[left]"
            style={{ left: `${sliderPos}%` }}
          >
            <div 
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-obsidian-950 border border-gold-400 text-gold-400 shadow-[0_0_12px_rgba(212,175,55,0.32)] flex items-center justify-center transition-transform ${isDragging ? 'scale-110' : ''}`}
            >
              <MoveHorizontal className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* ПАНЕЛЬ ГАРАНТИИ И КНОПКА — СТРОГАЯ СИММЕТРИЯ */}
        <div className="gsap-ba-bar mt-8 p-5 sm:p-6 md:px-8 md:py-5 rounded-[20px] bg-obsidian-850/70 border border-gold-500/20 shadow-[0_0_12px_rgba(212,175,55,0.12)] backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-8">
          
          {/* Левая часть: Иконка + Сбалансированный текст */}
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-11 h-11 rounded-full bg-gold-500/10 border border-gold-500/25 flex items-center justify-center text-gold-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-sm md:text-[15px] font-medium text-cream-100 tracking-tight leading-snug">
                {t.guaranteeTitle}
              </div>
              <div className="text-xs text-cream-200/55 mt-0.5 leading-relaxed font-light">
                {t.guaranteeDesc}
              </div>
            </div>
          </div>

          {/* Правая часть: Аккуратная золотая кнопка с ровной высотой */}
          <button
            onClick={() => onSelectCase('Efecto Mojado Signature')}
            className="w-full md:w-auto px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-xs uppercase tracking-[0.16em] font-bold whitespace-nowrap transition-all duration-300 shadow-[0_0_14px_rgba(212,175,55,0.18)] active:scale-95 shrink-0 cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>{t.ctaBtn}</span>
            <span className="group-hover:translate-x-0.5 transition-transform duration-300 font-normal">→</span>
          </button>

        </div>

      </div>
    </section>
  );
};