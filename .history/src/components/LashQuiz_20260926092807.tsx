import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle, X } from 'lucide-react';
import { content,type Lang } from '../translations';

interface Props {
  lang: Lang;
  isOpen: boolean;
  onClose: () => void;
}

export const LashQuiz: React.FC<Props> = ({ lang, isOpen, onClose }) => {
  const t = content[lang].quiz;
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleSelect = (ans: string) => {
    const updated = [...answers, ans];
    setAnswers(updated);
    if (step < 2) {
      setStep(step + 1);
    } else {
      setStep(3); // Финал
    }
  };

  const getRecommendation = () => {
    if (answers[0]?.includes('eyeliner')) return 'Efecto Foxy Eyeliner';
    if (answers[0]?.includes('naturalidad')) return 'Pelo a Pelo Clásico Nude';
    return 'Efecto Mojado (Wet Look)';
  };

  const openWhatsApp = () => {
    const effect = getRecommendation();
    const message = encodeURIComponent(
      lang === 'es'
        ? `¡Hola! Hice el test de pestañas en vuestra web y me ha recomendado el *${effect}*. ¿Tenéis hueco disponible esta semana?`
        : `Hi! I took the lash quiz on your website and got matched with the *${effect}*. Do you have any open slots this week?`
    );
    window.open(`https://wa.me/34614678720?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-900/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-sand-50 rounded-2xl p-6 md:p-8 shadow-2xl border border-sand-200">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-noir-700 hover:text-noir-900"
        >
          <X className="w-5 h-5" />
        </button>

        {step < 3 ? (
          <div>
            <div className="text-xs font-semibold text-terracotta-500 uppercase tracking-widest mb-1">
              {t.step} {step} de 2
            </div>
            <h3 className="text-xl md:text-2xl font-serif text-noir-900 mb-6">
              {step === 1 ? t.q1 : t.q2}
            </h3>

            <div className="space-y-3">
              {step === 1 ? (
                <>
                  <button onClick={() => handleSelect('nat')} className="w-full text-left p-4 rounded-xl bg-sand-100 hover:bg-sand-200 text-sm font-medium text-noir-800 transition">
                    {t.q1_a}
                  </button>
                  <button onClick={() => handleSelect('mascara')} className="w-full text-left p-4 rounded-xl bg-sand-100 hover:bg-sand-200 text-sm font-medium text-noir-800 transition">
                    {t.q1_b}
                  </button>
                  <button onClick={() => handleSelect('eyeliner')} className="w-full text-left p-4 rounded-xl bg-sand-100 hover:bg-sand-200 text-sm font-medium text-noir-800 transition">
                    {t.q1_c}
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => handleSelect('short')} className="w-full text-left p-4 rounded-xl bg-sand-100 hover:bg-sand-200 text-sm font-medium text-noir-800 transition">
                    {t.q2_a}
                  </button>
                  <button onClick={() => handleSelect('fine')} className="w-full text-left p-4 rounded-xl bg-sand-100 hover:bg-sand-200 text-sm font-medium text-noir-800 transition">
                    {t.q2_b}
                  </button>
                  <button onClick={() => handleSelect('normal')} className="w-full text-left p-4 rounded-xl bg-sand-100 hover:bg-sand-200 text-sm font-medium text-noir-800 transition">
                    {t.q2_c}
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-sand-200 text-terracotta-500 mx-auto flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="text-xs uppercase text-noir-700 tracking-wider">{t.resultTitle}</div>
            <div className="text-2xl font-serif font-bold text-noir-900 mt-2 mb-3">
              {getRecommendation()}
            </div>
            <p className="text-xs text-noir-700 mb-6">
              {t.resultDesc} {getRecommendation()}.
            </p>
            <button
              onClick={openWhatsApp}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              {t.bookViaWa}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};