import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../Components/Footer";


function ItineraryItem({ it }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="itinerary-item">
      <button className="itinerary-toggle" onClick={() => setOpen(!open)}>
        <strong>Day {it.day} - {it.title}</strong>
        <span>{open ? "−" : "+"}</span>
      </button>
      {open && <div className="itinerary-body">{it.details}</div>}
    </div>
  );
}

export default function PackageDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);

  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/packages/${slug}`)
      .then((res) => { setPkg(res.data); setLoading(false); })
      .catch((err) => { console.log(err); setLoading(false); });
  }, [slug]);

  useEffect(() => {
    if (!pkg) return;
    const imgs = [];
    if (pkg.images?.length) imgs.push(...pkg.images);
    if (pkg.gallery?.length) imgs.push(...pkg.gallery);
    if (pkg.image) imgs.push(pkg.image);
    setGallery(imgs.filter(Boolean));

    const cat = Array.isArray(pkg.category) ? pkg.category[0] : pkg.category;
    if (!cat) return;
    axios.get(`${process.env.REACT_APP_API_URL}/api/packages?category=${encodeURIComponent(cat)}`)
      .then(res => {
        const list = (res.data || []).filter(p => (p.slug || p.id) !== (pkg.slug || pkg.id));
        setRelated(list.slice(0, 4));
      })
      .catch(err => console.log(err));
  }, [pkg]);

  if (loading) {
    return (
      <div style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
        <div className="container" style={{ padding: 80 }}>Loading package...</div>
        <Footer />
      </div>
    );
  }

  if (!pkg) {
    return (
      <div style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
        <div className="container" style={{ padding: "80px 20px", textAlign: "center", minHeight: "60vh" }}>
          <h2 style={{ color: 'var(--primary)' }}>No Package Found</h2>
          <p className="muted" style={{ marginTop: 10 }}>
            The package you are looking for does not exist or may have been removed.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="package-page" style={{ background: 'var(--off-white)' }}>
      {/* Hero banner */}
      <div style={{ height: 500, backgroundImage: `url(${pkg.image})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,59,54,0.38), rgba(10,74,99,0.72))", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingLeft: 80, paddingBottom: 48, color: "#fff" }}>
          <h1 style={{ margin: 0, fontSize: '2.4rem', fontWeight: 800 }}>{pkg.title}</h1>
          <p style={{ margin: '8px 0 0', opacity: 0.9 }}>{pkg.duration} • {pkg.destination}</p>
        </div>
      </div>

      <div className="container" style={{ padding: 24, maxWidth: 1000 }}>
        {/* Image gallery */}
        {gallery.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6 }}>
              {gallery.map((src, idx) => (
                <div key={idx} style={{ flex: '0 0 auto' }}>
                  <img
                    src={src}
                    alt={`gallery-${idx}`}
                    style={{ width: 160, height: 100, objectFit: 'cover', borderRadius: 8, cursor: 'pointer', boxShadow: '0 6px 18px rgba(0,59,54,0.08)', border: '2px solid var(--light-bg)' }}
                    onClick={() => setLightboxIndex(idx)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lightbox */}
        {lightboxIndex >= 0 && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }} onClick={() => setLightboxIndex(-1)}>
            <button style={{ position: 'absolute', left: 20, top: 20, fontSize: 22, background: 'transparent', color: '#fff', border: 'none', cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setLightboxIndex(-1); }}>✕</button>
            <button style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', fontSize: 28, background: 'transparent', color: '#fff', border: 'none', cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => (i - 1 + gallery.length) % gallery.length); }}>◀</button>
            <img src={gallery[lightboxIndex]} alt="lightbox" style={{ maxWidth: '90%', maxHeight: '80%', borderRadius: 8 }} onClick={(e) => e.stopPropagation()} />
            <button style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', fontSize: 28, background: 'transparent', color: '#fff', border: 'none', cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => (i + 1) % gallery.length); }}>▶</button>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div className="muted">{pkg.duration} • {pkg.destination}</div>
          <div className="price" style={{ fontSize: 18, fontWeight: 800 }}>₹{pkg.price?.toLocaleString()}</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, marginTop: 18 }}>
          <div>
            <h4 style={{ color: 'var(--primary)' }}>Overview</h4>
            <p className="muted">{pkg.description}</p>

            <h4 style={{ marginTop: 16, color: 'var(--primary)' }}>Inclusions</h4>
            <ul style={{ color: 'var(--text-dark)' }}>
              {pkg.inclusions?.map((item, i) => <li key={i}>{item}</li>)}
            </ul>

            <h4 style={{ marginTop: 16, color: 'var(--primary)' }}>Exclusions</h4>
            <ul style={{ color: 'var(--text-dark)' }}>
              {pkg.exclusions?.map((item, i) => <li key={i}>{item}</li>)}
            </ul>

            <h4 style={{ marginTop: 16, color: 'var(--primary)' }}>Highlights</h4>
            <ul style={{ color: 'var(--text-dark)' }}>
              {pkg.highlights?.map((item, i) => <li key={i}>{item}</li>)}
            </ul>

            <h4 style={{ marginTop: 18, color: 'var(--primary)' }}>Itinerary</h4>
            <div className="itinerary-list">
              {pkg.itinerary?.map((item, i) => <ItineraryItem key={i} it={item} />)}
            </div>
          </div>

          <aside style={{ background: "#fff", padding: 18, borderRadius: 12, boxShadow: "0 8px 30px rgba(0,59,54,0.08)", border: '1px solid var(--light-bg)', alignSelf: 'start', position: 'sticky', top: 90 }}>
            <h4 style={{ color: 'var(--primary)', marginTop: 0 }}>Book This Package</h4>
            <p className="muted">{pkg.duration}</p>
            <div style={{ fontSize: 24, fontWeight: 800, margin: "12px 0", color: 'var(--primary)' }}>
              ₹{pkg.price?.toLocaleString()}
            </div>
            <button
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => navigate("/book-now", { state: { pkg } })}
              type="button"
            >
              Book Now
            </button>


          </aside>
        </div>
      </div>

      {/* Similar Packages */}
      {related.length > 0 && (
        <div className="container" style={{ padding: '24px', maxWidth: 1000 }}>
          <h3 style={{ marginTop: 18, color: 'var(--primary)' }}>You May Also Like</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16, marginTop: 12 }}>
            {related.map((r) => (
              <article key={r.slug || r.id} className="card" style={{ borderRadius: 10, overflow: 'hidden', background: '#fff', boxShadow: '0 8px 24px rgba(0,59,54,0.07)' }}>
                <div style={{ height: 130, backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${r.image})` }} />
                <div style={{ padding: 12 }}>
                  <h4 style={{ margin: 0, color: 'var(--text-dark)' }}>{r.title}</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                    <span className="muted">{r.duration}</span>
                    <strong className="price">₹{(r.price || 0).toLocaleString()}</strong>
                  </div>
                  <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button className="btn btn-outline" style={{ fontSize: 13, padding: '6px 12px' }} onClick={() => window.location.href = `/package/${r.slug || r.id}`}>Explore</button>
                    <div style={{ color: 'var(--gold)', fontWeight: 700 }}>★ {(r.rating || 0).toFixed(1)}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
