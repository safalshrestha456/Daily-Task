# Day 15: Lists, Key Prop, Empty States, Filters & React Todo App

## 🎯 Day 15 Overview & Objectives

In **Day 15**, we reach a major milestone by concluding **Week 3: React with Vite**:
1. **Rendering Lists in React:** Mapping over arrays of objects to render components dynamically (`todos.map(...)`).
2. **The `key` Prop & Reconciliation:** Why React requires unique, stable keys to identify elements and why using array indexes as keys causes serious rendering bugs.
3. **Contextual Empty States:** Designing informative and tailored empty states based on active filters (All / Active / Completed).
4. **CRUD Actions:**
   - **Create:** Adding tasks with priority metadata (High, Medium, Low)
   - **Read & Filter:** Filtering between All, Active, and Completed with live item count badges
   - **Update:** Toggling completion checkboxes and inline editing task descriptions
   - **Delete:** Removing individual tasks or bulk-clearing all completed items
5. **Persistence:** Synchronizing state with browser `localStorage` using `useEffect`.

---

## 🏗️ Project Architecture & Components

```
Day-15/
├── package.json
├── vite.config.js
├── index.html
├── src/
│   ├── main.jsx                       # React 18 createRoot mount
│   ├── App.jsx                        # Root state manager (todos, filter, localStorage sync)
│   ├── App.css                        # Layout, filters & empty state styles
│   ├── index.css                      # Global design system
│   └── components/
│       ├── TodoForm.jsx               # Task creation form with priority dropdown
│       ├── TodoItem.jsx               # Individual task row with inline editing & badges
│       ├── TodoItem.css               # Row styles, custom checkbox & action buttons
│       └── TodoFilters.jsx            # Filter tabs with live count badges
├── README.md
└── notes.md
```

---

## 🚀 How to Run Locally

```bash
cd Day-15
npm install
npm run dev
```

---

## 📌 Deliverables
- [x] Full-featured React Todo Application ([App.jsx](./src/App.jsx))
- [x] Proper utilization of unique `key` props (`todo.id`)
- [x] Contextual empty state messaging for All, Active, and Completed views
- [x] Filter toolbar with live dynamic counts ([TodoFilters.jsx](./src/components/TodoFilters.jsx))
- [x] Persistent `localStorage` synchronization via `useEffect`
- [x] Comprehensive study guide on React Lists, Keys, and Immutability ([notes.md](./notes.md))
