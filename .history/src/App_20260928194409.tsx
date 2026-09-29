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
import { GsapSmoothScroll } from './components/GsapSmoothScroll';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollProgress } from './components/ScrollProgress';
import { CurvedMarquee } from './components/CurvedMarquee';
import { FilmGrain } from './components/FilmGrain';
import { Reviews } from './components/Reviews';
import { FAQ } from './components/FAQ';

import {
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  MessageCircle,
  ArrowUpRight,
} from 'lucide-react';

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

  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const ctx = gsap.context(() => {
      /*
       * HERO
       *
       * Important:
       * - No overflow-hidden around the typography.
       * - No negative margins or padding tricks.
       * - No opacity animation, so the hero remains visible even
       *   if GSAP fails or is interrupted.
       */

      const heroTl = gsap.timeline();

      heroTl
        .from('.gsap-hero-badge', {
          y: 18,
          duration: 0.7,
          ease: 'power3.out',
        })
        .from(
          '.hero-title-line',
          {
            y: 32,
            duration: 1.05,
            stagger: 0.12,
            ease: 'power4.out',
          },
          '-=0.35'
        )
        .from(
          '.gsap-hero-desc',
          {
            y: 18,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.55'
        )
        .from(
          '.gsap-hero-cta',
          {
            y: 18,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.55'
        );

      gsap.to('.gsap-hero-title', {
        y: -42,
        scrollTrigger: {
          trigger: '.gsap-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.8,
        },
      });

      /*
       * Section dividers
       */
      gsap.utils.toArray<HTMLElement>('.gsap-divider').forEach((divider) => {
        gsap.fromTo(
          divider,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: divider,
              start: 'top 80%',
              once: true,
            },
          }
        );
      });

      /*
       * Stats
       */
      gsap.fromTo(
        '.gsap-stat-item',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-stats',
            start: 'top 70%',
            once: true,
          },
        }
      );

      const yearsObj = { val: 0 };

      gsap.to(yearsObj, {
        val: 6,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.gsap-stats',
          start: 'top 70%',
          once: true,
        },
        onUpdate: () => {
          const el = document.querySelector('.gsap-count-years');
          if (el) el.textContent = Math.round(yearsObj.val).toString();
        },
      });

      const weeksObj = { val: 0 };

      gsap.to(weeksObj, {
        val: 6,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.gsap-stats',
          start: 'top 70%',
          once: true,
        },
        onUpdate: () => {
          const el = document.querySelector('.gsap-count-weeks');
          if (el) el.textContent = Math.round(weeksObj.val).toString();
        },
      });

      const comfortObj = { val: 0 };

      gsap.to(comfortObj, {
        val: 100,
        duration: 1.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.gsap-stats',
          start: 'top 70%',
          once: true,
        },
        onUpdate: () => {
          const el = document.querySelector('.gsap-count-comfort');
          if (el) el.textContent = Math.round(comfortObj.val).toString();
        },
      });

      /*
       * Results
       */
      gsap.fromTo(
        '#results',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#results',
            start: 'top 65%',
            once: true,
          },
        }
      );

      /*
       * Pricing
       */
      gsap.fromTo(
        '.gsap-pricing-title',
        { y: 28 },
        {
          y: 0,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '#services .text-center',
            start: 'top 70%',
            once: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>('.gsap-service-card').forEach((card) => {
        gsap.fromTo(
          card,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 78%',
              once: true,
            },
          }
        );
      });

      /*
       * Reviews
       */
      const reviewsTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#reviews',
          start: 'top 70%',
          once: true,
        },
      });

      reviewsTl
        .fromTo(
          '#reviews .text-center > *, #reviews h2',
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.7,
            ease: 'power3.out',
          }
        )
        .fromTo(
          '#reviews .rounded-3xl',
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.75,
            ease: 'power3.out',
          },
          '-=0.3'
        );

      /*
       * FAQ
       */
      gsap.utils.toArray<HTMLElement>('#faq .rounded-2xl').forEach((item) => {
        gsap.fromTo(
          item,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 78%',
              once: true,
            },
          }
        );
      });

      /*
       * Studio
       */
      const studioTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.gsap-studio',
          start: 'top 75%',
          once: true,
        },
      });

      studioTl
        .fromTo(
          '.gsap-studio-info > div:first-child',
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          }
        )
        .fromTo(
          '.gsap-studio-heading',
          { y: 30 },
          {
            y: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .fromTo(
          '.gsap-studio-info .space-y-4 > div',
          { opacity: 0, x: -18 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.18,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.55'
        )
        .fromTo(
          '.gsap-studio-info a[href*="wa.me"]',
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.35'
        )
        .fromTo(
          '.gsap-studio .aspect-square',
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
          },
          0
        );

      gsap.fromTo(
        '.gsap-studio-img',
        { scale: 1.12, yPercent: -8 },
        {
          scale: 1.04,
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.gsap-studio',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        }
      );
    }, mainRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [isLoading]);

  return (
    <>
      <GsapCursor />
      <ScrollProgress />

      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <GsapSmoothScroll>
        <div
          ref={mainRef}
          className="min-h-screen bg-obsidian-950 text-cream-50 font-sans selection:bg-gold-500 selection:text-obsidian-950 relative overflow-x-hidden"
        >
          <AmbientCanvas />

          {/* HEADER */}
          <header className="sticky top-0 z-40 bg-obsidian-950/80 backdrop-blur-xl border-b border-white/[0.06]">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              <a
                href="#"
                className="font-serif text-2xl tracking-[0.2em] text-cream-100 uppercase font-light"
              >
                Lash <span className="text-gold-400 font-normal">Atelier</span>
              </a>

              <nav className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.25em] font-medium text-cream-200/65">
                <a
                  href="#results"
                  className="hover:text-gold-400 transition-colors"
                >
                  {t.nav.results}
                </a>

                <a
                  href="#services"
                  className="hover:text-gold-400 transition-colors"
                >
                  {t.nav.services}
                </a>

                <a
                  href="#reviews"
                  className="hover:text-gold-400 transition-colors"
                >
                  {t.nav.reviews}
                </a>

                <a
                  href="#studio"
                  className="hover:text-gold-400 transition-colors"
                >
                  {t.footer.locationTitle}
                </a>
              </nav>

              <div className="flex items-center gap-4">
                <div className="flex items-center bg-obsidian-900 border border-white/10 rounded-full p-1 text-xs font-semibold">
                  <button
                    onClick={() => setLang('es')}
                    className={`px-3 py-1 rounded-full transition ${
                      lang === 'es'
                        ? 'bg-gold-500 text-obsidian-950 shadow'
                        : 'text-cream-200/60'
                    }`}
                  >
                    ES
                  </button>

                  <button
                    onClick={() => setLang('en')}
                    className={`px-3 py-1 rounded-full transition ${
                      lang === 'en'
                        ? 'bg-gold-500 text-obsidian-950 shadow'
                        : 'text-cream-200/60'
                    }`}
                  >
                    EN
                  </button>
                </div>

                <GsapMagnetic
                  onClick={() => {
                    setSelectedService('');
                    setIsBookingOpen(true);
                  }}
                  className="hidden md:inline-flex px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-xs uppercase tracking-widest font-bold transition"
                >
                  {t.nav.book}
                </GsapMagnetic>
              </div>
            </div>
          </header>

          {/* HERO */}
          <section className="gsap-hero relative min-h-[calc(100svh-5rem)] flex flex-col justify-center items-center px-6 py-12 sm:py-16 z-10">
            <div className="max-w-5xl mx-auto text-center gsap-hero-title flex flex-col items-center">
              <div className="gsap-hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-obsidian-850 border border-gold-500/20 text-gold-400 text-[10px] sm:text-[11px] font-medium mb-7 sm:mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                {t.hero.badge}
              </div>

              <h1 className="font-serif text-[clamp(2.8rem,7.5vw,7rem)] font-normal leading-[1.05] tracking-[-0.025em] text-cream-50">
                <span className="hero-title-line block">
                  {t.hero.titlePrimary}
                </span>

                <span className="hero-title-line mt-3 sm:mt-4 block pb-2 italic font-light bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 bg-clip-text text-transparent">
                  {t.hero.titleSecondary}
                </span>
              </h1>

              <p className="gsap-hero-desc mt-7 sm:mt-8 max-w-2xl mx-auto text-sm sm:text-base text-cream-200/65 font-light leading-[1.8]">
                {t.hero.desc}
              </p>

              <div className="gsap-hero-cta mt-9 sm:mt-11 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
                <GsapMagnetic
                  onClick={() => {
                    setSelectedService('');
                    setIsBookingOpen(true);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 sm:px-9 sm:py-4 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-xs uppercase tracking-widest font-bold transition shadow-[0_0_28px_rgba(212,175,55,0.2)] active:scale-95"
                >
                  {t.hero.ctaBook}
                </GsapMagnetic>

                <GsapMagnetic
                  onClick={() => setIsQuizOpen(true)}
                  className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-obsidian-850 hover:bg-obsidian-800 text-cream-100 border border-white/10 text-xs uppercase tracking-widest font-bold transition flex items-center justify-center gap-2 active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  {t.hero.ctaQuiz}
                </GsapMagnetic>
              </div>
            </div>
          </section>

          {/* HERO → STATS DIVIDER */}
          <div className="w-full max-w-7xl mx-auto px-6 overflow-hidden">
            <div className="gsap-divider h-px w-full origin-center bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
          </div>

          {/* STATS */}
          <section className="gsap-stats py-16 sm:py-20 relative z-10">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
              <div className="gsap-stat-item text-center px-5 py-5 md:border-r md:border-white/[0.07]">
                <div className="text-3xl md:text-5xl font-serif text-gold-400">
                  <span className="gsap-count-years">0</span>+
                </div>

                <div className="text-[10px] sm:text-xs text-cream-200/55 mt-2 uppercase tracking-[0.16em]">
                  {t.proof.yearsDesc}
                </div>
              </div>

              <div className="gsap-stat-item text-center px-5 py-5 md:border-r md:border-white/[0.07]">
                <div className="text-3xl md:text-5xl font-serif text-gold-400">
                  4–<span className="gsap-count-weeks">0</span>{' '}
                  {lang === 'es' ? 'Sem' : 'Wks'}
                </div>

                <div className="text-[10px] sm:text-xs text-cream-200/55 mt-2 uppercase tracking-[0.16em]">
                  {t.proof.retentionDesc}
                </div>
              </div>

              <div className="gsap-stat-item text-center px-5 py-5 md:border-r md:border-white/[0.07]">
                <div className="text-3xl md:text-5xl font-serif text-gold-400 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-7 h-7 md:w-8 md:h-8" />
                  <span>CE</span>
                </div>

                <div className="text-[10px] sm:text-xs text-cream-200/55 mt-2 uppercase tracking-[0.16em]">
                  {t.proof.safetyDesc}
                </div>
              </div>

              <div className="gsap-stat-item text-center px-5 py-5">
                <div className="text-3xl md:text-5xl font-serif text-gold-400">
                  <span className="gsap-count-comfort">0</span>%
                </div>

                <div className="text-[10px] sm:text-xs text-cream-200/55 mt-2 uppercase tracking-[0.16em]">
                  {t.proof.comfortDesc}
                </div>
              </div>
            </div>
          </section>

          <CurvedMarquee lang={lang} />

          {/* RESULTS */}
          <section id="results" className="relative z-10">
            <BeforeAfter
              lang={lang}
              onSelectCase={(effect) => {
                setSelectedService(effect);
                setIsBookingOpen(true);
              }}
            />
          </section>

          {/* SERVICES */}
          <section
            id="services"
            className="py-24 sm:py-32 max-w-5xl mx-auto px-6 relative z-10"
          >
            <div className="text-center mb-14 sm:mb-16">
              <div className="overflow-visible">
                <h2 className="gsap-pricing-title text-4xl md:text-5xl font-serif text-cream-100">
                  {t.pricing.title}
                </h2>
              </div>

              <p className="mt-4 text-cream-200/55 text-sm md:text-base font-light">
                {t.pricing.subtitle}
              </p>
            </div>

            <div className="gsap-services-list border-t border-white/10">
              {t.pricing.items.map((item: any, idx: number) => (
                <article
                  key={idx}
                  className="gsap-service-card group border-b border-white/10 py-7 md:py-8 transition-colors hover:border-gold-500/35"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 md:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-gold-400">
                          {item.tag}
                        </span>

                        <span className="text-[10px] text-cream-200/40">
                          · {item.time}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl md:text-3xl font-normal text-cream-100 transition-colors group-hover:text-gold-300">
                        {item.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-cream-200/55 mt-2.5 max-w-2xl leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6">
                      <span className="text-2xl md:text-3xl font-serif text-gold-400">
                        {item.price}
                      </span>

                      <GsapMagnetic
                        onClick={() => {
                          setSelectedService(item.name);
                          setIsBookingOpen(true);
                        }}
                        className="px-5 py-2.5 rounded-full border border-gold-500/40 hover:bg-gold-500 hover:text-obsidian-950 text-gold-400 text-[10px] font-bold uppercase tracking-[0.15em] transition"
                      >
                        {t.nav.book}
                      </GsapMagnetic>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 text-center text-xs text-cream-200/55">
              <ShieldCheck className="w-4 h-4 text-gold-400 inline mr-2 -mt-0.5" />
              {t.pricing.depositNote}
            </div>
          </section>

          {/* REVIEWS */}
          <Reviews lang={lang} />

          {/* FAQ */}
          <FAQ lang={lang} />

          {/* STUDIO */}
          <section
            id="studio"
            className="gsap-studio py-24 sm:py-28 bg-obsidian-900/70 relative z-10 border-y border-white/[0.05]"
          >
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="gsap-studio-info">
                <div className="text-[10px] uppercase tracking-[0.25em] font-semibold text-gold-400 mb-3">
                  Madrid · Barrio de Salamanca
                </div>

                <div className="overflow-visible">
                  <h2 className="gsap-studio-heading text-3xl md:text-5xl font-serif text-cream-100 mb-7">
                    {t.footer.locationTitle}
                  </h2>
                </div>

                <div className="space-y-4 text-sm text-cream-200/65 mb-8 font-light">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />

                    <div>
                      <span>{t.footer.address}</span>

                      <div>
                        <a
                          href="https://maps.google.com/?q=Calle+de+Velazquez+48+28001+Madrid"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 underline underline-offset-4 font-semibold tracking-wider uppercase transition mt-2"
                        >
                          <span>
                            {lang === 'es'
                              ? 'Abrir en Google Maps'
                              : 'Open in Google Maps'}
                          </span>

                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                    <span>{t.footer.metro}</span>
                  </div>
                </div>

                <GsapMagnetic>
                  <a
                    href="https://wa.me/34614678720"
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
          <footer className="pt-16 pb-36 md:pb-24 bg-obsidian-950 text-center text-xs text-cream-200/50 relative z-10 overflow-visible">
            <div className="max-w-4xl mx-auto px-6">
              <div className="font-serif text-2xl tracking-widest text-cream-100 mb-4 uppercase leading-relaxed">
                Lash Atelier Madrid
              </div>

              <div className="mb-4 flex flex-wrap items-center justify-center gap-4 text-cream-200/70">
                <button
                  onClick={() => setIsPrivacyOpen(true)}
                  className="hover:text-gold-400 underline underline-offset-4 transition"
                >
                  {lang === 'es'
                    ? 'Política de Privacidad (RGPD / LOPD)'
                    : 'Privacy Policy (GDPR)'}
                </button>

                <span>·</span>

                <span className="text-cream-200/40">
                  {lang === 'es'
                    ? 'Aviso Legal (LSSI-CE)'
                    : 'Legal Notice'}
                </span>

                <span>·</span>

                <span className="text-cream-200/40">
                  {lang === 'es'
                    ? 'Hojas de reclamaciones disponibles'
                    : 'Consumer complaint sheets available'}
                </span>
              </div>

              <p>{t.footer.copy}</p>
            </div>
          </footer>
        </div>
      </GsapSmoothScroll>

      <FilmGrain />

      <LashQuiz
        lang={lang}
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />

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

      <CookieBanner lang={lang} isLoading={isLoading} />

      <StickyMobileBar
        lang={lang}
        onOpenBooking={() => {
          setSelectedService('');
          setIsBookingOpen(true);
        }}
      />

      <ScrollToTop />
    </>
  );
}

export default App;