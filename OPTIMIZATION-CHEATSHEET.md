# Glassmorphism UI Performance Cheatsheet
*Quick reference for optimizing glassmorphism interfaces*

---

## 🎯 **TOP 5 OPTIMIZATIONS** (Do these first!)

### 1. **Reduce Blur Radius** ⭐ *Most Important*
```css
/* ❌ BAD - Too expensive */
blur-[80px], blur-[100px]

/* ✅ GOOD - Balanced */
blur-[40px], blur-[50px], blur-[60px]
```

**Impact**: ~40% CPU reduction per 20px reduction

---

### 2. **Add GPU Acceleration**
```tsx
// In className
'will-change-transform'

// In style prop
style={{
  transform: 'translateZ(0)',
  WebkitTransform: 'translateZ(0)'
}}
```

**Impact**: ~25% smoother animations

---

### 3. **Memoize Repeated Components**
```tsx
import { memo } from 'react';

export const MyComponent = memo(({ prop1, prop2 }) => {
  return <div>{prop1}</div>;
});

MyComponent.displayName = 'MyComponent';
```

**Impact**: ~60% fewer re-renders

---

### 4. **Memoize Callbacks**
```tsx
import { useCallback } from 'react';

const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);
```

**Impact**: ~70% fewer cascading re-renders

---

### 5. **Add CSS Containment**
```css
/* For isolated components */
.component {
  contain: layout style paint;
}
```

**Impact**: ~15-20% faster paints

---

## 🚨 **PERFORMANCE KILLERS** (Avoid these!)

### ❌ **Don't Do This**
```tsx
// Blur radius > 60px
className="blur-[80px]"

// Animating blur
animate={{ filter: 'blur(10px)' }}

// No memoization on repeated components
export const Button = ({ onClick }) => <button onClick={onClick} />

// Creating new objects on every render
<div style={{ transform: 'rotate(45deg)' }}>

// No GPU hints
<div className="animate-bounce">
```

### ✅ **Do This Instead**
```tsx
// Blur radius <= 60px
className="blur-[60px]"

// Animate transform/opacity instead
animate={{ scale: 1.2, opacity: 0.8 }}

// Memoize repeated components
export const Button = memo(({ onClick }) => <button onClick={onClick} />);

// Use useMemo for objects
const style = useMemo(() => ({
  transform: 'rotate(45deg)'
}), []);

// Add GPU hints
<div className="animate-bounce will-change-transform"
     style={{ transform: 'translateZ(0)' }}>
```

---

## 🔧 **OPTIMIZATION PATTERNS**

### **Pattern 1: Animated Background Orbs**
```tsx
<motion.div
  className="blur-[60px] will-change-transform"
  style={{
    transform: 'translate3d(0, 0, 0)',
    WebkitTransform: 'translate3d(0, 0, 0)'
  }}
  animate={{
    scale: [1, 1.15, 1],
    x: [0, 40, 0],
    y: [0, 25, 0],
  }}
  transition={{
    duration: 10,  // Slower = better performance
    repeat: Infinity,
    ease: "easeInOut"
  }}
/>
```

**Key Points**:
- Blur ≤ 60px
- Add `will-change-transform`
- Force GPU layer with `translate3d()`
- Slow animations (8-10s)
- Reduce movement range

---

### **Pattern 2: Memoized Button Component**
```tsx
import { memo, useMemo } from 'react';

const styleCache = new Map<string, string>();

export const Button = memo(({ type, onClick, value }) => {
  const style = useMemo(() => {
    if (styleCache.has(type)) return styleCache.get(type)!;
    const computed = computeStyle(type);
    styleCache.set(type, computed);
    return computed;
  }, [type]);

  const handleClick = useMemo(() => () => onClick(value), [onClick, value]);

  return <button onClick={handleClick} className={style}>{value}</button>;
});

Button.displayName = 'Button';
```

**Key Points**:
- Always memoize repeated components
- Cache expensive computations
- Memoize event handlers
- Add displayName

---

### **Pattern 3: Memoized Child Props**
```tsx
export const Parent = () => {
  const [state, setState] = useState();

  const handleClick = useCallback(() => {
    // ... logic
  }, [/* deps */]);

  const childProps = useMemo(() => ({
    value: state.value,
    onChange: handleClick
  }), [state.value, handleClick]);

  return <Child {...childProps} />;
};
```

**Key Points**:
- Memoize callbacks
- Memoize prop objects
- Only include actual dependencies

---

### **Pattern 4: CSS Containment**
```css
/* Global CSS */
* {
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

/* Component level */
.glass-component {
  contain: layout style paint;
  will-change: transform;
}
```

**Or JSX**:
```tsx
<div className="will-change-transform contain:layout-style-paint"
     style={{ transform: 'translateZ(0)' }}>
  {/* Content */}
</div>
```

**Key Points**:
- Use for isolated components
- Add `will-change` for animated elements
- Force GPU layer

---

### **Pattern 5: Optimized Animations**
```tsx
// Define variants once
const variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      delay: i * 0.02,  // Reduced for speed
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  })
};

// Use everywhere
<motion.div
  custom={index}
  variants={variants}
  initial="hidden"
  animate="visible"
/>
```

**Key Points**:
- Define at module level
- Use `custom` for per-item behavior
- Reduce delay for speed
- Use spring animations

---

## 📊 **PERFORMANCE METRICS**

### **Good Performance**
- ✅ **FPS**: 55-60 (consistent)
- ✅ **Long tasks**: <50ms
- ✅ **Paint time**: <16ms
- ✅ **Script time**: <16ms

### **Needs Optimization**
- ⚠️ **FPS**: 30-54 (inconsistent)
- ⚠️ **Long tasks**: 50-100ms
- ⚠️ **Paint time**: 16-30ms
- ⚠️ **Script time**: 16-30ms

### **Critical Issues**
- ❌ **FPS**: <30 (frequent drops)
- ❌ **Long tasks**: >100ms
- ❌ **Paint time**: >30ms
- ❌ **Script time**: >30ms

---

## 🧪 **TESTING CHECKLIST**

### **Manual Tests**
- [ ] Rapid clicking - no lag
- [ ] Keyboard input - smooth
- [ ] Animations - fluid
- [ ] No frame drops
- [ ] Consistent 60fps

### **DevTools Check**
1. Open Chrome DevTools → Performance
2. Start recording
3. Interact with UI
4. Stop recording
5. Check:
   - FPS 55-60?
   - No long tasks?
   - Minimal layout thrashing?

---

## 🎯 **OPTIMIZATION PRIORITY**

### **Do First (High Impact, Low Effort)**
1. Reduce blur radius to ≤60px
2. Add GPU acceleration hints
3. Add CSS containment
4. Slow animation speeds

### **Do Second (High Impact, Medium Effort)**
1. Add React.memo to repeated components
2. Memoize callbacks with useCallback
3. Memoize props with useMemo

### **Do Last (Lower Impact, Higher Effort)**
1. Implement Web Workers
2. Use OffscreenCanvas
3. Code splitting
4. Lazy loading

---

## 📚 **KEY TAKEAWAYS**

1. **Blur is expensive** - Use ≤60px
2. **GPU hints help** - Add for animations
3. **Memoization matters** - Use strategically
4. **CSS containment** - Isolate repaints
5. **Test with DevTools** - Verify 60fps

---

**Quick Reference Complete!** 🚀

*Use this cheatsheet when building any glassmorphism UI to ensure smooth 60fps performance.*
