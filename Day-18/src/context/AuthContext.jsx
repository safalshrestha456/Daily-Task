import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_PERSONAS } from '../data/mockPersonas.js';

const AuthContext = createContext();

const STORAGE_KEY_USER = 'day18_auth_user';
const STORAGE_KEY_TOKEN = 'day18_auth_token';
const STORAGE_KEY_LOGS = 'day18_auth_logs';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_TOKEN) || null;
  });

  const [logs, setLogs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LOGS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'log_init',
        timestamp: new Date().toLocaleTimeString(),
        type: 'SYSTEM',
        message: 'AuthContext initialized. Ready for authentication.',
      },
    ];
  });

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem(STORAGE_KEY_TOKEN, token);
    } else {
      localStorage.removeItem(STORAGE_KEY_TOKEN);
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs.slice(-20)));
  }, [logs]);

  const addLog = (type, message) => {
    const newEntry = {
      id: 'log_' + Date.now() + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toLocaleTimeString(),
      type,
      message,
    };
    setLogs((prev) => [newEntry, ...prev]);
  };

  /**
   * Standard Login via email & password
   */
  const login = async (email, password) => {
    setIsAuthenticating(true);

    // Simulate network authentication delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const matched = MOCK_PERSONAS.find(
      (p) => p.email.toLowerCase() === email.toLowerCase().trim()
    );

    if (!matched) {
      setIsAuthenticating(false);
      addLog('FAILURE', `Failed login attempt for unknown email: "${email}"`);
      throw new Error('User not found. Try one of the test persona emails or use Quick Login.');
    }

    if (matched.password !== password) {
      setIsAuthenticating(false);
      addLog('FAILURE', `Failed login attempt for ${matched.email} (invalid password)`);
      throw new Error('Invalid credentials provided.');
    }

    const mockJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
      JSON.stringify({ sub: matched.id, role: matched.role, exp: Date.now() + 3600000 })
    )}.mock_signature_${Date.now()}`;

    setUser(matched);
    setToken(mockJwt);
    setIsAuthenticating(false);
    addLog('AUTH', `User "${matched.name}" successfully authenticated as [${matched.role}].`);

    return matched;
  };

  /**
   * Instant 1-Click Persona Switcher for smooth testing
   */
  const quickLogin = (personaId) => {
    const target = MOCK_PERSONAS.find((p) => p.id === personaId) || MOCK_PERSONAS[0];
    const mockJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
      JSON.stringify({ sub: target.id, role: target.role, exp: Date.now() + 3600000 })
    )}.mock_signature_${Date.now()}`;

    setUser(target);
    setToken(mockJwt);
    addLog('QUICK_LOGIN', `Switched active session to persona "${target.name}" (${target.role}).`);
  };

  /**
   * Log out and wipe session state
   */
  const logout = () => {
    const oldName = user ? user.name : 'Unknown';
    setUser(null);
    setToken(null);
    addLog('LOGOUT', `User "${oldName}" signed out. Session destroyed.`);
  };

  /**
   * Update User Profile (shows immediate reactivity across all components without prop drilling)
   */
  const updateProfile = (updates) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      addLog('PROFILE_UPDATE', `Profile for "${prev.name}" was updated.`);
      return updated;
    });
  };

  /**
   * RBAC Helper
   */
  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission) || user.role === 'ADMIN';
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isAuthenticating,
    login,
    quickLogin,
    logout,
    updateProfile,
    hasPermission,
    logs,
    addLog,
    clearLogs,
    personas: MOCK_PERSONAS,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom Hook: useAuth
 * Eliminates prop drilling by allowing any child component to consume
 * auth state and dispatch actions directly.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be consumed within an <AuthProvider>');
  }
  return context;
}
