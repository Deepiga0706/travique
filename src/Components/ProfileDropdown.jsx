import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileDropdown({user, onLogout}){
  const navigate = useNavigate();
  return (
    <div className="profile-dropdown">
      <button className="profile-btn">👤 {user.name}</button>
      <div className="profile-menu">
        <button onClick={()=>navigate('/profile')}>My Profile</button>
        <button onClick={()=>navigate('/bookings')}>My Bookings</button>
        <button onClick={() => { localStorage.removeItem('travique_current_user'); if(onLogout) onLogout(); navigate('/'); }}>Logout</button>
      </div>
    </div>
  )
}
