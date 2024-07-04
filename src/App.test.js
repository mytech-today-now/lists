import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

test.only('test-01: deletes a task from the list', async () => {
  const { getByText, getByPlaceholderText } = render(<App />);

  // Add a new list
  const input = getByPlaceholderText('Add a new list');
  fireEvent.change(input, { target: { value: 'Test List' } });
  fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

  // Add a task to the list
  const taskInput = getByPlaceholderText('Add a new task');
  fireEvent.change(taskInput, { target: { value: 'Test Task' } });
  fireEvent.keyPress(taskInput, { key: 'Enter', code: 'Enter', charCode: 13 });

  // Mock the fetch call for deleting a task
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    })
  );

  // Delete the task
  const deleteButton = getByText('Delete');
  fireEvent.click(deleteButton);

  // Wait for the task to be removed from the DOM
  await waitFor(() => expect(screen.queryByText('Test Task')).not.toBeInTheDocument());
});

test('test-02: adds a new list', async () => {
  const { getByText, getByPlaceholderText } = render(<App />);

  // Mock the fetch call for adding a new list
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    })
  );

  // Add a new list
  const input = getByPlaceholderText('Add a new list');
  fireEvent.change(input, { target: { value: 'New Test List' } });
  fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

  // Wait for the list to be added to the DOM
  await waitFor(() => expect(screen.getByText('New Test List')).toBeInTheDocument());
});
