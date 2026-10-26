# Day 07: Arrays, Objects, Map, Filter, Find & Reduce

## 🎯 Day 7 Overview & Objectives

In **Day 07**, we advance our JavaScript mastery by focusing on higher-order array methods and immutable data structures:
1. **Arrays & Objects:** In-depth manipulation, property access, object destructuring, and the spread operator (`...`).
2. **`Array.prototype.map()`:** Transforming raw student records into enriched objects (computing total score, percentage, GPA, and grades) without mutating input data.
3. **`Array.prototype.filter()`:** Isolating subsets of data based on dynamic predicates (Distinction holders $\ge 80\%$, Passed $\ge 40\%$, and Students Needing Support).
4. **`Array.prototype.find()`:** Querying singular records (finding a student by ID, finding the highest scorer, or finding subject toppers).
5. **`Array.prototype.reduce()`:** Aggregating multidimensional datasets in a single pass (computing total enrolled, overall pass rate, class average percentage, and subject-wise averages).

---

## 🛠️ Assignment Implementations

### Student Result Analyzer
- **Dataset:** 8 Full Stack Developer Intern records with individual scores across 5 core modules:
  - React & Vite Frontend
  - FastAPI & Python Backend
  - GraphQL API & Schema Design
  - PostgreSQL & SQLAlchemy ORM
  - Docker & Containerization
- **Core Operations:**
  - `transformStudentResults()` using **`map`**
  - `filterStudentsByPerformance()` using **`filter`**
  - `findStudentById()` and `findTopPerformingStudent()` using **`find`**
  - `computeClassStatistics()` using **`reduce`**
- **Dual Interfaces:**
  - **CLI runner:** `node analyzer.js` producing clean ASCII formatted tables.
  - **Web Dashboard:** `index.html` featuring interactive search, filter buttons, KPI summary badges, subject-wise progress bars, and an "Add Student" modal.

---

## 📂 Project Structure

```
Day-07/
├── analyzer.js      # Core analytical algorithms & CLI demo (Node.js compatible)
├── index.html       # Interactive student analytics dashboard
├── styles.css       # Dark-mode ledger styling with rank badges & progress bars
├── app.js           # Client-side state management (search, filter, add student)
├── README.md        # Assignment documentation & walkthrough
└── notes.md         # Array methods & immutability cheatsheet
```

---

## 🚀 How to Run & Test

### Option A: Via Node.js (CLI Mode)
```bash
node analyzer.js
```

### Option B: In the Browser
```bash
# On Windows PowerShell
Start-Process index.html
```

---

## 📌 Deliverables
- [x] Immutable student data transformation using `Array.prototype.map()`
- [x] Multi-criteria filtering using `Array.prototype.filter()`
- [x] Targeted record lookup and ranking using `Array.prototype.find()`
- [x] Single-pass class statistics aggregation using `Array.prototype.reduce()`
- [x] Executable Node.js script ([analyzer.js](./analyzer.js))
- [x] Interactive web dashboard ([index.html](./index.html))
- [x] Technical cheatsheet ([notes.md](./notes.md))
