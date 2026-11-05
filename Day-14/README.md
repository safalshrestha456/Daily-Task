# Day 14: Controlled Forms, Form State & Validation in React

## 🎯 Day 14 Overview & Objectives

In **Day 14**, we master forms in React through the **Controlled Components** paradigm:
1. **Controlled vs Uncontrolled Inputs:** Binding `<input value={state} onChange={handleChange} />` so React state acts as the single source of truth.
2. **Unified Form State:** Storing complex forms with multiple inputs (`text`, `email`, `tel`, `select`, `radio`, `checkbox`) inside a single state object using dynamic computed property names `[e.target.name]: value`.
3. **UX & Touched States:** Tracking which inputs have been visited (`touched[field]`) to avoid showing noisy errors before the user even finishes typing.
4. **Validation Logic:** Comprehensive field validation rules with custom error messages.
5. **Assignment:** Build an interactive, production-ready **React Registration Form** with dynamic password strength evaluation, live state inspection, and submission feedback.

---

## 🏗️ Project Architecture & Components

```
Day-14/
├── package.json
├── vite.config.js
├── index.html
├── src/
│   ├── main.jsx                       # React 18 createRoot mount
│   ├── App.jsx                        # Layout orchestrator & live state inspector
│   ├── App.css                        # Layout grid & guide styling
│   ├── index.css                      # Global design system
│   └── components/
│       ├── RegistrationForm.jsx       # Controlled form component with unified state & validation
│       └── RegistrationForm.css       # Form inputs, error states, and strength bar
├── README.md
└── notes.md
```

---

## 🚀 How to Run Locally

```bash
cd Day-14
npm install
npm run dev
```

---

## 📌 Deliverables
- [x] Controlled registration form with unified state (`formData`) ([RegistrationForm.jsx](./src/components/RegistrationForm.jsx))
- [x] Multi-field input handling using computed property syntax `[name]: value`
- [x] Real-time validation with polite `touched` state tracking ([RegistrationForm.css](./src/components/RegistrationForm.css))
- [x] Dynamic password strength meter & show/hide toggle
- [x] Live state inspector and simulated submission state ([App.jsx](./src/App.jsx))
- [x] Comprehensive Controlled Forms cheatsheet ([notes.md](./notes.md))
