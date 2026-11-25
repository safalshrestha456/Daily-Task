// ============================================================================
// Page: Analytics (Sprint Metrics, Priority Breakdown & Health)
// ============================================================================

import React from 'react';
import { useTasks } from '../context/TaskContext.jsx';

export default function Analytics() {
  const { tasks, metrics } = useTasks();

  const priorityCounts = {
    URGENT: tasks.filter((t) => t.priority === 'URGENT').length,
    HIGH: tasks.filter((t) => t.priority === 'HIGH').length,
    MEDIUM: tasks.filter((t) => t.priority === 'MEDIUM').length,
    LOW: tasks.filter((t) => t.priority === 'LOW').length,
  };

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h2 className="page-title">Sprint Performance & Health Analytics</h2>
        <p className="page-subtitle">Real-time productivity telemetry and delivery velocity metrics</p>
      </div>

      <div className="analytics-grid">
        {/* Progress Progress Card */}
        <div className="analytics-card full-width">
          <h3 className="card-heading">Overall Sprint Completion Progress</h3>
          <div className="progress-bar-large">
            <div
              className="progress-fill-large"
              style={{ width: `${metrics.completionRate}%` }}
            />
          </div>
          <div className="progress-meta">
            <span>{metrics.completed} of {metrics.total} Tasks Completed</span>
            <span className="rate-badge">{metrics.completionRate}% Done</span>
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="analytics-card">
          <h3 className="card-heading">Priority Distribution</h3>
          <div className="bar-stat-group">
            <div className="bar-stat-row">
              <span className="bar-label">Urgent 🔥</span>
              <div className="bar-track">
                <div
                  className="bar-fill red"
                  style={{ width: `${metrics.total > 0 ? (priorityCounts.URGENT / metrics.total) * 100 : 0}%` }}
                />
              </div>
              <span className="bar-value">{priorityCounts.URGENT}</span>
            </div>

            <div className="bar-stat-row">
              <span className="bar-label">High ⚡</span>
              <div className="bar-track">
                <div
                  className="bar-fill orange"
                  style={{ width: `${metrics.total > 0 ? (priorityCounts.HIGH / metrics.total) * 100 : 0}%` }}
                />
              </div>
              <span className="bar-value">{priorityCounts.HIGH}</span>
            </div>

            <div className="bar-stat-row">
              <span className="bar-label">Medium 📌</span>
              <div className="bar-track">
                <div
                  className="bar-fill blue"
                  style={{ width: `${metrics.total > 0 ? (priorityCounts.MEDIUM / metrics.total) * 100 : 0}%` }}
                />
              </div>
              <span className="bar-value">{priorityCounts.MEDIUM}</span>
            </div>

            <div className="bar-stat-row">
              <span className="bar-label">Low 🌱</span>
              <div className="bar-track">
                <div
                  className="bar-fill green"
                  style={{ width: `${metrics.total > 0 ? (priorityCounts.LOW / metrics.total) * 100 : 0}%` }}
                />
              </div>
              <span className="bar-value">{priorityCounts.LOW}</span>
            </div>
          </div>
        </div>

        {/* Team Delivery Velocity */}
        <div className="analytics-card">
          <h3 className="card-heading">Delivery Velocity & Readiness</h3>
          <ul className="velocity-list">
            <li>
              <span className="check-icon">✓</span>
              <span><strong>Frontend Architecture:</strong> React 18 + Vite SPA ready</span>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <span><strong>Routing:</strong> Dynamic React Router with Protected Guards</span>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <span><strong>State Management:</strong> Zero Prop-Drilling Context API</span>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <span><strong>Quality Assurance:</strong> RTL Automated Testing Suite</span>
            </li>
            <li>
              <span className="check-icon pending">⏳</span>
              <span><strong>Backend Phase:</strong> FastAPI + GraphQL (Week 5 Kickoff)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
