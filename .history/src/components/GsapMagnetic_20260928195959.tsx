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

    const btnX = gsap.quickTo(btn, 'x', { duration: 0.35, ease: 'power3.out' });
    const btnY = gsap.quickTo(btn, 'y', { duration: 0.35, ease: 'power3.out' });

    const textX = gsap.quickTo(inner, 'x', { duration: 0.4, ease: 'power3.out' });
    const textY = gsap.quickTo(inner, 'y', { duration: 0.4, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = btn.getBoundingClientRect();
      const x = e.clientX - (left + width / 2);
      const y = e.clientY - (top + height / 2);

      btnX(x * 0.14);
      btnY(y * 0.14);

      textX(x * 0.24);
      textY(y * 0.24);
    };

    const onMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'power3.out' });
      gsap.to(inner, { x: 0, y: 0, duration: 0.7, ease: 'power3.out' });
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