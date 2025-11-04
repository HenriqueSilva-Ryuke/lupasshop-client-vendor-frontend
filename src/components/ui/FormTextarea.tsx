'use client';

import React from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

interface FormTextareaProps {
  label: string;
  placeholder?: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
  required?: boolean;
  rows?: number;
}

export default function FormTextarea({
  label,
  placeholder,
  error,
  register,
  required,
  rows = 4,
}: FormTextareaProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        placeholder={placeholder}
        rows={rows}
        {...register}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-primary'
        }`}
      />
      {error && (
        <p className="text-sm text-red-500">{error.message}</p>
      )}
    </div>
  );
}
