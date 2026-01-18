# Glassmorphism Calculator

A stunning calculator with glassmorphism effects, Framer Motion animations, and shadcn/ui styling.

## Features

- 🎨 **Glassmorphism Design** - Frosted glass effect with backdrop blur
- ✨ **Framer Motion Animations** - Smooth button press, hover, and result display animations
- 🌈 **Dual Theme Support** - Dark neon theme and light frosty theme
- ⌨️ **Keyboard Support** - Full keyboard input support
- 📱 **Responsive Design** - Mobile, tablet, and desktop optimized
- 🎯 **Complete Calculator** - All basic operations (+, -, ×, ÷, %, clear, backspace)

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

## Keyboard Shortcuts

- **Numbers** `0-9` - Input numbers
- **Operators** `+`, `-`, `*`, `/` - Perform operations
- **Equals** `Enter` or `=` - Calculate result
- **Clear** `Escape` or `C` - Clear calculator
- **Backspace** `Backspace` - Delete last digit
- **Decimal** `.` - Add decimal point
- **Percentage** `%` - Calculate percentage

## Design Features

### Dark Neon Theme
- Navy Blue (#0a0e27) to Deep Purple (#1a103c) gradient
- Electric Blue (#00d4ff) and Neon Purple (#b829dd) accents
- White text with shadows for readability

### Light Frosty Theme
- Silver (#e8e8e8) to Light Gray (#f5f5f5) gradient
- Royal Blue (#4a90e2) and Soft Purple (#9b59b6) accents
- Dark Gray (#2c3e50) text

### Glassmorphism Effect
- Backdrop blur: 12px for calculator, 80px for background orbs
- Semi-transparent backgrounds with borders
- Animated background orbs for depth
- Smooth transitions between themes

## Component Structure

```
components/
├── calculator/
│   ├── calculator.tsx       # Main calculator component
│   ├── display.tsx          # Result display component
│   ├── button-grid.tsx      # Button grid layout
│   └── calc-button.tsx      # Individual button with Framer Motion
lib/
├── calculator-logic.ts       # Calculator state management
└── utils.ts                 # Utility functions
types/
└── calculator.ts            # TypeScript interfaces
```

## Credits

Built with ❤️ using modern web technologies.

Inspired by [CoreScript Studio's Glassmorphism Calculator](https://github.com/CorescriptStudio/Glassmorphism-Calculator).
