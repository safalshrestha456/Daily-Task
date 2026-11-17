import React from 'react';

export default function UserCard({ user, onSelect }) {
  // Format fallback avatar if not provided
  const avatarUrl = user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`;
  const status = user.status || 'Active';

  const getStatusClass = (st) => {
    switch (st.toLowerCase()) {
      case 'active': return 'badge-active';
      case 'away': return 'badge-away';
      case 'offline': return 'badge-offline';
      default: return 'badge-active';
    }
  };

  return (
    <div className="user-card">
      <div className="card-top">
        <div className="avatar-wrapper">
          <img src={avatarUrl} alt={user.name} className="user-avatar" />
          <span className={`status-indicator ${getStatusClass(status)}`}></span>
        </div>
        <span className={`status-tag ${getStatusClass(status)}`}>{status}</span>
      </div>

      <div className="card-body">
        <h3 className="user-name">{user.name}</h3>
        <p className="user-role">{user.role || 'Software Engineer'}</p>
        <p className="user-handle">@{user.username || user.name.toLowerCase().replace(/\s+/g, '')}</p>

        <div className="user-meta-list">
          <div className="meta-item">
            <span className="meta-icon">📧</span>
            <a href={`mailto:${user.email}`} className="meta-link" title={user.email}>
              {user.email}
            </a>
          </div>
          <div className="meta-item">
            <span className="meta-icon">🏢</span>
            <span className="meta-text">{user.company?.name || 'Independent'}</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">📍</span>
            <span className="meta-text">{user.address?.city || 'Remote'}</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">🌐</span>
            <a href={`https://${user.website}`} target="_blank" rel="noreferrer" className="meta-link">
              {user.website || 'portfolio.dev'}
            </a>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <button 
          className="view-profile-btn"
          onClick={() => onSelect(user)}
        >
          View Full Telemetry →
        </button>
      </div>
    </div>
  );
}
