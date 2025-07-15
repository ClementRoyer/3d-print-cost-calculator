
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
}

export const PriceDisplay = memo<PriceDisplayProps>(({
  results,
  currency,
  language,
  onShowTips
}) => {
  const t = useTranslation(language);
  const recommendedPrice = calculateRecommendedPrice(results.sellingPrice);

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Selling Price */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-4 text-white relative">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold">{t.sellingPrice}</h2>
          <button
            onClick={onShowTips}
            className="text-white hover:text-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded"
            aria-label="Show business tips"
          >
            <Info className="h-4 w-4" />
          </button>
        </div>
        <div className="text-2xl font-bold">{formatPrice(results.sellingPrice, currency)}</div>
        <p className="text-blue-100 text-sm">{t.perUnit}</p>
      </div>

      {/* Recommended Price */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg shadow-lg p-4 text-white relative">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold">{t.recommendedPrice}</h2>
          <button
            onClick={onShowTips}
            className="text-white hover:text-green-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded"
            aria-label="Show business tips"
          >
            <Info className="h-4 w-4" />
          </button>
        </div>
        <div className="text-2xl font-bold">{formatPrice(recommendedPrice, currency)}</div>
        <p className="text-green-100 text-sm">
          {t.newProfit}: {formatPrice(recommendedPrice - results.totalCost, currency)}
        </p>
      </div>
    </div>
  );
});

PriceDisplay.displayName = 'PriceDisplay';