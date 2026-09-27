import React, { useEffect, useRef } from 'react';

interface LashParticle {
  x: number;
  y: number;
  length: number;       // Длина реснички
  curl: number;         // Натуральный изгиб
  thickness: number;    // Калиброванная толщина
  angle: number;        // Угол поворота
  rotSpeed: number;     // Скорость вращения
  speedY: number;       // Скорость подъема
  speedX: number;       // Боковой дрейф
  swayPhase: number;    // Фаза покачивания
  swaySpeed: number;    // Скорость покачивания
  baseOpacity: number;  // Деликатная прозрачность
  shimmerOffset: number;// Сдвиг светового блика
  depth: number;        // План глубины (0 - фон, 1 - передний план)

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

    // НАУЧНО ВЫВЕРЕННОЕ КОЛИЧЕСТВО: 20 на ПК, 8 на смартфонах
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 8 : 20;

    const lashes: LashParticle[] = Array.from({ length: particleCount }, (_, idx) => {
      // 3-4 реснички на переднем плане (крупнее), остальные глубже в фоне
      const isForeground = idx < 3;
      const depth = isForeground ? Math.random() * 0.25 + 0.75 : Math.random() * 0.6;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        depth,
        length: depth * 12 + 14,                  // от 14px до 26px
        curl: (Math.random() * 3.5 + 3) * (Math.random() > 0.5 ? 1 : -1),
        thickness: depth * 0.55 + 0.75,           // от 0.75px (фон) до 1.3px (передний план)
        angle: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.007,  // Медленное величественное вращение
        speedY: (Math.random() * 0.11 + 0.05) * (depth * 0.4 + 0.6), // Замедлено в 1.8x
        speedX: (Math.random() - 0.5) * 0.08,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.012 + 0.006, // Плавное покачивание
        baseOpacity: depth * 0.18 + 0.18,         // Мягкая прозрачность 18–36% (не спорит с текстом)
        shimmerOffset: Math.random() * Math.PI,
        vx: 0,
        vy: 0,
        vRot: 0,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      mouseSpeedX *= 0.85;
      mouseSpeedY *= 0.85;

      const pushRadius = 130;

      lashes.forEach((p) => {
        // Деликатный физический толчок от курсора
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < pushRadius && dist > 0) {
          const force = Math.pow(1 - dist / pushRadius, 2);
          const normalX = dx / dist;
          const normalY = dy / dist;

          const repulsion = 1.8;
          p.vx += normalX * force * repulsion;
          p.vy += normalY * force * repulsion;

          p.vx += mouseSpeedX * force * 0.08;
          p.vy += mouseSpeedY * force * 0.08;

          const torque = (normalX * mouseSpeedY - normalY * mouseSpeedX) * 0.003;
          p.vRot += (torque + (Math.random() - 0.5) * 0.02) * force;
        }

        // Сопротивление среды (мягкое торможение)
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.vRot *= 0.93;

        // Невесомое перемещение
        p.swayPhase += p.swaySpeed;
        p.y -= p.speedY - p.vy;
        p.x += p.speedX + Math.sin(p.swayPhase) * 0.2 + p.vx;
        p.angle += p.rotSpeed + p.vRot;

        // Бесшовный перезапуск у краев
        if (p.y < -35) p.y = height + 35;
        if (p.x < -35) p.x = width + 35;
        if (p.x > width + 35) p.x = -35;

        // Скользящий шёлковый блик
        const specularAngle = Math.cos(p.angle * 2 + p.shimmerOffset);
        const glint = Math.pow(Math.max(0, specularAngle), 3);
        
        // Ограничиваем максимальную яркость до 0.65 (не ослепляет и не мигает)
        const currentOpacity = Math.min(0.65, p.baseOpacity + glint * 0.28);

        // Палитра: благородное шампанское в полутени -> нежное жидкое золото на свету
        const r = Math.round(190 + glint * 45);
        const g = Math.round(155 + glint * 55);
        const b = Math.round(80 + glint * 65);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        // Отрисовка изящной дуги ресницы
        ctx.beginPath();
        ctx.moveTo(-p.length / 2, 0);
        ctx.quadraticCurveTo(0, -p.curl, p.length / 2, -p.curl * 0.25);

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`;
        ctx.lineWidth = p.thickness;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Тончайший ореол на пике блика (только для переднего плана)
        if (glint > 0.65 && p.depth > 0.6) {
          ctx.strokeStyle = `rgba(255, 245, 215, ${glint * 0.2})`;
          ctx.lineWidth = p.thickness * 1.8;
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