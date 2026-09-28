import React, { useEffect, useRef } from 'react';

export const FilmGrain: React.FC = () => {
  const grainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.createImageData(200, 200);
    const buffer32 = new Uint32Array(imgData.data.buffer);

    // ДВУХТОННАЯ ЭМУЛЬСИЯ (СВЕТЛЫЕ + ТЕМНЫЕ КРИСТАЛЛЫ)
    for (let i = 0; i < buffer32.length; i++) {
      const rand = Math.random();

      if (rand < 0.12) {
        // 1. Светло-золотые частицы (мягко проявляются на темном фоне)
        const lum = Math.floor(Math.random() * 45 + 195); // теплый свет
        const alpha = Math.floor(Math.random() * 60 + 90);
        buffer32[i] = (alpha << 24) | (Math.floor(lum * 0.75) << 16) | (Math.floor(lum * 0.9) << 8) | lum;
      } else if (rand < 0.22) {
        // 2. Темные частицы — ОНИ ЛОЖАТСЯ ПОВЕРХ БЕЛЫХ БУКВ И ТЕКСТУРИРУЮТ ИХ
        const alpha = Math.floor(Math.random() * 70 + 60);
        buffer32[i] = (alpha << 24) | (15 << 16) | (15 << 8) | 15;
      }
      // Остальные 78% пикселей остаются кристально прозрачными
    }

    ctx.putImageData(imgData, 0, 0);
    const dataUrl = canvas.toDataURL();

    if (grainRef.current) {
      grainRef.current.style.backgroundImage = `url(${dataUrl})`;
    }
  }, []);

  return (
    <div
      ref={grainRef}
      aria-hidden="true"
      /* Убран агрессивный screen. Нежные 7% прозрачности: буквы визуально на 100% ПОД пленкой */
      className="fixed inset-0 pointer-events-none z-[35] opacity-[0.07] bg-repeat"
    />
  );
};