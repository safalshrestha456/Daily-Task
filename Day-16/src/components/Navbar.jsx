import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

/**
 * Navbar Component with NavLink for active link highlighting
 * and dynamic auth state indicator to demonstrate Protected Route
 */
function Navbar({ isAuthenticated, onToggleAuth }) {
  return (
    <nav className="site-navbar">
      <div className="container nav-inner">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo">
          <span className="brand-icon">⚡</span>
          <span className="brand-title">DevGear<span className="accent-dot">.io</span></span>
        </Link>

        {/* Nav Links using NavLink (isActive callback) */}
        <div className="nav-menu">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            About
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Products
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Contact
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => `nav-link protected-link ${isActive ? 'active' : ''}`}>
            🔒 Dashboard
          </NavLink>
        </div>

        {/* Auth Toggle Simulation Pill */}
        <div className="nav-actions">
          <button 
            type="button" 
            className={`auth-btn ${isAuthenticated ? 'authenticated' : 'unauthenticated'}`}
            onClick={onToggleAuth}
            title="Click to simulate login / logout for testing protected routes"
          >
            {isAuthenticated ? "✓ Logged In" : "Log In (Simulate)"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
