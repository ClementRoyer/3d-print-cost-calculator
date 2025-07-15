import { memo } from 'react';
import { Package } from 'lucide-react';
import { InputField } from '../ui/InputField';
import { useTranslation } from '../../hooks/useTranslation';
import { formatPrice, CURRENCY_SYMBOLS } from '../../utils/calculations';
import type { CalculationValues, CalculationResults, Currency, Language } from '../../types';

interface MaterialSectionProps {
  readonly values: CalculationValues;
  readonly results: CalculationResults;
  readonly currency: Currency;
  readonly language: Language;
  readonly onUpdateValue: (key: keyof CalculationValues, value: number) => void;
  readonly sectionRef?: (el: HTMLDivElement | null) => void;
}

export const MaterialSection = memo<MaterialSectionProps>(({
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
      className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500"
      aria-labelledby="material-section-title"
    >
      <div className="flex items-center mb-3">
        <Package className="h-5 w-5 text-blue-500 mr-2" aria-hidden="true" />
        <h2 id="material-section-title" className="text-lg font-semibold text-gray-900">
          {t.materialCosts}
        </h2>
      </div>
      
      <InputField
        label={t.filamentCostPerKg}
        value={values.filamentCostPerKg}
        onChange={(e) => onUpdateValue('filamentCostPerKg', parseFloat(e.target.value) || 0)}
        unit={CURRENCY_SYMBOLS[currency]}
        step="0.5"
        aria-describedby="filament-cost-description"
      />
      
      <InputField
        label={t.printWeight}
        value={values.printWeight}
        onChange={(e) => onUpdateValue('printWeight', parseFloat(e.target.value) || 0)}
        unit={t.units.grams}
        aria-describedby="print-weight-description"
      />
      
      <div 
        className="bg-blue-50 p-2 rounded-md"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm text-blue-800">
          <strong>{t.materialCost}:</strong> {formatPrice(results.materialCost, currency)}
        </p>
      </div>
    </section>
  );
});

MaterialSection.displayName = 'MaterialSection';