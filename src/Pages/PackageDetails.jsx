import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ItineraryItem({ it }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="itinerary-item">
      <button
        className="itinerary-toggle"
        onClick={() => setOpen(!open)}
      >
        <strong>
          Day {it.day} - {it.title}
        </strong>
        <span>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="itinerary-body">
          {it.details}
        </div>
      )}
    </div>
  );
}

export default function PackageDetails() {
  const { slug } = useParams();

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/packages/${slug}`)
      .then((res) => {
        setPkg(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [slug]);

  // When pkg loads, build gallery and fetch related packages
  useEffect(() => {
    if (!pkg) return;

    // Build gallery from possible fields
    const imgs = [];
    if (pkg.images && Array.isArray(pkg.images) && pkg.images.length) imgs.push(...pkg.images);
    if (pkg.gallery && Array.isArray(pkg.gallery) && pkg.gallery.length) imgs.push(...pkg.gallery);
    if (pkg.image) imgs.push(pkg.image);
    setGallery(imgs.filter(Boolean));

    // Determine category for related packages
    const cat = Array.isArray(pkg.category) ? pkg.category[0] : pkg.category;
    if (!cat) return;

    axios.get(`http://localhost:5000/api/packages?category=${encodeURIComponent(cat)}`)
      .then(res => {
        const list = (res.data || []).filter(p => (p.slug || p.id) !== (pkg.slug || pkg.id));
        setRelated(list.slice(0, 4));
      })
      .catch(err => console.log(err));

  }, [pkg]);

  if (loading) {
    return (
      <div className="container" style={{ padding: 80 }}>
        Loading package...
      </div>
    );
  }

if (!pkg) {
  return (
    <div
      className="container"
      style={{
        padding: "80px 20px",
        textAlign: "center",
        minHeight: "60vh",
      }}
    >
      <h2>No Package Found</h2>
      <p style={{ color: "#666", marginTop: "10px" }}>
        The package you are looking for does not exist or may have been removed.
      </p>
    </div>
  );
}

  return (
    <div className="package-page">
      <div
        style={{
          height: "500px",
          backgroundImage: `url(${pkg.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "80px",
            color: "#fff",
          }}
        >
          <h1>{pkg.title}</h1>
          <p>
            {pkg.duration} • {pkg.destination}
          </p>
        </div>
      </div>

      <div
        className="container"
        style={{ padding: 24, maxWidth: 1000 }}
      >
        {/* Image gallery */}
        {gallery.length > 0 && (
          <div style={{marginBottom:18}}>
            <div style={{display:'flex',gap:8,overflowX:'auto'}}>
              {gallery.map((src, idx) => (
                <div key={idx} style={{flex:'0 0 auto'}}>
                  <img
                    src={src}
                    alt={`gallery-${idx}`}
                    style={{width:160,height:100,objectFit:'cover',borderRadius:8,cursor:'pointer',boxShadow:'0 6px 18px rgba(2,38,35,0.06)'}}
                    onClick={() => setLightboxIndex(idx)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lightbox overlay */}
        {lightboxIndex >= 0 && (
          <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:9999}} onClick={() => setLightboxIndex(-1)}>
            <button style={{position:'absolute',left:20,top:20,fontSize:22,background:'transparent',color:'#fff',border:'none'}} onClick={(e)=>{e.stopPropagation(); setLightboxIndex(-1)}}>✕</button>
            <button style={{position:'absolute',left:20,top:'50%',transform:'translateY(-50%)',fontSize:28,background:'transparent',color:'#fff',border:'none'}} onClick={(e)=>{e.stopPropagation(); setLightboxIndex(i => (i-1+gallery.length)%gallery.length)}}>◀</button>
            <img src={gallery[lightboxIndex]} alt="lightbox" style={{maxWidth:'90%',maxHeight:'80%',borderRadius:8}} onClick={(e)=>e.stopPropagation()} />
            <button style={{position:'absolute',right:20,top:'50%',transform:'translateY(-50%)',fontSize:28,background:'transparent',color:'#fff',border:'none'}} onClick={(e)=>{e.stopPropagation(); setLightboxIndex(i => (i+1)%gallery.length)}}>▶</button>
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div className="muted">
            {pkg.duration} • {pkg.destination}
          </div>

          <div
            className="price"
            style={{
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            ₹{pkg.price?.toLocaleString()}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: 20,
            marginTop: 18,
          }}
        >
          <div>
            <h4>Overview</h4>
            <p className="muted">{pkg.description}</p>

            <h4 style={{ marginTop: 16 }}>Inclusions</h4>
            <ul>
              {pkg.inclusions?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h4 style={{ marginTop: 16 }}>Exclusions</h4>
            <ul>
              {pkg.exclusions?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h4 style={{ marginTop: 16 }}>Highlights</h4>
            <ul>
              {pkg.highlights?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h4 style={{ marginTop: 18 }}>Itinerary</h4>

            <div className="itinerary-list">
              {pkg.itinerary?.map((item, index) => (
                <ItineraryItem
                  key={index}
                  it={item}
                />
              ))}
            </div>
          </div>

          <aside
            style={{
              background: "#fff",
              padding: 18,
              borderRadius: 12,
              boxShadow:
                "0 8px 30px rgba(2,38,35,0.06)",
            }}
          >
            <h4>Book This Package</h4>

            <p className="muted">{pkg.duration}</p>

            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                margin: "12px 0",
              }}
            >
              ₹{pkg.price?.toLocaleString()}
            </div>

            <button className="btn btn-primary">
              Book Now
            </button>
          </aside>
        </div>
      </div>
      {/* Similar Packages */}
      {related.length > 0 && (
        <div className="container" style={{padding:'24px', maxWidth:1000}}>
          <h3 style={{marginTop:18}}>You May Also Like</h3>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16,marginTop:12}}>
            {related.map((r) => (
              <article key={r.slug || r.id} className="card" style={{borderRadius:10,overflow:'hidden'}}>
                <div style={{height:120,backgroundSize:'cover',backgroundPosition:'center',backgroundImage:`url(${r.image})`}} />
                <div style={{padding:12}}>
                  <h4 style={{margin:0}}>{r.title}</h4>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
                    <span className="muted">{r.duration}</span>
                    <strong className="price">₹{(r.price||0).toLocaleString()}</strong>
                  </div>
                  <div style={{marginTop:10,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <button className="btn btn-outline" onClick={() => window.location.href = `/package/${r.slug || r.id}`}>Explore</button>
                    <div style={{color:'#bfa24a',fontWeight:700}}>{(r.rating||0).toFixed(1)}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}