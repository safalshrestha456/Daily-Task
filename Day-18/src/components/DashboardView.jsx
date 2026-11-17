import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import RoleBadge from './RoleBadge.jsx';

export default function DashboardView() {
  const { user, token, hasPermission, updateProfile, addLog } = useAuth();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedTitle, setEditedTitle] = useState(user.title);
  const [editedBio, setEditedBio] = useState(user.bio);
  const [actionFeedback, setActionFeedback] = useState(null);

  const permissionsList = [
    { key: 'users:read', label: 'View Team Directory', category: 'Read' },
    { key: 'users:create', label: 'Provision New Accounts', category: 'Admin' },
    { key: 'users:delete', label: 'Delete User Records', category: 'Admin' },
    { key: 'deployments:trigger', label: 'Trigger Production CI/CD', category: 'DevOps' },
    { key: 'code:commit', label: 'Direct Git Push to Main', category: 'Engineering' },
    { key: 'api:generate_keys', label: 'Generate API Secrets', category: 'Engineering' },
    { key: 'content:publish', label: 'Publish Public Documentation', category: 'Content' },
    { key: 'database:truncate', label: 'Purge & Truncate Database', category: 'Critical' },
  ];

  const handleExecuteAction = (actionName, requiredPerm) => {
    if (hasPermission(requiredPerm)) {
      addLog('ACTION_EXECUTED', `[${user.role}] Successfully executed "${actionName}".`);
      setActionFeedback({
        status: 'success',
        msg: `Action "${actionName}" executed successfully!`,
      });
    } else {
      addLog('SECURITY_VIOLATION', `[${user.role}] Attempted unauthorized action: "${actionName}".`);
      setActionFeedback({
        status: 'denied',
        msg: `Permission Denied: Your role [${user.role}] lacks "${requiredPerm}".`,
      });
    }

    setTimeout(() => {
      setActionFeedback(null);
    }, 4000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: editedName,
      title: editedTitle,
      bio: editedBio,
    });
    setIsEditingProfile(false);
  };

  return (
    <div className="dashboard-content">
      {/* Action Notification Toast */}
      {actionFeedback && (
        <div className={`action-toast toast-${actionFeedback.status}`}>
          <span>{actionFeedback.status === 'success' ? '✅' : '🚫'}</span>
          <span>{actionFeedback.msg}</span>
        </div>
      )}

      {/* Role Banner */}
      <div className="role-welcome-banner">
        <div className="banner-left">
          <img src={user.avatar} alt={user.name} className="banner-avatar" />
          <div>
            <div className="banner-user-row">
              <h2 className="banner-user-name">{user.name}</h2>
              <RoleBadge role={user.role} />
            </div>
            <p className="banner-title">{user.title}</p>
            <p className="banner-bio">{user.bio}</p>
          </div>
        </div>

        <button
          className="edit-profile-btn"
          onClick={() => setIsEditingProfile(!isEditingProfile)}
        >
          {isEditingProfile ? 'Cancel Edit' : '✏️ Edit Profile'}
        </button>
      </div>

      {/* Inline Profile Editor */}
      {isEditingProfile && (
        <form onSubmit={handleSaveProfile} className="profile-edit-box">
          <h4 className="edit-box-title">
            Mutate AuthContext State (Demonstrating Instant Multi-Component Re-render)
          </h4>
          <div className="edit-inputs-grid">
            <div className="form-group">
              <label>Display Name:</label>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                required
                className="edit-input"
              />
            </div>
            <div className="form-group">
              <label>Job Title:</label>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                required
                className="edit-input"
              />
            </div>
            <div className="form-group full">
              <label>Bio & Notes:</label>
              <textarea
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                rows={2}
                className="edit-textarea"
              />
            </div>
          </div>
          <div className="edit-actions">
            <button type="button" className="cancel-btn" onClick={() => setIsEditingProfile(false)}>
              Discard
            </button>
            <button type="submit" className="save-btn">
              Propagate Changes via Context API
            </button>
          </div>
        </form>
      )}

      {/* Two Column Grid: Permissions Matrix & Role-Based Actions */}
      <div className="dashboard-two-col">
        {/* Left Column: RBAC Permission Matrix */}
        <div className="panel-card">
          <div className="panel-header">
            <h3 className="panel-title">🛡️ Role Permissions Matrix</h3>
            <span className="panel-subtitle">Evaluated live via `hasPermission()`</span>
          </div>

          <div className="permissions-table">
            {permissionsList.map((perm) => {
              const allowed = hasPermission(perm.key);
              return (
                <div key={perm.key} className={`perm-row ${allowed ? 'allowed' : 'denied'}`}>
                  <div className="perm-info">
                    <span className="perm-label">{perm.label}</span>
                    <span className="perm-key"><code>{perm.key}</code></span>
                  </div>
                  <span className={`perm-badge ${allowed ? 'badge-ok' : 'badge-no'}`}>
                    {allowed ? '✓ Granted' : '✕ Restricted'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Role Actions & Simulated JWT */}
        <div className="panel-card">
          <div className="panel-header">
            <h3 className="panel-title">⚡ Interactive Operations</h3>
            <span className="panel-subtitle">Click to test role authorization boundaries</span>
          </div>

          <div className="actions-cluster">
            <button
              className="action-btn-item devops"
              onClick={() => handleExecuteAction('Production Deployment', 'deployments:trigger')}
            >
              <div className="action-btn-icon">🚀</div>
              <div className="action-btn-text">
                <strong>Deploy to Production</strong>
                <span>Requires <code>deployments:trigger</code></span>
              </div>
            </button>

            <button
              className="action-btn-item admin"
              onClick={() => handleExecuteAction('Truncate PostgreSQL Database', 'database:truncate')}
            >
              <div className="action-btn-icon">⚠️</div>
              <div className="action-btn-text">
                <strong>Truncate Main Database</strong>
                <span>Requires <code>database:truncate</code> (Admin only)</span>
              </div>
            </button>

            <button
              className="action-btn-item editor"
              onClick={() => handleExecuteAction('Publish Documentation', 'content:publish')}
            >
              <div className="action-btn-icon">📚</div>
              <div className="action-btn-text">
                <strong>Publish Technical Docs</strong>
                <span>Requires <code>content:publish</code></span>
              </div>
            </button>

            <button
              className="action-btn-item security"
              onClick={() => handleExecuteAction('Generate API Secrets', 'api:generate_keys')}
            >
              <div className="action-btn-icon">🔑</div>
              <div className="action-btn-text">
                <strong>Generate API Secret Key</strong>
                <span>Requires <code>api:generate_keys</code></span>
              </div>
            </button>
          </div>

          {/* JWT Token Card */}
          <div className="jwt-telemetry-box">
            <div className="jwt-header">
              <span>🔏 Active Session Mock JWT</span>
              <span className="jwt-status">Valid / Signed</span>
            </div>
            <pre className="jwt-display">{token}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
