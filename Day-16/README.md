# Day 16: React Router v6, Navigation, Route Params & Protected Routes

## 🎯 Day 16 Overview & Objectives

In **Day 16**, we begin **Week 4: Advanced React & Frontend Mini Project**. Today's core focus is client-side routing using **React Router DOM (v6)**:

1. **Client-Side Routing Architecture:** Single Page Application (SPA) navigation without page reloads using HTML5 History API (`BrowserRouter`, `Routes`, `Route`).
2. **Navigation Components:** Utilizing `<Link>` and `<NavLink>` with active styling indicators (`isActive`).
3. **Dynamic Route Parameters:** Using `useParams()` to capture dynamic segments such as `/products/:id` and querying dynamic data.
4. **Programmatic Navigation:** Employing `useNavigate()` for imperative routing (e.g., redirecting after actions or back button clicks).
5. **Protected Route Architecture:** Creating higher-order wrapper route guards (`<ProtectedRoute>`) to protect private routes (e.g., `/dashboard`) based on authentication state, utilizing `<Navigate to="..." replace />`.
6. **Catch-All 404 Routing:** Providing user-friendly fallback routing (`path="*"`) for undefined paths.

---

## 🏗️ Project Architecture & Components

```
Day-16/
├── package.json
├── vite.config.js
├── index.html
├── src/
│   ├── main.jsx                       # React root with <BrowserRouter>
│   ├── App.jsx                        # Central Route definitions and auth state simulation
│   ├── index.css                      # Global design system & theme
│   ├── data/
│   │   └── products.js                # Developer equipment catalog & metadata
│   ├── components/
│   │   ├── Navbar.jsx                 # Navigation header with NavLinks & auth toggle
│   │   ├── Navbar.css                 # Nav layout & active indicator styling
│   │   ├── Footer.jsx                 # Site footer with routing links & disclaimer
│   │   └── ProtectedRoute.jsx         # Authentication guard wrapper component
│   └── pages/
│       ├── Home.jsx                   # Landing page with feature cards & CTA
│       ├── About.jsx                  # Company background, tech stack, and values
│       ├── Products.jsx               # Filterable product catalog with search
│       ├── ProductDetails.jsx         # Dynamic detail page using useParams() & specs
│       ├── Contact.jsx                # Inquiry form with validation & social links
│       ├── Dashboard.jsx              # Protected developer dashboard (metrics & keys)
│       ├── NotFound.jsx               # Catch-all 404 page with return actions
│       └── Pages.css                  # Comprehensive styles for all pages
├── README.md
└── notes.md
```

---

## 🚀 How to Run Locally

```bash
cd Day-16
npm install
npm run dev
```

Visit `http://localhost:5173` to explore:
- Navigate between **Home**, **About**, **Products**, and **Contact**.
- In **Products**, click on any product card or "View Details" to navigate dynamically to `/products/:id`.
- Test the **Dashboard** link:
  - When logged out, clicking **Dashboard** redirects to the home page with an alert explaining access was restricted.
  - Click the **Log In** button in the header navigation bar to simulate authentication.
  - Now navigate to **Dashboard** to view the protected developer portal, API keys, and project metrics.
- Try typing an invalid URL like `/some/random/path` to test the **404 Catch-All** page.

---

## 📌 Deliverables
- [x] Multi-page SPA setup with React Router DOM v6
- [x] Navigation bar with active state indicators using `<NavLink>` ([Navbar.jsx](./src/components/Navbar.jsx))
- [x] Five primary pages: Home, About, Products, Product Details, Contact ([pages/](./src/pages/))
- [x] Dynamic routing with `useParams` for individual product details ([ProductDetails.jsx](./src/pages/ProductDetails.jsx))
- [x] Protected Route guard with authentication state simulation ([ProtectedRoute.jsx](./src/components/ProtectedRoute.jsx))
- [x] 404 Not Found fallback handling ([NotFound.jsx](./src/pages/NotFound.jsx))
- [x] Comprehensive conceptual study guide on React Router ([notes.md](./notes.md))
