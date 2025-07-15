import { en } from './en';
import { fr } from './fr';

export type Language = 'en' | 'fr';

export interface Translation {
  title: string;
  materialCosts: string;
  timeLabor: string;
  operatingCosts: string;
  businessSettings: string;
  filamentCostPerKg: string;
  printWeight: string;
  materialCost: string;
  printTime: string;
  hourlyRate: string;
  laborCost: string;
  printerWattage: string;
  electricityRate: string;
  wearTearPerHour: string;
  packagingCost: string;
  electricity: string;
  wearTear: string;
  packaging: string;
  profitMargin: string;
  quantity: string;
  profitPerUnit: string;
  costBreakdown: string;
  material: string;
  labor: string;
  totalCost: string;
  profit: string;
  sellingPrice: string;
  recommendedPrice: string;
  newProfit: string;
  perUnit: string;
  batchSummary: string;
  totalRevenue: string;
  totalProfit: string;
  businessTips: string;
  tips: readonly string[];
  units: {
    kilograms: string;
    grams: string;
    hours: string;
    watts: string;
    pieces: string;
    percent: string;
  };
  settings: string;
  language: string;
  currency: string;
}

export const translations: Record<Language, Translation> = {
  en,
  fr
};

export const getTranslation = (language: Language): Translation => {
  return translations[language] || translations.en;
};

export const AVAILABLE_LANGUAGES = [
  { code: 'en' as const, name: 'English' },
  { code: 'fr' as const, name: 'Français' }
] as const;

export const DEFAULT_LANGUAGE: Language = 'en';