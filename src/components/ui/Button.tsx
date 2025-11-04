/**
 * Button Component
 * A versatile button component with multiple variants, sizes, and states
 */

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import { ButtonProps } from '@/types';

const buttonVariants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
};

const buttonSizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 py-2',
  lg: 'h-12 px-6 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      children,
      onClick,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      buttonVariants[variant],
      buttonSizes[size],
      className
    );

    const motionProps = {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: { type: 'spring', stiffness: 400, damping: 17 },
    };

    if (loading) {
      return (
        <motion.button
          ref={ref}
          className={baseClasses}
          disabled={true}
          type={type}
          {...motionProps}
          {...props}
        >
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {children}
        </motion.button>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={baseClasses}
        disabled={disabled}
        onClick={onClick}
        type={type}
        whileHover={disabled ? {} : motionProps.whileHover}
        whileTap={disabled ? {} : motionProps.whileTap}
        transition={motionProps.transition}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';