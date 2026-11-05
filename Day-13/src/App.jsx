import React, { useState } from 'react';
import ProductCard from './components/ProductCard.jsx';
import CartSummary from './components/CartSummary.jsx';
import './App.css';

/**
 * Day 13: useState, Event Handling & Conditional Rendering
 * Assignment: Product Quantity Counter
 * Author: Safal Shrestha - Full Stack Developer Intern
 */

function App() {
  // Global cart state holding added items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Mechanical Developer Keyboard",
      price: 129.99,
      quantity: 1,
      subtotal: 129.99
    }
  ]);

  const handleAddToCart = (item) => {
    setCartItems(prev => {
      // If item already exists in cart, update its quantity and subtotal
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: item.quantity, subtotal: item.subtotal }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="app-root">
      {/* Top Header */}
      <header className="app-header">
        <div className="container header-content">
          <div className="brand">
            <span className="brand-badge">STATE</span>
            <div className="brand-text">
              <h1>Product Quantity Counter</h1>
              <p>Day 13: useState Hook, Event Handling & Conditional Rendering</p>
            </div>
          </div>
          <span className="meta-pill">Safal Shrestha &bull; Full Stack Intern</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="container main-content">
        <div className="ecommerce-layout">
          {/* Left: Product Card with Quantity Counter */}
          <section className="product-section">
            <ProductCard
              id={1}
              name="Mechanical Developer Keyboard (RGB)"
              category="Developer Gear"
              price={129.99}
              stock={6}
              image="⌨️"
              description="Custom hot-swappable tactile switches, sound-dampening foam, per-key RGB, and detachable braided Type-C cable."
              onAddToCart={handleAddToCart}
            />
          </section>

          {/* Right: Cart Summary */}
          <aside className="summary-section">
            <CartSummary 
              cartItems={cartItems}
              onClearCart={handleClearCart}
            />
          </aside>
        </div>

        {/* Concept Reference Section */}
        <section className="state-guide-card">
          <h3>💡 React State & Event Concepts Learned in Day 13:</h3>
          <div className="guide-grid">
            <div className="guide-box">
              <strong>1. The useState Hook:</strong>
              <code>const [state, setState] = useState(initialValue);</code> preserves values between renders and triggers re-render on updates.
            </div>
            <div className="guide-box">
              <strong>2. Functional State Updates:</strong>
              Always use the functional form <code>setCount(prev =&gt; prev + 1)</code> when the new state depends on the previous state.
            </div>
            <div className="guide-box">
              <strong>3. Conditional Rendering (&&):</strong>
              <code>{'{stock <= 2 && <Alert /> }'}</code> renders elements only when conditions evaluate to truthy.
            </div>
            <div className="guide-box">
              <strong>4. Ternary Rendering:</strong>
              <code>{'{isAdded ? <Success /> : <Default /> }'}</code> switches between alternative markup dynamically.
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>&copy; 2026 Safal Shrestha &bull; Full Stack Developer Intern &bull; Day 13 useState & Conditional Rendering</p>
      </footer>
    </div>
  );
}

export default App;
