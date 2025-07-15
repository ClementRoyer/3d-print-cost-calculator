
import { memo, useMemo } from 'react';
import { Settings, Package, Clock, Zap, DollarSign } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { useTranslation } from '../../hooks/useTranslation';
import type { Language, NavigationSection } from '../../types';

interface NavigationProps {
  readonly activeSection: number;
  readonly language: Language;
  readonly onScrollToSection: (index: number) => void;
  readonly onOpenSettings: () => void;
}

export const Navigation = memo<NavigationProps>(({
  activeSection,
  language,
  onScrollToSection,
  onOpenSettings
}) => {
  const t = useTranslation(language);

  const sections = useMemo((): NavigationSection[] => [
    { id: 'material', title: t.materialCosts, icon: Package },
    { id: 'labor', title: t.timeLabor, icon: Clock },
    { id: 'operating', title: t.operatingCosts, icon: Zap },
    { id: 'business', title: t.businessSettings, icon: DollarSign },
  ], [t]);

  return (
    <nav className="sticky top-0 z-10 bg-white shadow-sm border-b mb-6 py-3">
      <div className="flex items-center w-full px-4 relative">
        <div className="flex items-center space-x-3">
          <Logo />
          <h1 className="text-lg font-bold text-gray-900">{t.title}</h1>
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => onScrollToSection(index)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  activeSection === index
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
                aria-current={activeSection === index ? 'page' : undefined}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm font-medium">{section.title}</span>
              </button>
            );
          })}
        </div>
        
        <div className="ml-auto">
          <button
            onClick={onOpenSettings}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Open settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </nav>
  );
});

Navigation.displayName = 'Navigation';