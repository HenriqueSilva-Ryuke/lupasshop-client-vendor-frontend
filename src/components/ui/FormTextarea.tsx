'use client';

import React from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { errorTextClass, inputBaseClass, inputErrorClass, labelClass } from './primitives';

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
 <label className={labelClass}>
 {label}
 {required && <span className="text-destructive">*</span>}
 </label>
 <textarea
 placeholder={placeholder}
 rows={rows}
 {...register}
 className={cn(inputBaseClass, 'h-auto min-h-28 py-3', error && inputErrorClass)}
 />
 {error && (
 <p className={errorTextClass}>{error.message}</p>
 )}
 </div>
 );
}
