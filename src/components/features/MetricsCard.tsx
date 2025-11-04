/**
 * Metrics Card Component
 * Animated card for displaying dashboard metrics
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui';
import { cn } from '@/utils/cn';

interface MetricsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  loading?: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  hover: {
    y: -4,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 20,
    },
  },
};

const iconVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
};

const countVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  className,
  loading = false,
}) => {
  if (loading) {
    return (
      <Card className={cn('h-32', className)}>
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
          <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-muted rounded w-1/4"></div>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      layout
    >
      <Card variant="elevated" className={cn('relative overflow-hidden', className)}>
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              {title}
            </h3>
            {icon && (
              <motion.div
                variants={iconVariants}
                className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg text-primary"
              >
                {icon}
              </motion.div>
            )}
          </div>

          {/* Value */}
          <div className="mb-2">
            <motion.div
              variants={countVariants}
              className="text-2xl font-bold text-foreground"
            >
              {value}
            </motion.div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            {subtitle && (
              <p className="text-xs text-muted-foreground">
                {subtitle}
              </p>
            )}

            {trend && (
              <motion.div
                className={cn(
                  'flex items-center text-xs font-medium',
                  trend.isPositive ? 'text-success' : 'text-destructive'
                )}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="mr-1">
                  {trend.isPositive ? '↑' : '↓'}
                </span>
                {Math.abs(trend.value)}%
              </motion.div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};