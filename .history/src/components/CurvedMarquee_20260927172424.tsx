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

  const phrase = lang === 'es'
    ? '✦ BELLEZA NATURAL ✦ AUTONOMÍA 100% ✦ MADRID SALAMANCA ✦ RETENCIÓN DE 6 SEMANAS ✦ MIRADA BESPOKE '
    : '✦ NATURAL BEAUTY ✦ 100% AUTONOMY ✦ MADRID SALAMANCA ✦ 6-WEEK RETENTION ✦ BESPOKE LASHES ';

  const fullText = Array(8).fill(phrase).join('');

  useEffect(() => {
    const el = textPathRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    const loopDistance = 1600;

    const ctx = gsap.context(() => {
      // Базовое непрерывное движение
      const tween = gsap.fromTo(
        el,
        { attr: { startOffset: 0 } },
        {
          attr: { startOffset: -loopDistance },
          duration: 20, // Крейсерская спокойная скорость
          ease: 'none',
          repeat: -1,
        }
      );

      // ДИНАМИЧЕСКИЙ РАЗГОН ПО СКОРОСТИ СКРОЛЛА (G-FORCE ACCELERATION)
      ScrollTrigger.create({
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          if (velocity > 35) {
            // Ускоряем движение пропорционально скорости колеса (до 4x)
            const boost = 1 + Math.min(velocity / 300, 3.5);
            gsap.to(tween, {
              timeScale: boost,
              duration: 0.15,
              overwrite: 'auto',
              onComplete: () => {
                // Плавное торможение обратно к 1x скорости
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
          <path
            id="wavePath"
            d="M -1600,120 C -1200,20 -800,220 -400,120 C 0,20 400,220 800,120 C 1200,20 1600,220 2000,120 C 2400,20 2800,220 3200,120"
            fill="none"
          />
          <path
            id="topRail"
            d="M -1600,85 C -1200,-15 -800,185 -400,85 C 0,-15 400,185 800,85 C 1200,-15 1600,185 2000,85 C 2400,-15 2800,185 3200,85"
            fill="none"
          />
          <path
            id="bottomRail"
            d="M -1600,155 C -1200,55 -800,255 -400,155 C 0,55 400,255 800,155 C 1200,55 1600,255 2000,155 C 2400,55 2800,255 3200,155"
            fill="none"
          />
        </defs>

        <use
          href="#topRail"
          stroke="rgba(212, 175, 55, 0.2)"
          strokeWidth="1"
          strokeDasharray="6 8"
        />

        <use
          href="#bottomRail"
          stroke="rgba(212, 175, 55, 0.2)"
          strokeWidth="1"
          strokeDasharray="6 8"
        />

        <text className="font-serif text-3xl md:text-4xl uppercase tracking-[0.25em] font-light">
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
            {fullText}
          </textPath>
        </text>
      </svg>
    </div>
  );
};