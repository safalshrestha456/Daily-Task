import React, { useState, useMemo } from 'react';
import Header from './components/Header.jsx';
import Metrics from './components/Metrics.jsx';
import Controls from './components/Controls.jsx';
import UserCard from './components/UserCard.jsx';
import UserModal from './components/UserModal.jsx';
import { useFetch } from './hooks/useFetch.js';
import { useDebounce } from './hooks/useDebounce.js';
import { FALLBACK_USERS } from './data/fallbackUsers.js';
import './components/Dashboard.css';
import './App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export default function App() {
  // Custom hook: useFetch handles fetching, aborting, fallback data, and refetch
  const { 
    data: rawUsers, 
    loading, 
    error, 
    refetch, 
    lastUpdated, 
    isUsingFallback 
  } = useFetch(API_URL, FALLBACK_USERS);

  // Search, filter, sorting, and modal states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('name-asc');
  const [selectedUser, setSelectedUser] = useState(null);

  // Custom hook: useDebounce delays search execution to demonstrate useEffect cleanup
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Augment fetched users with realistic roles and statuses if missing from upstream API
  const enrichedUsers = useMemo(() => {
    if (!rawUsers || !Array.isArray(rawUsers)) return [];
    
    const statuses = ['Active', 'Active', 'Active', 'Away', 'Offline'];
    const roles = [
      'Senior Frontend Architect',
      'Full Stack Engineer',
      'DevOps & Cloud Specialist',
      'UI/UX Product Designer',
      'Backend & GraphQL Lead',
      'Security & QA Engineer',
      'Database Administrator',
      'API Integrations Specialist',
      'Site Reliability Engineer',
      'Mobile Engineer'
    ];

    return rawUsers.map((user, idx) => ({
      ...user,
      role: user.role || roles[idx % roles.length],
      status: user.status || statuses[idx % statuses.length],
      avatar: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name)}`
    }));
  }, [rawUsers]);

  // Filter and sort users
  const processedUsers = useMemo(() => {
    let result = [...enrichedUsers];

    // Filter by debounced search term
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase().trim();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query) ||
          u.company?.name.toLowerCase().includes(query) ||
          u.address?.city.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (statusFilter !== 'ALL') {
      result = result.filter((u) => u.status === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'company-asc') {
        const cA = a.company?.name || '';
        const cB = b.company?.name || '';
        return cA.localeCompare(cB);
      }
      if (sortBy === 'id-asc') return a.id - b.id;
      return 0;
    });

    return result;
  }, [enrichedUsers, debouncedSearch, statusFilter, sortBy]);

  return (
    <div className="app-wrapper">
      <Header
        loading={loading}
        onRefresh={refetch}
        lastUpdated={lastUpdated}
        isUsingFallback={isUsingFallback}
        error={error}
      />

      {error && (
        <div className="notice-banner warning">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Dynamic Key Performance Metrics */}
      <Metrics users={enrichedUsers} />

      {/* Filter and Search Controls */}
      <Controls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        resultCount={processedUsers.length}
        totalCount={enrichedUsers.length}
      />

      {/* Main Content Area */}
      {loading ? (
        <div className="state-container">
          <div className="spinner"></div>
          <h3 className="state-title">Querying User Telemetry...</h3>
          <p className="state-desc">
            Executing asynchronous HTTP request via custom <code>useFetch</code> hook with AbortController lifecycle management.
          </p>
        </div>
      ) : processedUsers.length === 0 ? (
        <div className="state-container">
          <span style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</span>
          <h3 className="state-title">No Engineers Found</h3>
          <p className="state-desc">
            No profiles match your current search query "{debouncedSearch}" or selected status filter.
          </p>
          <button 
            className="secondary-btn" 
            style={{ marginTop: '1.25rem' }}
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('ALL');
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="users-grid">
          {processedUsers.map((user) => (
            <UserCard 
              key={user.id} 
              user={user} 
              onSelect={setSelectedUser} 
            />
          ))}
        </div>
      )}

      {/* User Detail Modal */}
      {selectedUser && (
        <UserModal 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)} 
        />
      )}

      <footer className="dashboard-footer">
        <p>
          40-Day Full Stack Developer Internship &bull; Day 17: <code>useEffect</code>, <code>useContext</code>, Custom Hooks (<code>useFetch</code>, <code>useDebounce</code>)
        </p>
      </footer>
    </div>
  );
}
