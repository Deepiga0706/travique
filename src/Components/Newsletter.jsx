import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  return (
    <section className="newsletter container">
      <div className="newsletter-card">
        <div>
          <h3>Join Travique Newsletter</h3>
          <p className="muted">Get exclusive luxury travel deals and curated itineraries.</p>
        </div>
        <form onSubmit={e => e.preventDefault()} className="newsletter-form">
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" />
          <button className="btn btn-primary">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
