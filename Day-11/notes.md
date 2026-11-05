# Day 11: React with Vite & JSX Concepts Cheatsheet

## 1. What is React?
React is a declarative, component-based JavaScript library for building user interfaces developed and maintained by Meta (Facebook).

### Key Architectural Pillars:
- **Declarative:** You describe *what* the UI should look like for a given state; React handles DOM updating.
- **Component-Driven:** UIs are composed of small, isolated, reusable functions called components.
- **Virtual DOM:** A lightweight in-memory representation of the real DOM. When data changes:
  1. React creates a new Virtual DOM tree.
  2. Compares it with the previous tree using a diffing algorithm (*Reconciliation*).
  3. Batches and applies only the necessary changes to the real browser DOM.

---

## 2. Why Vite instead of Create React App (CRA)?

| Feature | Create React App (Webpack) | Vite (Rollup + esbuild) |
|---|---|---|
| **Dev Server Start** | Bundles entire app before serving (slow, 30s+) | Native ESM (serves files on demand instantly) |
| **Hot Module Replacement (HMR)** | Slows down as project grows | Sub-millisecond HMR independent of app size |
| **Build Engine** | Node-based Webpack | Go-based esbuild (10-100x faster) |
| **Status** | Deprecated / Archived | Modern Industry Standard |

---

## 3. JSX (JavaScript XML) Syntax Rules

JSX is a syntax extension that looks like HTML but possesses the full power of JavaScript.

### Rule 1: Always Return a Single Root Element
```jsx
// ❌ WRONG
return (
  <h1>Title</h1>
  <p>Paragraph</p>
);

// ✅ CORRECT (Using a Fragment <>)
return (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
);
```

### Rule 2: Attribute Differences from HTML
- `class` becomes `className` (because `class` is a reserved word in JS).
- `for` becomes `htmlFor` in form labels.
- Event handlers are camelCase: `onClick`, `onChange`, `onSubmit`.

### Rule 3: Embedding JavaScript Expressions with `{}`
```jsx
const user = "Safal";
<h1>Welcome, {user.toUpperCase()}!</h1>
```

### Rule 4: Self-Closing Tags
In JSX, all tags without children must be explicitly self-closed:
```jsx
<img src="logo.png" alt="Logo" />
<input type="text" />
<br />
```
