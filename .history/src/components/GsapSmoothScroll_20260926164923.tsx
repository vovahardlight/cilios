import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const GsapSmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // На мобильных устройствах и тач-экранах оставляем идеальную нативную инерцию
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let isRunning = false;

    // Коэффициент плавности: 0.08 — идеальный баланс между мягкостью и отзывчивостью
    const ease = 0.08;

    // Плавная интерполяция позиции через GSAP Ticker
    const tickerUpdate = () => {
      const diff = targetY - currentY;
      
      // Двигаем страницу, пока разница больше 0.5px
      if (Math.abs(diff) > 0.5) {
        currentY += diff * ease;
        window.scrollTo(0, Math.round(currentY));
        ScrollTrigger.update();
      } else {
        currentY = targetY;
        isRunning = false;
        gsap.ticker.remove(tickerUpdate);
      }
    };

    const onWheel = (e: WheelEvent) => {
      // Если курсор находится внутри модального окна с прокруткой — не перехватываем
      const target = e.target as HTMLElement | null;
      if (target?.closest('.overflow-y-auto, textarea, select')) {
        return;
      }

      e.preventDefault();

      // Максимальный предел скролла страницы
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );

      // Накапливаем целевую координату
      targetY = Math.max(0, Math.min(maxScroll, targetY + e.deltaY));

      // Запускаем тикер GSAP, если он еще не активен
      if (!isRunning) {
        isRunning = true;
        currentY = window.scrollY;
        gsap.ticker.add(tickerUpdate);
      }
    };

    // Синхронизация при ручном перетаскивании скроллбара
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