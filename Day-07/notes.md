# Day 07: JavaScript Higher-Order Array Methods Cheatsheet

## 1. Core Array Methods Comparison

| Method | Returns | Mutates Original? | Primary Purpose |
|---|---|---|---|
| `map(callback)` | New array of same length | ❌ No | Transforms every element into a new representation |
| `filter(callback)` | New array (subset) | ❌ No | Selects elements where callback returns truthy |
| `find(callback)` | First matching element or `undefined` | ❌ No | Finds the first individual item satisfying a condition |
| `reduce(callback, initial)` | Single accumulated value | ❌ No | Aggregates all elements into a single result (number, object, array) |
| `some(callback)` | Boolean (`true`/`false`) | ❌ No | Tests if at least ONE element satisfies the condition |
| `every(callback)` | Boolean (`true`/`false`) | ❌ No | Tests if ALL elements satisfy the condition |

---

## 2. Syntax & Real-World Examples

### `Array.prototype.map()`
```javascript
// Transform student list into percentages
const percentages = students.map(student => {
  const total = Object.values(student.marks).reduce((sum, m) => sum + m, 0);
  return { id: student.id, percentage: (total / 500) * 100 };
});
```

### `Array.prototype.filter()`
```javascript
// Filter high achievers (percentage >= 80)
const distinctionHolders = students.filter(student => student.percentage >= 80);
```

### `Array.prototype.find()`
```javascript
// Find specific student by ID
const safal = students.find(student => student.id === "STU-101");
```

### `Array.prototype.reduce()`
```javascript
// Calculate class total score and average in a single pass
const totalScore = students.reduce((accumulator, student) => accumulator + student.totalMarks, 0);
const classAverage = totalScore / students.length;

// Aggregate subject totals into an object
const subjectAverages = students.reduce((acc, student) => {
  acc.react = (acc.react || 0) + student.marks.react;
  acc.fastapi = (acc.fastapi || 0) + student.marks.fastapi;
  return acc;
}, {});
```

---

## 3. Immutability Best Practices
Never mutate arrays in-place with `.push()`, `.splice()`, or `.sort()`. Use non-mutating equivalents:
```javascript
// Add item immutably
const newStudents = [...students, newStudent];

// Remove item immutably
const remainingStudents = students.filter(s => s.id !== removedId);

// Update item immutably
const updatedStudents = students.map(s => s.id === targetId ? { ...s, name: "New Name" } : s);

// Sort immutably (always copy before sorting!)
const sortedStudents = [...students].sort((a, b) => b.percentage - a.percentage);
```
