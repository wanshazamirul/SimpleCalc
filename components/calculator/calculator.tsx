'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalculatorDisplay } from './display';
import { ButtonGrid } from './button-grid';
import { CalculatorLogic } from '@/lib/calculator-logic';
import { ButtonType, CalculatorTheme } from '@/types/calculator';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalculatorProps {
  initialTheme?: CalculatorTheme;
}

export const Calculator = ({ initialTheme = 'dark' }: CalculatorProps) => {
  const [calculator] = useState(() => new CalculatorLogic());
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState('');
  const [operation, setOperation] = useState<string | null>(null);
  const [theme, setTheme] = useState<CalculatorTheme>(initialTheme);

  const handleButtonClick = useCallback((value: string, type: ButtonType) => {
    switch (type) {
      case 'number':
        calculator.inputNumber(value);
        break;
      case 'operator':
        if (value === '%') {
          calculator.percentage();
        } else {
          calculator.inputOperation(value);
        }
        break;
      case 'equals':
        calculator.calculate();
        break;
      case 'clear':
        calculator.clear();
        break;
      case 'backspace':
        calculator.backspace();
        break;
      case 'decimal':
        calculator.inputDecimal();
        break;
    }

    // Update state
    const newState = calculator.getState();
    setCurrentValue(newState.currentValue);
    setPreviousValue(newState.previousValue);
    setOperation(newState.operation);
  }, [calculator]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleButtonClick(e.key, 'number');
      } else if (e.key === '.') {
        handleButtonClick('.', 'decimal');
      } else if (e.key === '+') {
        handleButtonClick('+', 'operator');
      } else if (e.key === '-') {
        handleButtonClick('-', 'operator');
      } else if (e.key === '*') {
        handleButtonClick('×', 'operator');
      } else if (e.key === '/') {
        e.preventDefault(); // Prevent Firefox quick search
        handleButtonClick('÷', 'operator');
      } else if (e.key === 'Enter' || e.key === '=') {
        handleButtonClick('=', 'equals');
      } else if (e.key === 'Backspace') {
        handleButtonClick('⌫', 'backspace');
      } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        handleButtonClick('C', 'clear');
      } else if (e.key === '%') {
        handleButtonClick('%', 'operator');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleButtonClick]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={cn(
      'relative min-h-screen flex items-center justify-center p-4',
      'transition-colors duration-500',
      theme === 'dark'
        ? 'bg-gradient-dark'
        : 'bg-gradient-light'
    )}>
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={cn(
            'absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[80px]',
            'opacity-30',
            theme === 'dark' ? 'bg-neon-purple' : 'bg-frosty-purple'
          )}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className={cn(
            'absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[80px]',
            'opacity-30',
            theme === 'dark' ? 'bg-neon-blue' : 'bg-frosty-blue'
          )}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[80px]',
            'opacity-20',
            theme === 'dark' ? 'bg-pink-500' : 'bg-pink-300'
          )}
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Theme toggle */}
      <motion.button
        onClick={toggleTheme}
        className={cn(
          'absolute top-6 right-6 z-20',
          'p-3 rounded-full',
          'backdrop-blur-md',
          'border border-white/20 dark:border-white/20 border-gray-300/30',
          'bg-white/10 dark:bg-white/10 bg-white/30',
          'hover:bg-white/20 dark:hover:bg-white/20 hover:bg-white/40',
          'shadow-lg',
          'transition-all duration-300'
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className={cn(
                'w-6 h-6',
                theme === 'dark' ? 'text-neon-blue' : 'text-frosty-blue'
              )} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className={cn(
                'w-6 h-6',
                theme === 'light' ? 'text-neon-purple' : 'text-frosty-purple'
              )} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Calculator */}
      <motion.div
        className={cn(
          'relative z-10 w-full max-w-[420px]',
          'glass-calculator',
          'backdrop-blur-xl',
          'bg-white/10 dark:bg-white/10 bg-white/25',
          'border border-white/20 dark:border-white/20 border-gray-300/30',
          'rounded-3xl',
          'p-6 md:p-8',
          'shadow-2xl',
          'transition-all duration-500'
        )}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 200
        }}
      >
        <CalculatorDisplay
          currentValue={currentValue}
          previousValue={previousValue}
          operation={operation}
        />
        <ButtonGrid onButtonClick={handleButtonClick} theme={theme} />
      </motion.div>
    </div>
  );
};
