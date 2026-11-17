import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products.js';
import './Pages.css';

function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Hardware", "Audio", "Connectivity", "Displays", "Workspace"];

  // Filter products by category and search
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCat = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="page products-page">
      <div className="container">
        <header className="page-header">
          <span className="sub-title">Catalog</span>
          <h1>Developer Hardware & Workspace Tools</h1>
          <p>Click on any product card to navigate to its dynamic details route (<code>/products/:id</code>).</p>
        </header>

        {/* Toolbar: Category Filters & Search */}
        <div className="products-toolbar">
          <div className="category-pills">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="search-wrap">
            <input
              type="text"
              placeholder="Search gear by name or spec..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <article key={product.id} className="product-card">
                <div className="card-top">
                  <span className="product-emoji">{product.emoji}</span>
                  <div className="card-badges">
                    <span className="badge-flag">{product.badge}</span>
                    <span className={`stock-indicator ${product.inStock ? 'in' : 'out'}`}>
                      {product.inStock ? 'In Stock' : 'Sold Out'}
                    </span>
                  </div>
                </div>

                <h3>{product.name}</h3>
                <p className="card-summary">{product.summary}</p>

                <div className="rating-row">
                  <span>⭐ {product.rating.toFixed(1)}</span>
                  <span className="reviews-cnt">({product.reviewsCount} reviews)</span>
                </div>

                <div className="card-bottom">
                  <span className="price-tag">${product.price.toFixed(2)}</span>
                  <Link to={`/products/${product.id}`} className="btn-detail">
                    View Details &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-box">
            <span>🔍</span>
            <h3>No products found</h3>
            <p>No gear matched "{searchQuery}" under category "{selectedCategory}".</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
