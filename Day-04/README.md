# Day 04: Flexbox, CSS Grid & Responsive Layouts with Media Queries

## 🎯 Day 4 Overview & Objectives

In **Day 4**, the curriculum focuses on responsive layout systems: **CSS Flexbox** (1-dimensional flow) and **CSS Grid** (2-dimensional layouts), combined with **Media Queries** to construct a production-ready, fully responsive **Software Company Homepage** ("DevPulse Technologies").

---

## 🏗️ Architecture & Layout Implementation

### 1. CSS Flexbox (1D Layouts)
- **Navigation Bar:** Horizontal alignment of logo, links, and action buttons (`justify-content: space-between`, `align-items: center`).
- **Hero Section:** 2-column flex container (`flex: 1.1` and `flex: 0.9`) that flips to `flex-direction: column` on tablets.
- **Metrics Bar:** Even horizontal distribution of key metrics (`flex: 1`, `min-width: 200px`).
- **Testimonials:** Flexible side-by-side card distribution with author metadata.
- **Consultation Section:** 2-column layout pairing marketing perks with an interactive quote request form.

### 2. CSS Grid (2D Layouts)
- **Services Grid:** Responsive auto-fitting grid (`grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))`) that automatically reflows from 3 columns down to 1 column without manual breakpoint hacking.
- **Solutions Grid:** Asymmetrical grid with `grid-column: span 2` cards showcasing technical workflows.
- **Pricing Matrix:** Multi-tier plan comparison cards with aligned action buttons.
- **Footer Columns:** Multi-column grid (`grid-template-columns: 2fr 1fr 1fr 1.5fr`) collapsing to 2 columns on tablets and 1 column on mobile.

### 3. Responsive Media Queries
- **Desktop:** `> 1024px` (Full multi-column layout, interactive code monitor mockup).
- **Tablet (`max-width: 1024px`):** Stacked hero section, 2-column solutions & pricing grids.
- **Mobile (`max-width: 768px`):** Pure CSS mobile hamburger navigation menu, single-column stacks.
- **Small Mobile (`max-width: 480px`):** Optimized padding, full-width CTA buttons, compact typography.

---

## 🚀 How to Run / Preview

Open [`index.html`](./index.html) in your browser:
```bash
# On Windows PowerShell
Start-Process index.html
```

---

## 📌 Deliverables
- [x] Responsive software company homepage ([index.html](./index.html))
- [x] Advanced Flexbox & Grid stylesheet ([styles.css](./styles.css))
- [x] Responsive breakpoints covering desktop, tablet, and mobile devices
- [x] Technical comparison & cheatsheet notes ([notes.md](./notes.md))
