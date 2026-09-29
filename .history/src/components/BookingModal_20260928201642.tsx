import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Smartphone, 
  ShieldCheck, 
  Lock, 
  Sparkles,
  ArrowRight,
  Calendar as CalendarIcon
} from 'lucide-react';
import { type Lang } from '../translations';

interface Props {
  lang: Lang;
  isOpen: boolean;
  preselectedService?: string;
  onClose: () => void;
}

export const BookingModal: React.FC<Props> = ({ lang, isOpen, preselectedService, onClose }) => {
  const [method, setMethod] = useState<'bizum' | 'card'>('bizum');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setConfirmed(true);
  };

  // Форматирование даты
  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const [year, month, day] = dateStr.split('-');
      const d = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return d.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      });
    } catch {
      return dateStr;
    }
  };

  // Быстрый выбор даты кнопками
  const setQuickDate = (daysFromNow: number) => {
    const target = new Date();
    target.setDate(target.getDate() + daysFromNow);
    const yyyy = target.getFullYear();
    const mm = String(target.getMonth() + 1).padStart(2, '0');
    const dd = String(target.getDate()).padStart(2, '0');
    setDate(`${yyyy}-${mm}-${dd}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* КОНТЕЙНЕР: rounded-[20px] И СПОКОЙНЫЙ BORDER */}
      <div className="relative w-full max-w-md bg-[#121110] border border-gold-500/20 rounded-[20px] p-5 sm:p-7 md:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.95)] text-cream-50 my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Кнопка закрытия */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-obsidian-850 border border-white/10 flex items-center justify-center text-cream-200/70 hover:text-white hover:border-gold-500/40 transition cursor-pointer"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmed ? (
          <form onSubmit={handleSubmit} className="min-w-0">
            {/* Шапка модалки */}
            <div className="pr-8 mb-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-[10px] uppercase tracking-widest font-semibold mb-2">
                <Sparkles className="w-3 h-3" />
                <span>{lang === 'es' ? 'Cita Exclusiva · Salamanca' : 'Private Appointment · Madrid'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-cream-100 font-light leading-snug">
                {lang === 'es' ? 'Reserva de Tratamiento' : 'Book Your Treatment'}
              </h3>
              <p className="text-xs text-cream-200/60 mt-1">
                {preselectedService 
                  ? `${lang === 'es' ? 'Servicio:' : 'Service:'} ` 
                  : (lang === 'es' ? 'Diseño fisionómico de pestañas' : 'Bespoke lash mapping')}
                {preselectedService && (
                  <strong className="text-gold-400 font-medium ml-1 block sm:inline">{preselectedService}</strong>
                )}
              </p>
            </div>

            {/* Поля ввода */}
            <div className="space-y-4 mb-5 min-w-0">
              {/* Имя */}
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-gold-400 font-medium mb-1.5">
                  {lang === 'es' ? 'Nombre y Apellidos *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === 'es' ? 'Ej. Carmen García' : 'e.g. Sophia Turner'}
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-850 border border-white/15 text-cream-50 placeholder:text-cream-200/30 text-sm font-medium focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition box-border"
                />
              </div>

              {/* Телефон / WhatsApp */}
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-gold-400 font-medium mb-1.5">
                  {lang === 'es' ? 'Teléfono / WhatsApp *' : 'Phone / WhatsApp *'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+34 600 00 00 00"
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-850 border border-white/15 text-cream-50 placeholder:text-cream-200/30 text-sm font-medium focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition box-border"
                />
              </div>

              {/* Поле выбора даты */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[11px] uppercase tracking-widest text-gold-400 font-medium">
                    {lang === 'es' ? 'Fecha de preferencia' : 'Preferred Date'}
                  </label>
                  {date && (
                    <span className="text-[11px] text-gold-300 font-medium capitalize">
                      {formatDisplayDate(date)}
                    </span>
                  )}
                </div>

                <div className="relative group">
                  <div className="w-full px-4 py-3 rounded-xl bg-obsidian-850 border border-white/15 group-hover:border-gold-400/50 flex items-center justify-between transition cursor-pointer">
                    <div className="flex items-center gap-2.5 truncate">
                      <CalendarIcon className="w-4 h-4 text-gold-400 shrink-0" />
                      <span className={`text-sm truncate ${date ? 'text-cream-50 font-medium capitalize' : 'text-cream-200/40'}`}>
                        {date ? formatDisplayDate(date) : (lang === 'es' ? 'Elegir día en el calendario' : 'Select appointment day')}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-gold-400 bg-gold-500/10 border border-gold-500/20 px-2 py-0.5 rounded-full shrink-0">
                      {date ? (lang === 'es' ? 'Cambiar' : 'Change') : (lang === 'es' ? 'Abrir' : 'Pick')}
                    </span>
                  </div>

                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 [color-scheme:dark]"
                  />
                </div>

                {/* Быстрые кнопки выбора дня */}
                <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                  <button
                    type="button"
                    onClick={() => setQuickDate(1)}
                    className="px-3 py-1 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 border border-white/10 text-[11px] text-cream-200/80 hover:text-gold-300 transition shrink-0 cursor-pointer"
                  >
                    {lang === 'es' ? 'Mañana' : 'Tomorrow'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickDate(2)}
                    className="px-3 py-1 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 border border-white/10 text-[11px] text-cream-200/80 hover:text-gold-300 transition shrink-0 cursor-pointer"
                  >
                    {lang === 'es' ? 'En 2 días' : 'In 2 days'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickDate(4)}
                    className="px-3 py-1 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 border border-white/10 text-[11px] text-cream-200/80 hover:text-gold-300 transition shrink-0 cursor-pointer"
                  >
                    {lang === 'es' ? 'Fin de semana' : 'Weekend'}
                  </button>
                </div>
              </div>

              {/* Блок залога */}
              <div className="p-4 rounded-[16px] bg-obsidian-850 border border-gold-500/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs uppercase tracking-wider font-semibold text-cream-200">
                    {lang === 'es' ? 'Señal de confirmación:' : 'Confirmation Deposit:'}
                  </span>
                  <span className="text-base font-bold text-gold-400">20,00 €</span>
                </div>
                
                <p className="text-[11px] text-cream-200/60 leading-tight mb-3">
                  {lang === 'es'
                    ? 'Se descuenta del total el día del tratamiento. Cancelación gratuita hasta 24h antes.'
                    : 'Deducted from final amount on treatment day. Free cancellation up to 24h prior.'}
                </p>

                {/* Кнопки Bizum / Tarjeta с мягким glow */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMethod('bizum')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-between cursor-pointer ${
                      method === 'bizum'
                        ? 'bg-gold-500/15 border-gold-400 text-gold-300 shadow-[0_0_8px_rgba(212,175,55,0.12)]'
                        : 'bg-obsidian-900 border-white/10 text-cream-200/60 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <Smartphone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span className="truncate">Bizum</span>
                    </div>
                    {method === 'bizum' && <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0 ml-1" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setMethod('card')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-between cursor-pointer ${
                      method === 'card'
                        ? 'bg-gold-500/15 border-gold-400 text-gold-300 shadow-[0_0_8px_rgba(212,175,55,0.12)]'
                        : 'bg-obsidian-900 border-white/10 text-cream-200/60 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <CreditCard className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span className="truncate">{lang === 'es' ? 'Tarjeta' : 'Card'}</span>
                    </div>
                    {method === 'card' && <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0 ml-1" />}
                  </button>
                </div>

                <div className="mt-2.5 text-[11px] text-cream-200/60 flex items-center gap-1.5 leading-tight">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                  {method === 'bizum' ? (
                    <span>
                      {lang === 'es' 
                        ? 'Recibirás la solicitud por Bizum al enviar los datos.'
                        : 'You will receive a direct Bizum payment request.'}
                    </span>
                  ) : (
                    <span>
                      {lang === 'es' 
                        ? 'Pasarela cifrada SSL 256-bit (Visa, Mastercard, Apple Pay).'
                        : '256-bit SSL encrypted secure payment gateway.'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Главная кнопка действия (уменьшенный благородный glow) */}
            <button
              type="submit"
              className="w-full py-3.5 sm:py-4 px-6 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-obsidian-950 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-[0_0_14px_rgba(212,175,55,0.18)] hover:shadow-[0_0_20px_rgba(212,175,55,0.28)] active:scale-[0.98] transition cursor-pointer"
            >
              <Lock className="w-4 h-4 text-obsidian-950 shrink-0" />
              <span className="truncate">
                {lang === 'es' ? 'Abonar 20€ y Confirmar Reserva' : 'Pay 20€ Deposit & Lock Slot'}
              </span>
              <ArrowRight className="w-4 h-4 text-obsidian-950 shrink-0" />
            </button>
          </form>
        ) : (
          /* Экран подтверждения */
          <div className="text-center py-4 sm:py-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gold-500/10 border border-gold-500/40 text-gold-400 mx-auto flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <h4 className="text-xl sm:text-2xl font-serif text-cream-100 font-light mb-2">
              {lang === 'es' ? '¡Solicitud Registrada con Éxito!' : 'Appointment Pre-Booked!'}
            </h4>

            <p className="text-xs text-cream-200/70 max-w-sm mx-auto mb-6 leading-relaxed">
              {lang === 'es'
                ? `Gracias, ${name}. Te hemos enviado los detalles para validar tu fianza de 20€ vía ${method === 'bizum' ? 'Bizum' : 'Tarjeta'} a tu WhatsApp (${phone}).`
                : `Thank you, ${name}. We sent the 20€ reservation instructions via ${method === 'bizum' ? 'Bizum' : 'Card'} to your WhatsApp (${phone}).`}
            </p>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-obsidian-850 border border-gold-500/30 hover:bg-obsidian-800 text-gold-300 text-xs uppercase tracking-widest font-semibold transition cursor-pointer"
            >
              {lang === 'es' ? 'Cerrar y Volver al Estudio' : 'Return to Website'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};