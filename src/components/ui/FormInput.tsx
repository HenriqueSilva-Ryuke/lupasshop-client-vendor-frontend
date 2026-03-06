'use client';

import React from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { errorTextClass, helperTextClass, inputBaseClass, inputErrorClass, labelClass } from './primitives';

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
 <label className={labelClass}>
 {label}
 {required && <span className="text-destructive">*</span>}
 </label>
 <input
 type={type}
 placeholder={placeholder}
 {...register}
 className={cn(inputBaseClass, error && inputErrorClass)}
 />
 {error && (
 <p className={errorTextClass}>{error.message}</p>
 )}
 {helperText && !error && (
 <p className={helperTextClass}>{helperText}</p>
 )}
 </div>
 );
}
