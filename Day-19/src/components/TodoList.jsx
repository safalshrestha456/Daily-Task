// ============================================================================
// Component: TodoList
// Purpose: Interactive task manager demonstrating list rendering, state mutations,
//          filtering, and accessibility attributes for React Testing Library.
// ============================================================================

import React, { useState } from 'react';
import Button from './Button.jsx';

/**
 * TodoList Component
 *
 * @param {Object} props
 * @param {Array} props.initialTodos - Optional initial list of todos for testing
 */
export default function TodoList({ initialTodos = [] }) {
  // State for the list of todo items
  const [todos, setTodos] = useState(initialTodos);

  // State for the new task input field
  const [newTodoText, setNewTodoText] = useState('');

  // Active filter: 'ALL' | 'ACTIVE' | 'COMPLETED'
  const [filter, setFilter] = useState('ALL');

  /**
   * Add a new task to the list
   * @param {React.FormEvent} e
   */
  const handleAddTodo = (e) => {
    e.preventDefault();
    const trimmed = newTodoText.trim();
    if (!trimmed) return;

    const newTodo = {
      id: Date.now().toString(),
      text: trimmed,
      completed: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setNewTodoText('');
  };

  /**
   * Toggle completion status of a task
   * @param {string} id
   */
  const handleToggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  /**
   * Delete a task from the list
   * @param {string} id
   */
  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // Compute filtered todos based on the active filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'ACTIVE') return !todo.completed;
    if (filter === 'COMPLETED') return todo.completed;
    return true; // 'ALL'
  });

  // Calculate remaining active tasks
  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="todo-container" data-testid="todo-container">
      <div className="todo-header">
        <h3 className="todo-title">Task Checklist</h3>
        <span className="todo-counter" data-testid="todo-count">
          {activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining
        </span>
      </div>

      {/* Task Creation Form */}
      <form onSubmit={handleAddTodo} className="todo-add-form" data-testid="todo-form">
        <input
          type="text"
          className="todo-input"
          placeholder="What needs to be tested today?"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          aria-label="New task description"
          data-testid="todo-input"
        />
        <Button
          type="submit"
          variant="primary"
          disabled={!newTodoText.trim()}
          data-testid="add-todo-button"
        >
          Add Task
        </Button>
      </form>

      {/* Filter Tabs */}
      <div className="todo-filters" role="tablist">
        {['ALL', 'ACTIVE', 'COMPLETED'].map((f) => (
          <button
            key={f}
            type="button"
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
            data-testid={`filter-${f.toLowerCase()}`}
            aria-selected={filter === f}
          >
            {f.charAt(0) + f.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Todo Items List or Empty State */}
      {filteredTodos.length === 0 ? (
        <div className="todo-empty-state" data-testid="empty-state">
          <span className="empty-icon">📝</span>
          <p className="empty-text">No tasks found for this filter.</p>
        </div>
      ) : (
        <ul className="todo-list" data-testid="todo-list">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
              data-testid={`todo-item-${todo.id}`}
            >
              <label className="todo-label">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                  aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                  data-testid={`todo-checkbox-${todo.id}`}
                />
                <span className="todo-text">{todo.text}</span>
              </label>

              <button
                type="button"
                className="delete-todo-btn"
                onClick={() => handleDeleteTodo(todo.id)}
                aria-label={`Delete task "${todo.text}"`}
                data-testid={`delete-button-${todo.id}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
