'use client';

import { motion } from 'framer-motion';
import { CalculatorButton } from './calc-button';
import { ButtonType } from '@/types/calculator';

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

export const ButtonGrid = ({ onButtonClick, theme }: ButtonGridProps) => {
  return (
    <div className="grid grid-cols-4 gap-3 md:gap-4">
      {buttons.map((button, index) => (
        <motion.div
          key={button.value}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            delay: index * 0.03,
            type: "spring",
            stiffness: 200
          }}
          className={button.span === 2 ? 'col-span-2' : ''}
        >
          <CalculatorButton
            value={button.value}
            type={button.type}
            onClick={(value) => onButtonClick(value, button.type)}
          />
        </motion.div>
      ))}
    </div>
  );
};
