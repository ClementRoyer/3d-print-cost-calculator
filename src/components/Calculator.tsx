import { useState, useCallback } from 'react';
import { useCalculator } from '../hooks/useCalculator';
import { useNavigation } from '../hooks/useNavigation';
import { Navigation } from './navigation/Navigation';
import { SidebarNav } from './navigation/SidebarNav';
import { MaterialSection } from './sections/MaterialSection';
import { LaborSection } from './sections/LaborSection';
import { OperatingSection } from './sections/OperatingSection';
import { ExtrasSection } from './sections/ExtrasSection';
import { BusinessSection } from './sections/BusinessSection';
import { CostBreakdown } from './results/CostBreakdown';
import { PriceDisplay } from './results/PriceDisplay';
import { BatchSummary } from './results/BatchSummary';
import { SettingsModal } from './modals/SettingsModal';
import { TipsModal } from './modals/TipsModal';
import type { CalculationValues } from '../types';

const SECTIONS_COUNT = 5;

interface CalculatorProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Calculator = ({ theme, onToggleTheme }: CalculatorProps) => {
  const {
    values,
    results,
    settings,
    updateValue,
    updateSettings
  } = useCalculator();

  const {
    activeSection,
    scrollToSection,
    setSectionRef
  } = useNavigation(SECTIONS_COUNT);

  const [showSettings, setShowSettings] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<'selling' | 'recommended'>('recommended');

  const handleUpdateValue = useCallback((key: keyof CalculationValues, value: number | boolean) => {
    updateValue(key, value);
  }, [updateValue]);

  const handleOpenSettings = useCallback(() => setShowSettings(true), []);
  const handleCloseSettings = useCallback(() => setShowSettings(false), []);
  const handleShowTips = useCallback(() => setShowTips(true), []);
  const handleCloseTips = useCallback(() => setShowTips(false), []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation
        activeSection={activeSection}
        language={settings.language}
        onScrollToSection={scrollToSection}
        onOpenSettings={handleOpenSettings}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      <main className="max-w-6xl mx-auto px-4">
        <div className="flex items-start gap-6">
          <SidebarNav
            values={values}
            results={results}
            currency={settings.currency}
            language={settings.language}
            activeSection={activeSection}
            onScrollToSection={scrollToSection}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-w-0">
          {/* Input Sections */}
          <div className="space-y-4">
            <MaterialSection
              values={values}
              results={results}
              currency={settings.currency}
              language={settings.language}
              onUpdateValue={handleUpdateValue}
              sectionRef={setSectionRef(0)}
            />

            <LaborSection
              values={values}
              results={results}
              currency={settings.currency}
              language={settings.language}
              onUpdateValue={handleUpdateValue}
              sectionRef={setSectionRef(1)}
            />

            <OperatingSection
              values={values}
              results={results}
              currency={settings.currency}
              language={settings.language}
              onUpdateValue={handleUpdateValue}
              sectionRef={setSectionRef(2)}
            />

            <ExtrasSection
              values={values}
              results={results}
              currency={settings.currency}
              language={settings.language}
              onUpdateValue={handleUpdateValue}
              sectionRef={setSectionRef(3)}
            />

            <BusinessSection
              values={values}
              results={results}
              currency={settings.currency}
              language={settings.language}
              onUpdateValue={handleUpdateValue}
              sectionRef={setSectionRef(4)}
            />

            <div className="h-16" aria-hidden="true" />
          </div>

          {/* Results Section */}
          <div className="space-y-4 sticky top-20 self-start">
            <CostBreakdown
              values={values}
              results={results}
              currency={settings.currency}
              language={settings.language}
            />

            <PriceDisplay
              results={results}
              currency={settings.currency}
              language={settings.language}
              onShowTips={handleShowTips}
              selectedPrice={selectedPrice}
              onSelectPrice={setSelectedPrice}
            />

            <BatchSummary
              values={values}
              results={results}
              currency={settings.currency}
              language={settings.language}
              selectedPrice={selectedPrice}
            />
          </div>
          </div>
        </div>
      </main>

      <SettingsModal
        isOpen={showSettings}
        onClose={handleCloseSettings}
        settings={settings}
        onUpdateSettings={updateSettings}
      />

      <TipsModal
        isOpen={showTips}
        onClose={handleCloseTips}
        language={settings.language}
      />
    </div>
  );
};

export default Calculator;
