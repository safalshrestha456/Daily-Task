// ============================================================================
// Component: Button
// Purpose: Reusable, accessible button with variant styling and loading state
// ============================================================================

import React from 'react';

/**
 * Button Component
 *
 * @param {Object} props
 * @param {string} props.children - Text or elements inside the button
 * @param {function} props.onClick - Click handler callback
 * @param {string} props.variant - Visual style: 'primary' | 'secondary' | 'danger' | 'outline'
 * @param {string} props.type - HTML button type: 'button' | 'submit' | 'reset'
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {boolean} props.isLoading - Whether the button is in an async loading state
 * @param {string} props.className - Additional custom CSS classes
 */
export default function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  isLoading = false,
  className = '',
  ...rest
}) {
  // Construct CSS class names dynamically based on props
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const loadingClass = isLoading ? 'btn-loading' : '';
  const combinedClass = [baseClass, variantClass, loadingClass, className]
    .filter(Boolean)
    .join(' ');

  // Disable interaction if explicitly disabled OR currently loading
  const isButtonDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      className={combinedClass}
      onClick={onClick}
      disabled={isButtonDisabled}
      aria-busy={isLoading ? 'true' : 'false'}
      data-testid="custom-button"
      {...rest}
    >
      {/* Show spinner when in loading state */}
      {isLoading && (
        <span 
          className="btn-spinner" 
          aria-hidden="true" 
          data-testid="button-spinner"
        />
      )}
      
      {/* Button label or children */}
      <span className="btn-content">{children}</span>
    </button>
  );
}
