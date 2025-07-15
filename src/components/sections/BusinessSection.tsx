
import { memo } from 'react';
import { DollarSign } from 'lucide-react';
import { InputField } from '../ui/InputField';
import { useTranslation } from '../../hooks/useTranslation';
import { formatPrice } from '../../utils/calculations';
import type { CalculationValues, CalculationResults, Currency, Language } from '../../types';

interface BusinessSectionProps {
  readonly values: CalculationValues;
  readonly results: CalculationResults;
  readonly currency: Currency;
  readonly language: Language;
  readonly onUpdateValue: (key: keyof CalculationValues, value: number) => void;
  readonly sectionRef?: (el: HTMLDivElement | null) => void;
}

export const BusinessSection = memo<BusinessSectionProps>(({
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
      className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500"
      aria-labelledby="business-section-title"
    >
      <div className="flex items-center mb-3">
        <DollarSign className="h-5 w-5 text-purple-500 mr-2" aria-hidden="true" />
        <h2 id="business-section-title" className="text-lg font-semibold text-gray-900">
          {t.businessSettings}
        </h2>
      </div>
      
      <InputField
        label={t.profitMargin}
        value={values.profitMargin}
        onChange={(e) => onUpdateValue('profitMargin', parseFloat(e.target.value) || 0)}
        unit={t.units.percent}
        step="1"
        min="0"
        aria-describedby="profit-margin-description"
      />
      
      <InputField
        label={t.quantity}
        value={values.quantity}
        onChange={(e) => onUpdateValue('quantity', parseFloat(e.target.value) || 0)}
        unit={t.units.pieces}
        step="1"
        min="1"
        aria-describedby="quantity-description"
      />
      
      <div 
        className="bg-purple-50 p-2 rounded-md"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm text-purple-800">
          <strong>{t.profitPerUnit}:</strong> {formatPrice(results.profit, currency)}
        </p>
      </div>
    </section>
  );
});

BusinessSection.displayName = 'BusinessSection';