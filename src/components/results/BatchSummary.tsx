
import { memo, useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { formatPrice, calculateRecommendedPrice } from '../../utils/calculations';
import type { CalculationValues, CalculationResults, Currency, Language } from '../../types';

interface BatchSummaryProps {
  readonly values: CalculationValues;
  readonly results: CalculationResults;
  readonly currency: Currency;
  readonly language: Language;
  readonly selectedPrice: 'selling' | 'recommended';
}

export const BatchSummary = memo<BatchSummaryProps>(({
  values,
  results,
  currency,
  language,
  selectedPrice
}) => {
  const t = useTranslation(language);
  const [discount, setDiscount] = useState<number>(0);

  const recommendedPrice = calculateRecommendedPrice(results.sellingPrice);
  const unitPrice = selectedPrice === 'recommended' ? recommendedPrice : results.sellingPrice;

  const totalCost = results.totalCost * values.quantity;
  const grossRevenue = unitPrice * values.quantity;
  const discountedRevenue = grossRevenue * (1 - discount / 100);
  const totalProfit = discountedRevenue - totalCost;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{t.batchSummary}</h2>

      {/* Discount input */}
      <div className="mb-3 flex items-center gap-2 flex-wrap">
        <label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
          {t.batchDiscount}:
        </label>
        <div className="relative max-w-[90px]">
          <input
            type="number"
            value={discount === 0 ? '' : discount}
            onChange={(e) => {
              const v = Math.min(100, Math.max(0, parseFloat(e.target.value) || 0));
              setDiscount(v);
            }}
            placeholder="0"
            min="0"
            max="100"
            step="1"
            className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
          <span className="absolute right-3 top-1.5 text-gray-500 dark:text-gray-400 text-sm pointer-events-none">%</span>
        </div>
        {[0, 5, 10, 15].map((preset) => (
          <button
            key={preset}
            onClick={() => setDiscount(discount === preset ? 0 : preset)}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              discount === preset
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {preset}%
          </button>
        ))}
      </div>

      <div className="space-y-2 text-sm" role="list">
        <div className="flex justify-between" role="listitem">
          <span className="text-gray-600 dark:text-gray-400">
            {t.totalCost} ({values.quantity} {t.units.pieces}):
          </span>
          <span className="font-medium text-gray-900 dark:text-white">
            {formatPrice(totalCost, currency)}
          </span>
        </div>

        <div className="flex justify-between" role="listitem">
          <span className="text-gray-600 dark:text-gray-400">
            {t.totalRevenue}{discount > 0 ? ` (-${discount}%)` : ''}:
          </span>
          <span className="font-medium text-gray-900 dark:text-white">
            {formatPrice(discountedRevenue, currency)}
          </span>
        </div>

        <div className={`flex justify-between ${totalProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} role="listitem">
          <span>{t.totalProfit}:</span>
          <span className="font-medium">
            {formatPrice(totalProfit, currency)}
          </span>
        </div>
      </div>
    </div>
  );
});

BatchSummary.displayName = 'BatchSummary';
