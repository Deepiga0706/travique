import React from 'react';

export default function AboutUs() {
  return (
    <div className="page about-page">
      <header className="page-hero" style={{padding:'80px 20px', background: 'linear-gradient(90deg, rgba(1,77,64,0.03), rgba(1,77,64,0.02))'}}>
        <div className="container">
          <h1>About Travique</h1>
          <p className="muted">Premium travel planning and bespoke itineraries for discerning travelers.</p>
        </div>
      </header>

      <main className="container" style={{padding:'40px 20px'}}>
        <section>
          <h2>Who we are</h2>
          <p>Travique is a bespoke luxury travel agency specializing in curated experiences across the globe. We craft personalized itineraries, private departures and white-glove services for discerning travelers.</p>
        </section>

        <section style={{marginTop:24}}>
          <h3>Our Approach</h3>
          <ul>
            <li>Expert itinerary planning</li>
            <li>Local partnerships and concierge services</li>
            <li>Transparent pricing and secure bookings</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
