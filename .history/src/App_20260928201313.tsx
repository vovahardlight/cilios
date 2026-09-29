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

// КОМПОНЕНТЫ
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollProgress } from './components/ScrollProgress';
import { CurvedMarquee } from './components/CurvedMarquee';
import { FilmGrain } from './components/FilmGrain';
import { Reviews } from './components/Reviews';
import { FAQ } from './components/FAQ';

import { Sparkles, MapPin, Clock, ShieldCheck, MessageCircle, ArrowUpRight } from 'lucide-react';
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
      // 1. ПЛАВНЫЙ ВХОД ПЕРВОГО ЭКРАНА С ФОТОГРАФИЕЙ
      const heroTl = gsap.timeline();

      heroTl
        .fromTo(
          '.gsap-hero-badge',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
        )
        .fromTo(
          '.gsap-hero .gsap-reveal-text',
          { yPercent: 120, y: 0, opacity: 0 },
          {
            yPercent: 0,
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.18,
            ease: 'power4.out',
          },
          '-=0.4'
        )
        .fromTo(
          '.gsap-hero-desc',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.7'
        )
        .fromTo(
          '.gsap-hero-cta',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.7'
        )
        .fromTo(
          '.gsap-hero-image',
          { opacity: 0, scale: 1.08, y: 30 },
          { opacity: 1, scale: 1.03, y: 0, duration: 1.4, ease: 'power3.out' },
          '-=0.9'
        );

      // ПАРАЛЛАКС ФОТО В HERO ПРИ СКРОЛЛЕ
      gsap.to('.gsap-hero-image', {
        y: 45,
        ease: 'none',
        scrollTrigger: {
          trigger: '.gsap-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 2.2,
        },
      });

      // ПАРАЛЛАКС ТЕКСТА HERO
      gsap.to('.gsap-hero-title', {
        y: -60,
        opacity: 0.25,
        scrollTrigger: {
          trigger: '.gsap-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.8,
        },
      });

      // 2. ДВЕ РАСКРЫВАЮЩИЕСЯ ЛАЗЕРНЫЕ ЛИНИИ
      gsap.utils.toArray<HTMLElement>('.gsap-divider').forEach((divider) => {
        gsap.fromTo(
          divider,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: divider,
              start: 'top 75%',
              once: true,
            },
          }
        );
      });

      // 3. ЦИФРЫ ДОВЕРИЯ (TOP 65%)
      gsap.fromTo(
        '.gsap-stat-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.14,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-stats',
            start: 'top 65%',
            once: true,
          },
        }
      );

      // СЧЕТЧИКИ
      const yearsObj = { val: 0 };
      gsap.to(yearsObj, {
        val: 6,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.gsap-stats', start: 'top 65%', once: true },
        onUpdate: () => {
          const el = document.querySelector('.gsap-count-years');
          if (el) el.textContent = Math.round(yearsObj.val).toString();
        },
      });

      const weeksObj = { val: 0 };
      gsap.to(weeksObj, {
        val: 6,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.gsap-stats', start: 'top 65%', once: true },
        onUpdate: () => {
          const el = document.querySelector('.gsap-count-weeks');
          if (el) el.textContent = Math.round(weeksObj.val).toString();
        },
      });

      const comfortObj = { val: 0 };
      gsap.to(comfortObj, {
        val: 100,
        duration: 2.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.gsap-stats', start: 'top 65%', once: true },
        onUpdate: () => {
          const el = document.querySelector('.gsap-count-comfort');
          if (el) el.textContent = Math.round(comfortObj.val).toString();
        },
      });

      // 4. СЛАЙДЕР ДО/ПОСЛЕ (TOP 60%)
      gsap.fromTo(
        '#results',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#results',
            start: 'top 60%',
            once: true,
          },
        }
      );

      // 5. СЕКЦИЯ ЦЕН: ЗАГОЛОВОК
      gsap.fromTo(
        '.gsap-pricing-title',
        { yPercent: 120, y: 0, opacity: 0 },
        {
          yPercent: 0,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '#services .text-center',
            start: 'top 65%',
            once: true,
          },
        }
      );

      // ПЕРСОНАЛЬНЫЙ СКРОЛЛ-ТРИГГЕР ДЛЯ СТРОК EDITORIAL LIST
      const serviceCards = gsap.utils.toArray<HTMLElement>('.gsap-service-card');
      serviceCards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 70%',
              once: true,
            },
          }
        );
      });

      // 6. ОТЗЫВЫ
      const reviewsTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#reviews',
          start: 'top 65%',
          once: true,
        },
      });

      reviewsTl
        .fromTo(
          '#reviews .text-center > *, #reviews h2',
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.3,
            duration: 0.8,
            ease: 'power3.out',
          }
        )
        .fromTo(
          '#reviews .gsap-review-card',
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.3,
            duration: 0.85,
            ease: 'power3.out',
          },
          '-=0.4'
        );

      // 7. FAQ АККОРДЕОН
      const faqItems = gsap.utils.toArray<HTMLElement>('#faq .gsap-faq-item');
      faqItems.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 70%',
              once: true,
            },
          }
        );
      });

      // 8. СТУДИЯ: МЕДЛЕННЫЙ ТАЙМЛАЙН
      const studioTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.gsap-studio',
          start: 'top 72%',
          once: true,
        },
      });

      studioTl
        .fromTo(
          '.gsap-studio-info > div:first-child',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', force3D: true }
        )
        .fromTo(
          '.gsap-studio-heading',
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.4, ease: 'power3.out', force3D: true },
          '-=0.6'
        )
        .fromTo(
          '.gsap-studio-info .space-y-4 > div',
          { opacity: 0, x: -25 },
          { opacity: 1, x: 0, stagger: 0.25, duration: 1.1, ease: 'power3.out', force3D: true },
          '-=0.7'
        )
        .fromTo(
          '.gsap-studio-info a[href*="wa.me"]',
          { opacity: 0, y: 20, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.out', force3D: true },
          '-=0.4'
        )
        .fromTo(
          '.gsap-studio .aspect-square',
          { opacity: 0, scale: 0.90, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1.6, ease: 'power3.out', force3D: true },
          0
        );

      // ПАРАЛЛАКС ФОТО ВНУТРИ СТУДИИ
      gsap.fromTo(
        '.gsap-studio-img',
        { scale: 1.2, yPercent: -12 },
        {
          scale: 1.05,
          yPercent: 12,
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
      <FilmGrain />
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <GsapSmoothScroll>
        <div
          ref={mainRef}
          className="min-h-screen bg-obsidian-950 text-cream-50 font-sans selection:bg-gold-500 selection:text-obsidian-950 relative overflow-x-hidden"
        >
          <AmbientCanvas />

          {/* ШАПКА */}
          <header className="sticky top-0 z-40 bg-obsidian-950/70 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              <a href="#" className="font-serif text-2xl tracking-[0.2em] text-cream-100 uppercase font-light">
                Lash <span className="text-gold-400 font-normal">Atelier</span>
              </a>

              <nav className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.25em] font-medium text-cream-200/70">
                <a href="#results" className="hover:text-gold-400 transition">{t.nav.results}</a>
                <a href="#services" className="hover:text-gold-400 transition">{t.nav.services}</a>
                <a href="#reviews" className="hover:text-gold-400 transition">{t.nav.reviews}</a>
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
                  className="hidden md:inline-flex px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-xs uppercase tracking-widest font-bold shadow-[0_0_16px_rgba(212,175,55,0.18)]"
                >
                  {t.nav.book}
                </GsapMagnetic>
              </div>
            </div>
          </header>

          {/* HERO SECTION — НОВАЯ РЕДАКТОРСКАЯ КОМПОЗИЦИЯ С MACRO-IMAGE */}
          <section className="gsap-hero relative min-h-[calc(100svh-5rem)] flex items-center px-6 py-12 sm:py-16 z-10">
            <div className="max-w-7xl w-full mx-auto gsap-hero-title grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-10 lg:gap-20 items-center">
              
              {/* Левая колонка: Текст и CTA */}
              <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
                <div className="gsap-hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-obsidian-850 border border-gold-500/20 text-gold-400 text-[11px] font-medium mb-5 sm:mb-6 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping"></span>
                  {t.nav.spotsLeft}
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-cream-50 leading-[1.18] tracking-tight">
                  <div className="overflow-hidden pb-4 -mb-4 px-3 -mx-3">
                    <div className="gsap-reveal-text inline-block pb-2">
                      {t.hero.titlePrimary}
                    </div>
                  </div>
                  <div className="overflow-hidden pb-8 -mb-8 px-6 -mx-6 mt-1">
                    <div className="gsap-reveal-text inline-block italic font-light bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 bg-clip-text text-transparent pb-8 -mb-8 pr-6 pl-1">
                      {t.hero.titleSecondary}
                    </div>
                  </div>
                </h1>

                <p className="gsap-hero-desc mt-5 sm:mt-6 max-w-xl text-sm sm:text-base text-cream-200/70 font-light leading-relaxed">
                  {t.hero.desc}
                </p>

                <div className="gsap-hero-cta mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto">
                  <GsapMagnetic
                    onClick={() => { setSelectedService(''); setIsBookingOpen(true); }}
                    className="w-full sm:w-auto px-8 py-3.5 sm:px-9 sm:py-4 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-xs uppercase tracking-widest font-bold transition shadow-[0_0_16px_rgba(212,175,55,0.18)] active:scale-95"
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

              {/* Правая колонка: Архитектурный Visual Anchor (Desktop) */}
              <div className="hidden lg:block relative w-full max-w-[420px] justify-self-end">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-gold-500/15 bg-obsidian-900">
                  <img
                    src="/grok-image-9f5b9f4b-7ed3-4a95-87d0-53dff3a9a780.jpg"
                    alt="Detalle de extensiones de pestañas"
                    className="gsap-hero-image w-full h-full object-cover scale-[1.03] contrast-[1.03] will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/45 via-transparent to-obsidian-950/10 pointer-events-none" />
                </div>
                <div className="absolute -left-4 top-12 w-8 h-px bg-gold-400/50" />
                <div className="absolute -right-4 bottom-20 w-8 h-px bg-gold-400/30" />
              </div>

            </div>
          </section>

          {/* ПЕРВАЯ ИЗ ДВУХ ЛАЗЕРНЫХ ЛИНИЙ (ПОСЛЕ HERO) */}
          <div className="w-full max-w-7xl mx-auto px-6 overflow-hidden">
            <div className="gsap-divider h-[1px] w-full bg-gradient-to-r from-transparent via-gold-500/35 to-transparent will-change-transform" />
          </div>

          {/* ЦИФРЫ ДОВЕРИЯ */}
          <section className="gsap-stats py-16 relative z-10">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="gsap-stat-item">
                <div className="text-3xl md:text-5xl font-serif text-gold-400 flex items-center justify-center">
                  <span className="gsap-count-years">0</span>+
                </div>
                <div className="text-xs text-cream-200/60 mt-2 uppercase tracking-wider">{t.proof.yearsDesc}</div>
              </div>

              <div className="gsap-stat-item">
                <div className="text-3xl md:text-5xl font-serif text-gold-400 flex items-center justify-center">
                  4–<span className="gsap-count-weeks">0</span> {lang === 'es' ? 'Sem' : 'Wks'}
                </div>
                <div className="text-xs text-cream-200/60 mt-2 uppercase tracking-wider">{t.proof.retentionDesc}</div>
              </div>

              <div className="gsap-stat-item">
                <div className="text-3xl md:text-5xl font-serif text-gold-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-8 h-8 text-gold-400" />
                  <span>CE</span>
                </div>
                <div className="text-xs text-cream-200/60 mt-2 uppercase tracking-wider">{t.proof.safetyDesc}</div>
              </div>

              <div className="gsap-stat-item">
                <div className="text-3xl md:text-5xl font-serif text-gold-400 flex items-center justify-center">
                  <span className="gsap-count-comfort">0</span>%
                </div>
                <div className="text-xs text-cream-200/60 mt-2 uppercase tracking-wider">{t.proof.comfortDesc}</div>
              </div>
            </div>
          </section>

          {/* ИЗОГНУТАЯ БЕГУЩАЯ СТРОКА */}
          <CurvedMarquee lang={lang} />

          {/* МАКРО-СЛАЙДЕР «ДО/ПОСЛЕ» */}
          <BeforeAfter
            lang={lang}
            onSelectCase={(effect) => {
              setSelectedService(effect);
              setIsBookingOpen(true);
            }}
          />

          {/* УСЛУГИ: EDITORIAL LIST ВМЕСТО КАРТОЧЕК */}
          <section id="services" className="py-32 max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="overflow-hidden py-2 -my-2">
                <h2 className="gsap-pricing-title text-4xl md:text-5xl font-serif text-cream-100">{t.pricing.title}</h2>
              </div>
              <p className="mt-3 text-cream-200/60 text-sm md:text-base font-light">{t.pricing.subtitle}</p>
            </div>

            <div className="gsap-services-list">
              {t.pricing.items.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="gsap-service-card group relative py-7 md:py-8 border-b border-white/10 first:border-t transition-colors duration-500 hover:border-gold-500/30"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex gap-5 md:gap-7 min-w-0">
                      <div className="pt-1 text-[10px] tracking-[0.18em] text-cream-200/30 font-medium shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="text-[9px] uppercase tracking-[0.22em] font-medium text-gold-400">
                            {item.tag}
                          </span>
                          <span className="text-[10px] text-cream-200/35 uppercase tracking-wider">
                            {item.time}
                          </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-sans font-medium tracking-tight text-cream-100 group-hover:text-white transition-colors">
                          {item.name}
                        </h3>

                        <p className="text-xs md:text-sm text-cream-200/55 mt-2 max-w-2xl leading-relaxed font-light">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-7 shrink-0 pl-10 md:pl-0">
                      <span className="text-3xl md:text-4xl font-serif font-light text-gold-400 whitespace-nowrap">
                        {item.price}
                      </span>

                      <GsapMagnetic
                        onClick={() => {
                          setSelectedService(item.name);
                          setIsBookingOpen(true);
                        }}
                        className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gold-300 hover:text-cream-50 transition-colors shadow-none cursor-pointer"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {t.nav.book} →
                        </span>
                      </GsapMagnetic>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-5 rounded-[16px] bg-obsidian-900/80 border border-gold-500/20 text-center text-xs text-cream-200/70">
              <ShieldCheck className="w-4 h-4 text-gold-400 inline mr-2 -mt-0.5" />
              {t.pricing.depositNote}
            </div>
          </section>

          {/* ОТЗЫВЫ */}
          <Reviews lang={lang} />

          {/* FAQ */}
          <FAQ lang={lang} />

          {/* ВТОРАЯ ИЗ ДВУХ ЛАЗЕРНЫХ ЛИНИЙ (ПЕРЕД СТУДИЕЙ) */}
          <div className="w-full max-w-7xl mx-auto px-6 overflow-hidden">
            <div className="gsap-divider h-[1px] w-full bg-gradient-to-r from-transparent via-gold-500/35 to-transparent will-change-transform" />
          </div>

          {/* СТУДИЯ */}
          <section id="studio" className="gsap-studio py-24 bg-obsidian-900/80 relative z-10">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="gsap-studio-info">
                <div className="text-xs uppercase tracking-[0.25em] font-semibold text-gold-400 mb-2">Madrid · Barrio de Salamanca</div>
                <div className="overflow-hidden py-2 -my-2">
                  <h2 className="gsap-studio-heading text-3xl md:text-5xl font-serif text-cream-100 mb-6">{t.footer.locationTitle}</h2>
                </div>

                <div className="space-y-4 text-sm text-cream-200/70 mb-8 font-light">
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
                          <span>{lang === 'es' ? 'Abrir en Google Maps' : 'Open in Google Maps'}</span>
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
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs uppercase tracking-widest font-bold transition shadow-none"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Studio Directo
                  </a>
                </GsapMagnetic>
              </div>

              <div className="rounded-[20px] overflow-hidden border border-white/10 aspect-square relative">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80"
                  alt="Studio interior"
                  className="gsap-studio-img w-full h-full object-cover filter brightness-90 contrast-105 will-change-transform"
                />
              </div>
            </div>
          </section>

          {/* ФУТЕР */}
          <footer className="pt-16 pb-36 md:pb-24 bg-obsidian-950 text-center text-xs text-cream-200/50 relative z-10 overflow-visible">
            <div className="max-w-4xl mx-auto px-6">
              <div className="font-serif text-2xl tracking-widest text-cream-100 mb-4 uppercase leading-relaxed">
                Lash Atelier Madrid
              </div>
              <div className="mb-4 flex flex-wrap items-center justify-center gap-4 text-cream-200/70">
                <button
                  onClick={() => setIsPrivacyOpen(true)}
                  className="hover:text-gold-400 underline underline-offset-4 transition cursor-pointer"
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
        </div>
      </GsapSmoothScroll>
      
      {/* МОДАЛКИ */}
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
      <CookieBanner lang={lang} isLoading={isLoading} />
      <StickyMobileBar lang={lang} onOpenBooking={() => { setSelectedService(''); setIsBookingOpen(true); }} />

      {/* КНОПКА ВОЗВРАТА НАВЕРХ */}
      <ScrollToTop />
    </>
  );
}

export default App;