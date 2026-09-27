import React, { useEffect, useRef } from 'react';

interface LashParticle {
  x: number;
  y: number;
  length: number;       // Длина реснички
  curl: number;         // Сила изгиба (C / D curl)
  thickness: number;    // Толщина волоска
  angle: number;        // Угол поворота
  rotSpeed: number;     // Скорость собственного вращения
  speedY: number;       // Скорость подъема
  speedX: number;       // Боковой дрейф
  swayPhase: number;    // Фаза плавного покачивания
  swaySpeed: number;    // Скорость покачивания
  baseOpacity: number;  // Базовая прозрачность
  shimmerOffset: number;// Сдвиг блика по свету

  // Физика взаимодействия с мышью:
  vx: number;           // Импульс отталкивания по X
  vy: number;           // Импульс отталкивания по Y
  vRot: number;         // Завихрение вращения от потока воздуха
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

    // Координаты и скорость мыши
    let mouseX = -1000;
    let mouseY = -1000;
    let prevMouseX = -1000;
    let prevMouseY = -1000;
    let mouseSpeedX = 0;
    let mouseSpeedY = 0;

    const setupCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    setupCanvasSize();

    // Слушатели движения курсора и свайпов на тач-экранах
    const handleMouseMove = (e: MouseEvent) => {
      mouseSpeedX = e.clientX - (prevMouseX === -1000 ? e.clientX : prevMouseX);
      mouseSpeedY = e.clientY - (prevMouseY === -1000 ? e.clientY : prevMouseY);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseSpeedX = touch.clientX - (prevMouseX === -1000 ? touch.clientX : prevMouseX);
        mouseSpeedY = touch.clientY - (prevMouseY === -1000 ? touch.clientY : prevMouseY);
        prevMouseX = touch.clientX;
        prevMouseY = touch.clientY;
        mouseX = touch.clientX;
        mouseY = touch.clientY;
      }
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      prevMouseX = -1000;
      prevMouseY = -1000;
      mouseSpeedX = 0;
      mouseSpeedY = 0;
    };

    window.addEventListener('resize', setupCanvasSize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // 75 шёлковых ресничек с честными видимыми размерами
    const lashes: LashParticle[] = Array.from({ length: 75 }, () => {
      const depth = Math.random(); // 0 - тонкие на заднем плане, 1 - крупные на переднем
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        length: depth * 14 + 14,                // Длина от 14px до 28px (четко видна форма)
        curl: (Math.random() * 4 + 3.5) * (Math.random() > 0.5 ? 1 : -1),
        thickness: depth * 0.7 + 0.8,           // Толщина от 0.8px до 1.5px (больше никакого 0.1px!)
        angle: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.014,
        speedY: (Math.random() * 0.24 + 0.09) * (depth * 0.5 + 0.75),
        speedX: (Math.random() - 0.5) * 0.12,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
        baseOpacity: depth * 0.25 + 0.35,       // Базовая видимость от 0.35 до 0.60 (видны всегда!)
        shimmerOffset: Math.random() * Math.PI,
        vx: 0,
        vy: 0,
        vRot: 0,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Плавное затухание скорости движения курсора
      mouseSpeedX *= 0.85;
      mouseSpeedY *= 0.85;

      const pushRadius = 140; // Радиус воздушной волны вокруг курсора

      lashes.forEach((p) => {
        // 1. ОРГАНИЧЕСКИЙ ТОЛЧОК ОТ МЫШИ
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < pushRadius && dist > 0) {
          const force = Math.pow(1 - dist / pushRadius, 1.8);
          const normalX = dx / dist;
          const normalY = dy / dist;

          const repulsion = 2.4;
          p.vx += normalX * force * repulsion;
          p.vy += normalY * force * repulsion;

          p.vx += mouseSpeedX * force * 0.12;
          p.vy += mouseSpeedY * force * 0.12;

          const torque = (normalX * mouseSpeedY - normalY * mouseSpeedX) * 0.005;
          p.vRot += (torque + (Math.random() - 0.5) * 0.04) * force;
        }

        // Физическое гашение импульса
        p.vx *= 0.93;
        p.vy *= 0.93;
        p.vRot *= 0.92;

        // 2. ДВИЖЕНИЕ И ПЛАВАНИЕ
        p.swayPhase += p.swaySpeed;
        p.y -= p.speedY - p.vy;
        p.x += p.speedX + Math.sin(p.swayPhase) * 0.25 + p.vx;
        p.angle += p.rotSpeed + p.vRot;

        // Бесшовный круговорот экрана
        if (p.y < -35) p.y = height + 35;
        if (p.x < -35) p.x = width + 35;
        if (p.x > width + 35) p.x = -35;

        // 3. ШЁЛКОВЫЙ БЛИК ПРИ ПОВОРОТЕ
        const specularAngle = Math.cos(p.angle * 2 + p.shimmerOffset);
        const glint = Math.pow(Math.max(0, specularAngle), 2.5);
        
        // Видимость: ресничка видна ВСЕГДА, а при повороте к свету ярко вспыхивает
        const currentOpacity = Math.min(0.92, p.baseOpacity + glint * 0.4);

        // Цвет: теплое золото в тени -> ослепительное шампанское на свету
        const r = Math.round(205 + glint * 45);
        const g = Math.round(165 + glint * 60);
        const b = Math.round(85 + glint * 80);

        // 4. ОТРИСОВКА АНАТОМИЧЕСКОГО ВОЛОСКА
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        ctx.beginPath();
        ctx.moveTo(-p.length / 2, 0);
        ctx.quadraticCurveTo(0, -p.curl, p.length / 2, -p.curl * 0.3);

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`;
        ctx.lineWidth = p.thickness;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Ореол скользящего света на пике блика
        if (glint > 0.55) {
          ctx.strokeStyle = `rgba(255, 245, 205, ${glint * 0.35})`;
          ctx.lineWidth = p.thickness * 2.4;
          ctx.stroke();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setupCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
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