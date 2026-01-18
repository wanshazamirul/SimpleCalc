'use client';

import { motion } from 'framer-motion';
import { CalculatorDisplayProps } from '@/types/calculator';
import { cn } from '@/lib/utils';
import { memo, useMemo } from 'react';

export const CalculatorDisplay = memo(({
  currentValue,
  previousValue,
  operation
}: CalculatorDisplayProps) => {
  // Memoize the display text to prevent unnecessary re-renders
  const displayContent = useMemo(() => ({
    currentValue,
    previousValue,
    operation
  }), [currentValue, previousValue, operation]);

  return (
    <motion.div
      className={cn(
        'glass-display',
        'relative overflow-hidden',
        'backdrop-blur-xl',
        'bg-white/5 dark:bg-white/5 bg-white/30',
        'border border-white/20 dark:border-white/20 border-gray-300/30',
        'rounded-3xl',
        'p-6 md:p-8',
        'mb-6',
        'shadow-2xl',
        'will-change-transform',
        'contain: layout style paint'
      )}
      style={{
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)'
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 dark:from-neon-blue/10 dark:to-neon-purple/10 from-frosty-blue/5 to-frosty-purple/5 opacity-50 pointer-events-none" />

      <div className="relative z-10 text-right">
        {/* Previous operation */}
        {displayContent.previousValue && (
          <motion.div
            className="text-sm md:text-base opacity-60 mb-2 min-h-[24px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.6, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {displayContent.previousValue} {displayContent.operation}
          </motion.div>
        )}

        {/* Current value */}
        <motion.div
          key={displayContent.currentValue}
          className={cn(
            'text-4xl md:text-6xl',
            'font-bold',
            'text-white dark:text-white text-gray-800',
            'tracking-tight',
            'break-all'
          )}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {displayContent.currentValue}
        </motion.div>
      </div>
    </motion.div>
  );
});

CalculatorDisplay.displayName = 'CalculatorDisplay';
