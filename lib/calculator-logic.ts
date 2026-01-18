import { CalculatorState } from '@/types/calculator';

/**
 * Calculator state management and operations
 */
export class CalculatorLogic {
  private state: CalculatorState;

  constructor() {
    this.state = {
      currentValue: '0',
      previousValue: '',
      operation: null,
      overwrite: false,
    };
  }

  getState(): CalculatorState {
    return { ...this.state };
  }

  /**
   * Handle number input
   */
  inputNumber(value: string): void {
    if (this.state.overwrite) {
      this.state.currentValue = value;
      this.state.overwrite = false;
    } else {
      this.state.currentValue = this.state.currentValue === '0'
        ? value
        : this.state.currentValue + value;
    }
  }

  /**
   * Handle operator input (+, -, ×, ÷)
   */
  inputOperation(operation: string): void {
    if (this.state.currentValue === '') return;

    if (this.state.previousValue !== '') {
      this.calculate();
    }

    this.state.operation = operation;
    this.state.previousValue = this.state.currentValue;
    this.state.currentValue = '';
  }

  /**
   * Handle equals operation
   */
  calculate(): void {
    if (this.state.operation === null || this.state.previousValue === '' || this.state.currentValue === '') {
      return;
    }

    const prev = parseFloat(this.state.previousValue);
    const current = parseFloat(this.state.currentValue);
    let result = 0;

    switch (this.state.operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        if (current === 0) {
          this.state.currentValue = 'Error';
          this.state.previousValue = '';
          this.state.operation = null;
          return;
        }
        result = prev / current;
        break;
      default:
        return;
    }

    this.state.currentValue = this.formatResult(result);
    this.state.operation = null;
    this.state.previousValue = '';
    this.state.overwrite = true;
  }

  /**
   * Handle percentage calculation
   */
  percentage(): void {
    const current = parseFloat(this.state.currentValue);
    if (isNaN(current)) return;

    this.state.currentValue = this.formatResult(current / 100);
  }

  /**
   * Handle decimal input
   */
  inputDecimal(): void {
    if (this.state.overwrite) {
      this.state.currentValue = '0.';
      this.state.overwrite = false;
      return;
    }

    if (this.state.currentValue.includes('.')) return;
    this.state.currentValue += '.';
  }

  /**
   * Handle clear operation
   */
  clear(): void {
    this.state = {
      currentValue: '0',
      previousValue: '',
      operation: null,
      overwrite: false,
    };
  }

  /**
   * Handle backspace operation
   */
  backspace(): void {
    if (this.state.overwrite) {
      this.state.currentValue = '0';
      this.state.overwrite = false;
      return;
    }

    if (this.state.currentValue.length === 1) {
      this.state.currentValue = '0';
    } else {
      this.state.currentValue = this.state.currentValue.slice(0, -1);
    }
  }

  /**
   * Format result to prevent floating point issues
   */
  private formatResult(result: number): string {
    // Round to 10 decimal places to prevent floating point errors
    const rounded = Math.round(result * 10000000000) / 10000000000;

    // Convert to string and limit length
    let resultStr = rounded.toString();

    // Limit to 12 characters
    if (resultStr.length > 12) {
      if (resultStr.includes('.')) {
        const parts = resultStr.split('.');
        if (parts[0]!.length > 12) {
          resultStr = parts[0]!.slice(0, 12);
        } else {
          resultStr = parts[0]!.slice(0, 12 - parts[1]!.length - 1) + '.' + parts[1]!.slice(0, 12 - parts[0]!.length - 1);
        }
      } else {
        resultStr = resultStr.slice(0, 12);
      }
    }

    return resultStr;
  }
}
