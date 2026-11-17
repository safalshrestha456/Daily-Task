# Day 18 Study Notes: React Context API, Auth State & State Management Basics

## 1. What is Prop Drilling?

### The Problem
In standard React data flow, data moves top-down via props. When a deeply nested component needs a value or callback located high up in the tree, every intermediate component must forward that prop:

```
[App (owns auth state)]
   ↓ (passes user, token, logout)
 [Header]
   ↓ (passes user, token, logout)
 [Navbar]
   ↓ (passes user, token, logout)
 [UserProfileDropdown]
   ↓ (passes logout)
 [LogoutButton]
```

### Why Prop Drilling Causes Problems:
1. **High Coupling:** Intermediary components are forced to know about props they do not consume.
2. **Refactoring Nightmares:** Renaming or adding a prop requires changing multiple files along the chain.
3. **Boilerplate Noise:** Clutters component signatures and JSX templates.

---

## 2. React Context API Architecture

Context provides a way to share values like user authentication, themes, or language preferences directly across the component tree:

```
[App (AuthProvider)]
   │
   ├────── (teleports auth state directly) ──────┐
   ↓                                             ↓
[UserProfileDropdown]                      [LogoutButton]
```

### The 3 Core Pillars:

#### 1. Create Context
```jsx
import { createContext } from 'react';
const AuthContext = createContext(null);
```

#### 2. Provide Context
```jsx
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

#### 3. Custom Consumer Hook
Wrapping `useContext` in a custom hook provides safety and cleaner import syntax:

```jsx
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be consumed within an AuthProvider');
  }
  return context;
}
```

---

## 3. Role-Based Access Control (RBAC) in React

### Concept
Rather than simply checking whether a user is logged in, enterprise applications enforce **roles** (`ADMIN`, `DEVELOPER`, `EDITOR`) and **granular permissions** (`deployments:trigger`, `users:delete`).

### Implementation Pattern:
```jsx
// Inside AuthContext:
const hasPermission = (requiredPermission) => {
  if (!user) return false;
  if (user.role === 'ADMIN') return true; // Superuser bypass
  return user.permissions?.includes(requiredPermission);
};
```

### Conditional UI Rendering:
```jsx
function DeploymentButton() {
  const { hasPermission } = useAuth();

  if (!hasPermission('deployments:trigger')) {
    return <span className="text-muted">Deployment permissions restricted</span>;
  }

  return <button onClick={triggerDeploy}>Deploy to Production 🚀</button>;
}
```

---

## 4. State Management Spectrum: When to Use What?

| Scale | Recommended Solution | Example Use Cases |
| :--- | :--- | :--- |
| **Local / Isolated** | `useState`, `useReducer` | Form inputs, modal open/close, accordion toggle |
| **Low-frequency App-wide** | **React Context API** | Auth state, Theme (Dark/Light), Locale/i18n |
| **High-frequency Complex** | Zustand, Redux Toolkit | Real-time gaming, financial charts, complex collaborative canvas |
| **Server / Remote Cache** | Apollo Client, TanStack Query | GraphQL queries, REST caching, optimistic mutation rollbacks |

---

## 5. Performance Optimization in Context API

> [!TIP]
> Whenever any value in `Context.Provider` changes, **every** component consuming that context will re-render.

To avoid unnecessary renders:
1. **Split Contexts by Concern:** Don't put theme, auth, and notifications in a single monolithic context. Keep `AuthContext`, `ThemeContext`, and `NotificationContext` separate.
2. **Memoize the Value Object:** Use `useMemo` when generating complex context value objects to preserve reference equality across parent re-renders.

```jsx
const value = useMemo(() => ({
  user,
  token,
  login,
  logout
}), [user, token]);

return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
```
