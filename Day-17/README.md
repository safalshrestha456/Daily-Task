# Day 17: `useEffect`, `useContext`, Custom Hooks & API Call Pattern

## 🎯 Day 17 Overview & Objectives

In **Day 17**, we advance through **Week 4: Advanced React & Frontend Mini Project** by building **DevPulse Analytics**, an asynchronous User & Engineer Directory Dashboard powered by the API data pattern and modern React hook design patterns:

1. **The `useEffect` Hook & Lifecycle:**
   - Mounting, dependency changes, and unmounting.
   - Managing side-effects: fetching data, synchronizing with `localStorage`, and binding window events.
   - Using **cleanup functions** to prevent memory leaks and race conditions (e.g., aborting in-flight fetch requests, clearing timeouts, removing window event listeners).
2. **Custom Hooks Extraction:**
   - **`useFetch(url, fallbackData)`:** Encapsulates the entire HTTP request lifecycle (`{ data, loading, error, refetch, lastUpdated, isUsingFallback }`), integrates an `AbortController` signal, and provides seamless offline fallback data.
   - **`useDebounce(value, delay)`:** Debounces rapid user keystrokes for search input without lag or unnecessary renders.
3. **The `useContext` Hook:**
   - Global theme management (`ThemeProvider` and `useTheme()`) supporting seamless toggle between Dark and Light mode.
   - Persisting theme state across page refreshes via `localStorage`.
4. **API Call Pattern & UI States:**
   - Clean handling of four core asynchronous states: **Loading**, **Success**, **Error / Fallback**, and **Empty Filtered Results**.
   - User detail modal with locked background scrolling and keyboard `Escape` dismissal.

---

## 🏗️ Project Architecture & Components

```
Day-17/
├── package.json
├── vite.config.js
├── index.html
├── src/
│   ├── main.jsx                       # ThemeProvider mount & React root
│   ├── App.jsx                        # Root dashboard coordinator & state filters
│   ├── App.css                        # Layout & banner notification styles
│   ├── index.css                      # Design system, CSS tokens & Dark/Light modes
│   ├── context/
│   │   └── ThemeContext.jsx           # Global theme context & useTheme hook
│   ├── hooks/
│   │   ├── useFetch.js                # Custom hook for API fetch with AbortController
│   │   └── useDebounce.js             # Custom hook for debouncing search queries
│   ├── data/
│   │   └── fallbackUsers.js           # Offline mock data for high reliability
│   └── components/
│       ├── Header.jsx                 # Dashboard branding, status pill & theme toggle
│       ├── Metrics.jsx                # Summary stats cards (engineers, hubs, orgs)
│       ├── Controls.jsx               # Debounced search, status filter & sorting
│       ├── UserCard.jsx               # Engineer card with avatar, role, and actions
│       ├── UserModal.jsx              # Full profile telemetry modal with Escape listener
│       └── Dashboard.css              # Modern responsive CSS styling
├── README.md
└── notes.md
```

---

## 🚀 How to Run Locally

```bash
cd Day-17
npm install
npm run dev
```

Visit `http://localhost:5173` to explore:
- **Live API Fetching:** Data loads dynamically from `jsonplaceholder.typicode.com/users`.
- **Refetch & Polling:** Click "Refetch" to trigger immediate re-execution of the fetch hook.
- **Debounced Search:** Type any name, email, company, or city in the search bar. Observe instant, smooth filtering.
- **Telemetry Modal:** Click "View Full Telemetry" on any card. Notice how pressing the `Escape` key closes the modal and restores scrolling.
- **Theme Toggle:** Click the Dark/Light mode button in the header. The preference persists even after page reloads.

---

## 📌 Deliverables
- [x] Asynchronous User Dashboard application ([App.jsx](./src/App.jsx))
- [x] Custom hook `useFetch` with `AbortController` cancellation ([useFetch.js](./src/hooks/useFetch.js))
- [x] Custom hook `useDebounce` with `clearTimeout` cleanup ([useDebounce.js](./src/hooks/useDebounce.js))
- [x] Shared Theme context and `useTheme` hook ([ThemeContext.jsx](./src/context/ThemeContext.jsx))
- [x] Loading spinner, empty state, and graceful error/fallback handling
- [x] Comprehensive study guide on `useEffect`, `useContext`, and Custom Hooks ([notes.md](./notes.md))
