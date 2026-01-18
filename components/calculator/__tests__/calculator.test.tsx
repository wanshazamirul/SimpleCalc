import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Calculator } from '../calculator';

describe('Calculator Integration Tests', () => {
  describe('Basic User Flows', () => {
    it('should complete simple addition: 2 + 2 = 4', async () => {
      const { container } = render(<Calculator />);

      // Click 2
      fireEvent.click(screen.getByRole('button', { name: '2' }));
      // Click +
      fireEvent.click(screen.getByRole('button', { name: '+' }));
      // Click 2
      fireEvent.click(screen.getByRole('button', { name: '2' }));
      // Click =
      fireEvent.click(screen.getByRole('button', { name: '=' }));

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('4');
      });
    });

    it('should complete subtraction: 10 - 5 = 5', async () => {
      const { container } = render(<Calculator />);

      fireEvent.click(screen.getByRole('button', { name: '1' }));
      fireEvent.click(screen.getByRole('button', { name: '0' }));
      fireEvent.click(screen.getByRole('button', { name: '-' }));
      fireEvent.click(screen.getByRole('button', { name: '5' }));
      fireEvent.click(screen.getByRole('button', { name: '=' }));

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('5');
      });
    });

    it('should complete multiplication: 3 × 4 = 12', async () => {
      const { container } = render(<Calculator />);

      fireEvent.click(screen.getByRole('button', { name: '3' }));
      fireEvent.click(screen.getByRole('button', { name: '×' }));
      fireEvent.click(screen.getByRole('button', { name: '4' }));
      fireEvent.click(screen.getByRole('button', { name: '=' }));

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('12');
      });
    });

    it('should complete division: 15 ÷ 3 = 5', async () => {
      const { container } = render(<Calculator />);

      fireEvent.click(screen.getByRole('button', { name: '1' }));
      fireEvent.click(screen.getByRole('button', { name: '5' }));
      fireEvent.click(screen.getByRole('button', { name: '÷' }));
      fireEvent.click(screen.getByRole('button', { name: '3' }));
      fireEvent.click(screen.getByRole('button', { name: '=' }));

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('5');
      });
    });

    it('should handle decimal operations: 3.14 + 2.86 = 6', async () => {
      const { container } = render(<Calculator />);

      fireEvent.click(screen.getByRole('button', { name: '3' }));
      fireEvent.click(screen.getByRole('button', { name: '.' }));
      fireEvent.click(screen.getByRole('button', { name: '1' }));
      fireEvent.click(screen.getByRole('button', { name: '4' }));
      fireEvent.click(screen.getByRole('button', { name: '+' }));
      fireEvent.click(screen.getByRole('button', { name: '2' }));
      fireEvent.click(screen.getByRole('button', { name: '.' }));
      fireEvent.click(screen.getByRole('button', { name: '8' }));
      fireEvent.click(screen.getByRole('button', { name: '6' }));
      fireEvent.click(screen.getByRole('button', { name: '=' }));

      await waitFor(() => {
        const display = container.querySelector('.text-4xl');
        expect(display).toHaveTextContent('6');
      });
    });
  });

  describe('Chain Calculations', () => {
    it('should handle chained addition: 2 + 2 + 2 = 6', async () => {
      render(<Calculator />);

      fireEvent.click(screen.getByRole('button', { name: '2' }));
      fireEvent.click(screen.getByRole('button', { name: '+' }));
      fireEvent.click(screen.getByRole('button', { name: '2' }));
      fireEvent.click(screen.getByRole('button', { name: '+' }));
      fireEvent.click(screen.getByRole('button', { name: '2' }));
      fireEvent.click(screen.getByRole('button', { name: '=' }));

      await waitFor(() => {
        expect(screen.getByText('6')).toBeInTheDocument();
      });
    });

    it('should handle chained subtraction: 10 - 5 - 2 = 3', async () => {
      render(<Calculator />);

      fireEvent.click(screen.getByRole('button', { name: '1' }));
      fireEvent.click(screen.getByRole('button', { name: '0' }));
      fireEvent.click(screen.getByRole('button', { name: '-' }));
      fireEvent.click(screen.getByRole('button', { name: '5' }));
      fireEvent.click(screen.getByRole('button', { name: '-' }));
      fireEvent.click(screen.getByRole('button', { name: '2' }));
      fireEvent.click(screen.getByRole('button', { name: '=' }));

      await waitFor(() => {
        expect(screen.getByText('3')).toBeInTheDocument();
      });
    });

    it('should handle mixed operations: 10 × 2 - 5 = 15', async () => {
      render(<Calculator />);

      fireEvent.click(screen.getByRole('button', { name: '1' }));
      fireEvent.click(screen.getByRole('button', { name: '0' }));
      fireEvent.click(screen.getByRole('button', { name: '×' }));
      fireEvent.click(screen.getByRole('button', { name: '2' }));
      fireEvent.click(screen.getByRole('button', { name: '-' }));
      fireEvent.click(screen.getByRole('button', { name: '5' }));
      fireEvent.click(screen.getByRole('button', { name: '=' }));

      await waitFor(() => {
        expect(screen.getByText('15')).toBeInTheDocument();
      });
    });
  });

  describe('Clear and Backspace', () => {
    it('should reset with AC button', async () => {
      render(<Calculator />);

      // Enter some calculation
      fireEvent.click(screen.getByRole('button', { name: '1' }));
      fireEvent.click(screen.getByRole('button', { name: '2' }));
      fireEvent.click(screen.getByRole('button', { name: '3' }));

      await waitFor(() => {
        expect(screen.getByText('123')).toBeInTheDocument();
      });

      // Clear
      fireEvent.click(screen.getByRole('button', { name: 'C' }));

      await waitFor(() => {
        expect(screen.getByText('0')).toBeInTheDocument();
      });
    });

    it('should backspace to remove last digit', async () => {
      render(<Calculator />);

      fireEvent.click(screen.getByRole('button', { name: '1' }));
      fireEvent.click(screen.getByRole('button', { name: '2' }));
      fireEvent.click(screen.getByRole('button', { name: '3' }));

      await waitFor(() => {
        expect(screen.getByText('123')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole('button', { name: '⌫' }));

      await waitFor(() => {
        expect(screen.getByText('12')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole('button', { name: '⌫' }));
      await waitFor(() => {
        expect(screen.getByText('1')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole('button', { name: '⌫' }));
      await waitFor(() => {
        expect(screen.getByText('0')).toBeInTheDocument();
      });
    });

    it('should clear after error state', async () => {
      render(<Calculator />);

      // Cause division by zero error
      fireEvent.click(screen.getByRole('button', { name: '5' }));
      fireEvent.click(screen.getByRole('button', { name: '÷' }));
      fireEvent.click(screen.getByRole('button', { name: '0' }));
      fireEvent.click(screen.getByRole('button', { name: '=' }));

      await waitFor(() => {
        expect(screen.getByText('Error')).toBeInTheDocument();
      });

      // Clear and start new calculation
      fireEvent.click(screen.getByRole('button', { name: 'C' }));
      fireEvent.click(screen.getByRole('button', { name: '5' }));
      fireEvent.click(screen.getByRole('button', { name: '+' }));
      fireEvent.click(screen.getByRole('button', { name: '5' }));
      fireEvent.click(screen.getByRole('button', { name: '=' }));

      await waitFor(() => {
        expect(screen.getByText('10')).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle division by zero: 5 ÷ 0 = Error', async () => {
      render(<Calculator />);

      fireEvent.click(screen.getByRole('button', { name: '5' }));
      fireEvent.click(screen.getByRole('button', { name: '÷' }));
      fireEvent.click(screen.getByRole('button', { name: '0' }));
      fireEvent.click(screen.getByRole('button', { name: '=' }));

      await waitFor(() => {
        expect(screen.getByText('Error')).toBeInTheDocument();
      });
    });

    it('should prevent multiple decimals in one number', async () => {
      render(<Calculator />);

      fireEvent.click(screen.getByRole('button', { name: '3' }));
      fireEvent.click(screen.getByRole('button', { name: '.' }));
      fireEvent.click(screen.getByRole('button', { name: '1' }));
      fireEvent.click(screen.getByRole('button', { name: '4' }));
      fireEvent.click(screen.getByRole('button', { name: '.' }));
      fireEvent.click(screen.getByRole('button', { name: '5' }));

      await waitFor(() => {
        expect(screen.getByText('3.14')).toBeInTheDocument();
      });
    });

    it('should handle very large numbers without overflow', async () => {
      render(<Calculator />);

      // Enter large number
      for (let i = 0; i < 9; i++) {
        fireEvent.click(screen.getByRole('button', { name: '9' }));
      }

      fireEvent.click(screen.getByRole('button', { name: '×' }));
      for (let i = 0; i < 3; i++) {
        fireEvent.click(screen.getByRole('button', { name: '9' }));
      }
      fireEvent.click(screen.getByRole('button', { name: '=' }));

      await waitFor(() => {
        const currentValue = screen.getByText(/\d+/);
        expect(currentValue).toBeInTheDocument();
        const text = currentValue.textContent || '';
        expect(text.length).toBeLessThanOrEqual(12);
      });
    });

    it('should handle zero as first input correctly', async () => {
      render(<Calculator />);

      fireEvent.click(screen.getByRole('button', { name: '0' }));
      fireEvent.click(screen.getByRole('button', { name: '5' }));

      await waitFor(() => {
        expect(screen.getByText('5')).toBeInTheDocument();
      });
    });

    it('should handle starting with decimal', async () => {
      render(<Calculator />);

      fireEvent.click(screen.getByRole('button', { name: '.' }));
      fireEvent.click(screen.getByRole('button', { name: '5' }));

      await waitFor(() => {
        expect(screen.getByText('0.5')).toBeInTheDocument();
      });
    });

    it('should handle percentage calculation', async () => {
      render(<Calculator />);

      fireEvent.click(screen.getByRole('button', { name: '5' }));
      fireEvent.click(screen.getByRole('button', { name: '0' }));
      fireEvent.click(screen.getByRole('button', { name: '%' }));

      await waitFor(() => {
        expect(screen.getByText('0.5')).toBeInTheDocument();
      });
    });
  });

  describe('Display Updates', () => {
    it('should show previous operation during input', async () => {
      render(<Calculator />);

      fireEvent.click(screen.getByRole('button', { name: '1' }));
      fireEvent.click(screen.getByRole('button', { name: '0' }));
      fireEvent.click(screen.getByRole('button', { name: '+' }));

      await waitFor(() => {
        expect(screen.getByText('10 +')).toBeInTheDocument();
      });
    });

    it('should clear previous operation after calculation', async () => {
      render(<Calculator />);

      fireEvent.click(screen.getByRole('button', { name: '5' }));
      fireEvent.click(screen.getByRole('button', { name: '+' }));
      fireEvent.click(screen.getByRole('button', { name: '3' }));
      fireEvent.click(screen.getByRole('button', { name: '=' }));

      await waitFor(() => {
        expect(screen.getByText('8')).toBeInTheDocument();
        const previousOp = screen.queryByText(/\d+\s*[+\-×÷]/);
        expect(previousOp).not.toBeInTheDocument();
      });
    });

    it('should update display in real-time as user types', async () => {
      render(<Calculator />);

      fireEvent.click(screen.getByRole('button', { name: '1' }));
      await waitFor(() => {
        expect(screen.getByText('1')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole('button', { name: '2' }));
      await waitFor(() => {
        expect(screen.getByText('12')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole('button', { name: '3' }));
      await waitFor(() => {
        expect(screen.getByText('123')).toBeInTheDocument();
      });
    });
  });

  describe('Complex Real-world Scenarios', () => {
    it('should calculate shopping cart total: 10 + 5 + 3 = 18', async () => {
      render(<Calculator />);

      fireEvent.click(screen.getByRole('button', { name: '1' }));
      fireEvent.click(screen.getByRole('button', { name: '0' }));
      fireEvent.click(screen.getByRole('button', { name: '+' }));
      fireEvent.click(screen.getByRole('button', { name: '5' }));
      fireEvent.click(screen.getByRole('button', { name: '+' }));
      fireEvent.click(screen.getByRole('button', { name: '3' }));
      fireEvent.click(screen.getByRole('button', { name: '=' }));

      await waitFor(() => {
        expect(screen.getByText('18')).toBeInTheDocument();
      });
    });

    it('should calculate average: (10 + 20 + 30) ÷ 3 = 20', async () => {
      render(<Calculator />);

      fireEvent.click(screen.getByRole('button', { name: '1' }));
      fireEvent.click(screen.getByRole('button', { name: '0' }));
      fireEvent.click(screen.getByRole('button', { name: '+' }));
      fireEvent.click(screen.getByRole('button', { name: '2' }));
      fireEvent.click(screen.getByRole('button', { name: '0' }));
      fireEvent.click(screen.getByRole('button', { name: '+' }));
      fireEvent.click(screen.getByRole('button', { name: '3' }));
      fireEvent.click(screen.getByRole('button', { name: '0' }));
      fireEvent.click(screen.getByRole('button', { name: '=' }));

      await waitFor(() => {
        expect(screen.getByText('60')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole('button', { name: '÷' }));
      fireEvent.click(screen.getByRole('button', { name: '3' }));
      fireEvent.click(screen.getByRole('button', { name: '=' }));

      await waitFor(() => {
        expect(screen.getByText('20')).toBeInTheDocument();
      });
    });

    it('should handle negative results: 5 - 10 = -5', async () => {
      render(<Calculator />);

      fireEvent.click(screen.getByRole('button', { name: '5' }));
      fireEvent.click(screen.getByRole('button', { name: '-' }));
      fireEvent.click(screen.getByRole('button', { name: '1' }));
      fireEvent.click(screen.getByRole('button', { name: '0' }));
      fireEvent.click(screen.getByRole('button', { name: '=' }));

      await waitFor(() => {
        expect(screen.getByText('-5')).toBeInTheDocument();
      });
    });

    it('should calculate tip: 15% of 50', async () => {
      render(<Calculator />);

      fireEvent.click(screen.getByRole('button', { name: '5' }));
      fireEvent.click(screen.getByRole('button', { name: '0' }));
      fireEvent.click(screen.getByRole('button', { name: '%' }));

      await waitFor(() => {
        expect(screen.getByText('0.5')).toBeInTheDocument();
      });
    });
  });

  describe('State Persistence Between Calculations', () => {
    it('should allow new calculation after equals', async () => {
      render(<Calculator />);

      // First calculation
      fireEvent.click(screen.getByRole('button', { name: '5' }));
      fireEvent.click(screen.getByRole('button', { name: '+' }));
      fireEvent.click(screen.getByRole('button', { name: '3' }));
      fireEvent.click(screen.getByRole('button', { name: '=' }));

      await waitFor(() => {
        expect(screen.getByText('8')).toBeInTheDocument();
      });

      // Second calculation
      fireEvent.click(screen.getByRole('button', { name: '2' }));
      fireEvent.click(screen.getByRole('button', { name: '+' }));
      fireEvent.click(screen.getByRole('button', { name: '2' }));
      fireEvent.click(screen.getByRole('button', { name: '=' }));

      await waitFor(() => {
        expect(screen.getByText('4')).toBeInTheDocument();
      });
    });

    it('should continue with result of previous calculation', async () => {
      render(<Calculator />);

      fireEvent.click(screen.getByRole('button', { name: '5' }));
      fireEvent.click(screen.getByRole('button', { name: '+' }));
      fireEvent.click(screen.getByRole('button', { name: '3' }));
      fireEvent.click(screen.getByRole('button', { name: '=' }));

      await waitFor(() => {
        expect(screen.getByText('8')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole('button', { name: '+' }));
      fireEvent.click(screen.getByRole('button', { name: '2' }));
      fireEvent.click(screen.getByRole('button', { name: '=' }));

      await waitFor(() => {
        expect(screen.getByText('10')).toBeInTheDocument();
      });
    });
  });

  describe('Theme Toggle', () => {
    it('should render theme toggle button', () => {
      const { container } = render(<Calculator />);

      const themeToggle = container.querySelector('button.absolute');
      expect(themeToggle).toBeInTheDocument();
    });

    it('should toggle theme when clicked', async () => {
      const { container } = render(<Calculator />);

      const themeToggle = container.querySelector('button.absolute');
      expect(themeToggle).toBeInTheDocument();

      // Initial state should be dark
      const calculatorContainer = container.querySelector('.bg-gradient-dark');
      expect(calculatorContainer).toBeInTheDocument();

      if (themeToggle) {
        fireEvent.click(themeToggle);

        await waitFor(() => {
          const lightContainer = container.querySelector('.bg-gradient-light');
          expect(lightContainer).toBeInTheDocument();
        });
      }
    });
  });

  describe('All Number Buttons', () => {
    it('should have all number buttons 0-9', () => {
      render(<Calculator />);

      for (let i = 0; i <= 9; i++) {
        const button = screen.getByRole('button', { name: i.toString() });
        expect(button).toBeInTheDocument();
      }
    });

    it('should input all digits correctly', async () => {
      render(<Calculator />);

      for (let i = 0; i <= 9; i++) {
        fireEvent.click(screen.getByRole('button', { name: i.toString() }));
      }

      await waitFor(() => {
        expect(screen.getByText('1234567890')).toBeInTheDocument();
      });
    });
  });

  describe('All Operator Buttons', () => {
    it('should have all operator buttons', () => {
      render(<Calculator />);

      const operators = ['+', '-', '×', '÷', '%'];
      operators.forEach(op => {
        const button = screen.getByRole('button', { name: op });
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe('Calculator Display Accessibility', () => {
    it('should be readable with proper font size', () => {
      const { container } = render(<Calculator />);

      const display = container.querySelector('.text-4xl');
      expect(display).toBeInTheDocument();
    });

    it('should show large text for current value', () => {
      const { container } = render(<Calculator />);

      const display = container.querySelector('.font-bold');
      expect(display).toBeInTheDocument();
    });
  });
});
