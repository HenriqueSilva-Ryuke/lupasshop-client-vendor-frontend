'use client';

import React from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

interface Option {
  value: string | number;
  label: string;
}

interface FormSelectProps {
  label: string;
  options: Option[];
  error?: FieldError;
  register: UseFormRegisterReturn;
  required?: boolean;
  placeholder?: string;
}

export default function FormSelect({
  label,
  options,
  error,
  register,
  required,
  placeholder = 'Selecione uma opção',
}: FormSelectProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...register}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-primary'
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-500">{error.message}</p>
      )}
    </div>
  );
}
