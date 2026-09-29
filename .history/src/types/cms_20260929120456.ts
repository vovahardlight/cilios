import { type Lang } from '../translations';

export interface CustomMetaTag {
  id: string;
  type: 'name' | 'property' | 'http-equiv';
  key: string;
  value: string;
}

export interface SeoConfig {
  // 1. Основные метаданные
  title: string;
  description: string;
  keywords: string;
  author: string;
  canonicalUrl: string;

  // 2. Роботы и индексация
  robotsIndex: boolean;
  robotsFollow: boolean;
  maxSnippet: number;
  maxImagePreview: 'large' | 'standard' | 'none';

  // 3. Локальное SEO для Мадрида (Geo Tags)
  geoRegion: string;      // напр. "ES-MD"
  geoPlacename: string;   // напр. "Madrid, Barrio de Salamanca"
  geoPosition: string;    // напр. "40.4285;-3.6841"
  icbm: string;           // напр. "40.4285, -3.6841"

  // 4. OpenGraph (Facebook, WhatsApp, LinkedIn)
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  ogLocale: string;
  ogSiteName: string;

  // 5. Twitter Card
  twitterCard: 'summary_large_image' | 'summary';
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterSite: string;

  // 6. Верификация поисковиков
  googleSiteVerification: string;
  googleMapsUrl: string;

  // 7. Аналитика и Пиксели
  googleAnalyticsId: string;
  metaPixelId: string;

  // 8. Конструктор произвольных тегов сеошника
  customMetaTags: CustomMetaTag[];

  // 9. Вставка стороннего кода сеошника (GTM, скрипты)
  customHeadCode: string;
}

export interface ServiceItem {
  name: string;
  tag: string;
  price: string;
  time: string;
  desc: string;
}

export interface ReviewItem {
  quote: string;
  author: string;
  location: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface SiteContent {
  seo: Record<Lang, SeoConfig>;
  spotsLeft: Record<Lang, string>;
  depositAmount: string;
  services: Record<Lang, ServiceItem[]>;
  reviews: Record<Lang, ReviewItem[]>;
  faq: Record<Lang, FaqItem[]>;
}