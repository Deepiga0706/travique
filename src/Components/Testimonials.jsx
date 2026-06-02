import React from 'react';
import group_trip from '../Assests/Images/group_trip.jpg';
import rithanya from '../Assests/Images/rithanya.jpeg';
import Family_trip from '../Assests/Images/Family_trip.jpeg';
import IV from '../Assests/Images/IV.jpg';
const data = [
  {
    name: 'Friends Tour',
    photo: group_trip,
    rating: 5,
    location: 'Manali, India',
    tripType: 'Friends Trip',
    text: ' Our friends trip to Manali with Travique was an absolute blast! The itinerary was perfectly balanced with thrilling activities and relaxing moments, allowing us to bond and create unforgettable memories together.'
  },
  {
    name: 'Rithanya',
    photo: rithanya,
    rating: 5,
    location: 'Coimbatore, India',
    tripType: 'Adventurous Trip-Manali',
    text: 'Our Manali adventure trip with Travique was absolutely thrilling! From river rafting and paragliding to exploring the beautiful mountains, every activity was planned professionally and safely.'
  },
  {
    name: 'Subika',
    photo: Family_trip,
    rating: 5,
    location: 'Kashmir, India',
    tripType: 'Family Trip',
    text: 'Our family trip to Paris with Travique was unforgettable. They took care of every detail, from kid-friendly activities to comfortable accommodations, making it a stress-free and enjoyable experience for all of us.'
  },
  {
    name: 'Industrial Visit',
    photo: IV,
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
        <div className="testi-grid">
          {data.map((p, idx) => (
            <article className="testi-card" key={idx}>
              <div className="testi-media" style={{ backgroundImage: `url(${p.photo})` }} />

              <div className="testi-content testimonial-content">
                <header className="testi-header">
                  <div className="quote">❝</div>
                  <Stars count={p.rating} />
                </header>

                <div className="review-text">
                  <p className="testi-text">{p.text}</p>
                </div>

                <div className="testi-footer reviewer-info">
                  <div className="customer">
                    <div className="cust-name">{p.name}</div>
                    <div className="cust-meta">{p.location} • {p.tripType}</div>
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
