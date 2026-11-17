import React from 'react';

export default function Controls({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortChange,
  resultCount,
  totalCount,
}) {
  return (
    <div className="controls-bar">
      <div className="search-box">
        <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="Search by name, email, or company (debounced)..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button 
            className="clear-search-btn"
            onClick={() => onSearchChange('')}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <div className="filter-group">
        <div className="select-wrapper">
          <label htmlFor="status-select">Status:</label>
          <select
            id="status-select"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="control-select"
          >
            <option value="ALL">All Statuses</option>
            <option value="Active">Active Only</option>
            <option value="Away">Away</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        <div className="select-wrapper">
          <label htmlFor="sort-select">Sort By:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="control-select"
          >
            <option value="name-asc">Name (A → Z)</option>
            <option value="name-desc">Name (Z → A)</option>
            <option value="company-asc">Company (A → Z)</option>
            <option value="id-asc">ID (Ascending)</option>
          </select>
        </div>

        <div className="result-pill">
          Showing <strong>{resultCount}</strong> of <strong>{totalCount}</strong>
        </div>
      </div>
    </div>
  );
}
