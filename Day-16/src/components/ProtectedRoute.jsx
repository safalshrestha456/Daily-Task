import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * ProtectedRoute Component (Route Guard)
 * Demonstrates:
 * 1. Conditional navigation using <Navigate />
 * 2. Preserving intended destination with useLocation()
 * 3. Children prop composition
 */
function ProtectedRoute({ isAuthenticated, children }) {
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to home if unauthenticated
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{
          backgroundColor: '#161F33',
          border: '1px solid #EF4444',
          borderRadius: '16px',
          padding: '3rem 2rem',
          maxWidth: '560px',
          margin: '0 auto'
        }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🔒</span>
          <h2 style={{ color: '#EF4444', marginBottom: '0.75rem' }}>Access Restricted</h2>
          <p style={{ color: '#94A3B8', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            You attempted to access <code>{location.pathname}</code>, but you are not currently authenticated.
          </p>
          <p style={{ color: '#CBD5E1', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            👉 Click the <strong>"Log In (Simulate)"</strong> button on the top right navigation bar to authenticate and unlock this page.
          </p>
          <Navigate to="/" replace />
        </div>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
