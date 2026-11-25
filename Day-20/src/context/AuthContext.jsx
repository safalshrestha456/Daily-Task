// ============================================================================
// Context: AuthContext
// Purpose: Global authentication state management & session persistence
// ============================================================================

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const STORAGE_KEY = 'taskflow_auth_session';

export function AuthProvider({ children }) {
  // Initialize user session from localStorage or set default demo user
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {
        id: 'usr_demo_101',
        name: 'Safal Shrestha',
        email: 'safal.intern@taskflow.dev',
        role: 'Full Stack Engineer',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SafalDev&backgroundColor=b6e3f4'
      };
    } catch {
      return null;
    }
  });

  // Sync session state to browser storage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  /**
   * Log in user with credentials
   */
  const login = (email, password) => {
    // In mini project, simulate successful auth
    const authUser = {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email,
      role: 'Full Stack Engineer',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}&backgroundColor=b6e3f4`
    };
    setUser(authUser);
    return authUser;
  };

  /**
   * Register new user account
   */
  const register = (name, email, password) => {
    const newUser = {
      id: 'usr_' + Date.now(),
      name,
      email,
      role: 'Frontend Developer',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}&backgroundColor=c0aede`
    };
    setUser(newUser);
    return newUser;
  };

  /**
   * Log out current user
   */
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom Hook: useAuth
 * Access auth state anywhere in the component tree
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be consumed within an <AuthProvider>');
  }
  return context;
}
