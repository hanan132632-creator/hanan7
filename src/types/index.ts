export type CategoryType = 
  | 'all' 
  | 'real_estate' 
  | 'gathering_games' 
  | 'blueprints_2026' 
  | 'canva_templates' 
  | 'royal_collection';

export interface PropertyDetails {
  areaSqM: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
  city: string;
  virtualTourAvailable: boolean;
  developer?: string;
  yearBuilt?: number;
}

export interface DigitalDetails {
  fileFormat: string;
  fileSize: string;
  instantDownload: boolean;
  canvaEditable?: boolean;
  compatibleApps?: string[];
  playersCount?: string;
}

export interface ProductItem {
  id: string;
  title: string;
  subtitle: string;
  category: CategoryType;
  categoryLabel: string;
  priceSAR: number;
  discountPriceSAR?: number;
  rating: number;
  reviewsCount: number;
  badgeText?: string;
  isVipExclusive?: boolean;
  imageUrl: string;
  description: string;
  features: string[];
  propertyDetails?: PropertyDetails;
  digitalDetails?: DigitalDetails;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

export type Currency = 'SAR' | 'AED' | 'USD';

export type LegalTabType = 'privacy' | 'terms' | 'about' | 'contact' | 'domain_verify';
