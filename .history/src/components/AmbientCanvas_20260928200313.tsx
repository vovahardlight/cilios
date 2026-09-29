import React, { useEffect, useRef } from 'react';

interface LashParticle {
  x: number;
  y: number;
  length: number;        // Длина: 13-19px (соразмерно строчным буквам шрифта)
  curl: number;          // Натуральный изгиб C/D curl
  rootWidth: number;     // Толщина у корня (0.8 - 1.05px)
  angle: number;         // Угол поворота в пространстве
  rotSpeed: number;      // Скорость медленного вращения
  speedY: number;        // Скорость подъема
  speedX: number;        // Дрейф
  swayPhase: number;     // Фаза покачивания
  swaySpeed: number;     // Скорость покачивания
  depth: number;         // 0 - дальний план, 1 - передний
  glintPhase: number;    // Фаза движения светового луча по волоску
  glintSpeed: number;    // Скорость скольжения блика от корня к кончику

  // Физика воздушной волны:
  vx: number;
  vy: number;
  vRot: number;
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

    // 18 изящных волосков на ПК, 8 на смартфонах (свободный воздух)
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 8 : 18;

    const lashes: LashParticle[] = Array.from({ length: particleCount }, (_, idx) => {
      const isForeground = idx < 3;
      const depth = isForeground ? Math.random() * 0.25 + 0.75 : Math.random() * 0.6;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        depth,
        // Пропорции строго по сетке шрифта: 13–19px
        length: depth * 6 + 13,
        curl: (Math.random() * 2.5 + 2.5) * (Math.random() > 0.5 ? 1 : -1),
        // Волос: корень 0.8–1.05px, кончик сойдет в 0px
        rootWidth: depth * 0.25 + 0.8,
        angle: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.006,
        speedY: (Math.random() * 0.1 + 0.04) * (depth * 0.4 + 0.6),
        speedX: (Math.random() - 0.5) * 0.06,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.01 + 0.005,
        glintPhase: Math.random() * Math.PI * 2,
        glintSpeed: Math.random() * 0.015 + 0.012, // Скорость бега луча
        vx: 0,
        vy: 0,
        vRot: 0,
      };
    });

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 1;

      mouseSpeedX *= 0.85;
      mouseSpeedY *= 0.85;

      const pushRadius = 120;

      lashes.forEach((p) => {
        // 1. Аэродинамический толчок от мыши
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < pushRadius && dist > 0) {
          const force = Math.pow(1 - dist / pushRadius, 2);
          const normalX = dx / dist;
          const normalY = dy / dist;

          const repulsion = 1.6;
          p.vx += normalX * force * repulsion;
          p.vy += normalY * force * repulsion;

          p.vx += mouseSpeedX * force * 0.07;
          p.vy += mouseSpeedY * force * 0.07;

          // Корень ресницы тяжелее, кончик закручивается
          const torque = (normalX * mouseSpeedY - normalY * mouseSpeedX) * 0.0025;
          p.vRot += (torque + (Math.random() - 0.5) * 0.015) * force;
        }

        // Сопротивление воздуха
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.vRot *= 0.93;

        // Парение
        p.swayPhase += p.swaySpeed;
        p.y -= p.speedY - p.vy;
        p.x += p.speedX + Math.sin(p.swayPhase) * 0.18 + p.vx;
        p.angle += p.rotSpeed + p.vRot;

        // Цикличность экрана
        if (p.y < -30) p.y = height + 30;
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        // --- 2. МАТЕМАТИКА СКОЛЬЗЯЩЕГО БЛИКА ПО ВОЛОСКУ ---
        // Угол отражения софита: луч активируется, когда волос поворачивается гранью к свету
        const lightCatch = Math.cos(p.angle * 1.5 + p.glintPhase);
        const catchesLight = lightCatch > 0.15;

        // Позиция светового луча вдоль волоска: от 0.0 (корень) до 1.0 (кончик)
        const glintPos = ((time * p.glintSpeed + p.glintPhase) % (Math.PI * 2)) / (Math.PI * 2);

        // --- 3. ГРАДИЕНТ ЦВЕТА И СВЕТА ВДОЛЬ ВОЛОСКА ---
        const halfLen = p.length / 2;
        const tipX = halfLen;
        const tipY = -p.curl * 0.35;
        const ctrlX = 0;
        const ctrlY = -p.curl;
        const rootW = p.rootWidth;

        // Градиент от основания к кончику
        const grad = ctx.createLinearGradient(-halfLen, 0, tipX, tipY);

        // Ослабленная прозрачность (спокойная текстура вместо неонового блеска)
        const baseRootAlpha = Math.min(0.38, p.depth * 0.14 + 0.16);
        const baseTipAlpha = baseRootAlpha * 0.20;

        if (catchesLight && glintPos > 0.05 && glintPos < 0.95) {
          const gStart = Math.max(0, glintPos - 0.18);
          const gEnd = Math.min(1, glintPos + 0.18);

          grad.addColorStop(0, `rgba(170, 145, 110, ${baseRootAlpha})`);
          if (gStart > 0) {
            grad.addColorStop(gStart, `rgba(195, 170, 130, ${baseRootAlpha * 0.85})`);
          }
          // Сдержанный блик шампанского
          grad.addColorStop(glintPos, `rgba(255, 250, 232, ${Math.min(0.60, baseRootAlpha + 0.22)})`);
          if (gEnd < 1) {
            grad.addColorStop(gEnd, `rgba(195, 170, 130, ${baseTipAlpha * 1.4})`);
          }
          grad.addColorStop(1, `rgba(220, 195, 155, ${baseTipAlpha})`);
        } else {
          grad.addColorStop(0, `rgba(170, 145, 110, ${baseRootAlpha})`);
          grad.addColorStop(0.5, `rgba(195, 170, 130, ${baseRootAlpha * 0.65})`);
          grad.addColorStop(1, `rgba(220, 195, 155, ${baseTipAlpha})`);
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        ctx.beginPath();
        ctx.moveTo(-halfLen, -rootW / 2);
        ctx.quadraticCurveTo(ctrlX, ctrlY - rootW * 0.2, tipX, tipY);
        ctx.quadraticCurveTo(ctrlX, ctrlY + rootW * 0.2, -halfLen, rootW / 2);
        ctx.closePath();

        ctx.fillStyle = grad;
        ctx.fill();

        // Деликатный микро-ореол (уменьшен радиус и яркость)
        if (catchesLight && p.depth > 0.65 && glintPos > 0.2 && glintPos < 0.8) {
          const it = 1 - glintPos;
          const fx = it * it * (-halfLen) + 2 * it * glintPos * ctrlX + glintPos * glintPos * tipX;
          const fy = it * it * 0 + 2 * it * glintPos * ctrlY + glintPos * glintPos * tipY;

          ctx.beginPath();
          ctx.arc(fx, fy, rootW * 0.9, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 252, 235, ${0.10 * p.depth})`;
          ctx.fill();
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