import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products.js';
import './Pages.css';

/**
 * Product Details Page Component
 * Demonstrates:
 * 1. useParams() to extract route parameter (:id) from URL
 * 2. useNavigate() for programmatic navigation (Back button)
 * 3. Handling invalid IDs gracefully
 * 4. Rich specifications rendering
 */
function ProductDetails() {
  const { id } = useParams(); // Extracts the :id route param
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  // Find product by id from dataset
  const product = PRODUCTS.find(p => p.id === id);

  // Fallback if product does not exist
  if (!product) {
    return (
      <div className="page product-details-page">
        <div className="container">
          <div className="not-found-card">
            <span className="not-found-icon">⚠️</span>
            <h2>Product Not Found</h2>
            <p>No gear item exists with the identifier: <code>{id}</code></p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                &larr; Go Back
              </button>
              <Link to="/products" className="btn btn-primary">
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="page product-details-page">
      <div className="container">
        {/* Breadcrumb Navigation using Link */}
        <nav className="breadcrumb-nav">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <span className="current-crumb">{product.name}</span>
        </nav>

        {/* Product Layout Grid */}
        <div className="details-layout">
          {/* Media Showcase */}
          <div className="details-media-box">
            <span className="large-emoji">{product.emoji}</span>
            <span className="details-badge">{product.badge}</span>
          </div>

          {/* Details Content */}
          <div className="details-content-box">
            <div className="details-header-meta">
              <span className="category-pill">{product.category}</span>
              <span className="param-pill">Param: <code>:id = "{id}"</code></span>
            </div>

            <h1 className="details-title">{product.name}</h1>

            <div className="rating-row">
              <span className="stars">⭐ {product.rating}</span>
              <span className="reviews-cnt">Based on {product.reviewsCount} verified developer reviews</span>
            </div>

            <div className="price-hero">
              <span className="price-val">${product.price.toFixed(2)}</span>
              <span className={`stock-status ${product.inStock ? 'in' : 'out'}`}>
                {product.inStock ? `✓ In Stock (${product.stockCount} units available)` : "✕ Currently Out of Stock"}
              </span>
            </div>

            <p className="details-description">{product.description}</p>

            {/* Actions */}
            <div className="details-action-buttons">
              <button
                type="button"
                className={`btn btn-primary btn-lg ${added ? 'btn-success' : ''}`}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {added ? "✓ Added to Developer Cart!" : product.inStock ? "🛒 Add to Cart" : "Out of Stock"}
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={() => navigate('/products')}
              >
                &larr; Back to Catalog
              </button>
            </div>

            {/* Specifications Table */}
            <div className="specs-section">
              <h3>Technical Specifications:</h3>
              <table className="specs-table">
                <tbody>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <tr key={key}>
                      <td className="spec-key">{key}</td>
                      <td className="spec-val">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;
