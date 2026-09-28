import React, { useEffect, useRef } from 'react';

export const FilmGrain: React.FC = () => {
  const grainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    // Размер текстурного квадрата
    canvas.width = 180;
    canvas.height = 180;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, 180, 180);

    // 1. ТЕМНЫЕ КРУПИНКИ — ОНИ ФИЗИЧЕСКИ ПРОПЕЧАТЫВАЮТСЯ ПОВЕРХ БЕЛЫХ БУКВ
    for (let i = 0; i < 900; i++) {
      const x = Math.random() * 180;
      const y = Math.random() * 180;
      // Размер 1px или 1.5px для осязаемости на Retina
      const size = Math.random() > 0.75 ? 1.5 : 1;
      const alpha = Math.random() * 0.45 + 0.25; // 0.25 - 0.70 плотности
      ctx.fillStyle = `rgba(15, 15, 15, ${alpha})`;
      ctx.fillRect(x, y, size, size);
    }

    // 2. ЗОЛОТИСТО-КРЕМОВЫЕ КРУПИНКИ — МЯГКО ФАКТУРИРУЮТ ТЕМНЫЙ ФОН
    for (let i = 0; i < 900; i++) {
      const x = Math.random() * 180;
      const y = Math.random() * 180;
      const size = Math.random() > 0.75 ? 1.5 : 1;
      const alpha = Math.random() * 0.35 + 0.15;
      ctx.fillStyle = `rgba(230, 205, 145, ${alpha})`;
      ctx.fillRect(x, y, size, size);
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
      /* Без mix-blend-mode: теперь зерно гарантированно лежит НАД буквами без отмен со стороны браузера */
      className="fixed inset-0 pointer-events-none z-[45] opacity-[0.55] bg-repeat"
    />
  );
};