import React, { useState } from 'react';
import TeamCard from './components/TeamCard.jsx';
import DepartmentFilter from './components/DepartmentFilter.jsx';
import { TEAM_MEMBERS } from './data/teamMembers.js';
import './App.css';

/**
 * Day 12: Functional Components, Reusable Components & Props
 * Author: Safal Shrestha - Full Stack Developer Intern
 */

function App() {
  const [selectedDept, setSelectedDept] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const departments = ["All", "Engineering", "Architecture", "Backend", "DevOps"];

  // Filter team members based on department and search query
  const filteredMembers = TEAM_MEMBERS.filter((member) => {
    const matchesDept = selectedDept === "All" || member.department === selectedDept;
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  return (
    <div className="app-root">
      {/* Top Header */}
      <header className="app-header">
        <div className="container header-content">
          <div className="brand">
            <span className="brand-badge">PROPS</span>
            <div className="brand-text">
              <h1>Engineering Team Directory</h1>
              <p>Day 12: Functional Components, Reusability & Props</p>
            </div>
          </div>
          <span className="meta-pill">Safal Shrestha &bull; Full Stack Intern</span>
        </div>
      </header>

      {/* Main Body */}
      <main className="container main-content">
        
        {/* Controls Toolbar: Search & Reusable DepartmentFilter component */}
        <section className="controls-bar">
          <DepartmentFilter
            departments={departments}
            activeDepartment={selectedDept}
            onSelectDepartment={setSelectedDept}
          />

          <div className="search-box">
            <input
              type="text"
              placeholder="Search by name, role, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        {/* Team Cards Grid (Rendering multiple TeamCard instances via Props) */}
        <section className="cards-grid">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <TeamCard
                key={member.id}
                name={member.name}
                role={member.role}
                department={member.department}
                initials={member.initials}
                bio={member.bio}
                skills={member.skills}
                isLeader={member.isLeader}
                status={member.status}
                github={member.github}
                linkedin={member.linkedin}
              />
            ))
          ) : (
            <div className="empty-state">
              <h3>No team members found matching "{searchQuery}"</h3>
              <p>Try selecting another department or clearing your search term.</p>
            </div>
          )}
        </section>

        {/* Educational Reference on Props & Functional Components */}
        <section className="props-guide-card">
          <h3>💡 Props & Component Reusability Concepts Learned:</h3>
          <div className="guide-grid">
            <div className="guide-box">
              <strong>1. Functional Components:</strong>
              JavaScript functions that accept an arbitrary argument called <code>props</code> and return React elements.
            </div>
            <div className="guide-box">
              <strong>2. Props Are Read-Only:</strong>
              A component must never modify its own props. It must act like a pure function with respect to its props.
            </div>
            <div className="guide-box">
              <strong>3. Destructuring & Defaults:</strong>
              Extract props directly in parameters: <code>{'{ name, role = "Developer" }'}</code> for clean readability and safety.
            </div>
            <div className="guide-box">
              <strong>4. Passing Callbacks as Props:</strong>
              Components communicate back to parents by calling functions passed via props (e.g. <code>onSelectDepartment</code>).
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>&copy; 2026 Safal Shrestha &bull; Full Stack Developer Intern &bull; Day 12 Functional Components & Props</p>
      </footer>
    </div>
  );
}

export default App;
