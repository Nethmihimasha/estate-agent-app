import React from 'react';
import { useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/searchUtils';
import './FavoritesList.css';

/**
 * FavoritesList component - displays and manages favorite properties
 * Implements drop zone for drag-and-drop functionality
 */
const FavoritesList = ({ favorites, removeFromFavorites, clearFavorites }) => {
  // Setup drop zone for dragged properties
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'property',
    drop: (item) => {
      // This is handled in the parent component
      // The onAddToFavorites function is called when dropping
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div 
      ref={drop}
      className={`favorites-list ${isOver ? 'drag-over' : ''}`}
    >
      <div className="favorites-header">
        <h3>Favorites ({favorites.length})</h3>
        {favorites.length > 0 && (
          <button 
            onClick={clearFavorites}
            className="btn btn-clear"
            title="Clear all favorites"
          >
            Clear All
          </button>
        )}
      </div>
      
      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <p>No favorite properties yet</p>
          <p className="hint">Drag properties here or click the favorite button</p>
        </div>
      ) : (
        <div className="favorites-items">
          {favorites.map(property => (
            <FavoriteItem 
              key={property.id}
              property={property}
              onRemove={removeFromFavorites}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Individual favorite property item
 */
const FavoriteItem = ({ property, onRemove }) => {
  return (
    <div className="favorite-item">
      <Link to={`/property/${property.id}`} className="favorite-link">
        <img 
          src={`${process.env.PUBLIC_URL}/${property.picture}`}
          alt={property.location}
          className="favorite-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/100x75?text=Property';
          }}
        />
        <div className="favorite-info">
          <div className="favorite-price">{formatPrice(property.price)}</div>
          <div className="favorite-location">{property.location}</div>
          <div className="favorite-bedrooms">{property.bedrooms} bed</div>
        </div>
      </Link>
      <button 
        onClick={() => onRemove(property.id)}
        className="btn btn-remove"
        title="Remove from favorites"
        aria-label="Remove from favorites"
      >
        ×
      </button>
    </div>
  );
};

export default FavoritesList;