import React, { useState } from 'react';
import './TodoItem.css';

/**
 * Reusable Todo Item Row Component
 * Demonstrates:
 * 1. Props consumption (todo item, callbacks: onToggle, onDelete, onEdit)
 * 2. Inline editing with local React state
 * 3. Conditional classNames based on completion
 * 4. Priority badges
 */
function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSaveEdit = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    } else {
      setEditText(todo.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className={`todo-item-row ${todo.completed ? 'is-completed' : ''}`}>
      {/* Checkbox button */}
      <button
        type="button"
        className="todo-checkbox-btn"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? "Mark task active" : "Mark task completed"}
      >
        {todo.completed && <span className="check-mark">✓</span>}
      </button>

      {/* Task text or Inline Edit input */}
      <div className="todo-content-col">
        {isEditing ? (
          <input
            type="text"
            className="todo-edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span 
            className="todo-text" 
            onDoubleClick={() => setIsEditing(true)}
            title="Double click to edit"
          >
            {todo.text}
          </span>
        )}

        <div className="todo-meta-tags">
          <span className={`priority-tag priority-${todo.priority}`}>
            {todo.priority}
          </span>
          <span className="timestamp-tag">{todo.createdAt}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="todo-actions-group">
        <button
          type="button"
          className="action-icon-btn"
          onClick={() => setIsEditing(prev => !prev)}
          title="Edit task text"
        >
          ✏️
        </button>
        <button
          type="button"
          className="action-icon-btn delete-btn"
          onClick={() => onDelete(todo.id)}
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
