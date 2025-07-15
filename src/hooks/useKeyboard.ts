import { useEffect, useCallback } from 'react';

type KeyboardHandler = (event: KeyboardEvent) => void;

export const useKeyboard = (handlers: Record<string, KeyboardHandler>) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const handler = handlers[event.key];
    if (handler) {
      handler(event);
    }
  }, [handlers]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
};

export const useEscapeKey = (callback: () => void, isActive: boolean = true) => {
  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && isActive) {
      event.preventDefault();
      callback();
    }
  }, [callback, isActive]);

  useEffect(() => {
    if (isActive) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [handleEscape, isActive]);
};