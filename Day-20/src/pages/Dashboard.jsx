// ============================================================================
// Page: Dashboard (Kanban Task Board & Metrics)
// ============================================================================

import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext.jsx';
import TaskCard from '../components/TaskCard.jsx';
import TaskModal from '../components/TaskModal.jsx';

export default function Dashboard() {
  const {
    filteredTasks,
    metrics,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    resetToDefaults,
  } = useTasks();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Group filtered tasks by status for Kanban columns
  const todoTasks = filteredTasks.filter((t) => t.status === 'TODO');
  const inProgressTasks = filteredTasks.filter((t) => t.status === 'IN_PROGRESS');
  const completedTasks = filteredTasks.filter((t) => t.status === 'COMPLETED');

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleCreateNew = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  return (
    <div className="dashboard-page">
      {/* Metrics Row */}
      <div className="metrics-row">
        <div className="metric-box">
          <div className="metric-icon-wrap total">📋</div>
          <div>
            <span className="metric-number">{metrics.total}</span>
            <span className="metric-title">Total Tasks</span>
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-icon-wrap progress">⏳</div>
          <div>
            <span className="metric-number">{metrics.inProgress}</span>
            <span className="metric-title">In Progress</span>
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-icon-wrap completed">✓</div>
          <div>
            <span className="metric-number">{metrics.completed}</span>
            <span className="metric-title">Completed</span>
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-icon-wrap velocity">⚡</div>
          <div>
            <span className="metric-number">{metrics.completionRate}%</span>
            <span className="metric-title">Velocity Rate</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-toolbar">
        <div className="search-input-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-field"
            placeholder="Search by title, description or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => setSearchQuery('')}>
              ✕
            </button>
          )}
        </div>

        <div className="filter-dropdowns">
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>

          <select
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="ALL">All Priorities</option>
            <option value="URGENT">Urgent Only</option>
            <option value="HIGH">High Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="LOW">Low Priority</option>
          </select>

          <button className="btn-reset" onClick={resetToDefaults} title="Restore demo tasks">
            ↻ Reset
          </button>

          <button className="btn-add-primary" onClick={handleCreateNew}>
            + Add Task
          </button>
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="kanban-board">
        {/* Column 1: To Do */}
        <div className="kanban-column">
          <div className="column-header todo">
            <span className="col-title">To Do</span>
            <span className="col-count">{todoTasks.length}</span>
          </div>
          <div className="column-cards">
            {todoTasks.length === 0 ? (
              <div className="empty-col">No tasks in backlog</div>
            ) : (
              todoTasks.map((task) => (
                <TaskCard key={task.id} task={task} onEdit={handleEditTask} />
              ))
            )}
          </div>
        </div>

        {/* Column 2: In Progress */}
        <div className="kanban-column">
          <div className="column-header progress">
            <span className="col-title">In Progress</span>
            <span className="col-count">{inProgressTasks.length}</span>
          </div>
          <div className="column-cards">
            {inProgressTasks.length === 0 ? (
              <div className="empty-col">No tasks currently in progress</div>
            ) : (
              inProgressTasks.map((task) => (
                <TaskCard key={task.id} task={task} onEdit={handleEditTask} />
              ))
            )}
          </div>
        </div>

        {/* Column 3: Completed */}
        <div className="kanban-column">
          <div className="column-header completed">
            <span className="col-title">Completed</span>
            <span className="col-count">{completedTasks.length}</span>
          </div>
          <div className="column-cards">
            {completedTasks.length === 0 ? (
              <div className="empty-col">No completed tasks yet</div>
            ) : (
              completedTasks.map((task) => (
                <TaskCard key={task.id} task={task} onEdit={handleEditTask} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Create / Edit Modal Dialog */}
      {isModalOpen && (
        <TaskModal
          taskToEdit={taskToEdit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
