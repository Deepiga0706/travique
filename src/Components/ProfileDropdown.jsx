import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileDropdown({ user, onLogout }) {
  const navigate = useNavigate();
 console.log(user);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
  }, []);

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button
        className="profile-btn"
        onClick={() => setOpen(!open)}
      >
        <div className="avatar">
          {user?.firstname?.charAt(0).toUpperCase()}
        </div>
      </button>

      {open && (
        <div className="profile-menu">
          <button onClick={() => navigate('/profile')}>
            My Profile
          </button>

          <button onClick={() => navigate('/bookings')}>
            My Bookings
          </button>

          {user?.role?.toLowerCase() === 'admin' && (
            <button onClick={() => navigate('/admin')}>
              Admin Panel
            </button>
          )}

          <button
            onClick={() => {
              localStorage.removeItem(
                'travique_current_user'
              );

              if (onLogout) onLogout();

              navigate('/');
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

