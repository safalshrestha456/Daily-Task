// ============================================================================
// Component: LoginForm
// Purpose: Controlled authentication form with client-side validation
// ============================================================================

import React, { useState } from 'react';
import Button from './Button.jsx';

/**
 * Email validation helper using standard RFC 5322 regex
 * @param {string} email
 * @returns {boolean}
 */
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * LoginForm Component
 *
 * @param {Object} props
 * @param {function} props.onSubmit - Callback invoked with { email, password } on valid submit
 * @param {boolean} props.isLoading - Whether the login submission is currently in-flight
 */
export default function LoginForm({ onSubmit, isLoading = false }) {
  // Controlled form state for email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Validation error state for each field
  const [errors, setErrors] = useState({});

  // Form-level feedback message (e.g. success notification)
  const [successMessage, setSuccessMessage] = useState('');

  /**
   * Validate form fields and set inline error messages
   * @returns {boolean} True if all fields are valid
   */
  const validateForm = () => {
    const newErrors = {};

    // Validate email
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission event
   * @param {React.FormEvent} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');

    // Only proceed if validation passes
    if (validateForm()) {
      // Notify parent component
      if (onSubmit) {
        onSubmit({ email, password });
      }
      setSuccessMessage('Login submitted successfully!');
    }
  };

  return (
    <form 
      className="login-form" 
      onSubmit={handleSubmit} 
      noValidate 
      data-testid="login-form"
    >
      <h3 className="form-title">Account Login</h3>
      <p className="form-subtitle">Enter your credentials to access your dashboard</p>

      {/* Global Success Banner */}
      {successMessage && (
        <div 
          className="alert alert-success" 
          role="alert" 
          data-testid="success-alert"
        >
          <span>✓</span>
          <span>{successMessage}</span>
        </div>
      )}

      {/* Email Input Field */}
      <div className="form-group">
        <label htmlFor="login-email" className="form-label">
          Email Address
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          className={`form-input ${errors.email ? 'input-error' : ''}`}
          placeholder="developer@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            // Clear error when user types
            if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
          }}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          data-testid="email-input"
        />
        {/* Email Inline Error Message */}
        {errors.email && (
          <span 
            id="email-error" 
            className="error-message" 
            role="alert" 
            data-testid="email-error"
          >
            {errors.email}
          </span>
        )}
      </div>

      {/* Password Input Field */}
      <div className="form-group">
        <label htmlFor="login-password" className="form-label">
          Password
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          className={`form-input ${errors.password ? 'input-error' : ''}`}
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            // Clear error when user types
            if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
          }}
          aria-invalid={errors.password ? 'true' : 'false'}
          aria-describedby={errors.password ? 'password-error' : undefined}
          data-testid="password-input"
        />
        {/* Password Inline Error Message */}
        {errors.password && (
          <span 
            id="password-error" 
            className="error-message" 
            role="alert" 
            data-testid="password-error"
          >
            {errors.password}
          </span>
        )}
      </div>

      {/* Form Submission Button */}
      <div className="form-actions">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="w-full"
          data-testid="submit-button"
        >
          Sign In
        </Button>
      </div>
    </form>
  );
}
