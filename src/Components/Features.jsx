import React from 'react';

const features = [
  { title: 'Personalized Planning', icon: '🧭', desc: 'Tailored itineraries just for you' },
  { title: 'Best Price Guarantee', icon: '💰', desc: 'Competitive pricing with transparency' },
  { title: '24/7 Support', icon: '🎧', desc: 'On-trip concierge whenever you need' },
  { title: 'Trusted Experts', icon: '👩‍✈️', desc: 'Experienced travel planners' }
];

export default function Features() {
  return (
    <section className="container features">
      <h2 className="section-title">Why Choose Travique</h2>
      <div className="features-grid">
        {features.map((f, i) => (
          <div key={i} className="feature-card">
            <div className="icon">{f.icon}</div>
            <h4>{f.title}</h4>
            <p className="muted">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
