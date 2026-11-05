import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm.jsx';
import TodoItem from './components/TodoItem.jsx';
import TodoFilters from './components/TodoFilters.jsx';
import './App.css';

/**
 * Day 15: React Todo App - Lists, Key Prop, Empty States & Filters
 * Author: Safal Shrestha - Full Stack Developer Intern
 */

const STORAGE_KEY = 'day15_react_todos';

const INITIAL_TODOS = [
  { id: 'task-1', text: 'Understand Virtual DOM reconciliation with Keys', priority: 'high', completed: true, createdAt: '09:00 AM' },
  { id: 'task-2', text: 'Build modular React components with Props', priority: 'high', completed: true, createdAt: '09:30 AM' },
  { id: 'task-3', text: 'Master useState and controlled inputs in forms', priority: 'medium', completed: false, createdAt: '10:15 AM' },
  { id: 'task-4', text: 'Practice contextual empty states and filtering', priority: 'medium', completed: false, createdAt: '11:00 AM' },
  { id: 'task-5', text: 'Prepare for Week 4 Advanced React & React Router', priority: 'low', completed: false, createdAt: '11:45 AM' }
];

function App() {
  // Initialize state from LocalStorage or fallback to default tasks
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_TODOS;
    } catch (e) {
      console.warn("Failed to read localStorage:", e);
      return INITIAL_TODOS;
    }
  });

  const [activeFilter, setActiveFilter] = useState('all');

  // Synchronize state changes to LocalStorage via useEffect
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
      console.error("Failed to write to localStorage:", e);
    }
  }, [todos]);

  // Handler: Add Task
  const handleAddTask = (newTask) => {
    setTodos(prev => [newTask, ...prev]);
  };

  // Handler: Toggle Task Completion
  const handleToggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Handler: Delete Task
  const handleDeleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  // Handler: Edit Task Text
  const handleEditTodo = (id, newText) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  // Handler: Clear All Completed
  const handleClearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  // Filtered Todos calculation
  const filteredTodos = todos.filter(todo => {
    if (activeFilter === 'active') return !todo.completed;
    if (activeFilter === 'completed') return todo.completed;
    return true; // 'all'
  });

  // Dynamic counts for filter badges
  const counts = {
    all: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length
  };

  return (
    <div className="app-root">
      {/* Top Header */}
      <header className="app-header">
        <div className="container header-content">
          <div className="brand">
            <span className="brand-badge">TODO</span>
            <div className="brand-text">
              <h1>TaskFlow React App</h1>
              <p>Day 15: Lists, Key Prop, Empty States, Add, Delete & Filter</p>
            </div>
          </div>
          <span className="meta-pill">Safal Shrestha &bull; Full Stack Intern</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="container main-content">
        <div className="todo-app-card">
          
          {/* Add Todo Form */}
          <TodoForm onAddTask={handleAddTask} />

          {/* Filter Bar with Live Counts */}
          <TodoFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={counts}
            onClearCompleted={handleClearCompleted}
          />

          {/* Dynamic Todo List OR Contextual Empty State */}
          {filteredTodos.length > 0 ? (
            <ul className="todos-list-container">
              {filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id} /* CRITICAL: Unique and stable key prop */
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                  onEdit={handleEditTodo}
                />
              ))}
            </ul>
          ) : (
            <div className="empty-state-box">
              <span className="empty-state-icon">
                {activeFilter === 'completed' ? '⏳' : activeFilter === 'active' ? '🎉' : '📝'}
              </span>
              <h3>
                {activeFilter === 'completed' 
                  ? "No completed tasks yet" 
                  : activeFilter === 'active' 
                    ? "All caught up! No active tasks" 
                    : "Your todo list is empty"}
              </h3>
              <p>
                {activeFilter === 'completed' 
                  ? "Finish a task and check the box to see it here."
                  : activeFilter === 'active'
                    ? "Great job! Take a break or add a new goal above."
                    : "Add your first task above to start tracking your progress!"}
              </p>
            </div>
          )}

          {/* Footer Status */}
          <div className="card-stats-footer">
            <span>
              <strong>{counts.active}</strong> item{counts.active === 1 ? '' : 's'} remaining
            </span>
            <span className="storage-status">
              💾 Synced with LocalStorage
            </span>
          </div>
        </div>

        {/* Concept Reference Card */}
        <section className="concept-guide-card">
          <h3>💡 React Lists & Keys Principles Mastered in Day 15:</h3>
          <div className="guide-grid">
            <div className="guide-box">
              <strong>1. The Key Prop:</strong>
              Keys give elements a stable identity across renders, enabling React's reconciliation engine to identify which items have changed, been added, or removed.
            </div>
            <div className="guide-box">
              <strong>2. Never Use Array Indexes as Keys:</strong>
              Using index causes subtle bugs when reordering, deleting, or inserting items at the top. Always use unique identifiers like <code>todo.id</code>.
            </div>
            <div className="guide-box">
              <strong>3. Contextual Empty States:</strong>
              Clear messaging customized to the active filter tab provides immediate clarity when list queries return 0 items.
            </div>
            <div className="guide-box">
              <strong>4. State Immutability:</strong>
              Adding, deleting, or updating list items always creates a new array reference via <code>[...prev]</code>, <code>filter()</code>, or <code>map()</code>.
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>&copy; 2026 Safal Shrestha &bull; Full Stack Developer Intern &bull; Day 15 Lists, Key Prop & Filters</p>
      </footer>
    </div>
  );
}

export default App;
