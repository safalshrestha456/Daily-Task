# Day 08: Vanilla JavaScript Todo Application

## 🎯 Day 08 Overview & Objectives

In **Day 08**, we take our JavaScript foundation into the browser to interact with the **Document Object Model (DOM)**. The core goal of Day 08 is building a complete, interactive **Vanilla JavaScript Todo Application** without external libraries or frameworks (no React, no jQuery).

---

## 📑 Core Concepts Learned & Implemented

1. **DOM Selection:**
   - `document.getElementById('todo-form')`
   - `document.querySelectorAll('.filter-btn')`
   - `element.querySelector('.todo-text')`
2. **Dynamic Element Creation & Mutation:**
   - `document.createElement('li')`
   - Setting properties: `element.className`, `element.innerText`, `element.dataset.id`
   - Assembling children: `parent.append(child1, child2)`, `todoList.appendChild(li)`
   - Inline replacement: `textSpan.replaceWith(input)`
3. **Event Listeners & Event Handling:**
   - Form submission: `todoForm.addEventListener('submit', (e) => { e.preventDefault(); ... })`
   - Keyboard events: `input.addEventListener('keydown', (e) => { if (e.key === 'Enter') ... })`
   - Focus/Blur events: `input.addEventListener('blur', ...)`
4. **Event Delegation (Industry Standard Pattern):**
   - Instead of attaching individual event listeners to hundreds of dynamically created buttons, we attach **one single listener** to the parent container `<ul id="todo-list">`.
   - We check `e.target.dataset.action` and use `e.target.closest('.todo-item')` to identify which task was clicked!
5. **State Management & LocalStorage Persistence:**
   - Tasks are stored in a JavaScript array `todos = [...]`.
   - Changes automatically synchronize to browser `localStorage` with `JSON.stringify()`.
   - On page refresh, tasks load seamlessly with `JSON.parse()`.

---

## 🛠️ Application Features

- **Add New Tasks:** Type a task description, choose a priority (High, Medium, Low), and hit Add or press Enter.
- **Toggle Completion:** Click the custom checkbox to toggle strike-through styling and completion state.
- **Inline Editing:** Click the ✏️ pencil icon to edit any task directly inline; press Enter to save or Escape to cancel.
- **Delete Tasks:** Click the 🗑️ trash icon to remove a task.
- **Filter Tabs:** Toggle between All, Active, and Completed tasks with live count badges.
- **Clear Completed:** Bulk removes all completed items with a confirmation prompt.
- **Empty State:** Clean, friendly placeholder when no tasks match the filter.
- **LocalStorage Synced:** Data stays saved even after restarting the browser.

---

## 🚀 How to Run Locally

Open [`index.html`](./index.html) in your browser:
```bash
# On Windows PowerShell
cd Day-08
Start-Process index.html
```

---

## 📌 Deliverables
- [x] Responsive Vanilla JavaScript Todo application ([index.html](./index.html))
- [x] Dark-mode styling with interactive states ([styles.css](./styles.css))
- [x] Clean modular JavaScript with event delegation and LocalStorage ([app.js](./app.js))
- [x] Comprehensive tutorial & cheatsheet notes ([notes.md](./notes.md))
