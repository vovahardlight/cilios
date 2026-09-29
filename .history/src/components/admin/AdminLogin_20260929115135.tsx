import React, { useState } from 'react';
import { Lock, X, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

export const AdminLogin: React.FC<Props> = ({ isOpen, onSuccess, onClose }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  // ПИН-КОД ПО УМОЛЧАНИЮ: 2026 (можете изменить на свой)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '2026' || pin === 'admin') {
      onSuccess();
      setPin('');
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-sm bg-[#121110] border border-gold-500/30 rounded-[20px] p-6 shadow-2xl text-cream-50 text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-cream-200/50 hover:text-white">
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 mx-auto flex items-center justify-center mb-4">
          <Lock className="w-5 h-5" />
        </div>

        <h3 className="font-serif text-xl text-cream-100 mb-1">Acceso Administrativo</h3>
        <p className="text-xs text-cream-200/50 mb-5">Introduce el código PIN para gestionar la web</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            autoFocus
            maxLength={8}
            value={pin}
            onChange={(e) => { setPin(e.target.value); setError(false); }}
            placeholder="PIN (por defecto: 2026)"
            className="w-full text-center tracking-[0.3em] font-mono text-lg p-3 rounded-xl bg-obsidian-850 border border-white/10 text-gold-300 focus:border-gold-400 focus:outline-none"
          />

          {error && (
            <p className="text-xs text-red-400">PIN incorrecto. Inténtalo de nuevo.</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-1.5 transition"
          >
            <span>Entrar al Panel</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};