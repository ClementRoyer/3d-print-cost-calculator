import type { Language } from '../i18n';

export type { Language };

export interface CalculationValues {
  filamentCostPerKg: number;
  printWeight: number;
  printTime: number;
  hourlyRate: number;
  printerWattage: number;
  electricityRate: number;
  wearTearPerHour: number;
  packagingCost: number;
  profitMargin: number;
  quantity: number;
}

export interface CalculationResults {
  materialCost: number;
  laborCost: number;
  electricityCost: number;
  wearTearCost: number;
  totalCost: number;
  profit: number;
  sellingPrice: number;
}

export interface AppSettings {
  language: Language;
  currency: Currency;
}

export type Currency = 'EUR' | 'USD' | 'GBP' | 'CAD';

export interface NavigationSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface InputFieldProps {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  unit: string;
  step?: string;
  min?: string;
  max?: string;
  error?: string;
  'aria-describedby'?: string;
}

export interface TimeInputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  unit: string;
  error?: string;
  'aria-describedby'?: string;
}