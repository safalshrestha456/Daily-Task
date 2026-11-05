# Day 09: JavaScript Form Handling & Regular Expressions Cheatsheet

## 1. What is a Regular Expression (Regex)?
A Regular Expression is a sequence of characters that forms a search pattern used for text search and input validation.

### Syntax in JavaScript:
```javascript
// Literal syntax (preferred):
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Testing a string against regex:
const isValid = emailPattern.test("safal@example.com"); // true or false
```

---

## 2. Essential Regex Tokens Cheatsheet

| Token | Meaning | Example |
|---|---|---|
| `^` | Starts with | `^a` matches strings beginning with "a" |
| `$` | Ends with | `z$` matches strings ending with "z" |
| `[a-z]` | Any lowercase character | `[a-z]` |
| `[A-Z]` | Any uppercase character | `[A-Z]` |
| `[0-9]` or `\d` | Any digit (0-9) | `\d{3}` matches 3 digits |
| `\s` | Any whitespace (space, tab) | `[a-zA-Z\s]` |
| `\w` | Any word character (`[a-zA-Z0-9_]`) | `\w+` |
| `+` | One or more times | `a+` matches "a", "aa", "aaa" |
| `*` | Zero or more times | `a*` |
| `?` | Zero or one time (optional) | `https?` matches "http" and "https" |
| `{min,max}` | Exact repetition range | `\d{8,12}` between 8 and 12 digits |
| `(?=...)` | Positive lookahead (condition must exist) | `(?=.*[A-Z])` must have uppercase |

---

## 3. Form Handling Best Practices

### A. Always prevent default reload
```javascript
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents page from making GET/POST reload
});
```

### B. Use `novalidate` on HTML `<form>`
```html
<form id="my-form" novalidate>
```
Using `novalidate` turns off native browser tooltip popups so you have 100% full control over your custom styling, error messages, and animations.

### C. Live vs Blur Validation
- **`input` event:** Fires on every keystroke. Best for password meters and clearing errors as soon as the user corrects their input.
- **`blur` event:** Fires when the user clicks or tabs out of the input. Best for showing initial validation warnings without nagging them while they are still typing.

---

## 4. Complex Regex: Strict Password Lookahead
```javascript
// At least:
// 1. (?=.*[a-z]) : one lowercase letter
// 2. (?=.*[A-Z]) : one uppercase letter
// 3. (?=.*\d)     : one digit
// 4. (?=.*[@$!%*?&]) : one special symbol
// 5. .{8,}        : minimum 8 characters in length
const strictPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
```
