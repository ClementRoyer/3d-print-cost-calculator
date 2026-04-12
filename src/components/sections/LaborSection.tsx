
import { memo } from 'react';
import { Clock } from 'lucide-react';
import { InputField } from '../ui/InputField';
import { TimeInputField } from '../ui/TimeInputField';
import { useTranslation } from '../../hooks/useTranslation';
import { formatPrice, CURRENCY_SYMBOLS } from '../../utils/calculations';
import type { CalculationValues, CalculationResults, Currency, Language } from '../../types';

interface LaborSectionProps {
  readonly values: CalculationValues;
  readonly results: CalculationResults;
  readonly currency: Currency;
  readonly language: Language;
  readonly onUpdateValue: (key: keyof CalculationValues, value: number) => void;
  readonly sectionRef?: (el: HTMLDivElement | null) => void;
}

export const LaborSection = memo<LaborSectionProps>(({
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
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-l-4 border-green-500"
      aria-labelledby="labor-section-title"
    >
      <div className="flex items-center mb-3">
        <Clock className="h-5 w-5 text-green-500 mr-2" aria-hidden="true" />
        <h2 id="labor-section-title" className="text-lg font-semibold text-gray-900 dark:text-white">
          {t.timeLabor}
        </h2>
      </div>

      <TimeInputField
        label={t.printTime}
        value={values.printTime}
        onChange={(value) => onUpdateValue('printTime', value)}
        unit=""
        aria-describedby="print-time-description"
      />

      <InputField
        label={t.hourlyRate}
        value={values.hourlyRate}
        onChange={(e) => onUpdateValue('hourlyRate', parseFloat(e.target.value) || 0)}
        unit={`${CURRENCY_SYMBOLS[currency]}/hr`}
        aria-describedby="hourly-rate-description"
      />

      <InputField
        label={t.hourlyRateGlobal}
        value={values.hourlyRateGlobal}
        onChange={(e) => onUpdateValue('hourlyRateGlobal', parseFloat(e.target.value) || 0)}
        unit={CURRENCY_SYMBOLS[currency]}
        aria-describedby="hourly-rate-global-description"
      />

      <div
        className="bg-green-50 dark:bg-green-900/30 p-2 rounded-md"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm text-green-800 dark:text-green-300">
          <strong>{t.laborCost}:</strong> {formatPrice(results.laborCost, currency)}
        </p>
      </div>
    </section>
  );
});

LaborSection.displayName = 'LaborSection';
