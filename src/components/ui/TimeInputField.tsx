import { memo, useCallback } from 'react';
import type { TimeInputFieldProps } from '../../types';
import { timeStringToDecimal, decimalToTimeString } from '../../utils/calculations';

export const TimeInputField = memo<TimeInputFieldProps>(({
  label,
  value,
  onChange,
  unit,
  error,
  'aria-describedby': ariaDescribedBy,
  ...props
}) => {
  const inputId = `time-input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${inputId}-error`;
  const describedBy = error ? `${ariaDescribedBy || ''} ${errorId}`.trim() : ariaDescribedBy;

  const handleTimeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = e.target.value;
    const decimalHours = timeStringToDecimal(timeValue);
    onChange(decimalHours);
  }, [onChange]);

  const timeString = decimalToTimeString(value);

  return (
    <div className="mb-3">
      <label 
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          id={inputId}
          type="time"
          value={timeString}
          onChange={handleTimeChange}
          aria-describedby={describedBy}
          aria-invalid={!!error}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm transition-colors ${
            error 
              ? 'border-red-300 focus:ring-red-500' 
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        <span 
          className="absolute right-3 top-2 text-gray-500 text-sm pointer-events-none"
          aria-hidden="true"
        >
          {unit}
        </span>
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