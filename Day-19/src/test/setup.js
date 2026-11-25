// ============================================================================
// Vitest & React Testing Library Global Setup
// ============================================================================
// This setup file runs automatically before each test file.
// It extends Vitest's expect with custom DOM element matchers from jest-dom
// such as: toBeInTheDocument(), toHaveValue(), toBeDisabled(), toHaveClass(), etc.

import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Automatically unmount React trees that were mounted with render() after each test
afterEach(() => {
  cleanup();
});
