// src/__tests__/FavoritesList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock ESM modules before requiring the components that import them.
jest.mock('react-dnd', () => ({
  DndProvider: ({ children }) => children,
  useDrag: () => [{ isDragging: false }, () => {}],
  useDrop: () => [{ isOver: false }, () => {}],
}));

jest.mock('react-dnd-html5-backend', () => ({
  HTML5Backend: () => ({}),
}));

// Lightweight router wrapper to avoid importing react-router-dom in tests
const RouterWrapper = ({ children }) => <div>{children}</div>;

// Require mocked modules and components after mocking to avoid ESM parsing issues
const { DndProvider } = require('react-dnd');
const { HTML5Backend } = require('react-dnd-html5-backend');
const FavoritesList = require('../components/FavoritesList').default;

const mockFavorites = [
  {
    id: 'prop1',
    type: 'House',
    bedrooms: 3,
    price: 750000,
    location: 'Test Location',
    picture: 'test.jpg'
  }
];

const renderWithProviders = (component) => {
  return render(
    <RouterWrapper>
      <DndProvider backend={HTML5Backend}>
        {component}
      </DndProvider>
    </RouterWrapper>
  );
};

describe('FavoritesList Component', () => {
  test('displays empty state when no favorites', () => {
    renderWithProviders(
      <FavoritesList 
        favorites={[]}
        removeFromFavorites={() => {}}
        clearFavorites={() => {}}
      />
    );
    
    expect(screen.getByText(/no favorite properties yet/i)).toBeTruthy();
  });

  test('displays favorites count correctly', () => {
    renderWithProviders(
      <FavoritesList 
        favorites={mockFavorites}
        removeFromFavorites={() => {}}
        clearFavorites={() => {}}
      />
    );
    
    expect(screen.getByText(/favorites \(1\)/i)).toBeTruthy();
  });

  test('displays clear all button when favorites exist', () => {
    renderWithProviders(
      <FavoritesList 
        favorites={mockFavorites}
        removeFromFavorites={() => {}}
        clearFavorites={() => {}}
      />
    );
    
    expect(screen.getByRole('button', { name: /clear all/i })).toBeTruthy();
  });

  test('calls clearFavorites when clear all button is clicked', () => {
    const mockClearFavorites = jest.fn();
    renderWithProviders(
      <FavoritesList 
        favorites={mockFavorites}
        removeFromFavorites={() => {}}
        clearFavorites={mockClearFavorites}
      />
    );
    
    const clearButton = screen.getByRole('button', { name: /clear all/i });
    fireEvent.click(clearButton);
    
    expect(mockClearFavorites).toHaveBeenCalledTimes(1);
  });

  test('calls removeFromFavorites when remove button is clicked', () => {
    const mockRemoveFromFavorites = jest.fn();
    renderWithProviders(
      <FavoritesList 
        favorites={mockFavorites}
        removeFromFavorites={mockRemoveFromFavorites}
        clearFavorites={() => {}}
      />
    );
    
    const removeButton = screen.getByRole('button', { name: /remove from favorites/i });
    fireEvent.click(removeButton);
    
    expect(mockRemoveFromFavorites).toHaveBeenCalledWith('prop1');
  });
});