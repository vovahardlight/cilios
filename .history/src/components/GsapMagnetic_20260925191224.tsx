import React, { useRef, useEffect } from 'react';
import gsap from 'gsap'

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const GsapMagnetic: React.FC<Props> = ({ children, onClick, className = '' }) => {
  const magnetRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = magnetRef.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.3, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.3, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - (left + width / 2)) * 0.3;
      const y = (e.clientY - (top + height / 2)) * 0.3;
      xTo(x);
      yTo(y);
    };

    const onMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <button ref={magnetRef} onClick={onClick} className={className}>
      {children}
    </button>
  );
};