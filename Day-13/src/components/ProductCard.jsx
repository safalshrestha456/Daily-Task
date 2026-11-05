import React, { useState } from 'react';
import './ProductCard.css';

/**
 * Product Quantity Counter Component
 * Demonstrates:
 * 1. useState hook for stateful counter management
 * 2. Synthetic Event Handling (onClick, onChange)
 * 3. Conditional Rendering (&&, ternary operator, dynamic classNames)
 * 4. Boundary protection (min: 1, max: stock)
 */
function ProductCard({
  id = 1,
  name = "Mechanical Developer Keyboard",
  category = "Hardware & Peripherals",
  price = 129.99,
  stock = 8,
  image = "⌨️",
  description = "Custom hot-swappable tactile switches with RGB per-key backlighting and USB-C connectivity.",
  onAddToCart = () => {}
}) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Computed subtotal
  const subtotal = (quantity * price).toFixed(2);
  const remainingStock = stock - quantity;

  // Handlers with bounds checking
  const handleIncrement = () => {
    if (quantity < stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setQuantity(1);
  };

  const handleAddToCart = () => {
    setIsAdded(true);
    onAddToCart({ id, name, price, quantity, subtotal: parseFloat(subtotal) });
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="product-card">
      <div className="product-media">
        <span className="product-emoji">{image}</span>
        
        {/* Conditional Badge: Low Stock vs In Stock */}
        {stock === 0 ? (
          <span className="badge-stock badge-out">Out of Stock</span>
        ) : remainingStock <= 2 ? (
          <span className="badge-stock badge-urgent">Only {remainingStock} Left!</span>
        ) : (
          <span className="badge-stock badge-in">In Stock ({stock})</span>
        )}
      </div>

      <div className="product-body">
        <span className="product-category">{category}</span>
        <h3 className="product-title">{name}</h3>
        <p className="product-desc">{description}</p>

        {/* Pricing Display */}
        <div className="pricing-box">
          <div className="unit-price">
            <span className="price-label">Unit Price:</span>
            <span className="price-val">${price.toFixed(2)}</span>
          </div>
          <div className="subtotal-price">
            <span className="price-label">Subtotal:</span>
            <span className="subtotal-val">${subtotal}</span>
          </div>
        </div>

        {/* Interactive Quantity Counter Controls */}
        <div className="counter-controls-wrap">
          <span className="controls-label">Select Quantity:</span>
          
          <div className="counter-group">
            {/* Decrement Button with conditional disabled state */}
            <button
              className={`counter-btn ${quantity <= 1 ? 'disabled' : ''}`}
              onClick={handleDecrement}
              disabled={quantity <= 1}
              title={quantity <= 1 ? "Minimum quantity is 1" : "Decrease quantity"}
            >
              &minus;
            </button>

            {/* Current Quantity Display */}
            <span className="counter-display">{quantity}</span>

            {/* Increment Button with conditional disabled state */}
            <button
              className={`counter-btn ${quantity >= stock ? 'disabled' : ''}`}
              onClick={handleIncrement}
              disabled={quantity >= stock}
              title={quantity >= stock ? `Max available stock is ${stock}` : "Increase quantity"}
            >
              +
            </button>

            {/* Quick Reset Button (Conditional rendering: only when > 1) */}
            {quantity > 1 && (
              <button className="reset-btn" onClick={handleReset} title="Reset to 1">
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Stock Alert Warning Banner (Conditional Rendering using &&) */}
        {remainingStock <= 2 && remainingStock > 0 && (
          <div className="stock-alert-warning">
            ⚠️ <strong>Hurry!</strong> You have selected {quantity} units. Only {remainingStock} more available.
          </div>
        )}

        {/* Add To Cart Button */}
        <button
          className={`btn-add-cart ${isAdded ? 'btn-success' : ''}`}
          onClick={handleAddToCart}
          disabled={stock === 0}
        >
          {isAdded ? (
            <span>✓ Added to Cart ({quantity} units)</span>
          ) : (
            <span>🛒 Add to Cart &bull; ${subtotal}</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
