import React from 'react';
import Footer from '../Components/Footer';

export default function Bookings(){
  return (
    <div className="page" style={{background:'var(--off-white)',minHeight:'100vh'}}>
      <div className="container" style={{padding:'80px 20px'}}>
        <h2 style={{color:'var(--primary)'}}>My Bookings</h2>
        <p className="muted">You currently have no bookings. Book your next trip with Travique.</p>
      </div>
      <Footer />
    </div>
  )
}
