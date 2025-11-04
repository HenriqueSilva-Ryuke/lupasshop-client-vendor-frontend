'use client';

import React from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

interface FormCheckboxProps {
  label: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
  helperText?: string;
}

export default function FormCheckbox({
  label,
  error,
  register,
  helperText,
}: FormCheckboxProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label className="text-sm font-medium text-gray-700">{label}</label>
      </div>
      {error && (
        <p className="text-sm text-red-500">{error.message}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
