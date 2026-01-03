import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Mock react-dnd to avoid DOM backend in tests
jest.mock('react-dnd', () => ({
  DndProvider: ({ children }) => children,
  useDrag: () => [{ isDragging: false }, () => {}],
  useDrop: () => [{ isOver: false }, () => {}],
}));

jest.mock('react-dnd-html5-backend', () => ({ HTML5Backend: () => ({}) }));

import App from '../App';

test('favorites persist to localStorage when added', async () => {
  // Spy on localStorage.setItem
  const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

  render(<App />);

  // Wait for initial render and then find an "Add to Favorites" button
  const addButtons = await screen.findAllByRole('button', { name: /Add to Favorites/i });
  expect(addButtons.length).toBeGreaterThan(0);

  // Click the first add button
  fireEvent.click(addButtons[0]);

  // Expect localStorage.setItem called at least once to save favorites
  await waitFor(() => expect(setItemSpy).toHaveBeenCalled());

  setItemSpy.mockRestore();
});
