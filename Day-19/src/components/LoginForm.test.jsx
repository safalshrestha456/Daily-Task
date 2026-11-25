// ============================================================================
// Unit & Integration Tests: LoginForm Component
// Framework: Vitest + React Testing Library (@testing-library/react)
// ============================================================================

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm.jsx';

describe('LoginForm Component', () => {
  // Test 1: Initial render
  it('renders email input, password input, and submit button', () => {
    render(<LoginForm />);

    // Assert that the accessible form fields are rendered
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  // Test 2: Validation on empty submission
  it('displays validation error messages when submitted with empty fields', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<LoginForm onSubmit={handleSubmit} />);

    // Click submit without entering any values
    const submitBtn = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitBtn);

    // Assert that inline validation errors appear in the DOM
    expect(screen.getByText(/email address is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();

    // Assert that the onSubmit callback was not called
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  // Test 3: Invalid email format validation
  it('shows an error message when an invalid email is entered', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const submitBtn = screen.getByRole('button', { name: /sign in/i });

    // Type invalid email format
    await user.type(emailInput, 'invalid-email-address');
    await user.type(passwordInput, 'validpassword123');
    await user.click(submitBtn);

    // Assert validation error
    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  // Test 4: Short password validation
  it('shows an error message when password is less than 6 characters', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const submitBtn = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, 'developer@cyberdyne.io');
    await user.type(passwordInput, '123'); // Too short
    await user.click(submitBtn);

    // Assert error message
    expect(screen.getByText(/password must be at least 6 characters long/i)).toBeInTheDocument();
  });

  // Test 5: Successful submission with valid data
  it('submits form successfully with valid inputs and displays success alert', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<LoginForm onSubmit={handleSubmit} />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const submitBtn = screen.getByRole('button', { name: /sign in/i });

    // Fill valid inputs
    await user.type(emailInput, 'developer@cyberdyne.io');
    await user.type(passwordInput, 'SecretPassword123');

    // Submit
    await user.click(submitBtn);

    // Assert callback was called with exact credentials payload
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'developer@cyberdyne.io',
      password: 'SecretPassword123',
    });

    // Assert success feedback banner appears
    expect(screen.getByRole('alert')).toHaveTextContent(/login submitted successfully/i);
  });
});
