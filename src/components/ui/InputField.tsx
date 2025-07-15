import { memo } from 'react';
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
          type="number"
          value={value}
          onChange={onChange}
          step={step}
          min={min}
          max={max}
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

InputField.displayName = 'InputField';