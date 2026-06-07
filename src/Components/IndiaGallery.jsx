import React, { useState } from 'react';
import { indiaGallery } from '../../data/indiaPackages';

const IndiaGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="india-gallery-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">VISUAL JOURNEY</span>
          <h2 className="section-title">India Tourism Gallery</h2>
          <p className="section-description">
            Glimpses of the incredible destinations awaiting you
          </p>
        </div>

        <div className="gallery-grid">
          {indiaGallery.map((item, index) => (
            <div
              key={item.id}
              className={`gallery-item ${index === 0 ? 'large' : ''}`}
              onClick={() => openLightbox(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="gallery-image"
                loading="lazy"
              />
              <div className="gallery-overlay">
                <h3 className="gallery-title">{item.title}</h3>
                <p className="gallery-location">{item.location}</p>
                <span className="gallery-zoom-icon">🔍</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            ×
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.image} alt={selectedImage.title} />
            <div className="lightbox-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.location}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default IndiaGallery;
