import { type Lang } from '../translations';

export interface SeoConfig {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  canonicalUrl: string;
  googleMapsUrl: string;
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