import React, { useState, useEffect } from 'react';


const slides = [
  { img: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=2000&q=80', alt: 'Luxury Beach' },
  { img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=80', alt: 'Alpine Retreat' },
  { img: 'https://media4.onsugar.com/files/2014/02/17/838/n/1922441/f0bd144ded7b1bfd_shutterstock_89720368.jpg.xxxlarge_2x.jpg?auto=format&fit=crop&w=2000&q=80', alt: 'City Night' }
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-slider">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`hero-slide ${i === index ? 'active' : ''}`}
            style={{ backgroundImage: `url(${s.img})` }}
            aria-hidden={i !== index}
          />
        ))}
        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
        <div className="hero-label">BESPOKE LUXURY TRAVEL AGENCY</div>
        <h1>The Real Voyage Of Discovery Consists Of New Eyes</h1>
        <p className="sub">Handcrafting customized itineraries and private group departures for world explorers who demand elite personalization.</p>

        <div className="hero-cta">
          <button className="btn btn-hero-primary">Explore Packages</button>
          <button className="btn btn-hero-secondary">Watch Experiences</button>
        </div>
      </div>
    </section>
  );
}
