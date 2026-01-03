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
    if (searchCriteria.type && String(searchCriteria.type).toLowerCase() !== 'any') {
      if (property.type.toLowerCase() !== String(searchCriteria.type).toLowerCase()) {
        return false;
      }
    }

    // Parse numeric criteria safely; treat 'any' or empty as unset
    const parseMaybeNumber = (v) => {
      if (v === undefined || v === null) return null;
      if (String(v).toLowerCase() === 'any' || String(v).trim() === '') return null;
      const n = Number(String(v));
      return Number.isNaN(n) ? null : n;
    };

    const minP = parseMaybeNumber(searchCriteria.minPrice);
    const maxP = parseMaybeNumber(searchCriteria.maxPrice);
    const minB = parseMaybeNumber(searchCriteria.minBedrooms);
    const maxB = parseMaybeNumber(searchCriteria.maxBedrooms);

    // Min/Max price
    if (minP !== null && property.price < minP) return false;
    if (maxP !== null && property.price > maxP) return false;

    // Min/Max bedrooms
    if (minB !== null && property.bedrooms < minB) return false;
    if (maxB !== null && property.bedrooms > maxB) return false;

    // Postcode filter: match postcode prefix (case-insensitive)
    if (searchCriteria.postcode && String(searchCriteria.postcode).trim() !== '' && String(searchCriteria.postcode).toLowerCase() !== 'any') {
      const prefix = String(searchCriteria.postcode).trim().toLowerCase();
      if (!property.postcode.toLowerCase().startsWith(prefix)) {
        return false;
      }
    }

    // Date filter: normalize property date once
    const propertyDate = new Date(
      property.added.year,
      getMonthNumber(property.added.month),
      property.added.day
    );

    const parseMaybeDate = (d) => {
      if (!d) return null;
      if (d instanceof Date) return isNaN(d.getTime()) ? null : d;
      const parsed = new Date(d);
      return isNaN(parsed.getTime()) ? null : parsed;
    };

    const fromDate = parseMaybeDate(searchCriteria.dateFrom);
    const toDate = parseMaybeDate(searchCriteria.dateTo);

    if (fromDate && propertyDate < fromDate) return false;
    if (toDate && propertyDate > toDate) return false;

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