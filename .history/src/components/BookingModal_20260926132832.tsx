import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Smartphone, 
  ShieldCheck, 
  Lock, 
  Calendar, 
  Sparkles,
  ArrowRight
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* 100% НЕПРОЗРАЧНЫЙ ЛЮКСОВЫЙ КОНТЕЙНЕР ОБСИДИАН & ЗОЛОТО */}
      <div className="relative w-full max-w-lg bg-[#121110] border border-gold-500/30 rounded-3xl p-6 md:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.95)] text-cream-50 my-auto">
        
        {/* Кнопка закрытия */}
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-obsidian-850 border border-white/10 flex items-center justify-center text-cream-200/70 hover:text-white hover:border-gold-500/50 transition"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmed ? (
          <form onSubmit={handleSubmit}>
            {/* Заголовок */}
            <div className="pr-8 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-[10px] uppercase tracking-widest font-semibold mb-2">
                <Sparkles className="w-3 h-3" />
                {lang === 'es' ? 'Cita Exclusiva · Salamanca' : 'Private Appointment · Madrid'}
              </div>
              <h3 className="text-2xl md:text-3xl font-serif text-cream-100 font-light">
                {lang === 'es' ? 'Reserva de Tratamiento' : 'Book Your Treatment'}
              </h3>
              <p className="text-xs text-cream-200/60 mt-1">
                {preselectedService 
                  ? `${lang === 'es' ? 'Servicio seleccionado:' : 'Selected service:'} ` 
                  : (lang === 'es' ? 'Diseño fisionómico de pestañas' : 'Bespoke lash mapping')}
                {preselectedService && (
                  <strong className="text-gold-400 font-medium ml-1">{preselectedService}</strong>
                )}
              </p>
            </div>

            {/* Поля ввода (ЧЕТКИЙ ИНПУТ С 100% ВИДИМЫМ ТЕКСТОМ) */}
            <div className="space-y-4 mb-6">
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
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-850 border border-white/15 text-cream-50 placeholder:text-cream-200/30 text-sm font-medium focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    className="w-full px-4 py-3 rounded-xl bg-obsidian-850 border border-white/15 text-cream-50 placeholder:text-cream-200/30 text-sm font-medium focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-gold-400 font-medium mb-1.5">
                    {lang === 'es' ? 'Fecha de preferencia' : 'Preferred Date'}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-obsidian-850 border border-white/15 text-cream-50 text-sm font-medium focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* БЛОК СНЯТИЯ ЗАЛОГА И ВЫБОРА ОПЛАТЫ */}
              <div className="p-4 rounded-2xl bg-obsidian-850 border border-gold-500/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs uppercase tracking-wider font-semibold text-cream-200">
                    {lang === 'es' ? 'Señal de confirmación (Fianza):' : 'Booking Confirmation Fee:'}
                  </span>
                  <span className="text-base font-bold text-gold-400">20,00 €</span>
                </div>
                
                <p className="text-[11px] text-cream-200/60 leading-tight mb-4">
                  {lang === 'es'
                    ? 'Se descuenta del total el día del tratamiento. Cancelación gratuita hasta 24h antes.'
                    : 'Deducted from the final amount on treatment day. Free cancellation up to 24h prior.'}
                </p>

                {/* ИНТЕРАКТИВНЫЕ ПЕРЕКЛЮЧАТЕЛИ BIZUM / TARJETA */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setMethod('bizum')}
                    className={`py-3 px-4 rounded-xl text-xs font-bold border transition flex items-center justify-between ${
                      method === 'bizum'
                        ? 'bg-gold-500/15 border-gold-400 text-gold-300 shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                        : 'bg-obsidian-900 border-white/10 text-cream-200/60 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-gold-400" />
                      <span>Bizum</span>
                    </div>
                    {method === 'bizum' && <CheckCircle2 className="w-4 h-4 text-gold-400" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setMethod('card')}
                    className={`py-3 px-4 rounded-xl text-xs font-bold border transition flex items-center justify-between ${
                      method === 'card'
                        ? 'bg-gold-500/15 border-gold-400 text-gold-300 shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                        : 'bg-obsidian-900 border-white/10 text-cream-200/60 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gold-400" />
                      <span>{lang === 'es' ? 'Tarjeta' : 'Card / Apple Pay'}</span>
                    </div>
                    {method === 'card' && <CheckCircle2 className="w-4 h-4 text-gold-400" />}
                  </button>
                </div>

                {/* Динамическая подсказка по выбранному методу */}
                <div className="mt-3 text-[11px] text-cream-200/60 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                  {method === 'bizum' ? (
                    <span>
                      {lang === 'es' 
                        ? 'Recibirás la solicitud directa por Bizum al confirmar los datos.'
                        : 'You will receive a direct Bizum request to your Spanish phone.'}
                    </span>
                  ) : (
                    <span>
                      {lang === 'es' 
                        ? 'Pasarela bancaria cifrada SSL 256-bit (Visa, Mastercard, Amex).'
                        : '256-bit SSL encrypted secure payment (Visa, Mastercard, Apple Pay).'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* НАСТОЯЩАЯ АКЦЕНТНАЯ КНОПКА (ЗОЛОТОЙ ГРАДИЕНТ, ОБЪЕМ, ТЕНЬ) */}
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-obsidian-950 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-obsidian-950" />
              <span>
                {lang === 'es' ? 'Abonar 20€ y Confirmar Reserva' : 'Pay 20€ Deposit & Lock Slot'}
              </span>
              <ArrowRight className="w-4 h-4 text-obsidian-950" />
            </button>
          </form>
        ) : (
          /* ЭКРАН УСПЕШНОГО ПОДТВЕРЖДЕНИЯ */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/40 text-gold-400 mx-auto flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="text-2xl font-serif text-cream-100 font-light mb-2">
              {lang === 'es' ? '¡Solicitud Registrada con Éxito!' : 'Appointment Pre-Booked!'}
            </h4>

            <p className="text-xs text-cream-200/70 max-w-sm mx-auto mb-6 leading-relaxed">
              {lang === 'es'
                ? `Gracias, ${name}. Te hemos enviado los detalles para validar tu fianza de 20€ vía ${method === 'bizum' ? 'Bizum' : 'Tarjeta'} a tu WhatsApp (${phone}).`
                : `Thank you, ${name}. We sent the 20€ reservation instructions via ${method === 'bizum' ? 'Bizum' : 'Card'} to your WhatsApp (${phone}).`}
            </p>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-obsidian-850 border border-gold-500/30 hover:bg-obsidian-800 text-gold-300 text-xs uppercase tracking-widest font-semibold transition"
            >
              {lang === 'es' ? 'Cerrar y Volver al Estudio' : 'Return to Website'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};