import React from 'react';
import './App.css';

/**
 * Day 11: React Introduction, Vite Setup, Project Structure & JSX
 * Author: Safal Shrestha - Full Stack Developer Intern
 */

function App() {
  // Dynamic JavaScript variables embedded in JSX via curly braces {}
  const developerName = "Safal Shrestha";
  const role = "Full Stack Developer Intern";
  const currentWeek = 3;
  const currentDay = 11;
  const repoUrl = "https://github.com/safalshrestha456/Daily-Task";

  // Data structures mapped inside JSX
  const skills = [
    {
      category: "Frontend Engineering",
      icon: "⚛️",
      items: ["React 18", "Vite", "JSX", "Tailwind CSS", "JavaScript ES6+", "HTML5 Semantic"]
    },
    {
      category: "Backend & APIs",
      icon: "⚡",
      items: ["Python 3", "FastAPI", "GraphQL Schemas", "Pydantic Models", "RESTful APIs", "JWT Auth"]
    },
    {
      category: "Database & ORM",
      icon: "🗄️",
      items: ["PostgreSQL", "SQLAlchemy", "Alembic Migrations", "ACID Transactions", "Connection Pooling"]
    },
    {
      category: "DevOps & Tools",
      icon: "🐳",
      items: ["Docker", "Docker Compose", "Git & GitHub", "Linux CLI", "Postman", "Vite HMR"]
    }
  ];

  const featuredProjects = [
    {
      title: "Full Stack Task Management System",
      category: "Internship Capstone Project",
      days: "Phase 4 - 8",
      description: "Enterprise task orchestration application featuring React + Apollo Client on the frontend, FastAPI GraphQL backend, PostgreSQL database, and Docker containerization.",
      techStack: ["React", "Apollo Client", "FastAPI", "GraphQL", "PostgreSQL", "Docker"],
      link: "https://github.com/safalshrestha456/Full-Stack-internship"
    },
    {
      title: "Daily Task 40-Day Progress Repository",
      category: "Curriculum Ledger",
      days: "Days 01 - 40",
      description: "Day-by-day practical implementations tracking progressive mastery from web fundamentals and JavaScript DOM to React, FastAPI, GraphQL, and cloud deployment.",
      techStack: ["HTML/CSS", "JavaScript", "React+Vite", "FastAPI", "Git Workflow"],
      link: "https://github.com/safalshrestha456/Daily-Task"
    },
    {
      title: "API-Based User Directory & Directory",
      category: "Async JS Showcase",
      days: "Day 10",
      description: "Asynchronous client application communicating with REST endpoints via Fetch API, handling async/await promises, HTTP POST/GET requests, and loading states.",
      techStack: ["JavaScript ES6+", "Fetch API", "Async/Await", "REST", "JSON"],
      link: "https://github.com/safalshrestha456/Daily-Task/tree/main/Day-10"
    }
  ];

  return (
    <div className="portfolio-app">
      {/* Sticky Navigation Bar */}
      <nav className="navbar">
        <div className="container nav-content">
          <div className="nav-brand">
            <span className="brand-badge">R</span>
            <span>{developerName}</span>
          </div>

          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#jsx-concepts">JSX Rules</a>
            <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="btn-nav">
              GitHub Repo &rarr;
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section" id="about">
        <div className="container">
          <div className="hero-pill">
            <span className="pulse-dot"></span>
            <span>Week {currentWeek} &bull; Day {currentDay}: React with Vite</span>
          </div>

          <h1 className="hero-title">
            Building Modern Web Applications with <br />
            <span className="gradient-text">React, Vite & Clean Architecture</span>
          </h1>

          <p className="hero-subtitle">
            Hello! I'm <strong>{developerName}</strong>, a <strong>{role}</strong> undergoing an intensive 
            2-month professional training program. Welcome to my React portfolio homepage created with Vite!
          </p>

          <div className="hero-cta">
            <a href="#projects" className="btn-primary">
              <span>View Featured Projects</span> &darr;
            </a>
            <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Explore 40-Day Curriculum
            </a>
          </div>
        </div>
      </header>

      {/* Skills Section */}
      <section className="section" id="skills">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Core Proficiencies</span>
            <h2 className="section-title">Technical Skills & Tooling</h2>
          </div>

          <div className="skills-grid">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="skill-card">
                <div className="skill-icon">{skillGroup.icon}</div>
                <h3>{skillGroup.category}</h3>
                <div className="skill-tags">
                  {skillGroup.items.map((item, i) => (
                    <span key={i} className="skill-tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section" id="projects">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Portfolio Milestones</span>
            <h2 className="section-title">Featured Internship Projects</h2>
          </div>

          <div className="projects-grid">
            {featuredProjects.map((project, idx) => (
              <article key={idx} className="project-card">
                <div>
                  <div className="project-meta">
                    <span className="project-category">{project.category}</span>
                    <span className="project-days">{project.days}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>

                <div>
                  <div className="project-stack">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="stack-pill">{tech}</span>
                    ))}
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    Explore Codebase &rarr;
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Educational Concept Box */}
          <div className="jsx-concepts-card" id="jsx-concepts">
            <h3>💡 Core JSX & Vite Concepts Learned in Day 11:</h3>
            <div className="concepts-grid">
              <div className="concept-box">
                <strong>1. JSX is Not HTML:</strong>
                It is a syntax extension for JavaScript that compiles to <code>React.createElement()</code> function calls via Vite's esbuild.
              </div>
              <div className="concept-box">
                <strong>2. Single Root / Fragment:</strong>
                A React component must return a single root element or a Fragment (<code>&lt;&gt;...&lt;/&gt;</code>).
              </div>
              <div className="concept-box">
                <strong>3. JavaScript Expressions in {}:</strong>
                Dynamic data, variables, expressions, and function calls are evaluated inside curly braces <code>{'{developerName}'}</code>.
              </div>
              <div className="concept-box">
                <strong>4. Attribute Naming:</strong>
                JSX uses camelCase attributes: <code>className</code> instead of <code>class</code>, and <code>htmlFor</code> instead of <code>for</code>.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 {developerName} &bull; Full Stack Developer Intern &bull; Day 11 React with Vite</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
