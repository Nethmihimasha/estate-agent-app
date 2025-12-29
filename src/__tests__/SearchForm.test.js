// src/__tests__/SearchForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SearchForm from '../components/SearchForm';

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
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        {component}
      </DndProvider>
    </BrowserRouter>
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
    
    expect(screen.getByLabelText(/property type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/min price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/max price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/min bedrooms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/max bedrooms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/postcode area/i)).toBeInTheDocument();
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
    
    expect(screen.getByText(/all properties \(1\)/i)).toBeInTheDocument();
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
    
    expect(screen.getByText(/1 properties found/i)).toBeInTheDocument();
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
