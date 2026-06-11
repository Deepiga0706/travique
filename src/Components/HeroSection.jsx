import React, { useState, useEffect, useRef } from 'react';

const VIDEO_SRC = '/images/travique.mp4';

const slides = [
  { img: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=2000&q=80', alt: 'Luxury Beach' },
  { img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=80', alt: 'Alpine Retreat' },
  { img: 'https://media4.onsugar.com/files/2014/02/17/838/n/1922441/f0bd144ded7b1bfd_shutterstock_89720368.jpg.xxxlarge_2x.jpg', alt: 'City Night' },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  function handleExplore() {
    const el = document.getElementById('packages-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.warn('packages-section element not found');
    }
  }

  function closeVideo() {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setVideoOpen(false);
  }

  return (
    <section id="home" className="hero" style={{ background: 'var(--ocean)' }}>
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
        <p className="sub">
          Handcrafting customized itineraries and private group departures for world explorers who demand elite personalization.
        </p>
        <div className="hero-cta">
          <button className="btn btn-hero-primary" onClick={handleExplore}>
            Explore Packages
          </button>
          <button className="btn btn-hero-secondary" onClick={() => setVideoOpen(true)}>
            Watch Experiences
          </button>
        </div>
      </div>

      {/* Video Modal */}
      {videoOpen && (
        <div
          onClick={closeVideo}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.82)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999, padding: 20,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative', width: '100%', maxWidth: 900,
              borderRadius: 12, overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
            }}
          >
            <button
              onClick={closeVideo}
              style={{
                position: 'absolute', top: 12, right: 12, zIndex: 10,
                background: 'rgba(0,0,0,0.55)', color: '#fff', border: 'none',
                borderRadius: '50%', width: 36, height: 36, fontSize: 18,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              ✕
            </button>
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              controls
              autoPlay
              style={{ width: '100%', display: 'block', background: '#000' }}
            >
              Your browser does not support video.
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
