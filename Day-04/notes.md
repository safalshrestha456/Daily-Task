# Day 04: Flexbox vs CSS Grid & Responsive Media Queries

## 1. Flexbox vs CSS Grid: When to Use Which?

| Feature | CSS Flexbox | CSS Grid |
|---|---|---|
| **Dimension** | 1-Dimensional (row **OR** column) | 2-Dimensional (rows **AND** columns simultaneously) |
| **Approach** | Content-first (elements dictate size) | Layout-first (container defines the grid tracks) |
| **Best Used For** | Navbars, button groups, metric bars, card internals, alignment | Page scaffolding, card matrices, asymmetric dashboards, gallery layouts |
| **Key Properties** | `justify-content`, `align-items`, `flex-grow`, `gap` | `grid-template-columns`, `grid-template-rows`, `grid-column: span`, `repeat()` |

---

## 2. Powerful CSS Grid Patterns
```css
/* Responsive auto-fitting cards without media queries */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Spanning columns in asymmetric layouts */
.featured-card {
  grid-column: span 2;
}
```

---

## 3. Responsive Breakpoint Strategy
Follow mobile-first or desktop-down standard screen widths:
- **Mobile devices:** `< 480px`
- **Tablets (portrait):** `481px – 768px`
- **Tablets (landscape) & small laptops:** `769px – 1024px`
- **Desktops:** `1025px – 1440px`
- **Large monitors:** `> 1440px`

```css
/* Example mobile breakpoint */
@media screen and (max-width: 768px) {
  .hero-container {
    flex-direction: column;
  }
}
```
