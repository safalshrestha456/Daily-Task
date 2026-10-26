# Day 06: JavaScript Foundation - Variables, Operators, Conditions, Loops & Functions

## 🎯 Day 6 Overview & Objectives

In **Day 06**, we initiate **Week 2: JavaScript Foundation**. The core objectives focus on mastering:
1. **Variables & Declarations:** `const`, `let`, `var`, variable hoisting, and scope (block vs function scope).
2. **Data Types:** Primitives (`number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint`) and Reference Types (`object`, `array`, `function`).
3. **Operators:** Arithmetic, comparison (strict `===` vs abstract `==`), logical (`&&`, `||`, `!`), nullish coalescing (`??`), and ternary operator (`? :`).
4. **Conditional Flow:** `if / else if / else` chains and `switch-case` statements.
5. **Loops & Iteration:** `for`, `while`, and `do-while` loops.
6. **Functions:** Declarations, arrow functions, default parameters, and pure functions.

---

## 🛠️ Assignment Implementations

### 1. Grade Calculator
- Inputs: 5 technical subjects (Frontend, Backend, GraphQL, Database, DevOps).
- Computes: Total marks, percentage, GPA on 4.0 scale, letter grades (`A+` down to `F`), and pass/fail statuses.
- Enforces individual subject minimum passing score (40%) preventing false passes.

### 2. Even / Odd Checker & Range Analyzer
- Single number checker utilizing the modulo operator `n % 2 === 0`.
- Range loop analyzer utilizing `while` and `for` loops to categorize numbers, compute counts, and sum odd and even groups.

### 3. Simple Interest Calculator
- Formula: $I = \frac{P \times T \times R}{100}$ and Total Maturity Balance $A = P + I$.
- Generates a dynamic year-by-year amortization breakdown schedule utilizing a `do-while` loop.

---

## 📂 Project Structure

```
Day-06/
├── calculators.js   # Pure, modular JS library + CLI runner (Node.js compatible)
├── index.html       # Interactive web dashboard with tabs for all 3 calculators
├── styles.css       # Clean dark-mode stylesheet
├── app.js           # Event handlers and dynamic DOM update logic
├── README.md        # Assignment documentation
└── notes.md         # Comprehensive JavaScript concepts cheatsheet
```

---

## 🚀 How to Run & Test

### Option A: Via Node.js (CLI Mode)
```bash
node calculators.js
```

### Option B: In the Browser
```bash
# On Windows PowerShell
Start-Process index.html
```

---

## 📌 Deliverables
- [x] Grade Calculator with GPA, percentage, and division evaluation
- [x] Even/Odd single checker and range analyzer
- [x] Simple Interest calculator with year-by-year schedule table
- [x] Node.js executable script ([calculators.js](./calculators.js))
- [x] Interactive web interface ([index.html](./index.html))
- [x] Technical cheatsheet ([notes.md](./notes.md))
