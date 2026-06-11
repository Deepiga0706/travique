import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';

const trips = [
  {
    slug: 'edu-history-kochi',
    title: 'Kochi Heritage & History',
    image: '/images/educational_trip.jpg',
    duration: '3 Days / 2 Nights',
    price: 6499,
    description: 'Guided learning tour focused on Kerala’s colonial history, spice trade and cultural landmarks.'
  },
  {
    slug: 'edu-science-bengaluru',
    title: 'Bengaluru Science & Innovation',
    image: '/images/educational_trip2.jpg',
    duration: '2 Days / 1 Night',
    price: 4999,
    description: 'Visits to science centres, tech parks and hands-on workshops for curious minds.'
  },
  {
    slug: 'edu-nature-kodai',
    title: 'Nature & Ecology in Kodaikanal',
    image: '/images/educational_trip3.jpg',
    duration: '4 Days / 3 Nights',
    price: 9999,
    description: 'Field studies, guided treks and ecology sessions ideal for school and college groups.'
  },
  {
    slug: 'edu-cultural-jaipur',
    title: 'Rajasthan Culture & Heritage',
    image: '/images/Family_trip.jpeg',
    duration: '3 Days / 2 Nights',
    price: 7499,
    description: 'Hands-on cultural workshops, heritage walks and museum visits for immersive learning.'
  }
];

export default function EducationalTrip(){
  const navigate = useNavigate();

  return (
    <div className="page" style={{background:'var(--off-white)',minHeight:'100vh'}}>
      <section className="container category-page" style={{padding:'60px 20px'}}>
      <h2 className="section-title">Educational Trips</h2>
      <p className="muted">Curated learning experiences and group-friendly itineraries.</p>

      <div className="grid" style={{marginTop:18}}>
        {trips.map(t => (
          <article key={t.slug} className="card" style={{borderRadius:12,overflow:'hidden',boxShadow:'0 10px 30px rgba(2,38,35,0.06)'}}>
            <div style={{height:180,backgroundSize:'cover',backgroundPosition:'center',backgroundImage:`url(${t.image})`}} />
            <div style={{padding:16}}>
              <h3>{t.title}</h3>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
                <span className="muted">{t.duration}</span>
                <strong className="price">₹{t.price.toLocaleString()}</strong>
              </div>
              <p className="muted" style={{marginTop:10}}>{t.description}</p>
              <div style={{marginTop:12,display:'flex',gap:8}}>
                <button className="btn btn-outline" onClick={()=>navigate(`/package/${t.slug}`)}>View Details</button>
                <button className="btn btn-primary" onClick={()=>navigate("/book-now", { state: { pkg: t } })} type="button">Book Now</button>
              </div>
            </div>
          </article>
        ))}
      </div>
      </section>
      <Footer />
    </div>
  )
}
