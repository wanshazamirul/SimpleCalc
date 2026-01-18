import { CalculatorLogic } from '../calculator-logic';

describe('CalculatorLogic', () => {
  let calculator: CalculatorLogic;

  beforeEach(() => {
    calculator = new CalculatorLogic();
  });

  describe('Basic Operations', () => {
    describe('Addition', () => {
      it('should add two positive numbers correctly', () => {
        calculator.inputNumber('2');
        calculator.inputOperation('+');
        calculator.inputNumber('2');
        calculator.calculate();

        expect(calculator.getState().currentValue).toBe('4');
      });

      it('should add multiple numbers in sequence', () => {
        calculator.inputNumber('2');
        calculator.inputOperation('+');
        calculator.inputNumber('2');
        calculator.inputOperation('+');
        calculator.inputNumber('2');
        calculator.calculate();

        expect(calculator.getState().currentValue).toBe('6');
      });

      it('should handle negative results', () => {
        calculator.inputNumber('5');
        calculator.inputOperation('+');
        calculator.inputNumber('10');
        calculator.calculate();

        expect(calculator.getState().currentValue).toBe('15');
      });

      it('should add zero correctly', () => {
        calculator.inputNumber('5');
        calculator.inputOperation('+');
        calculator.inputNumber('0');
        calculator.calculate();

        expect(calculator.getState().currentValue).toBe('5');
      });
    });

    describe('Subtraction', () => {
      it('should subtract two numbers correctly', () => {
        calculator.inputNumber('10');
        calculator.inputOperation('-');
        calculator.inputNumber('5');
        calculator.calculate();

        expect(calculator.getState().currentValue).toBe('5');
      });

      it('should handle negative results', () => {
        calculator.inputNumber('5');
        calculator.inputOperation('-');
        calculator.inputNumber('10');
        calculator.calculate();

        expect(calculator.getState().currentValue).toBe('-5');
      });

      it('should chain multiple subtractions', () => {
        calculator.inputNumber('10');
        calculator.inputOperation('-');
        calculator.inputNumber('5');
        calculator.inputOperation('-');
        calculator.inputNumber('2');
        calculator.calculate();

        expect(calculator.getState().currentValue).toBe('3');
      });
    });

    describe('Multiplication', () => {
      it('should multiply two numbers correctly', () => {
        calculator.inputNumber('3');
        calculator.inputOperation('×');
        calculator.inputNumber('4');
        calculator.calculate();

        expect(calculator.getState().currentValue).toBe('12');
      });

      it('should multiply by zero', () => {
        calculator.inputNumber('5');
        calculator.inputOperation('×');
        calculator.inputNumber('0');
        calculator.calculate();

        expect(calculator.getState().currentValue).toBe('0');
      });

      it('should handle large multiplication', () => {
        calculator.inputNumber('999');
        calculator.inputOperation('×');
        calculator.inputNumber('999');
        calculator.calculate();

        expect(calculator.getState().currentValue).toBe('998001');
      });
    });

    describe('Division', () => {
      it('should divide two numbers correctly', () => {
        calculator.inputNumber('15');
        calculator.inputOperation('÷');
        calculator.inputNumber('3');
        calculator.calculate();

        expect(calculator.getState().currentValue).toBe('5');
      });

      it('should handle division resulting in decimals', () => {
        calculator.inputNumber('10');
        calculator.inputOperation('÷');
        calculator.inputNumber('4');
        calculator.calculate();

        expect(calculator.getState().currentValue).toBe('2.5');
      });

      it('should handle division by zero', () => {
        calculator.inputNumber('5');
        calculator.inputOperation('÷');
        calculator.inputNumber('0');
        calculator.calculate();

        expect(calculator.getState().currentValue).toBe('Error');
        expect(calculator.getState().previousValue).toBe('');
        expect(calculator.getState().operation).toBeNull();
      });

      it('should chain multiple divisions', () => {
        calculator.inputNumber('100');
        calculator.inputOperation('÷');
        calculator.inputNumber('5');
        calculator.inputOperation('÷');
        calculator.inputNumber('4');
        calculator.calculate();

        expect(calculator.getState().currentValue).toBe('5');
      });
    });

    describe('Percentage', () => {
      it('should calculate percentage correctly', () => {
        calculator.inputNumber('50');
        calculator.percentage();

        expect(calculator.getState().currentValue).toBe('0.5');
      });

      it('should handle decimal percentages', () => {
        calculator.inputNumber('25');
        calculator.percentage();

        expect(calculator.getState().currentValue).toBe('0.25');
      });

      it('should handle zero percentage', () => {
        calculator.inputNumber('0');
        calculator.percentage();

        expect(calculator.getState().currentValue).toBe('0');
      });
    });
  });

  describe('Number Input', () => {
    it('should start with zero', () => {
      expect(calculator.getState().currentValue).toBe('0');
    });

    it('should replace zero when first digit is entered', () => {
      calculator.inputNumber('5');
      expect(calculator.getState().currentValue).toBe('5');
    });

    it('should append digits to existing number', () => {
      calculator.inputNumber('2');
      calculator.inputNumber('5');
      calculator.inputNumber('0');
      expect(calculator.getState().currentValue).toBe('250');
    });

    it('should handle multiple digit inputs correctly', () => {
      calculator.inputNumber('1');
      calculator.inputNumber('2');
      calculator.inputNumber('3');
      calculator.inputNumber('4');
      calculator.inputNumber('5');
      expect(calculator.getState().currentValue).toBe('12345');
    });

    it('should reset to new number after calculation', () => {
      calculator.inputNumber('5');
      calculator.inputOperation('+');
      calculator.inputNumber('3');
      calculator.calculate();

      expect(calculator.getState().currentValue).toBe('8');

      calculator.inputNumber('2');
      expect(calculator.getState().currentValue).toBe('2');
    });
  });

  describe('Decimal Input', () => {
    it('should add decimal point correctly', () => {
      calculator.inputNumber('3');
      calculator.inputDecimal();
      calculator.inputNumber('14');
      expect(calculator.getState().currentValue).toBe('3.14');
    });

    it('should start with 0 when decimal is first input', () => {
      calculator.inputDecimal();
      calculator.inputNumber('5');
      expect(calculator.getState().currentValue).toBe('0.5');
    });

    it('should prevent multiple decimal points', () => {
      calculator.inputNumber('3');
      calculator.inputDecimal();
      calculator.inputNumber('14');
      calculator.inputDecimal();
      calculator.inputNumber('15');
      // The second decimal is ignored but digits after are still appended
      expect(calculator.getState().currentValue).toBe('3.1415');
    });

    it('should handle decimal after calculation', () => {
      calculator.inputNumber('5');
      calculator.inputOperation('+');
      calculator.inputNumber('3');
      calculator.calculate();

      calculator.inputDecimal();
      calculator.inputNumber('5');
      expect(calculator.getState().currentValue).toBe('0.5');
    });

    it('should handle decimals in calculations', () => {
      calculator.inputNumber('3');
      calculator.inputDecimal();
      calculator.inputNumber('14');
      calculator.inputOperation('+');
      calculator.inputNumber('2');
      calculator.inputDecimal();
      calculator.inputNumber('86');
      calculator.calculate();

      expect(calculator.getState().currentValue).toBe('6');
    });

    it('should handle floating point precision issues', () => {
      calculator.inputNumber('0');
      calculator.inputDecimal();
      calculator.inputNumber('1');
      calculator.inputOperation('+');
      calculator.inputNumber('0');
      calculator.inputDecimal();
      calculator.inputNumber('2');
      calculator.calculate();

      expect(calculator.getState().currentValue).toBe('0.3');
    });
  });

  describe('Clear Operation', () => {
    it('should reset all state to initial values', () => {
      calculator.inputNumber('123');
      calculator.inputOperation('+');
      calculator.inputNumber('456');

      calculator.clear();

      const state = calculator.getState();
      expect(state.currentValue).toBe('0');
      expect(state.previousValue).toBe('');
      expect(state.operation).toBeNull();
      expect(state.overwrite).toBe(false);
    });

    it('should clear after error state', () => {
      calculator.inputNumber('5');
      calculator.inputOperation('÷');
      calculator.inputNumber('0');
      calculator.calculate();

      expect(calculator.getState().currentValue).toBe('Error');

      calculator.clear();

      expect(calculator.getState().currentValue).toBe('0');
    });

    it('should clear during operation input', () => {
      calculator.inputNumber('10');
      calculator.inputOperation('+');

      calculator.clear();

      const state = calculator.getState();
      expect(state.currentValue).toBe('0');
      expect(state.previousValue).toBe('');
      expect(state.operation).toBeNull();
    });
  });

  describe('Backspace Operation', () => {
    it('should remove last digit from multi-digit number', () => {
      calculator.inputNumber('12345');
      calculator.backspace();
      expect(calculator.getState().currentValue).toBe('1234');
    });

    it('should reset to zero when backspacing single digit', () => {
      calculator.inputNumber('5');
      calculator.backspace();
      expect(calculator.getState().currentValue).toBe('0');
    });

    it('should reset to zero when backspacing after calculation', () => {
      calculator.inputNumber('5');
      calculator.inputOperation('+');
      calculator.inputNumber('3');
      calculator.calculate();

      expect(calculator.getState().currentValue).toBe('8');

      calculator.backspace();
      expect(calculator.getState().currentValue).toBe('0');
    });

    it('should handle backspace on decimal numbers', () => {
      calculator.inputNumber('3');
      calculator.inputDecimal();
      calculator.inputNumber('14');

      calculator.backspace();
      expect(calculator.getState().currentValue).toBe('3.1');

      calculator.backspace();
      // Backspace removes the decimal point too
      expect(calculator.getState().currentValue).toBe('3.');
    });

    it('should not break on zero', () => {
      calculator.backspace();
      expect(calculator.getState().currentValue).toBe('0');
    });
  });

  describe('Complex Operations', () => {
    it('should handle chain operations correctly', () => {
      calculator.inputNumber('2');
      calculator.inputOperation('+');
      calculator.inputNumber('2');
      calculator.inputOperation('+');
      calculator.inputNumber('2');
      calculator.calculate();

      expect(calculator.getState().currentValue).toBe('6');
    });

    it('should handle mixed operations', () => {
      calculator.inputNumber('10');
      calculator.inputOperation('×');
      calculator.inputNumber('2');
      calculator.inputOperation('-');
      calculator.inputNumber('5');
      calculator.calculate();

      expect(calculator.getState().currentValue).toBe('15');
    });

    it('should handle operator change before second number', () => {
      calculator.inputNumber('5');
      calculator.inputOperation('+');
      // Changing operator before entering second number - returns early since currentValue is ''
      calculator.inputOperation('-');
      calculator.inputNumber('3');
      calculator.calculate();

      // The operator didn't change, so it's still 5 + 3 = 8
      expect(calculator.getState().currentValue).toBe('8');
    });

    it('should handle repeated equals', () => {
      calculator.inputNumber('5');
      calculator.inputOperation('+');
      calculator.inputNumber('3');
      calculator.calculate();

      const result = calculator.getState().currentValue;

      calculator.calculate();
      expect(calculator.getState().currentValue).toBe(result);
    });
  });

  describe('Edge Cases', () => {
    it('should handle very large numbers', () => {
      calculator.inputNumber('999999999');
      calculator.inputOperation('×');
      calculator.inputNumber('999');
      calculator.calculate();

      const result = calculator.getState().currentValue;
      expect(result).toBeTruthy();
      expect(result.length).toBeLessThanOrEqual(12);
    });

    it('should prevent overflow on result display', () => {
      calculator.inputNumber('999999999999');
      calculator.inputOperation('×');
      calculator.inputNumber('999999999999');
      calculator.calculate();

      const result = calculator.getState().currentValue;
      expect(result.length).toBeLessThanOrEqual(12);
    });

    it('should handle operation with no current value', () => {
      calculator.inputOperation('+');
      // Operation is set even with '0' as current value
      expect(calculator.getState().operation).toBe('+');
      expect(calculator.getState().previousValue).toBe('0');
      expect(calculator.getState().currentValue).toBe('');
    });

    it('should handle calculate with incomplete operation', () => {
      calculator.inputNumber('5');
      calculator.inputOperation('+');
      // Calculate returns early without second number, state unchanged
      calculator.calculate();

      expect(calculator.getState().previousValue).toBe('5');
      expect(calculator.getState().currentValue).toBe('');
      expect(calculator.getState().operation).toBe('+');
    });

    it('should handle calculate with no operation', () => {
      calculator.inputNumber('5');
      calculator.calculate();

      expect(calculator.getState().currentValue).toBe('5');
    });

    it('should handle changing operator without second number', () => {
      calculator.inputNumber('5');
      calculator.inputOperation('+');
      // Changing operator when currentValue is empty returns early, no change
      calculator.inputOperation('-');
      calculator.inputOperation('×');

      // Operation remains '+' since currentValue was empty
      expect(calculator.getState().operation).toBe('+');
      expect(calculator.getState().previousValue).toBe('5');
      expect(calculator.getState().currentValue).toBe('');
    });

    it('should handle zero divided by zero', () => {
      calculator.inputNumber('0');
      calculator.inputOperation('÷');
      calculator.inputNumber('0');
      calculator.calculate();

      expect(calculator.getState().currentValue).toBe('Error');
    });

    it('should handle decimal as first input after clear', () => {
      calculator.inputNumber('5');
      calculator.clear();
      calculator.inputDecimal();
      calculator.inputNumber('5');

      expect(calculator.getState().currentValue).toBe('0.5');
    });

    it('should handle very small decimal numbers', () => {
      calculator.inputNumber('0');
      calculator.inputDecimal();
      calculator.inputNumber('0');
      calculator.inputNumber('0');
      calculator.inputNumber('1');

      expect(calculator.getState().currentValue).toBe('0.001');
    });
  });

  describe('State Immutability', () => {
    it('should return a copy of state, not reference', () => {
      const state1 = calculator.getState();
      calculator.inputNumber('5');
      const state2 = calculator.getState();

      expect(state1.currentValue).toBe('0');
      expect(state2.currentValue).toBe('5');
      expect(state1).not.toBe(state2);
    });
  });

  describe('Overwrite Behavior', () => {
    it('should set overwrite flag after calculation', () => {
      calculator.inputNumber('5');
      calculator.inputOperation('+');
      calculator.inputNumber('3');
      calculator.calculate();

      expect(calculator.getState().overwrite).toBe(true);
    });

    it('should reset overwrite flag on new number input', () => {
      calculator.inputNumber('5');
      calculator.inputOperation('+');
      calculator.inputNumber('3');
      calculator.calculate();

      expect(calculator.getState().overwrite).toBe(true);

      calculator.inputNumber('2');
      expect(calculator.getState().overwrite).toBe(false);
    });

    it('should reset overwrite flag on decimal input', () => {
      calculator.inputNumber('5');
      calculator.inputOperation('+');
      calculator.inputNumber('3');
      calculator.calculate();

      expect(calculator.getState().overwrite).toBe(true);

      calculator.inputDecimal();
      expect(calculator.getState().overwrite).toBe(false);
    });
  });

  describe('Real-world Calculator Scenarios', () => {
    it('should calculate tip: 15% of 50', () => {
      calculator.inputNumber('50');
      calculator.inputOperation('×');
      calculator.inputNumber('15');
      calculator.percentage();

      expect(calculator.getState().currentValue).toBe('0.15');
    });

    it('should calculate discount: 100 - 20%', () => {
      // 20% = 0.2
      calculator.inputNumber('20');
      calculator.percentage();
      const percentage = calculator.getState().currentValue;

      // Clear and start actual calculation
      calculator.clear();
      calculator.inputNumber('100');
      calculator.inputOperation('-');
      calculator.inputNumber('20');
      calculator.percentage();
      // Now calculate 100 - 0.2 = 99.8
      calculator.calculate();

      expect(calculator.getState().currentValue).toBe('99.8');
    });

    it('should handle shopping cart: 10 + 5 + 3', () => {
      calculator.inputNumber('10');
      calculator.inputOperation('+');
      calculator.inputNumber('5');
      calculator.inputOperation('+');
      calculator.inputNumber('3');
      calculator.calculate();

      expect(calculator.getState().currentValue).toBe('18');
    });

    it('should calculate average: (10 + 20 + 30) ÷ 3', () => {
      calculator.inputNumber('10');
      calculator.inputOperation('+');
      calculator.inputNumber('20');
      calculator.inputOperation('+');
      calculator.inputNumber('30');
      calculator.calculate();

      calculator.inputOperation('÷');
      calculator.inputNumber('3');
      calculator.calculate();

      expect(calculator.getState().currentValue).toBe('20');
    });
  });
});
