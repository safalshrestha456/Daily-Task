# Day 12: Functional Components, Reusable Components & Props

## 🎯 Day 12 Overview & Objectives

In **Day 12**, we dive deeper into React's core modularity:
1. **Functional Components:** Writing modern, lightweight stateless and stateful components as pure JavaScript functions.
2. **Props (Properties):** Passing data down the component hierarchy via unidirectional data flow.
3. **Props Immutability:** Treating props as strictly read-only values.
4. **Destructuring & Default Values:** Clean parameter extraction `({ name, role = "Developer" })`.
5. **Component Composition:** Building an **Engineering Team Directory** with reusable `TeamCard` and `DepartmentFilter` components.

---

## 🏗️ Project Architecture & Components

```
Day-12/
├── package.json
├── vite.config.js
├── index.html
├── src/
│   ├── main.jsx                       # Concurrent root initialization
│   ├── App.jsx                        # Parent orchestrator with search & category state
│   ├── App.css                        # Page-level styles & controls toolbar
│   ├── index.css                      # Global design system & typography
│   ├── data/
│   │   └── teamMembers.js             # Realistic dataset of engineers & interns
│   └── components/
│       ├── TeamCard.jsx               # Reusable card component receiving props
│       ├── TeamCard.css               # Isolated card styles, ribbons & status dots
│       └── DepartmentFilter.jsx       # Reusable filter pills component
├── README.md
└── notes.md
```

---

## 🚀 How to Run Locally

```bash
cd Day-12
npm install
npm run dev
```

---

## 📌 Deliverables
- [x] Reusable `TeamCard` functional component with props destructuring ([TeamCard.jsx](./src/components/TeamCard.jsx))
- [x] Dynamic mapping of multiple cards from external dataset ([teamMembers.js](./src/data/teamMembers.js))
- [x] Reusable filter pills component receiving callbacks via props ([DepartmentFilter.jsx](./src/components/DepartmentFilter.jsx))
- [x] Real-time search by name, role, and skills ([App.jsx](./src/App.jsx))
- [x] Comprehensive Props & Functional Components cheatsheet ([notes.md](./notes.md))
