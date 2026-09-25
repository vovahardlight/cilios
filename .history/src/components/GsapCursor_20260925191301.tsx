import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const GsapCursor: React.FC = () => {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Включаем только для мышек (без сенсорных экранов)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = cursorDot.current;
    const ring = cursorRing.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    // Сверхбыстрые аппаратные сеттеры для 120 кадров/сек
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });

    const ringX = gsap.quickTo(ring, 'x', { duration: 0.25, ease: 'power2.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.25, ease: 'power2.out' });

    const onMouseMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    // Анимация при наведении на интерактивные кнопки
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('button, a, input, [data-cursor="interactive"]')) {
        gsap.to(ring, {
          scale: 1.8,
          borderColor: 'rgba(212, 175, 55, 0.9)',
          backgroundColor: 'rgba(212, 175, 55, 0.1)',
          duration: 0.3,
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('button, a, input, [data-cursor="interactive"]')) {
        gsap.to(ring, {
          scale: 1,
          borderColor: 'rgba(212, 175, 55, 0.4)',
          backgroundColor: 'transparent',
          duration: 0.3,
        });
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
      <div
        ref={cursorDot}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-gold-400 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
      />
      <div
        ref={cursorRing}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-gold-500/40 pointer-events-none z-50 hidden md:block"
      />
    </>
  );
};