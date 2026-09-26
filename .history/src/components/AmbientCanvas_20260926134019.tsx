import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  type: 'fiber' | 'dust';
  size: number;
  length: number;
  angle: number;
  rotSpeed: number;
  speedY: number;
  speedX: number;
  baseOpacity: number;
  pulsePhase: number;
  pulseSpeed: number;
  flickerSpeed: number;
  canFlare: boolean;
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

    // 55 сбалансированных частиц (30% шелковые реснички, 70% золотая пыльца)
    const particles: Particle[] = Array.from({ length: 55 }, () => {
      const isFiber = Math.random() > 0.7;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        type: isFiber ? 'fiber' : 'dust',
        size: Math.random() * 1.6 + 0.6,
        length: Math.random() * 7 + 4,
        angle: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        speedY: Math.random() * 0.25 + 0.08,
        speedX: (Math.random() - 0.5) * 0.15,
        baseOpacity: Math.random() * 0.25 + 0.15,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.012,
        flickerSpeed: Math.random() * 0.08 + 0.03,
        canFlare: Math.random() > 0.55, // Часть пылинок имеет право давать микро-вспышку
      };
    });

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 1;

      particles.forEach((p) => {
        // Движение
        p.y -= p.speedY;
        p.x += p.speedX;
        p.angle += p.rotSpeed;

        // Бесшовный круговорот экрана
        if (p.y < -15) p.y = height + 15;
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        // АЛГОРИТМ ОРГАНИЧЕСКОГО СВЕЧЕНИЯ
        // Смешение двух гармонических волн исключает механическую цикличность
        const wave1 = Math.sin(time * p.pulseSpeed + p.pulsePhase);
        const wave2 = Math.sin(time * p.flickerSpeed + p.pulsePhase * 1.5);
        const organicFactor = (wave1 * 0.7 + wave2 * 0.3); // от -1 до 1

        let opacity = p.baseOpacity + organicFactor * 0.35;
        opacity = Math.max(0.04, Math.min(0.95, opacity));

        // Градиент перехода цвета: от теплой бронзы к бриллиантовому шампанскому
        const r = Math.round(212 + opacity * 43); // 212 -> 255
        const g = Math.round(175 + opacity * 65); // 175 -> 240
        const b = Math.round(55 + opacity * 165); // 55  -> 220

        if (p.type === 'fiber') {
          // --- РЕНДЕР ИЗОГНУТОГО ШЕЛКОВОГО ВОЛОКНА РЕСНИЦЫ ---
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);

          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.8})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          // Мягкий дугообразный изгиб волоска
          ctx.moveTo(-p.length / 2, 0);
          ctx.quadraticCurveTo(0, -1.8, p.length / 2, 0);
          ctx.stroke();

          ctx.restore();
        } else {
          // --- РЕНДЕР ЗОЛОТОЙ АЛМАЗНОЙ ПЫЛИНКИ ---
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.fill();

          // ДЕЛИКАТНАЯ МИКРО-ВСПЫШКА (Ювелирный блик)
          // Появляется только на пике синусоиды у избранных пылинок
          if (p.canFlare && organicFactor > 0.75) {
            const flareAlpha = (organicFactor - 0.75) * 4 * opacity; // Мягкое появление и угасание
            const flareSize = p.size * 3.2;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.strokeStyle = `rgba(255, 248, 230, ${flareAlpha})`;
            ctx.lineWidth = 0.6;

            // Горизонтальный луч
            ctx.beginPath();
            ctx.moveTo(-flareSize, 0);
            ctx.lineTo(flareSize, 0);
            ctx.stroke();

            // Вертикальный луч
            ctx.beginPath();
            ctx.moveTo(0, -flareSize);
            ctx.lineTo(0, flareSize);
            ctx.stroke();

            // Микро-ореол света в центре
            ctx.fillStyle = `rgba(255, 255, 255, ${flareAlpha * 0.8})`;
            ctx.beginPath();
            ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
          }
        }
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