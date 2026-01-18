'use client';

import { motion } from 'framer-motion';
import { CalculatorButtonProps } from '@/types/calculator';
import { cn } from '@/lib/utils';

export const CalculatorButton = ({
  value,
  type,
  onClick,
  className
}: CalculatorButtonProps) => {
  const getButtonStyle = () => {
    switch (type) {
      case 'operator':
        return 'text-neon-blue dark:text-neon-blue text-frosty-blue font-semibold';
      case 'equals':
        return 'bg-gradient-to-br from-neon-blue to-neon-purple dark:from-neon-blue dark:to-neon-purple from-frosty-blue to-frosty-purple text-white font-bold';
      case 'clear':
      case 'backspace':
        return 'text-red-400 dark:text-red-400 text-red-500 font-semibold';
      case 'decimal':
      default:
        return 'text-white dark:text-white text-gray-700';
    }
  };

  return (
    <motion.button
      onClick={() => onClick(value)}
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
        'transition-all duration-300',
        // Button type specific styles
        getButtonStyle(),
        // Background based on theme
        'bg-white/10 dark:bg-white/10 bg-white/50',
        // Hover effects
        'hover:bg-white/20 dark:hover:bg-white/20 hover:bg-white/70',
        className
      )}
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
};
