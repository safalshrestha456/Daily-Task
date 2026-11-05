# Day 13: useState Hook, Event Handling & Conditional Rendering Reference

## 1. The `useState` Hook

`useState` is a React Hook that allows functional components to store state between renders.

```jsx
import { useState } from 'react';

const [count, setCount] = useState(initialValue);
```

### Direct vs Functional Updates
```jsx
// Direct update (fine if not depending on previous state):
setQuantity(5);

// Functional update (ALWAYS prefer when new state depends on prior state):
setQuantity(prev => prev + 1);
```

---

## 2. Event Handling in React

- React wraps native events in a cross-browser wrapper called **SyntheticEvent**.
- Event attributes are camelCase (`onClick`, `onChange`, `onSubmit`).
- Pass the **function reference**, do NOT call it immediately:

```jsx
// ❌ WRONG (Calls function immediately during render)
<button onClick={handleIncrement()}>Click</button>

// ✅ CORRECT (Passes reference)
<button onClick={handleIncrement}>Click</button>

// ✅ CORRECT (With arguments)
<button onClick={() => handleDelete(item.id)}>Delete</button>
```

---

## 3. Conditional Rendering Patterns in React

### Pattern A: Logical AND (`&&`)
Used when you want to render an element OR nothing:
```jsx
{remainingStock <= 2 && (
  <p className="warning">Hurry! Only a few items left.</p>
)}
```

### Pattern B: Ternary Operator (`condition ? A : B`)
Used when switching between two UI alternatives:
```jsx
{isAdded ? (
  <button className="success">✓ Added</button>
) : (
  <button className="primary">Add to Cart</button>
)}
```

### Pattern C: Disabled Attribute Condition
```jsx
<button 
  disabled={quantity <= 1} 
  className={quantity <= 1 ? "disabled" : ""}
>
  -
</button>
```
