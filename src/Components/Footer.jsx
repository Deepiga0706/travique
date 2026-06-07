import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h4>About Travique</h4>
          <p className="muted">Premium travel planning and bespoke itineraries for discerning travelers.</p>
          <p style={{marginTop:8}}>Email: <a href="mailto:mailtravique@gmail.com">mailtravique@gmail.com</a></p>
        </div>
        <div>
          <h5>Destinations</h5>
          <ul>
            <li>Maldives</li>
            <li>Bali</li>
            <li>Switzerland</li>
            <li>Paris</li>
          </ul>
        </div>
        <div>
          <h5>Packages</h5>
          <ul>
            <li>Honeymoon</li>
            <li>Family</li>
            <li>Adventure</li>
            <li>Luxury</li>
          </ul>
        </div>
        <div>
          <h5>Quick Links</h5>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/">Home</Link></li>
          </ul>
        </div>
      </div>
      <div className="container copyright">© 2026 Travique Premium Private Ltd. All Rights Reserved.</div>
    </footer>
  );
}
