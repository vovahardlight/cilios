import React, { useEffect, useRef } from 'react';

interface LashParticle {
  x: number;
  y: number;
  length: number;       // Длина реснички
  curl: number;         // Сила изгиба (C / D curl)
  thickness: number;    // Толщина волоска
  angle: number;        // Угол поворота
  rotSpeed: number;     // Скорость вращения
  speedY: number;       // Скорость подъема
  speedX: number;       // Боковой дрейф
  swayPhase: number;    // Фаза плавного покачивания
  swaySpeed: number;    // Скорость покачивания
  baseOpacity: number;  // Базовая прозрачность
  shimmerOffset: number;// Сдвиг блика по свету
}

export const AmbientCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    setupCanvasSize();
    window.addEventListener('resize', setupCanvasSize);

    // 70 шёлковых ресничек разной длины и глубины (ТОЛЬКО РЕСНИЦЫ)
    const lashes: LashParticle[] = Array.from({ length: 70 }, () => {
      const depth = Math.random(); // 0 - далекие тонкие, 1 - близкие крупные
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        length: depth * 14 + 10,                 // от 10px до 24px
        curl: (Math.random() * 4 + 3) * (Math.random() > 0.5 ? 1 : -1), // Натуральный изгиб
        thickness: depth * 0.4 + 0.3,            // от 0.6px до 1.4px
        angle: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.012, // Деликатное вращение
        speedY: (Math.random() * 0.22 + 0.08) * (depth * 0.6 + 0.7),
        speedX: (Math.random() - 0.5) * 0.12,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
        baseOpacity: depth * 0.35 + 0.15,        // от 0.15 до 0.5
        shimmerOffset: Math.random() * Math.PI,  // Индивидуальный угол отражения света
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      lashes.forEach((p) => {
        // Физика плавного парения в невесомости
        p.swayPhase += p.swaySpeed;
        p.y -= p.speedY;
        p.x += p.speedX + Math.sin(p.swayPhase) * 0.25;
        p.angle += p.rotSpeed;

        // Бесшовный круговорот экрана
        if (p.y < -30) p.y = height + 30;
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        // ЕСТЕСТВЕННЫЙ ШЁЛКОВЫЙ БЛИК:
        // Ресничка мягко блестит только тогда, когда поворачивается гранью к воображаемому свету
        const specularAngle = Math.cos(p.angle * 2 + p.shimmerOffset);
        // Мягкая экспонента (без резких миганий)
        const glint = Math.pow(Math.max(0, specularAngle), 3);

        const currentOpacity = Math.min(0.9, p.baseOpacity + glint * 0.45);

        // ЦВЕТ: Благородное жидкое шампанское с золотом
        // В тени: глубокое тёплое золото (195, 155, 75)
        // На свету: искрящееся шампанское (245, 220, 145)
        const r = Math.round(195 + glint * 50);
        const g = Math.round(155 + glint * 65);
        const b = Math.round(75 + glint * 70);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        // ОТРИСОВКА АНАТОМИЧЕСКОЙ РЕСНИЧКИ (ИЗОГНУТАЯ ДУГА)
        ctx.beginPath();
        // Начинаем от основания волоска
        ctx.moveTo(-p.length / 2, 0);
        // Рисуем естественный изгиб реснички через контрольную точку
        ctx.quadraticCurveTo(0, -p.curl, p.length / 2, -p.curl * 0.3);

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`;
        ctx.lineWidth = p.thickness;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Если ресничка поймала сильный блик — добавляем микро-ореол света по ее длине
        if (glint > 0.6) {
          ctx.strokeStyle = `rgba(255, 245, 205, ${glint * 0.3})`;
          ctx.lineWidth = p.thickness * 2.2;
          ctx.stroke();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setupCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};