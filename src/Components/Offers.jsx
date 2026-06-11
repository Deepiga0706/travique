import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Offers() {
  const navigate = useNavigate();

  return (
    <section id="offers" className="offers">
      <div className="offers-inner container">
        <div>
          <h3>Customize Your Dream Vacation</h3>
          <p className="muted">
            Can't find the perfect package? Tell us your destination, budget, travel dates, and preferences, and we'll create a personalized itinerary just for you.
          </p>
        </div>
        <div>
          <button className="btn btn-primary" onClick={() => navigate('/customize-trip')}>
            ✨ Customize Your Trip
          </button>
        </div>
      </div>
    </section>
  );
}

