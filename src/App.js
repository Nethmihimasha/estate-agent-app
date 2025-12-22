import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import PropertyDetails from './components/PropertyDetails';
import propertiesData from './data/properties.json';
import './App.css';

/**
 * Main App component that manages routing and global state
 * Handles favorites list and property data
 */
function App() {
  // State for storing favorite properties
  const [favorites, setFavorites] = useState([]);
  
  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteProperties');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);
  
  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favoriteProperties', JSON.stringify(favorites));
  }, [favorites]);
  
  /**
   * Add a property to favorites
   * Prevents duplicates by checking if property already exists
   */
  const addToFavorites = (property) => {
    if (!favorites.some(fav => fav.id === property.id)) {
      setFavorites([...favorites, property]);
    }
  };
  
  /**
   * Remove a property from favorites by ID
   */
  const removeFromFavorites = (propertyId) => {
    setFavorites(favorites.filter(fav => fav.id !== propertyId));
  };
  
  /**
   * Clear all favorites
   */
  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="container">
            <h1>Estate Agent Property Search</h1>
            <p>Find your dream home</p>
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
