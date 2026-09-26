import React, { useState } from 'react';
import { Sparkles, MessageCircle, X, ArrowRight, RotateCcw, Check } from 'lucide-react';
import { content, type Lang } from '../translations';

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
      setStep(3); // Финальный экран с результатом
    }
  };

  const handleReset = () => {
    setStep(1);
    setAnswers([]);
  };

  const getRecommendation = () => {
    if (answers[0] === 'eyeliner') return 'Efecto Foxy & Eyeliner';
    if (answers[0] === 'nat') return 'Pelo a Pelo Clásico Nude';
    return 'Efecto Mojado (Wet Look Signature)';
  };

  const openWhatsApp = () => {
    const effect = getRecommendation();
    const message = encodeURIComponent(
      lang === 'es'
        ? `¡Hola! He completado el test fisionómico en vuestra web y me ha recomendado el *${effect}*. ¿Tenéis disponibilidad esta semana en el estudio de Salamanca?`
        : `Hello! I completed the lash quiz on your website and got matched with *${effect}*. Do you have availability this week at the Salamanca studio?`
    );
    window.open(`https://wa.me/34614678720?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* 100% НЕПРОЗРАЧНЫЙ ЛЮКСОВЫЙ КОНТЕЙНЕР (ОБСИДИАН & ЗОЛОТО) */}
      <div className="relative w-full max-w-lg bg-[#121110] border border-gold-500/30 rounded-3xl p-6 md:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.95)] text-cream-50 my-auto">
        
        {/* Кнопка закрытия */}
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-obsidian-850 border border-white/10 flex items-center justify-center text-cream-200/70 hover:text-white hover:border-gold-500/50 transition cursor-pointer"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {step < 3 ? (
          <div>
            {/* Индикатор прогресса шагов */}
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-[11px] uppercase tracking-widest font-semibold">
                <Sparkles className="w-3 h-3" />
                <span>{t.step} {step} de 2</span>
              </div>
              <div className="flex gap-1.5">
                <span className={`w-8 h-1 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-gold-500' : 'bg-white/10'}`} />
                <span className={`w-8 h-1 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-gold-500' : 'bg-white/10'}`} />
              </div>
            </div>

            {/* Вопрос */}
            <h3 className="text-xl md:text-2xl font-serif text-cream-100 font-light mb-6 leading-snug">
              {step === 1 ? t.q1 : t.q2}
            </h3>

            {/* Варианты ответов */}
            <div className="space-y-3">
              {step === 1 ? (
                <>
                  <button 
                    onClick={() => handleSelect('nat')} 
                    className="w-full text-left p-4.5 px-5 rounded-2xl bg-obsidian-850 hover:bg-obsidian-800 border border-white/10 hover:border-gold-400/50 text-cream-100 text-sm font-medium transition-all duration-200 flex items-center justify-between group active:scale-[0.99] cursor-pointer"
                  >
                    <span>{t.q1_a}</span>
                    <ArrowRight className="w-4 h-4 text-cream-200/40 group-hover:text-gold-400 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                  </button>
                  <button 
                    onClick={() => handleSelect('mascara')} 
                    className="w-full text-left p-4.5 px-5 rounded-2xl bg-obsidian-850 hover:bg-obsidian-800 border border-white/10 hover:border-gold-400/50 text-cream-100 text-sm font-medium transition-all duration-200 flex items-center justify-between group active:scale-[0.99] cursor-pointer"
                  >
                    <span>{t.q1_b}</span>
                    <ArrowRight className="w-4 h-4 text-cream-200/40 group-hover:text-gold-400 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                  </button>
                  <button 
                    onClick={() => handleSelect('eyeliner')} 
                    className="w-full text-left p-4.5 px-5 rounded-2xl bg-obsidian-850 hover:bg-obsidian-800 border border-white/10 hover:border-gold-400/50 text-cream-100 text-sm font-medium transition-all duration-200 flex items-center justify-between group active:scale-[0.99] cursor-pointer"
                  >
                    <span>{t.q1_c}</span>
                    <ArrowRight className="w-4 h-4 text-cream-200/40 group-hover:text-gold-400 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => handleSelect('short')} 
                    className="w-full text-left p-4.5 px-5 rounded-2xl bg-obsidian-850 hover:bg-obsidian-800 border border-white/10 hover:border-gold-400/50 text-cream-100 text-sm font-medium transition-all duration-200 flex items-center justify-between group active:scale-[0.99] cursor-pointer"
                  >
                    <span>{t.q2_a}</span>
                    <ArrowRight className="w-4 h-4 text-cream-200/40 group-hover:text-gold-400 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                  </button>
                  <button 
                    onClick={() => handleSelect('fine')} 
                    className="w-full text-left p-4.5 px-5 rounded-2xl bg-obsidian-850 hover:bg-obsidian-800 border border-white/10 hover:border-gold-400/50 text-cream-100 text-sm font-medium transition-all duration-200 flex items-center justify-between group active:scale-[0.99] cursor-pointer"
                  >
                    <span>{t.q2_b}</span>
                    <ArrowRight className="w-4 h-4 text-cream-200/40 group-hover:text-gold-400 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                  </button>
                  <button 
                    onClick={() => handleSelect('normal')} 
                    className="w-full text-left p-4.5 px-5 rounded-2xl bg-obsidian-850 hover:bg-obsidian-800 border border-white/10 hover:border-gold-400/50 text-cream-100 text-sm font-medium transition-all duration-200 flex items-center justify-between group active:scale-[0.99] cursor-pointer"
                  >
                    <span>{t.q2_c}</span>
                    <ArrowRight className="w-4 h-4 text-cream-200/40 group-hover:text-gold-400 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          /* ФИНАЛЬНЫЙ ЭКРАН С РЕЗУЛЬТАТОМ */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/40 text-gold-400 mx-auto flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="text-[11px] uppercase tracking-widest text-gold-400 font-semibold mb-2">
              {t.resultTitle}
            </div>

            <h4 className="text-2xl sm:text-3xl font-serif text-cream-100 font-bold mb-3">
              {getRecommendation()}
            </h4>

            <p className="text-xs sm:text-sm text-cream-200/70 max-w-sm mx-auto mb-8 leading-relaxed font-light">
              {t.resultDesc} <strong className="text-cream-100 font-medium">{getRecommendation()}</strong>. Realza la fisionomía de tu ojo sin sobrecargar la pestaña natural.
            </p>

            {/* Кнопка WhatsApp */}
            <button
              onClick={openWhatsApp}
              className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] active:scale-[0.98] transition cursor-pointer mb-3"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.bookViaWa}</span>
            </button>

            {/* Кнопка перепройти тест */}
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-cream-200/50 hover:text-gold-400 transition cursor-pointer py-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{lang === 'es' ? 'Repetir el test' : 'Retake test'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};