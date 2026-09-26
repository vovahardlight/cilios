import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const GsapSmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // На мобильных устройствах не вмешиваемся в нативный свайп
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let isRunning = false;
    const ease = 0.085; // Мягкая инерция скольжения

    const tickerUpdate = () => {
      const diff = targetY - currentY;
      if (Math.abs(diff) > 0.5) {
        currentY += diff * ease;
        window.scrollTo(0, Math.round(currentY));
        ScrollTrigger.update();
      } else {
        currentY = targetY;
        window.scrollTo(0, currentY);
        isRunning = false;
        gsap.ticker.remove(tickerUpdate);
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest('.overflow-y-auto, textarea, select')) return;

      e.preventDefault();

      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );

      targetY = Math.max(0, Math.min(maxScroll, targetY + e.deltaY));

      if (!isRunning) {
        isRunning = true;
        currentY = window.scrollY;
        gsap.ticker.add(tickerUpdate);
      }
    };

    const onScroll = () => {
      if (!isRunning) {
        targetY = window.scrollY;
        currentY = window.scrollY;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      gsap.ticker.remove(tickerUpdate);
    };
  }, []);

  return <>{children}</>;
};