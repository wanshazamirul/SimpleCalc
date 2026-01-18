'use client';

import { motion } from 'framer-motion';
import { CalculatorButtonProps, ButtonType } from '@/types/calculator';
import { cn } from '@/lib/utils';
import { memo, useMemo } from 'react';

const buttonStyleCache = new Map<ButtonType, string>();

export const CalculatorButton = memo(({
  value,
  type,
  onClick,
  className
}: CalculatorButtonProps) => {
  // Memoize button style computation
  const buttonStyle = useMemo(() => {
    if (buttonStyleCache.has(type)) {
      return buttonStyleCache.get(type)!;
    }

    let style: string;
    switch (type) {
      case 'operator':
        style = 'text-neon-blue dark:text-neon-blue text-frosty-blue font-semibold';
        break;
      case 'equals':
        style = 'bg-gradient-to-br from-neon-blue to-neon-purple dark:from-neon-blue dark:to-neon-purple from-frosty-blue to-frosty-purple text-white font-bold';
        break;
      case 'clear':
      case 'backspace':
        style = 'text-red-400 dark:text-red-400 text-red-500 font-semibold';
        break;
      case 'decimal':
      default:
        style = 'text-white dark:text-white text-gray-700';
    }

    buttonStyleCache.set(type, style);
    return style;
  }, [type]);

  // Memoize click handler
  const handleClick = useMemo(() => () => onClick(value), [onClick, value]);

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        // Glassmorphism base styles
        'glass-button',
        'relative overflow-hidden',
        'backdrop-blur-md',
        'border border-white/20 dark:border-white/20 border-gray-300/30',
        'rounded-2xl',
        'aspect-square',
        'min-h-[60px]',
        'text-2xl md:text-3xl',
        'font-medium',
        'shadow-lg',
        'will-change-transform',
        // Button type specific styles
        buttonStyle,
        // Background based on theme
        'bg-white/10 dark:bg-white/10 bg-white/50',
        // Hover effects
        'hover:bg-white/20 dark:hover:bg-white/20 hover:bg-white/70',
        className
      )}
      style={{
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)'
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

      {/* Button content */}
      <span className="relative z-10">{value}</span>
    </motion.button>
  );
});

CalculatorButton.displayName = 'CalculatorButton';
