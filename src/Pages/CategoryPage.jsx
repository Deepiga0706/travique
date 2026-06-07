import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CategoryPage({slug, title}){
  const navigate = useNavigate();
   const [packages, setPackages] = useState([]);
useEffect(() => {

  axios
    .get("http://localhost:5000/api/packages")
    .then((res) => {
      setPackages(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

}, []);
const items = slug
  ? packages.filter(p => p.category === slug)
  : packages;
  console.log("Packages:", packages);
console.log("Items:", items);
  return (
    <section className="container category-page" style={{padding:'60px 20px'}}>
      <h2 className="section-title">{title}</h2>
      <p className="muted">Explore curated packages in this category.</p>

      <div className="grid" style={{marginTop:18}}>
        {items.map((p) => (
  <article
    key={p.slug}
    className="card"
    style={{
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(2,38,35,0.06)"
    }}
  >
    <div
      style={{
        height: 180,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${p.image})`
      }}
    />

    <div style={{ padding: 16 }}>
      <h3>{p.title}</h3>

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
          ₹{p.price.toLocaleString()}
        </strong>
      </div>

      <p className="muted" style={{ marginTop: 10 }}>
        {p.description}
      </p>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button
          className="btn btn-outline"
          onClick={() => navigate(`/package/${p.slug}`)}
        >
          View Details
        </button>

        <button
          className="btn btn-primary"
          onClick={() => alert("Booking flow placeholder")}
        >
          Book Now
        </button>
      </div>
    </div>
  </article>
))}
      </div>
    </section>
  )
}
