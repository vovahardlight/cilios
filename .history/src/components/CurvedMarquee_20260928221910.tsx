import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type Lang } from '../translations';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  lang: Lang;
}

export const CurvedMarquee: React.FC<Props> = ({ lang }) => {
  const textPathRef = useRef<SVGTextPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wavePathRef = useRef<SVGPathElement>(null);

  // Сбалансированная фраза для идеального шага волны
  const phrase = lang === 'es'
    ? '✦ BELLEZA NATURAL ✦ MADRID SALAMANCA ✦ BESPOKE LASHES '
    : '✦ NATURAL BEAUTY ✦ MADRID SALAMANCA ✦ BESPOKE LASHES ';

  // 6 одинаковых блоков для заполнения всей длины трассы
  const phrases = Array(6).fill(phrase);

  useEffect(() => {
    const textPath = textPathRef.current;
    const wavePath = wavePathRef.current;
    const container = containerRef.current;
    if (!textPath || !wavePath || !container) return;

    // 1. Вычисляем точную длину одного цикла волны вдоль дуги
    // Трасса состоит из 4 одинаковых циклов, поэтому длина 1 цикла = total / 4
    const totalPathLength = wavePath.getTotalLength();
    const cycleLength = totalPathLength / 4;

    // 2. Калибруем длину каждого блока текста ровно под длину волны (100% бесшовность)
    const tspans = textPath.querySelectorAll('tspan');
    tspans.forEach((tspan) => {
      tspan.setAttribute('textLength', `${cycleLength}`);
      tspan.setAttribute('lengthAdjust', 'spacing');
    });

    // 3. Бесшовный цикл GSAP ровно на один шаг цикла
    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        textPath,
        { attr: { startOffset: 0 } },
        {
          attr: { startOffset: -cycleLength },
          duration: 16, // Крейсерская плавная скорость
          ease: 'none',
          repeat: -1,   // Теперь переход на 100% незаметен
        }
      );

      // Динамический разгон при быстром скролле (G-Force)
      ScrollTrigger.create({
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          if (velocity > 35) {
            const boost = 1 + Math.min(velocity / 300, 3.5);
            gsap.to(tween, {
              timeScale: boost,
              duration: 0.15,
              overwrite: 'auto',
              onComplete: () => {
                gsap.to(tween, { timeScale: 1, duration: 1.4, ease: 'power2.out' });
              },
            });
          }
        },
      });
    });

    return () => ctx.revert();
  }, [lang]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-12 md:py-16 bg-obsidian-950/60 select-none z-10"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-gold-500/5 blur-3xl pointer-events-none" />

      <svg
        viewBox="0 0 1600 240"
        className="w-full h-auto overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* СИММЕТРИЧНАЯ 4-ЦИКЛОВАЯ ВОЛНА С ШАГОМ 1200px (ОТ -1800 ДО 3000) */}
          <path
            ref={wavePathRef}
            id="wavePath"
            d="M -1800,120 C -1600,30 -1400,30 -1200,120 C -1000,210 -800,210 -600,120 C -400,30 -200,30 0,120 C 200,210 400,210 600,120 C 800,30 1000,30 1200,120 C 1400,210 1600,210 1800,120 C 2000,30 2200,30 2400,120 C 2600,210 2800,210 3000,120"
            fill="none"
          />

          {/* Верхняя рельса (-35px) */}
          <path
            id="topRail"
            d="M -1800,85 C -1600,-5 -1400,-5 -1200,85 C -1000,175 -800,175 -600,85 C -400,-5 -200,-5 0,85 C 200,175 400,175 600,85 C 800,-5 1000,-5 1200,85 C 1400,175 1600,175 1800,85 C 2000,-5 2200,-5 2400,85 C 2600,175 2800,175 3000,85"
            fill="none"
          />

          {/* Нижняя рельса (+35px) */}
          <path
            id="bottomRail"
            d="M -1800,155 C -1600,65 -1400,65 -1200,155 C -1000,245 -800,245 -600,155 C -400,65 -200,65 0,155 C 200,245 400,245 600,155 C 800,65 1000,65 1200,155 C 1400,245 1600,245 1800,155 C 2000,65 2200,65 2400,155 C 2600,245 2800,245 3000,155"
            fill="none"
          />
        </defs>

        {/* 1. Верхняя золотая рельса с пунктиром */}
        <use
          href="#topRail"
          stroke="rgba(212, 175, 55, 0.2)"
          strokeWidth="1"
          strokeDasharray="6 8"
        />

        {/* 2. Нижняя золотая рельса с пунктиром */}
        <use
          href="#bottomRail"
          stroke="rgba(212, 175, 55, 0.2)"
          strokeWidth="1"
          strokeDasharray="6 8"
        />

        {/* 3. Бегущий непрерывный текст */}
        <text className="font-serif text-3xl md:text-4xl uppercase tracking-[0.22em] font-light">
          <textPath
            ref={textPathRef}
            href="#wavePath"
            startOffset="0"
            style={{
              fill: 'transparent',
              stroke: '#D4AF37',
              strokeWidth: '0.85px',
              letterSpacing: '0.22em',
            }}
          >
            {phrases.map((p, i) => (
              <tspan key={i}>{p}</tspan>
            ))}
          </textPath>
        </text>
      </svg>
    </div>
  );
};