import React from 'react';

export default function Metrics({ users = [] }) {
  const totalUsers = users.length;
  const activeCount = users.filter(u => u.status === 'Active' || !u.status).length;
  const uniqueCompanies = new Set(users.map(u => u.company?.name || 'Unknown')).size;
  const uniqueCities = new Set(users.map(u => u.address?.city || 'Unknown')).size;

  const cards = [
    {
      label: 'Total Engineers',
      value: totalUsers,
      change: '+12% this month',
      icon: '👥',
      variant: 'primary',
    },
    {
      label: 'Active on Platform',
      value: activeCount,
      change: 'Real-time telemetry',
      icon: '⚡',
      variant: 'success',
    },
    {
      label: 'Partner Orgs',
      value: uniqueCompanies,
      change: 'Global organizations',
      icon: '🏢',
      variant: 'purple',
    },
    {
      label: 'Operating Hubs',
      value: uniqueCities,
      change: 'Cross-timezone reach',
      icon: '🌐',
      variant: 'amber',
    },
  ];

  return (
    <div className="metrics-grid">
      {cards.map((c, i) => (
        <div key={i} className={`metric-card metric-${c.variant}`}>
          <div className="metric-header">
            <span className="metric-icon">{c.icon}</span>
            <span className="metric-badge">{c.change}</span>
          </div>
          <div className="metric-value">{c.value}</div>
          <div className="metric-label">{c.label}</div>
        </div>
      ))}
    </div>
  );
}
