# Day 11: React Introduction, Vite Setup, Project Structure & JSX

## 🎯 Day 11 Overview & Objectives

In **Day 11**, we enter **Week 3: React with Vite**. The core objectives focus on mastering:
1. **React Fundamentals:** What React is, the component-based architecture, unidirectional data flow, and the Virtual DOM reconciliation algorithm.
2. **Modern Tooling with Vite:** Why Vite is the industry standard replacing Create React App (CRA): native ES modules, instant server start powered by esbuild, and blazing-fast Hot Module Replacement (HMR).
3. **Project Structure:** Understanding the role of `index.html`, `vite.config.js`, `src/main.jsx`, `src/App.jsx`, and CSS modules.
4. **JSX Syntax Mastery:** JSX rules, differences from HTML (`className`, `htmlFor`), self-closing tags, and embedding JavaScript expressions using `{}`.
5. **Assignment:** Build an interactive, responsive **React Portfolio Homepage**.

---

## 🏗️ Project Architecture & Structure

```
Day-11/
├── index.html         # HTML host file with #root mount point
├── package.json       # Dependencies (React 18, React-DOM, Vite)
├── vite.config.js     # Vite configuration with @vitejs/plugin-react
├── src/
│   ├── main.jsx       # React 18 entry point using ReactDOM.createRoot()
│   ├── App.jsx        # Portfolio homepage component using JSX
│   ├── App.css        # Component-specific styles
│   └── index.css      # Global reset & CSS custom properties
├── README.md          # Assignment documentation
└── notes.md           # Comprehensive React & JSX study notes
```

---

## 🚀 How to Run Locally

```bash
# 1. Navigate to the Day 11 folder
cd Day-11

# 2. Install dependencies (if not already installed)
npm install

# 3. Start Vite development server
npm run dev

# 4. Or build for production
npm run build
```

---

## 📌 Deliverables
- [x] Complete React + Vite application structure ([package.json](./package.json), [vite.config.js](./vite.config.js))
- [x] React 18 Concurrent root mount ([src/main.jsx](./src/main.jsx))
- [x] Portfolio homepage component leveraging JSX expressions, mappings, and fragments ([src/App.jsx](./src/App.jsx))
- [x] Modern dark-mode layout with responsive grid styling ([src/App.css](./src/App.css))
- [x] Technical cheatsheet on React Virtual DOM and JSX rules ([notes.md](./notes.md))
