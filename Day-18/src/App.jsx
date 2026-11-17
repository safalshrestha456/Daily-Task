import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import LoginForm from './components/LoginForm.jsx';
import DashboardView from './components/DashboardView.jsx';
import ActivityLog from './components/ActivityLog.jsx';
import { useAuth } from './context/AuthContext.jsx';
import './components/AuthSystem.css';
import './App.css';

export default function App() {
  const { isAuthenticated, quickLogin, personas } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="app-container">
      {/* Top Navigation consuming AuthContext directly */}
      <Navbar onOpenLogin={() => setShowLoginModal(true)} />

      {/* Main Body */}
      {isAuthenticated ? (
        <>
          <DashboardView />
          <ActivityLog />
        </>
      ) : (
        <>
          <div className="guest-hero-card">
            <div className="guest-hero-icon">🛡️</div>
            <h2 className="guest-hero-title">Zero Prop-Drilling Authentication</h2>
            <p className="guest-hero-desc">
              Experience modern React state management using the <strong>Context API</strong>.
              Every component across the tree consumes authenticated identity, simulated JWT tokens,
              and role-based permissions without passing a single prop.
            </p>
            <button
              className="guest-hero-cta"
              onClick={() => setShowLoginModal(true)}
            >
              Sign In with Context API →
            </button>
          </div>

          <div className="prop-drilling-comparison">
            <h3 className="comparison-title">💡 Why Context API Over Prop Drilling?</h3>
            <p className="comparison-desc">
              In a traditional React tree, passing auth states from <code>&lt;App&gt;</code> to deeply nested buttons would require forwarding <code>user</code>, <code>token</code>, <code>logout</code>, and <code>permissions</code> through 4+ intermediate components that have no use for them. With <code>AuthContext</code> and <code>useAuth()</code>, any child component connects directly to the state store cleanly and declaratively.
            </p>
          </div>

          {/* Inline Quick Selector for guests */}
          <div className="quick-personas-section">
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
              ⚡ Or select an instant role persona below:
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {personas.map((p) => (
                <div
                  key={p.id}
                  className="persona-card-item"
                  onClick={() => quickLogin(p.id)}
                >
                  <img src={p.avatar} alt={p.name} className="persona-avatar" />
                  <div className="persona-details">
                    <span className="persona-name">{p.name}</span>
                    <span className="persona-title">{p.title}</span>
                    <span className="persona-email">Role: {p.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <LoginForm onClose={() => setShowLoginModal(false)} />
      )}

      <footer className="app-footer">
        <p>
          40-Day Full Stack Developer Internship &bull; Day 18: Context API, Auth State & RBAC State Management
        </p>
      </footer>
    </div>
  );
}
