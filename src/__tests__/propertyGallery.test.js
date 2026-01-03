/**
 * Tests for PropertyDetails gallery rendering and navigation
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock useParams from react-router-dom
jest.mock('react-router-dom', () => ({
  useParams: () => ({ id: 'prop1' }),
  Link: ({ children }) => <span>{children}</span>
}));

import PropertyDetails from '../components/PropertyDetails';

const sampleProperty = {
  id: 'prop1',
  location: 'Test Lane',
  price: 100000,
  images: [ 'img1.jpg', 'img2.jpg', 'img3.jpg' ],
  floorplan: 'floor.jpg',
  longDescription: 'Long description',
  type: 'House',
  bedrooms: 2,
  tenure: 'Freehold',
  added: { month: 'January', day: 1, year: 2024 }
};

test('renders thumbnails and navigates next/prev', () => {
  render(<PropertyDetails properties={[sampleProperty]} favorites={[]} addToFavorites={() => {}} removeFromFavorites={() => {}} />);

  // Thumbnails should be rendered
  const thumbs = screen.getAllByAltText(/Thumbnail/i);
  expect(thumbs.length).toBe(sampleProperty.images.length);

  // Click next arrow
  const next = screen.getByLabelText(/Next image/i);
  fireEvent.click(next);

  // Image counter should update to 2 / 3
  expect(screen.getByText(/2 \/ 3/)).toBeTruthy();

  // Click previous arrow
  const prev = screen.getByLabelText(/Previous image/i);
  fireEvent.click(prev);
  expect(screen.getByText(/1 \/ 3/)).toBeTruthy();
});
