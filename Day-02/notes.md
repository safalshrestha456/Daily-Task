# Day 02: HTML5 Semantic Markup, Forms & Tables Reference

## 1. Semantic Elements vs Generic Divs
Semantic HTML tags clearly describe their meaning to both the browser and the developer.

| Semantic Tag | Usage / Role |
|---|---|
| `<header>` | Introductory content, logos, or site navigation |
| `<nav>` | Container for primary navigation links |
| `<main>` | Dominant, unique content of the `<body>` |
| `<section>` | Standalone, thematic grouping of related content |
| `<article>` | Self-contained composition (e.g. blog post, card, project) |
| `<aside>` | Indirectly related sidebar, tips, or secondary information |
| `<footer>` | Author information, copyright, and bottom navigation |

---

## 2. Accessible Form Controls Best Practices
- **Always link labels to inputs:** Use `<label for="inputId">` paired with `<input id="inputId">`.
- **Group related fields:** Use `<fieldset>` and `<legend>` for cohesive input sections (e.g., Personal Info, Preferences).
- **Validation attributes:** Utilize native browser validation attributes like `required`, `type="email"`, `minlength`, `maxlength`, and `pattern`.
- **Dropdown organization:** Group related options inside `<select>` using `<optgroup label="...">`.

---

## 3. Accessible HTML Tables
When displaying tabular data:
- Use `<thead>`, `<tbody>`, and `<tfoot>` to delineate table segments.
- Add `scope="col"` or `scope="row"` to header cells (`<th>`) so screen readers associate data cells with headers.
- Use `colspan` and `rowspan` to span across columns or rows.
- Add `summary` or `<caption>` to describe table contents.
