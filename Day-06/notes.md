# Day 06: JavaScript Core Fundamentals Reference

## 1. Variables: `const` vs `let` vs `var`

| Feature | `const` | `let` | `var` (Legacy) |
|---|---|---|---|
| **Scope** | Block Scope `{}` | Block Scope `{}` | Function / Global Scope |
| **Reassignable?** | ❌ No | ✅ Yes | ✅ Yes |
| **Redeclarable?** | ❌ No | ❌ No | ✅ Yes |
| **Hoisting** | Temporal Dead Zone (TDZ) | Temporal Dead Zone (TDZ) | Hoisted as `undefined` |
| **Best Practice** | Default choice for immutable references | For counters and reassignable state | Avoid in modern JS |

---

## 2. Data Types in JavaScript

- **Primitive Types (Stored by value on stack):**
  - `string`: `"Hello, World!"`
  - `number`: `42`, `3.14`, `NaN`, `Infinity`
  - `boolean`: `true` / `false`
  - `null`: Intentional absence of any object value
  - `undefined`: Variable declared but not assigned a value
  - `symbol`: Unique and immutable primitive identifier
  - `bigint`: Arbitrary precision integers (`9007199254740991n`)

- **Reference Types (Stored by reference on heap):**
  - `object`, `array`, `function`

---

## 3. Equality Operators: `===` vs `==`

```javascript
// Strict Equality (===) - Compares both TYPE and VALUE (Always prefer)
5 === "5";   // false (number vs string)
null === undefined; // false

// Loose Equality (==) - Coerces types before comparison (Prone to bugs)
5 == "5";    // true (coerced)
0 == false;  // true (coerced)
null == undefined; // true
```

---

## 4. Loops Cheatsheet

```javascript
// 1. Standard For Loop (When index is required)
for (let i = 0; i < array.length; i++) { ... }

// 2. While Loop (Condition tested before loop)
while (balance > 0) { ... }

// 3. Do-While Loop (Guaranteed to execute at least once)
do {
  year++;
} while (year <= duration);

// 4. For...of Loop (Iterates over iterable values)
for (const subject of subjects) { ... }
```

---

## 5. Function Varieties

```javascript
// Function Declaration (Hoisted)
function add(a, b) {
  return a + b;
}

// Arrow Function (Lexical 'this', concise)
const multiply = (a, b) => a * b;

// Default Parameters
const greet = (name = "Intern") => `Hello, ${name}!`;
```
