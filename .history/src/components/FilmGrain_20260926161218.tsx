import React, { useEffect, useRef } from 'react';

export const FilmGrain: React.FC = () => {
  const grainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Генерируем текстуру зерна на маленьком холсте 128x128
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.createImageData(128, 128);
    const buffer32 = new Uint32Array(imgData.data.buffer);

    // Заполняем контрастными светлыми микро-точками для видимости на темном фоне
    for (let i = 0; i < buffer32.length; i++) {
      if (Math.random() < 0.18) {
        // Золотисто-белые крупинки пленки с разной яркостью
        const lum = Math.floor(Math.random() * 85 + 170); // от 170 до 255
        const alpha = Math.floor(Math.random() * 55 + 25); // плотность зерна
        buffer32[i] = (alpha << 24) | (lum << 16) | (lum << 8) | lum;
      }
    }

    ctx.putImageData(imgData, 0, 0);
    const dataUrl = canvas.toDataURL();

    if (grainRef.current) {
      grainRef.current.style.backgroundImage = `url(${dataUrl})`;
    }

    // Легкий кинематографичный джиттер (кадр пленки слегка "дышит" раз в 100мс)
    let frame = 0;
    const interval = setInterval(() => {
      if (grainRef.current) {
        frame = (frame + 1) % 4;
        const x = (frame % 2) * 16;
        const y = Math.floor(frame / 2) * 16;
        grainRef.current.style.backgroundPosition = `${x}px ${y}px`;
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={grainRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 opacity-70 mix-blend-screen bg-repeat"
    />
  );
};