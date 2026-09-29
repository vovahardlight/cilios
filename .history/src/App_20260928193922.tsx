import React, { useEffect, useRef, useState } from 'react';
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
  ArrowUpRight,
  Clock,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Divider = () => (
  <div
    className="mx-auto w-full max-w-7xl overflow-hidden px-6"
    aria-hidden="true"
  >
    <div className="gsap-divider h-px w-full origin-center bg-gradient-to-r from-transparent via-gold-500/25 to-transparent" />
  </div>
);

export function App() {
  const [lang, setLang] = useState<Lang>('es');
  const [isLoading, setIsLoading] = useState(true);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const t = content[lang];
  const mainRef = useRef<HTMLDivElement>(null);

  const openBooking = (service = '') => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  useEffect(() => {
    if (isLoading) return;

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const ctx = gsap.context(() => {
      /*
       * IMPORTANT:
       * The Hero never uses the legacy .gsap-reveal-text / .gsap-hero-* classes
       * because the project's global CSS sets those classes to opacity: 0.
       * The Hero below is therefore visible in plain CSS before GSAP starts.
       */
      const heroTl = gsap.timeline();

      heroTl
        .fromTo(
          '.hero-entry-badge',
          { y: 10, opacity: 0.72 },
          { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' }
        )
        .fromTo(
          '.hero-entry-line',
          { yPercent: 9 },
          {
            yPercent: 0,
            duration: 1,
            stagger: 0.12,
            ease: 'power4.out',
          },
          '-=0.35'
        )
        .fromTo(
          '.hero-entry-desc',
          { y: 12, opacity: 0.7 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.55'
        )
        .fromTo(
          '.hero-entry-cta',
          { y: 12, opacity: 0.75 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.5'
        );

      gsap.to('.gsap-hero-title', {
        y: -34,
        opacity: 0.46,
        ease: 'none',
        scrollTrigger: {
          trigger: '.gsap-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.8,
        },
      });

      gsap.utils.toArray<HTMLElement>('.gsap-divider').forEach((divider) => {
        gsap.fromTo(
          divider,
          { scaleX: 0.2, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: divider,
              start: 'top 82%',
              once: true,
            },
          }
        );
      });

      gsap.fromTo(
        '.gsap-stat-item',
        { y: 24 },
        {
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-stats',
            start: 'top 74%',
            once: true,
          },
        }
      );

      const yearsObj = { val: 0 };
      gsap.to(yearsObj, {
        val: 6,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.gsap-stats',
          start: 'top 74%',
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
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.gsap-stats',
          start: 'top 74%',
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
          start: 'top 74%',
          once: true,
        },
        onUpdate: () => {
          const el = document.querySelector('.gsap-count-comfort');
          if (el) el.textContent = Math.round(comfortObj.val).toString();
        },
      });

      gsap.fromTo(
        '#results',
        { y: 28 },
        {
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#results',
            start: 'top 70%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.gsap-pricing-title',
        { y: 22 },
        {
          y: 0,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '#services',
            start: 'top 72%',
            once: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>('.gsap-service-card').forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 20 },
          {
            y: 0,
            duration: 0.65,
            delay: Math.min(index * 0.05, 0.18),
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('#reviews .rounded-3xl').forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 24 },
          {
            y: 0,
            duration: 0.7,
            delay: Math.min(index * 0.06, 0.18),
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 84%',
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('#faq .rounded-2xl').forEach((item) => {
        gsap.fromTo(
          item,
          { y: 18 },
          {
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 84%',
              once: true,
            },
          }
        );
      });

      const studioTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.gsap-studio',
          start: 'top 80%',
          once: true,
        },
      });

      studioTl
        .fromTo(
          '.gsap-studio-kicker',
          { y: 14, opacity: 0.7 },
          { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' }
        )
        .fromTo(
          '.gsap-studio-heading',
          { y: 24 },
          { y: 0, duration: 0.9, ease: 'power3.out' },
          '-=0.35'
        )
        .fromTo(
          '.gsap-studio-info .studio-detail',
          { x: -14, opacity: 0.7 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.45'
        )
        .fromTo(
          '.gsap-studio-info .studio-cta',
          { y: 12, opacity: 0.75 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.35'
        )
        .fromTo(
          '.gsap-studio .studio-image-frame',
          { scale: 0.97, y: 22 },
          { scale: 1, y: 0, duration: 1, ease: 'power3.out' },
          0
        );

      gsap.fromTo(
        '.gsap-studio-img',
        { scale: 1.07, yPercent: -4 },
        {
          scale: 1.02,
          yPercent: 4,
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
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      window.requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [lang, isLoading]);

  return (
    <>
      <GsapCursor />
      <ScrollProgress />

      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <GsapSmoothScroll>
        <div
          ref={mainRef}
          className="relative min-h-screen overflow-x-hidden bg-obsidian-950 font-sans text-cream-50 selection:bg-gold-500 selection:text-obsidian-950"
        >
          <AmbientCanvas />

          {/* HEADER */}
          <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-obsidian-950/80 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
              <a
                href="#"
                className="font-serif text-xl font-light uppercase tracking-[0.18em] text-cream-100 sm:text-2xl"
              >
                Lash <span className="font-normal text-gold-400">Atelier</span>
              </a>

              <nav className="hidden items-center gap-9 text-[10px] font-medium uppercase tracking-[0.25em] text-cream-200/65 lg:flex">
                <a href="#results" className="transition-colors hover:text-gold-400">
                  {t.nav.results}
                </a>
                <a href="#services" className="transition-colors hover:text-gold-400">
                  {t.nav.services}
                </a>
                <a href="#reviews" className="transition-colors hover:text-gold-400">
                  {t.nav.reviews}
                </a>
                <a href="#studio" className="transition-colors hover:text-gold-400">
                  {t.footer.locationTitle}
                </a>
              </nav>

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center rounded-full border border-white/10 bg-obsidian-900 p-1 text-[10px] font-semibold">
                  <button
                    type="button"
                    onClick={() => setLang('es')}
                    aria-pressed={lang === 'es'}
                    className={`rounded-full px-3 py-1.5 transition-colors ${
                      lang === 'es'
                        ? 'bg-gold-500 text-obsidian-950'
                        : 'text-cream-200/55 hover:text-cream-100'
                    }`}
                  >
                    ES
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang('en')}
                    aria-pressed={lang === 'en'}
                    className={`rounded-full px-3 py-1.5 transition-colors ${
                      lang === 'en'
                        ? 'bg-gold-500 text-obsidian-950'
                        : 'text-cream-200/55 hover:text-cream-100'
                    }`}
                  >
                    EN
                  </button>
                </div>

                <GsapMagnetic
                  onClick={() => openBooking()}
                  className="hidden items-center justify-center rounded-full bg-gold-500 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-obsidian-950 transition-colors hover:bg-gold-400 sm:inline-flex"
                >
                  {t.nav.book}
                </GsapMagnetic>
              </div>
            </div>
          </header>

          {/* HERO */}
          <section className="gsap-hero relative z-10 flex min-h-[calc(100svh-5rem)] items-center justify-center px-6 py-16 sm:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(212,175,55,0.075),transparent_36%)]" />

            <div className="gsap-hero-title relative mx-auto flex max-w-6xl flex-col items-center text-center">
              <div className="hero-entry-badge inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-obsidian-900/65 px-3.5 py-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-gold-400 sm:text-[10px]">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                {t.hero.badge}
              </div>

              <div className="mt-4 text-[9px] font-semibold uppercase tracking-[0.24em] text-cream-200/35 sm:mt-5">
                {t.nav.spotsLeft}
              </div>

              <h1 className="mt-7 max-w-6xl font-serif text-[clamp(3.1rem,8.2vw,8rem)] leading-[0.91] tracking-[-0.04em] text-cream-50">
                <span className="block overflow-hidden px-2 py-2 -my-2">
                  <span className="hero-entry-line inline-block">{t.hero.titlePrimary}</span>
                </span>
                <span className="block overflow-hidden px-2 py-2 -my-2">
                  <span className="hero-entry-line inline-block bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 bg-clip-text pr-2 font-light italic text-transparent">
                    {t.hero.titleSecondary}
                  </span>
                </span>
              </h1>

              <p className="hero-entry-desc mt-7 max-w-xl text-sm font-light leading-relaxed text-cream-200/68 sm:text-base">
                {t.hero.desc}
              </p>

              <div className="hero-entry-cta mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
                <GsapMagnetic
                  onClick={() => openBooking()}
                  className="inline-flex w-full items-center justify-center rounded-full bg-gold-500 px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-obsidian-950 transition-all hover:bg-gold-400 active:scale-[0.98] sm:w-auto"
                >
                  {t.hero.ctaBook}
                </GsapMagnetic>

                <GsapMagnetic
                  onClick={() => setIsQuizOpen(true)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-obsidian-900/75 px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-cream-100 transition-colors hover:border-gold-500/25 hover:text-gold-300 active:scale-[0.98] sm:w-auto"
                >
                  <Sparkles className="h-3.5 w-3.5 text-gold-400" />
                  {t.hero.ctaQuiz}
                </GsapMagnetic>
              </div>

              <div className="mt-12 hidden items-center gap-4 text-[9px] uppercase tracking-[0.28em] text-cream-200/30 sm:flex">
                <span>Madrid</span>
                <span className="h-px w-8 bg-gold-500/20" />
                <span>Precision</span>
                <span className="h-px w-8 bg-gold-500/20" />
                <span>Care</span>
              </div>
            </div>
          </section>

          <Divider />

          {/* TRUST */}
          <section className="gsap-stats relative z-10 py-20 sm:py-24">
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-12 px-6 md:grid-cols-4">
              <div className="gsap-stat-item text-center">
                <div className="flex items-center justify-center font-serif text-4xl text-gold-400 md:text-5xl">
                  <span className="gsap-count-years">0</span>+
                </div>
                <div className="mt-3 text-[10px] uppercase tracking-[0.16em] text-cream-200/50">
                  {t.proof.yearsDesc}
                </div>
              </div>

              <div className="gsap-stat-item text-center">
                <div className="flex items-center justify-center font-serif text-4xl text-gold-400 md:text-5xl">
                  4–<span className="gsap-count-weeks">0</span>
                  <span className="ml-1.5 text-2xl md:text-3xl">{lang === 'es' ? 'Sem' : 'Wks'}</span>
                </div>
                <div className="mt-3 text-[10px] uppercase tracking-[0.16em] text-cream-200/50">
                  {t.proof.retentionDesc}
                </div>
              </div>

              <div className="gsap-stat-item text-center">
                <div className="flex items-center justify-center gap-2 font-serif text-4xl text-gold-400 md:text-5xl">
                  <ShieldCheck className="h-8 w-8 md:h-9 md:w-9" />
                  <span>CE</span>
                </div>
                <div className="mt-3 text-[10px] uppercase tracking-[0.16em] text-cream-200/50">
                  {t.proof.safetyDesc}
                </div>
              </div>

              <div className="gsap-stat-item text-center">
                <div className="flex items-center justify-center font-serif text-4xl text-gold-400 md:text-5xl">
                  <span className="gsap-count-comfort">0</span>%
                </div>
                <div className="mt-3 text-[10px] uppercase tracking-[0.16em] text-cream-200/50">
                  {t.proof.comfortDesc}
                </div>
              </div>
            </div>
          </section>

          <section className="relative z-10 pb-8 sm:pb-12">
            <CurvedMarquee lang={lang} />
          </section>

          {/* RESULTS */}
          <BeforeAfter
            lang={lang}
            onSelectCase={(effect) => openBooking(effect)}
          />

          <Divider />

          {/* SERVICES */}
          <section
            id="services"
            className="relative z-10 mx-auto max-w-5xl scroll-mt-24 px-6 py-28 sm:py-32"
          >
            <div className="mb-14 max-w-2xl">
              <div className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-gold-400">
                <span className="h-px w-8 bg-gold-500/40" />
                Lash Atelier
              </div>
              <h2 className="gsap-pricing-title mt-5 font-serif text-4xl leading-tight text-cream-100 sm:text-5xl">
                {t.pricing.title}
              </h2>
              <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-cream-200/58 sm:text-base">
                {t.pricing.subtitle}
              </p>
            </div>

            <div className="gsap-services-list border-t border-white/10">
              {t.pricing.items.map((item, idx) => (
                <article
                  key={`${item.name}-${idx}`}
                  className="gsap-service-card group border-b border-white/10 py-7 sm:py-9"
                >
                  <div className="grid grid-cols-[auto_1fr] gap-5 sm:grid-cols-[64px_1fr_auto] sm:items-center sm:gap-8">
                    <div className="pt-1 text-[10px] font-medium tracking-[0.18em] text-cream-200/30 sm:pt-0">
                      {String(idx + 1).padStart(2, '0')}
                    </div>

                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap items-center gap-2.5">
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold-400">
                          {item.tag}
                        </span>
                        <span className="h-3 w-px bg-white/10" />
                        <span className="text-[9px] uppercase tracking-[0.15em] text-cream-200/38">
                          {item.time}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl leading-tight text-cream-100 transition-colors group-hover:text-gold-300 sm:text-3xl">
                        {item.name}
                      </h3>
                      <p className="mt-2 max-w-2xl text-xs font-light leading-relaxed text-cream-200/55 sm:text-sm">
                        {item.desc}
                      </p>
                    </div>

                    <div className="col-start-2 mt-1 flex items-center justify-between gap-5 sm:col-auto sm:mt-0 sm:flex-col sm:items-end sm:gap-3">
                      <span className="font-serif text-2xl text-gold-400 sm:text-3xl">{item.price}</span>
                      <GsapMagnetic
                        onClick={() => openBooking(item.name)}
                        className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.17em] text-cream-100 transition-colors hover:border-gold-500/35 hover:bg-gold-500 hover:text-obsidian-950 sm:px-5"
                      >
                        {t.nav.book}
                      </GsapMagnetic>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 flex items-start gap-3 border-t border-white/10 pt-6 text-xs leading-relaxed text-cream-200/55">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span>{t.pricing.depositNote}</span>
            </div>
          </section>

          <Divider />

          {/* REVIEWS */}
          <Reviews lang={lang} />

          <Divider />

          {/* FAQ */}
          <FAQ lang={lang} />

          <Divider />

          {/* STUDIO */}
          <section
            id="studio"
            className="gsap-studio relative z-10 scroll-mt-24 bg-obsidian-900/45 py-24 sm:py-28"
          >
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              <div className="gsap-studio-info">
                <div className="gsap-studio-kicker mb-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-gold-400">
                  Madrid · Barrio de Salamanca
                </div>

                <h2 className="gsap-studio-heading mb-6 font-serif text-4xl leading-tight text-cream-100 sm:text-5xl">
                  {t.footer.locationTitle}
                </h2>

                <div className="mb-8 space-y-5 text-sm font-light text-cream-200/65">
                  <div className="studio-detail flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
                    <div>
                      <span>{t.footer.address}</span>
                      <div>
                        <a
                          href="https://maps.google.com/?q=Calle+de+Velazquez+48+28001+Madrid"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-gold-400 underline underline-offset-4 transition-colors hover:text-gold-300"
                        >
                          <span>{lang === 'es' ? 'Abrir en Google Maps' : 'Open in Google Maps'}</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="studio-detail flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
                    <span>{t.footer.metro}</span>
                  </div>
                </div>

                <div className="studio-cta">
                  <GsapMagnetic>
                    <a
                      href="https://wa.me/34614678720"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-emerald-500"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp Studio Directo
                    </a>
                  </GsapMagnetic>
                </div>
              </div>

              <div className="studio-image-frame relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-950 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85"
                  alt="Studio interior"
                  loading="lazy"
                  className="gsap-studio-img h-full w-full object-cover brightness-[0.88] contrast-[1.03] will-change-transform"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian-950/20 via-transparent to-transparent" />
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="relative z-10 overflow-visible bg-obsidian-950 px-6 pb-36 pt-16 text-center text-xs text-cream-200/45 md:pb-24">
            <div className="mx-auto max-w-4xl">
              <div className="mb-4 font-serif text-2xl uppercase leading-relaxed tracking-[0.18em] text-cream-100">
                Lash Atelier Madrid
              </div>

              <div className="mb-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-cream-200/65">
                <button
                  type="button"
                  onClick={() => setIsPrivacyOpen(true)}
                  className="underline underline-offset-4 transition-colors hover:text-gold-400"
                >
                  {lang === 'es' ? 'Política de Privacidad (RGPD / LOPD)' : 'Privacy Policy (GDPR)'}
                </button>
                <span aria-hidden="true">·</span>
                <span className="text-cream-200/35">
                  {lang === 'es' ? 'Aviso Legal (LSSI-CE)' : 'Legal Notice'}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-cream-200/35">
                  {lang === 'es' ? 'Hojas de reclamaciones disponibles' : 'Consumer complaint sheets available'}
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
        onOpenBooking={() => openBooking()}
      />

      <ScrollToTop />
    </>
  );
}

export default App;