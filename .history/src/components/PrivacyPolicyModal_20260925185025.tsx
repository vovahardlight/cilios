import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, ArrowLeft, Scale, Lock, FileText } from 'lucide-react';
import { type Lang } from '../translations';

interface Props {
  lang: Lang;
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<Props> = ({ lang, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-obsidian-950/90 backdrop-blur-xl flex justify-center overflow-y-auto p-4 md:p-8"
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-obsidian-900 border border-gold-500/20 rounded-3xl p-6 md:p-12 text-cream-100 shadow-[0_25px_80px_rgba(0,0,0,0.9)] my-auto"
        >
          {/* Верхняя панель закрытия */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-400 hover:text-gold-300 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              {lang === 'es' ? 'Volver al estudio' : 'Back to website'}
            </button>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-obsidian-800 border border-white/10 flex items-center justify-center text-cream-200 hover:text-white transition"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Заголовок */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Scale className="w-3.5 h-3.5" />
              RGPD (UE 2016/679) & LOPDGDD 3/2018
            </div>
            <h1 className="text-3xl md:text-5xl font-serif text-cream-50 font-light">
              {lang === 'es' ? 'Política de Privacidad y Protección de Datos' : 'Privacy & Data Protection Policy'}
            </h1>
            <p className="mt-2 text-xs text-cream-200/50">
              {lang === 'es' ? 'Última actualización: Septiembre 2026' : 'Last updated: September 2026'}
            </p>
          </div>

          {/* Тело документа (ES / EN) */}
          <div className="space-y-8 text-xs md:text-sm text-cream-200/80 leading-relaxed font-light">
            {lang === 'es' ? (
              <>
                {/* 1. Responsable */}
                <section className="bg-obsidian-850 p-6 rounded-2xl border border-white/5">
                  <h2 className="text-base font-serif font-bold text-gold-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> 1. Responsable del Tratamiento
                  </h2>
                  <ul className="space-y-1 text-cream-200/70">
                    <li><strong className="text-cream-100">Identidad / Razón Social:</strong> Lash Atelier Madrid (Titular: Dña. Elena V. Ramos)</li>
                    <li><strong className="text-cream-100">NIF / NIE:</strong> B-89234120 / Y-9821432-X</li>
                    <li><strong className="text-cream-100">Dirección:</strong> Calle de Velázquez 48, 1º Izquierda, Barrio de Salamanca, 28001 Madrid, España</li>
                    <li><strong className="text-cream-100">Email de contacto:</strong> legal@lashateliermadrid.es</li>
                    <li><strong className="text-cream-100">Actividad:</strong> Servicios estéticos y de embellecimiento de la mirada.</li>
                  </ul>
                </section>

                {/* 2. Finalidad */}
                <section>
                  <h2 className="text-base font-serif font-bold text-cream-100 uppercase tracking-wider mb-3">
                    2. ¿Con qué finalidad tratamos sus datos personales?
                  </h2>
                  <p>Tratamos la información que nos facilitan las personas interesadas con los siguientes fines:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-cream-200/70">
                    <li><strong>Gestión de reservas y citas:</strong> Coordinación de horarios, recordatorios automáticos de cita mediante WhatsApp o SMS y confirmación de asistencia.</li>
                    <li><strong>Gestión contable y facturación:</strong> Emisión de facturas y cobro de la fianza/depósito de reserva (vía Bizum o pasarela bancaria).</li>
                    <li><strong>Ficha técnica de seguridad:</strong> Registro de posibles sensibilidades oculares, alergias previas a adhesivos de cianoacrilato y curvaturas aplicadas para garantizar la salud ocular.</li>
                  </ul>
                </section>

                {/* 3. Legitimación */}
                <section>
                  <h2 className="text-base font-serif font-bold text-cream-100 uppercase tracking-wider mb-3">
                    3. Legitimación para el tratamiento
                  </h2>
                  <p>La base jurídica que legitima el tratamiento de sus datos es:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-cream-200/70">
                    <li><strong>Ejecución de un contrato / prestación de servicios (Art. 6.1.b RGPD):</strong> Necesario para gestionar su cita y aplicar el tratamiento solicitado.</li>
                    <li><strong>Consentimiento expreso (Art. 6.1.a RGPD):</strong> Al completar el formulario de contacto, quiz o escribirnos por WhatsApp.</li>
                    <li><strong>Obligación legal (Art. 6.1.c RGPD):</strong> Conservación de facturas según la legislación tributaria española.</li>
                  </ul>
                </section>

                {/* 4. Conservación y Destinatarios */}
                <section>
                  <h2 className="text-base font-serif font-bold text-cream-100 uppercase tracking-wider mb-3">
                    4. Conservación de datos y Destinatarios
                  </h2>
                  <p>
                    Los datos se conservarán durante el tiempo estrictamente necesario para la prestación del servicio y los plazos legalmente exigidos (hasta 5 años por responsabilidades fiscales y mercantiles).
                  </p>
                  <p className="mt-2">
                    Sus datos no se cederán a terceros ajenos, salvo a encargados de tratamiento estrictamente necesarios bajo acuerdos de confidencialidad y servidores en la UE:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-cream-200/70">
                    <li>Proveedores de software de gestión y agenda (Fresha / Treatwell / Stripe / Bizum).</li>
                    <li>Meta Platforms Ireland Ltd. (comunicaciones cifradas a través de WhatsApp Business API).</li>
                    <li>Asesoría contable y fiscal según normativa vigente en España.</li>
                  </ul>
                </section>

                {/* 5. Derechos ARCO */}
                <section className="bg-obsidian-850 p-6 rounded-2xl border border-white/5">
                  <h2 className="text-base font-serif font-bold text-gold-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Lock className="w-4 h-4" /> 5. Sus Derechos como Usuario
                  </h2>
                  <p className="mb-2">Tiene derecho a ejercer en cualquier momento sus derechos de:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-medium text-cream-100 mb-4">
                    <span className="bg-obsidian-800 p-2 rounded text-center">Acceso</span>
                    <span className="bg-obsidian-800 p-2 rounded text-center">Rectificación</span>
                    <span className="bg-obsidian-800 p-2 rounded text-center">Supresión (Olvido)</span>
                    <span className="bg-obsidian-800 p-2 rounded text-center">Limitación</span>
                    <span className="bg-obsidian-800 p-2 rounded text-center">Portabilidad</span>
                    <span className="bg-obsidian-800 p-2 rounded text-center">Oposición</span>
                  </div>
                  <p className="text-cream-200/70 text-xs">
                    Para ejercerlos, envíe una solicitud por escrito adjuntando fotocopia de su DNI/NIE al correo: <a href="mailto:legal@lashateliermadrid.es" className="text-gold-400 underline">legal@lashateliermadrid.es</a> con el asunto "Protección de Datos".
                  </p>
                  <p className="mt-2 text-cream-200/70 text-xs">
                    Asimismo, le informamos de su derecho a presentar una reclamación ante la autoridad de control competente si considera vulnerados sus derechos: <strong>Agencia Española de Protección de Datos (AEPD)</strong> en <a href="https://www.aepd.es" target="_blank" rel="noreferrer" className="text-gold-400 underline">www.aepd.es</a> (C/ Jorge Juan 6, 28001 Madrid).
                  </p>
                </section>
              </>
            ) : (
              <>
                {/* Версия на английском (EN) */}
                <section className="bg-obsidian-850 p-6 rounded-2xl border border-white/5">
                  <h2 className="text-base font-serif font-bold text-gold-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> 1. Data Controller
                  </h2>
                  <ul className="space-y-1 text-cream-200/70">
                    <li><strong className="text-cream-100">Identity:</strong> Lash Atelier Madrid (Owner: Ms. Elena V. Ramos)</li>
                    <li><strong className="text-cream-100">Tax ID / NIF:</strong> B-89234120 / Y-9821432-X</li>
                    <li><strong className="text-cream-100">Address:</strong> Calle de Velázquez 48, 1st Floor, Salamanca, 28001 Madrid, Spain</li>
                    <li><strong className="text-cream-100">Contact Email:</strong> legal@lashateliermadrid.es</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-base font-serif font-bold text-cream-100 uppercase tracking-wider mb-3">
                    2. Purpose of Data Processing
                  </h2>
                  <p>We process personal data provided by clients for:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-cream-200/70">
                    <li>Scheduling and managing lash appointments, sending automated WhatsApp/SMS reminders.</li>
                    <li>Invoicing and handling booking fee deposits (via Bizum or Stripe/Card).</li>
                    <li>Safety client records: tracking sensitivity and eye conditions to safeguard ocular health.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-base font-serif font-bold text-cream-100 uppercase tracking-wider mb-3">
                    3. Legal Basis & Rights
                  </h2>
                  <p>
                    Data processing is grounded in contract performance (Article 6.1.b GDPR), explicit client consent (Article 6.1.a GDPR), and Spanish tax obligations.
                  </p>
                  <p className="mt-2">
                    You hold rights of access, rectification, erasure, restriction, and portability. You may also file a formal complaint with the Spanish Data Protection Agency (<strong>AEPD</strong>) at <a href="https://www.aepd.es" target="_blank" rel="noreferrer" className="text-gold-400 underline">www.aepd.es</a>.
                  </p>
                </section>
              </>
            )}
          </div>

          {/* Нижняя кнопка */}
          <div className="mt-10 pt-6 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-xs font-bold uppercase tracking-widest transition"
            >
              {lang === 'es' ? 'Entendido y Aceptar' : 'Understood & Close'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};