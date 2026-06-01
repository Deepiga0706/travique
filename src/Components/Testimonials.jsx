import React, { useState, useEffect } from 'react';

const data = [
  { name: 'Priya Sharma', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', text: 'Travique planned our honeymoon perfectly. Highly professional.', rating: 5 },
  { name: 'Dr. Rajesh Kumar', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80', text: 'Best educational trip experience. Flawless coordination.', rating: 5 },
  { name: 'Vikram Malhotra', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80', text: 'Operational management was incredible for our group.', rating: 5 }
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(n => (n + 1) % data.length), 5000);
    return () => clearInterval(t);
  }, []);

  const cur = data[i];
  return (
    <section className="container testimonials">
      <h2 className="section-title">Customer Testimonials</h2>
      <div className="testi-card">
        <img src={cur.photo} alt={cur.name} />
        <div className="testi-body">
          <h4>{cur.name}</h4>
          <div className="stars">{'★'.repeat(cur.rating)}</div>
          <p className="muted">{cur.text}</p>
        </div>
      </div>
    </section>
  );
}
