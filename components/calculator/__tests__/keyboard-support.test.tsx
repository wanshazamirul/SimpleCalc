import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Calculator } from '../calculator';

describe('Calculator Keyboard Support', () => {
  describe('Number Keys', () => {
    it('should handle single number key press', async () => {
      const { container } = render(<Calculator />);

      fireEvent.keyDown(window, { key: '5' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('5');
      });
    });

    it('should append multiple number keys', async () => {
      const { container } = render(<Calculator />);

      fireEvent.keyDown(window, { key: '1' });
      fireEvent.keyDown(window, { key: '2' });
      fireEvent.keyDown(window, { key: '3' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('123');
      });
    });
  });

  describe('Operator Keys', () => {
    it('should handle + key', async () => {
      const { container } = render(<Calculator />);

      fireEvent.keyDown(window, { key: '5' });
      fireEvent.keyDown(window, { key: '+' });
      fireEvent.keyDown(window, { key: '3' });

      await waitFor(() => {
        const previousValue = container.querySelector('.opacity-60');
        expect(previousValue).toHaveTextContent('5 +');
      });
    });

    it('should handle - key', async () => {
      const { container } = render(<Calculator />);

      fireEvent.keyDown(window, { key: '1' });
      fireEvent.keyDown(window, { key: '0' });
      fireEvent.keyDown(window, { key: '-' });
      fireEvent.keyDown(window, { key: '5' });

      await waitFor(() => {
        const previousValue = container.querySelector('.opacity-60');
        expect(previousValue).toHaveTextContent('10 -');
      });
    });

    it('should handle * key as multiplication', async () => {
      const { container } = render(<Calculator />);

      fireEvent.keyDown(window, { key: '3' });
      fireEvent.keyDown(window, { key: '*' });
      fireEvent.keyDown(window, { key: '4' });

      await waitFor(() => {
        const previousValue = container.querySelector('.opacity-60');
        expect(previousValue).toHaveTextContent('3 ×');
      });
    });

    it('should handle / key as division', async () => {
      const { container } = render(<Calculator />);

      fireEvent.keyDown(window, { key: '1' });
      fireEvent.keyDown(window, { key: '5' });
      fireEvent.keyDown(window, { key: '/' });
      fireEvent.keyDown(window, { key: '3' });

      await waitFor(() => {
        const previousValue = container.querySelector('.opacity-60');
        expect(previousValue).toHaveTextContent('15 ÷');
      });
    });

    it('should handle % key', async () => {
      const { container } = render(<Calculator />);

      fireEvent.keyDown(window, { key: '5' });
      fireEvent.keyDown(window, { key: '0' });
      fireEvent.keyDown(window, { key: '%' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('0.5');
      });
    });
  });

  describe('Equals Key', () => {
    it('should handle Enter key as equals', async () => {
      const { container } = render(<Calculator />);

      fireEvent.keyDown(window, { key: '2' });
      fireEvent.keyDown(window, { key: '+' });
      fireEvent.keyDown(window, { key: '2' });
      fireEvent.keyDown(window, { key: 'Enter' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('4');
      });
    });

    it('should handle = key as equals', async () => {
      const { container } = render(<Calculator />);

      fireEvent.keyDown(window, { key: '3' });
      fireEvent.keyDown(window, { key: '+' });
      fireEvent.keyDown(window, { key: '4' });
      fireEvent.keyDown(window, { key: '=' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('7');
      });
    });
  });

  describe('Clear Keys', () => {
    it('should handle Escape key as clear', async () => {
      const { container } = render(<Calculator />);

      fireEvent.keyDown(window, { key: '1' });
      fireEvent.keyDown(window, { key: '2' });
      fireEvent.keyDown(window, { key: '3' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('123');
      });

      fireEvent.keyDown(window, { key: 'Escape' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('0');
      });
    });

    it('should handle c key as clear', async () => {
      const { container } = render(<Calculator />);

      fireEvent.keyDown(window, { key: '5' });
      fireEvent.keyDown(window, { key: '5' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('55');
      });

      fireEvent.keyDown(window, { key: 'c' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('0');
      });
    });

    it('should handle C (uppercase) key as clear', async () => {
      const { container } = render(<Calculator />);

      fireEvent.keyDown(window, { key: '9' });
      fireEvent.keyDown(window, { key: '9' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('99');
      });

      fireEvent.keyDown(window, { key: 'C' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('0');
      });
    });
  });

  describe('Backspace Key', () => {
    it('should handle Backspace key to delete last digit', async () => {
      const { container } = render(<Calculator />);

      fireEvent.keyDown(window, { key: '1' });
      fireEvent.keyDown(window, { key: '2' });
      fireEvent.keyDown(window, { key: '3' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('123');
      });

      fireEvent.keyDown(window, { key: 'Backspace' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('12');
      });

      fireEvent.keyDown(window, { key: 'Backspace' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('1');
      });

      fireEvent.keyDown(window, { key: 'Backspace' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('0');
      });
    });
  });

  describe('Decimal Key', () => {
    it('should handle . key for decimal input', async () => {
      const { container } = render(<Calculator />);

      fireEvent.keyDown(window, { key: '3' });
      fireEvent.keyDown(window, { key: '.' });
      fireEvent.keyDown(window, { key: '1' });
      fireEvent.keyDown(window, { key: '4' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('3.14');
      });
    });

    it('should prevent multiple decimals with keyboard', async () => {
      const { container } = render(<Calculator />);

      fireEvent.keyDown(window, { key: '5' });
      fireEvent.keyDown(window, { key: '.' });
      fireEvent.keyDown(window, { key: '5' });
      fireEvent.keyDown(window, { key: '.' });
      fireEvent.keyDown(window, { key: '5' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('5.5');
      });
    });
  });

  describe('Complex Keyboard Calculations', () => {
    it('should complete full calculation with keyboard: 10 + 20 = 30', async () => {
      const { container } = render(<Calculator />);

      fireEvent.keyDown(window, { key: '1' });
      fireEvent.keyDown(window, { key: '0' });
      fireEvent.keyDown(window, { key: '+' });
      fireEvent.keyDown(window, { key: '2' });
      fireEvent.keyDown(window, { key: '0' });
      fireEvent.keyDown(window, { key: 'Enter' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('30');
      });
    });

    it('should handle chained operations with keyboard', async () => {
      const { container } = render(<Calculator />);

      fireEvent.keyDown(window, { key: '2' });
      fireEvent.keyDown(window, { key: '+' });
      fireEvent.keyDown(window, { key: '2' });
      fireEvent.keyDown(window, { key: '+' });
      fireEvent.keyDown(window, { key: '2' });
      fireEvent.keyDown(window, { key: '=' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('6');
      });
    });

    it('should handle division by zero with keyboard', async () => {
      const { container } = render(<Calculator />);

      fireEvent.keyDown(window, { key: '5' });
      fireEvent.keyDown(window, { key: '/' });
      fireEvent.keyDown(window, { key: '0' });
      fireEvent.keyDown(window, { key: 'Enter' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('Error');
      });
    });

    it('should handle percentage calculation with keyboard', async () => {
      const { container } = render(<Calculator />);

      fireEvent.keyDown(window, { key: '2' });
      fireEvent.keyDown(window, { key: '5' });
      fireEvent.keyDown(window, { key: '%' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('0.25');
      });
    });
  });

  describe('Keyboard Shortcuts for Clear During Operation', () => {
    it('should clear during operation with Escape', async () => {
      const { container } = render(<Calculator />);

      fireEvent.keyDown(window, { key: '1' });
      fireEvent.keyDown(window, { key: '0' });
      fireEvent.keyDown(window, { key: '+' });
      fireEvent.keyDown(window, { key: '5' });

      await waitFor(() => {
        const previousValue = container.querySelector('.opacity-60');
        expect(previousValue).toHaveTextContent('10 +');
      });

      fireEvent.keyDown(window, { key: 'Escape' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('0');
      });
    });
  });

  describe('Edge Cases with Keyboard', () => {
    it('should handle keyboard input after error state', async () => {
      const { container } = render(<Calculator />);

      // Cause error
      fireEvent.keyDown(window, { key: '5' });
      fireEvent.keyDown(window, { key: '/' });
      fireEvent.keyDown(window, { key: '0' });
      fireEvent.keyDown(window, { key: 'Enter' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('Error');
      });

      // Clear with keyboard
      fireEvent.keyDown(window, { key: 'Escape' });

      // New calculation
      fireEvent.keyDown(window, { key: '5' });
      fireEvent.keyDown(window, { key: '+' });
      fireEvent.keyDown(window, { key: '5' });
      fireEvent.keyDown(window, { key: '=' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('10');
      });
    });

    it('should handle starting with decimal via keyboard', async () => {
      const { container } = render(<Calculator />);

      fireEvent.keyDown(window, { key: '.' });
      fireEvent.keyDown(window, { key: '5' });

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('0.5');
      });
    });
  });
});
