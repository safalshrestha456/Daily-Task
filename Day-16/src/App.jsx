import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Pages
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Products from './pages/Products.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Contact from './pages/Contact.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NotFound from './pages/NotFound.jsx';

/**
 * Day 16: React Router Multi-Page Platform
 * Author: Safal Shrestha - Full Stack Developer Intern
 */

function App() {
  // Authentication state for simulating Protected Routes
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleAuth = () => {
    setIsAuthenticated(prev => !prev);
  };

  return (
    <div className="app-shell">
      {/* Top Navbar with NavLinks */}
      <Navbar 
        isAuthenticated={isAuthenticated} 
        onToggleAuth={toggleAuth} 
      />

      {/* Main Routes Outlet */}
      <main className="app-main">
        <Routes>
          {/* 1. Home Page */}
          <Route path="/" element={<Home />} />

          {/* 2. About Page */}
          <Route path="/about" element={<About />} />

          {/* 3. Products Catalog Page */}
          <Route path="/products" element={<Products />} />

          {/* 4. Product Details with Dynamic Route Param :id */}
          <Route path="/products/:id" element={<ProductDetails />} />

          {/* 5. Contact Page */}
          <Route path="/contact" element={<Contact />} />

          {/* 6. Protected Route: Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard onLogout={() => setIsAuthenticated(false)} />
              </ProtectedRoute>
            }
          />

          {/* 7. 404 Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}

export default App;
