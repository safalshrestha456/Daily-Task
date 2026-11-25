// ============================================================================
// Component: Sidebar
// Purpose: Left-hand navigation sidebar with live route indicators
// ============================================================================

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTasks } from '../context/TaskContext.jsx';

export default function Sidebar() {
  const { metrics } = useTasks();

  const navItems = [
    { to: '/', label: 'Board & Tasks', icon: '📋', count: metrics.total },
    { to: '/analytics', label: 'Sprint Analytics', icon: '📊', count: `${metrics.completionRate}%` },
  ];

  return (
    <aside className="app-sidebar">
      <div className="sidebar-section">
        <span className="sidebar-heading">Workspace Views</span>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
              end={item.to === '/'}
            >
              <span className="link-icon">{item.icon}</span>
              <span className="link-label">{item.label}</span>
              {item.count !== undefined && (
                <span className="link-badge">{item.count}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-section">
        <span className="sidebar-heading">Task Status Breakdown</span>
        <div className="status-legend">
          <div className="legend-row">
            <span className="dot todo"></span>
            <span className="legend-text">To Do</span>
            <span className="legend-val">{metrics.todo}</span>
          </div>
          <div className="legend-row">
            <span className="dot in-progress"></span>
            <span className="legend-text">In Progress</span>
            <span className="legend-val">{metrics.inProgress}</span>
          </div>
          <div className="legend-row">
            <span className="dot completed"></span>
            <span className="legend-text">Completed</span>
            <span className="legend-val">{metrics.completed}</span>
          </div>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="stack-info-card">
          <span className="stack-badge">Tech Stack</span>
          <p className="stack-desc">React 18 &bull; Vite &bull; React Router &bull; Context API</p>
        </div>
      </div>
    </aside>
  );
}
