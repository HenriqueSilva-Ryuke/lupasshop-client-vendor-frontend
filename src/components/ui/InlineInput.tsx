'use client';

import React, { forwardRef, useState, InputHTMLAttributes } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Form input with inline validation (UX pattern: Inline Validation Reduces Frustration)
 * Validates as user types, shows clear error messages near the field.
 */

export interface InlineInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  success?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: 'sm' | 'default' | 'lg';
}

export const InlineInput = forwardRef<HTMLInputElement, InlineInputProps>(
  ({ label, error, success, hint, leftIcon, rightIcon, size = 'default', className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const sizes = {
      sm: 'h-9 text-sm',
      default: 'h-10 text-sm',
      lg: 'h-11 text-base',
    };

    const hasError = !!error;
    const hasSuccess = !!success && !error;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-foreground mb-1.5">
            {label}
            {props.required && <span className="text-destructive ml-0.5">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              'w-full rounded-md border bg-background px-3 py-2 text-foreground',
              'placeholder:text-muted-foreground/60',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
              'disabled:cursor-not-allowed disabled:opacity-50',
              sizes[size],
              leftIcon && 'pl-10',
              (rightIcon || hasError || hasSuccess) && 'pr-10',
              hasError && 'border-destructive focus:ring-destructive/20',
              hasSuccess && 'border-success focus:ring-success/20',
              !hasError && !hasSuccess && 'border-input',
              isFocused && !hasError && !hasSuccess && 'border-primary/60',
              className
            )}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            aria-invalid={hasError}
            aria-describedby={error ? `${props.id}-error` : hint ? `${props.id}-hint` : undefined}
            {...props}
          />

          {/* Right icon or validation icon */}
          {(rightIcon || hasError || hasSuccess) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              {hasError && <AlertCircle className="h-5 w-5 text-destructive" />}
              {hasSuccess && <CheckCircle className="h-5 w-5 text-success" />}
              {!hasError && !hasSuccess && rightIcon}
            </div>
          )}
        </div>

        {/* Inline error message */}
        {error && (
          <p id={`${props.id}-error`} className="mt-1.5 text-xs text-destructive flex items-start gap-1">
            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </p>
        )}

        {/* Success message */}
        {hasSuccess && (
          <p className="mt-1.5 text-xs text-success flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5" />
            <span>{success}</span>
          </p>
        )}

        {/* Hint text */}
        {hint && !error && !success && (
          <p id={`${props.id}-hint`} className="mt-1.5 text-xs text-muted-foreground">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

InlineInput.displayName = 'InlineInput';
