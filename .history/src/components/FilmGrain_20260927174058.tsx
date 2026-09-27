import React, { useEffect, useRef } from 'react';

export const FilmGrain: React.FC = () => {
  const grainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    // Делаем текстуру 200x200
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.createImageData(200, 200);
    const data = imgData.data;

    // Генерируем золотисто-кремовые осязаемые песчинки
    for (let i = 0; i < data.length; i += 4) {
      if (Math.random() < 0.25) {
        // Теплый оттенок шампанского вместо холодного белого
        data[i] = 235;     // Red
        data[i + 1] = 210; // Green
        data[i + 2] = 160; // Blue
        data[i + 3] = Math.floor(Math.random() * 140 + 80); // Плотный альфа-канал
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
      /* 13% прозрачности: теперь фактуру бумаги/бархата РЕАЛЬНО ВИДНО невооруженным глазом */
      className="fixed inset-0 pointer-events-none z-30 opacity-[0.13] mix-blend-screen bg-repeat"
    />
  );
};