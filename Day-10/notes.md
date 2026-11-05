# Day 10: Asynchronous JavaScript, Promises & Fetch API Cheatsheet

## 1. The JavaScript Event Loop & Asynchrony
JavaScript is single-threaded: it has one call stack and executes one statement at a time.
To handle long-running operations like network requests or timers without freezing the browser UI, JavaScript delegates these tasks to **Browser Web APIs**.

```
[ Call Stack ]  ---> Initiates fetch() ---> [ Web APIs / Network ]
      │                                                │
[ Continues executing synchronous code ]              │ When finished, queues callback
                                                       ▼
[ Microtask Queue (Promises) ] <───────────────────────┘
      │
[ Event Loop pushes to Call Stack when Stack is empty ]
```

---

## 2. Promises vs Async / Await

### Traditional Promise Syntax (`.then` / `.catch`):
```javascript
fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => {
    if (!response.ok) throw new Error("HTTP error " + response.status);
    return response.json();
  })
  .then(users => console.log(users))
  .catch(error => console.error("Fetch failed:", error));
```

### Modern `async` / `await` Syntax (Recommended):
```javascript
async function loadUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Failed to load users:", error.message);
  }
}
```

---

## 3. Fetch API HTTP Methods Cheatsheet

### A. HTTP GET Request (Read Data)
```javascript
const response = await fetch("https://api.example.com/items");
const data = await response.json();
```

### B. HTTP POST Request (Create Data)
```javascript
const response = await fetch("https://api.example.com/items", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Safal Shrestha",
    role: "Full Stack Intern"
  })
});
const result = await response.json();
```

### C. Common Pitfall: `response.ok`
`fetch()` only rejects on **network failures** (e.g. no internet connection). It **does NOT reject on HTTP 404 or 500 errors**!
Always check `response.ok`:
```javascript
if (!response.ok) {
  throw new Error(`Server returned status: ${response.status}`);
}
```
