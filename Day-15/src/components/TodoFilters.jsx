import React from 'react';

/**
 * Filter Tabs and Batch Actions Component
 * Demonstrates passing state & count props to filter buttons
 */
function TodoFilters({
  activeFilter = 'all',
  onFilterChange = () => {},
  counts = { all: 0, active: 0, completed: 0 },
  onClearCompleted = () => {}
}) {
  const tabs = [
    { key: 'all', label: 'All', count: counts.all },
    { key: 'active', label: 'Active', count: counts.active },
    { key: 'completed', label: 'Completed', count: counts.completed }
  ];

  return (
    <div className="todo-toolbar">
      <div className="filter-pills-list">
        {tabs.map(tab => (
          <button
            key={tab.key}
            type="button"
            className={`filter-btn ${activeFilter === tab.key ? 'is-active' : ''}`}
            onClick={() => onFilterChange(tab.key)}
          >
            {tab.label} <span className="tab-badge">{tab.count}</span>
          </button>
        ))}
      </div>

      {counts.completed > 0 && (
        <button
          type="button"
          className="btn-clear-completed"
          onClick={onClearCompleted}
        >
          Clear Completed ({counts.completed})
        </button>
      )}
    </div>
  );
}

export default TodoFilters;
