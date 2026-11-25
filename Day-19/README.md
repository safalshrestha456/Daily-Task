# Day 19: Frontend Testing Basics & React Testing Library

## 🎯 Day 19 Overview & Objectives

In **Day 19**, we transition into automated software quality and verification in **Week 4: Advanced React & Frontend Mini Project**. Today's core deliverable is writing robust, production-grade automated tests for React components using **Vitest** and **React Testing Library (RTL)**:

1. **The Guiding Philosophy of React Testing Library:**
   - *"The more your tests resemble the way your software is used, the more confidence they can give you."*
   - Rather than testing internal implementation details (component state variables, internal method names), RTL queries components the way an end-user or screen reader interacts with them (accessible roles, text content, labels).
2. **Accessible Query Priorities:**
   - 1st Priority: Accessible to everyone (`getByRole`, `getByLabelText`, `getByPlaceholderText`, `getByText`).
   - 2nd Priority: Semantic queries (`getByAltText`, `getByTitle`).
   - 3rd Priority: Test IDs (`getByTestId`) reserved for elements with no accessible role or text.
3. **Simulating Real User Behavior with `@testing-library/user-event`:**
   - Why `userEvent.click()` and `userEvent.type()` are superior to synthetic `fireEvent` calls (dispatches full browser event sequences including focus, hover, keydown, keypress, input, keyup).
4. **Three Primary Test Suites Implemented:**
   - **`Button.test.jsx`:** Verifies label rendering, user click dispatch, disabled state prevention, loading spinners, and CSS variants.
   - **`LoginForm.test.jsx`:** Tests rendering, empty form validation, regex email verification, password length rules, and successful submission callbacks.
   - **`TodoList.test.jsx`:** Tests empty states, dynamic task creation, completion toggling, deletion, and active/completed filter views.

---

## 🏗️ Project Architecture & Components

```
Day-19/
├── package.json                       # Scripts for dev, build, and vitest testing
├── vite.config.js                     # Vite + Vitest configuration with jsdom environment
├── index.html                         # SPA mounting point
├── src/
│   ├── main.jsx                       # React 18 mount
│   ├── App.jsx                        # Interactive test runner dashboard & component showcase
│   ├── App.css                        # Modern responsive CSS styling
│   ├── index.css                      # Global tokens and reset
│   ├── test/
│   │   └── setup.js                   # Global test setup (jest-dom matchers & cleanup)
│   └── components/
│       ├── Button.jsx                 # Reusable button with variants & loading state
│       ├── Button.test.jsx            # 5 unit tests for Button
│       ├── LoginForm.jsx              # Controlled authentication form with validation
│       ├── LoginForm.test.jsx         # 5 integration tests for LoginForm
│       ├── TodoList.jsx               # Task manager with filters and counters
│       └── TodoList.test.jsx          # 6 unit/integration tests for TodoList
├── README.md                          # Project documentation
└── notes.md                           # Detailed theoretical guide on React testing
```

---

## 🚀 How to Run Locally

### Run Automated Tests (Vitest)
```bash
cd Day-19
npm install
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Launch Interactive Component Explorer
```bash
npm run dev
```
Visit `http://localhost:5173` to explore interactive demos of the `Button`, `LoginForm`, and `TodoList` components.

---

## 📌 Deliverables
- [x] Accessible `Button` component ([Button.jsx](./src/components/Button.jsx)) + Unit Tests ([Button.test.jsx](./src/components/Button.test.jsx))
- [x] Controlled `LoginForm` with regex validation ([LoginForm.jsx](./src/components/LoginForm.jsx)) + Integration Tests ([LoginForm.test.jsx](./src/components/LoginForm.test.jsx))
- [x] Full-featured `TodoList` component ([TodoList.jsx](./src/components/TodoList.jsx)) + Integration Tests ([TodoList.test.jsx](./src/components/TodoList.test.jsx))
- [x] Vitest and `jsdom` setup with `@testing-library/jest-dom` ([setup.js](./src/test/setup.js))
- [x] Interactive browser showcase with test suite metrics ([App.jsx](./src/App.jsx))
- [x] Comprehensive testing cheat sheet and study guide ([notes.md](./notes.md))
