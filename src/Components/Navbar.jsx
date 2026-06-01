import React from 'react';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/honeymoon', label: 'Honeymoon Packages' },
  { to: '/international', label: 'International Tours' },
  { to: '/india', label: 'All India Tours' },
  { to: '/educational', label: 'Educational Tours' },
  { to: '/group', label: 'Group Tours' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' }
];

export default function Navbar() {
  return (
    <header className="nav-wrap">
      <div className="nav-container">
        <NavLink className="brand" to="/" aria-label="Travique Home">
          <span className="brand-dark">Trav</span>
          <span className="brand-gold">ique</span>
        </NavLink>

        <nav className="nav-links" aria-label="Primary Navigation">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-cta">
          <button className="btn btn-outline">Sign In</button>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </header>
  );
}
