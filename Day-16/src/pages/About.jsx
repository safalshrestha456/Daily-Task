import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

function About() {
  const milestones = [
    { week: "Week 1", focus: "Web Foundation & Tailwind CSS", output: "Portfolio & Responsive Landing Pages" },
    { week: "Week 2", focus: "JavaScript Foundation", output: "Grade Calculators, Array Analyzers & DOM Todo App" },
    { week: "Week 3", focus: "React with Vite Fundamentals", output: "Reusable Components, Props, useState & Controlled Forms" },
    { week: "Week 4", focus: "Advanced React & Routing", output: "React Router Multi-Page App & State Management" }
  ];

  return (
    <div className="page about-page">
      <div className="container">
        <header className="page-header">
          <span className="sub-title">Engineering Mission</span>
          <h1>About DevGear & 40-Day Internship</h1>
          <p>
            DevGear is an educational showcase application built during Day 16 of the Full Stack Developer Internship. 
            It demonstrates production-grade client-side routing, declarative navigation, route parameters, and protected routes.
          </p>
        </header>

        {/* Core Principles */}
        <div className="about-grid">
          <div className="about-card">
            <span className="about-icon">⚡</span>
            <h3>Single Page Application (SPA)</h3>
            <p>
              Unlike traditional multi-page websites that make full roundtrips to the web server on every click, 
              React Router swaps components in memory instantly without page reloads.
            </p>
          </div>

          <div className="about-card">
            <span className="about-icon">🎯</span>
            <h3>Declarative Routing</h3>
            <p>
              Routes are configured as pure React components (<code>&lt;Route path="..." element="..." /&gt;</code>), 
              giving developers full programmatic control over deep linking and layout composition.
            </p>
          </div>

          <div className="about-card">
            <span className="about-icon">🛡️</span>
            <h3>Protected Route Guarding</h3>
            <p>
              Sensitive views like user dashboards or administration portals are guarded by wrapper components that verify 
              authentication tokens before granting access.
            </p>
          </div>
        </div>

        {/* Internship Timeline */}
        <section className="timeline-section">
          <h2>Internship Progression Timeline</h2>
          <div className="timeline-list">
            {milestones.map((m, i) => (
              <div key={i} className="timeline-item">
                <span className="timeline-week">{m.week}</span>
                <div className="timeline-content">
                  <strong>{m.focus}</strong>
                  <p>{m.output}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link to="/products" className="btn btn-primary">
              Explore Available Products &rarr;
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
