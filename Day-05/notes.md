# Day 05: Tailwind CSS Architecture & Utility Cheatsheet

## 1. Why Utility-First CSS?
Traditional CSS requires inventing artificial class names (e.g. `.auth-sidebar-container-inner`) and constantly switching between HTML and separate stylesheets. 

Tailwind CSS provides low-level atomic utility classes that compose directly in markup:
- **Zero context switching:** Style components right inside the HTML template.
- **No naming fatigue:** No need to come up with class names for simple layout wrappers.
- **Safe refactoring:** Changing styles on one element never inadvertently breaks another component elsewhere.
- **Smaller bundle size:** Purge/JIT ensures only utilized classes are compiled into production.

---

## 2. Core Tailwind Utility Categories

### Layout & Flex/Grid
- Display: `block`, `inline-block`, `flex`, `grid`, `hidden`
- Flex Direction: `flex-row`, `flex-col`
- Alignment: `items-center`, `justify-between`, `justify-center`
- Spacing: `gap-4`, `space-y-3`

### Sizing & Spacing
- Width & Height: `w-full`, `max-w-md`, `h-12`, `min-h-screen`
- Padding: `p-4`, `px-6`, `py-2.5`
- Margin: `m-0`, `mt-4`, `mx-auto`, `mb-2`

### Colors, Typography & Borders
- Backgrounds: `bg-slate-950`, `bg-brand-600`, `bg-opacity-80`
- Text: `text-white`, `text-slate-400`, `text-sm`, `font-bold`, `tracking-tight`
- Borders: `border`, `border-slate-800`, `rounded-xl`, `rounded-3xl`
- Shadows: `shadow-md`, `shadow-2xl`, `shadow-brand-500/25`

---

## 3. Responsive Modifiers (Mobile-First)
Tailwind follows a strict mobile-first breakpoint hierarchy:

| Prefix | Minimum Width | CSS Media Query |
|---|---|---|
| *(none)* | `0px` | Applies to all screen widths by default |
| `sm:` | `640px` | `@media (min-width: 640px) { ... }` |
| `md:` | `768px` | `@media (min-width: 768px) { ... }` |
| `lg:` | `1024px` | `@media (min-width: 1024px) { ... }` |
| `xl:` | `1280px` | `@media (min-width: 1280px) { ... }` |
| `2xl:` | `1536px` | `@media (min-width: 1536px) { ... }` |

### Example Responsive Pattern
```html
<!-- Stacks on mobile, splits into 12 columns on medium screens and up -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-6">
  <div class="hidden md:block md:col-span-5">Sidebar</div>
  <div class="col-span-1 md:col-span-7">Main Form</div>
</div>
```

---

## 4. State Modifiers
- Hover: `hover:bg-brand-500`
- Focus: `focus:outline-none`, `focus:ring-2`, `focus:ring-brand-500/20`
- Active: `active:scale-95`
- Disabled: `disabled:opacity-50`, `disabled:cursor-not-allowed`
