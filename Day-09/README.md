# Day 09: Form Handling, Regex Validation & Error Display

## 🎯 Day 09 Overview & Objectives

In **Day 09**, we continue **Week 2: JavaScript Foundation**. The core objectives focus on mastering:
1. **Form Handling:** Intercepting form submission with `event.preventDefault()`, reading values from different input types (`text`, `email`, `tel`, `password`, `select`, `radio`, `checkbox`).
2. **Regular Expressions (Regex):** Crafting precise patterns for names, usernames, emails, international phone numbers, and strict password security rules.
3. **Dynamic Error Display & UX:** Showing instant inline validation on `input` and `blur` events, adding visual feedback classes (`.success`, `.error`), and shake animations on failed validations.
4. **Password Strength Meter:** Evaluating password complexity across 5 criteria (length, uppercase, lowercase, numbers, special characters) with a reactive progress bar.
5. **State Aggregation:** Tracking multi-field validity and serializing the verified payload to a JSON preview.

---

## 🛠️ Assignment Implementation

- **Fields Validated:**
  - **Full Name:** 3-50 alphabetic characters (`/^[a-zA-Z\s]{3,50}$/`)
  - **Username:** Alphanumeric and underscores, must start with a letter (`/^[a-zA-Z][a-zA-Z0-9_]{2,19}$/`)
  - **Email:** Standard RFC-compliant email pattern (`/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`)
  - **Phone:** Nepal & international formats (`/^(?:\+977[- ]?)?(?:98|97)\d{8}$/`)
  - **Password:** Minimum 8 characters with at least 1 uppercase, 1 lowercase, 1 digit, and 1 special symbol
  - **Confirm Password:** Strict equality match with Password
  - **Internship Track:** Required select dropdown choice
  - **Gender:** Radio button group selection
  - **Terms & Conditions:** Compulsory boolean checkbox
- **Interactive Extras:**
  - Password show/hide toggle buttons
  - Real-time password requirement checklist
  - Live JSON preview panel
  - Valid field counter (`0 / 8`)

---

## 📂 Project Structure

```
Day-09/
├── validation.js    # Core regex patterns & validation logic (reusable & testable)
├── index.html       # Full registration page with responsive 2-column layout
├── styles.css       # Dark-mode styling, shake animations, and meter indicators
├── app.js           # Real-time event listeners and DOM feedback binding
├── README.md        # Assignment documentation
└── notes.md         # Comprehensive Regex & form handling cheatsheet
```

---

## 🚀 How to Run Locally

Open `index.html` in your browser:
```bash
# On Windows PowerShell
cd Day-09
Start-Process index.html
```

---

## 📌 Deliverables
- [x] Production-ready registration form with accessible markup ([index.html](./index.html))
- [x] Modular validation library with strict regex patterns ([validation.js](./validation.js))
- [x] Real-time visual feedback, shake animations, and status indicators ([styles.css](./styles.css))
- [x] Dynamic password strength meter & JSON output serialization ([app.js](./app.js))
- [x] Comprehensive Regex cheatsheet ([notes.md](./notes.md))
