import React from 'react';
import { Calendar, MessageCircle } from 'lucide-react';
import { content, type Lang } from '../translations';

interface Props {
  lang: Lang;
  onOpenBooking: () => void;
}

export const StickyMobileBar: React.FC<Props> = ({ lang, onOpenBooking }) => {
  const t = content[lang];

  // Динамическое сообщение для WhatsApp на нужном языке
  const waMessage = encodeURIComponent(
    lang === 'es'
      ? '¡Hola! Me gustaría consultar disponibilidad para reservar una cita.'
      : 'Hello! I would like to check availability to book an appointment.'
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-obsidian-950/90 backdrop-blur-xl border-t border-white/10 p-3 px-4 flex gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
      {/* Кнопка записи — теперь меняет язык: "Reservar Cita" / "Book Appointment" */}
      <button
        onClick={onOpenBooking}
        className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gold-500 active:bg-gold-400 text-obsidian-950 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg active:scale-95 transition"
      >
        <Calendar className="w-4 h-4" />
        {t.nav.book}
      </button>

      {/* Кнопка быстрого WhatsApp */}
      <a
        href={`https://wa.me/34614678720?text=${waMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center bg-emerald-600 active:bg-emerald-500 text-white rounded-full shadow-lg active:scale-95 transition shrink-0"
        aria-label="WhatsApp Directo"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
    </div>
  );
};