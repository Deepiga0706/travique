import React from 'react';
import { useNavigate } from 'react-router-dom';

const places = [
  { name: 'Maldives', img: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8NHx8dHJhdmVsfHwwfHx8fDE2MTkzMDU5NDI&ixlib=rb-1.2.1&q=80&w=1080?auto=format&fit=crop&w=800&q=80', price: 'Starting Rs. 45,000', rating: 4.9 },
  { name: 'Bali', img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80', price: 'Starting Rs. 29,999', rating: 4.8 },
  { name: 'Switzerland', img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80', price: 'Starting Rs. 1,45,000', rating: 4.9 },
  { name: 'Paris', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80', price: 'Starting Rs. 60,000', rating: 4.7 },
  { name: 'Dubai', img: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80', price: 'Starting Rs. 52,000', rating: 4.6 },
  { name: 'Singapore', img: 'https://images.unsplash.com/photo-1542114740389-9b46fb1e5be7?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNpbmdhcG9yZXxlbnwwfHwwfHx8MA%3D%3D?auto=format&fit=crop&w=800&q=80', price: 'Starting Rs. 55,000', rating: 4.5 }
];

export default function Destinations() {
  const navigate = useNavigate();

  return (
    <section id="destinations" className="container destinations">
      <h2 className="section-title">Popular Destinations</h2>
      <div className="dest-grid">
        {places.map((p, i) => (
          <div className="dest-card" key={i}>
            <div className="dest-media" style={{ backgroundImage: `url(${p.img})` }} />
            <div className="dest-body">
              <h4>{p.name}</h4>
              <div className="meta">
                <span className="rating">★ {p.rating}</span>
                <span className="price">{p.price}</span>
              </div>
              <button 
                className="btn btn-outline"
                onClick={() => navigate(`/destination/${p.name.toLowerCase()}`)}
              >
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
