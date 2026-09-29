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

    // Координаты мыши и статус нахождения в окне
    let mouseX = -1000;
    let mouseY = -1000;
    let prevMouseX = -1000;
    let prevMouseY = -1000;
    let isMouseActive = false;

    const setupCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    setupCanvasSize();

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseActive) {
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
        isMouseActive = true;
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        if (!isMouseActive) {
          prevMouseX = touch.clientX;
          prevMouseY = touch.clientY;
          isMouseActive = true;
        }
        mouseX = touch.clientX;
        mouseY = touch.clientY;
      }
    };

    const handleMouseLeave = () => {
      isMouseActive = false;
      mouseX = -1000;
      mouseY = -1000;
      prevMouseX = -1000;
      prevMouseY = -1000;
    };

    window.addEventListener('resize', setupCanvasSize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // 24 благородных волоска на ПК (идеальная плотность без пустот), 10 на телефонах
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 10 : 24;

    const lashes: LashParticle[] = Array.from({ length: particleCount }, (_, idx) => {
      const isForeground = idx < 4;
      const depth = isForeground ? Math.random() * 0.25 + 0.75 : Math.random() * 0.6;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        depth,
        length: depth * 6 + 13,
        curl: (Math.random() * 2.5 + 2.5) * (Math.random() > 0.5 ? 1 : -1),
        rootWidth: depth * 0.25 + 0.8,
        angle: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.006,
        speedY: (Math.random() * 0.1 + 0.04) * (depth * 0.4 + 0.6),
        speedX: (Math.random() - 0.5) * 0.06,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.01 + 0.005,
        glintPhase: Math.random() * Math.PI * 2,
        glintSpeed: Math.random() * 0.015 + 0.012,
        vx: 0,
        vy: 0,
        vRot: 0,
      };
    });

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 1;

      // ЧЕСТНЫЙ И СТАБИЛЬНЫЙ РАСЧЕТ СКОРОСТИ МЫШИ (СТРОГО МЕЖДУ КАДРАМИ RAF)
      let mouseVx = 0;
      let mouseVy = 0;
      let mouseSpeed = 0;

      if (isMouseActive && prevMouseX !== -1000) {
        mouseVx = mouseX - prevMouseX;
        mouseVy = mouseY - prevMouseY;
        const rawSpeed = Math.sqrt(mouseVx * mouseVx + mouseVy * mouseVy);
        // ЛИМИТЕР: скорость мыши физически ограничена, поэтому ресницы никогда не улетят как из пушки
        mouseSpeed = Math.min(rawSpeed, 22);
        prevMouseX = mouseX;
        prevMouseY = mouseY;
      }

      // Увеличенный комфортный радиус воздушной волны (175px на ПК, 130px на телефоне)
      const pushRadius = isMobile ? 130 : 175;

      lashes.forEach((p) => {
        // 1. ОРГАНИЧЕСКИЙ ТОЛЧОК ВОЗДУХА
        if (isMouseActive) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < pushRadius && dist > 0) {
            // Мягкий нелинейный спад силы к краям волны
            const force = Math.pow(1 - dist / pushRadius, 1.6);
            const normalX = dx / dist;
            const normalY = dy / dist;

            // Стабильное радиальное отталкивание (работает ВСЕГДА, даже при медленном движении)
            const repulsion = 1.9;
            p.vx += normalX * force * repulsion;
            p.vy += normalY * force * repulsion;

            // Направленный шлейф ветра за движением мыши (плавный, без скачков)
            if (mouseSpeed > 0.5) {
              p.vx += (mouseVx / (mouseSpeed || 1)) * (mouseSpeed * 0.06) * force;
              p.vy += (mouseVy / (mouseSpeed || 1)) * (mouseSpeed * 0.06) * force;
            }

            // Завихрение вокруг оси
            const torque = (normalX * mouseVy - normalY * mouseVx) * 0.002;
            p.vRot += (torque + (Math.random() - 0.5) * 0.012) * force;
          }
        }

        // Ограничение максимальной скорости волоска (гарантия спокойствия)
        const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (currentSpeed > 4.2) {
          p.vx = (p.vx / currentSpeed) * 4.2;
          p.vy = (p.vy / currentSpeed) * 4.2;
        }

        // Сопротивление воздуха (плавное затухание)
        p.vx *= 0.93;
        p.vy *= 0.93;
        p.vRot *= 0.92;

        // Парение волоска
        p.swayPhase += p.swaySpeed;
        p.y -= p.speedY - p.vy;
        p.x += p.speedX + Math.sin(p.swayPhase) * 0.18 + p.vx;
        p.angle += p.rotSpeed + p.vRot;

        // Бесшовный цикл экрана
        if (p.y < -30) p.y = height + 30;
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        // 2. СКОЛЬЗЯЩИЙ СВЕТОВОЙ БЛИК
        const lightCatch = Math.cos(p.angle * 1.5 + p.glintPhase);
        const catchesLight = lightCatch > 0.15;
        const glintPos = ((time * p.glintSpeed + p.glintPhase) % (Math.PI * 2)) / (Math.PI * 2);

        // 3. ГРАДИЕНТ ВДОЛЬ ВОЛОСКА
        const halfLen = p.length / 2;
        const tipX = halfLen;
        const tipY = -p.curl * 0.35;
        const ctrlX = 0;
        const ctrlY = -p.curl;
        const rootW = p.rootWidth;

        const grad = ctx.createLinearGradient(-halfLen, 0, tipX, tipY);
        const baseRootAlpha = Math.min(0.42, p.depth * 0.14 + 0.20);
        const baseTipAlpha = baseRootAlpha * 0.20;

        if (catchesLight && glintPos > 0.05 && glintPos < 0.95) {
          const gStart = Math.max(0, glintPos - 0.18);
          const gEnd = Math.min(1, glintPos + 0.18);

          grad.addColorStop(0, `rgba(170, 145, 110, ${baseRootAlpha})`);
          if (gStart > 0) {
            grad.addColorStop(gStart, `rgba(195, 170, 130, ${baseRootAlpha * 0.85})`);
          }
          grad.addColorStop(glintPos, `rgba(255, 250, 232, ${Math.min(0.65, baseRootAlpha + 0.25)})`);
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

        // 4. КОНИЧЕСКИЙ КЛИН (АНАТОМИЧЕСКИЙ ВОЛОСОК)
        ctx.beginPath();
        ctx.moveTo(-halfLen, -rootW / 2);
        ctx.quadraticCurveTo(ctrlX, ctrlY - rootW * 0.2, tipX, tipY);
        ctx.quadraticCurveTo(ctrlX, ctrlY + rootW * 0.2, -halfLen, rootW / 2);
        ctx.closePath();

        ctx.fillStyle = grad;
        ctx.fill();

        // 5. МИКРО-СПЕКУЛЯРНЫЙ ОРЕОЛ БЛИКА
        if (catchesLight && p.depth > 0.65 && glintPos > 0.2 && glintPos < 0.8) {
          const it = 1 - glintPos;
          const fx = it * it * (-halfLen) + 2 * it * glintPos * ctrlX + glintPos * glintPos * tipX;
          const fy = it * it * 0 + 2 * it * glintPos * ctrlY + glintPos * glintPos * tipY;

          ctx.beginPath();
          ctx.arc(fx, fy, rootW * 0.9, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 252, 235, ${0.12 * p.depth})`;
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