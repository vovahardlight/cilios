import React, { useEffect, useRef } from 'react';

export const FilmGrain: React.FC = () => {
  const grainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.createImageData(256, 256);
    const buffer32 = new Uint32Array(imgData.data.buffer);

    // Плотный шелковистый шум
    for (let i = 0; i < buffer32.length; i++) {
      if (Math.random() < 0.3) {
        // Микроскопические теплые светлые частицы
        const lum = Math.floor(Math.random() * 55 + 200); // 200–255 (светлые песчинки)
        const alpha = 255; // Полная четкость внутри текстуры

        // ПРАВИЛЬНЫЕ СДВИГИ RGBA: Alpha (24), Blue (16), Green (8), Red (0)
        buffer32[i] = (alpha << 24) | (lum << 16) | (lum << 8) | lum;
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
      /* Эталонная видимость 5.5% — видна фактура матового вельвета, но не раздражает */
      className="fixed inset-0 pointer-events-none z-30 opacity-[0.055] mix-blend-screen bg-repeat"
    />
  );
};