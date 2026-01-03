import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import PropertyDetails from './components/PropertyDetails';
import propertiesData from './data/properties.json';
import './App.css';

/**
 * App
 * Root component that wires routing and global state. Responsibilities:
 * - hold the `favorites` state and persist it to `localStorage`
 * - pass favorites handlers to child components
 *
 * Persisting favorites in localStorage allows the user's choices to survive
 * page reloads. We read on mount and write on every change; this is simple
 * and acceptable for this coursework app (no server storage required).
 */
function App() {
  // Favorites are stored as an array of property objects. We intentionally
  // store the full object to keep the UI simple; for larger apps storing
  // only ids and fetching details on demand would be preferable.
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount and recover gracefully if
  // the stored value is corrupted.
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteProperties');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        // Error reading saved favorites; ignore and start with empty list
      }
    }
  }, []);

  // Persist favorites on every change. This is synchronous and simple; for
  // large data sets consider throttling or batching writes.
  useEffect(() => {
    localStorage.setItem('favoriteProperties', JSON.stringify(favorites));
  }, [favorites]);

  /**
   * Add a property to favorites, preventing duplicates by `id`.
   * Exposed to PropertyCard and PropertyDetails.
   */
  const addToFavorites = (property) => {
    if (!favorites.some(fav => fav.id === property.id)) {
      setFavorites([...favorites, property]);
    }
  };

  /**
   * Remove by id and update state.
   */
  const removeFromFavorites = (propertyId) => {
    setFavorites(favorites.filter(fav => fav.id !== propertyId));
  };

  /**
   * Clear the entire favorites list (used by the Clear All button).
   */
  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="container header-inner">
            <img src="/images/logo.jpg" alt="Site logo" className="app-logo" />
            <div className="header-text">
              <h1>Find Your Dream Home</h1>
              <p>Discover the perfect property that fits your lifestyle and budget your dream home is just a search away.</p>
            </div>
          </div>
        </header>
        
        <Routes>
          {/* Main search page with results */}
          <Route 
            path="/" 
            element={
              <SearchForm 
                properties={propertiesData.properties}
                favorites={favorites}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                clearFavorites={clearFavorites}
              />
            } 
          />
          
          {/* Individual property details page */}
          <Route 
            path="/property/:id" 
            element={
              <PropertyDetails 
                properties={propertiesData.properties}
                favorites={favorites}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
              />
            } 
          />
        </Routes>
        
        <footer className="app-footer">
          <div className="container">
            <p>&copy; 2025 Estate Agent Property Search. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
