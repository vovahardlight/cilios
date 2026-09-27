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
      subtitle: 'Misma mirada, misma iluminación. Comprueba la ausencia de pegotes y la perfecta autonomía de cada pestaña.',
      zoomActive: 'Desactivar Macro Zoom',
      zoomInactive: 'Activar Lupa Macro 2X',
      before: 'Sin Extensiones',
      after: 'Con Efecto de Autor',
      dragHint: 'Arrastra el divisor',
      guaranteeTitle: '0% Adhesiones Indebidas · 100% Autonomía',
      guaranteeDesc: 'Tu mirada no pesa; las pestañas naturales continúan su ciclo biológico sin sufrir daño.',
      ctaBtn: 'Deseo este resultado exacto',
      cases: [
        { name: 'Efecto Mojado (Wet Look)', curve: 'Curvatura M', thickness: '0.07mm', time: '1h 45m' },
        { name: 'Pelo a Pelo Clásico Nude', curve: 'Curvatura C', thickness: '0.10mm', time: '1h 30m' },
        { name: 'Efecto Foxy Eyeliner', curve: 'Curvatura L', thickness: '0.07mm', time: '1h 50m' },
      ],
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

    /* ВОТ ЗДЕСЬ ДОБАВЛЕНЫ МИКРО-ТЕГИ HAUTE COUTURE (tag) */
    pricing: {
      title: 'Menú de Tratamientos',
      subtitle: 'Precios honestos sin sorpresas. Todos los sets incluyen diseño fisionómico y cepillo de cuidado.',
      depositNote: 'Para formalizar tu cita se solicita una fianza de 20€ deducible del total (Bizum o Tarjeta).',
      items: [
        { 
          name: 'Puesta Completa · Pelo a Pelo Natural', 
          tag: 'INNUMERABLE / NUDE',
          price: '65€', 
          time: '90 min', 
          desc: 'Efecto rímel elegante e imperceptible. Ideal para principiantes.' 
        },
        { 
          name: 'Efecto Mojado (Wet Look Trend)', 
          tag: 'TENDENCIA 2026',
          price: '75€', 
          time: '105 min', 
          desc: 'Espigas brillantes y textura densa pero ligera. El más solicitado.' 
        },
        { 
          name: 'Volumen Ruso Sofisticado', 
          tag: 'ALTA COSTURA',
          price: '85€', 
          time: '120 min', 
          desc: 'Abanicos hechos a mano ultrafinos para máxima densidad sin dañar.' 
        },
        { 
          name: 'Mantenimiento (a las 3 semanas)', 
          tag: 'ESENCIAL / RETOQUE',
          price: '45€', 
          time: '60 min', 
          desc: 'Relleno y reposición de las pestañas que han completado su ciclo natural.' 
        },
      ]
    },

    marquee: 'BELLEZA NATURAL · AUTONOMÍA 100% · MADRID SALAMANCA · RETENCIÓN DE 6 SEMANAS · MIRADA BESPOKE · ',
    reviews: {
      tag: 'Social Proof · Salamanca',
      title: 'La Experiencia en Primera Persona',
      googleBadge: '5.0 ★★★★★ en Google Maps (+140 valoraciones)',
      items: [
        {
          quote: 'Llevo 3 años haciéndome las pestañas con ella. Es la única que respeta la salud de mi pestaña natural y el efecto mojado aguanta intacto todo el verano en la playa y piscina.',
          author: 'Lucía M.',
          location: 'Calle Serrano, Madrid',
        },
        {
          quote: 'El estudio es un remanso de paz en pleno barrio de Salamanca. La camilla ergonómica efecto nube hace que te duermas y el resultado es pura alta costura, nada artificial.',
          author: 'Beatriz C.',
          location: 'Recoletos, Madrid',
        },
        {
          quote: 'Tenía pánico a quedarme sin pestañas por una mala experiencia en otro sitio. El análisis fisionómico previo y la delicadeza con la que trabaja no tienen comparación.',
          author: 'Elena R.',
          location: 'Castellana, Madrid',
        },
      ]
    },
    faq: {
      tag: 'Dudas Frecuentes',
      title: 'Todo lo que Necesitas Saber',
      subtitle: 'Transparencia absoluta sobre la salud de tu mirada y el cuidado de tus extensiones.',
      items: [
        {
          q: '¿Puedo bañarme en la playa o piscina con las extensiones?',
          a: 'Sí, totalmente. Tras las primeras 24 horas posteriores a la aplicación, el adhesivo médico polimeriza al 100%, resistiendo perfectamente el agua salada del mar, el cloro de la piscina y el sudor.',
        },
        {
          q: '¿Dañará o debilitará mis pestañas naturales?',
          a: 'Rotundamente no. Nuestro método aísla cada pestaña con total autonomía (sin adhesiones indebidas). Seleccionamos un grosor ultrafino (0.05 - 0.07 mm) adaptado a la fuerza de tu propio pelo, permitiendo que cumpla su ciclo biológico de caída natural sin sobrepeso.',
        },
        {
          q: '¿Puedo hacerme el tratamiento si uso lentillas o tengo ojos sensibles?',
          a: 'Sí, es 100% compatible. Solo te pediremos retirar las lentillas durante la sesión para mayor comodidad. Usamos parches de hidrogel descongestionantes y adhesivos hipoalergénicos con registro europeo CPNP libres de formaldehído.',
        },
        {
          q: '¿Cuánto dura la sesión y cada cuánto debo hacer el retoque?',
          a: 'La primera puesta completa dura entre 90 y 110 minutos de relajación total en camilla ergonómica. El mantenimiento se recomienda cada 3 o 4 semanas para reponer las pestañas que han caído naturalmente.',
        },
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
      subtitle: 'Same eye, identical lighting. Inspect root isolation and zero stickies under true macro resolution.',
      zoomActive: 'Disable Macro Zoom',
      zoomInactive: 'Enable 2X Macro Loupe',
      before: 'Natural Lashes',
      after: 'Signature Set',
      dragHint: 'Drag the divider',
      guaranteeTitle: '0% Clumping · 100% Lash Autonomy',
      guaranteeDesc: 'Zero heaviness; your natural lashes continue their healthy growth cycle intact.',
      ctaBtn: 'I want this exact result',
      cases: [
        { name: 'Wet Look Trend', curve: 'M Curl', thickness: '0.07mm', time: '1h 45m' },
        { name: 'Classic Nude (1:1)', curve: 'C Curl', thickness: '0.10mm', time: '1h 30m' },
        { name: 'Foxy Eyeliner Effect', curve: 'L Curl', thickness: '0.07mm', time: '1h 50m' },
      ],
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

    /* ВОТ ЗДЕСЬ ДОБАВЛЕНЫ АНГЛИЙСКИЕ МИКРО-ТЕГИ (tag) */
    pricing: {
      title: 'Treatment Menu',
      subtitle: 'Transparent rates. Every full set includes custom eye mapping & luxury aftercare brush.',
      depositNote: 'A 20€ booking deposit (via Bizum or Card) is required to secure your slot and is deducted from total.',
      items: [
        { 
          name: 'Classic Pelo a Pelo Full Set', 
          tag: 'INNUMERABLE / NUDE',
          price: '65€', 
          time: '90 min', 
          desc: 'Clean, elegant mascara illusion. Perfect for lash first-timers.' 
        },
        { 
          name: 'Wet Look Trend Signature', 
          tag: 'TREND 2026',
          price: '75€', 
          time: '105 min', 
          desc: 'Glossy textured spikes, modern and light. Our most requested service.' 
        },
        { 
          name: 'Sophisticated Russian Volume', 
          tag: 'HAUTE COUTURE',
          price: '85€', 
          time: '120 min', 
          desc: 'Handcrafted ultra-fine fans for fuller lash lines without root stress.' 
        },
        { 
          name: 'Refill (at 3 weeks)', 
          tag: 'ESSENTIAL / REFILL',
          price: '45€', 
          time: '60 min', 
          desc: 'Restoring outgrown lashes and maintaining fullness.' 
        },
      ]
    },

    marquee: 'NATURAL BEAUTY · 100% AUTONOMY · MADRID SALAMANCA · 6-WEEK RETENTION · BESPOKE LASHES · ',
    reviews: {
      tag: 'Social Proof · Salamanca',
      title: 'Client Experiences',
      googleBadge: '5.0 ★★★★★ on Google Maps (+140 verified reviews)',
      items: [
        {
          quote: 'I have been getting my lashes done here for 3 years. She is the only artist who genuinely protects natural lash health. The wet look set survives summer beach and pool without shedding.',
          author: 'Lucía M.',
          location: 'Calle Serrano, Madrid',
        },
        {
          quote: 'The studio is a sanctuary in Barrio de Salamanca. The zero-gravity cloud bed makes you fall asleep and the result is understated high fashion, never artificial.',
          author: 'Beatriz C.',
          location: 'Recoletos, Madrid',
        },
        {
          quote: 'I have visited top lash salons in London and Paris, but the bespoke anatomical mapping here is on another level. Pure quiet luxury.',
          author: 'Charlotte W.',
          location: 'Madrid Expat Community',
        },
      ]
    },
    faq: {
      tag: 'Frequently Asked Questions',
      title: 'Everything You Need to Know',
      subtitle: 'Complete clarity on ocular health and looking after your bespoke set.',
      items: [
        {
          q: 'Can I swim in the ocean or pool with lash extensions?',
          a: 'Yes, completely. Once the initial 24-hour curing window passes, our medical-grade adhesive is 100% waterproof, saltwater-proof, and sweat-resistant.',
        },
        {
          q: 'Will extensions damage my natural lashes?',
          a: 'Absolutely not. Our signature technique guarantees 100% follicle isolation with zero clumping. We calibrate ultra-light fibers (0.05 - 0.07 mm) to your natural lash strength so their natural growth cycle remains intact.',
        },
        {
          q: 'Can I have extensions if I wear contact lenses or have sensitive eyes?',
          a: 'Yes, 100% safe. We only ask you to remove your contact lenses during the appointment. We work exclusively with medical-grade, formaldehyde-free, EU-registered (CPNP) adhesives and soothing hydrogel pads.',
        },
        {
          q: 'How long is the session and how often are refills needed?',
          a: 'A bespoke full set takes between 90 to 110 minutes on an ergonomic memory foam recliner. Refills are typically scheduled every 3 to 4 weeks to maintain fullness.',
        },
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