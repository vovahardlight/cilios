import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MoveHorizontal, Clock, Eye, Layers } from 'lucide-react';
import { content, Lang } from '../translations';

interface Props {
  lang: Lang;
  onSelectCase: (effectName: string) => void;
}

export const BeforeAfter: React.FC<Props> = ({ lang, onSelectCase }) => {
  const t = content[lang].slider;
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [activeCase, setActiveCase] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Качественные макро-изображения для кейсов
  const casesData = [
    {
      ...t.cases[0],
      beforeImg: 'https://images.unsplash.com/photo-1512290900672-1f5be188d9c2?auto=format&fit=crop&w=1200&q=80',
      afterImg: 'https://images.unsplash.com/photo-1583001809873-a128495da465?auto=format&fit=crop&w=1200&q=80',
    },
    {
      ...t.cases[1],
      beforeImg: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80',
      afterImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
    },
    {
      ...t.cases[2],
      beforeImg: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
      afterImg: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    }
  ];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="results" className="py-24 bg-sand-100 text-noir-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Заголовок блока */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-200/60 text-xs uppercase tracking-widest font-medium text-noir-800 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
            {t.tag}
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-noir-900 tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-noir-700 text-sm md:text-base">
            {t.subtitle}
          </p>
        </div>

        {/* Переключатель кейсов */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
          {casesData.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCase(idx)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                activeCase === idx
                  ? 'bg-noir-900 text-sand-50 shadow-md'
                  : 'bg-sand-50/80 text-noir-700 hover:bg-sand-200'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Основной интерактивный контейнер с ползунком */}
        <div 
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden select-none cursor-ew-resize shadow-2xl bg-noir-800 touch-pan-y"
        >
          {/* Слой ПОСЛЕ (Фон) */}
          <img
            src={casesData[activeCase].afterImg}
            alt="После наращивания"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Плашка ПОСЛЕ */}
          <div className="absolute top-4 right-4 z-10 bg-noir-900/60 backdrop-blur-md px-3 py-1 rounded text-xs font-semibold tracking-wider text-sand-50 uppercase pointer-events-none">
            {t.after}
          </div>

          {/* Слой ДО (Обрезается через clip-path) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
          >
            <img
              src={casesData[activeCase].beforeImg}
              alt="До процедуры"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Плашка ДО */}
            <div className="absolute top-4 left-4 z-10 bg-noir-900/60 backdrop-blur-md px-3 py-1 rounded text-xs font-semibold tracking-wider text-sand-50 uppercase pointer-events-none">
              {t.before}
            </div>
          </div>

          {/* Сам ползунок / Разделитель */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-sand-50 shadow-lg pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-sand-50 text-noir-900 shadow-2xl flex items-center justify-center border-2 border-terracotta-500">
              <MoveHorizontal className="w-5 h-5 text-noir-800" />
            </div>
          </div>
        </div>

        {/* Мета-информация о выбранном эффекте */}
        <div className="mt-6 p-6 bg-sand-50 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 border border-sand-200">
          <div className="grid grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-terracotta-500" />
              <div>
                <div className="text-[10px] uppercase text-noir-700 tracking-wider">Curvatura</div>
                <div className="text-sm font-semibold text-noir-900">{casesData[activeCase].curve}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-terracotta-500" />
              <div>
                <div className="text-[10px] uppercase text-noir-700 tracking-wider">Grosor</div>
                <div className="text-sm font-semibold text-noir-900">{casesData[activeCase].thickness}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-terracotta-500" />
              <div>
                <div className="text-[10px] uppercase text-noir-700 tracking-wider">Tiempo</div>
                <div className="text-sm font-semibold text-noir-900">{casesData[activeCase].time}</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectCase(casesData[activeCase].name)}
            className="w-full md:w-auto px-6 py-3 bg-terracotta-500 hover:bg-terracotta-600 text-sand-50 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            {t.ctaBtn}
          </button>
        </div>

      </div>
    </section>
  );
};