import React, { useState, useEffect, useRef } from 'react';
import { content, type Lang } from './translations';
import { Preloader } from './components/Preloader';
import { AmbientCanvas } from './components/AmbientCanvas';
import { BeforeAfter } from './components/BeforeAfter';
import { LashQuiz } from './components/LashQuiz';
import { BookingModal } from './components/BookingModal';
import { CookieBanner } from './components/CookieBanner';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { StickyMobileBar } from './components/StickyMobileBar';
import { GsapCursor } from './components/GsapCursor';
import { GsapMagnetic } from './components/GsapMagnetic';

import { Sparkles, MapPin, Clock, ShieldCheck, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [lang, setLang] = useState<Lang>('es');
  const [isLoading, setIsLoading] = useState(true);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');

  const t = content[lang];
  const mainRef = useRef<HTMLDivElement>(null);

  // СБОРКА ВСЕХ СЦЕН GSAP SCROLLTRIGGER
  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      // 1. ПАРАЛЛАКС HERO С ЭФФЕКТОМ SCRUB (Привязка к физике скролла)
      gsap.to('.gsap-hero-title', {
        y: -60,
        opacity: 0.3,
        scrollTrigger: {
          trigger: '.gsap-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // 2. РЕДАКТОРСКИЙ ВЫЛЕТ СТРОК ИЗ МАСОК (Masked Text Reveal)
      gsap.utils.toArray<HTMLElement>('.gsap-reveal-text').forEach((text) => {
        gsap.fromTo(
          text,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: text,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 3. СТАГГЕР БЛОКА ЦИФР
      gsap.fromTo(
        '.gsap-stat-item',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-stats',
            start: 'top 85%',
          },
        }
      );

      // 4. КАСКАД КАРТОЧЕК ПРАЙСА С ГЛУБИНОЙ
      gsap.fromTo(
        '.gsap-service-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-services-list',
            start: 'top 80%',
          },
        }
      );

      // 5. ПАРАЛЛАКС МАКРО-ФОТОГРАФИИ СТУДИИ (Масштаб при скролле)
      gsap.fromTo(
        '.gsap-studio-img',
        { scale: 1.25 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: '.gsap-studio',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );
    }, mainRef);

    return () => ctx.revert(); // Чистим память при демонтировании
  }, [isLoading]);

  return (
    <>
      <GsapCursor />

      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <div
        ref={mainRef}
        className="min-h-screen bg-obsidian-950 text-cream-50 font-sans selection:bg-gold-500 selection:text-obsidian-950 relative overflow-x-hidden"
      >
        <AmbientCanvas />

        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-obsidian-950/70 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <a href="#" className="font-serif text-2xl tracking-[0.2em] text-cream-100 uppercase font-light">
              Lash <span className="text-gold-400 font-normal">Atelier</span>
            </a>

            <nav className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.25em] font-medium text-cream-200/70">
              <a href="#results" className="hover:text-gold-400 transition">{t.nav.results}</a>
              <a href="#services" className="hover:text-gold-400 transition">{t.nav.services}</a>
              <a href="#studio" className="hover:text-gold-400 transition">{t.footer.locationTitle}</a>
            </nav>

            <div className="flex items-center gap-4">
              <div className="flex items-center bg-obsidian-900 border border-white/10 rounded-full p-1 text-xs font-semibold">
                <button
                  onClick={() => setLang('es')}
                  className={`px-3 py-1 rounded-full transition ${lang === 'es' ? 'bg-gold-500 text-obsidian-950 shadow' : 'text-cream-200/60'}`}
                >
                  ES
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 rounded-full transition ${lang === 'en' ? 'bg-gold-500 text-obsidian-950 shadow' : 'text-cream-200/60'}`}
                >
                  EN
                </button>
              </div>

              <GsapMagnetic
                onClick={() => { setSelectedService(''); setIsBookingOpen(true); }}
                className="hidden md:inline-flex px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(212,175,55,0.25)]"
              >
                {t.nav.book}
              </GsapMagnetic>
            </div>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="gsap-hero relative pt-20 pb-28 md:pt-36 md:pb-44 px-6 z-10">
          <div className="max-w-5xl mx-auto text-center gsap-hero-title">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-obsidian-850 border border-gold-500/20 text-gold-400 text-xs font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping"></span>
              {t.nav.spotsLeft}
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif text-cream-50 leading-[1.05] tracking-tight">
              <div className="overflow-hidden">
                <div className="gsap-reveal-text">{t.hero.titlePrimary}</div>
              </div>
              <div className="overflow-hidden mt-1">
                <div className="gsap-reveal-text italic font-light bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 bg-clip-text text-transparent">
                  {t.hero.titleSecondary}
                </div>
              </div>
            </h1>

            <p className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-cream-200/70 font-light leading-relaxed">
              {t.hero.desc}
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <GsapMagnetic
                onClick={() => { setSelectedService(''); setIsBookingOpen(true); }}
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-xs uppercase tracking-widest font-bold shadow-[0_0_30px_rgba(212,175,55,0.35)]"
              >
                {t.hero.ctaBook}
              </GsapMagnetic>

              <GsapMagnetic
                onClick={() => setIsQuizOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-obsidian-850 hover:bg-obsidian-800 text-cream-100 border border-white/10 text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-gold-400" />
                {t.hero.ctaQuiz}
              </GsapMagnetic>
            </div>
          </div>
        </section>

        {/* ЦИФРЫ ДОВЕРИЯ (GSAP STAGGER) */}
        <section className="gsap-stats border-y border-white/5 bg-obsidian-900/60 py-16 relative z-10">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: t.proof.years, desc: t.proof.yearsDesc },
              { num: t.proof.retention, desc: t.proof.retentionDesc },
              { num: t.proof.safety, desc: t.proof.safetyDesc },
              { num: t.proof.comfort, desc: t.proof.comfortDesc },
            ].map((stat, i) => (
              <div key={i} className="gsap-stat-item">
                <div className="text-3xl md:text-5xl font-serif text-gold-400">{stat.num}</div>
                <div className="text-xs text-cream-200/60 mt-2 uppercase tracking-wider">{stat.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* МАКРО-СЛАЙДЕР «ДО/ПОСЛЕ» 1:1 С ЛУПОЙ */}
        <BeforeAfter
          lang={lang}
          onSelectCase={(effect) => {
            setSelectedService(effect);
            setIsBookingOpen(true);
          }}
        />

        {/* КАРТОЧКИ УСЛУГ (GSAP BATCH STAGGER) */}
        <section id="services" className="py-28 max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="overflow-hidden">
              <h2 className="gsap-reveal-text text-4xl md:text-5xl font-serif text-cream-100">{t.pricing.title}</h2>
            </div>
            <p className="mt-3 text-cream-200/60 text-sm md:text-base font-light">{t.pricing.subtitle}</p>
          </div>

          <div className="gsap-services-list space-y-4">
            {t.pricing.items.map((item, idx) => (
              <div
                key={idx}
                className="gsap-service-card p-8 rounded-2xl bg-obsidian-900 border border-white/5 hover:border-gold-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif text-2xl font-normal text-cream-100">{item.name}</h3>
                    <span className="text-[11px] text-gold-400 bg-gold-500/10 border border-gold-500/20 px-2.5 py-0.5 rounded-full">{item.time}</span>
                  </div>
                  <p className="text-xs text-cream-200/60 mt-2 max-w-xl leading-relaxed">{item.desc}</p>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
                  <span className="text-3xl font-serif text-gold-400">{item.price}</span>
                  <GsapMagnetic
                    onClick={() => { setSelectedService(item.name); setIsBookingOpen(true); }}
                    className="px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-xs font-bold uppercase tracking-wider transition shadow"
                  >
                    {t.nav.book}
                  </GsapMagnetic>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 rounded-2xl bg-obsidian-900/80 border border-gold-500/20 text-center text-xs text-cream-200/70">
            <ShieldCheck className="w-4 h-4 text-gold-400 inline mr-2 -mt-0.5" />
            {t.pricing.depositNote}
          </div>
        </section>

        {/* СТУДИЯ С GSAP ПАРАЛЛАКСОМ ИЗОБРАЖЕНИЯ */}
        <section id="studio" className="gsap-studio py-24 bg-obsidian-900/80 border-t border-white/5 relative z-10">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] font-semibold text-gold-400 mb-2">Madrid · Barrio de Salamanca</div>
              <div className="overflow-hidden">
                <h2 className="gsap-reveal-text text-3xl md:text-5xl font-serif text-cream-100 mb-6">{t.footer.locationTitle}</h2>
              </div>

              <div className="space-y-4 text-sm text-cream-200/70 mb-8 font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <span>{t.footer.address}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <span>{t.footer.metro}</span>
                </div>
              </div>

              <GsapMagnetic>
                <a
                  href="https://wa.me/34600000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs uppercase tracking-widest font-bold transition shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Studio Directo
                </a>
              </GsapMagnetic>
            </div>

            <div className="rounded-3xl overflow-hidden border border-white/10 aspect-square shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80"
                alt="Studio interior"
                className="gsap-studio-img w-full h-full object-cover filter brightness-90 contrast-105 will-change-transform"
              />
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 bg-obsidian-950 border-t border-white/5 text-center text-xs text-cream-200/50 relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="font-serif text-xl tracking-widest text-cream-100 mb-3 uppercase">Lash Atelier Madrid</div>
            <div className="mb-4 flex flex-wrap items-center justify-center gap-4 text-cream-200/70">
              <button
                onClick={() => setIsPrivacyOpen(true)}
                className="hover:text-gold-400 underline underline-offset-4 transition"
              >
                {lang === 'es' ? 'Política de Privacidad (RGPD / LOPD)' : 'Privacy Policy (GDPR)'}
              </button>
              <span>·</span>
              <span className="text-cream-200/40">
                {lang === 'es' ? 'Aviso Legal (LSSI-CE)' : 'Legal Notice'}
              </span>
              <span>·</span>
              <span className="text-cream-200/40">
                {lang === 'es' ? 'Hojas de reclamaciones disponibles' : 'Consumer complaint sheets available'}
              </span>
            </div>
            <p>{t.footer.copy}</p>
          </div>
        </footer>

        {/* МОДАЛЬНЫЕ ОКНА */}
        <LashQuiz lang={lang} isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
        <BookingModal
          lang={lang}
          isOpen={isBookingOpen}
          preselectedService={selectedService}
          onClose={() => setIsBookingOpen(false)}
        />
        <PrivacyPolicyModal
          lang={lang}
          isOpen={isPrivacyOpen}
          onClose={() => setIsPrivacyOpen(false)}
        />
        <CookieBanner lang={lang} />
        <StickyMobileBar onOpenBooking={() => { setSelectedService(''); setIsBookingOpen(true); }} />
      </div>
    </>
  );
}

export default App;