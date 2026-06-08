import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { 
  indiaCategories, 
  indiaTestimonials, 
 
  budgetRanges, 
  durationOptions 
} from '../data/IndiaPackages';

import IndiaStats from '../Components/IndiaStats';
import IndiaGallery from '../Components/IndiaGallery';

import '../styles/IndiaTours.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// 1. India Hero Component
const IndiaHero = () => {
  return (
    <div className="india-hero">
      <div className="india-hero-content">
        <h1>Explore Incredible India</h1>
        <p>From the snow-capped Himalayas to the serene backwaters of Kerala, discover curated luxury packages for your next destination.</p>
        <a href="#packages-section" className="btn btn-gold">Browse Tour Packages</a>
      </div>
    </div>
  );
};

// 2. India Search & Filter Component
const IndiaSearchFilter = ({
  searchQuery,
  setSearchQuery,
  selectedBudget,
  setSelectedBudget,
  selectedDuration,
  setSelectedDuration,
  selectedCategory,
  setSelectedCategory,
  clearFilters,
  resultsCount
}) => {
  return (
    <div className="india-search-filter">
      <div className="filter-grid">
        <div className="filter-group">
          <label htmlFor="search">Search Destination</label>
          <input
            id="search"
            type="text"
            placeholder="Search by city or landmark..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="budget">Max Budget</label>
          <select
            id="budget"
            value={selectedBudget}
            onChange={(e) => setSelectedBudget(e.target.value)}
          >
            {budgetRanges.map((b) => (
              <option key={b.id} value={b.id}>
                {b.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="duration">Duration</label>
          <select
            id="duration"
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
          >
            {durationOptions.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {indiaCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="filter-actions">
        <span className="results-count">{resultsCount} tours found matching your search</span>
        {(searchQuery || selectedBudget !== 'all' || selectedDuration !== 'all' || selectedCategory !== 'all') && (
          <button className="clear-btn" onClick={clearFilters}>
            Clear Filters ✕
          </button>
        )}
      </div>
    </div>
  );
};

// 3. India Categories Selector
const IndiaCategories = ({ selectedCategory, onCategorySelect }) => {
  return (
    <section className="india-categories">
      <div className="container">
        <div className="categories-container">
          <button
            className={`category-pill ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => onCategorySelect('all')}
          >
            <span className="category-icon">✨</span>
            All Packages
          </button>
          {indiaCategories.map((c) => (
            <button
              key={c.id}
              className={`category-pill ${selectedCategory === c.id ? 'active' : ''}`}
              onClick={() => onCategorySelect(c.id)}
            >
              <span className="category-icon">{c.icon}</span>
              {c.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

// 4. India Packages List Grid Component
const IndiaPackagesGrid = ({ packages }) => {
  const navigate = useNavigate();

  if (packages.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h3>No Packages Found</h3>
        <p className="muted">Try adjusting your filters or search keywords to find matching India tours.</p>
      </div>
    );
  }

  return (
    <section id="packages-section" className="india-packages-section">
      <div className="container">
        <div className="packages-grid">
          {packages.map((pkg) => {
            const hasItinerary = pkg.itinerary && pkg.itinerary.length > 0;
            return (
              <article className="package-card" key={pkg.slug || pkg.id}>
                <div
                  className="package-img-wrapper"
                  style={{ backgroundImage: `url(${pkg.image})` }}
                >
                  {pkg.featured && <span className="featured-badge">Featured</span>}
                </div>

                <div className="package-content">
                  <div className="package-header">
                    <h3 className="package-title">{pkg.title}</h3>
                  </div>
                  <div className="package-destination">📍 {pkg.destination}</div>

                <div className="package-meta">
  <span className="package-duration">⏱ {pkg.duration}</span>
  
  {/* Utilizing the variable resolves the warning */}
  {hasItinerary && <span className="itinerary-badge">📋 Detailed Itinerary Included</span>}
  
  <span className="package-rating">
    <span className="rating-star">★</span> {pkg.rating ? pkg.rating.toFixed(1) : '4.8'}
  </span>
</div>

                  <p className="package-description">{pkg.description}</p>

                  <div className="package-footer">
                    <div className="package-price-wrap">
                      <span className="price-label">Price per person</span>
                      <strong className="package-price">₹{pkg.price.toLocaleString()}</strong>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        className="btn btn-outline"
                        onClick={() => navigate(`/package/${pkg.slug || pkg.id}`)}
                      >
                        Explore
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => alert("Booking flow placeholder")}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// 5. Why Choose Travique Component
const WhyChooseTravique = () => {
  const features = [
    { icon: '💰', title: 'Best Price Guarantee', desc: 'We match any comparable price and offer exclusive deals.' },
    { icon: '🎯', title: 'Expert Tour Guides', desc: 'Knowledgeable local guides who bring destinations to life.' },
    { icon: '✨', title: 'Customized Packages', desc: 'Tailor every aspect of your trip to match your preferences.' },
    { icon: '🏨', title: 'Verified Hotels', desc: 'Handpicked accommodations that meet premium standards.' }
  ];

  return (
    <section className="why-choose-us">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">OUR VALUE</span>
          <h2 className="section-title">Why Travel With Travique</h2>
          <p className="section-description">We combine absolute luxury, local expertise, and customized options to craft seamless journeys.</p>
        </div>

        <div className="why-grid">
          {features.map((f, i) => (
            <div className="why-card" key={i}>
              <span className="why-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p className="muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 6. India Testimonials Component
const IndiaTestimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">TESTIMONIALS</span>
          <h2 className="section-title">What Our Travelers Say</h2>
          <p className="section-description">Real reviews from travelers who booked their Indian holidays with us.</p>
        </div>

        <div className="testi-grid">
          {indiaTestimonials.slice(0, 3).map((t) => (
            <div className="testi-card" key={t.id}>
              <p className="testi-text">"{t.review}"</p>
              <div className="testi-user">
                <img src={t.image} alt={t.name} className="user-avatar" />
                <div className="user-info">
                  <h4>{t.name}</h4>
                  <span>{t.location} • {t.package}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



// Main Page Component
const IndiaToursPage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE}/api/packages?category=india`)
      .then((res) => {
        setPackages(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch India tour packages from database');
        setLoading(false);
      });
  }, []);

  // Parse duration from string like "6 Days / 5 Nights"
  const parseDuration = (durationStr) => {
    if (!durationStr) return 0;
    const match = durationStr.match(/(\d+)\s*Days/i);
    return match ? parseInt(match[1]) : 0;
  };

  // Filter packages based on all criteria
  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        pkg.title.toLowerCase().includes(searchLower) ||
        pkg.destination.toLowerCase().includes(searchLower) ||
        (pkg.region && pkg.region.toLowerCase().includes(searchLower));

      // Budget filter
      const budgetRange = budgetRanges.find((b) => b.id === selectedBudget);
      const matchesBudget =
        selectedBudget === 'all' ||
        !budgetRange ||
        (pkg.price >= budgetRange.min && pkg.price <= budgetRange.max);

      // Duration filter
      const days = parseDuration(pkg.duration);
      let matchesDuration = true;
      if (selectedDuration === 'short') matchesDuration = days >= 1 && days <= 4;
      else if (selectedDuration === 'medium') matchesDuration = days >= 5 && days <= 7;
      else if (selectedDuration === 'long') matchesDuration = days >= 8;

      // Category filter
      let matchesCategory = true;
      if (selectedCategory !== 'all') {
        if (Array.isArray(pkg.category)) {
          matchesCategory = pkg.category.includes(selectedCategory);
        } else if (typeof pkg.category === 'string') {
          matchesCategory = pkg.category.toLowerCase().includes(selectedCategory.toLowerCase());
        } else {
          matchesCategory = false;
        }
      }

      return matchesSearch && matchesBudget && matchesDuration && matchesCategory;
    });
  }, [packages, searchQuery, selectedBudget, selectedDuration, selectedCategory]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    // Scroll to packages section
    document.getElementById('packages-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedBudget('all');
    setSelectedDuration('all');
    setSelectedCategory('all');
  };

  return (
    <div className="india-tours-page">
      <IndiaHero />
      <IndiaStats />

      <IndiaSearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedBudget={selectedBudget}
        setSelectedBudget={setSelectedBudget}
        selectedDuration={selectedDuration}
        setSelectedDuration={setSelectedDuration}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        clearFilters={clearFilters}
        resultsCount={filteredPackages.length}
      />

      <IndiaCategories 
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect} 
      />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', fontSize: '1.2rem', color: '#556B65' }}>
          Loading India tours from database...
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'crimson' }}>
          {error}
        </div>
      ) : (
        <IndiaPackagesGrid packages={filteredPackages} />
      )}

      <WhyChooseTravique />
      <IndiaTestimonials />
      <IndiaGallery />
      

      {/* Floating Enquire Button */}
      <a href="mailto:concierge@travique.com" className="floating-enquire-btn">
        <span className="enquire-icon">📩</span>
        <span className="enquire-text">ENQUIRE NOW</span>
      </a>
    </div>
  );
};

export default IndiaToursPage;
