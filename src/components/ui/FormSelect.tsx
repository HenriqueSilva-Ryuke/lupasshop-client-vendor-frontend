'use client';

import React from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { errorTextClass, inputBaseClass, inputErrorClass, labelClass } from './primitives';

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
 <label className={labelClass}>
 {label}
 {required && <span className="text-destructive">*</span>}
 </label>
 <select
 {...register}
 className={cn(inputBaseClass, error && inputErrorClass)}
 >
 <option value="">{placeholder}</option>
 {options.map((option) => (
 <option key={option.value} value={option.value}>
 {option.label}
 </option>
 ))}
 </select>
 {error && (
 <p className={errorTextClass}>{error.message}</p>
 )}
 </div>
 );
}
