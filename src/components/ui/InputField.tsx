
import { memo, useState, useEffect } from 'react';
import type { InputFieldProps } from '../../types';

export const InputField = memo<InputFieldProps>(({
  label,
  value,
  onChange,
  unit,
  step = "0.01",
  min = "0",
  max,
  error,
  'aria-describedby': ariaDescribedBy,
  ...props
}) => {
  const inputId = `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${inputId}-error`;
  const describedBy = error ? `${ariaDescribedBy || ''} ${errorId}`.trim() : ariaDescribedBy;

  // Track display value as string to allow empty field while editing
  const [displayValue, setDisplayValue] = useState<string>(value === 0 ? '' : String(value));

  // Sync external value changes (e.g. reset) into display
  useEffect(() => {
    setDisplayValue(value === 0 ? '' : String(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayValue(e.target.value);
    onChange(e);
  };

  const handleBlur = () => {
    // On blur, if empty or invalid, reset display to empty (value stays 0 in parent)
    if (displayValue === '' || isNaN(parseFloat(displayValue))) {
      setDisplayValue('');
    }
  };

  return (
    <div className="mb-3">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          id={inputId}
          type="number"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          step={step}
          min={min}
          max={max}
          placeholder="0"
          aria-describedby={describedBy}
          aria-invalid={!!error}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm transition-colors bg-white dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
            error
              ? 'border-red-300 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
          }`}
        />
        <span
          className="absolute right-3 top-2 text-gray-500 dark:text-gray-400 text-sm pointer-events-none"
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

InputField.displayName = 'InputField';
