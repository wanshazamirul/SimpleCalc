/**
 * Calculator state interface
 */
export interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operation: string | null;
  overwrite: boolean;
}

/**
 * Button type for calculator buttons
 */
export type ButtonType = 'number' | 'operator' | 'equals' | 'clear' | 'backspace' | 'decimal';

/**
 * Calculator button props
 */
export interface CalculatorButtonProps {
  value: string;
  type: ButtonType;
  onClick: (value: string) => void;
  className?: string;
}

/**
 * Calculator display props
 */
export interface CalculatorDisplayProps {
  currentValue: string;
  previousValue: string;
  operation: string | null;
}

/**
 * Calculator theme type
 */
export type CalculatorTheme = 'dark' | 'light';
