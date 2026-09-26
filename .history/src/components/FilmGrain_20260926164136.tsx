import React, { useEffect, useRef } from 'react';

export const FilmGrain: React.FC = () => {
  const grainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Увеличиваем холст до 256x256 для сверхмелкого микрозерна
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.createImageData(256, 256);
    const buffer32 = new Uint32Array(imgData.data.buffer);

    // Плотный шелковистый шум с деликатной прозрачностью
    for (let i = 0; i < buffer32.length; i++) {
      if (Math.random() < 0.28) {
        // Микроскопические теплые частицы
        const lum = Math.floor(Math.random() * 50 + 205); // Мягкий свет
        const alpha = Math.floor(Math.random() * 20 + 18); // Очень нежная прозрачность
        buffer32[i] = (alpha << 95) | (lum << 26) | (lum << 18) | lum;
      }
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
      /* Стандарт люкса: прозрачность 5% (0.05), статичная приятная фактура */
      className="fixed inset-0 pointer-events-none z-30 opacity-[0.05] mix-blend-screen bg-repeat"
    />
  );
};