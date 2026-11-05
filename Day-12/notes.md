# Day 12: React Functional Components & Props Reference

## 1. What are Functional Components?
In modern React, components are pure JavaScript functions that accept `props` and return JSX.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
```

### Why Functional Components Over Class Components?
- **No `this` binding headaches:** Avoids scoping issues.
- **Hooks Integration:** Can use `useState`, `useEffect`, and custom hooks.
- **Less Boilerplate:** Significantly smaller bundle size and cleaner readability.

---

## 2. All About Props (Properties)

### A. Unidirectional Data Flow (Top-Down)
Data always flows in one direction: from Parent down to Child via props.
```
[ Parent Component (App) ]
         │
         ├── passes name, role, skills ──► [ Child (TeamCard) ]
         │
         └── passes onSelectDepartment ──► [ Child (DepartmentFilter) ]
```

### B. Props are Read-Only (Immutable)
A component must **never** modify its own props:
```jsx
// ❌ WRONG (Mutating props throws error or causes bugs)
props.name = "New Name";

// ✅ CORRECT (Treat props as pure inputs)
const displayName = props.name.trim();
```

### C. Props Destructuring & Default Values
```jsx
function TeamCard({ 
  name = "Anonymous", 
  role = "Developer", 
  skills = [] 
}) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
}
```

### D. Passing Functions (Callbacks) as Props
Children communicate with parents by invoking callback functions passed as props:
```jsx
// Parent:
<DepartmentFilter onSelect={(dept) => setSelected(dept)} />

// Child:
function DepartmentFilter({ onSelect }) {
  return <button onClick={() => onSelect("Engineering")}>Engineering</button>;
}
```
