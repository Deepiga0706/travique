import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CategoryPage({slug, title}){
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [requestedCategory, setRequestedCategory] = useState(null);
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
    setLoading(true);
    setError(null);

    // Prefer backend filtering when slug is present; treat 'india' as special (fetch all)
    const mapped = slug ? mapSlug(slug) : null;
    const categoryParam = mapped === 'india' ? null : mapped;
    setRequestedCategory(categoryParam === null ? null : categoryParam);
    const url = categoryParam
      ? `http://localhost:5000/api/packages?category=${encodeURIComponent(categoryParam)}`
      : 'http://localhost:5000/api/packages';

    console.log('Fetching packages from', url);
    axios
      .get(url)
      .then((res) => {
        // If backend returned empty but we have a slug, fetch all and filter as fallback
        console.log('Initial response count:', (res.data || []).length);
        if ((res.data || []).length === 0 && slug) {
          console.log('Empty response for category, fetching all packages as fallback');
          return axios.get('http://localhost:5000/api/packages').then(r => r.data);
        }
        return res.data;
      })
      .then((data) => {
        console.log('Final packages count:', (data || []).length);
        setPackages(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load packages');
        setLoading(false);
      });

  }, [slug]);

  // Decide items to render. If we requested a category from the server, trust server results.
  let items = packages;
  if (slug) {
    if (!requestedCategory) {
      // No backend category requested (e.g., 'india') — perform client-side filter
      items = packages.filter(p => {
        if (!p) return false;
        const category = p.category;
        const wanted = mapSlug(slug);
        if (Array.isArray(category)) return category.includes(wanted) || category.includes(slug) || category.includes(slug.replace(/-/, ''));
        return category === wanted || category === slug;
      });
    } else {
      // Server was asked for a specific category — trust its results
      items = packages;
    }
  }

  return (
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
      background: '#fff'
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
  )
}
