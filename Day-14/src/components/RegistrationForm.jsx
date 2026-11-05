import React, { useState } from 'react';
import './RegistrationForm.css';

/**
 * Controlled Registration Form Component
 * Demonstrates:
 * 1. Controlled Components pattern (value + onChange bound to React state)
 * 2. Unified Form State with computed property names
 * 3. Validation on change and blur
 * 4. Touched state tracking for better UX (no premature errors)
 * 5. Password strength calculation
 */
function RegistrationForm({ onSuccessfulSubmit = () => {} }) {
  // 1. Unified Form State
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    track: '',
    password: '',
    confirmPassword: '',
    gender: '',
    acceptedTerms: false
  });

  // 2. Touched & Error States
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validation function
  const validate = (dataToValidate) => {
    const newErrors = {};

    // Full Name
    if (!dataToValidate.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (dataToValidate.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters.';
    } else if (!/^[a-zA-Z\s]+$/.test(dataToValidate.fullName)) {
      newErrors.fullName = 'Name can only contain letters and spaces.';
    }

    // Username
    if (!dataToValidate.username.trim()) {
      newErrors.username = 'Username is required.';
    } else if (!/^[a-zA-Z][a-zA-Z0-9_]{2,15}$/.test(dataToValidate.username)) {
      newErrors.username = 'Username must start with a letter (3-16 chars, alphanumeric & _).';
    }

    // Email
    if (!dataToValidate.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dataToValidate.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    // Phone
    if (!dataToValidate.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^(?:\+977[- ]?)?(?:98|97)\d{8}$|^\+?[1-9]\d{9,14}$/.test(dataToValidate.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Valid phone format: +977-98XXXXXXXX or 10-digit number.';
    }

    // Track
    if (!dataToValidate.track) {
      newErrors.track = 'Please select your internship track.';
    }

    // Password
    if (!dataToValidate.password) {
      newErrors.password = 'Password is required.';
    } else if (dataToValidate.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(dataToValidate.password)) {
      newErrors.password = 'Must include uppercase, lowercase, digit, and special symbol.';
    }

    // Confirm Password
    if (!dataToValidate.confirmPassword) {
      newErrors.confirmPassword = 'Confirming your password is required.';
    } else if (dataToValidate.confirmPassword !== dataToValidate.password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    // Gender
    if (!dataToValidate.gender) {
      newErrors.gender = 'Please select your gender.';
    }

    // Terms
    if (!dataToValidate.acceptedTerms) {
      newErrors.acceptedTerms = 'You must agree to the internship terms.';
    }

    return newErrors;
  };

  // Generic Change Handler using computed property name [name]
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    const updatedData = {
      ...formData,
      [name]: fieldValue
    };

    setFormData(updatedData);

    // If field was already touched, re-validate dynamically
    if (touched[name]) {
      const currentErrors = validate(updatedData);
      setErrors(currentErrors);
    }
  };

  // Blur Handler
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const currentErrors = validate(formData);
    setErrors(currentErrors);
  };

  // Password strength score
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'None', color: '#6B7280' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[@$!%*?&]/.test(pass)) score++;

    if (score <= 1) return { score: 1, label: 'Weak', color: '#EF4444' };
    if (score <= 3) return { score: 2, label: 'Medium', color: '#F59E0B' };
    return { score: 3, label: 'Strong', color: '#10B981' };
  };

  const strength = getPasswordStrength(formData.password);

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields touched
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);

      // Simulate async API POST
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        onSuccessfulSubmit(formData);
      }, 1000);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      username: '',
      email: '',
      phone: '',
      track: '',
      password: '',
      confirmPassword: '',
      gender: '',
      acceptedTerms: false
    });
    setTouched({});
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="success-card">
        <div className="success-icon">🎉</div>
        <h2>Registration Successful!</h2>
        <p>Your intern account details have been captured cleanly in React component state.</p>
        
        <div className="submitted-data-box">
          <p><strong>Name:</strong> {formData.fullName}</p>
          <p><strong>Username:</strong> @{formData.username}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Track:</strong> {formData.track}</p>
          <p><strong>Gender:</strong> {formData.gender}</p>
        </div>

        <button className="btn btn-primary mt-3" onClick={handleReset}>
          Register Another Candidate
        </button>
      </div>
    );
  }

  return (
    <form className="react-form" onSubmit={handleSubmit} noValidate>
      <div className="form-header">
        <h2>React Controlled Registration Form</h2>
        <p>Every keystroke synchronizes directly with React state.</p>
      </div>

      {/* Full Name */}
      <div className={`form-group ${touched.fullName && errors.fullName ? 'has-error' : touched.fullName && !errors.fullName ? 'is-valid' : ''}`}>
        <label htmlFor="fullName">Full Name <span className="req">*</span></label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Safal Shrestha"
        />
        {touched.fullName && errors.fullName && <span className="error-text">{errors.fullName}</span>}
      </div>

      {/* Username & Email Row */}
      <div className="form-row">
        <div className={`form-group ${touched.username && errors.username ? 'has-error' : touched.username && !errors.username ? 'is-valid' : ''}`}>
          <label htmlFor="username">Username <span className="req">*</span></label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="safal_dev"
          />
          {touched.username && errors.username && <span className="error-text">{errors.username}</span>}
        </div>

        <div className={`form-group ${touched.email && errors.email ? 'has-error' : touched.email && !errors.email ? 'is-valid' : ''}`}>
          <label htmlFor="email">Email Address <span className="req">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="safal@example.com"
          />
          {touched.email && errors.email && <span className="error-text">{errors.email}</span>}
        </div>
      </div>

      {/* Phone & Track Row */}
      <div className="form-row">
        <div className={`form-group ${touched.phone && errors.phone ? 'has-error' : touched.phone && !errors.phone ? 'is-valid' : ''}`}>
          <label htmlFor="phone">Phone Number <span className="req">*</span></label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="+977-9841234567"
          />
          {touched.phone && errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <div className={`form-group ${touched.track && errors.track ? 'has-error' : touched.track && !errors.track ? 'is-valid' : ''}`}>
          <label htmlFor="track">Internship Track <span className="req">*</span></label>
          <select
            id="track"
            name="track"
            value={formData.track}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">-- Choose Specialization --</option>
            <option value="Full Stack (React + FastAPI + GraphQL)">Full Stack (React + FastAPI + GraphQL)</option>
            <option value="Frontend Specialist (React + Tailwind)">Frontend Specialist (React + Tailwind)</option>
            <option value="Backend Specialist (FastAPI + PostgreSQL)">Backend Specialist (FastAPI + PostgreSQL)</option>
            <option value="DevOps & Docker Specialist">DevOps & Docker Specialist</option>
          </select>
          {touched.track && errors.track && <span className="error-text">{errors.track}</span>}
        </div>
      </div>

      {/* Password & Strength Meter */}
      <div className={`form-group ${touched.password && errors.password ? 'has-error' : touched.password && !errors.password ? 'is-valid' : ''}`}>
        <div className="label-with-action">
          <label htmlFor="password">Password <span className="req">*</span></label>
          <button type="button" className="text-btn" onClick={() => setShowPassword(p => !p)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Min 8 characters with symbols"
        />
        {touched.password && errors.password && <span className="error-text">{errors.password}</span>}

        {/* Dynamic Strength Bar */}
        {formData.password && (
          <div className="strength-bar-wrap">
            <div 
              className="strength-bar-fill" 
              style={{
                width: strength.score === 1 ? '33%' : strength.score === 2 ? '66%' : strength.score === 3 ? '100%' : '0%',
                backgroundColor: strength.color
              }}
            ></div>
            <span className="strength-text" style={{ color: strength.color }}>
              Strength: {strength.label}
            </span>
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div className={`form-group ${touched.confirmPassword && errors.confirmPassword ? 'has-error' : touched.confirmPassword && !errors.confirmPassword ? 'is-valid' : ''}`}>
        <label htmlFor="confirmPassword">Confirm Password <span className="req">*</span></label>
        <input
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Repeat your password"
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <span className="error-text">{errors.confirmPassword}</span>
        )}
      </div>

      {/* Gender Radios */}
      <div className={`form-group ${touched.gender && errors.gender ? 'has-error' : ''}`}>
        <span className="group-label">Gender <span className="req">*</span></span>
        <div className="radio-options">
          {['Male', 'Female', 'Other'].map(g => (
            <label key={g} className="radio-item">
              <input
                type="radio"
                name="gender"
                value={g}
                checked={formData.gender === g}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>{g}</span>
            </label>
          ))}
        </div>
        {touched.gender && errors.gender && <span className="error-text">{errors.gender}</span>}
      </div>

      {/* Terms Checkbox */}
      <div className={`form-group checkbox-group ${touched.acceptedTerms && errors.acceptedTerms ? 'has-error' : ''}`}>
        <label className="checkbox-item">
          <input
            type="checkbox"
            name="acceptedTerms"
            checked={formData.acceptedTerms}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span>I accept the 2-Month Internship Guidelines and Code of Conduct.</span>
        </label>
        {touched.acceptedTerms && errors.acceptedTerms && (
          <span className="error-text">{errors.acceptedTerms}</span>
        )}
      </div>

      {/* Actions */}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Validating & Submitting..." : "Submit Registration"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleReset} disabled={isSubmitting}>
          Reset
        </button>
      </div>
    </form>
  );
}

export default RegistrationForm;
