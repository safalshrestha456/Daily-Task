import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Pages.css';

function NotFound() {
  const location = useLocation();

  return (
    <div className="page not-found-page">
      <div className="container" style={{ textAlign: 'center', padding: '5rem 1.5rem' }}>
        <span style={{ fontSize: '5rem', display: 'block', marginBottom: '1rem' }}>🧭</span>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '0.75rem' }}>404 - Page Not Found</h1>
        <p style={{ color: '#94A3B8', fontSize: '1.1rem', maxWidth: '520px', margin: '0 auto 2rem' }}>
          No route matched the URL: <code>{location.pathname}</code>. The page may have moved or does not exist.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary">
            Return to Home
          </Link>
          <Link to="/products" className="btn btn-secondary">
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
