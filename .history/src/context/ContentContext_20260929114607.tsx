import React, { createContext, useContext, useState, useEffect } from 'react';
import { content as initialContent, type Lang } from '../translations';
import { type SiteContent, type SeoConfig } from '../types/cms';

const STORAGE_KEY = 'lash_atelier_cms_data';

const defaultContent: SiteContent = {
  seo: {
    es: {
      title: 'Lash Atelier Madrid · Estudio de Pestañas de Alta Gama | Salamanca',
      description: 'Estudio exclusivo de extensiones de pestañas de autor en el Barrio de Salamanca, Madrid. Técnica fisionómica, retención de 6 semanas y salud ocular garantizada.',
      keywords: 'extensiones de pestañas madrid, pestañas pelo a pelo salamanca, efecto mojado madrid, lifting pestañas',
      ogImage: '/grok-image-9f5b9f4b-7ed3-4a95-87d0-53dff3a9a780.jpg',
      canonicalUrl: 'https://cilios-roan.vercel.app',
      googleMapsUrl: 'https://maps.google.com/?q=Calle+de+Velazquez+48+28001+Madrid',
    },
    en: {
      title: 'Lash Atelier Madrid · Luxury Bespoke Lash Studio | Salamanca',
      description: 'Bespoke eyelash extensions atelier in Barrio de Salamanca, Madrid. Custom anatomical mapping, 6-week retention, and zero damage guarantee.',
      keywords: 'eyelash extensions madrid, luxury lash salon salamanca, wet look lashes spain, lash artist madrid',
      ogImage: '/grok-image-9f5b9f4b-7ed3-4a95-87d0-53dff3a9a780.jpg',
      canonicalUrl: 'https://cilios-roan.vercel.app',
      googleMapsUrl: 'https://maps.google.com/?q=Calle+de+Velazquez+48+28001+Madrid',
    }
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

  // ДИНАМИЧЕСКИЙ SEO-МОДУЛЬ: Обновление метатегов в реальном времени
  useEffect(() => {
    const currentSeo: SeoConfig = data.seo[lang] || data.seo.es;
    
    // 1. Title
    document.title = currentSeo.title;

    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', currentSeo.description);

    // 3. Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', currentSeo.keywords);

    // 4. OpenGraph Tags (для WhatsApp и соцсетей)
    const setOg = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setOg('og:title', currentSeo.title);
    setOg('og:description', currentSeo.description);
    setOg('og:image', currentSeo.ogImage);
    setOg('og:url', currentSeo.canonicalUrl);

    // 5. Schema.org JSON-LD (Локальное SEO для Google Spain)
    let schemaScript = document.querySelector('#schema-local-business');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('id', 'schema-local-business');
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "BeautySalon",
      "name": "Lash Atelier Madrid",
      "image": currentSeo.ogImage,
      "description": currentSeo.description,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Calle de Velázquez 48, 1º Izquierda",
        "addressLocality": "Madrid",
        "postalCode": "28001",
        "addressCountry": "ES"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 40.4285,
        "longitude": -3.6841
      },
      "url": currentSeo.canonicalUrl,
      "telephone": "+34614678720",
      "priceRange": "€€€",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "10:00",
          "closes": "20:00"
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