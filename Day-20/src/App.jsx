// ============================================================================
// Component: App (TaskFlow Pro Application Router & Layout Shell)
// ============================================================================

import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import TaskModal from './components/TaskModal.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Analytics from './pages/Analytics.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { useAuth } from './context/AuthContext.jsx';
import './App.css';

export default function App() {
  const { isAuthenticated } = useAuth();
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* Header Navigation */}
      <Navbar onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)} />

      <div className="main-shell">
        {/* Render Sidebar only for authenticated users */}
        {isAuthenticated && <Sidebar />}

        <main className="content-area">
          <Routes>
            {/* Public Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Workspace Views */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Global New Task Modal (accessible from header on any page) */}
      {isNewTaskModalOpen && (
        <TaskModal
          taskToEdit={null}
          onClose={() => setIsNewTaskModalOpen(false)}
        />
      )}
    </div>
  );
}
