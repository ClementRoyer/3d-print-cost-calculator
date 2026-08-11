
import { memo } from 'react';
import { Layers } from 'lucide-react';
import { InputField } from '../ui/InputField';
import { useTranslation } from '../../hooks/useTranslation';
import { formatPrice, CURRENCY_SYMBOLS } from '../../utils/calculations';
import type { CalculationValues, CalculationResults, Currency, Language } from '../../types';

interface ExtrasSectionProps {
  readonly values: CalculationValues;
  readonly results: CalculationResults;
  readonly currency: Currency;
  readonly language: Language;
  readonly onUpdateValue: (key: keyof CalculationValues, value: number | boolean) => void;
  readonly sectionRef?: (el: HTMLDivElement | null) => void;
}

export const ExtrasSection = memo<ExtrasSectionProps>(({
  values,
  results,
  currency,
  language,
  onUpdateValue,
  sectionRef
}) => {
  const t = useTranslation(language);

  const colorSurcharge = values.colorCount > 1
    ? (values.colorCount - 1) * values.colorSurchargePerColor
    : 0;
  const spoolSurcharge = values.isSpecificSpoolRequired ? values.specificSpoolCost : 0;

  return (
    <section
      ref={sectionRef}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-l-4 border-teal-500"
      aria-labelledby="extras-section-title"
    >
      <div className="flex items-center mb-3">
        <Layers className="h-5 w-5 text-teal-500 mr-2" aria-hidden="true" />
        <h2 id="extras-section-title" className="text-lg font-semibold text-gray-900 dark:text-white">
          {t.extrasCosts}
        </h2>
      </div>

      <InputField
        label={t.dryingCostPerPrint}
        value={values.dryingCostPerPrint}
        onChange={(e) => onUpdateValue('dryingCostPerPrint', parseFloat(e.target.value) || 0)}
        unit={CURRENCY_SYMBOLS[currency]}
        aria-describedby="drying-cost-description"
      />

      <InputField
        label={t.colorCount}
        value={values.colorCount}
        onChange={(e) => onUpdateValue('colorCount', parseFloat(e.target.value) || 1)}
        unit={t.units.colors}
        step="1"
        min="1"
        aria-describedby="color-count-description"
      />

      <InputField
        label={t.colorSurchargePerColor}
        value={values.colorSurchargePerColor}
        onChange={(e) => onUpdateValue('colorSurchargePerColor', parseFloat(e.target.value) || 0)}
        unit={CURRENCY_SYMBOLS[currency]}
        aria-describedby="color-surcharge-description"
      />

      <div className="mb-3 flex items-center">
        <input
          id="specific-spool-required"
          type="checkbox"
          checked={values.isSpecificSpoolRequired}
          onChange={(e) => onUpdateValue('isSpecificSpoolRequired', e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-teal-600 focus:ring-teal-500"
        />
        <label
          htmlFor="specific-spool-required"
          className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t.specificSpoolRequired}
        </label>
      </div>

      <InputField
        label={t.specificSpoolCost}
        value={values.specificSpoolCost}
        onChange={(e) => onUpdateValue('specificSpoolCost', parseFloat(e.target.value) || 0)}
        unit={CURRENCY_SYMBOLS[currency]}
        aria-describedby="specific-spool-cost-description"
        disabled={!values.isSpecificSpoolRequired}
      />

      <div
        className="bg-teal-50 dark:bg-teal-900/30 p-2 rounded-md space-y-1"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm text-teal-800 dark:text-teal-300">
          <strong>{t.drying}:</strong> {formatPrice(values.dryingCostPerPrint, currency)}
        </p>
        <p className="text-sm text-teal-800 dark:text-teal-300">
          <strong>{t.colorSurcharge}:</strong> {formatPrice(colorSurcharge, currency)}
        </p>
        <p className="text-sm text-teal-800 dark:text-teal-300">
          <strong>{t.spoolSurcharge}:</strong> {formatPrice(spoolSurcharge, currency)}
        </p>
        <p className="text-sm text-teal-800 dark:text-teal-300">
          <strong>{t.extras}:</strong> {formatPrice(results.extrasCost, currency)}
        </p>
      </div>
    </section>
  );
});

ExtrasSection.displayName = 'ExtrasSection';
