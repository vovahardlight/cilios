import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MoveHorizontal, ZoomIn, ShieldCheck } from 'lucide-react';
import { content, type Lang } from '../translations';

interface Props {
  lang: Lang;
  onSelectCase: (effectName: string) => void;
}

export const BeforeAfter: React.FC<Props> = ({ lang, onSelectCase }) => {
  const t = content[lang].slider;
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState(false);
  const [zoomMode, setZoomMode] = useState(false);
  const [mouseCoord, setMouseCoord] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  // В Vite файлы из папки public вызываются прямо от корня "/"
  const eyeBefore = "/grok-image-b269b255-7b01-464e-b918-b72d29f639d0.jpg";
  const eyeAfter = "/grok-image-9f5b9f4b-7ed3-4a95-87d0-53dff3a9a780.jpg";

  const handleMove = useCallback((clientX: number, clientY?: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);

    if (clientY !== undefined) {
      const y = clientY - rect.top;
      setMouseCoord({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      });
    }
  }, []);

  // Расчет плавной прозрачности плашек при приближении ползунка
  // При сдвиге вправо (>70%) плавно исчезает "Signature Set"
  // При сдвиге влево (<30%) плавно исчезает "Natural Lashes"
  const beforeOpacity = Math.min(1, Math.max(0, (sliderPos - 12) / 18));
  const afterOpacity = Math.min(1, Math.max(0, (88 - sliderPos) / 18));

  return (
    <section id="results" className="relative py-28 bg-obsidian-900 text-cream-50 overflow-hidden z-10">
      
      {/* Мягкое фоновое золотое свечение */}
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

          {/* Переключатель режима 2x Zoom */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setZoomMode(!zoomMode)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold border transition ${
                zoomMode 
                  ? 'bg-gold-500 text-obsidian-950 border-gold-400 shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
                  : 'bg-obsidian-850 text-cream-200 border-white/10 hover:border-gold-500/50'
              }`}
            >
              <ZoomIn className="w-4 h-4" />
              {zoomMode ? t.zoomActive : t.zoomInactive}
            </button>
          </div>
        </div>

        {/* Интерактивный визор */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={(e) => {
            if (isDragging || zoomMode) handleMove(e.clientX, e.clientY);
          }}
          onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
          className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-3xl overflow-hidden select-none cursor-ew-resize border border-gold-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-obsidian-950"
        >
          {/* 1. Слой «ПОСЛЕ» (С ресницами) - z-0 */}
          <div 
            className="absolute inset-0 w-full h-full transition-transform duration-200"
            style={{
              transform: zoomMode ? `scale(1.8) translate(${50 - mouseCoord.x}%, ${50 - mouseCoord.y}%)` : 'none',
              transformOrigin: `${mouseCoord.x}% ${mouseCoord.y}%`,
            }}
          >
            <img
              src={eyeAfter}
              alt="После наращивания"
              className="w-full h-full object-cover object-center filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Плашка «ПОСЛЕ» (Signature Set) - теперь с плавным исчезновением и z-10 */}
          <div 
            className="absolute top-6 right-6 z-10 bg-obsidian-950/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-gold-500/30 text-[11px] font-semibold tracking-widest text-gold-300 uppercase pointer-events-none transition-opacity duration-150"
            style={{ opacity: afterOpacity }}
          >
            {t.after}
          </div>

          {/* 2. Слой «ДО» (Натуральный без ресниц, обрезается ползунком) - z-20 */}
          <div
            className="absolute inset-0 overflow-hidden z-20"
            style={{ 
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
              transition: isDragging ? 'none' : 'clip-path 0.1s ease-out'
            }}
          >
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                transform: zoomMode ? `scale(1.8) translate(${50 - mouseCoord.x}%, ${50 - mouseCoord.y}%)` : 'none',
                transformOrigin: `${mouseCoord.x}% ${mouseCoord.y}%`,
              }}
            >
              <img
                src={eyeBefore}
                alt="До наращивания"
                className="w-full h-full object-cover object-center filter grayscale-[20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Плашка «ДО» (Natural Lashes) - с плавным исчезновением */}
            <div 
              className="absolute top-6 left-6 z-20 bg-obsidian-950/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[11px] font-semibold tracking-widest text-cream-200 uppercase pointer-events-none transition-opacity duration-150"
              style={{ opacity: beforeOpacity }}
            >
              {t.before}
            </div>
          </div>

          {/* 3. Золотая лазерная линия-разделитель - z-30 (всегда поверх всего) */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-600 shadow-[0_0_15px_#D4AF37] pointer-events-none z-30"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-obsidian-950 border border-gold-400 text-gold-400 shadow-[0_0_25px_rgba(212,175,55,0.6)] flex items-center justify-center">
              <MoveHorizontal className="w-5 h-5 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Панель гарантии чистоты работы */}
        <div className="mt-8 p-6 rounded-2xl bg-obsidian-850/80 border border-gold-500/20 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-semibold text-cream-100">{t.guaranteeTitle}</div>
              <div className="text-xs text-cream-200/60 mt-0.5">{t.guaranteeDesc}</div>
            </div>
          </div>

          <button
            onClick={() => onSelectCase('Efecto Mojado Signature')}
            className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-obsidian-950 font-semibold rounded-full text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-95 shrink-0"
          >
            {t.ctaBtn}
          </button>
        </div>

      </div>
    </section>
  );
};