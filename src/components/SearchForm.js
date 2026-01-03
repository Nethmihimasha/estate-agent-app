import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import PropertyCard from './PropertyCard';
import FavoritesList from './FavoritesList';
import { searchProperties } from '../utils/searchUtils';
import DOMPurify from 'dompurify';
import './SearchForm.css';

/**
 * SearchForm component with enhanced React widgets
 * Handles property search with multiple criteria
 */
const SearchForm = ({ 
  properties, 
  favorites, 
  addToFavorites, 
  removeFromFavorites, 
  clearFavorites 
}) => {
  // Search criteria state
  const [searchCriteria, setSearchCriteria] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcode: '',
    dateFrom: null,
    dateTo: null
  });
  
  // Results state
  const [searchResults, setSearchResults] = useState(properties);
  const [hasSearched, setHasSearched] = useState(false);
  
  /**
   * Handle form input changes with HTML encoding for security
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Sanitize input to prevent XSS
    const sanitizedValue = DOMPurify.sanitize(value);
    setSearchCriteria({
      ...searchCriteria,
      [name]: sanitizedValue
    });
  };
  
  /**
   * Handle date picker changes
   */
  const handleDateChange = (date, field) => {
    setSearchCriteria({
      ...searchCriteria,
      [field]: date
    });
  };
  
  /**
   * Handle form submission and search
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const results = searchProperties(properties, searchCriteria);
    setSearchResults(results);
    setHasSearched(true);
  };
  
  /**
   * Reset search form and show all properties
   */
  const handleReset = () => {
    setSearchCriteria({
      type: 'any',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      postcode: '',
      dateFrom: null,
      dateTo: null
    });
    setSearchResults(properties);
    setHasSearched(false);
  };

  return (
    <div className="search-page">
      <div className="container">
        <div className="search-layout">
          {/* Main search section */}
          <div className="search-main">
            {/* Search Form */}
            <div className="search-form-container">
              <h2>Search Properties</h2>
              <form onSubmit={handleSubmit} className="search-form">
                {/* Property Type Select */}
                <div className="form-group">
                  <label htmlFor="type">Property Type</label>
                  <Select
                    inputId="type"
                    name="type"
                    classNamePrefix="react-select"
                    value={[
                      { value: 'any', label: 'Any' },
                      { value: 'House', label: 'House' },
                      { value: 'Flat', label: 'Flat' }
                    ].find(o => o.value === searchCriteria.type) || { value: 'any', label: 'Any' }}
                    onChange={(opt) => setSearchCriteria({ ...searchCriteria, type: opt.value })}
                    options={[
                      { value: 'any', label: 'Any' },
                      { value: 'House', label: 'House' },
                      { value: 'Flat', label: 'Flat' }
                    ]}
                    isSearchable={false}
                    aria-label="Property Type"
                  />
                </div>
                
                {/* Price Range */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="minPrice">Min Price (£)</label>
                    <input
                      type="number"
                      id="minPrice"
                      name="minPrice"
                      value={searchCriteria.minPrice}
                      onChange={handleInputChange}
                      placeholder="No min"
                      min="0"
                      step="1000"
                      className="form-control"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="maxPrice">Max Price (£)</label>
                    <input
                      type="number"
                      id="maxPrice"
                      name="maxPrice"
                      value={searchCriteria.maxPrice}
                      onChange={handleInputChange}
                      placeholder="No max"
                      min="0"
                      step="1000"
                      className="form-control"
                    />
                  </div>
                </div>
                
                {/* Bedrooms Range */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="minBedrooms">Min Bedrooms</label>
                    <input
                      type="number"
                      id="minBedrooms"
                      name="minBedrooms"
                      value={searchCriteria.minBedrooms}
                      onChange={handleInputChange}
                      placeholder="No min"
                      min="0"
                      max="10"
                      className="form-control"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="maxBedrooms">Max Bedrooms</label>
                    <input
                      type="number"
                      id="maxBedrooms"
                      name="maxBedrooms"
                      value={searchCriteria.maxBedrooms}
                      onChange={handleInputChange}
                      placeholder="No max"
                      min="0"
                      max="10"
                      className="form-control"
                    />
                  </div>
                </div>
                
                {/* Postcode */}
                <div className="form-group">
                  <label htmlFor="postcode">Postcode Area</label>
                  <input
                    type="text"
                    id="postcode"
                    name="postcode"
                    value={searchCriteria.postcode}
                    onChange={handleInputChange}
                    placeholder="e.g. BR1, NW1"
                    className="form-control"
                    maxLength="10"
                  />
                </div>
                
                {/* Date Range with React DatePicker */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dateFrom">Added After</label>
                    <DatePicker
                      id="dateFrom"
                      selected={searchCriteria.dateFrom}
                      onChange={(date) => handleDateChange(date, 'dateFrom')}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select date"
                      className="form-control"
                      isClearable
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="dateTo">Added Before</label>
                    <DatePicker
                      id="dateTo"
                      selected={searchCriteria.dateTo}
                      onChange={(date) => handleDateChange(date, 'dateTo')}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select date"
                      className="form-control"
                      isClearable
                    />
                  </div>
                </div>
                
                {/* Submit Buttons */}
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    Search Properties
                  </button>
                  <button type="button" onClick={handleReset} className="btn btn-secondary">
                    Reset
                  </button>
                </div>
              </form>
            </div>
            
            {/* Search Results */}
            <div className="search-results">
              <h2>
                {hasSearched 
                  ? `${searchResults.length} Properties Found` 
                  : `All Properties (${properties.length})`
                }
              </h2>
              <div className="properties-grid">
                {searchResults.map(property => (
                  <PropertyCard 
                    key={property.id}
                    property={property}
                    onAddToFavorites={addToFavorites}
                    isFavorite={favorites.some(fav => fav.id === property.id)}
                  />
                ))}
              </div>
              
              {searchResults.length === 0 && hasSearched && (
                <div className="no-results">
                  <p>No properties found matching your criteria.</p>
                  <p>Try adjusting your search filters.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Favorites Sidebar */}
          <aside className="favorites-sidebar">
            <FavoritesList
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
              clearFavorites={clearFavorites}
              addToFavorites={addToFavorites}
            />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;