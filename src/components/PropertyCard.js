import React from 'react';
// Use plain anchors to avoid depending on react-router-dom in tests
import { useDrag } from 'react-dnd';
import { formatPrice, formatDate } from '../utils/searchUtils';
import './PropertyCard.css';

/**
 * PropertyCard
 * A compact card used in search results that shows the main image,
 * price, location and a short description. It also supports two
 * ways to add a property to favorites:
 * - click the favorite button
 * - drag the card into the favorites drop zone
 *
 * Props:
 * - property: object with property data
 * - onAddToFavorites(property): add to favorites callback
 * - isFavorite: boolean indicating if already favorited (disables button)
 */
const PropertyCard = ({ property, onAddToFavorites, isFavorite }) => {
  // Setup drag functionality for adding to favorites
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'property',
    item: property,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  
  // Adds the property to favorites when the button is pressed.
  // Note: `App` prevents duplicates server-side by checking `id`.
  const handleFavoriteClick = () => {
    onAddToFavorites(property);
  };

  return (
    <div 
      ref={drag}
      className={`property-card ${isDragging ? 'dragging' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {/* Property Image */}
      <a href={`/property/${property.id}`} className="property-image-link">
        <img 
          src={`${process.env.PUBLIC_URL}/${property.picture}`}
          alt={property.location}
          className="property-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Property+Image';
          }}
        />
      </a>
      
      {/* Property Details */}
      <div className="property-details">
        {/* Price */}
        <div className="property-price">
          {formatPrice(property.price)}
        </div>
        
        {/* Location */}
        <h3 className="property-location">
            <a href={`/property/${property.id}`}>{property.location}</a>
        </h3>
        
        {/* Property Info */}
        <div className="property-info">
          <span className="info-item">
            <strong>Type:</strong> {property.type}
          </span>
          <span className="info-item">
            <strong>Bedrooms:</strong> {property.bedrooms}
          </span>
          <span className="info-item">
            <strong>Tenure:</strong> {property.tenure}
          </span>
        </div>
        
        {/* Description */}
        <p className="property-description">
          {property.description}
        </p>
        
        {/* Date Added */}
        <p className="property-date">
          Added: {formatDate(property.added)}
        </p>
        
        {/* Action Buttons */}
        <div className="property-actions">
          <a href={`/property/${property.id}`} className="btn btn-view">View Details</a>
          <button 
            onClick={handleFavoriteClick}
            className={`btn btn-favorite ${isFavorite ? 'is-favorite' : ''}`}
            disabled={isFavorite}
            title={isFavorite ? 'Already in favorites' : 'Add to favorites'}
          >
            {isFavorite ? '★ Favorited' : '☆ Add to Favorites'}
          </button>
        </div>
        
        {/* Drag indicator */}
        <div className="drag-hint">
          Drag to favorites →
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;