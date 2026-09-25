import React from 'react';
import { Calendar, MessageCircle } from 'lucide-react';

interface Props {
  onOpenBooking: () => void;
}

export const StickyMobileBar: React.FC<Props> = ({ onOpenBooking }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-sand-50/90 backdrop-blur-lg border-t border-sand-200 p-3 px-4 flex gap-3 shadow-lg">
      <button
        onClick={onOpenBooking}
        className="flex-1 flex items-center justify-center gap-2 py-3 bg-noir-900 text-sand-50 rounded-full text-xs font-semibold uppercase tracking-wider shadow"
      >
        <Calendar className="w-4 h-4" />
        Reservar Cita
      </button>
      <a
        href="https://wa.me/34600000000?text=Hola,%20quisiera%20pedir%20información%20para%20una%20cita"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center bg-emerald-600 text-white rounded-full shadow"
        aria-label="WhatsApp Directo"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
    </div>
  );
};