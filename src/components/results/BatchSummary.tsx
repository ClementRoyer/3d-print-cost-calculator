
import { memo } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { formatPrice } from '../../utils/calculations';
import type { CalculationValues, CalculationResults, Currency, Language } from '../../types';

interface BatchSummaryProps {
  readonly values: CalculationValues;
  readonly results: CalculationResults;
  readonly currency: Currency;
  readonly language: Language;
}

export const BatchSummary = memo<BatchSummaryProps>(({
  values,
  results,
  currency,
  language
}) => {
  const t = useTranslation(language);

  if (values.quantity <= 1) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">{t.batchSummary}</h2>
      
      <div className="space-y-2 text-sm" role="list">
        <div className="flex justify-between" role="listitem">
          <span className="text-gray-600">
            {t.totalCost} ({values.quantity} {t.units.pieces}):
          </span>
          <span className="font-medium">
            {formatPrice(results.totalCost * values.quantity, currency)}
          </span>
        </div>
        
        <div className="flex justify-between" role="listitem">
          <span className="text-gray-600">{t.totalRevenue}:</span>
          <span className="font-medium">
            {formatPrice(results.sellingPrice * values.quantity, currency)}
          </span>
        </div>
        
        <div className="flex justify-between text-green-600" role="listitem">
          <span>{t.totalProfit}:</span>
          <span className="font-medium">
            {formatPrice(results.profit * values.quantity, currency)}
          </span>
        </div>
      </div>
    </div>
  );
});

BatchSummary.displayName = 'BatchSummary';