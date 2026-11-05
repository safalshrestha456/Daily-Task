import React, { useState } from 'react';

/**
 * Todo Creation Form Component
 * Demonstrates controlled input and passing new task to parent
 */
function TodoForm({ onAddTask = () => {} }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    onAddTask({
      id: `task-${Date.now()}`,
      text: trimmed,
      priority,
      completed: false,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    setText('');
    setPriority('medium');
  };

  return (
    <form className="todo-input-form" onSubmit={handleSubmit}>
      <div className="input-flex-wrap">
        <input
          type="text"
          className="todo-main-input"
          placeholder="Add a new task for today (e.g. Master React Lists & Keys)..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />

        <select 
          className="priority-selector"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          title="Select task priority"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>

      <button type="submit" className="btn-add-todo">
        <span>+</span> Add Task
      </button>
    </form>
  );
}

export default TodoForm;
