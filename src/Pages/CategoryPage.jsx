import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../Components/Footer';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const CATEGORIES = [
  'honeymoon-packages',
  'group-tours',
  'family-vacations',
  'international-tours',
  'adventure-trips',
  'beach-escapes',
  'luxury-retreats',
  'group',
  'honeymoon',
  'family',
  'international',
  'adventure',
  'beach',
  'luxury'
];

export default function CategoryPage({ slug: propSlug, title: propTitle }) {
  const navigate = useNavigate();
  const { slug: paramSlug } = useParams();

  const slug = propSlug || paramSlug;
  const isCategory = CATEGORIES.includes(slug);

  const title = propTitle || (slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') + ' Tours' : 'Tours');

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map incoming slug to backend category keys when necessary
  const mapSlug = (s) => {
    if (!s) return s;
    const map = {
      'honeymoon-packages': 'honeymoon',
      'group-tours': 'group',
      'family-vacations': 'family',
      'international-tours': 'international',
      'adventure-trips': 'adventure',
      'beach-escapes': 'beach',
      'luxury-retreats': 'luxury'
    };
    return map[s] || s;
  };

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);

    let url = `${API_BASE}/api/packages`;
    if (isCategory) {
      const mapped = mapSlug(slug);
      url = `${API_BASE}/api/packages?category=${encodeURIComponent(mapped)}`;
    } else {
      url = `${API_BASE}/api/packages?destination=${encodeURIComponent(slug)}`;
    }

    console.log('Fetching packages from', url);
    axios
      .get(url)
      .then((res) => {
        setPackages(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load packages');
        setLoading(false);
      });

  }, [slug, isCategory]);

  let items = packages;

  return (
    <div className="page" style={{background:'var(--off-white)',minHeight:'100vh'}}>
    <section className="container category-page" style={{padding:'60px 20px'}}>
      <h2 className="section-title">{title}</h2>
      <p className="muted">Explore curated packages in this category.</p>

      {loading && <div style={{padding:40}}>Loading packages...</div>}
      {error && <div style={{padding:40,color:'crimson'}}>{error}</div>}

      <div className="grid" style={{marginTop:18}}>
        {items.map((p) => (
  <article
    key={p.slug || p.id}
    className="card"
    style={{
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(2,38,35,0.06)",
      background: '#f4f8f7'
    }}
  >
    <div
      style={{
        height: 200,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${p.image})`
      }}
    />

    <div style={{ padding: 16 }}>
      <h3 style={{marginBottom:6}}>{p.title}</h3>

      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <div className="muted">{p.destination}</div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 8
        }}
      >
        <span className="muted">{p.duration}</span>
        <strong className="price">
          ₹{(p.price||0).toLocaleString()}
        </strong>
      </div>

      <p className="muted" style={{ marginTop: 10, minHeight:48 }}>{p.description}</p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{color:'#bfa24a',fontWeight:700}}>{(p.rating||0).toFixed(1)}</div>
          <div className="muted">({p.reviews||0})</div>
        </div>

        <div style={{display:'flex',gap:8}}>
          <button
            className="btn btn-outline"
            onClick={() => navigate(`/package/${p.slug || p.id}`)}
          >
            Explore
          </button>

          <button
            className="btn btn-primary"
            onClick={() => alert("Booking flow placeholder")}
          >
            Book Now
          </button>
        </div>
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
