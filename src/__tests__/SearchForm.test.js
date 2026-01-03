// src/__tests__/SearchForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Keep all `import` statements at the top to satisfy ESLint `import/first`.
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
const SearchForm = require('../components/SearchForm').default;

const mockProperties = [
  {
    id: 'prop1',
    type: 'House',
    bedrooms: 3,
    price: 750000,
    tenure: 'Freehold',
    description: 'Test property',
    location: 'Test Location',
    postcode: 'BR5',
    picture: 'test.jpg',
    added: { month: 'October', day: 12, year: 2022 }
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

describe('SearchForm Component', () => {
  test('renders search form with all input fields', () => {
    renderWithProviders(
      <SearchForm 
        properties={mockProperties}
        favorites={[]}
        addToFavorites={() => {}}
        removeFromFavorites={() => {}}
        clearFavorites={() => {}}
      />
    );
    
    expect(screen.getByLabelText(/property type/i)).toBeTruthy();
    expect(screen.getByLabelText(/min price/i)).toBeTruthy();
    expect(screen.getByLabelText(/max price/i)).toBeTruthy();
    expect(screen.getByLabelText(/min bedrooms/i)).toBeTruthy();
    expect(screen.getByLabelText(/max bedrooms/i)).toBeTruthy();
    expect(screen.getByLabelText(/postcode area/i)).toBeTruthy();
  });

  test('displays all properties initially', () => {
    renderWithProviders(
      <SearchForm 
        properties={mockProperties}
        favorites={[]}
        addToFavorites={() => {}}
        removeFromFavorites={() => {}}
        clearFavorites={() => {}}
      />
    );
    
    expect(screen.getByText(/all properties \(1\)/i)).toBeTruthy();
  });

  test('updates search results count after search', () => {
    renderWithProviders(
      <SearchForm 
        properties={mockProperties}
        favorites={[]}
        addToFavorites={() => {}}
        removeFromFavorites={() => {}}
        clearFavorites={() => {}}
      />
    );
    
    const searchButton = screen.getByRole('button', { name: /search properties/i });
    fireEvent.click(searchButton);
    
    expect(screen.getByText(/1 properties found/i)).toBeTruthy();
  });

  test('reset button clears search criteria', () => {
    renderWithProviders(
      <SearchForm 
        properties={mockProperties}
        favorites={[]}
        addToFavorites={() => {}}
        removeFromFavorites={() => {}}
        clearFavorites={() => {}}
      />
    );
    
    const minPriceInput = screen.getByLabelText(/min price/i);
    fireEvent.change(minPriceInput, { target: { value: '500000' } });
    
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);
    
    expect(minPriceInput.value).toBe('');
  });
});
