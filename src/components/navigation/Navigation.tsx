
import { memo, useMemo } from 'react';
import { Settings, Package, Clock, Zap, DollarSign, Sun, Moon } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { useTranslation } from '../../hooks/useTranslation';
import type { Language, NavigationSection } from '../../types';

interface NavigationProps {
  readonly activeSection: number;
  readonly language: Language;
  readonly onScrollToSection: (index: number) => void;
  readonly onOpenSettings: () => void;
  readonly theme: 'light' | 'dark';
  readonly onToggleTheme: () => void;
}

export const Navigation = memo<NavigationProps>(({
  activeSection,
  language,
  onScrollToSection,
  onOpenSettings,
  theme,
  onToggleTheme
}) => {
  const t = useTranslation(language);

  const sections = useMemo((): NavigationSection[] => [
    { id: 'material', title: t.materialCosts, icon: Package },
    { id: 'labor', title: t.timeLabor, icon: Clock },
    { id: 'operating', title: t.operatingCosts, icon: Zap },
    { id: 'business', title: t.businessSettings, icon: DollarSign },
  ], [t]);

  return (
    <nav className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 mb-6 py-3">
      <div className="flex items-center w-full px-4 relative">
        <div className="flex items-center space-x-3">
          <Logo />
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">{t.title}</h1>
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
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                aria-current={activeSection === index ? 'page' : undefined}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm font-medium">{section.title}</span>
              </button>
            );
          })}
        </div>

        <div className="ml-auto flex items-center space-x-2">
          <button
            onClick={onToggleTheme}
            className="flex items-center px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={onOpenSettings}
            className="flex items-center px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
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
