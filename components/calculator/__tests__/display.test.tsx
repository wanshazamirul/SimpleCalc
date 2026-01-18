import React from 'react';
import { render, screen } from '@testing-library/react';
import { CalculatorDisplay } from '../display';

describe('CalculatorDisplay', () => {
  describe('Rendering', () => {
    it('should render current value', () => {
      render(<CalculatorDisplay currentValue="123" previousValue="" operation={null} />);

      const currentValue = screen.getByText('123');
      expect(currentValue).toBeInTheDocument();
    });

    it('should render zero as initial value', () => {
      render(<CalculatorDisplay currentValue="0" previousValue="" operation={null} />);

      const currentValue = screen.getByText('0');
      expect(currentValue).toBeInTheDocument();
    });

    it('should render decimal values', () => {
      render(<CalculatorDisplay currentValue="3.14" previousValue="" operation={null} />);

      const currentValue = screen.getByText('3.14');
      expect(currentValue).toBeInTheDocument();
    });

    it('should render negative values', () => {
      render(<CalculatorDisplay currentValue="-42" previousValue="" operation={null} />);

      const currentValue = screen.getByText('-42');
      expect(currentValue).toBeInTheDocument();
    });

    it('should render error state', () => {
      render(<CalculatorDisplay currentValue="Error" previousValue="" operation={null} />);

      const currentValue = screen.getByText('Error');
      expect(currentValue).toBeInTheDocument();
    });

    it('should render very long numbers', () => {
      const longNumber = '123456789012';
      render(<CalculatorDisplay currentValue={longNumber} previousValue="" operation={null} />);

      const currentValue = screen.getByText(longNumber);
      expect(currentValue).toBeInTheDocument();
    });
  });

  describe('Previous Value Display', () => {
    it('should not show previous value when empty', () => {
      const { container } = render(
        <CalculatorDisplay currentValue="0" previousValue="" operation={null} />
      );

      const previousValue = container.querySelector('.opacity-60');
      expect(previousValue).not.toBeInTheDocument();
    });

    it('should show previous value when present', () => {
      render(<CalculatorDisplay currentValue="5" previousValue="10" operation="+" />);

      const previousValue = screen.getByText('10 +');
      expect(previousValue).toBeInTheDocument();
    });

    it('should display operation with previous value', () => {
      render(<CalculatorDisplay currentValue="5" previousValue="10" operation="×" />);

      const previousValue = screen.getByText('10 ×');
      expect(previousValue).toBeInTheDocument();
    });

    it('should show all operations', () => {
      const operations = ['+', '-', '×', '÷'];

      operations.forEach(op => {
        const { unmount } = render(
          <CalculatorDisplay currentValue="5" previousValue="10" operation={op} />
        );

        const previousValue = screen.getByText(`10 ${op}`);
        expect(previousValue).toBeInTheDocument();

        unmount();
      });
    });
  });

  describe('Styling and Layout', () => {
    it('should apply glassmorphism styles', () => {
      const { container } = render(
        <CalculatorDisplay currentValue="123" previousValue="" operation={null} />
      );

      const display = container.querySelector('.glass-display');
      expect(display).toBeInTheDocument();
      expect(display).toHaveClass('backdrop-blur-xl');
      expect(display).toHaveClass('rounded-3xl');
    });

    it('should align text to the right', () => {
      const { container } = render(
        <CalculatorDisplay currentValue="123" previousValue="" operation={null} />
      );

      const textContainer = container.querySelector('.text-right');
      expect(textContainer).toBeInTheDocument();
    });

    it('should apply bold font to current value', () => {
      const { container } = render(
        <CalculatorDisplay currentValue="123" previousValue="" operation={null} />
      );

      const currentValue = container.querySelector('.font-bold');
      expect(currentValue).toBeInTheDocument();
    });

    it('should have responsive text size', () => {
      const { container } = render(
        <CalculatorDisplay currentValue="123" previousValue="" operation={null} />
      );

      const currentValue = container.querySelector('.text-4xl');
      expect(currentValue).toBeInTheDocument();
      expect(currentValue).toHaveClass('md:text-6xl');
    });
  });

  describe('Different Scenarios', () => {
    it('should display initial calculation state', () => {
      const { container } = render(<CalculatorDisplay currentValue="0" previousValue="" operation={null} />);

      const currentValue = screen.getByText('0');
      expect(currentValue).toBeInTheDocument();

      // Check that previous value is not shown (no text like "10 +" exists)
      const previousValue = screen.queryByText(/10\s*[+\-×÷]/);
      expect(previousValue).not.toBeInTheDocument();
    });

    it('should display during operation input', () => {
      const { container } = render(<CalculatorDisplay currentValue="" previousValue="10" operation="+" />);

      const previousValue = screen.getByText('10 +');
      expect(previousValue).toBeInTheDocument();

      const currentValue = container.querySelector('.text-4xl');
      expect(currentValue).toHaveTextContent('');
    });

    it('should display after calculation', () => {
      render(<CalculatorDisplay currentValue="15" previousValue="" operation={null} />);

      const currentValue = screen.getByText('15');
      expect(currentValue).toBeInTheDocument();

      const previousValue = screen.queryByText(/\d+\s*[+\-×÷]/);
      expect(previousValue).not.toBeInTheDocument();
    });

    it('should display error state clearly', () => {
      render(<CalculatorDisplay currentValue="Error" previousValue="10" operation="÷" />);

      const currentValue = screen.getByText('Error');
      expect(currentValue).toBeInTheDocument();
      expect(currentValue).toHaveClass('text-4xl');
    });

    it('should display percentage calculation', () => {
      render(<CalculatorDisplay currentValue="0.5" previousValue="50" operation="%" />);

      const currentValue = screen.getByText('0.5');
      expect(currentValue).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty current value with previous value', () => {
      render(<CalculatorDisplay currentValue="" previousValue="10" operation="+" />);

      const previousValue = screen.getByText('10 +');
      expect(previousValue).toBeInTheDocument();
    });

    it('should handle very long previous value', () => {
      const longValue = '123456789012';
      render(<CalculatorDisplay currentValue="5" previousValue={longValue} operation="+" />);

      const previousValue = screen.getByText(`${longValue} +`);
      expect(previousValue).toBeInTheDocument();
    });

    it('should handle negative previous value', () => {
      render(<CalculatorDisplay currentValue="5" previousValue="-10" operation="+" />);

      const previousValue = screen.getByText('-10 +');
      expect(previousValue).toBeInTheDocument();
    });

    it('should handle decimal previous value', () => {
      render(<CalculatorDisplay currentValue="5" previousValue="3.14" operation="+" />);

      const previousValue = screen.getByText('3.14 +');
      expect(previousValue).toBeInTheDocument();
    });
  });

  describe('Visual Feedback', () => {
    it('should show background gradient', () => {
      const { container } = render(
        <CalculatorDisplay currentValue="123" previousValue="" operation={null} />
      );

      const gradient = container.querySelector('.bg-gradient-to-br');
      expect(gradient).toBeInTheDocument();
    });

    it('should have proper spacing', () => {
      const { container } = render(
        <CalculatorDisplay currentValue="123" previousValue="" operation={null} />
      );

      const display = container.querySelector('.glass-display');
      expect(display).toHaveClass('p-6');
      expect(display).toHaveClass('md:p-8');
    });

    it('should have shadow effect', () => {
      const { container } = render(
        <CalculatorDisplay currentValue="123" previousValue="" operation={null} />
      );

      const display = container.querySelector('.glass-display');
      expect(display).toHaveClass('shadow-2xl');
    });
  });
});
