'use client';

import React from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

interface FormInputProps {
 label: string;
 placeholder?: string;
 type?: string;
 error?: FieldError;
 register: UseFormRegisterReturn;
 required?: boolean;
 helperText?: string;
}

export default function FormInput({
 label,
 placeholder,
 type = 'text',
 error,
 register,
 required,
 helperText,
}: FormInputProps) {
 return (
 <div className="space-y-2">
 <label className="block text-sm font-medium text-foreground">
 {label}
 {required && <span className="text-red-500">*</span>}
 </label>
 <input
 type={type}
 placeholder={placeholder}
 {...register}
 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
 error
 ? 'border-red-500 focus:ring-red-500'
 : 'border-border focus:ring-primary'
 }`}
 />
 {error && (
 <p className="text-sm text-red-500">{error.message}</p>
 )}
 {helperText && !error && (
 <p className="text-sm text-muted-foreground">{helperText}</p>
 )}
 </div>
 );
}
