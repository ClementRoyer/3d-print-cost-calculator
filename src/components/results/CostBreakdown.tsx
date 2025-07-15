
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
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-3">
        <Calculator className="h-5 w-5 text-gray-700 mr-2" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-gray-900">{t.costBreakdown}</h2>
      </div>
      
      <div className="space-y-2 text-sm" role="list">
        <div className="flex justify-between" role="listitem">
          <span className="text-gray-600">{t.material}:</span>
          <span className="font-medium">{formatPrice(results.materialCost, currency)}</span>
        </div>
        
        <div className="flex justify-between" role="listitem">
          <span className="text-gray-600">{t.labor}:</span>
          <span className="font-medium">{formatPrice(results.laborCost, currency)}</span>
        </div>
        
        <div className="flex justify-between" role="listitem">
          <span className="text-gray-600">{t.electricity}:</span>
          <span className="font-medium">{formatPrice(results.electricityCost, currency)}</span>
        </div>
        
        <div className="flex justify-between" role="listitem">
          <span className="text-gray-600">{t.wearTear}:</span>
          <span className="font-medium">{formatPrice(results.wearTearCost, currency)}</span>
        </div>
        
        <div className="flex justify-between" role="listitem">
          <span className="text-gray-600">{t.packaging}:</span>
          <span className="font-medium">{formatPrice(values.packagingCost, currency)}</span>
        </div>
        
        <hr className="my-2" />
        
        <div className="flex justify-between font-semibold" role="listitem">
          <span>{t.totalCost}:</span>
          <span>{formatPrice(results.totalCost, currency)}</span>
        </div>
        
        <div className="flex justify-between text-green-600 text-sm" role="listitem">
          <span>{t.profit} ({values.profitMargin}%):</span>
          <span className="font-medium">{formatPrice(results.profit, currency)}</span>
        </div>
      </div>
    </div>
  );
});

CostBreakdown.displayName = 'CostBreakdown';