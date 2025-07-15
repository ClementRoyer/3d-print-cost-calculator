import { useMemo } from 'react';
import { getTranslation, type Language } from '../i18n';

export const useTranslation = (language: Language) => {
  const t = useMemo(() => getTranslation(language), [language]);
  
  return t;
};