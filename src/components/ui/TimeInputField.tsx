
import { memo, useCallback } from 'react';
import type { TimeInputFieldProps } from '../../types';

export const TimeInputField = memo<TimeInputFieldProps>(({
  label,
  value,
  onChange,
  error,
  'aria-describedby': ariaDescribedBy,
}) => {
  const inputId = `time-input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${inputId}-error`;
  const describedBy = error ? `${ariaDescribedBy || ''} ${errorId}`.trim() : ariaDescribedBy;

  const hours = Math.floor(value);
  const minutes = Math.round((value - hours) * 60);

  const handleHoursChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const h = Math.max(0, parseInt(e.target.value, 10) || 0);
    onChange(h + minutes / 60);
  }, [minutes, onChange]);

  const handleMinutesChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const m = Math.min(59, Math.max(0, parseInt(e.target.value, 10) || 0));
    onChange(hours + m / 60);
  }, [hours, onChange]);

  return (
    <div className="mb-3">
      <label
        htmlFor={`${inputId}-hours`}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label}
      </label>
      <div className="flex gap-2" aria-describedby={describedBy} aria-invalid={!!error}>
        <div className="relative flex-1">
          <input
            id={`${inputId}-hours`}
            type="number"
            value={hours}
            onChange={handleHoursChange}
            min="0"
            step="1"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm transition-colors bg-white dark:bg-gray-700 dark:text-white ${
              error
                ? 'border-red-300 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
            }`}
            aria-label={`${label} — hours`}
          />
          <span className="absolute right-3 top-2 text-gray-500 dark:text-gray-400 text-sm pointer-events-none" aria-hidden="true">h</span>
        </div>
        <div className="relative flex-1">
          <input
            id={`${inputId}-minutes`}
            type="number"
            value={minutes}
            onChange={handleMinutesChange}
            min="0"
            max="59"
            step="1"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm transition-colors bg-white dark:bg-gray-700 dark:text-white ${
              error
                ? 'border-red-300 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
            }`}
            aria-label={`${label} — minutes`}
          />
          <span className="absolute right-3 top-2 text-gray-500 dark:text-gray-400 text-sm pointer-events-none" aria-hidden="true">min</span>
        </div>
      </div>
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

TimeInputField.displayName = 'TimeInputField';
