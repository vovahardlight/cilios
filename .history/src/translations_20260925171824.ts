export type Lang = 'es' | 'en';

export const content = {
  es: {
    nav: {
      services: 'Servicios',
      results: 'Resultados',
      method: 'El Método',
      reviews: 'Opiniones',
      book: 'Reservar Cita',
      spotsLeft: '3 citas libres esta semana en Madrid',
    },
    cookies: {
        text: 'Utilizamos cookies técnicas y analíticas para optimizar tu experiencia y analizar el tráfico de acuerdo con las directrices de la AEPD. Puedes aceptar todas o rechazarlas en bloque.',
        accept: 'Aceptar todas',
        reject: 'Rechazar todas',
      },
    hero: {
      badge: 'Estudio de Mirada de Alta Gama · Madrid',
      titlePrimary: 'Mirada perfecta y natural,',
      titleSecondary: 'sin peso ni artificios.',
      desc: 'Extensiones de pestañas de autor diseñadas según tu fisionomía. Olvídate del rímel con una técnica segura que protege la salud de tus pestañas naturales.',
      ctaBook: 'Reservar mi cita',
      ctaQuiz: 'Descubrir mi efecto ideal',
    },
    proof: {
      years: '6+ Años',
      yearsDesc: 'de maestría y especialización',
      retention: '4 a 6 Semanas',
      retentionDesc: 'de retención perfecta garantizada',
      safety: 'Normativa CE',
      safetyDesc: 'Adhesivos médicos sin formaldehído',
      comfort: '100% Confort',
      comfortDesc: 'Camilla ergonómica efecto nube',
    },
    slider: {
      tag: 'Evidencia Visual',
      title: 'El Poder de la Precisión',
      subtitle: 'Desliza para ver la transformación real bajo luz natural macro.',
      before: 'Sin Extensiones',
      after: 'Con Efecto de Autor',
      dragHint: 'Arrastra el divisor',
      cases: [
        { name: 'Efecto Mojado (Wet Look)', curve: 'Curvatura M', thickness: '0.07mm', time: '1h 45m' },
        { name: 'Pelo a Pelo Clásico Nude', curve: 'Curvatura C', thickness: '0.10mm', time: '1h 30m' },
        { name: 'Efecto Foxy Eyeliner', curve: 'Curvatura L', thickness: '0.07mm', time: '1h 50m' },
      ],
      ctaBtn: 'Deseo este resultado',
    },
    quiz: {
      trigger: '¿Indecisa con el efecto? Haz el test fisionómico (1 min)',
      title: 'Encuentra tu Mirada Ideal',
      step: 'Paso',
      q1: '¿Cuál es tu rutina habitual de maquillaje?',
      q1_a: 'Apenas me maquillo, busco naturalidad absoluta',
      q1_b: 'Siempre uso máscara de pestañas',
      q1_c: 'Me encanta el delineador rasgado (eyeliner)',
      q2: '¿Cómo definirías tus pestañas naturales?',
      q2_a: 'Cortas o muy rectas',
      q2_b: 'Claras / Finas pero pobladas',
      q2_c: 'Normales, pero quiero olvidarme de peinarlas',
      resultTitle: 'Tu recomendación personalizada:',
      resultDesc: 'Basado en tus respuestas, tu mejor opción es el',
      bookViaWa: 'Reservar este efecto por WhatsApp',
    },
    pricing: {
      title: 'Menú de Tratamientos',
      subtitle: 'Precios honestos sin sorpresas. Todos los sets incluyen diseño fisionómico y cepillo de cuidado.',
      depositNote: 'Para formalizar tu cita se solicita una fianza de 20€ deducible del total (Bizum o Tarjeta).',
      items: [
        { name: 'Puesta Completa · Pelo a Pelo Natural', price: '65€', time: '90 min', desc: 'Efecto rímel elegante e imperceptible. Ideal para principiantes.' },
        { name: 'Efecto Mojado (Wet Look Trend)', price: '75€', time: '105 min', desc: 'Espigas brillantes y textura densa pero ligera. El más solicitado.' },
        { name: 'Volumen Ruso Sofisticado', price: '85€', time: '120 min', desc: 'Abanicos hechos a mano ultrafinos para máxima densidad sin dañar.' },
        { name: 'Mantenimiento (a las 3 semanas)', price: '45€', time: '60 min', desc: 'Relleno y reposición de las pestañas que han completado su ciclo natural.' },
      ]
    },
    footer: {
      locationTitle: 'Ubicación & Estudio',
      address: 'Calle de Velázquez 48, 1º Izq, Salamanca, 28001 Madrid',
      metro: 'Metro: Velázquez (L4) o Serrano (L4). Parking público a 40m.',
      legal: 'Aviso Legal · Política de Privacidad (RGPD) · Hojas de reclamaciones a disposición del consumidor.',
      copy: '© 2026 Lash Atelier Madrid. Todos los derechos reservados.'
    }
  },
  en: {
    nav: {
      services: 'Services',
      results: 'Results',
      method: 'The Method',
      reviews: 'Reviews',
      book: 'Book Appointment',
      spotsLeft: '3 slots available this week in Madrid',
    },
    cookies: {
        text: 'We use technical and analytical cookies to optimize your experience and analyze traffic in compliance with AEPD guidelines. You can accept all or reject them all.',
        accept: 'Accept all',
        reject: 'Reject all',
      },
    hero: {
      badge: 'High-End Eyelash Studio · Madrid',
      titlePrimary: 'Effortless, bespoke lashes',
      titleSecondary: 'with zero damage.',
      desc: 'Custom-designed lash extensions adapted to your eye anatomy. Wake up ready and skip mascara forever with a healthy, weightless technique.',
      ctaBook: 'Book appointment',
      ctaQuiz: 'Find your lash style',
    },
    proof: {
      years: '6+ Years',
      yearsDesc: 'of master specialization',
      retention: '4 to 6 Weeks',
      retentionDesc: 'guaranteed long retention',
      safety: 'EU Certified',
      safetyDesc: 'Medical grade adhesives, 0% formaldehyde',
      comfort: '100% Comfort',
      comfortDesc: 'Zero-gravity ergonomic memory foam bed',
    },
    slider: {
      tag: 'Visual Proof',
      title: 'Precision in Every Fiber',
      subtitle: 'Slide to explore raw 4K macro results under true daylight.',
      before: 'Natural Lashes',
      after: 'With Signature Set',
      dragHint: 'Drag the divider',
      cases: [
        { name: 'Wet Look Trend', curve: 'M Curl', thickness: '0.07mm', time: '1h 45m' },
        { name: 'Classic Nude (1:1)', curve: 'C Curl', thickness: '0.10mm', time: '1h 30m' },
        { name: 'Foxy Eyeliner Effect', curve: 'L Curl', thickness: '0.07mm', time: '1h 50m' },
      ],
      ctaBtn: 'I want this exact result',
    },
    quiz: {
      trigger: 'Unsure which set fits you? Take the 1-min quiz',
      title: 'Discover Your Signature Look',
      step: 'Step',
      q1: 'What is your everyday makeup routine?',
      q1_a: 'Barely any makeup, I prefer high minimalism',
      q1_b: 'Always mascara and lash curler',
      q1_c: 'I love sharp eyeliner and lifted eyes',
      q2: 'How would you describe your natural lashes?',
      q2_a: 'Short or pointing downwards',
      q2_b: 'Light / Blonde and fine',
      q2_c: 'Average, but I want to skip daily styling',
      resultTitle: 'Your recommended match:',
      resultDesc: 'Based on your facial balance, your ideal style is the',
      bookViaWa: 'Book this effect on WhatsApp',
    },
    pricing: {
      title: 'Treatment Menu',
      subtitle: 'Transparent rates. Every full set includes custom eye mapping & luxury aftercare brush.',
      depositNote: 'A 20€ booking deposit (via Bizum or Card) is required to secure your slot and is deducted from total.',
      items: [
        { name: 'Classic Pelo a Pelo Full Set', price: '65€', time: '90 min', desc: 'Clean, elegant mascara illusion. Perfect for lash first-timers.' },
        { name: 'Wet Look Trend Signature', price: '75€', time: '105 min', desc: 'Glossy textured spikes, modern and light. Our most requested service.' },
        { name: 'Sophisticated Russian Volume', price: '85€', time: '120 min', desc: 'Handcrafted ultra-fine fans for fuller lash lines without root stress.' },
        { name: 'Refill (at 3 weeks)', price: '45€', time: '60 min', desc: 'Restoring outgrown lashes and maintaining fullness.' },
      ]
    },
    footer: {
      locationTitle: 'Studio Location',
      address: 'Calle de Velázquez 48, 1st Floor, Salamanca, 28001 Madrid',
      metro: 'Metro: Velázquez (L4) or Serrano (L4). Public parking 40m away.',
      legal: 'Legal Notice · Privacy Policy (GDPR) · Consumer complaint sheets available.',
      copy: '© 2026 Lash Atelier Madrid. All rights reserved.'
    }
  }
};