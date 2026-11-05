# Day 14: React Controlled Forms & Validation Reference

## 1. Controlled vs Uncontrolled Components

| Feature | Controlled Component (Recommended) | Uncontrolled Component |
|---|---|---|
| **Data Authority** | React State (`useState`) | Browser DOM |
| **Value Binding** | `value={state}` | `defaultValue="foo"` |
| **Event Binding** | `onChange={(e) => setState(e.target.value)}` | `ref={inputRef}` |
| **Instant Validation** | ✅ Trivial (evaluated on every keystroke) | ❌ Difficult (must query DOM ref) |
| **Dynamic Form Control** | ✅ Effortless (can disable buttons, format text) | ❌ Requires manual DOM manipulation |

---

## 2. Managing Multi-Input Forms with a Single Handler

Instead of creating 10 individual `useState` hooks and 10 change handlers:
```jsx
// ❌ Redundant & tedious:
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
```

Use a **single unified state object**:
```jsx
// ✅ Clean & professional:
const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  acceptedTerms: false
});

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value
  }));
};
```

---

## 3. The `touched` State Pattern for UX

Beginners often show error messages immediately when the page loads, frustrating users.
The industry solution is **tracking touched status**:

```jsx
const [touched, setTouched] = useState({});

const handleBlur = (e) => {
  setTouched(prev => ({ ...prev, [e.target.name]: true }));
};

// In JSX: Only render error if the field was visited!
{touched.email && errors.email && (
  <span className="error-text">{errors.email}</span>
)}
```
