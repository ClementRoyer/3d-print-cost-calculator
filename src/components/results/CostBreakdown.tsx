
import { memo } from 'react';
import { Calculator } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { formatPrice } from '../../utils/calculations';
import type { CalculationValues, CalculationResults, Currency, Language } from '../../types';

interface CostBreakdownProps {
  readonly values: CalculationValues;
  readonly results: CalculationResults;
  readonly currency: Currency;
  readonly language: Language;
}

export const CostBreakdown = memo<CostBreakdownProps>(({
  values,
  results,
  currency,
  language
}) => {
  const t = useTranslation(language);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex items-center mb-3">
        <Calculator className="h-5 w-5 text-gray-700 dark:text-gray-300 mr-2" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t.costBreakdown}</h2>
      </div>

      <div className="space-y-2 text-sm" role="list">
        <div className="flex justify-between" role="listitem">
          <span className="text-gray-600 dark:text-gray-400">{t.material}:</span>
          <span className="font-medium text-gray-900 dark:text-white">{formatPrice(results.materialCost, currency)}</span>
        </div>

        <div className="flex justify-between" role="listitem">
          <span className="text-gray-600 dark:text-gray-400">{t.labor}:</span>
          <span className="font-medium text-gray-900 dark:text-white">{formatPrice(results.laborCost, currency)}</span>
        </div>

        <div className="flex justify-between" role="listitem">
          <span className="text-gray-600 dark:text-gray-400">{t.electricity}:</span>
          <span className="font-medium text-gray-900 dark:text-white">{formatPrice(results.electricityCost, currency)}</span>
        </div>

        <div className="flex justify-between" role="listitem">
          <span className="text-gray-600 dark:text-gray-400">{t.wearTear}:</span>
          <span className="font-medium text-gray-900 dark:text-white">{formatPrice(results.wearTearCost, currency)}</span>
        </div>

        <div className="flex justify-between" role="listitem">
          <span className="text-gray-600 dark:text-gray-400">{t.packaging}:</span>
          <span className="font-medium text-gray-900 dark:text-white">{formatPrice(values.packagingCost + values.packagingCostGlobal, currency)}</span>
        </div>

        <div className="flex justify-between" role="listitem">
          <span className="text-gray-600 dark:text-gray-400">{t.extras}:</span>
          <span className="font-medium text-gray-900 dark:text-white">{formatPrice(results.extrasCost, currency)}</span>
        </div>

        <hr className="my-2 border-gray-200 dark:border-gray-700" />

        <div className="flex justify-between font-semibold text-gray-900 dark:text-white" role="listitem">
          <span>{t.totalCost}:</span>
          <span>{formatPrice(results.totalCost, currency)}</span>
        </div>

        <div className="flex justify-between text-green-600 dark:text-green-400 text-sm" role="listitem">
          <span>{t.profit} ({values.profitMargin}%):</span>
          <span className="font-medium">{formatPrice(results.profit, currency)}</span>
        </div>
      </div>
    </div>
  );
});

CostBreakdown.displayName = 'CostBreakdown';
