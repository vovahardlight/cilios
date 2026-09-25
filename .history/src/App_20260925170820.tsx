import React, { useState } from 'react';
import { content, Lang } from './translations';
import { BeforeAfter } from './components/BeforeAfter';
import { LashQuiz } from './components/LashQuiz';
import { BookingModal } from './components/BookingModal';
import { CookieBanner } from './components/CookieBanner';
import { StickyMobileBar } from './components/StickyMobileBar';
import { 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  MapPin, 
  Clock, 
  Check, 
  Star, 
  MessageCircle,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export function App() {
  const [lang, setLang] = useState<Lang>('es');
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');

  const t = content[lang];

  const handleSelectCaseFromSlider = (effectName: string) => {
    setSelectedService(effectName);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-sand-50 text-noir-900 font-sans selection:bg-terracotta-500 selection:text-white pb-20 md:pb-0">
      
      {/* 1. НАВИГАЦИЯ (HEADER) */}
      <header className="sticky top-0 z-40 bg-sand-50/80 backdrop-blur-md border-b border-sand-200/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="font-serif text-2xl tracking-wider text-noir-900 uppercase font-semibold">
            Lash Atelier
          </a>

          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-noir-700">
            <a href="#results" className="hover:text-noir-900 transition">{t.nav.results}</a>
            <a href="#services" className="hover:text-noir-900 transition">{t.nav.services}</a>
            <a href="#studio" className="hover:text-noir-900 transition">{t.footer.locationTitle}</a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Переключатель языков ES / EN */}
            <div className="flex items-center bg-sand-200/60 rounded-full p-1 text-xs font-semibold">
              <button 
                onClick={() => setLang('es')} 
                className={`px-2.5 py-1 rounded-full transition ${lang === 'es' ? 'bg-noir-900 text-sand-50' : 'text-noir-700'}`}
              >
                ES
              </button>
              <button 
                onClick={() => setLang('en')} 
                className={`px-2.5 py-1 rounded-full transition ${lang === 'en' ? 'bg-noir-900 text-sand-50' : 'text-noir-700'}`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => { setSelectedService(''); setIsBookingOpen(true); }}
              className="hidden md:inline-flex px-5 py-2.5 rounded-full bg-noir-900 text-sand-50 text-xs uppercase tracking-widest font-semibold hover:bg-terracotta-500 transition shadow-md"
            >
              {t.nav.book}
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Индикатор доступности */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {t.nav.spotsLeft}
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-noir-900 leading-[1.08] tracking-tight">
            {t.hero.titlePrimary} <br className="hidden sm:inline" />
            <span className="italic font-normal text-terracotta-500">{t.hero.titleSecondary}</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-noir-700 leading-relaxed font-normal">
            {t.hero.desc}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => { setSelectedService(''); setIsBookingOpen(true); }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-noir-900 text-sand-50 text-xs uppercase tracking-widest font-bold hover:bg-noir-800 transition shadow-xl"
            >
              {t.hero.ctaBook}
            </button>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-sand-200/80 hover:bg-sand-200 text-noir-900 text-xs uppercase tracking-widest font-bold transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-terracotta-500" />
              {t.hero.ctaQuiz}
            </button>
          </div>
        </div>
      </section>

      {/* 3. TRUST & PROOF BAR */}
      <section className="border-y border-sand-200 bg-sand-100 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-2xl md:text-3xl font-serif font-bold text-noir-900">{t.proof.years}</div>
            <div className="text-xs text-noir-700 mt-1">{t.proof.yearsDesc}</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-serif font-bold text-noir-900">{t.proof.retention}</div>
            <div className="text-xs text-noir-700 mt-1">{t.proof.retentionDesc}</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-serif font-bold text-noir-900">{t.proof.safety}</div>
            <div className="text-xs text-noir-700 mt-1">{t.proof.safetyDesc}</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-serif font-bold text-noir-900">{t.proof.comfort}</div>
            <div className="text-xs text-noir-700 mt-1">{t.proof.comfortDesc}</div>
          </div>
        </div>
      </section>

      {/* 4. ИНТЕРАКТИВНЫЙ СЛАЙДЕР «ANTES / DESPUÉS» */}
      <BeforeAfter lang={lang} onSelectCase={handleSelectCaseFromSlider} />

      {/* 5. МЕНЮ УСЛУГ И ПРАЙС-ЛИСТ */}
      <section id="services" className="py-24 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-noir-900">{t.pricing.title}</h2>
          <p className="mt-3 text-noir-700 text-sm md:text-base">{t.pricing.subtitle}</p>
        </div>

        <div className="space-y-4">
          {t.pricing.items.map((item, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-sand-100/60 border border-sand-200 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-terracotta-500/50 transition duration-300"
            >
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-xl font-bold text-noir-900">{item.name}</h3>
                  <span className="text-xs text-noir-700 bg-sand-200 px-2 py-0.5 rounded">{item.time}</span>
                </div>
                <p className="text-xs text-noir-700 mt-1">{item.desc}</p>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 pt-2 md:pt-0 border-t md:border-t-0 border-sand-200">
                <span className="text-2xl font-serif font-bold text-noir-900">{item.price}</span>
                <button
                  onClick={() => { setSelectedService(item.name); setIsBookingOpen(true); }}
                  className="px-5 py-2.5 rounded-full bg-noir-900 hover:bg-terracotta-500 text-sand-50 text-xs font-semibold uppercase tracking-wider transition"
                >
                  {t.nav.book}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Уведомление о залоге (испанская бизнес-норма) */}
        <div className="mt-8 p-4 rounded-xl bg-sand-200/50 text-center text-xs text-noir-700 border border-sand-200">
          <ShieldCheck className="w-4 h-4 text-terracotta-500 inline mr-1 -mt-0.5" />
          {t.pricing.depositNote}
        </div>
      </section>

      {/* 6. ЛОКАЦИЯ И СТУДИЯ */}
      <section id="studio" className="py-20 bg-sand-100 border-t border-sand-200">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold text-terracotta-500 mb-2">Madrid · Barrio de Salamanca</div>
            <h2 className="text-3xl md:text-4xl font-serif text-noir-900 mb-6">{t.footer.locationTitle}</h2>
            
            <div className="space-y-4 text-sm text-noir-700 mb-8">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-noir-900 shrink-0 mt-0.5" />
                <span>{t.footer.address}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-noir-900 shrink-0 mt-0.5" />
                <span>{t.footer.metro}</span>
              </div>
            </div>

            <a
              href="https://wa.me/34600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-widest font-semibold transition shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Studio Directo
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl aspect-video md:aspect-square bg-noir-800">
            <img 
              src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80" 
              alt="Estudio de pestañas interior" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 7. FOOTER С ЮРИДИЧЕСКИМИ ТРЕБОВАНИЯМИ ИСПАНИИ */}
      <footer className="py-12 bg-sand-50 border-t border-sand-200 text-center text-xs text-noir-700">
        <div className="max-w-4xl mx-auto px-6">
          <div className="font-serif text-lg font-bold text-noir-900 mb-3 uppercase">Lash Atelier Madrid</div>
          <p className="mb-4">{t.footer.legal}</p>
          <p className="text-noir-700/70">{t.footer.copy}</p>
        </div>
      </footer>

      {/* Интерактивные компоненты */}
      <LashQuiz lang={lang} isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      <BookingModal 
        lang={lang} 
        isOpen={isBookingOpen} 
        preselectedService={selectedService} 
        onClose={() => setIsBookingOpen(false)} 
      />
      <CookieBanner />
      <StickyMobileBar onOpenBooking={() => { setSelectedService(''); setIsBookingOpen(true); }} />

    </div>
  );
}
export default App;