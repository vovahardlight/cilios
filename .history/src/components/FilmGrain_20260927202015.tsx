import React, { useEffect, useRef } from 'react';

export const FilmGrain: React.FC = () => {
  const grainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    // Размер бесшовного тайла 128x128
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.createImageData(128, 128);
    const buffer32 = new Uint32Array(imgData.data.buffer);

    // ГОЛЛИВУДСКИЙ МЕТОД: сплошной 50% серый шум (RGB 128 ± 45)
    for (let i = 0; i < buffer32.length; i++) {
      // Каждый пиксель колеблется вокруг серого значения 128
      const noise = (Math.random() - 0.5) * 90;
      const lum = Math.min(255, Math.max(0, Math.floor(128 + noise)));
      
      // Полная плотность (Alpha = 255)
      buffer32[i] = (255 << 24) | (lum << 16) | (lum << 8) | lum;
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
      style={{ mixBlendMode: 'overlay' }}
      /* z-[45] гарантированно накрывает весь текст и фото, opacity-[0.22] делает текстуру на буквах четко видимой */
      className="fixed inset-0 pointer-events-none z-[45] opacity-[0.22] bg-repeat"
    />
  );
};