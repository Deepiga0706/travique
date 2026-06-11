import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { 
  indiaCategories, 
  budgetRanges, 
  durationOptions 
} from '../data/IndiaPackages';

import IndiaStats from '../Components/IndiaStats';
import IndiaGallery from '../Components/IndiaGallery';

import '../styles/IndiaTours.css';
import Footer from '../Components/Footer';

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
                        onClick={() => navigate("/book-now", { state: { pkg } })}
                        type="button"
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

// Destination tag colours
const TAG_COLORS = {
  'Kerala Backwaters': { bg: 'rgba(11,122,117,0.10)', color: '#005F5B' },
  'Royal Rajasthan':  { bg: 'rgba(245,196,0,0.12)',  color: '#8B6F00' },
  'Golden Triangle Tour': { bg: 'rgba(0,59,54,0.09)', color: '#003B36' },
  'Kashmir Paradise': { bg: 'rgba(28,110,164,0.10)', color: '#1C6EA4' },
  'Andaman Honeymoon':{ bg: 'rgba(62,143,193,0.10)', color: '#2a7aaa' },
};

// Enriched testimonials with full review text
const ENRICHED = [
  { id:1, name:'Priya Sharma',   location:'Mumbai',    image:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', rating:5, review:'The Kerala package was perfectly organised. Every houseboat stay, every transfer, and every meal exceeded our expectations. Travique turned our dream trip into reality.', pkg:'Kerala Backwaters' },
  { id:2, name:'Rajesh Kumar',   location:'Delhi',     image:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', rating:5, review:'A memorable Rajasthan journey with excellent hospitality and seamless planning from start to finish. The desert safari and heritage hotel stays were absolutely world-class.', pkg:'Royal Rajasthan' },
  { id:3, name:'Anita Desai',    location:'Bangalore', image:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', rating:5, review:'The Golden Triangle experience was luxurious, comfortable, and completely stress-free. Our guide was brilliant and the Taj Mahal at sunrise left us speechless.', pkg:'Golden Triangle Tour' },
  { id:4, name:'Vikram Singh',   location:'Chandigarh',image:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', rating:5, review:'Kashmir truly is paradise on Earth. The houseboat on Dal Lake was romantic beyond words. Travique handled every detail — we just had to enjoy every moment.', pkg:'Kashmir Paradise' },
  { id:5, name:'Meera Nair',     location:'Chennai',   image:'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150', rating:5, review:'Our Andaman anniversary trip was flawless. Crystal-clear waters, amazing snorkelling, and a resort that felt truly premium. Will absolutely book with Travique again!', pkg:'Andaman Honeymoon' },
];

const STATS = [
  { icon:'😊', value:'5,000+', label:'Happy Travelers' },
  { icon:'⭐', value:'4.9/5',  label:'Average Rating'  },
  { icon:'🗺️', value:'120+',  label:'Destinations Covered' },
];

// 6. India Testimonials Component
const IndiaTestimonials = () => {
  const [active, setActive] = React.useState(0);
  const total = ENRICHED.length;

  // Auto-slide on mobile
  React.useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % total), 4500);
    return () => clearInterval(t);
  }, [total]);

  return (
    <section className="india-testi-section">
      <div className="container">
        {/* Header */}
        <div className="india-testi-header">
          <span className="section-subtitle">TESTIMONIALS</span>
          <h2 className="section-title">What Our Travelers Say</h2>
          <div className="india-testi-divider">
            <span className="india-testi-divider-line" />
            <span className="india-testi-divider-icon">✦</span>
            <span className="india-testi-divider-line" />
          </div>
          <p className="section-description">Real reviews from travellers who booked their Indian holidays with Travique.</p>
        </div>

        {/* Stats row */}
        <div className="india-testi-stats">
          {STATS.map((s, i) => (
            <div className="india-testi-stat" key={i}>
              <span className="india-testi-stat-icon">{s.icon}</span>
              <span className="india-testi-stat-value">{s.value}</span>
              <span className="india-testi-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="india-testi-grid">
          {ENRICHED.map((t) => {
            const tag = TAG_COLORS[t.pkg] || { bg:'rgba(0,59,54,0.08)', color:'#003B36' };
            return (
              <div className="india-testi-card" key={t.id}>
                <span className="india-testi-quote">❝</span>
                {/* Stars */}
                <div className="india-testi-stars">
                  {'★'.repeat(t.rating)}
                </div>
                {/* Review text */}
                <p className="india-testi-review">{t.review}</p>
                {/* Destination tag */}
                <span className="india-testi-tag" style={{ background: tag.bg, color: tag.color }}>
                  📍 {t.pkg}
                </span>
                {/* Traveller */}
                <div className="india-testi-user">
                  <img src={t.image} alt={t.name} className="india-testi-avatar" />
                  <div>
                    <div className="india-testi-name">{t.name}</div>
                    <div className="india-testi-location">{t.location}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile carousel */}
        <div className="india-testi-carousel">
          {(() => {
            const t = ENRICHED[active];
            const tag = TAG_COLORS[t.pkg] || { bg:'rgba(0,59,54,0.08)', color:'#003B36' };
            return (
              <div className="india-testi-card">
                <span className="india-testi-quote">❝</span>
                <div className="india-testi-stars">{'★'.repeat(t.rating)}</div>
                <p className="india-testi-review">{t.review}</p>
                <span className="india-testi-tag" style={{ background: tag.bg, color: tag.color }}>📍 {t.pkg}</span>
                <div className="india-testi-user">
                  <img src={t.image} alt={t.name} className="india-testi-avatar" />
                  <div>
                    <div className="india-testi-name">{t.name}</div>
                    <div className="india-testi-location">{t.location}</div>
                  </div>
                </div>
              </div>
            );
          })()}
          {/* Dots */}
          <div className="india-testi-dots">
            {ENRICHED.map((_, i) => (
              <button
                key={i}
                className={`india-testi-dot${i === active ? ' active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
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
      <Footer />
    </div>
  );
};

export default IndiaToursPage;
