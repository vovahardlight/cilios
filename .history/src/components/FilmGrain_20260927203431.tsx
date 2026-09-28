import React, { useEffect, useRef } from 'react';

export const FilmGrain: React.FC = () => {
  const grainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    // Компактный плотный тайл 140x140
    canvas.width = 140;
    canvas.height = 140;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, 140, 140);

    // 1. ГУСТЫЕ МИКРО-ПЕСЧИНКИ ДЛЯ БУКВ (ТЕМНЫЙ СЕПИЯ-ГРАФИТ ВМЕСТО ЧЕРНОГО ПЕСКА)
    // 4000 точек на 140px дают плотную бархатную сетку без дыр
    for (let i = 0; i < 4200; i++) {
      const x = Math.random() * 140;
      const y = Math.random() * 140;
      const alpha = Math.random() * 0.18 + 0.07; // Нежная пудровая прозрачность
      // Теплый оттенок дорогой бумаги/краски
      ctx.fillStyle = `rgba(45, 38, 30, ${alpha})`;
      ctx.fillRect(x, y, 1, 1); // СТРОГО 1px — никаких комков
    }

    // 2. ГУСТЫЕ ЗОЛОТИСТО-КРЕМОВЫЕ МИКРО-ПЕСЧИНКИ ДЛЯ ФОНА
    for (let i = 0; i < 4200; i++) {
      const x = Math.random() * 140;
      const y = Math.random() * 140;
      const alpha = Math.random() * 0.16 + 0.05;
      ctx.fillStyle = `rgba(235, 210, 150, ${alpha})`;
      ctx.fillRect(x, y, 1, 1); // СТРОГО 1px
    }

    const dataUrl = canvas.toDataURL();

    if (grainRef.current) {
      grainRef.current.style.backgroundImage = `url(${dataUrl})`;
    }
  }, []);

  return (
    <div
    ref={grainRef}
    aria-hidden="true"
    className="fixed inset-0 pointer-events-none z-[45] opacity-[0.26] bg-repeat"
  />
  );
};