// src/__tests__/FavoritesList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FavoritesList from '../components/FavoritesList';

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
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        {component}
      </DndProvider>
    </BrowserRouter>
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
    
    expect(screen.getByText(/no favorite properties yet/i)).toBeInTheDocument();
  });

  test('displays favorites count correctly', () => {
    renderWithProviders(
      <FavoritesList 
        favorites={mockFavorites}
        removeFromFavorites={() => {}}
        clearFavorites={() => {}}
      />
    );
    
    expect(screen.getByText(/favorites \(1\)/i)).toBeInTheDocument();
  });

  test('displays clear all button when favorites exist', () => {
    renderWithProviders(
      <FavoritesList 
        favorites={mockFavorites}
        removeFromFavorites={() => {}}
        clearFavorites={() => {}}
      />
    );
    
    expect(screen.getByRole('button', { name: /clear all/i })).toBeInTheDocument();
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