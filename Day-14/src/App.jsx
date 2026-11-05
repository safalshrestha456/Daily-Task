import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm.jsx';
import './App.css';

/**
 * Day 14: Controlled Forms, Form State & Validation in React
 * Author: Safal Shrestha - Full Stack Developer Intern
 */

function App() {
  const [latestSubmission, setLatestSubmission] = useState(null);

  const handleSuccessfulSubmit = (submittedData) => {
    setLatestSubmission(submittedData);
  };

  return (
    <div className="app-root">
      {/* Top Header */}
      <header className="app-header">
        <div className="container header-content">
          <div className="brand">
            <span className="brand-badge">FORMS</span>
            <div className="brand-text">
              <h1>React Controlled Forms</h1>
              <p>Day 14: Controlled Inputs, Unified State, Validation & UX</p>
            </div>
          </div>
          <span className="meta-pill">Safal Shrestha &bull; Full Stack Intern</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="container main-content">
        <div className="form-layout-grid">
          {/* Left: Controlled Form */}
          <section className="form-section">
            <RegistrationForm onSuccessfulSubmit={handleSuccessfulSubmit} />
          </section>

          {/* Right: Live React State Inspector */}
          <aside className="sidebar-inspector">
            <h3>React State Inspector</h3>
            <p className="inspector-desc">
              When form inputs are controlled, their internal values live in React memory rather than the browser DOM:
            </p>

            <div className="state-preview-box">
              <pre>
                <code>
                  {latestSubmission 
                    ? JSON.stringify({ status: "SUBMITTED_SUCCESSFULLY", payload: latestSubmission }, null, 2)
                    : `// Fill the form on the left.\n// Submitting will broadcast state payload here.\n\n{\n  "status": "AWAITING_INPUT",\n  "framework": "React 18 + Vite",\n  "pattern": "Controlled Component"\n}`}
                </code>
              </pre>
            </div>
          </aside>
        </div>

        {/* Concept Reference Section */}
        <section className="form-guide-card">
          <h3>💡 Controlled Component Principles Mastered in Day 14:</h3>
          <div className="guide-grid">
            <div className="guide-box">
              <strong>1. Single Source of Truth:</strong>
              React state controls the input value via <code>value={'{state}'}</code>, making React the single authority over the DOM.
            </div>
            <div className="guide-box">
              <strong>2. Computed Property Names:</strong>
              A single change handler manages dozens of fields: <code>{'setFormData({ ...prev, [e.target.name]: value })'}</code>.
            </div>
            <div className="guide-box">
              <strong>3. Touched State UX:</strong>
              Tracking <code>touched[field]</code> ensures error messages are polite and only displayed after the user focuses and blurs the field.
            </div>
            <div className="guide-box">
              <strong>4. Form Submission Guard:</strong>
              <code>validate(formData)</code> checks the complete payload before dispatching network requests, preventing incomplete submissions.
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>&copy; 2026 Safal Shrestha &bull; Full Stack Developer Intern &bull; Day 14 Controlled Forms</p>
      </footer>
    </div>
  );
}

export default App;
