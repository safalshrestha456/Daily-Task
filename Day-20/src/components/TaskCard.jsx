// ============================================================================
// Component: TaskCard
// Purpose: Interactive task item with status dropdown, priority badge, & actions
// ============================================================================

import React from 'react';
import { useTasks } from '../context/TaskContext.jsx';

export default function TaskCard({ task, onEdit }) {
  const { updateStatus, deleteTask } = useTasks();

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'URGENT':
        return { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', icon: '🔥' };
      case 'HIGH':
        return { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', icon: '⚡' };
      case 'MEDIUM':
        return { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', icon: '📌' };
      default:
        return { bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981', icon: '🌱' };
    }
  };

  const priorityStyle = getPriorityStyle(task.priority);

  return (
    <div className={`task-card status-${task.status.toLowerCase()}`}>
      <div className="task-card-header">
        <span className="task-id">{task.id}</span>
        
        {/* Priority Badge */}
        <span
          className="priority-badge"
          style={{
            backgroundColor: priorityStyle.bg,
            color: priorityStyle.color,
          }}
        >
          <span>{priorityStyle.icon}</span>
          <span>{task.priority}</span>
        </span>
      </div>

      <h4 className="task-title">{task.title}</h4>
      <p className="task-description">{task.description}</p>

      {/* Task Metadata: Due Date & Assignee */}
      <div className="task-meta-row">
        <span className="task-due-date" title={`Due: ${task.dueDate}`}>
          📅 {task.dueDate}
        </span>
        <span className="task-assignee" title={`Assigned to ${task.assignedTo}`}>
          👤 {task.assignedTo}
        </span>
      </div>

      {/* Card Action Footer */}
      <div className="task-card-footer">
        <select
          className="task-status-select"
          value={task.status}
          onChange={(e) => updateStatus(task.id, e.target.value)}
          aria-label="Change status"
        >
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <div className="card-actions">
          <button
            type="button"
            className="action-icon-btn edit"
            onClick={() => onEdit(task)}
            title="Edit task"
            aria-label="Edit task"
          >
            ✏️
          </button>
          <button
            type="button"
            className="action-icon-btn delete"
            onClick={() => {
              if (window.confirm(`Delete task "${task.title}"?`)) {
                deleteTask(task.id);
              }
            }}
            title="Delete task"
            aria-label="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
