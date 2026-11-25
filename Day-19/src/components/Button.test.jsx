// ============================================================================
// Unit Tests: Button Component
// Framework: Vitest + React Testing Library (@testing-library/react)
// ============================================================================

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button.jsx';

describe('Button Component', () => {
  // Test 1: Render check with children
  it('renders the button with the provided text label', () => {
    // Arrange: Mount the component to the simulated jsdom DOM
    render(<Button>Click Me</Button>);

    // Act: Query the element using an accessible role
    const buttonElement = screen.getByRole('button', { name: /click me/i });

    // Assert: Check existence in the document
    expect(buttonElement).toBeInTheDocument();
  });

  // Test 2: User click event invocation
  it('calls the onClick callback when clicked by the user', async () => {
    // Arrange: Setup userEvent instance and a mock spy function
    const user = userEvent.setup();
    const handleClick = vi.fn(); // Mock function spy

    render(<Button onClick={handleClick}>Submit</Button>);
    const buttonElement = screen.getByRole('button', { name: /submit/i });

    // Act: Simulate user clicking the button
    await user.click(buttonElement);

    // Assert: Expect the mock handler to have been called exactly once
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test 3: Disabled state prevention
  it('does not trigger onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    // Render with disabled={true}
    render(<Button onClick={handleClick} disabled>Disabled Action</Button>);
    const buttonElement = screen.getByRole('button', { name: /disabled action/i });

    // Assert that the button has the disabled HTML attribute
    expect(buttonElement).toBeDisabled();

    // Act: Try clicking the disabled button
    await user.click(buttonElement);

    // Assert: The handler should NEVER be called
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Test 4: Loading state behavior
  it('shows loading spinner and disables interaction when isLoading is true', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick} isLoading>Saving Data</Button>);
    const buttonElement = screen.getByRole('button', { name: /saving data/i });

    // Assert: Spinner element should be visible
    const spinner = screen.getByTestId('button-spinner');
    expect(spinner).toBeInTheDocument();

    // Assert: Button should be disabled during loading
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveAttribute('aria-busy', 'true');

    // Act: Click during loading
    await user.click(buttonElement);

    // Assert: Handler is not triggered
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Test 5: CSS variant styling
  it('applies the appropriate CSS variant class', () => {
    const { rerender } = render(<Button variant="danger">Delete</Button>);
    let buttonElement = screen.getByRole('button', { name: /delete/i });
    expect(buttonElement).toHaveClass('btn-danger');

    // Rerender with secondary variant
    rerender(<Button variant="secondary">Cancel</Button>);
    buttonElement = screen.getByRole('button', { name: /cancel/i });
    expect(buttonElement).toHaveClass('btn-secondary');
  });
});
