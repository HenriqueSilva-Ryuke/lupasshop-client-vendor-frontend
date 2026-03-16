'use client';

import React, { forwardRef, InputHTMLAttributes } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

/**
 * Toggle Switch Component with smooth animation
 * Replaces checkboxes with a modern toggle switch styled with Lupa primary color
 */

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  disabled?: boolean;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, description, className, checked, disabled, ...props }, ref) => {
    return (
      <div className={cn('flex items-center justify-between gap-3', className)}>
        <div className="flex items-start gap-2 flex-1">
          {label && (
            <label className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer')}>
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>

        <label className={cn('relative inline-block w-11 h-6 rounded-full transition-colors', checked ? 'bg-primary' : 'bg-muted-foreground/30', disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer')}>
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            className="sr-only peer"
            {...props}
          />

          <motion.div
            className={cn(
              'absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-colors'
            )}
            animate={{
              x: checked ? 20 : 0,
            }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          />
        </label>
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';
