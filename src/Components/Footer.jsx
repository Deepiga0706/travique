import React from 'react';
import { Link,useLocation } from 'react-router-dom';

export default function Footer() {
   const location = useLocation();

  const hiddenRoutes = [
    '/login',
    '/signup'
  ];

  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h4>About Travique</h4>
          <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
            Premium travel planning and bespoke itineraries for discerning travelers.
          </p>
          <p style={{ marginTop: 8, color: 'rgba(255,255,255,0.75)' }}>
            Email: <a href="mailto:mailtravique@gmail.com">mailtravique@gmail.com</a>
          </p>
        </div>
        <div>
          <h5>Destinations</h5>
          <ul>
            <li style={{ padding: '4px 0', color: 'rgba(255,255,255,0.75)' }}><Link to="/destination/maldives">Maldives</Link></li>
            <li style={{ padding: '4px 0', color: 'rgba(255,255,255,0.75)' }}><Link to="/package/bali-honeymoon-retreat">Bali</Link></li>
            <li style={{ padding: '4px 0', color: 'rgba(255,255,255,0.75)' }}><Link to="/package/switzerland-couple-tour">Switzerland</Link></li>
            <li style={{ padding: '4px 0', color: 'rgba(255,255,255,0.75)' }}><Link to="/destination/paris">Paris</Link></li>
          </ul>
        </div>
        <div>
          <h5>Packages</h5>
          <ul>
            <li style={{ padding: '4px 0' }}><Link to="/honeymoon-packages">Honeymoon</Link></li>
            <li style={{ padding: '4px 0' }}><Link to="/family-vacations">Family</Link></li>
            <li style={{ padding: '4px 0' }}><Link to="/adventure-trips">Adventure</Link></li>
            <li style={{ padding: '4px 0' }}><Link to="/luxury-retreats">Luxury</Link></li>
          </ul>
        </div>
        <div>
          <h5>Quick Links</h5>
          <ul>
            <li style={{ padding: '4px 0' }}><Link to="/about">About Us</Link></li>
            <li style={{ padding: '4px 0' }}><Link to="/faq">FAQ</Link></li>
            <li style={{ padding: '4px 0' }}><Link to="/contact">Contact Us</Link></li>
            <li style={{ padding: '4px 0' }}><Link to="/">Home</Link></li>
          </ul>
        </div>
      </div>
      <div className="container copyright" style={{ color: 'rgba(255,255,255,0.65)', borderTop: '1px solid rgba(245,196,0,0.15)', paddingTop: 20 }}>
        © 2026 Travique Premium Private Ltd. All Rights Reserved.
      </div>
    </footer>
  );
}
