import React from 'react';
import './CartSummary.css';

/**
 * Reusable Cart Summary Component
 * Demonstrates:
 * 1. Props consumption
 * 2. Conditional progress bar rendering (Free shipping threshold)
 * 3. Conditional rendering of checkout button state
 */
function CartSummary({ cartItems = [], onClearCart = () => {} }) {
  const FREE_SHIPPING_THRESHOLD = 200;

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const shippingProgress = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="cart-summary-card">
      <div className="summary-header">
        <h3>Shopping Cart Summary</h3>
        {cartItems.length > 0 && (
          <button className="clear-btn" onClick={onClearCart}>
            Clear Cart
          </button>
        )}
      </div>

      {/* Free Shipping Meter (Conditional Rendering) */}
      <div className="shipping-meter-wrap">
        <div className="shipping-text">
          {totalPrice >= FREE_SHIPPING_THRESHOLD ? (
            <span className="text-green">🎉 You qualify for <strong>FREE Express Shipping</strong>!</span>
          ) : (
            <span>Add <strong>${amountNeeded.toFixed(2)}</strong> more for <strong>FREE Shipping</strong></span>
          )}
        </div>
        <div className="progress-bg">
          <div className="progress-fill" style={{ width: `${shippingProgress}%` }}></div>
        </div>
      </div>

      {/* Itemized List or Empty */}
      {cartItems.length === 0 ? (
        <div className="empty-cart-state">
          <span>🛒</span>
          <p>Your cart is currently empty. Adjust quantities and click Add to Cart!</p>
        </div>
      ) : (
        <div className="cart-items-list">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item-row">
              <div className="cart-item-desc">
                <strong>{item.name}</strong>
                <span className="cart-item-meta">{item.quantity} &times; ${item.price.toFixed(2)}</span>
              </div>
              <span className="cart-item-subtotal">${item.subtotal.toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Totals */}
      <div className="summary-totals">
        <div className="total-row">
          <span>Total Items:</span>
          <strong>{totalQuantity} units</strong>
        </div>
        <div className="total-row grand-total">
          <span>Grand Total:</span>
          <strong className="grand-price">${totalPrice.toFixed(2)}</strong>
        </div>
      </div>

      <button
        className="btn-checkout"
        disabled={cartItems.length === 0}
        onClick={() => alert(`Order placed successfully! Total: $${totalPrice.toFixed(2)}`)}
      >
        {cartItems.length === 0 ? "Cart is Empty" : `Proceed to Checkout ($${totalPrice.toFixed(2)})`}
      </button>
    </div>
  );
}

export default CartSummary;
