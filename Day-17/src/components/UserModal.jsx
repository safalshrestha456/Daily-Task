import React, { useEffect } from 'react';

export default function UserModal({ user, onClose }) {
  // useEffect demonstration: Handle Escape key press and scroll locking
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Lock background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  if (!user) return null;

  const avatarUrl = user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="modal-header">
          <img src={avatarUrl} alt={user.name} className="modal-avatar" />
          <div className="modal-title-wrap">
            <h2 className="modal-user-name">{user.name}</h2>
            <p className="modal-user-role">{user.role || 'Full Stack Engineer'}</p>
            <span className="modal-handle">@{user.username} &bull; ID: #{user.id}</span>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h4 className="section-title">📞 Contact & Communication</h4>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <a href={`mailto:${user.email}`} className="detail-value link">{user.email}</a>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{user.phone}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Portfolio:</span>
                <a href={`https://${user.website}`} target="_blank" rel="noreferrer" className="detail-value link">
                  {user.website}
                </a>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span className="detail-value badge-pill">{user.status || 'Active'}</span>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h4 className="section-title">🏢 Organization Details</h4>
            <div className="detail-grid">
              <div className="detail-item full-width">
                <span className="detail-label">Company Name:</span>
                <span className="detail-value font-bold">{user.company?.name || 'N/A'}</span>
              </div>
              <div className="detail-item full-width">
                <span className="detail-label">Catchphrase:</span>
                <span className="detail-value italic">"{user.company?.catchPhrase || 'Driving digital excellence'}"</span>
              </div>
              <div className="detail-item full-width">
                <span className="detail-label">Strategic Focus:</span>
                <span className="detail-value">{user.company?.bs || 'Cloud-native services'}</span>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h4 className="section-title">📍 Physical Work Location</h4>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Street / Suite:</span>
                <span className="detail-value">{user.address?.street}, {user.address?.suite}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">City & Zip:</span>
                <span className="detail-value">{user.address?.city} ({user.address?.zipcode})</span>
              </div>
              <div className="detail-item full-width">
                <span className="detail-label">Geo Coordinates:</span>
                <span className="detail-value code-snippet">
                  Lat: {user.address?.geo?.lat || '37.7749'} | Lng: {user.address?.geo?.lng || '-122.4194'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="secondary-btn" onClick={onClose}>
            Close
          </button>
          <a href={`mailto:${user.email}`} className="primary-action-btn">
            Send Message ✉️
          </a>
        </div>
      </div>
    </div>
  );
}
