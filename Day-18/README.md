# Day 18: Context API, Auth State, Prop Drilling & State Management Basics

## 🎯 Day 18 Overview & Objectives

In **Day 18**, we explore enterprise React application state management by building **ContextAuth Guard**, a centralized authentication and Role-Based Access Control (RBAC) portal:

1. **The Prop Drilling Problem:**
   - Why passing authentication tokens, user payloads, and logout handlers through 4–5 layers of intermediate components leads to fragile, hard-to-maintain codebases.
2. **React Context API Architecture:**
   - Creating context stores via `createContext()`.
   - Distributing global state via `<Context.Provider value={...}>`.
   - Writing custom hook consumers (`useAuth()`) to consume context cleanly with runtime validation.
3. **Authentication State Lifecycle:**
   - Tracking `user`, `token` (mock JWT), and `isAuthenticated`.
   - Persisting user sessions to browser `localStorage` across page reloads.
   - Synchronous and asynchronous authentication with error messaging and loading feedback.
4. **Role-Based Access Control (RBAC):**
   - Granular permission checking (`hasPermission(perm)`).
   - Three preconfigured personas:
     - **Admin (Sarah Connor):** Full administrative privileges, database truncate, user provisioning.
     - **Developer (Alex Rivera):** Staging deployments, commit access, API secret generation.
     - **Editor (Maya Lin):** Technical documentation publishing, content reviews, and community feedback.
5. **Real-Time Audit Telemetry:**
   - Centralized event logging stream (`ActivityLog`) capturing auth events, profile updates, and security violations.

---

## 🏗️ Project Architecture & Components

```
Day-18/
├── package.json
├── vite.config.js
├── index.html
├── src/
│   ├── main.jsx                       # App mount wrapped with <AuthProvider>
│   ├── App.jsx                        # Root coordinator, guest view & persona selector
│   ├── App.css                        # Global layout & comparison styling
│   ├── index.css                      # Design system tokens & typography
│   ├── data/
│   │   └── mockPersonas.js            # Admin, Developer, and Editor test personas
│   ├── context/
│   │   └── AuthContext.jsx            # Central Auth store, login/logout, RBAC & useAuth hook
│   └── components/
│       ├── Navbar.jsx                 # Header with user avatar, role chip & persona switcher
│       ├── LoginForm.jsx              # Modal supporting 1-click test login & manual forms
│       ├── RoleBadge.jsx              # Color-coded badge for Admin, Developer, Editor
│       ├── DashboardView.jsx          # Protected views, permissions matrix & action triggers
│       ├── ActivityLog.jsx            # Real-time event and security audit terminal
│       └── AuthSystem.css             # Component styling & animations
├── README.md
└── notes.md
```

---

## 🚀 How to Run Locally

```bash
cd Day-18
npm install
npm run dev
```

Visit `http://localhost:5173` to explore:
- **Instant Persona Testing:** Click any of the 3 test roles on the landing page (Admin, Developer, Editor) or open the Sign In modal.
- **Granular Permissions Matrix:** Inspect the live checklist of granted and restricted permissions for the active role.
- **Interactive Role Actions:**
  - Click "Deploy to Production" or "Truncate Main Database" as an Admin: Observe granted confirmation.
  - Switch to Editor using the top navigation dropdown: Try the same "Deploy" button to see the security violation alert!
- **State Mutation Without Prop Drilling:** Click "Edit Profile", change your name or title, and click Save. Notice how your name updates simultaneously in the Navbar, welcome banner, and audit log without passing a single prop.

---

## 📌 Deliverables
- [x] Full Context API Authentication System ([AuthContext.jsx](./src/context/AuthContext.jsx))
- [x] Custom hook `useAuth` eliminating prop drilling
- [x] Role-Based Access Control (RBAC) matrix for Admin, Developer, and Editor
- [x] Persistent session storage in `localStorage`
- [x] Interactive action testing with real-time audit stream ([ActivityLog.jsx](./src/components/ActivityLog.jsx))
- [x] Comprehensive conceptual study guide on Context API and State Management ([notes.md](./notes.md))
