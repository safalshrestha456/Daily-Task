// ============================================================================
// Context: TaskContext
// Purpose: Centralized Task Store providing full CRUD, filtering, & metrics
// ============================================================================

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const TaskContext = createContext();

const STORAGE_KEY = 'taskflow_tasks_store';

// Default initial tasks representing full stack project deliverables
const DEFAULT_TASKS = [
  {
    id: 'TSK-101',
    title: 'Setup React Router and Protected Route Guards',
    description: 'Configure client-side SPA routing, dynamic route parameters, and auth verification.',
    status: 'COMPLETED',
    priority: 'HIGH',
    dueDate: '2026-11-20',
    assignedTo: 'Safal Shrestha',
    createdAt: '2026-11-16',
    updatedAt: '2026-11-17',
  },
  {
    id: 'TSK-102',
    title: 'Implement Custom useFetch and useDebounce Hooks',
    description: 'Abstract network lifecycle and AbortController request cancellation to eliminate race conditions.',
    status: 'COMPLETED',
    priority: 'HIGH',
    dueDate: '2026-11-21',
    assignedTo: 'Safal Shrestha',
    createdAt: '2026-11-17',
    updatedAt: '2026-11-17',
  },
  {
    id: 'TSK-103',
    title: 'Design Context API Store for Global Auth State',
    description: 'Eliminate prop drilling by distributing token and user session via React Context API.',
    status: 'COMPLETED',
    priority: 'MEDIUM',
    dueDate: '2026-11-22',
    assignedTo: 'Safal Shrestha',
    createdAt: '2026-11-18',
    updatedAt: '2026-11-18',
  },
  {
    id: 'TSK-104',
    title: 'Write Unit & Integration Tests using React Testing Library',
    description: 'Achieve 100% test coverage across Button, LoginForm, and TodoList interactive components.',
    status: 'IN_PROGRESS',
    priority: 'URGENT',
    dueDate: '2026-11-25',
    assignedTo: 'Safal Shrestha',
    createdAt: '2026-11-24',
    updatedAt: '2026-11-25',
  },
  {
    id: 'TSK-105',
    title: 'Prepare FastAPI + GraphQL Task Backend Models',
    description: 'Design Pydantic schemas, SQLAlchemy models, and Strawberry GraphQL resolvers for tasks.',
    status: 'TODO',
    priority: 'HIGH',
    dueDate: '2026-11-28',
    assignedTo: 'Safal Shrestha',
    createdAt: '2026-11-25',
    updatedAt: '2026-11-25',
  },
  {
    id: 'TSK-106',
    title: 'Dockerize Frontend & Backend Multi-Stage Containers',
    description: 'Write production Dockerfile and docker-compose.yml linking PostgreSQL, FastAPI, and Vite.',
    status: 'TODO',
    priority: 'MEDIUM',
    dueDate: '2026-12-05',
    assignedTo: 'Safal Shrestha',
    createdAt: '2026-11-25',
    updatedAt: '2026-11-25',
  },
];

export function TaskProvider({ children }) {
  // Load tasks from localStorage or initialize with defaults
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_TASKS;
    } catch {
      return DEFAULT_TASKS;
    }
  });

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  /**
   * Create a new task
   */
  const createTask = (taskData) => {
    const newTask = {
      id: `TSK-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      ...taskData,
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  /**
   * Update an existing task
   */
  const updateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, ...updates, updatedAt: new Date().toISOString().split('T')[0] }
          : t
      )
    );
  };

  /**
   * Quick status change (useful for Kanban drag/click)
   */
  const updateStatus = (id, newStatus) => {
    updateTask(id, { status: newStatus });
  };

  /**
   * Delete a task
   */
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  /**
   * Reset to default project dataset
   */
  const resetToDefaults = () => {
    setTasks(DEFAULT_TASKS);
  };

  // Filtered tasks computation
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      // Search matching
      const matchesSearch =
        searchQuery === '' ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase());

      // Status matching
      const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;

      // Priority matching
      const matchesPriority = priorityFilter === 'ALL' || t.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  // Dynamic project metrics
  const metrics = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'COMPLETED').length;
    const inProgress = tasks.filter((t) => t.status === 'IN_PROGRESS').length;
    const todo = tasks.filter((t) => t.status === 'TODO').length;
    const urgent = tasks.filter((t) => t.priority === 'URGENT').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, inProgress, todo, urgent, completionRate };
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        createTask,
        updateTask,
        updateStatus,
        deleteTask,
        resetToDefaults,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        priorityFilter,
        setPriorityFilter,
        metrics,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

/**
 * Custom Hook: useTasks
 */
export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be consumed within a <TaskProvider>');
  }
  return context;
}
