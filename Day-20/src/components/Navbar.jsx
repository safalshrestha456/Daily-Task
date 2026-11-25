// ============================================================================
// Component: Navbar
// Purpose: Header navigation, quick project KPI stats, & session control
// ============================================================================

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTasks } from '../context/TaskContext.jsx';

export default function Navbar({ onOpenNewTaskModal }) {
  const { user, isAuthenticated, logout } = useAuth();
  const { metrics } = useTasks();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-navbar">
      <div className="nav-left">
        <Link to="/" className="nav-brand">
          <span className="brand-logo">⚡</span>
          <div>
            <h1 className="brand-name">TaskFlow Pro</h1>
            <span className="brand-version">v1.0 &bull; Frontend Mini Project</span>
          </div>
        </Link>
      </div>

      {isAuthenticated && (
        <div className="nav-center">
          {/* Live Progress Pill */}
          <div className="progress-pill">
            <span className="progress-label">Completion Velocity:</span>
            <div className="progress-bar-mini">
              <div 
                className="progress-fill-mini" 
                style={{ width: `${metrics.completionRate}%` }}
              />
            </div>
            <span className="progress-percentage">{metrics.completionRate}%</span>
          </div>
        </div>
      )}

      <div className="nav-right">
        {isAuthenticated ? (
          <>
            <button 
              className="btn-create-task"
              onClick={onOpenNewTaskModal}
              title="Create new task"
            >
              <span>+</span>
              <span>New Task</span>
            </button>

            <div className="user-profile-menu">
              <img src={user.avatar} alt={user.name} className="user-avatar-nav" />
              <div className="user-meta-nav">
                <span className="user-name-nav">{user.name}</span>
                <span className="user-role-nav">{user.role}</span>
              </div>
              <button 
                className="logout-icon-btn" 
                onClick={handleLogout}
                title="Log Out"
                aria-label="Log Out"
              >
                ⎋
              </button>
            </div>
          </>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="nav-link-btn">Log In</Link>
            <Link to="/register" className="btn-create-task">Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
}
