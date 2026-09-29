import React, { createContext, useContext, useState, useEffect } from 'react';
import { content as initialContent, type Lang } from '../translations';
import { type SiteContent, type SeoConfig, type CustomMetaTag } from '../types/cms';

const STORAGE_KEY = 'lash_atelier_cms_data_v2';

const defaultSeoEs: SeoConfig = {
  title: 'Lash Atelier Madrid · Estudio de Pestañas de Alta Gama | Salamanca',
  description: 'Estudio exclusivo de extensiones de pestañas de autor en el Barrio de Salamanca, Madrid. Técnica fisionómica, retención de 6 semanas y salud ocular garantizada.',
  keywords: 'extensiones de pestañas madrid, pestañas pelo a pelo salamanca, efecto mojado madrid, lifting pestañas madrid, volumen ruso velazquez',
  author: 'Elena Ramos · Lash Atelier Madrid',
  canonicalUrl: 'https://cilios-roan.vercel.app',
  robotsIndex: true,
  robotsFollow: true,
  maxSnippet: -1,
  maxImagePreview: 'large',
  geoRegion: 'ES-M',
  geoPlacename: 'Madrid (Barrio de Salamanca)',
  geoPosition: '40.4285;-3.6841',
  icbm: '40.4285, -3.6841',
  ogTitle: 'Lash Atelier Madrid · Pestañas de Alta Costura',
  ogDescription: 'Extensiones de pestañas de autor diseñadas según tu fisionomía en el Barrio de Salamanca.',
  ogImage: '/grok-image-9f5b9f4b-7ed3-4a95-87d0-53dff3a9a780.jpg',
  ogType: 'business.business',
  ogLocale: 'es_ES',
  ogSiteName: 'Lash Atelier Madrid',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Lash Atelier Madrid · Pestañas de Alta Gama',
  twitterDescription: 'Estudio exclusivo de pestañas de autor en Barrio de Salamanca, Madrid.',
  twitterImage: '/grok-image-9f5b9f4b-7ed3-4a95-87d0-53dff3a9a780.jpg',
  twitterSite: '@lashateliermadrid',
  googleSiteVerification: '',
  googleMapsUrl: 'https://maps.google.com/?q=Calle+de+Velazquez+48+28001+Madrid',
  googleAnalyticsId: '',
  metaPixelId: '',
  customMetaTags: [
    { id: '1', type: 'name', key: 'theme-color', value: '#070707' },
    { id: '2', type: 'name', key: 'format-detection', value: 'telephone=yes' },
    { id: '3', type: 'property', key: 'business:contact_data:locality', value: 'Madrid' },
    { id: '4', type: 'property', key: 'business:contact_data:region', value: 'Comunidad de Madrid' },
    { id: '5', type: 'property', key: 'business:contact_data:postal_code', value: '28001' },
    { id: '6', type: 'property', key: 'business:contact_data:country_name', value: 'Spain' },
  ],
  customHeadCode: '',
};

const defaultSeoEn: SeoConfig = {
  ...defaultSeoEs,
  title: 'Lash Atelier Madrid · Luxury Bespoke Lash Studio | Salamanca',
  description: 'Bespoke eyelash extensions atelier in Barrio de Salamanca, Madrid. Custom anatomical mapping, 6-week retention, and zero damage guarantee.',
  keywords: 'eyelash extensions madrid, luxury lash salon salamanca, wet look lashes spain, lash artist madrid, russian volume madrid',
  ogTitle: 'Lash Atelier Madrid · Bespoke Lash Studio',
  ogDescription: 'Bespoke eyelash extensions designed to enhance your natural gaze in Barrio de Salamanca.',
  ogLocale: 'en_US',
  twitterTitle: 'Lash Atelier Madrid · Luxury Eyelash Studio',
  twitterDescription: 'Bespoke eyelash extensions atelier in Barrio de Salamanca, Madrid.',
};

const defaultContent: SiteContent = {
  seo: {
    es: defaultSeoEs,
    en: defaultSeoEn,
  },
  spotsLeft: {
    es: initialContent.es.nav.spotsLeft,
    en: initialContent.en.nav.spotsLeft,
  },
  depositAmount: '20,00 €',
  services: {
    es: initialContent.es.pricing.items as any,
    en: initialContent.en.pricing.items as any,
  },
  reviews: {
    es: initialContent.es.reviews.items,
    en: initialContent.en.reviews.items,
  },
  faq: {
    es: initialContent.es.faq.items,
    en: initialContent.en.faq.items,
  }
};

interface ContentContextType {
  data: SiteContent;
  updateData: (newData: SiteContent) => void;
  resetToDefault: () => void;
  currentLang: Lang;
}

const ContentContext = createContext<ContentContextType | null>(null);

