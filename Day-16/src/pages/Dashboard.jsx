import React from 'react';
import './Pages.css';

/**
 * Protected Dashboard Component
 * Rendered ONLY when ProtectedRoute verifies isAuthenticated is true
 */
function Dashboard({ onLogout }) {
  return (
    <div className="page dashboard-page">
      <div className="container">
        <header className="page-header">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', padding: '0.25rem 0.75rem', borderRadius: '9999px', border: '1px solid rgba(16, 185, 129, 0.3)', marginBottom: '0.75rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></span>
            <span style={{ color: '#10B981', fontSize: '0.8rem', fontWeight: '700' }}>AUTHENTICATED SESSION</span>
          </div>
          <h1>Developer Portal & Protected Dashboard</h1>
          <p>
            Congratulations! You have reached this route because <code>ProtectedRoute</code> verified that 
            <code>isAuthenticated === true</code>.
          </p>
        </header>

        {/* Secret Metrics */}
        <div className="dashboard-grid">
          <div className="dash-card">
            <span className="dash-label">Active API Key</span>
            <code className="dash-key">sk_live_99f2b847a9e10c7329</code>
            <p>Full read/write permissions for GraphQL backend.</p>
          </div>

          <div className="dash-card">
            <span className="dash-label">Completed Curriculum Days</span>
            <span className="dash-number">16 / 40 Days</span>
            <p>Phase 4: Advanced React in active progress.</p>
          </div>

          <div className="dash-card">
            <span className="dash-label">Internal Project Status</span>
            <span className="dash-badge badge-green">Production Ready</span>
            <p>TaskFlow full-stack capstone ready for Dockerization.</p>
          </div>
        </div>

        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <button className="btn btn-secondary" onClick={onLogout}>
            Simulate Logout (Lock Dashboard)
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
