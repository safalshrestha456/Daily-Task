import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import RoleBadge from './RoleBadge.jsx';

export default function LoginForm({ onClose }) {
  const { login, quickLogin, isAuthenticating, personas } = useAuth();

  const [activeTab, setActiveTab] = useState('quick'); // 'quick' | 'form'
  const [email, setEmail] = useState('sarah.admin@cyberdyne.io');
  const [password, setPassword] = useState('Password123!');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      await login(email, password);
      if (onClose) onClose();
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleQuickSelect = (personaId) => {
    quickLogin(personaId);
    if (onClose) onClose();
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-card">
        {onClose && (
          <button className="card-close-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        )}

        <div className="login-card-header">
          <div className="lock-icon-badge">🛡️</div>
          <h2 className="login-title">Identity & Access Portal</h2>
          <p className="login-subtitle">
            Authenticate to access role-guarded enterprise telemetry
          </p>
        </div>

        {/* Tab switchers */}
        <div className="login-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'quick' ? 'active' : ''}`}
            onClick={() => setActiveTab('quick')}
          >
            ⚡ Instant 1-Click Personas
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'form' ? 'active' : ''}`}
            onClick={() => setActiveTab('form')}
          >
            🔑 Manual Credentials
          </button>
        </div>

        {errorMsg && (
          <div className="login-error-alert">
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {activeTab === 'quick' ? (
          <div className="quick-personas-list">
            <p className="quick-intro">
              Select a preconfigured role to inspect how <code>AuthContext</code> enforces granular permissions across the application tree:
            </p>

            {personas.map((p) => (
              <div 
                key={p.id} 
                className="persona-card-item"
                onClick={() => handleQuickSelect(p.id)}
              >
                <img src={p.avatar} alt={p.name} className="persona-avatar" />
                <div className="persona-details">
                  <div className="persona-head">
                    <span className="persona-name">{p.name}</span>
                    <RoleBadge role={p.role} />
                  </div>
                  <span className="persona-title">{p.title}</span>
                  <span className="persona-email">{p.email}</span>
                </div>
                <button type="button" className="persona-select-btn">
                  Assume Role →
                </button>
              </div>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="login-form-body">
            <div className="form-field">
              <label htmlFor="login-email">Corporate Email</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@cyberdyne.io"
                required
                className="form-input"
              />
            </div>

            <div className="form-field">
              <div className="field-label-row">
                <label htmlFor="login-pwd">Password</label>
                <button
                  type="button"
                  className="toggle-pwd-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                id="login-pwd"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="form-input"
              />
              <span className="field-hint">
                Demo password for all accounts: <code>Password123!</code>
              </span>
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              className="submit-login-btn"
            >
              {isAuthenticating ? (
                <>
                  <span className="btn-spinner"></span>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                'Sign In with Context API'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
