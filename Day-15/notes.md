# Day 15: React Lists, Keys & State Management Cheatsheet

## 1. Rendering Lists with `Array.prototype.map()`

In React, you render collections of data by mapping arrays into JSX elements:

```jsx
const items = ['React', 'FastAPI', 'GraphQL'];

return (
  <ul>
    {items.map((tech, index) => (
      <li key={tech}>{tech}</li>
    ))}
  </ul>
);
```

---

## 2. Why is the `key` Prop Mandatory?

React uses keys to track which items in a list have been changed, added, or removed.

### How Reconciliation Works with Keys:
```
Old List: [ A (key=1), B (key=2), C (key=3) ]
New List: [ D (key=4), A (key=1), B (key=2), C (key=3) ]
```
With unique keys, React knows that `A`, `B`, and `C` didn't change—only `D` was prepended! It only updates 1 DOM node instead of re-rendering all 4.

### ⚠️ Never Use Array Indexes as Keys!
```jsx
// ❌ DANGEROUS: Using index as key
{todos.map((todo, index) => (
  <TodoItem key={index} todo={todo} />
))}
```
**Why?** If you delete an item from the top or sort the list, the index of every item changes. React gets confused about which DOM nodes belong to which item, causing input state mismatches and visual glitches.

Always use a stable unique ID:
```jsx
// ✅ SAFE: Unique, permanent ID
{todos.map(todo => (
  <TodoItem key={todo.id} todo={todo} />
))}
```

---

## 3. Immutable Array Updates in React

React state must never be modified directly (`todos.push(newItem)` or `todos.splice(...)` will fail to trigger re-renders).

```jsx
// 1. ADD Item (Prepend to array):
setTodos(prev => [newTodo, ...prev]);

// 2. DELETE Item (Filter out ID):
setTodos(prev => prev.filter(item => item.id !== targetId));

// 3. UPDATE Item (Map through array):
setTodos(prev => prev.map(item => 
  item.id === targetId ? { ...item, completed: !item.completed } : item
));
```
