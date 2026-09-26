import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Props {
  children: React.ReactNode;
}

export const GsapSmoothScroll: React.FC<Props> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    // На тач-экранах смартфонов ничего не трогаем (там идеальный нативный свайп)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    // Включаем фиксированный вьюпорт на десктопе
    wrapper.style.position = 'fixed';
    wrapper.style.inset = '0';
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.overflow = 'hidden';

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    
    // Коэффициент тягучести (0.08 — масляный бархатный скролл)
    const ease = 0.08;

    // Сверхбыстрый GPU-сеттер трансформаций без перерасчета стилей
    const setY = gsap.quickSetter(content, 'y', 'px');

    // Синхронизируем физическую высоту body с высотой контента
    const updateBodyHeight = () => {
      document.body.style.height = `${content.scrollHeight}px`;
    };
    updateBodyHeight();

    const resizeObserver = new ResizeObserver(updateBodyHeight);
    resizeObserver.observe(content);

    // Связываем виртуальный контейнер со ScrollTrigger
    ScrollTrigger.scrollerProxy(content, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          window.scrollTo(0, value);
          targetY = value;
          currentY = value;
        }
        return currentY;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: 'transform',
    });

    // Главный цикл интерполяции GSAP
    const tickerUpdate = () => {
      targetY = window.scrollY;
      const diff = targetY - currentY;

      if (Math.abs(diff) > 0.1) {
        currentY += diff * ease;
        setY(-currentY);
        ScrollTrigger.update();
      } else if (currentY !== targetY) {
        currentY = targetY;
        setY(-currentY);
        ScrollTrigger.update();
      }
    };

    gsap.ticker.add(tickerUpdate);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tickerUpdate);
      resizeObserver.disconnect();
      document.body.style.height = '';
      if (wrapper) {
        wrapper.style.position = '';
        wrapper.style.inset = '';
        wrapper.style.overflow = '';
      }
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      <div ref={contentRef} className="w-full will-change-transform">
        {children}
      </div>
    </div>
  );
};