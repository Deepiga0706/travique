import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h4>About Travique</h4>
          <p className="muted">Premium travel planning and bespoke itineraries for discerning travelers.</p>
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
          <h5>Contact</h5>
          <p className="muted">concierge@travique.com</p>
          <div className="socials">𝕏 &nbsp; f &nbsp; 📸 &nbsp; in</div>
        </div>
      </div>
      <div className="container copyright">© 2026 Travique Premium Private Ltd. All Rights Reserved.</div>
    </footer>
  );
}
