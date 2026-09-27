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

  // СБОРКА ВСЕХ СЦЕН GSAP
  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const ctx = gsap.context(() => {
      // 1. ПЛАВНЫЙ ВХОД ПЕРВОГО ЭКРАНА (ТВОЙ РОДНОЙ, НЕ ТРОНУТ)
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
        );

      // 2. МЯГКИЙ ПАРАЛЛАКС HERO С ГЛУБОКОЙ ИНЕРЦИЕЙ (scrub: 1.8)
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

      // 3. РАСКРЫВАЮЩИЕСЯ ЛАЗЕРНЫЕ ЛИНИИ (scaleX: 0 -> 1 ИЗ ЦЕНТРА)
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

      // 4. ЦИФРЫ ДОВЕРИЯ: ПОДЪЕМ БЛОКОВ + ДИНАМИЧЕСКИЙ НАБОР ЧИСЕЛ
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

      // Набегание: 0 -> 6 лет
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

      // Набегание: 0 -> 6 недель
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

      // Набегание: 0 -> 100%
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

      // 5. СЛАЙДЕР «ДО/ПОСЛЕ» (ПОЯВЛЕНИЕ НА СЕРЕДИНЕ ЭКРАНА: TOP 60%)
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

      // 6. СЕКЦИЯ ЦЕН: ПЕРСОНАЛЬНОЕ ПОЯВЛЕНИЕ ЗАГОЛОВКА (TOP 65%)
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

      // 7. ПЕРСОНАЛЬНЫЙ СКРОЛЛ-ТРИГГЕР ДЛЯ КАЖДОЙ УСЛУГИ (КАЖДАЯ ПОЯВЛЯЕТСЯ САМА ПО СЕБЕ)
      const serviceCards = gsap.utils.toArray<HTMLElement>('.gsap-service-card');
      serviceCards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
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

      // 8. КАСКАД ТЕКСТА И КАРТОЧЕК В БЛОКЕ ОТЗЫВОВ
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
          '#reviews .rounded-3xl',
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

      // 9. КАСКАД FAQ АККОРДЕОНА (КАЖДЫЙ ВОПРОС САМ ПО СЕБЕ)
      const faqItems = gsap.utils.toArray<HTMLElement>('#faq .rounded-2xl');
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

      // 10. СТУДИЯ: МЕДЛЕННОЕ БЛАГОРОДНОЕ ПОЯВЛЕНИЕ (SLOW LUXURY TIMELINE)
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
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.0, 
            ease: 'power3.out',
            force3D: true,
          }
        )
        .fromTo(
          '.gsap-studio-heading',
          { yPercent: 110, opacity: 0 },
          { 
            yPercent: 0, 
            opacity: 1, 
            duration: 1.4, 
            ease: 'power3.out',
            force3D: true,
          },
          '-=0.6'
        )
        .fromTo(
          '.gsap-studio-info .space-y-4 > div',
          { opacity: 0, x: -25 },
          { 
            opacity: 1, 
            x: 0, 
            stagger: 0.25, 
            duration: 1.1, 
            ease: 'power3.out',
            force3D: true,
          },
          '-=0.7'
        )
        .fromTo(
          '.gsap-studio-info a[href*="wa.me"]',
          { opacity: 0, y: 20, scale: 0.94 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 1.0, 
            ease: 'power3.out',
            force3D: true,
          },
          '-=0.4'
        )
        .fromTo(
          '.gsap-studio .aspect-square',
          { opacity: 0, scale: 0.90, y: 40 },
          { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            duration: 1.6, 
            ease: 'power3.out',
            force3D: true,
          },
          0
        );

      // БАРХАТНЫЙ ПАРАЛЛАКС ФОТО ВНУТРИ РАМКИ ПРИ СКРОЛЛЕ
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

      {/* Золотая нить прогресса скролла */}
      <ScrollProgress />

      {/* Бархатное пленочное зерно */}
      <FilmGrain />

      {/* Прелоадер */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* ГЛАВНЫЙ GSAP SMOOTH SCROLL ДЛЯ ВСЕГО КОНТЕНТА */}
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
                  className="hidden md:inline-flex px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                >
                  {t.nav.book}
                </GsapMagnetic>
              </div>
            </div>
          </header>

          {/* HERO SECTION */}
          <section className="gsap-hero relative min-h-[calc(100svh-5rem)] flex flex-col justify-center items-center px-6 py-6 sm:py-10 z-10">
            <div className="max-w-4xl mx-auto text-center gsap-hero-title flex flex-col items-center">
              
              <div className="gsap-hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-obsidian-850 border border-gold-500/20 text-gold-400 text-[11px] font-medium mb-5 sm:mb-6 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping"></span>
                {t.nav.spotsLeft}
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-cream-50 leading-[1.2] tracking-tight">
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

              <p className="gsap-hero-desc mt-5 sm:mt-6 max-w-xl mx-auto text-sm sm:text-base text-cream-200/70 font-light leading-relaxed">
                {t.hero.desc}
              </p>

              <div className="gsap-hero-cta mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
                <GsapMagnetic
                  onClick={() => { setSelectedService(''); setIsBookingOpen(true); }}
                  className="w-full sm:w-auto px-8 py-3.5 sm:px-9 sm:py-4 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-xs uppercase tracking-widest font-bold transition shadow-[0_0_30px_rgba(212,175,55,0.35)] active:scale-95"
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

          {/* 1. РАСКРЫВАЮЩАЯСЯ ЛАЗЕРНАЯ ЛИНИЯ ПЕРЕД ЦИФРАМИ */}
          <div className="w-full max-w-7xl mx-auto px-6 overflow-hidden">
            <div className="gsap-divider h-[1px] w-full bg-gradient-to-r from-transparent via-gold-500/35 to-transparent will-change-transform" />
          </div>

          {/* ЦИФРЫ ДОВЕРИЯ С ДИНАМИЧЕСКИМИ СЧЕТЧИКАМИ */}
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

          {/* 2. РАСКРЫВАЮЩАЯСЯ ЛАЗЕРНАЯ ЛИНИЯ ПЕРЕД РЕЛЬСАМИ */}
          <div className="w-full max-w-7xl mx-auto px-6 overflow-hidden">
            <div className="gsap-divider h-[1px] w-full bg-gradient-to-r from-transparent via-gold-500/35 to-transparent will-change-transform" />
          </div>

          {/* ИЗОГНУТАЯ БЕГУЩАЯ СТРОКА НА РЕЛЬСАХ */}
          <CurvedMarquee lang={lang} />

          {/* 3. РАСКРЫВАЮЩАЯСЯ ЛАЗЕРНАЯ ЛИНИЯ ПЕРЕД СЛАЙДЕРОМ */}
          <div className="w-full max-w-7xl mx-auto px-6 overflow-hidden">
            <div className="gsap-divider h-[1px] w-full bg-gradient-to-r from-transparent via-gold-500/35 to-transparent will-change-transform" />
          </div>

          {/* МАКРО-СЛАЙДЕР «ДО/ПОСЛЕ» */}
          <BeforeAfter
            lang={lang}
            onSelectCase={(effect) => {
              setSelectedService(effect);
              setIsBookingOpen(true);
            }}
          />

          {/* 4. РАСКРЫВАЮЩАЯСЯ ЛАЗЕРНАЯ ЛИНИЯ ПЕРЕД УСЛУГАМИ */}
          <div className="w-full max-w-7xl mx-auto px-6 overflow-hidden">
            <div className="gsap-divider h-[1px] w-full bg-gradient-to-r from-transparent via-gold-500/35 to-transparent will-change-transform" />
          </div>

          {/* УСЛУГИ И ЦЕНЫ */}
          <section id="services" className="py-28 max-w-4xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="overflow-hidden py-2 -my-2">
                <h2 className="gsap-pricing-title text-4xl md:text-5xl font-serif text-cream-100">{t.pricing.title}</h2>
              </div>
              <p className="mt-3 text-cream-200/60 text-sm md:text-base font-light">{t.pricing.subtitle}</p>
            </div>

            <div className="gsap-services-list space-y-4">
            {t.pricing.items.map((item: any, idx: number) => (
              <div
                key={idx}
                className="gsap-service-card p-8 rounded-2xl bg-obsidian-900 border border-white/5 hover:border-gold-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div>
                  {/* МИКРО-ТЕГИ HAUTE COUTURE И ВРЕМЯ */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-gold-400 bg-gold-500/10 border border-gold-500/20 px-2.5 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                    <span className="text-[10px] text-cream-200/50 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                      {item.time}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-normal text-cream-100">{item.name}</h3>
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

          {/* 5. РАСКРЫВАЮЩАЯСЯ ЛАЗЕРНАЯ ЛИНИЯ ПЕРЕД ОТЗЫВАМИ */}
          <div className="w-full max-w-7xl mx-auto px-6 overflow-hidden">
            <div className="gsap-divider h-[1px] w-full bg-gradient-to-r from-transparent via-gold-500/35 to-transparent will-change-transform" />
          </div>

          {/* ОТЗЫВЫ */}
          <Reviews lang={lang} />

          {/* 6. РАСКРЫВАЮЩАЯСЯ ЛАЗЕРНАЯ ЛИНИЯ ПЕРЕД FAQ */}
          <div className="w-full max-w-7xl mx-auto px-6 overflow-hidden">
            <div className="gsap-divider h-[1px] w-full bg-gradient-to-r from-transparent via-gold-500/35 to-transparent will-change-transform" />
          </div>

          {/* FAQ */}
          <FAQ lang={lang} />

          {/* 7. РАСКРЫВАЮЩАЯСЯ ЛАЗЕРНАЯ ЛИНИЯ ПЕРЕД СТУДИЕЙ */}
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

          {/* 8. РАСКРЫВАЮЩАЯСЯ ЛАЗЕРНАЯ ЛИНИЯ ПЕРЕД ФУТЕРОМ */}
          <div className="w-full max-w-7xl mx-auto px-6 overflow-hidden">
            <div className="gsap-divider h-[1px] w-full bg-gradient-to-r from-transparent via-gold-500/35 to-transparent will-change-transform" />
          </div>

          {/* ФУТЕР */}
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