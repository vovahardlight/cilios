import React, { useState, useEffect } from 'react';
import { content, type Lang } from '../translations';

interface Props {
  lang: Lang;
}

export const CookieBanner: React.FC<Props> = ({ lang }) => {
  const [isVisible, setIsVisible] = useState(false);
  const t = content[lang].cookies;

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (type: 'all' | 'rejected') => {
    localStorage.setItem('cookie_consent', type);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Gestión de cookies"
      className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-6 md:max-w-xl z-50 bg-sand-50 p-5 rounded-2xl shadow-2xl border border-sand-200 text-noir-900 text-xs"
    >
      <p className="leading-relaxed mb-4 text-noir-700">
        {t.text}
      </p>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleConsent('all')}
          className="py-2.5 px-4 rounded-lg bg-noir-900 text-sand-50 font-semibold text-center hover:bg-noir-800 transition"
        >
          {t.accept}
        </button>
        <button
          onClick={() => handleConsent('rejected')}
          className="py-2.5 px-4 rounded-lg bg-noir-900 text-sand-50 font-semibold text-center hover:bg-noir-800 transition"
        >
          {t.reject}
        </button>
      </div>
    </aside>
  );
};