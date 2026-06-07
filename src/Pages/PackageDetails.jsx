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
    </div>
  );
}