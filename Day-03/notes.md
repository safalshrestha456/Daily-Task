# Day 03: CSS Selectors, Box Model & Positioning Cheatsheet

## 1. The CSS Box Model
Every HTML element is rendered as a rectangular box comprising 4 concentric areas:
```
+---------------------------------------+
|                Margin                 |
|   +-------------------------------+   |
|   |            Border             |   |
|   |   +-----------------------+   |   |
|   |   |        Padding        |   |   |
|   |   |   +---------------+   |   |   |
|   |   |   |    Content    |   |   |   |
|   |   |   +---------------+   |   |   |
|   |   +-----------------------+   |   |
|   +-------------------------------+   |
+---------------------------------------+
```

### `box-sizing: border-box` vs `content-box`
- **`content-box` (default):** `width` applies ONLY to the content. Adding padding and border enlarges the overall box.
- **`border-box` (industry standard):** `width = content + padding + border`. The element's total outer footprint remains exactly the declared `width`.

---

## 2. CSS Selectors Cheatsheet
| Selector | Syntax Example | Matches |
|---|---|---|
| Universal | `*` | Every single DOM element |
| Type | `h1`, `p`, `table` | Elements by tag name |
| Class | `.card`, `.btn-primary` | Elements with the specified class |
| ID | `#about`, `#skills` | Unique element with the specified ID |
| Child | `.parent > .child` | Direct descendants only |
| Descendant | `.parent .descendant` | All nested descendants |
| Adjacent Sibling | `h2 + p` | Immediate following sibling |
| Attribute | `input[type="email"]` | Elements with specific attribute value |
| Pseudo-class | `:hover`, `:focus`, `:nth-child(even)` | Elements in a specific state |
| Pseudo-element | `::before`, `::after` | Cosmetic virtual sub-elements |

---

## 3. CSS Positioning Scheme
| Position | Description | Common Use Case |
|---|---|---|
| `static` | Normal document flow (default). | Standard document paragraphs and blocks. |
| `relative` | Positioned relative to normal flow; preserves original space. | Anchor parent for `absolute` child elements. |
| `absolute` | Removed from normal flow; positioned relative to nearest positioned ancestor. | Badges, tooltips, modal close buttons. |
| `fixed` | Removed from flow; positioned relative to the browser viewport. | Floating back-to-top buttons, sticky banners. |
| `sticky` | Hybrid; behaves like `relative` until a scroll threshold, then sticks like `fixed`. | Sticky navigation bars, table headers, sidebar widgets. |
