// Vite Configuration with Vitest Testing Support
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Vitest configuration for React Testing Library
  test: {
    globals: true, // Enables global expect, describe, it, test without importing
    environment: 'jsdom', // Simulates browser DOM in Node.js
    setupFiles: './src/test/setup.js', // Global test setup for custom jest-dom matchers
    css: true, // Enable CSS parsing in tests
  },
});
