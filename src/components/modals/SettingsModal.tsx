import { memo } from 'react';
import { Modal } from '../ui/Modal';
import { useTranslation } from '../../hooks/useTranslation';
import { AVAILABLE_LANGUAGES } from '../../i18n';
import type { AppSettings, Currency } from '../../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (settings: Partial<AppSettings>) => void;
}

const AVAILABLE_CURRENCIES: Array<{ code: Currency; name: string; symbol: string }> = [
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$' }
] as const;

export const SettingsModal = memo<SettingsModalProps>(({ 
  isOpen, 
  onClose, 
  settings, 
  onUpdateSettings 
}) => {
  const t = useTranslation(settings.language);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.settings}>
      <div className="space-y-4">
        <div>
          <label 
            htmlFor="language-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t.language}
          </label>
          <select
            id="language-select"
            value={settings.language}
            onChange={(e) => onUpdateSettings({ language: e.target.value as AppSettings['language'] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {AVAILABLE_LANGUAGES.map(({ code, name }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label 
            htmlFor="currency-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t.currency}
          </label>
          <select
            id="currency-select"
            value={settings.currency}
            onChange={(e) => onUpdateSettings({ currency: e.target.value as Currency })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {AVAILABLE_CURRENCIES.map(({ code, name, symbol }) => (
              <option key={code} value={code}>
                {name} ({symbol})
              </option>
            ))}
          </select>
        </div>
      </div>
    </Modal>
  );
});

SettingsModal.displayName = 'SettingsModal';