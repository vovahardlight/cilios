import React, { useState, useEffect } from 'react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

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
      className="fixed bottom-4 left-4 right-4 md:left-6 md:max-w-xl z-50 bg-sand-50 p-5 rounded-2xl shadow-2xl border border-sand-200 text-noir-900 text-xs"
    >
      <p className="leading-relaxed mb-4 text-noir-700">
        Utilizamos cookies técnicas y analíticas para optimizar tu experiencia y analizar el tráfico de acuerdo con las directrices de la <strong>AEPD</strong>. Puedes aceptar todas o rechazarlas en bloque.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {/* Кнопки одинакового веса согласно регламенту Испании */}
        <button
          onClick={() => handleConsent('all')}
          className="py-2.5 px-4 rounded-lg bg-noir-900 text-sand-50 font-semibold text-center hover:bg-noir-800 transition"
        >
          Aceptar todas
        </button>
        <button
          onClick={() => handleConsent('rejected')}
          className="py-2.5 px-4 rounded-lg bg-noir-900 text-sand-50 font-semibold text-center hover:bg-noir-800 transition"
        >
          Rechazar todas
        </button>
      </div>
    </aside>
  );
};