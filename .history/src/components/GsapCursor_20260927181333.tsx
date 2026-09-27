import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const GsapCursor: React.FC = () => {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const cursorText = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = cursorDot.current;
    const ring = cursorRing.current;
    const label = cursorText.current;
    if (!dot || !ring || !label) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });

    const ringX = gsap.quickTo(ring, 'x', { duration: 0.22, ease: 'power2.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.22, ease: 'power2.out' });

    const onMouseMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;

      // 1. НАВЕДЕНИЕ НА СЛАЙДЕР ДО/ПОСЛЕ (ТРАНСФОРМАЦИЯ В БЕЙДЖ "DESLIZAR")
      const dragTarget = target?.closest('[data-cursor="drag"]');
      if (dragTarget) {
        const textToDisplay = dragTarget.getAttribute('data-cursor-text') || 'DESLIZAR';
        label.textContent = textToDisplay;

        gsap.to(dot, { opacity: 0, duration: 0.2 });
        gsap.to(ring, {
          width: 82,
          height: 82,
          borderColor: 'rgba(212, 175, 55, 0.85)',
          backgroundColor: 'rgba(13, 13, 13, 0.85)',
          boxShadow: '0 0 25px rgba(212, 175, 55, 0.35)',
          backdropFilter: 'blur(8px)',
          duration: 0.3,
          ease: 'power3.out',
        });
        gsap.to(label, { opacity: 1, duration: 0.25, delay: 0.05 });
        return;
      }

      // 2. НАВЕДЕНИЕ НА ОБЫЧНЫЕ КНОПКИ
      if (target?.closest('button, a, input, select')) {
        gsap.to(dot, { opacity: 1, scale: 0.6, duration: 0.2 });
        gsap.to(ring, {
          width: 46,
          height: 46,
          borderColor: 'rgba(212, 175, 55, 0.9)',
          backgroundColor: 'rgba(212, 175, 55, 0.1)',
          boxShadow: '0 0 15px rgba(212, 175, 55, 0.25)',
          duration: 0.3,
        });
        gsap.to(label, { opacity: 0, duration: 0.15 });
        return;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('button, a, input, [data-cursor="drag"]')) {
        gsap.to(dot, { opacity: 1, scale: 1, duration: 0.25 });
        gsap.to(ring, {
          width: 32,
          height: 32,
          borderColor: 'rgba(212, 175, 55, 0.35)',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          backdropFilter: 'none',
          duration: 0.3,
        });
        gsap.to(label, { opacity: 0, duration: 0.15 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* Центральная точка */}
      <div
        ref={cursorDot}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-gold-400 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
      />

      {/* Кольцо, трансформирующееся в бейдж DESLIZAR */}
      <div
        ref={cursorRing}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-gold-500/35 pointer-events-none z-50 hidden md:flex items-center justify-center overflow-hidden transition-colors"
      >
        <div
          ref={cursorText}
          className="text-[9px] uppercase tracking-[0.2em] font-bold text-gold-300 opacity-0 pointer-events-none select-none text-center leading-tight whitespace-nowrap"
        >
          DESLIZAR
        </div>
      </div>
    </>
  );
};