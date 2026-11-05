# Day 13: useState Hook, Event Handling & Conditional Rendering

## 🎯 Day 13 Overview & Objectives

In **Day 13**, we master component memory and dynamic reactivity in React:
1. **The `useState` Hook:** Declaring state variables, understanding render triggers, and using functional state updater syntax (`setCount(prev => prev + 1)`).
2. **Synthetic Event Handling:** Wiring `onClick`, `onChange`, and event delegation in React.
3. **Conditional Rendering Patterns:**
   - Logical AND (`&&`) for inline conditions
   - Ternary Operator (`condition ? a : b`) for alternative UI states
   - Disabled button states based on boundary constraints
4. **Assignment:** Build an interactive **Product Quantity Counter** with stock boundary management, live subtotal computation, low-stock warnings, and a dynamic cart summary with a free shipping progress meter.

---

## 🏗️ Project Architecture & Components

```
Day-13/
├── package.json
├── vite.config.js
├── index.html
├── src/
│   ├── main.jsx                       # React 18 createRoot mount
│   ├── App.jsx                        # Main state orchestrator (cart items)
│   ├── App.css                        # Layout grid & guide styling
│   ├── index.css                      # Global design system
│   └── components/
│       ├── ProductCard.jsx            # Quantity counter with boundary logic & stock warnings
│       ├── ProductCard.css            # Pulse badges, pricing box & counter buttons
│       ├── CartSummary.jsx            # Cart itemization & free shipping progress bar
│       └── CartSummary.css            # Summary card & checkout buttons
├── README.md
└── notes.md
```

---

## 🚀 How to Run Locally

```bash
cd Day-13
npm install
npm run dev
```

---

## 📌 Deliverables
- [x] Product quantity counter with boundary protection (min: 1, max: stock) ([ProductCard.jsx](./src/components/ProductCard.jsx))
- [x] Conditional rendering of low-stock alerts, out-of-stock badges, and reset buttons
- [x] Shopping cart summary calculating live subtotal and free shipping eligibility ([CartSummary.jsx](./src/components/CartSummary.jsx))
- [x] Clean dark-mode responsive design ([ProductCard.css](./src/components/ProductCard.css))
- [x] Comprehensive technical notes on `useState` and conditional rendering ([notes.md](./notes.md))
