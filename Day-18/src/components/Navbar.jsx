import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import RoleBadge from './RoleBadge.jsx';

export default function Navbar({ onOpenLogin }) {
  const { user, isAuthenticated, logout, quickLogin, personas } = useAuth();

  return (
    <header className="auth-navbar">
      <div className="nav-brand">
        <span className="brand-icon">🔐</span>
        <div>
          <h1 className="brand-title">ContextAuth Guard</h1>
          <p className="brand-subtitle">React 18 Context API & RBAC State Architecture</p>
        </div>
      </div>

      <div className="nav-actions">
        {isAuthenticated && user ? (
          <div className="user-profile-chip">
            <img src={user.avatar} alt={user.name} className="nav-avatar" />
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <RoleBadge role={user.role} />
            </div>

            {/* Quick Switch Dropdown */}
            <div className="quick-switch-wrap">
              <select
                className="persona-switch-select"
                value={user.id}
                onChange={(e) => quickLogin(e.target.value)}
                title="Switch persona instantly"
              >
                {personas.map((p) => (
                  <option key={p.id} value={p.id}>
                    Switch to {p.name} ({p.role})
                  </option>
                ))}
              </select>
            </div>

            <button 
              className="logout-btn"
              onClick={logout}
              title="End active session"
            >
              Sign Out ⎋
            </button>
          </div>
        ) : (
          <div className="guest-actions">
            <span className="guest-status">
              <span className="guest-dot"></span>
              Anonymous Session
            </span>
            <button 
              className="login-trigger-btn"
              onClick={onOpenLogin}
            >
              Sign In to Portal →
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
