import React from 'react';

export default function RoleBadge({ role }) {
  if (!role) return null;

  const getStyle = (r) => {
    switch (r.toUpperCase()) {
      case 'ADMIN':
        return {
          bg: 'rgba(239, 68, 68, 0.15)',
          color: '#ef4444',
          border: 'rgba(239, 68, 68, 0.35)',
          icon: '👑',
        };
      case 'DEVELOPER':
        return {
          bg: 'rgba(59, 130, 246, 0.15)',
          color: '#3b82f6',
          border: 'rgba(59, 130, 246, 0.35)',
          icon: '⚡',
        };
      case 'EDITOR':
        return {
          bg: 'rgba(16, 185, 129, 0.15)',
          color: '#10b981',
          border: 'rgba(16, 185, 129, 0.35)',
          icon: '✍️',
        };
      default:
        return {
          bg: 'rgba(148, 163, 184, 0.15)',
          color: '#94a3b8',
          border: 'rgba(148, 163, 184, 0.35)',
          icon: '👤',
        };
    }
  };

  const style = getStyle(role);

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: '0.25rem 0.65rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: '700',
        letterSpacing: '0.04em',
        backgroundColor: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
        textTransform: 'uppercase',
      }}
    >
      <span>{style.icon}</span>
      <span>{role}</span>
    </span>
  );
}
