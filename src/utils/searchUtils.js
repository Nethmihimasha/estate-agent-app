/**
 * Utility functions for property searching
 * Handles filtering by type, price, bedrooms, date, and postcode
 */

/**
 * Main search function that filters properties based on multiple criteria
 * @param {Array} properties - Array of property objects
 * @param {Object} searchCriteria - Object containing search parameters
 * @returns {Array} Filtered array of properties matching criteria
 */
export const searchProperties = (properties, searchCriteria) => {
  return properties.filter(property => {
    // Type filter
    if (searchCriteria.type && searchCriteria.type !== 'any') {
      if (property.type.toLowerCase() !== searchCriteria.type.toLowerCase()) {
        return false;
      }
    }
    
    // Min price filter
    if (searchCriteria.minPrice && searchCriteria.minPrice !== '') {
      if (property.price < parseInt(searchCriteria.minPrice)) {
        return false;
      }
    }
    
    // Max price filter
    if (searchCriteria.maxPrice && searchCriteria.maxPrice !== '') {
      if (property.price > parseInt(searchCriteria.maxPrice)) {
        return false;
      }
    }
    
    // Min bedrooms filter
    if (searchCriteria.minBedrooms && searchCriteria.minBedrooms !== '') {
      if (property.bedrooms < parseInt(searchCriteria.minBedrooms)) {
        return false;
      }
    }
    
    // Max bedrooms filter
    if (searchCriteria.maxBedrooms && searchCriteria.maxBedrooms !== '') {
      if (property.bedrooms > parseInt(searchCriteria.maxBedrooms)) {
        return false;
      }
    }
    
    // Postcode filter
    if (searchCriteria.postcode && searchCriteria.postcode !== '') {
      if (!property.postcode.toLowerCase().includes(searchCriteria.postcode.toLowerCase())) {
        return false;
      }
    }
    
    // Date filter
    if (searchCriteria.dateFrom) {
      const propertyDate = new Date(
        property.added.year, 
        getMonthNumber(property.added.month), 
        property.added.day
      );
      const fromDate = new Date(searchCriteria.dateFrom);
      
      if (propertyDate < fromDate) {
        return false;
      }
    }
    
    if (searchCriteria.dateTo) {
      const propertyDate = new Date(
        property.added.year, 
        getMonthNumber(property.added.month), 
        property.added.day
      );
      const toDate = new Date(searchCriteria.dateTo);
      
      if (propertyDate > toDate) {
        return false;
      }
    }
    
    return true;
  });
};

/**
 * Convert month name to month number (0-11)
 * @param {string} monthName - Name of month
 * @returns {number} Month number (0-11)
 */
const getMonthNumber = (monthName) => {
  const months = {
    'january': 0, 'february': 1, 'march': 2, 'april': 3,
    'may': 4, 'june': 5, 'july': 6, 'august': 7,
    'september': 8, 'october': 9, 'november': 10, 'december': 11
  };
  return months[monthName.toLowerCase()];
};

/**
 * Format price for display
 * @param {number} price - Property price
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  return `£${price.toLocaleString()}`;
};

/**
 * Format date for display
 * @param {Object} dateObj - Date object with month, day, year
 * @returns {string} Formatted date string
 */
export const formatDate = (dateObj) => {
  return `${dateObj.day} ${dateObj.month} ${dateObj.year}`;
};