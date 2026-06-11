import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';

function HoverBtn({ className, onClick, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className={className}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer', transform: hovered ? 'translateY(-3px)' : 'translateY(0)', transition: 'transform 0.2s ease, box-shadow 0.2s ease', boxShadow: hovered ? '0 8px 24px rgba(0,59,54,0.18)' : undefined }}
    >
      {children}
    </button>
  );
}

export default function AboutUs() {
  const navigate = useNavigate();

  function scrollToServices() {
    const el = document.getElementById('about-services');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="page about-page">
      <header className="about-hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-text">
              <h1>About Travique</h1>
              <p className="section-subtitle">We craft luxury travel experiences tailored to discerning explorers — thoughtful itineraries, white-glove service and local partnerships.</p>
              <div className="hero-ctas">
                <HoverBtn className="btn btn-primary" onClick={scrollToServices}>
                  Explore Our Services
                </HoverBtn>
                <HoverBtn className="btn btn-outline" onClick={() => navigate('/contact')}>
                  Contact Concierge
                </HoverBtn>
              </div>
            </div>

            <div className="hero-media" aria-hidden style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80)' }} />
          </div>
        </div>
      </header>

      <main className="container about-main">
        <section id="about-services" className="about-grid">
          <div className="about-mission">
            <h2 className="section-title">Who we are</h2>
            <p>Travique is a boutique travel atelier specialising in bespoke journeys. We blend expert planning with local insight to create memorable, stress-free experiences.</p>

            <div className="mission-cards">
              <div className="mission-card">
                <div className="icon">🧭</div>
                <h4>Curated Itineraries</h4>
                <p>Personalised routes and exclusive access crafted to your tastes.</p>
              </div>
              <div className="mission-card">
                <div className="icon">🤝</div>
                <h4>Trusted Partners</h4>
                <p>Local concierges and vetted suppliers ensure seamless service.</p>
              </div>
              <div className="mission-card">
                <div className="icon">⭐</div>
                <h4>White-Glove Service</h4>
                <p>From bookings to on-trip support, we handle every detail.</p>
              </div>
            </div>
          </div>

          <aside className="about-side">
            <div className="about-stats">
              <div className="stat"><div className="num">10+</div><div className="label">Years Curating</div></div>
              <div className="stat"><div className="num">1200+</div><div className="label">Trips Planned</div></div>
              <div className="stat"><div className="num">98%</div><div className="label">Satisfaction</div></div>
            </div>

            <div className="about-values">
              <h4>Our Values</h4>
              <ul>
                <li>Personalization</li>
                <li>Integrity</li>
                <li>Quality</li>
                <li>Sustainability</li>
              </ul>
            </div>
          </aside>
        </section>

        <section className="about-cta">
          <h3>Ready to plan your next journey?</h3>
          <p className="muted">Contact our concierge for a complimentary consultation.</p>
          <div style={{ marginTop: 16 }}>
            <HoverBtn className="btn btn-primary" onClick={() => navigate('/customize-trip')}>
              Book Consultation
            </HoverBtn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
