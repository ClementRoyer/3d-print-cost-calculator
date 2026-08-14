
import { memo } from 'react';
import { Info } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { formatPrice, calculateRecommendedPrice } from '../../utils/calculations';
import type { CalculationResults, Currency, Language } from '../../types';

interface PriceDisplayProps {
  readonly results: CalculationResults;
  readonly currency: Currency;
  readonly language: Language;
  readonly onShowTips: () => void;
  readonly selectedPrice: 'selling' | 'recommended';
  readonly onSelectPrice: (price: 'selling' | 'recommended') => void;
  readonly compact?: boolean;
}

export const PriceDisplay = memo<PriceDisplayProps>(({
  results,
  currency,
  language,
  onShowTips,
  selectedPrice,
  onSelectPrice,
  compact = false
}) => {
  const t = useTranslation(language);
  const recommendedPrice = calculateRecommendedPrice(results.sellingPrice);

  return (
    <div className="space-y-2">
      {/* Selector tabs */}
      <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 text-sm font-medium">
        <button
          onClick={() => onSelectPrice('selling')}
          className={`flex-1 min-w-0 truncate px-2 py-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 ${
            selectedPrice === 'selling'
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
          aria-pressed={selectedPrice === 'selling'}
        >
          {t.sellingPrice}
        </button>
        <button
          onClick={() => onSelectPrice('recommended')}
          className={`flex-1 min-w-0 truncate px-2 py-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 ${
            selectedPrice === 'recommended'
              ? 'bg-green-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
          aria-pressed={selectedPrice === 'recommended'}
        >
          {t.recommendedPrice}
        </button>
      </div>

      <div className={compact ? 'space-y-3' : 'grid grid-cols-2 gap-4'}>
        {/* Selling Price */}
        <div className={`rounded-lg shadow-lg text-white relative transition-opacity ${compact ? 'p-3' : 'p-4'} ${
          selectedPrice === 'selling'
            ? 'bg-gradient-to-r from-blue-600 to-purple-600'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 opacity-50'
        }`}>
          <div className="flex items-center justify-between mb-1">
            <h2 className={compact ? 'text-sm font-bold' : 'text-lg font-bold'}>{t.sellingPrice}</h2>
            <button
              onClick={onShowTips}
              className="text-white hover:text-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded flex-shrink-0"
              aria-label="Show business tips"
            >
              <Info className="h-4 w-4" />
            </button>
          </div>
          <div className={compact ? 'text-xl font-bold' : 'text-2xl font-bold'}>{formatPrice(results.sellingPrice, currency)}</div>
          <p className="text-blue-100 text-sm">{t.perUnit}</p>
        </div>

        {/* Recommended Price */}
        <div className={`rounded-lg shadow-lg text-white relative transition-opacity ${compact ? 'p-3' : 'p-4'} ${
          selectedPrice === 'recommended'
            ? 'bg-gradient-to-r from-green-600 to-emerald-600'
            : 'bg-gradient-to-r from-green-600 to-emerald-600 opacity-50'
        }`}>
          <div className="flex items-center justify-between mb-1">
            <h2 className={compact ? 'text-sm font-bold' : 'text-lg font-bold'}>{t.recommendedPrice}</h2>
            <button
              onClick={onShowTips}
              className="text-white hover:text-green-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded flex-shrink-0"
              aria-label="Show business tips"
            >
              <Info className="h-4 w-4" />
            </button>
          </div>
          <div className={compact ? 'text-xl font-bold' : 'text-2xl font-bold'}>{formatPrice(recommendedPrice, currency)}</div>
          <p className="text-green-100 text-sm">
            {t.newProfit}: {formatPrice(recommendedPrice - results.totalCost, currency)}
          </p>
        </div>
      </div>
    </div>
  );
});

PriceDisplay.displayName = 'PriceDisplay';
