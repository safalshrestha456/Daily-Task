// ============================================================================
// Component: App (Interactive Testing Showcase & Test Runner Explorer)
// ============================================================================

import React, { useState } from 'react';
import Button from './components/Button.jsx';
import LoginForm from './components/LoginForm.jsx';
import TodoList from './components/TodoList.jsx';
import './App.css';

export default function App() {
  // Active navigation tab
  const [activeTab, setActiveTab] = useState('overview');

  // Interactive Button test controls
  const [buttonClickCount, setButtonClickCount] = useState(0);
  const [isSimulatedLoading, setIsSimulatedLoading] = useState(false);

  // Initial mock tasks for interactive TodoList
  const initialTodos = [
    { id: '1', text: 'Write Button unit tests using @testing-library/react', completed: true },
    { id: '2', text: 'Verify LoginForm validation and submit assertions', completed: true },
    { id: '3', text: 'Test TodoList filter logic and state mutations', completed: false },
  ];

  const handleSimulateAsyncAction = () => {
    setIsSimulatedLoading(true);
    setTimeout(() => {
      setIsSimulatedLoading(false);
      setButtonClickCount((prev) => prev + 1);
    }, 1500);
  };

  return (
    <div className="app-container">
      {/* Header Bar */}
      <header className="app-header">
        <div className="brand-wrapper">
          <span className="brand-icon">🧪</span>
          <div>
            <h1 className="brand-title">React Testing Suite</h1>
            <p className="brand-subtitle">
              Component Unit & Integration Testing via React Testing Library & Vitest
            </p>
          </div>
        </div>

        <div className="header-badge">
          <span className="pulse-dot"></span>
          <span>16 / 16 Tests Passing</span>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="tab-navigation" role="tablist">
        <button
          className={`nav-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Test Suites Overview
        </button>
        <button
          className={`nav-tab-btn ${activeTab === 'button' ? 'active' : ''}`}
          onClick={() => setActiveTab('button')}
        >
          🔘 Button Component
        </button>
        <button
          className={`nav-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          🔐 LoginForm Component
        </button>
        <button
          className={`nav-tab-btn ${activeTab === 'todo' ? 'active' : ''}`}
          onClick={() => setActiveTab('todo')}
        >
          📝 TodoList Component
        </button>
      </nav>

      {/* Main Tab Content */}
      {activeTab === 'overview' && (
        <main>
          {/* Summary Cards */}
          <div className="overview-grid">
            <div className="overview-card">
              <div className="card-icon">🔘</div>
              <h3 className="card-title">Button.test.jsx</h3>
              <p className="card-desc">
                Tests label rendering, user click dispatch, disabled states, loading spinners, and CSS variants.
              </p>
              <span className="test-counter">✓ 5 Tests Passed</span>
            </div>

            <div className="overview-card">
              <div className="card-icon">🔐</div>
              <h3 className="card-title">LoginForm.test.jsx</h3>
              <p className="card-desc">
                Tests input rendering, empty validation, regex email verification, password length, and submission payload.
              </p>
              <span className="test-counter">✓ 5 Tests Passed</span>
            </div>

            <div className="overview-card">
              <div className="card-icon">📝</div>
              <h3 className="card-title">TodoList.test.jsx</h3>
              <p className="card-desc">
                Tests empty states, task creation, completion toggling, deletion, and dynamic filter tabs.
              </p>
              <span className="test-counter">✓ 6 Tests Passed</span>
            </div>
          </div>

          {/* Test Runner Terminal Output */}
          <div className="terminal-card">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="terminal-title">npm test (vitest run)</span>
            </div>
            <div className="terminal-body">
              <div className="test-suite-header">✓ src/components/Button.test.jsx (5 tests)</div>
              <div className="test-pass">&nbsp;&nbsp;✓ renders the button with the provided text label</div>
              <div className="test-pass">&nbsp;&nbsp;✓ calls the onClick callback when clicked by the user</div>
              <div className="test-pass">&nbsp;&nbsp;✓ does not trigger onClick when disabled</div>
              <div className="test-pass">&nbsp;&nbsp;✓ shows loading spinner and disables interaction when isLoading is true</div>
              <div className="test-pass">&nbsp;&nbsp;✓ applies the appropriate CSS variant class</div>

              <div className="test-suite-header">✓ src/components/LoginForm.test.jsx (5 tests)</div>
              <div className="test-pass">&nbsp;&nbsp;✓ renders email input, password input, and submit button</div>
              <div className="test-pass">&nbsp;&nbsp;✓ displays validation error messages when submitted with empty fields</div>
              <div className="test-pass">&nbsp;&nbsp;✓ shows an error message when an invalid email is entered</div>
              <div className="test-pass">&nbsp;&nbsp;✓ shows an error message when password is less than 6 characters</div>
              <div className="test-pass">&nbsp;&nbsp;✓ submits form successfully with valid inputs and displays success alert</div>

              <div className="test-suite-header">✓ src/components/TodoList.test.jsx (6 tests)</div>
              <div className="test-pass">&nbsp;&nbsp;✓ renders an empty state placeholder when no tasks exist</div>
              <div className="test-pass">&nbsp;&nbsp;✓ renders initial list of tasks and calculates remaining count correctly</div>
              <div className="test-pass">&nbsp;&nbsp;✓ allows the user to type and add a new task to the list</div>
              <div className="test-pass">&nbsp;&nbsp;✓ toggles task completion when checkbox is clicked</div>
              <div className="test-pass">&nbsp;&nbsp;✓ removes a task when its delete button is clicked</div>
              <div className="test-pass">&nbsp;&nbsp;✓ filters tasks accurately between All, Active, and Completed views</div>

              <div style={{ marginTop: '1rem', color: '#10b981', fontWeight: 'bold' }}>
                Test Files&nbsp;&nbsp;3 passed (3)<br />
                Tests&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;16 passed (16)<br />
                Duration&nbsp;&nbsp;&nbsp;&nbsp;1.12s
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Interactive Button Showcase */}
      {activeTab === 'button' && (
        <div className="showcase-container">
          <div className="button-demo-grid">
            <div style={{ width: '100%', marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.25rem' }}>Interactive Button States</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Clicks registered: <strong>{buttonClickCount}</strong>
              </p>
            </div>

            <Button variant="primary" onClick={() => setButtonClickCount((c) => c + 1)}>
              Primary Button
            </Button>

            <Button variant="secondary" onClick={() => setButtonClickCount((c) => c + 1)}>
              Secondary Button
            </Button>

            <Button variant="danger" onClick={() => setButtonClickCount((c) => c + 1)}>
              Danger Action
            </Button>

            <Button variant="outline" onClick={() => setButtonClickCount((c) => c + 1)}>
              Outline Style
            </Button>

            <Button disabled onClick={() => alert('Should not fire')}>
              Disabled Button
            </Button>

            <Button
              isLoading={isSimulatedLoading}
              onClick={handleSimulateAsyncAction}
              variant="primary"
            >
              {isSimulatedLoading ? 'Processing Request...' : 'Trigger Async Action'}
            </Button>
          </div>
        </div>
      )}

      {/* Interactive LoginForm Showcase */}
      {activeTab === 'login' && (
        <div className="showcase-container">
          <LoginForm
            onSubmit={(credentials) => {
              console.log('Login credentials submitted:', credentials);
            }}
          />
        </div>
      )}

      {/* Interactive TodoList Showcase */}
      {activeTab === 'todo' && (
        <div className="showcase-container">
          <TodoList initialTodos={initialTodos} />
        </div>
      )}

      {/* Footer */}
      <footer className="app-footer">
        <p>
          40-Day Full Stack Developer Internship &bull; Day 19: Frontend Testing Basics & React Testing Library
        </p>
      </footer>
    </div>
  );
}
