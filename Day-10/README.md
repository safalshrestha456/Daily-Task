# Day 10: Fetch API, Promises, Async/Await, JSON, GET & POST

## 🎯 Day 10 Overview & Objectives

In **Day 10**, we conclude **Week 2: JavaScript Foundation** by mastering Asynchronous JavaScript:
1. **Synchronous vs Asynchronous Execution:** Understanding the JavaScript single-threaded event loop, call stack, microtask queue, and Web APIs.
2. **Promises:** Promise lifecycles (`pending`, `fulfilled`, `rejected`), `.then()`, `.catch()`, and `.finally()`.
3. **`async` / `await` Syntax:** Writing clean, synchronous-looking asynchronous code with comprehensive `try / catch / finally` error handling.
4. **Fetch API:** Executing HTTP requests:
   - `HTTP GET`: Reading JSON data from a remote REST API (`https://jsonplaceholder.typicode.com/users`).
   - `HTTP POST`: Sending JSON request bodies with `headers: { 'Content-Type': 'application/json' }`.
5. **UI States & Resilience:** Loading spinners, empty search states, responsive card grid, and offline fallback datasets.

---

## 🛠️ Assignment Implementation

- **REST Endpoint Consumed:** `https://jsonplaceholder.typicode.com/users`
- **GET Request:** Fetches 10 user profiles with address, phone, website, and company details.
- **POST Request:** Submits a modal form to create a new user profile on the server, dynamically appending the created record to the top of the feed upon receipt of HTTP 201 Created.
- **Search & Filter:** Instant client-side search across user names, email addresses, and company names.
- **Offline Fallback:** Seamlessly serves an internal mock dataset if network requests fail or offline.

---

## 📂 Project Structure

```
Day-10/
├── api.js           # Fetch API service layer (async/await GET and POST functions)
├── index.html       # Responsive user directory UI with modal dialog
├── styles.css       # Dark-mode cards, loading spinner, and responsive grid
├── app.js           # Client orchestration (DOM rendering, live search, POST handler)
├── README.md        # Assignment documentation
└── notes.md         # Asynchronous JavaScript & Fetch API cheatsheet
```

---

## 🚀 How to Run Locally

Open `index.html` in your browser:
```bash
# On Windows PowerShell
cd Day-10
Start-Process index.html
```

---

## 📌 Deliverables
- [x] Asynchronous user directory consuming real REST APIs ([index.html](./index.html))
- [x] Modular HTTP service layer with `async`/`await` ([api.js](./api.js))
- [x] Real-time live search filter and loading skeleton indicator ([app.js](./app.js))
- [x] Functional HTTP POST request flow with modal dialog
- [x] Comprehensive technical notes on Promises, Event Loop, and Fetch ([notes.md](./notes.md))
