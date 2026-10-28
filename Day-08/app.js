/**
 * Day 08: Vanilla JavaScript Todo Application
 * Topics: DOM Manipulation, Event Listeners, Dynamic Elements & LocalStorage
 * Author: Safal Shrestha - Full Stack Developer Intern
 */

// ============================================================================
// 1. APPLICATION STATE
// ============================================================================
// Array of task objects: { id: string, text: string, priority: "low"|"medium"|"high", completed: boolean }
let todos = [];
let currentFilter = "all"; // "all" | "active" | "completed"

// ============================================================================
// 2. DOM ELEMENT REFERENCES (Selecting Elements from the DOM)
// ============================================================================
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const prioritySelect = document.getElementById("todo-priority");
const todoList = document.getElementById("todo-list");
const emptyState = document.getElementById("empty-state");
const itemsLeft = document.getElementById("items-left");
const filterButtons = document.querySelectorAll(".filter-btn");
const clearCompletedBtn = document.getElementById("clear-completed-btn");

const countAll = document.getElementById("count-all");
const countActive = document.getElementById("count-active");
const countCompleted = document.getElementById("count-completed");

// ============================================================================
// 3. LOCAL STORAGE PERSISTENCE (Load & Save)
// ============================================================================
const STORAGE_KEY = "day08_vanilla_todos";

/**
 * Loads saved tasks from the browser's localStorage
 */
function loadTodos() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      todos = JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse localStorage data", e);
      todos = [];
    }
  } else {
    // Initial educational default tasks
    todos = [
      { id: "task-1", text: "Learn DOM tree selection methods", priority: "high", completed: true },
      { id: "task-2", text: "Practice document.createElement() and append()", priority: "high", completed: true },
      { id: "task-3", text: "Understand event bubbling and event delegation", priority: "medium", completed: false },
      { id: "task-4", text: "Store state changes in localStorage", priority: "medium", completed: false },
      { id: "task-5", text: "Review Day 08 code with intern tutor", priority: "low", completed: false }
    ];
    saveTodos();
  }
}

/**
 * Serializes and saves current todos array to localStorage
 */
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// ============================================================================
// 4. RENDERING & DOM MANIPULATION (Creating & Appending Elements)
// ============================================================================

/**
 * Main render function: Clears existing list and re-builds DOM elements dynamically
 */
function renderTodos() {
  // 1. Clear the container element (DOM Mutation)
  todoList.innerHTML = "";

  // 2. Filter the tasks according to the active filter tab
  const filteredTodos = todos.filter(todo => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true; // "all"
  });

  // 3. Toggle Empty State view
  if (filteredTodos.length === 0) {
    emptyState.classList.add("active");
  } else {
    emptyState.classList.remove("active");
  }

  // 4. Create and Append dynamic DOM elements for each task
  filteredTodos.forEach(todo => {
    // Create the outer <li> element using document.createElement()
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;
    li.dataset.id = todo.id; // Store id in data-attribute

    // Create custom checkbox button
    const checkbox = document.createElement("button");
    checkbox.className = "custom-checkbox";
    checkbox.setAttribute("aria-label", "Toggle task complete");
    checkbox.dataset.action = "toggle";

    // Create task text span
    const textSpan = document.createElement("span");
    textSpan.className = "todo-text";
    textSpan.innerText = todo.text;

    // Create priority badge
    const badge = document.createElement("span");
    badge.className = `badge-priority priority-${todo.priority}`;
    badge.innerText = todo.priority;

    // Create actions container (Edit & Delete buttons)
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "todo-actions";

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.className = "action-btn edit-btn";
    editBtn.innerHTML = "✏️";
    editBtn.title = "Edit task title";
    editBtn.dataset.action = "edit";

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "action-btn delete-btn";
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.title = "Delete task";
    deleteBtn.dataset.action = "delete";

    actionsDiv.append(editBtn, deleteBtn);

    // Assemble everything into the <li> element using .append()
    li.append(checkbox, textSpan, badge, actionsDiv);

    // Append <li> to the parent <ul>
    todoList.appendChild(li);
  });

  // 5. Update footer stats and badges
  updateStats();
}

/**
 * Updates task counters in the toolbar and footer
 */
function updateStats() {
  const total = todos.length;
  const active = todos.filter(t => !t.completed).length;
  const completed = total - active;

  countAll.innerText = total;
  countActive.innerText = active;
  countCompleted.innerText = completed;

  itemsLeft.innerText = `${active} item${active === 1 ? "" : "s"} remaining`;
}

// ============================================================================
// 5. EVENT LISTENERS & EVENT DELEGATION
// ============================================================================

/**
 * EVENT 1: Form Submit to Add New Task
 * Uses e.preventDefault() to stop page reload!
 */
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = todoInput.value.trim();
  const priority = prioritySelect.value;

  if (!text) return;

  // Create new task object
  const newTask = {
    id: `task-${Date.now()}`,
    text: text,
    priority: priority,
    completed: false
  };

  // Add to state at the top
  todos.unshift(newTask);
  saveTodos();
  renderTodos();

  // Reset form inputs & focus back
  todoInput.value = "";
  prioritySelect.value = "medium";
  todoInput.focus();
});

/**
 * EVENT 2: Event Delegation on the Parent <ul>
 * Rather than attaching separate event listeners to every single button on every row,
 * we attach ONE single listener to the parent container <ul id="todo-list">!
 */
todoList.addEventListener("click", (e) => {
  // Find which button or element was clicked
  const target = e.target;
  const action = target.dataset.action;
  
  // Find the closest parent <li> that contains the data-id
  const li = target.closest(".todo-item");
  if (!li) return;
  const taskId = li.dataset.id;

  // ACTION: Toggle Completion
  if (action === "toggle") {
    todos = todos.map(t => {
      if (t.id === taskId) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    saveTodos();
    renderTodos();
  }

  // ACTION: Delete Task
  else if (action === "delete") {
    // Remove element from DOM with a quick animation or filter
    todos = todos.filter(t => t.id !== taskId);
    saveTodos();
    renderTodos();
  }

  // ACTION: Edit Task
  else if (action === "edit") {
    enableInlineEditing(li, taskId);
  }
});

/**
 * Demonstrates inline DOM replacement for editing a task
 * Replaces the <span> with an <input> element dynamically!
 */
function enableInlineEditing(liElement, taskId) {
  const currentTask = todos.find(t => t.id === taskId);
  if (!currentTask) return;

  const textSpan = liElement.querySelector(".todo-text");
  if (!textSpan) return;

  // Create an editable input element
  const input = document.createElement("input");
  input.type = "text";
  input.className = "todo-edit-input";
  input.value = currentTask.text;

  // Replace textSpan with input element in the DOM
  textSpan.replaceWith(input);
  input.focus();

  // Function to save edit changes
  const saveEdit = () => {
    const newText = input.value.trim();
    if (newText) {
      currentTask.text = newText;
      saveTodos();
    }
    renderTodos();
  };

  // Listen for Enter key or Blur (clicking outside)
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      renderTodos(); // cancel edit
    }
  });

  input.addEventListener("blur", saveEdit);
}

/**
 * EVENT 3: Filter Tab Buttons
 */
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTodos();
  });
});

/**
 * EVENT 4: Clear Completed Tasks
 */
clearCompletedBtn.addEventListener("click", () => {
  const completedCount = todos.filter(t => t.completed).length;
  if (completedCount === 0) return;

  if (confirm(`Remove all ${completedCount} completed task(s)?`)) {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    renderTodos();
  }
});

// ============================================================================
// 6. INITIALIZATION ON PAGE LOAD
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadTodos();
  renderTodos();
});
