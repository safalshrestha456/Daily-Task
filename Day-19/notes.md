# Day 19 Study Notes: Frontend Testing Basics & React Testing Library

## 1. The Frontend Testing Pyramid

Modern software engineering relies on a layered automated testing strategy:

```
        / \
       /   \        End-to-End (E2E) Tests (Cypress, Playwright)
      / E2E \       Verify entire user journeys across client, API & database.
     /-------\
    / Integr. \     Integration Tests (React Testing Library + Vitest)
   /   Tests   \    Verify component interactions, forms, and workflows.
  /-------------\
 /  Unit Tests   \  Unit Tests (Pure utility functions, isolated UI components)
/_________________\ Fast, cheap, and isolated.
```

---

## 2. React Testing Library Philosophy

> *"The more your tests resemble the way your software is used, the more confidence they can give you."* — Kent C. Dodds

### Avoid Testing Implementation Details:
- ❌ Do NOT test state variable names (`wrapper.state('count')`).
- ❌ Do NOT test component class methods (`wrapper.instance().handleClick()`).
- ❌ Do NOT test child component internals.

### Test User Behavior:
- ✅ Find elements by visible text, aria roles, and input labels.
- ✅ Simulate real keyboard and mouse actions (`userEvent.type()`, `userEvent.click()`).
- ✅ Assert visible UI outcomes, error messages, and network callbacks.

---

## 3. RTL Query Types & Cheat Sheet

React Testing Library provides 3 prefixes that behave differently when elements are missing or asynchronous:

| Prefix | Missing Element | Found Element | Multiple Elements | Primary Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **`getBy...`** | 💥 **Throws Error** | Returns Element | 💥 Throws Error | Standard sync assertions (element must exist) |
| **`queryBy...`** | Returns `null` | Returns Element | 💥 Throws Error | **Negative assertions** (`expect(queryByText(...)).not.toBeInTheDocument()`) |
| **`findBy...`** | 💥 **Throws Error** (after timeout) | Returns Promise<Element> | 💥 Throws Error | **Asynchronous assertions** (waits up to 1000ms for element to appear) |

### Query Suffix Priority Order:
1. `getByRole(role, { name })` — **Highest Priority** (e.g., `button`, `heading`, `textbox`, `alert`, `checkbox`).
2. `getByLabelText(text)` — For form fields connected to `<label>`.
3. `getByPlaceholderText(text)` — For inputs with placeholders.
4. `getByText(text)` — For static text elements (paragraphs, spans).
5. `getByTestId(id)` — **Last Resort** (when no accessible role or text is suitable).

---

## 4. `userEvent` vs `fireEvent`

| Feature | `fireEvent` | `userEvent` |
| :--- | :--- | :--- |
| **Execution** | Dispatches a single synthetic DOM event (`click`, `change`). | Dispatches full realistic sequence of browser events. |
| **Typing Simulation** | Sets input value immediately without firing intermediate keydowns. | Fires `hover`, `focus`, `keydown`, `keypress`, `input`, `keyup` for every character. |
| **Best Practice** | Legacy / Fallback only. | **Modern Standard Recommendation**. |

### Example:
```jsx
import userEvent from '@testing-library/user-event';

test('user fills out search', async () => {
  const user = userEvent.setup();
  render(<SearchBox />);
  
  const input = screen.getByRole('textbox');
  await user.type(input, 'React 18');
});
```

---

## 5. Key `@testing-library/jest-dom` Matchers

- `expect(element).toBeInTheDocument()` — Checks element is attached to DOM tree.
- `expect(element).toBeDisabled()` — Verifies disabled HTML attribute.
- `expect(element).toBeEnabled()` — Verifies enabled interaction.
- `expect(element).toBeChecked()` — Checks checkbox/radio selection.
- `expect(element).toHaveValue('foo')` — Checks input current value.
- `expect(element).toHaveTextContent('Bar')` — Checks text inside element.
- `expect(element).toHaveClass('btn-primary')` — Checks CSS classes.
- `expect(element).toHaveAttribute('aria-busy', 'true')` — Checks ARIA attributes.

---

## 6. Testing Asynchronous Code

When testing API calls or delayed actions:

```jsx
// Using findBy (implicit waitFor)
const successAlert = await screen.findByRole('alert');
expect(successAlert).toHaveTextContent(/success/i);

// Using waitFor
await waitFor(() => {
  expect(mockFetch).toHaveBeenCalledTimes(1);
});
```

---

## 7. Testing Checklist for React Developers
- [x] Every interactive component has unit tests covering its primary user actions.
- [x] Forms test validation errors on empty or invalid inputs.
- [x] Asynchronous actions test both loading indicators and success/error outcomes.
- [x] Negative assertions use `queryBy` rather than `getBy`.
- [x] Handlers and callbacks are verified using spy functions (`vi.fn()`).
