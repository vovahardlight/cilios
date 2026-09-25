import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, ShieldCheck } from 'lucide-react';
import { content, Lang } from '../translations';

interface Props {
  lang: Lang;
  isOpen: boolean;
  preselectedService?: string;
  onClose: () => void;
}

export const BookingModal: React.FC<Props> = ({ lang, isOpen, preselectedService, onClose }) => {
  const [method, setMethod] = useState<'bizum' | 'card'>('bizum');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-900/75 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-sand-50 rounded-2xl p-6 md:p-8 shadow-2xl border border-sand-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-noir-700 hover:text-noir-900">
          <X className="w-5 h-5" />
        </button>

        {!confirmed ? (
          <div>
            <h3 className="text-2xl font-serif text-noir-900 mb-2">
              {lang === 'es' ? 'Reserva tu Cita' : 'Confirm Your Slot'}
            </h3>
            <p className="text-xs text-noir-700 mb-4">
              {preselectedService ? `${preselectedService}` : 'Selección de tratamiento de autor'}
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs uppercase font-semibold text-noir-700 mb-1">Nombre Completo</label>
                <input type="text" placeholder="Carmen García" className="w-full p-3 rounded-lg bg-sand-100 border border-sand-200 text-sm focus:outline-none focus:border-terracotta-500" />
              </div>
              <div>
                <label className="block text-xs uppercase font-semibold text-noir-700 mb-1">Teléfono / WhatsApp</label>
                <input type="tel" placeholder="+34 600 000 000" className="w-full p-3 rounded-lg bg-sand-100 border border-sand-200 text-sm focus:outline-none focus:border-terracotta-500" />
              </div>

              {/* Блок залога 20€ по стандартам Испании */}
              <div className="p-4 rounded-xl bg-sand-200/50 border border-sand-200">
                <div className="flex justify-between items-center text-xs font-semibold text-noir-900 mb-2">
                  <span>Señal de confirmación (Fianza):</span>
                  <span className="text-sm font-bold text-terracotta-500">20,00 €</span>
                </div>
                <p className="text-[11px] text-noir-700 leading-tight">
                  Se deduce del importe final el día del tratamiento. Cancelación gratuita hasta 24h antes.
                </p>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => setMethod('bizum')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition ${
                      method === 'bizum' ? 'bg-noir-900 text-sand-50 border-noir-900' : 'bg-sand-50 text-noir-800 border-sand-200'
                    }`}
                  >
                    Bizum
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod('card')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition flex items-center justify-center gap-1 ${
                      method === 'card' ? 'bg-noir-900 text-sand-50 border-noir-900' : 'bg-sand-50 text-noir-800 border-sand-200'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" /> Tarjeta
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setConfirmed(true)}
              className="w-full py-3.5 rounded-full bg-noir-900 hover:bg-noir-800 text-sand-50 text-xs font-semibold uppercase tracking-wider transition shadow-lg"
            >
              {lang === 'es' ? 'Pagar 20€ y Confirmar Cita' : 'Pay 20€ & Confirm Appointment'}
            </button>
          </div>
        ) : (
          <div className="text-center py-6">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h4 className="text-xl font-serif text-noir-900 font-bold mb-2">
              {lang === 'es' ? '¡Solicitud Recibida!' : 'Booking Request Received!'}
            </h4>
            <p className="text-xs text-noir-700 mb-4">
              {lang === 'es'
                ? 'Te hemos enviado los datos de Bizum por WhatsApp para validar tu reserva en menos de 10 minutos.'
                : 'We sent you the Bizum/Card details via WhatsApp to secure your booking slot.'}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full bg-sand-200 text-noir-900 text-xs font-semibold uppercase"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};