import type { CalculationValues, CalculationResults, Currency } from '../types';

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  EUR: '€',
  USD: '$',
  GBP: '£',
  CAD: 'CA$'
} as const;

export const formatPrice = (price: number, currency: Currency): string => {
  if (!Number.isFinite(price) || price < 0) {
    return `0.00 ${CURRENCY_SYMBOLS[currency]}`;
  }
  
  const symbol = CURRENCY_SYMBOLS[currency];
  const roundedPrice = Math.ceil(price * 100) / 100;
  return `${roundedPrice.toFixed(2)} ${symbol}`;
};

export const calculateRecommendedPrice = (price: number): number => {
  if (!Number.isFinite(price) || price <= 0) {
    return 0;
  }

  let recommendedPrice: number;
  
  if (price < 1) {
    // For prices under 1, round to nearest 0.05
    recommendedPrice = Math.ceil(price * 20) / 20;
  } else if (price < 10) {
    // For prices 1-10, round to nearest 0.50
    recommendedPrice = Math.ceil(price * 2) / 2;
  } else if (price < 100) {
    // For prices 10-100, round to nearest 1.00
    recommendedPrice = Math.ceil(price);
  } else {
    // For prices over 100, round to nearest 5.00
    recommendedPrice = Math.ceil(price / 5) * 5;
  }
  
  // Ensure 2 decimal places
  return Math.round(recommendedPrice * 100) / 100;
};

export const calculatePrintCosts = (values: CalculationValues): CalculationResults => {
  // Input validation
  const safeValues = {
    filamentCostPerKg: Math.max(0, values.filamentCostPerKg || 0),
    printWeight: Math.max(0, values.printWeight || 0),
    printTime: Math.max(0, values.printTime || 0),
    hourlyRate: Math.max(0, values.hourlyRate || 0),
    printerWattage: Math.max(0, values.printerWattage || 0),
    electricityRate: Math.max(0, values.electricityRate || 0),
    wearTearPerHour: Math.max(0, values.wearTearPerHour || 0),
    packagingCost: Math.max(0, values.packagingCost || 0),
    profitMargin: Math.max(0, values.profitMargin || 0),
    quantity: Math.max(1, values.quantity || 1)
  };

  // Core calculations
  const materialCost = safeValues.filamentCostPerKg * (safeValues.printWeight / 1000);
  const laborCost = safeValues.printTime * safeValues.hourlyRate;
  const electricityCost = (safeValues.printerWattage / 1000) * safeValues.printTime * safeValues.electricityRate;
  const wearTearCost = safeValues.printTime * safeValues.wearTearPerHour;
  const totalCost = materialCost + laborCost + electricityCost + wearTearCost + safeValues.packagingCost;
  const profit = totalCost * (safeValues.profitMargin / 100);
  const sellingPrice = totalCost + profit;

  return {
    materialCost,
    laborCost,
    electricityCost,
    wearTearCost,
    totalCost,
    profit,
    sellingPrice
  };
};

export const timeStringToDecimal = (timeString: string): number => {
  const [hours, minutes] = timeString.split(':').map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return 0;
  }
  return hours + (minutes || 0) / 60;
};

export const decimalToTimeString = (decimalHours: number): string => {
  if (!Number.isFinite(decimalHours) || decimalHours < 0) {
    return '00:00';
  }
  
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};