export const ContentProvider: React.FC<{ children: React.ReactNode; lang: Lang }> = ({ children, lang }) => {
  const [data, setData] = useState<SiteContent>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return defaultContent;
  });

  const updateData = (newData: SiteContent) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  const resetToDefault = () => {
    setData(defaultContent);
    localStorage.removeItem(STORAGE_KEY);
  };

  // ПОЛНОЦЕННЫЙ ПРОФЕССИОНАЛЬНЫЙ SEO-ИНЖЕКТОР В <HEAD>
  useEffect(() => {
    const seo: SeoConfig = data.seo[lang] || data.seo.es;

    // 1. Title
    document.title = seo.title;

    // Хелпер создания/обновления meta-тегов
    const setMeta = (attr: 'name' | 'property' | 'http-equiv', key: string, value: string) => {
      if (!value && value !== '') return;
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    // 2. Базовые мета-теги
    setMeta('name', 'description', seo.description);
    setMeta('name', 'keywords', seo.keywords);
    setMeta('name', 'author', seo.author);

    // 3. Директивы Robots для поисковых пауков
    const robotsContent = [
      seo.robotsIndex ? 'index' : 'noindex',
      seo.robotsFollow ? 'follow' : 'nofollow',
      `max-snippet:${seo.maxSnippet}`,
      `max-image-preview:${seo.maxImagePreview}`,
    ].join(', ');
    setMeta('name', 'robots', robotsContent);
    setMeta('name', 'googlebot', robotsContent);

    // 4. Локальное SEO Испании (Madrid Geo Tags)
    setMeta('name', 'geo.region', seo.geoRegion);
    setMeta('name', 'geo.placename', seo.geoPlacename);
    setMeta('name', 'geo.position', seo.geoPosition);
    setMeta('name', 'ICBM', seo.icbm);

    // 5. OpenGraph (WhatsApp, Facebook, Telegram)
    setMeta('property', 'og:title', seo.ogTitle || seo.title);
    setMeta('property', 'og:description', seo.ogDescription || seo.description);
    setMeta('property', 'og:image', seo.ogImage);
    setMeta('property', 'og:url', seo.canonicalUrl);
    setMeta('property', 'og:type', seo.ogType);
    setMeta('property', 'og:locale', seo.ogLocale);
    setMeta('property', 'og:site_name', seo.ogSiteName);

    // 6. Twitter Cards
    setMeta('name', 'twitter:card', seo.twitterCard);
    setMeta('name', 'twitter:title', seo.twitterTitle || seo.title);
    setMeta('name', 'twitter:description', seo.twitterDescription || seo.description);
    setMeta('name', 'twitter:image', seo.twitterImage || seo.ogImage);
    setMeta('name', 'twitter:site', seo.twitterSite);

    // 7. Верификация Google Search Console
    if (seo.googleSiteVerification) {
      setMeta('name', 'google-site-verification', seo.googleSiteVerification);
    }

    // 8. Canonical & Hreflang
    const setLink = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        if (hreflang) el.setAttribute('hreflang', hreflang);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    setLink('canonical', seo.canonicalUrl);
    setLink('alternate', `${seo.canonicalUrl}/es`, 'es-ES');
    setLink('alternate', `${seo.canonicalUrl}/en`, 'en-US');
    setLink('alternate', seo.canonicalUrl, 'x-default');

    // 9. Произвольные пользовательские теги из конструктора сеошника
    if (seo.customMetaTags && Array.isArray(seo.customMetaTags)) {
      seo.customMetaTags.forEach((tag) => {
        if (tag.key && tag.value) {
          setMeta(tag.type, tag.key, tag.value);
        }
      });
    }

    // 10. Вставка стороннего кода (GTM, скрипты в Head)
    let customHeadContainer = document.querySelector('#cms-custom-head-code');
    if (!customHeadContainer) {
      customHeadContainer = document.createElement('div');
      customHeadContainer.setAttribute('id', 'cms-custom-head-code');
      customHeadContainer.setAttribute('style', 'display:none;');
      document.head.appendChild(customHeadContainer);
    }
    customHeadContainer.innerHTML = seo.customHeadCode || '';

    // 11. Schema.org ДВОЙНАЯ МИКРОРАЗМЕТКА (BeautySalon + FAQPage для Rich Snippets)
    let schemaScript = document.querySelector('#schema-advanced-seo');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('id', 'schema-advanced-seo');
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }

    const currentFaq = data.faq[lang] || data.faq.es;

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BeautySalon",
          "@id": `${seo.canonicalUrl}/#salon`,
          "name": "Lash Atelier Madrid",
          "url": seo.canonicalUrl,
          "image": seo.ogImage,
          "description": seo.description,
          "telephone": "+34614678720",
          "priceRange": "€€€",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Calle de Velázquez 48, 1º Izquierda",
            "addressLocality": "Madrid",
            "addressRegion": "Comunidad de Madrid",
            "postalCode": "28001",
            "addressCountry": "ES"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 40.4285,
            "longitude": -3.6841
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "10:00",
              "closes": "20:00"
            }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Servicios de Pestañas",
            "itemListElement": (data.services[lang] || data.services.es).map((srv) => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": srv.name,
                "description": srv.desc
              },
              "price": srv.price.replace('€', '').trim(),
              "priceCurrency": "EUR"
            }))
          }
        },
        // FAQ Rich Snippets (вопросы и ответы прямо в выдаче Google!)
        {
          "@type": "FAQPage",
          "@id": `${seo.canonicalUrl}/#faq`,
          "mainEntity": currentFaq.map((item) => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.a
            }
          }))
        }
      ]
    };

    schemaScript.textContent = JSON.stringify(schemaData);
  }, [lang, data]);

  return (
    <ContentContext.Provider value={{ data, updateData, resetToDefault, currentLang: lang }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
};