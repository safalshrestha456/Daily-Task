import React from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Header({ 
  loading, 
  onRefresh, 
  lastUpdated, 
  isUsingFallback, 
  error 
}) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <div className="brand-logo">
          <span className="logo-icon">📊</span>
          <div>
            <h1 className="brand-title">DevPulse Analytics</h1>
            <p className="brand-subtitle">
              Live User Directory & Team Performance Dashboard
            </p>
          </div>
        </div>
      </div>

      <div className="header-actions">
        {/* API Health Pill */}
        <div className={`health-pill ${isUsingFallback ? 'warning' : 'healthy'}`}>
          <span className="pulse-dot"></span>
          <span>{isUsingFallback ? 'Offline Fallback Active' : 'Live API Connected'}</span>
        </div>

        {/* Refresh Button */}
        <button 
          className={`refresh-btn ${loading ? 'spinning' : ''}`}
          onClick={onRefresh}
          disabled={loading}
          title="Refetch data from API"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
          <span>{loading ? 'Refreshing...' : 'Refetch'}</span>
        </button>

        {/* Theme Toggle Button */}
        <button 
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </header>
  );
}
