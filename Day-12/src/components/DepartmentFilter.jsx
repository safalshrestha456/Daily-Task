import React from 'react';

/**
 * Reusable Department Filter Pills Component
 * Demonstrates passing callbacks and active state via props
 */
function DepartmentFilter({
  departments = [],
  activeDepartment = "All",
  onSelectDepartment = () => {}
}) {
  return (
    <div className="filter-pill-container">
      {departments.map((dept) => (
        <button
          key={dept}
          className={`filter-pill-btn ${activeDepartment === dept ? 'active' : ''}`}
          onClick={() => onSelectDepartment(dept)}
        >
          {dept}
        </button>
      ))}
    </div>
  );
}

export default DepartmentFilter;
