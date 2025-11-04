/**
 * Input Component
 * A flexible input component with validation states and accessibility features
 */

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { InputProps } from '@/types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      placeholder,
      value,
      onChange,
      onBlur,
      error,
      label,
      required = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const inputId = React.useId();
    const errorId = `${inputId}-error`;

    const baseClasses = cn(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      {
        'border-destructive focus-visible:ring-destructive': error,
        'border-input': !error,
      },
      className
    );

    const labelClasses = cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      {
        'text-destructive': error,
        'text-foreground': !error,
      }
    );

    const errorClasses = 'text-sm text-destructive mt-1';

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className={labelClasses}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <motion.input
          ref={ref}
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          className={baseClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          whileFocus={{
            scale: 1.01,
            transition: { type: 'spring', stiffness: 300, damping: 20 },
          }}
          {...props}
        />

        {error && (
          <motion.p
            id={errorId}
            className={errorClasses}
            role="alert"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';