import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CalculatorButton } from '../calc-button';
import { ButtonType } from '@/types/calculator';

describe('CalculatorButton', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  describe('Rendering', () => {
    it('should render number button correctly', () => {
      render(<CalculatorButton value="5" type="number" onClick={mockOnClick} />);

      const button = screen.getByRole('button', { name: '5' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('5');
    });

    it('should render operator button correctly', () => {
      render(<CalculatorButton value="+" type="operator" onClick={mockOnClick} />);

      const button = screen.getByRole('button', { name: '+' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('+');
    });

    it('should render equals button correctly', () => {
      render(<CalculatorButton value="=" type="equals" onClick={mockOnClick} />);

      const button = screen.getByRole('button', { name: '=' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('=');
    });

    it('should render clear button correctly', () => {
      render(<CalculatorButton value="C" type="clear" onClick={mockOnClick} />);

      const button = screen.getByRole('button', { name: 'C' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('C');
    });

    it('should render backspace button correctly', () => {
      render(<CalculatorButton value="⌫" type="backspace" onClick={mockOnClick} />);

      const button = screen.getByRole('button', { name: '⌫' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('⌫');
    });

    it('should render decimal button correctly', () => {
      render(<CalculatorButton value="." type="decimal" onClick={mockOnClick} />);

      const button = screen.getByRole('button', { name: '.' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('.');
    });

    it('should apply custom className', () => {
      render(
        <CalculatorButton
          value="5"
          type="number"
          onClick={mockOnClick}
          className="custom-class"
        />
      );

      const button = screen.getByRole('button', { name: '5' });
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Button Styles', () => {
    it('should apply glassmorphism styles', () => {
      render(<CalculatorButton value="5" type="number" onClick={mockOnClick} />);

      const button = screen.getByRole('button', { name: '5' });
      expect(button).toHaveClass('glass-button');
      expect(button).toHaveClass('backdrop-blur-md');
      expect(button).toHaveClass('rounded-2xl');
    });

    it('should apply operator-specific styles', () => {
      render(<CalculatorButton value="+" type="operator" onClick={mockOnClick} />);

      const button = screen.getByRole('button', { name: '+' });
      expect(button).toHaveClass('font-semibold');
    });

    it('should apply equals-specific styles', () => {
      render(<CalculatorButton value="=" type="equals" onClick={mockOnClick} />);

      const button = screen.getByRole('button', { name: '=' });
      expect(button).toHaveClass('font-bold');
      expect(button).toHaveClass('bg-gradient-to-br');
    });

    it('should apply clear/backspace-specific styles', () => {
      render(<CalculatorButton value="C" type="clear" onClick={mockOnClick} />);

      const button = screen.getByRole('button', { name: 'C' });
      expect(button).toHaveClass('font-semibold');
    });
  });

  describe('Click Handling', () => {
    it('should call onClick with correct value when clicked', () => {
      render(<CalculatorButton value="5" type="number" onClick={mockOnClick} />);

      const button = screen.getByRole('button', { name: '5' });
      fireEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledWith('5');
    });

    it('should call onClick with operator value', () => {
      render(<CalculatorButton value="+" type="operator" onClick={mockOnClick} />);

      const button = screen.getByRole('button', { name: '+' });
      fireEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledWith('+');
    });

    it('should call onClick with equals value', () => {
      render(<CalculatorButton value="=" type="equals" onClick={mockOnClick} />);

      const button = screen.getByRole('button', { name: '=' });
      fireEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledWith('=');
    });

    it('should call onClick with clear value', () => {
      render(<CalculatorButton value="C" type="clear" onClick={mockOnClick} />);

      const button = screen.getByRole('button', { name: 'C' });
      fireEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledWith('C');
    });

    it('should call onClick with backspace value', () => {
      render(<CalculatorButton value="⌫" type="backspace" onClick={mockOnClick} />);

      const button = screen.getByRole('button', { name: '⌫' });
      fireEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledWith('⌫');
    });

    it('should call onClick with decimal value', () => {
      render(<CalculatorButton value="." type="decimal" onClick={mockOnClick} />);

      const button = screen.getByRole('button', { name: '.' });
      fireEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledWith('.');
    });

    it('should handle multiple clicks', () => {
      render(<CalculatorButton value="5" type="number" onClick={mockOnClick} />);

      const button = screen.getByRole('button', { name: '5' });

      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(3);
      expect(mockOnClick).toHaveBeenNthCalledWith(1, '5');
      expect(mockOnClick).toHaveBeenNthCalledWith(2, '5');
      expect(mockOnClick).toHaveBeenNthCalledWith(3, '5');
    });
  });

  describe('Accessibility', () => {
    it('should be accessible via button role', () => {
      render(<CalculatorButton value="5" type="number" onClick={mockOnClick} />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should be accessible by its value', () => {
      render(<CalculatorButton value="×" type="operator" onClick={mockOnClick} />);

      const button = screen.getByRole('button', { name: '×' });
      expect(button).toBeInTheDocument();
    });

    it('should have accessible name for special characters', () => {
      render(<CalculatorButton value="÷" type="operator" onClick={mockOnClick} />);

      const button = screen.getByRole('button', { name: '÷' });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Button Types', () => {
    const buttonTypes: ButtonType[] = ['number', 'operator', 'equals', 'clear', 'backspace', 'decimal'];

    buttonTypes.forEach(type => {
      it(`should render ${type} button type`, () => {
        const value = type === 'number' ? '5' :
                      type === 'operator' ? '+' :
                      type === 'equals' ? '=' :
                      type === 'clear' ? 'C' :
                      type === 'backspace' ? '⌫' : '.';

        render(<CalculatorButton value={value} type={type} onClick={mockOnClick} />);

        const button = screen.getByRole('button', { name: value });
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(value);
      });
    });
  });
});
