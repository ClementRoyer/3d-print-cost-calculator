import { useState, useEffect, useCallback } from 'react';
import type { CalculationValues, CalculationResults, AppSettings } from '../types';
import { DEFAULT_LANGUAGE } from '../i18n';
import { calculatePrintCosts } from '../utils/calculations';

const DEFAULT_VALUES: CalculationValues = {
  filamentCostPerKg: 19.00,
  printWeight: 238.67,
  printTime: 7.5,
  hourlyRate: 0.00,
  hourlyRateGlobal: 0.00,
  printerWattage: 350,
  electricityRate: 0.20,
  wearTearPerHour: 0.20,
  packagingCost: 0.00,
  packagingCostGlobal: 0.00,
  cfsWattage: 30,
  dryingCostPerPrint: 0.06,
  colorCount: 1,
  colorSurchargePerColor: 0.50,
  isSpecificSpoolRequired: false,
  specificSpoolCost: 0.00,
  profitMargin: 30,
  quantity: 1
} as const;

const DEFAULT_SETTINGS: AppSettings = {
  language: DEFAULT_LANGUAGE,
  currency: 'EUR'
} as const;

export const useCalculator = () => {
  const [values, setValues] = useState<CalculationValues>(DEFAULT_VALUES);
  const [results, setResults] = useState<CalculationResults>({
    materialCost: 0,
    laborCost: 0,
    electricityCost: 0,
    wearTearCost: 0,
    extrasCost: 0,
    totalCost: 0,
    profit: 0,
    sellingPrice: 0
  });
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  // Memoized calculation function
  const recalculate = useCallback(() => {
    const newResults = calculatePrintCosts(values);
    setResults(newResults);
  }, [values]);

  // Recalculate when values change
  useEffect(() => {
    recalculate();
  }, [recalculate]);

  // Update a specific calculation value
  const updateValue = useCallback((key: keyof CalculationValues, value: number | boolean) => {
    setValues(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // Update settings
  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  }, []);

  // Reset to default values
  const resetToDefaults = useCallback(() => {
    setValues(DEFAULT_VALUES);
  }, []);

  return {
    values,
    results,
    settings,
    updateValue,
    updateSettings,
    resetToDefaults,
    recalculate
  };
};