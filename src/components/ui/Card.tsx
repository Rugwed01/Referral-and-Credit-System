/**
 * Card Component
 * A flexible card component with multiple variants and padding options
 */

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { CardProps } from '@/types';

const cardVariants = {
  default: 'bg-card text-card-foreground shadow-sm',
  elevated: 'bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-200',
  outlined: 'bg-card text-card-foreground border border-border',
};

const cardPadding = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'md',
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      'rounded-lg',
      cardVariants[variant],
      cardPadding[padding],
      className
    );

    const motionProps = {
      whileHover: variant === 'elevated' ? {
        y: -2,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      } : {},
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3 },
    };

    return (
      <motion.div
        ref={ref}
        className={baseClasses}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';