import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function ActivityLog() {
  const { logs, clearLogs } = useAuth();

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case 'AUTH':
      case 'QUICK_LOGIN':
        return 'log-tag-auth';
      case 'LOGOUT':
        return 'log-tag-logout';
      case 'ACTION_EXECUTED':
        return 'log-tag-action';
      case 'SECURITY_VIOLATION':
      case 'FAILURE':
        return 'log-tag-error';
      case 'PROFILE_UPDATE':
        return 'log-tag-profile';
      default:
        return 'log-tag-default';
    }
  };

  return (
    <div className="activity-log-card">
      <div className="log-card-header">
        <div className="log-header-left">
          <span className="terminal-dot red"></span>
          <span className="terminal-dot yellow"></span>
          <span className="terminal-dot green"></span>
          <h4 className="log-title">AuthContext Telemetry & Audit Stream</h4>
        </div>
        <button className="clear-logs-btn" onClick={clearLogs} title="Clear telemetry log">
          Clear Stream 🗑️
        </button>
      </div>

      <div className="log-stream-body">
        {logs.length === 0 ? (
          <div className="empty-logs">Telemetry stream is clean. No logged events.</div>
        ) : (
          logs.map((item) => (
            <div key={item.id} className="log-entry">
              <span className="log-time">{item.timestamp}</span>
              <span className={`log-badge ${getTypeBadgeClass(item.type)}`}>
                {item.type}
              </span>
              <span className="log-message">{item.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
