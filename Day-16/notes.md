# Day 16 Study Notes: React Router v6, Navigation, Route Params & Protected Routes

## 1. Client-Side Routing vs Server-Side Routing

### Server-Side Routing (Traditional Web)
- Every URL change makes a new HTTP GET request to the backend server.
- The server compiles or retrieves a full HTML page and responds with the entire document.
- The browser discards the existing DOM, flashes blank, and parses the new page from scratch.
- **Drawbacks:** Slow navigation, lost client state, high server load.

### Client-Side Routing (Single Page Applications - SPA)
- The entire application (HTML shell, JavaScript bundle, CSS) is loaded on the initial request.
- When the user clicks a link, the URL is updated using the browser's **HTML5 History API** (`pushState`, `replaceState`).
- No server request is made for new HTML. React intercepts the URL change and mounts/unmounts corresponding components in milliseconds.
- **Benefits:** Instant page transitions, preserved application state, smooth mobile-app-like user experience.

---

## 2. React Router v6 Core Components

### `BrowserRouter`
Wraps the entire application (typically inside `main.jsx` or `App.jsx`) to supply routing context via the browser's history stack:

```jsx
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

### `Routes` and `Route`
- `<Routes>` inspects the current `window.location.pathname` and picks the best matching child `<Route>`.
- `<Route path="..." element={<Component />} />` declares the URL pattern and the React component to mount.

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/products" element={<Products />} />
  <Route path="/products/:id" element={<ProductDetails />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

---

## 3. `<Link>` vs `<NavLink>`

| Feature | `<Link>` | `<NavLink>` |
| :--- | :--- | :--- |
| **Primary Use** | General hyperlinks between pages | Navigation bars, tabs, sidebars |
| **Active Detection** | None | Built-in via `isActive` boolean parameter |
| **Syntax** | `<Link to="/about">About</Link>` | `<NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>` |

### Example:
```jsx
<NavLink 
  to="/products"
  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
>
  Products
</NavLink>
```

---

## 4. Dynamic Route Parameters (`useParams`)

When paths contain dynamic segments (e.g. `/products/keyboard-pro` or `/users/42`), define the segment using a colon `:`:

```jsx
<Route path="/products/:id" element={<ProductDetails />} />
```

In the component, extract the parameter using `useParams()`:

```jsx
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  
  // Look up item using extracted param
  const item = productList.find(p => p.id === id);

  if (!item) {
    return <h2>Product Not Found</h2>;
  }

  return <div>{item.title}</div>;
}
```

---

## 5. Programmatic Navigation (`useNavigate`)

When navigation should happen as a result of an action (such as submitting a form, clicking a button, or completing a checkout), use `useNavigate()`:

```jsx
import { useNavigate } from 'react-router-dom';

function ContactForm() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // send form data...
    navigate('/thank-you');     // Push new entry
    // OR: navigate(-1);        // Go back 1 page in history
  };

  return <button onClick={handleSubmit}>Send Message</button>;
}
```

---

## 6. Protected Routes Pattern

Protected routes safeguard sensitive views (such as a User Dashboard, Profile, or Admin Panel) against unauthenticated visitors:

```jsx
// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    // Redirect to login or home, replacing history entry
    return <Navigate to="/" replace />;
  }
  return children;
}
```

### Usage in App Routes:
```jsx
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute isAuthenticated={isLoggedIn}>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

---

## 7. Catch-All 404 Routing

To handle unknown or mistyped URLs, place a route with `path="*"` at the end of `<Routes>`:

```jsx
<Route path="*" element={<NotFound />} />
```

---

## 8. Summary Checklist for Frontend Routing
- [x] Use `<BrowserRouter>` at the root of the app.
- [x] Use `<Link>` or `<NavLink>` instead of standard `<a href="...">` to prevent full browser reloads.
- [x] Use `useParams()` for dynamic segments (`:id`).
- [x] Use `useNavigate()` for programmatic redirection.
- [x] Use higher-order wrappers (`ProtectedRoute`) with `<Navigate replace />` for access control.
- [x] Always include a 404 wildcard route (`*`).
