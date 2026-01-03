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
    minPrice: 'any',
    maxPrice: 'any',
    minBedrooms: 'any',
    maxBedrooms: 'any',
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
      minPrice: 'any',
      maxPrice: 'any',
      minBedrooms: 'any',
      maxBedrooms: 'any',
      postcode: '',
      dateFrom: null,
      dateTo: null
    });
    setSearchResults(properties);
    setHasSearched(false);
  };

  // Build options for react-select widgets
  const priceOptions = [
    { value: 'any', label: 'No min/max' },
    { value: '50000', label: '£50,000' },
    { value: '100000', label: '£100,000' },
    { value: '200000', label: '£200,000' },
    { value: '300000', label: '£300,000' },
    { value: '400000', label: '£400,000' },
    { value: '500000', label: '£500,000' },
    { value: '750000', label: '£750,000' },
    { value: '1000000', label: '£1,000,000' },
    { value: '2000000', label: '£2,000,000' }
  ];

  const bedroomOptions = [{ value: 'any', label: 'Any' }];
  for (let i = 0; i <= 10; i++) bedroomOptions.push({ value: String(i), label: String(i) });

  const postcodeSet = new Set(properties.map(p => p.postcode.split(' ')[0].toUpperCase()));
  const postcodeOptions = [{ value: '', label: 'Any' }];
  Array.from(postcodeSet).forEach(pc => postcodeOptions.push({ value: pc, label: pc }));

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
                
                {/* Price Range - use react-select with predefined bands to be a React widget */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="minPrice">Min Price (£)</label>
                    <Select
                      inputId="minPrice"
                      name="minPrice"
                      classNamePrefix="react-select"
                      value={priceOptions.find(o => o.value === searchCriteria.minPrice) || priceOptions[0]}
                      onChange={(opt) => setSearchCriteria({ ...searchCriteria, minPrice: opt.value })}
                      options={priceOptions}
                      isSearchable={false}
                      aria-label="Minimum price"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="maxPrice">Max Price (£)</label>
                    <Select
                      inputId="maxPrice"
                      name="maxPrice"
                      classNamePrefix="react-select"
                      value={priceOptions.find(o => o.value === searchCriteria.maxPrice) || priceOptions[priceOptions.length - 1]}
                      onChange={(opt) => setSearchCriteria({ ...searchCriteria, maxPrice: opt.value })}
                      options={priceOptions}
                      isSearchable={false}
                      aria-label="Maximum price"
                    />
                  </div>
                </div>
                
                {/* Bedrooms Range - use react-select for consistent widget behaviour */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="minBedrooms">Min Bedrooms</label>
                    <Select
                      inputId="minBedrooms"
                      name="minBedrooms"
                      classNamePrefix="react-select"
                      value={bedroomOptions.find(o => o.value === searchCriteria.minBedrooms) || bedroomOptions[0]}
                      onChange={(opt) => setSearchCriteria({ ...searchCriteria, minBedrooms: opt.value })}
                      options={bedroomOptions}
                      isSearchable={false}
                      aria-label="Minimum bedrooms"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="maxBedrooms">Max Bedrooms</label>
                    <Select
                      inputId="maxBedrooms"
                      name="maxBedrooms"
                      classNamePrefix="react-select"
                      value={bedroomOptions.find(o => o.value === searchCriteria.maxBedrooms) || bedroomOptions[bedroomOptions.length - 1]}
                      onChange={(opt) => setSearchCriteria({ ...searchCriteria, maxBedrooms: opt.value })}
                      options={bedroomOptions}
                      isSearchable={false}
                      aria-label="Maximum bedrooms"
                    />
                  </div>
                </div>
                
                {/* Postcode area - use react-select populated from available properties */}
                <div className="form-group">
                  <label htmlFor="postcode">Postcode Area</label>
                  <Select
                    inputId="postcode"
                    name="postcode"
                    classNamePrefix="react-select"
                    value={postcodeOptions.find(o => o.value === searchCriteria.postcode) || postcodeOptions[0]}
                    onChange={(opt) => setSearchCriteria({ ...searchCriteria, postcode: opt.value })}
                    options={postcodeOptions}
                    isSearchable={true}
                    aria-label="Postcode area"
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