
import { memo, useState, useEffect, useMemo } from 'react';
import { Package, Clock, Zap, Layers, DollarSign, ChevronsLeftRight } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { formatPrice, CURRENCY_SYMBOLS } from '../../utils/calculations';
import type { CalculationValues, CalculationResults, Currency, Language } from '../../types';

const STORAGE_KEY = '3d-calc-sidebar-expanded';

interface SidebarNavProps {
  readonly values: CalculationValues;
  readonly results: CalculationResults;
  readonly currency: Currency;
  readonly language: Language;
  readonly activeSection: number;
  readonly onScrollToSection: (index: number) => void;
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
  onScrollToSection
}) => {
  const t = useTranslation(language);

  const [expanded, setExpanded] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(STORAGE_KEY) === 'true';
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, String(expanded));
  }, [expanded]);

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
      className={`hidden lg:flex flex-col flex-shrink-0 bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 h-fit sticky top-20 transition-[width] duration-200 ${
        expanded ? 'w-56' : 'w-40'
      }`}
      aria-label="Sections"
    >
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="flex items-center gap-2 px-2 py-2 mb-1 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={expanded ? t.collapseSidebar : t.expandSidebar}
        aria-expanded={expanded}
      >
        <ChevronsLeftRight className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
        {expanded && <span className="text-xs font-medium">{CURRENCY_SYMBOLS[currency]}</span>}
      </button>

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
            title={!expanded ? item.title : undefined}
          >
            <span className={`flex items-center justify-center h-7 w-7 rounded-md flex-shrink-0 ${item.bgClass} ${item.colorClass}`}>
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            {expanded ? (
              <span className="min-w-0 flex-1 text-left">
                <span className={`block text-xs font-medium truncate ${isActive ? item.colorClass : 'text-gray-700 dark:text-gray-300'}`}>
                  {item.title}
                </span>
              </span>
            ) : null}
            <span className={`text-xs font-semibold whitespace-nowrap ${isActive ? item.colorClass : 'text-gray-500 dark:text-gray-400'}`}>
              {item.display}
            </span>
          </button>
        );
      })}
    </nav>
  );
});

SidebarNav.displayName = 'SidebarNav';
