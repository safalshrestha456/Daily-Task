# Day 17 Study Notes: `useEffect`, `useContext`, Custom Hooks & API Patterns

## 1. Deep Dive into `useEffect`

### What is a Side Effect?
In React, a component's primary job is to be a pure function that calculates UI output from props and state. Anything that affects the outside world or interacts with non-React systems is a **side effect**:
- Fetching data from a network API
- Reading or writing to `localStorage` or `sessionStorage`
- Adding event listeners to `window` or `document`
- Setting timers (`setTimeout`, `setInterval`)
- Manually mutating the DOM

### The Dependency Array Rules

```jsx
// 1. No dependency array: Runs after EVERY single render
useEffect(() => {
  console.log("Mounted or updated");
});

// 2. Empty dependency array []: Runs ONCE on mount and cleanup runs ONCE on unmount
useEffect(() => {
  console.log("Component mounted");
  return () => console.log("Component will unmount");
}, []);

// 3. Dependency array with values [userId, filter]: Runs on mount and whenever userId or filter changes
useEffect(() => {
  fetchUserData(userId);
}, [userId]);
```

### The Cleanup Function
When an effect returns a function, React runs this cleanup function:
1. Before running the effect again with new dependencies.
2. When the component unmounts from the DOM.

```jsx
useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);

  // Cleanup: prevents memory leaks when component unmounts
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

### Handling Race Conditions with `AbortController`
If a user rapidly changes pages or filters, an earlier HTTP request might finish *after* a later request, overwriting state with stale data. We solve this by canceling in-flight requests:

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/items?cat=${category}`, { signal: controller.signal })
    .then(res => res.json())
    .then(data => setItems(data))
    .catch(err => {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    });

  return () => controller.abort(); // Cancel request if category changes or unmounts
}, [category]);
```

---

## 2. Custom Hooks Architecture

### What is a Custom Hook?
A custom hook is a JavaScript function whose name starts with `use` and that can call other React hooks (`useState`, `useEffect`, `useContext`, `useRef`, etc.).

### Key Rules of Hooks
1. **Only Call Hooks at the Top Level:** Never call hooks inside loops, conditions, or nested functions.
2. **Only Call Hooks from React Functions:** Call them from React functional components or other custom hooks.

### State Isolation
Every time a component calls a custom hook, that component gets its own **independent instance of state**. Two components calling `useFetch` do not share state unless wrapped in a shared Context.

### Example: Custom `useDebounce` Hook
```jsx
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
```

---

## 3. `useContext` & Global State

### The Problem: Prop Drilling
When a piece of state is needed by deeply nested child components, passing it down through 5 or 6 layers of intermediate components that don't need it creates brittle, hard-to-maintain code.

### The Solution: React Context API
Context provides a way to pass data through the component tree without passing props down manually at every level.

#### The 3 Core Steps:
1. **Create the Context:**
   ```jsx
   const ThemeContext = createContext();
   ```
2. **Provide the Context:**
   ```jsx
   <ThemeContext.Provider value={{ theme, toggleTheme }}>
     <App />
   </ThemeContext.Provider>
   ```
3. **Consume the Context via `useContext`:**
   ```jsx
   const { theme, toggleTheme } = useContext(ThemeContext);
   ```

### Best Practice: The Custom Hook Consumer Pattern
Always export a custom hook that wraps `useContext` and provides helpful error checking if used outside its Provider:

```jsx
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

---

## 4. Asynchronous API States in Modern React

A production-grade component must always account for four primary states:

| State | User Experience | Code Pattern |
| :--- | :--- | :--- |
| **Idle / Initial** | Clean placeholder or initial skeleton | `data === null && !loading` |
| **Loading** | Accessible spinner or skeleton loader | `loading === true` |
| **Error / Fallback** | Descriptive warning banner with retry option | `error !== null` |
| **Success** | Populated data grid or empty state if `data.length === 0` | `data !== null && !loading` |

---

## 5. Summary Checklist
- [x] Use `useEffect` only for actual side effects, not for calculating derived state.
- [x] Always clean up listeners, timers, and fetch signals in `useEffect`.
- [x] Extract repeated hook logic into custom hooks (`use*`).
- [x] Use `useContext` for app-wide cross-cutting concerns (Theme, Auth, Language).
- [x] Guard against race conditions and state updates on unmounted components.
