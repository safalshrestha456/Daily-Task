import React from 'react';
import './TeamCard.css';

/**
 * Reusable Team Member Card Component
 * Demonstrates:
 * 1. Functional component definition
 * 2. Props destructuring with default fallback values
 * 3. Conditional styling & badges based on props
 * 4. Rendering nested lists from props
 */
function TeamCard({
  name = "Anonymous Contributor",
  role = "Developer",
  department = "Engineering",
  initials = "DEV",
  bio = "Passionate engineering team contributor building modern web platforms.",
  skills = [],
  isLeader = false,
  status = "online",
  github = "#",
  linkedin = "#"
}) {
  return (
    <article className={`team-card ${isLeader ? 'card-lead' : ''}`}>
      {/* Leadership ribbon if isLeader is true */}
      {isLeader && (
        <span className="lead-ribbon">⭐ Team Lead</span>
      )}

      {/* Header: Avatar, Status indicator, and Basic info */}
      <div className="card-top">
        <div className="avatar-wrap">
          <div className="avatar-placeholder">{initials}</div>
          <span className={`status-dot status-${status}`} title={`Status: ${status}`}></span>
        </div>

        <div className="member-info">
          <h3 className="member-name">{name}</h3>
          <p className="member-role">{role}</p>
          <span className="dept-tag">{department}</span>
        </div>
      </div>

      {/* Bio / Description */}
      <p className="member-bio">{bio}</p>

      {/* Skills Badges (Mapped from props array) */}
      <div className="skills-wrap">
        <span className="skills-heading">Tech Stack:</span>
        <div className="skills-list">
          {skills.map((skill, index) => (
            <span key={index} className="skill-pill">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Social & Action Links */}
      <div className="card-footer">
        <div className="social-links">
          <a href={github} target="_blank" rel="noopener noreferrer" className="social-btn" title="GitHub Profile">
            💻 GitHub
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="social-btn" title="LinkedIn Profile">
            💼 LinkedIn
          </a>
        </div>
        <button 
          className="btn-connect"
          onClick={() => alert(`Connecting with ${name} (${role}). Message channel opened!`)}
        >
          Connect
        </button>
      </div>
    </article>
  );
}

export default TeamCard;
