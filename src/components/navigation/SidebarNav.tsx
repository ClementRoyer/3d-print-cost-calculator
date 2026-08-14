
import { memo, useMemo } from 'react';
import { Package, Clock, Zap, Layers, DollarSign } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { formatPrice } from '../../utils/calculations';
import { PriceDisplay } from '../results/PriceDisplay';
import { BatchSummary } from '../results/BatchSummary';
import type { CalculationValues, CalculationResults, Currency, Language } from '../../types';

interface SidebarNavProps {
  readonly values: CalculationValues;
  readonly results: CalculationResults;
  readonly currency: Currency;
  readonly language: Language;
  readonly activeSection: number;
  readonly onScrollToSection: (index: number) => void;
  readonly onShowTips: () => void;
  readonly selectedPrice: 'selling' | 'recommended';
  readonly onSelectPrice: (price: 'selling' | 'recommended') => void;
}

interface SidebarItem {
  readonly title: string;
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly colorClass: string;
  readonly bgClass: string;
  readonly display: string;
}

export const SidebarNav = memo<SidebarNavProps>(({
  values,
  results,
  currency,
  language,
  activeSection,
  onScrollToSection,
  onShowTips,
  selectedPrice,
  onSelectPrice
}) => {
  const t = useTranslation(language);

  const operatingTotal = results.electricityCost + results.wearTearCost + values.packagingCost + values.packagingCostGlobal;

  const items = useMemo((): SidebarItem[] => [
    {
      title: t.materialCosts,
      icon: Package,
      colorClass: 'text-blue-600 dark:text-blue-400',
      bgClass: 'bg-blue-50 dark:bg-blue-900/30',
      display: formatPrice(results.materialCost, currency)
    },
    {
      title: t.timeLabor,
      icon: Clock,
      colorClass: 'text-green-600 dark:text-green-400',
      bgClass: 'bg-green-50 dark:bg-green-900/30',
      display: formatPrice(results.laborCost, currency)
    },
    {
      title: t.operatingCosts,
      icon: Zap,
      colorClass: 'text-orange-600 dark:text-orange-400',
      bgClass: 'bg-orange-50 dark:bg-orange-900/30',
      display: formatPrice(operatingTotal, currency)
    },
    {
      title: t.extrasCosts,
      icon: Layers,
      colorClass: 'text-teal-600 dark:text-teal-400',
      bgClass: 'bg-teal-50 dark:bg-teal-900/30',
      display: formatPrice(results.extrasCost, currency)
    },
    {
      title: t.businessSettings,
      icon: DollarSign,
      colorClass: 'text-purple-600 dark:text-purple-400',
      bgClass: 'bg-purple-50 dark:bg-purple-900/30',
      display: `${values.profitMargin}${t.units.percent}`
    }
  ], [t, results, values, operatingTotal, currency]);

  return (
    <nav
      className="hidden lg:flex flex-col flex-shrink-0 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 h-fit sticky top-20 space-y-1"
      aria-label="Sections"
    >
      {items.map((item, index) => {
        const Icon = item.icon;
        const isActive = activeSection === index;
        return (
          <button
            key={item.title}
            onClick={() => onScrollToSection(index)}
            className={`flex items-center gap-2 px-2 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isActive ? item.bgClass : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className={`flex items-center justify-center h-7 w-7 rounded-md flex-shrink-0 ${item.bgClass} ${item.colorClass}`}>
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span className={`block text-xs font-medium truncate ${isActive ? item.colorClass : 'text-gray-700 dark:text-gray-300'}`}>
                {item.title}
              </span>
            </span>
            <span className={`text-xs font-semibold whitespace-nowrap ${isActive ? item.colorClass : 'text-gray-500 dark:text-gray-400'}`}>
              {item.display}
            </span>
          </button>
        );
      })}

      <div className="flex items-baseline justify-between px-2 pt-2 pb-1 border-t border-gray-200 dark:border-gray-700 mt-2">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">{t.totalCost}</span>
        <span className="text-base font-bold text-gray-900 dark:text-white">{formatPrice(results.totalCost, currency)}</span>
      </div>

      <div className="pt-2">
        <PriceDisplay
          results={results}
          currency={currency}
          language={language}
          onShowTips={onShowTips}
          selectedPrice={selectedPrice}
          onSelectPrice={onSelectPrice}
        />
      </div>

      <div className="pt-2">
        <BatchSummary
          values={values}
          results={results}
          currency={currency}
          language={language}
          selectedPrice={selectedPrice}
        />
      </div>
    </nav>
  );
});

SidebarNav.displayName = 'SidebarNav';
