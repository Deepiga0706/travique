import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
 
  { to: '/india', label: 'All India Tours' },
  { to: '/educational', label: 'Educational Tours' },
  { to: '/group', label: 'Group Tours' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' }
];

export default function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-wrap">
      <div className={`nav-container ${open ? 'open' : ''}`}>
        <NavLink className="brand" to="/" aria-label="Travique Home">
          <span className="brand-dark">Trav</span>
          <span className="brand-gold">ique</span>
        </NavLink>

        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          ☰
        </button>

        <nav className="nav-links" aria-label="Primary Navigation">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-cta">
          {!user ? (
            <NavLink to="/login"><button className="btn btn-primary">Sign In</button></NavLink>
          ) : (
            <ProfileDropdown user={user} onLogout={onLogout} />
          )}
        </div>
      </div>
    </header>
  );
}
