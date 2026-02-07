'use client';

import React, { forwardRef, InputHTMLAttributes } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Checkbox with smooth animation (UX pattern: Microinteractions)
 * Provides tactile feedback and visual confirmation.
 */

export interface AnimatedCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const AnimatedCheckbox = forwardRef<HTMLInputElement, AnimatedCheckboxProps>(
  ({ label, description, className, checked, ...props }, ref) => {
    return (
      <label className={cn('flex items-start gap-3 cursor-pointer group', className)}>
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            className="sr-only peer"
            {...props}
          />
          
          <motion.div
            className={cn(
              'h-5 w-5 rounded border-2 transition-colors duration-200',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-1',
              'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
              checked
                ? 'bg-primary border-primary'
                : 'bg-background border-input group-hover:border-primary/60'
            )}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.1 }}
          >
            <motion.div
              initial={false}
              animate={{
                scale: checked ? 1 : 0,
                opacity: checked ? 1 : 0,
              }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center h-full w-full"
            >
              <Check className="h-3.5 w-3.5 text-primary-foreground stroke-[3]" />
            </motion.div>
          </motion.div>
        </div>

        {(label || description) && (
          <div className="flex-1 -mt-0.5">
            {label && (
              <span className="text-sm font-medium text-foreground group-hover:text-primary/80 transition-colors">
                {label}
              </span>
            )}
            {description && (
              <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            )}
          </div>
        )}
      </label>
    );
  }
);

AnimatedCheckbox.displayName = 'AnimatedCheckbox';
