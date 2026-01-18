'use client';

import { motion } from 'framer-motion';
import { CalculatorButton } from './calc-button';
import { ButtonType } from '@/types/calculator';
import { memo, useMemo } from 'react';

interface ButtonGridProps {
  onButtonClick: (value: string, type: ButtonType) => void;
  theme: 'dark' | 'light';
}

const buttons = [
  // Row 1
  { value: 'C', type: 'clear' as ButtonType },
  { value: '⌫', type: 'backspace' as ButtonType },
  { value: '%', type: 'operator' as ButtonType },
  { value: '÷', type: 'operator' as ButtonType },
  // Row 2
  { value: '7', type: 'number' as ButtonType },
  { value: '8', type: 'number' as ButtonType },
  { value: '9', type: 'number' as ButtonType },
  { value: '×', type: 'operator' as ButtonType },
  // Row 3
  { value: '4', type: 'number' as ButtonType },
  { value: '5', type: 'number' as ButtonType },
  { value: '6', type: 'number' as ButtonType },
  { value: '-', type: 'operator' as ButtonType },
  // Row 4
  { value: '1', type: 'number' as ButtonType },
  { value: '2', type: 'number' as ButtonType },
  { value: '3', type: 'number' as ButtonType },
  { value: '+', type: 'operator' as ButtonType },
  // Row 5
  { value: '0', type: 'number' as ButtonType, span: 2 },
  { value: '.', type: 'decimal' as ButtonType },
  { value: '=', type: 'equals' as ButtonType },
];

// Optimized animation variants for grid items
const gridItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      delay: index * 0.02, // Reduced from 0.03 for faster appearance
      type: "spring" as const,
      stiffness: 200,
      damping: 20
    }
  })
};

export const ButtonGrid = memo(({ onButtonClick, theme }: ButtonGridProps) => {
  // Memoize the button elements to prevent unnecessary re-renders
  const buttonElements = useMemo(() => {
    return buttons.map((button, index) => (
      <motion.div
        key={button.value}
        custom={index}
        variants={gridItemVariants}
        initial="hidden"
        animate="visible"
        className={button.span === 2 ? 'col-span-2' : ''}
        style={{
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)'
        }}
      >
        <CalculatorButton
          value={button.value}
          type={button.type}
          onClick={(value) => onButtonClick(value, button.type)}
        />
      </motion.div>
    ));
  }, [onButtonClick]); // Only re-render if onButtonClick changes

  return (
    <div className="grid grid-cols-4 gap-3 md:gap-4">
      {buttonElements}
    </div>
  );
});

ButtonGrid.displayName = 'ButtonGrid';
