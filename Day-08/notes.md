# Day 08: DOM Manipulation, Events & Dynamic Elements Tutorial

## 1. What is the DOM (Document Object Model)?
The DOM is an object-oriented representation of the web page. The browser parses your HTML markup into a tree structure of nodes (objects) that JavaScript can read, manipulate, add, or delete in real time.

```
                  Window
                    │
                 Document
                    │
                 <html>
                /      \
            <head>    <body>
             │         /    \
          <title>   <header> <main>
                               │
                              <ul>
                             /    \
                           <li>   <li>
```

---

## 2. Selecting Elements from the DOM

```javascript
// 1. By ID (Fastest, returns single element)
const form = document.getElementById("todo-form");

// 2. By CSS Selector (Flexible, returns first matching element)
const input = document.querySelector("#todo-input");
const firstItem = document.querySelector(".todo-item");

// 3. By CSS Selector (Returns a NodeList of ALL matching elements)
const filterButtons = document.querySelectorAll(".filter-btn");

// Iterating over NodeList:
filterButtons.forEach(btn => {
  console.log(btn.dataset.filter);
});
```

---

## 3. Creating & Appending Dynamic Elements

Never build HTML purely with fragile string concatenation like `container.innerHTML += '<li>...'`. Instead, use standard DOM methods:

```javascript
// 1. Create a new element
const li = document.createElement("li");

// 2. Add classes and attributes
li.className = "todo-item active";
li.setAttribute("data-id", "task-101");

// 3. Set text content safely (prevents XSS vulnerabilities)
li.innerText = "Study React useEffect";

// 4. Create child elements
const deleteBtn = document.createElement("button");
deleteBtn.innerText = "Delete";

// 5. Append children
li.append(deleteBtn);

// 6. Append to parent tree
document.getElementById("todo-list").appendChild(li);
```

---

## 4. Events & Event Listeners

An event is any interaction or occurrence on the page: a click, keypress, form submit, scroll, or resize.

```javascript
// Syntax: targetElement.addEventListener(eventType, callbackFunction)

// Example 1: Click event
button.addEventListener("click", (event) => {
  console.log("Button clicked!");
});

// Example 2: Form submit (Always prevent default refresh!)
form.addEventListener("submit", (event) => {
  event.preventDefault(); // STOPS browser from reloading the page
  const value = input.value;
});

// Example 3: Keyboard event
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    console.log("Enter key was pressed!");
  }
});
```

---

## 5. Event Delegation (Crucial Concept!)

### The Problem:
If you have 100 todo items and you attach `.addEventListener("click", ...)` to each delete button, you create 100 individual event listeners in memory. When you add a new item dynamically, you have to remember to attach another event listener to it!

### The Solution: Event Delegation
Because of **Event Bubbling** (events travel up the DOM tree from child to parent), you attach **ONE single listener** to the parent container (`<ul>`):

```javascript
const todoList = document.getElementById("todo-list");

todoList.addEventListener("click", (e) => {
  // e.target is the exact element that was clicked
  if (e.target.dataset.action === "delete") {
    // Find the closest parent <li>
    const li = e.target.closest(".todo-item");
    const taskId = li.dataset.id;
    
    // Remove from array and re-render
    deleteTask(taskId);
  }
});
```

---

## 6. Persisting Data in `localStorage`

`localStorage` allows web applications to store key-value strings in the browser across sessions.

```javascript
// Saving an array/object:
const tasks = [{ id: 1, text: "Code" }];
localStorage.setItem("my_tasks", JSON.stringify(tasks));

// Retrieving:
const saved = localStorage.getItem("my_tasks");
if (saved) {
  const loadedTasks = JSON.parse(saved);
}

// Clearing:
localStorage.removeItem("my_tasks");
```
