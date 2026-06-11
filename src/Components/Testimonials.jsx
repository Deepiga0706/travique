import React from 'react';

const data = [
  {
    name: 'Friends Tour',
    photo: '/images/group_trip.jpg',
    rating: 5,
    location: 'Manali, India',
    tripType: 'Friends Trip',
    text: 'Our friends trip to Manali with Travique was an absolute blast! The itinerary was perfectly balanced with thrilling activities and relaxing moments, allowing us to bond and create unforgettable memories together.'
  },
  {
    name: 'Rithanya',
    photo: '/images/rithanya.jpeg',
    rating: 5,
    location: 'Coimbatore, India',
    tripType: 'Adventurous Trip-Manali',
    text: 'Our Manali adventure trip with Travique was absolutely thrilling! From river rafting and paragliding to exploring the beautiful mountains, every activity was planned professionally and safely.'
  },
  {
    name: 'Subika',
    photo: '/images/Family_trip.jpeg',
    rating: 5,
    location: 'Kashmir, India',
    tripType: 'Family Trip',
    text: 'Our family trip to Paris with Travique was unforgettable. They took care of every detail, from kid-friendly activities to comfortable accommodations, making it a stress-free and enjoyable experience for all of us.'
  },
  {
    name: 'Industrial Visit',
    photo: '/images/IV.jpg',
    rating: 4,
    location: 'Kochin, India',
    tripType: 'Educational Trip',
    text: 'Our educational trip to Kochin was well-organized and informative. The itinerary was thoughtfully planned, allowing us to explore the city’s rich culture and history while also providing ample time for relaxation and enjoyment.'
  }
];

function Stars({ count = 5 }) {
  return (
    <div className="stars" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="container">
        <h2 id="testimonials-title" className="section-title">Customer Testimonials</h2>
        <div className="testi-grid india-testimonials-grid">
          {data.map((p, idx) => (
            <article className="testi-card india-testimonial-card" key={idx}>
              <div className="testi-media" style={{ backgroundImage: `url(${p.photo})` }} />

              <div className="testi-content testimonial-content">
                <header className="testi-header india-testimonial-header">
                  <div className="quote india-quote" aria-hidden>
                    ❝
                  </div>
                  <Stars count={p.rating} />
                </header>

                <div className="review-text">
                  <div className="india-destination-badge">{p.location}</div>
                  <p className="testi-text india-testimonial-text">{p.text}</p>
                </div>

                <div className="testi-footer reviewer-info">
                  <div className="customer">
                    <div className="customer-avatar">
                      <img src={p.photo} alt={p.name} />
                    </div>
                    <div className="cust-name india-cust-name">{p.name}</div>
                    <div className="cust-meta india-cust-meta">{p.tripType}</div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

