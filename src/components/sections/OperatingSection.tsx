
import { memo } from 'react';
import { Zap } from 'lucide-react';
import { InputField } from '../ui/InputField';
import { useTranslation } from '../../hooks/useTranslation';
import { formatPrice, CURRENCY_SYMBOLS } from '../../utils/calculations';
import type { CalculationValues, CalculationResults, Currency, Language } from '../../types';

interface OperatingSectionProps {
  readonly values: CalculationValues;
  readonly results: CalculationResults;
  readonly currency: Currency;
  readonly language: Language;
  readonly onUpdateValue: (key: keyof CalculationValues, value: number) => void;
  readonly sectionRef?: (el: HTMLDivElement | null) => void;
}

export const OperatingSection = memo<OperatingSectionProps>(({
  values,
  results,
  currency,
  language,
  onUpdateValue,
  sectionRef
}) => {
  const t = useTranslation(language);

  return (
    <section 
      ref={sectionRef}
      className="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500"
      aria-labelledby="operating-section-title"
    >
      <div className="flex items-center mb-3">
        <Zap className="h-5 w-5 text-orange-500 mr-2" aria-hidden="true" />
        <h2 id="operating-section-title" className="text-lg font-semibold text-gray-900">
          {t.operatingCosts}
        </h2>
      </div>
      
      <InputField
        label={t.printerWattage}
        value={values.printerWattage}
        onChange={(e) => onUpdateValue('printerWattage', parseFloat(e.target.value) || 0)}
        unit={t.units.watts}
        step="1"
        aria-describedby="printer-wattage-description"
      />
      
      <InputField
        label={t.electricityRate}
        value={values.electricityRate}
        onChange={(e) => onUpdateValue('electricityRate', parseFloat(e.target.value) || 0)}
        unit={`${CURRENCY_SYMBOLS[currency]}/kWh`}
        aria-describedby="electricity-rate-description"
      />
      
      <InputField
        label={t.wearTearPerHour}
        value={values.wearTearPerHour}
        onChange={(e) => onUpdateValue('wearTearPerHour', parseFloat(e.target.value) || 0)}
        unit={`${CURRENCY_SYMBOLS[currency]}/hr`}
        aria-describedby="wear-tear-description"
      />
      
      <InputField
        label={t.packagingCost}
        value={values.packagingCost}
        onChange={(e) => onUpdateValue('packagingCost', parseFloat(e.target.value) || 0)}
        unit={CURRENCY_SYMBOLS[currency]}
        step="0.5"
        aria-describedby="packaging-cost-description"
      />
      
      <div 
        className="bg-orange-50 p-2 rounded-md space-y-1"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm text-orange-800">
          <strong>{t.electricity}:</strong> {formatPrice(results.electricityCost, currency)}
        </p>
        <p className="text-sm text-orange-800">
          <strong>{t.wearTear}:</strong> {formatPrice(results.wearTearCost, currency)}
        </p>
        <p className="text-sm text-orange-800">
          <strong>{t.packaging}:</strong> {formatPrice(values.packagingCost, currency)}
        </p>
      </div>
    </section>
  );
});

OperatingSection.displayName = 'OperatingSection';