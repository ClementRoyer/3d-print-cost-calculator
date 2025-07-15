import { memo } from 'react';
import { Modal } from '../ui/Modal';
import { useTranslation } from '../../hooks/useTranslation';
import type { Language } from '../../i18n';

interface TipsModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly language: Language;
}

export const TipsModal = memo<TipsModalProps>(({ 
  isOpen, 
  onClose, 
  language 
}) => {
  const t = useTranslation(language);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.businessTips}>
      <div className="space-y-3 text-sm text-gray-600">
        {t.tips.map((tip, index) => (
          <p key={index}>{tip}</p>
        ))}
      </div>
    </Modal>
  );
});

TipsModal.displayName = 'TipsModal';