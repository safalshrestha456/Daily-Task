import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #243049',
      backgroundColor: '#07090E',
      padding: '3rem 0',
      textAlign: 'center',
      fontSize: '0.85rem',
      color: '#94A3B8'
    }}>
      <div className="container">
        <p style={{ marginBottom: '0.75rem' }}>
          &copy; 2026 DevGear.io &bull; Safal Shrestha &bull; Full Stack Developer Intern &bull; Day 16 React Router
        </p>
        <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center' }}>
          <Link to="/" style={{ color: '#94A3B8' }}>Home</Link>
          <Link to="/about" style={{ color: '#94A3B8' }}>About</Link>
          <Link to="/products" style={{ color: '#94A3B8' }}>Products</Link>
          <Link to="/contact" style={{ color: '#94A3B8' }}>Contact</Link>
          <Link to="/dashboard" style={{ color: '#FCD34D' }}>Dashboard</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
