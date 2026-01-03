import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { formatPrice, formatDate } from '../utils/searchUtils';
import './PropertyDetails.css';

/**
 * PropertyDetails component - displays detailed property information
 * Includes image gallery, tabs for description/floorplan/map, and favorites
 */
const PropertyDetails = ({ 
  properties, 
  favorites, 
  addToFavorites, 
  removeFromFavorites 
}) => {
  const { id } = useParams();
  const property = properties.find(p => p.id === id);
  const isFavorite = favorites.some(fav => fav.id === id);
  
  // Gallery state
  const [selectedImage, setSelectedImage] = useState(0);
  
  if (!property) {
    return (
      <div className="container">
        <div className="property-not-found">
          <h2>Property Not Found</h2>
          <Link to="/" className="btn btn-primary">Back to Search</Link>
        </div>
      </div>
    );
  }
  
  /**
   * Handle favorite toggle
   */
  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property);
    }
  };
  
  /**
   * Handle thumbnail click
   */
  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };
  
  /**
   * Navigate to next image
   */
  const handleNextImage = () => {
    setSelectedImage((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };
  
  /**
   * Navigate to previous image
   */
  const handlePrevImage = () => {
    setSelectedImage((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="property-details-page">
      <div className="container">
        {/* Breadcrumb navigation */}
        <nav className="breadcrumb">
          <Link to="/">Search</Link>
          <span> / </span>
          <span>{property.location}</span>
        </nav>
        
        {/* Property Header */}
        <div className="property-header">
          <div className="property-title-section">
            <h1>{property.location}</h1>
            <div className="property-price-large">
              {formatPrice(property.price)}
            </div>
          </div>
          <button 
            onClick={handleFavoriteToggle}
            className={`btn btn-favorite-large ${isFavorite ? 'is-favorite' : ''}`}
          >
            {isFavorite ? '★ Remove from Favorites' : '☆ Add to Favorites'}
          </button>
        </div>
        
        {/* Quick Info Bar */}
        <div className="property-quick-info">
          <div className="info-item">
            <strong>Property Type:</strong> {property.type}
          </div>
          <div className="info-item">
            <strong>Bedrooms:</strong> {property.bedrooms}
          </div>
          <div className="info-item">
            <strong>Tenure:</strong> {property.tenure}
          </div>
          <div className="info-item">
            <strong>Added:</strong> {formatDate(property.added)}
          </div>
        </div>
        
        {/* Image Gallery */}
        <div className="image-gallery">
          {/* Main Image */}
          <div className="gallery-main">
            <img 
              src={`${process.env.PUBLIC_URL}/${property.images[selectedImage]}`}
              alt={`${property.location} - Image ${selectedImage + 1}`}
              className="main-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x600?text=Property+Image';
              }}
            />
            
            {/* Navigation Arrows */}
            <button 
              onClick={handlePrevImage}
              className="gallery-nav gallery-prev"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button 
              onClick={handleNextImage}
              className="gallery-nav gallery-next"
              aria-label="Next image"
            >
              ›
            </button>
            
            {/* Image Counter */}
            <div className="image-counter">
              {selectedImage + 1} / {property.images.length}
            </div>
          </div>
          
          {/* Thumbnail Images */}
          <div className="gallery-thumbnails">
            {property.images.map((image, index) => (
              <div 
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`thumbnail ${index === selectedImage ? 'active' : ''}`}
              >
                <img 
                  src={`${process.env.PUBLIC_URL}/${image}`}
                  alt={`Thumbnail ${index + 1}`}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150x100?text=Thumb';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Property Information Tabs */}
        <div className="property-tabs">
          <Tabs>
            <TabList>
              <Tab>Description</Tab>
              <Tab>Floor Plan</Tab>
              <Tab>Map</Tab>
            </TabList>
            
            {/* Description Tab */}
            <TabPanel>
              <div className="tab-content">
                <h2>Property Description</h2>
                <p className="description-text">
                  {property.longDescription}
                </p>
              </div>
            </TabPanel>
            
            {/* Floor Plan Tab */}
            <TabPanel>
              <div className="tab-content">
                <h2>Floor Plan</h2>
                <div className="floorplan-container">
                  <img 
                    src={`${process.env.PUBLIC_URL}/${property.floorplan}`}
                    alt="Floor Plan"
                    className="floorplan-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x600?text=Floor+Plan';
                    }}
                  />
                </div>
              </div>
            </TabPanel>
            
            {/* Map Tab */}
            <TabPanel>
              <div className="tab-content">
                <h2>Location Map</h2>
                <div className="map-container">
                  <iframe
                    title="Property Location"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={(() => {
                      const mapsKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;
                      const q = encodeURIComponent(property.location);
                      return mapsKey
                        ? `https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=${q}`
                        : `https://www.google.com/maps?q=${q}&output=embed`;
                    })()}
                  />
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
        
        {/* Back Button */}
        <div className="property-actions-bottom">
          <Link to="/" className="btn btn-back">
            ← Back to Search
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;