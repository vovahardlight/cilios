import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const GsapMagnetic: React.FC<Props> = ({ children, onClick, className = '' }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const inner = innerRef.current;
    if (!btn || !inner || window.matchMedia('(pointer: coarse)').matches) return;

    // Быстрые сеттеры для кнопки (внешний контур)
    const btnX = gsap.quickTo(btn, 'x', { duration: 0.35, ease: 'power3.out' });
    const btnY = gsap.quickTo(btn, 'y', { duration: 0.35, ease: 'power3.out' });

    // Сеттеры для текста внутри кнопки (движется с опережением — эффект параллакса)
    const textX = gsap.quickTo(inner, 'x', { duration: 0.4, ease: 'power3.out' });
    const textY = gsap.quickTo(inner, 'y', { duration: 0.4, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = btn.getBoundingClientRect();
      const x = e.clientX - (left + width / 2);
      const y = e.clientY - (top + height / 2);

      // Контур кнопки тянется на 22%
      btnX(x * 0.22);
      btnY(y * 0.22);

      // Внутренний текст обгоняет кнопку и тянется на 42% (Awwwards Parallax)
      textX(x * 0.42);
      textY(y * 0.42);
    };

    const onMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
      gsap.to(inner, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    };

    btn.addEventListener('mousemove', onMouseMove);
    btn.addEventListener('mouseleave', onMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', onMouseMove);
      btn.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <button ref={btnRef} onClick={onClick} className={className}>
      <span ref={innerRef} className="inline-flex items-center justify-center gap-2 pointer-events-none will-change-transform">
        {children}
      </span>
    </button>
  );
};