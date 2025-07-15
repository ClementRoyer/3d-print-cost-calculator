import { useState, useCallback } from 'react';
import { useCalculator } from '../hooks/useCalculator';
import { useNavigation } from '../hooks/useNavigation';
import { Navigation } from './navigation/Navigation';
import { MaterialSection } from './sections/MaterialSection';
import { LaborSection } from './sections/LaborSection';
import { OperatingSection } from './sections/OperatingSection';
import { BusinessSection } from './sections/BusinessSection';
import { CostBreakdown } from './results/CostBreakdown';
import { PriceDisplay } from './results/PriceDisplay';
import { BatchSummary } from './results/BatchSummary';
import { SettingsModal } from './modals/SettingsModal';
import { TipsModal } from './modals/TipsModal';
import type { CalculationValues } from '../types';

const SECTIONS_COUNT = 4;

const Calculator = () => {
  // State management through custom hooks
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

  // Modal state
  const [showSettings, setShowSettings] = useState(false);
  const [showTips, setShowTips] = useState(false);

  // Event handlers
  const handleUpdateValue = useCallback((key: keyof CalculationValues, value: number) => {
    updateValue(key, value);
  }, [updateValue]);

  const handleOpenSettings = useCallback(() => {
    setShowSettings(true);
  }, []);

  const handleCloseSettings = useCallback(() => {
    setShowSettings(false);
  }, []);

  const handleShowTips = useCallback(() => {
    setShowTips(true);
  }, []);

  const handleCloseTips = useCallback(() => {
    setShowTips(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <Navigation
        activeSection={activeSection}
        language={settings.language}
        onScrollToSection={scrollToSection}
        onOpenSettings={handleOpenSettings}
      />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

            <BusinessSection
              values={values}
              results={results}
              currency={settings.currency}
              language={settings.language}
              onUpdateValue={handleUpdateValue}
              sectionRef={setSectionRef(3)}
            />

            {/* Spacing for better UX */}
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
            />

            <BatchSummary
              values={values}
              results={results}
              currency={settings.currency}
              language={settings.language}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
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