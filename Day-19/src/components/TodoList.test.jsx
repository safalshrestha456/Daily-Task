// ============================================================================
// Unit & Integration Tests: TodoList Component
// Framework: Vitest + React Testing Library (@testing-library/react)
// ============================================================================

import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from './TodoList.jsx';

describe('TodoList Component', () => {
  const sampleTodos = [
    { id: '1', text: 'Write Button unit tests', completed: true },
    { id: '2', text: 'Implement LoginForm validation tests', completed: false },
    { id: '3', text: 'Test TodoList filter logic', completed: false },
  ];

  // Test 1: Empty state render
  it('renders an empty state placeholder when no tasks exist', () => {
    render(<TodoList initialTodos={[]} />);

    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(screen.getByText(/no tasks found/i)).toBeInTheDocument();
    expect(screen.getByTestId('todo-count')).toHaveTextContent('0 tasks remaining');
  });

  // Test 2: Initial tasks rendering and counter
  it('renders initial list of tasks and calculates remaining count correctly', () => {
    render(<TodoList initialTodos={sampleTodos} />);

    // Assert that all task items are in the document
    expect(screen.getByText('Write Button unit tests')).toBeInTheDocument();
    expect(screen.getByText('Implement LoginForm validation tests')).toBeInTheDocument();
    expect(screen.getByText('Test TodoList filter logic')).toBeInTheDocument();

    // 2 out of 3 tasks are incomplete
    expect(screen.getByTestId('todo-count')).toHaveTextContent('2 tasks remaining');
  });

  // Test 3: Adding a new task
  it('allows the user to type and add a new task to the list', async () => {
    const user = userEvent.setup();
    render(<TodoList initialTodos={sampleTodos} />);

    const input = screen.getByPlaceholderText(/what needs to be tested today/i);
    const addButton = screen.getByRole('button', { name: /add task/i });

    // Type a new task and click Add
    await user.type(input, 'Review Apollo Client integration');
    await user.click(addButton);

    // Assert the new task appears in the list
    expect(screen.getByText('Review Apollo Client integration')).toBeInTheDocument();

    // Assert that the input field was cleared
    expect(input).toHaveValue('');

    // Counter should increase from 2 to 3
    expect(screen.getByTestId('todo-count')).toHaveTextContent('3 tasks remaining');
  });

  // Test 4: Toggling task completion
  it('toggles task completion when checkbox is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList initialTodos={sampleTodos} />);

    // Query checkbox for task 2 (currently incomplete)
    const checkbox = screen.getByTestId('todo-checkbox-2');
    expect(checkbox).not.toBeChecked();

    // Click checkbox to complete
    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    // Remaining count decreases from 2 to 1
    expect(screen.getByTestId('todo-count')).toHaveTextContent('1 task remaining');
  });

  // Test 5: Deleting a task
  it('removes a task when its delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList initialTodos={sampleTodos} />);

    // Task 1 exists initially
    expect(screen.getByText('Write Button unit tests')).toBeInTheDocument();

    // Click delete button for task 1
    const deleteBtn = screen.getByTestId('delete-button-1');
    await user.click(deleteBtn);

    // Assert task 1 is removed from the DOM
    expect(screen.queryByText('Write Button unit tests')).not.toBeInTheDocument();
  });

  // Test 6: Filtering tasks (All, Active, Completed)
  it('filters tasks accurately between All, Active, and Completed views', async () => {
    const user = userEvent.setup();
    render(<TodoList initialTodos={sampleTodos} />);

    // 1. Click "Active" tab
    const activeTab = screen.getByTestId('filter-active');
    await user.click(activeTab);

    // Incomplete tasks should be visible, completed task should be hidden
    expect(screen.getByText('Implement LoginForm validation tests')).toBeInTheDocument();
    expect(screen.getByText('Test TodoList filter logic')).toBeInTheDocument();
    expect(screen.queryByText('Write Button unit tests')).not.toBeInTheDocument();

    // 2. Click "Completed" tab
    const completedTab = screen.getByTestId('filter-completed');
    await user.click(completedTab);

    // Only completed task should be visible
    expect(screen.getByText('Write Button unit tests')).toBeInTheDocument();
    expect(screen.queryByText('Implement LoginForm validation tests')).not.toBeInTheDocument();

    // 3. Return to "All" tab
    const allTab = screen.getByTestId('filter-all');
    await user.click(allTab);
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });
});
