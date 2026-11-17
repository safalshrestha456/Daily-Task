import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products.js';
import './Pages.css';

function Home() {
  const featured = PRODUCTS.slice(0, 3);

  return (
    <div className="page home-page">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="container">
          <div className="badge-pill">
            <span className="dot-green"></span>
            <span>Day 16: Multi-Page React Router Architecture</span>
          </div>

          <h1 className="hero-title">
            Premium Engineering Gear Built for <br />
            <span className="gradient-text">High-Velocity Full Stack Developers</span>
          </h1>

          <p className="hero-desc">
            Explore ergonomic mechanical keyboards, ultrawide displays, and active noise-cancelling 
            headphones designed to maintain engineering flow state.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">
              Browse All Products ({PRODUCTS.length}) &rarr;
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Learn About Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Teaser */}
      <section className="container featured-section">
        <div className="section-head">
          <div>
            <span className="sub-title">Staff Picks</span>
            <h2>Featured Hardware & Accessories</h2>
          </div>
          <Link to="/products" className="link-all">
            View All Products &rarr;
          </Link>
        </div>

        <div className="products-grid">
          {featured.map(product => (
            <article key={product.id} className="product-card">
              <div className="card-top">
                <span className="product-emoji">{product.emoji}</span>
                <span className="category-pill">{product.category}</span>
              </div>
              <h3>{product.name}</h3>
              <p className="card-summary">{product.summary}</p>
              
              <div className="card-bottom">
                <span className="price-tag">${product.price.toFixed(2)}</span>
                <Link to={`/products/${product.id}`} className="btn-detail">
                  View Details &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
