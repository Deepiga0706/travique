import React, { useEffect, useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import Footer from "../Components/Footer";
import "../styles/bookingNow.css";

function formatINR(amount) {
  const n = typeof amount === "number" ? amount : Number(amount || 0);
  return `₹${n.toLocaleString("en-IN")}`;
}

function generateBookingId() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // avoid confusing I/O
  const digits = "0123456789";
  const rand = (chars) => chars[Math.floor(Math.random() * chars.length)];

  // Example: TVQ-7G4K-19283
  return `TVQ-${rand(alphabet)}${rand(alphabet)}${rand(digits)}${rand(alphabet)}-${
    Math.floor(10000 + Math.random() * 89999)
  }`;
}

export default function BookingNow() {
  const location = useLocation();
  const pkg = location?.state?.pkg;

  const [travelDate, setTravelDate] = useState("");
  const [travelers, setTravelers] = useState(2);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const [confirmed, setConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("");

  useEffect(() => {
    // Reset success state when package changes
    setConfirmed(false);
    setBookingId("");
  }, [pkg]);

  const packagePrice = useMemo(() => {
    if (!pkg) return 0;
    return Number(pkg.price || 0);
  }, [pkg]);

  const totalCost = useMemo(() => {
    const count = Number(travelers || 0);
    return packagePrice * count;
  }, [packagePrice, travelers]);

  const isValidEmail = (v) => {
    if (!v) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());
  };

  const canConfirm = useMemo(() => {
    if (!pkg) return false;
    const t = Number(travelers || 0);
    return (
      travelDate &&
      t >= 1 &&
      fullName.trim().length >= 2 &&
      isValidEmail(email) &&
      phone.trim().length >= 7
    );
  }, [pkg, travelDate, travelers, fullName, email, phone]);

  const packageImage = pkg ? (pkg.image || pkg.images?.[0] || pkg.gallery?.[0] || "") : "";

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!canConfirm) return;

    const id = generateBookingId();

    // ── MongoDB save ──────────────────────────────────────────────
    try {
      const user = JSON.parse(localStorage.getItem("travique_current_user") || "null") || null;
      await axios.post("http://localhost:5000/api/bookings", {
        packageId:      pkg._id || pkg.id || pkg.slug || "",
        packageName:    pkg.title || "",
        customerName:   fullName.trim(),
        email:          email.trim().toLowerCase(),
        mobile:         phone.trim(),
        travelDate,
        adults:         Number(travelers || 1),
        totalPrice:     Number(totalCost || 0),
        specialRequest: specialRequests || "",
        userId:         user?._id || user?.id || undefined,
        packageImage:   packageImage || "",
      });
    } catch (err) {
      // Log but do not block — localStorage fallback keeps demo working
      console.error("MongoDB booking save failed:", err);
    }

    // ── localStorage (unchanged) ──────────────────────────────────
    try {
      const existing = JSON.parse(localStorage.getItem("travique_bookings") || "[]") || [];
      const user = JSON.parse(localStorage.getItem("travique_current_user") || "null") || null;

      const bookingRecord = {
        bookingId: id,
        packageTitle: pkg?.title,
        packageImage,
        destination: pkg?.destination,
        duration: pkg?.duration,
        price: packagePrice,
        numberOfTravelers: Number(travelers || 0),
        totalAmount: Number(totalCost || 0),
        travelDate,
        bookingDate: new Date().toISOString(),
        userDetails: {
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
        },
        customerEmail: email.trim().toLowerCase(),
        userEmail: user?.email ? String(user.email).toLowerCase() : undefined,
        status: "confirmed",
        specialRequests: specialRequests || undefined,
      };

      const next = Array.isArray(existing) ? [bookingRecord, ...existing] : [bookingRecord];
      localStorage.setItem("travique_bookings", JSON.stringify(next));
      localStorage.setItem("travique_my_bookings", JSON.stringify(next));
    } catch (err) {
      console.log("Booking persistence failed:", err);
    }

    setBookingId(id);
    setConfirmed(true);
  };

  if (!pkg) {
    return (
      <div className="booking-page">
        <div className="container">
          <div className="booking-card">
            <h2 className="booking-title">No booking package selected</h2>
            <p className="booking-muted">
              Please return to a package details page and click <strong>Book Now</strong>.
            </p>
            <Link to="/" className="btn btn-outline booking-link-btn">
              Go to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="container booking-container">
        <header className="booking-header">
          <div className="booking-header-text">
            <h1 className="booking-h1">Book Your Package</h1>
            <p className="booking-muted">Secure your travel with Travique.</p>
          </div>
        </header>

        <div className="booking-grid">
          <section className="booking-form-card" aria-label="Booking form">
            <div className="booking-form-top">
              <img
                className="booking-package-img"
                src={packageImage}
                alt={pkg.title || "Package"}
              />
              <div className="booking-package-meta">
                <h2 className="booking-package-name">{pkg.title}</h2>
                <div className="booking-meta-row">
                  <span className="booking-meta-label">Destination</span>
                  <span className="booking-meta-value">{pkg.destination}</span>
                </div>
                <div className="booking-meta-row">
                  <span className="booking-meta-label">Duration</span>
                  <span className="booking-meta-value">{pkg.duration}</span>
                </div>
                <div className="booking-meta-row">
                  <span className="booking-meta-label">Price</span>
                  <span className="booking-meta-value booking-price">{formatINR(pkg.price)}</span>
                </div>
              </div>
            </div>

            {!confirmed ? (
              <form className="booking-form" onSubmit={handleConfirm}>
                <div className="booking-row">
                  <div className="booking-field">
                    <label htmlFor="travelDate">Travel date</label>
                    <input
                      id="travelDate"
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="booking-field">
                    <label htmlFor="travelers">Number of travelers</label>
                    <input
                      id="travelers"
                      type="number"
                      min={1}
                      value={travelers}
                      onChange={(e) => setTravelers(Math.max(1, Number(e.target.value || 1)))}
                      required
                    />
                  </div>
                </div>

                <div className="booking-row">
                  <div className="booking-field booking-field-full">
                    <label htmlFor="fullName">Full name</label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="booking-row">
                  <div className="booking-field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="booking-field">
                    <label htmlFor="phone">Phone number</label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="Mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="booking-row">
                  <div className="booking-field booking-field-full">
                    <label htmlFor="specialRequests">
                      Special requests <span className="booking-optional">(optional)</span>
                    </label>
                    <textarea
                      id="specialRequests"
                      rows={4}
                      placeholder="Any dietary preferences, hotel room requests, accessibility needs, etc."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                    />
                  </div>
                </div>

                <div className="booking-actions">
                  <button className="btn btn-primary booking-confirm-btn" type="submit" disabled={!canConfirm}>
                    Confirm Booking
                  </button>
                </div>

                <div className="booking-hint">
                  By confirming, you agree to Travique’s booking terms.
                </div>
              </form>
            ) : (
              <div className="booking-success" role="status" aria-live="polite">
                <div className="booking-success-icon" aria-hidden="true">✓</div>
                <h2 className="booking-success-title">Booking confirmed!</h2>
                <p className="booking-muted booking-success-text">
                  Your request has been received. Our team will contact you shortly.
                </p>
                <div className="booking-success-id">
                  <div className="booking-success-id-label">Booking ID</div>
                  <div className="booking-success-id-value">{bookingId}</div>
                </div>
                <div className="booking-success-actions">
                  <Link to="/bookings" className="btn btn-outline booking-link-btn">
                    View Bookings
                  </Link>
                  <Link to="/" className="btn btn-primary booking-confirm-btn">
                    Book Another Trip
                  </Link>
                </div>
              </div>
            )}
          </section>

          <aside className="booking-summary" aria-label="Booking summary">
            <h3 className="booking-summary-title">Booking Summary</h3>

            <div className="summary-box">
              <div className="summary-line">
                <span>Travel date</span>
                <strong>{travelDate || "—"}</strong>
              </div>
              <div className="summary-line">
                <span>Travelers</span>
                <strong>{travelers}</strong>
              </div>
              <div className="summary-line">
                <span>Package price</span>
                <strong>{formatINR(packagePrice)}</strong>
              </div>
              <div className="summary-divider" />
              <div className="summary-total">
                <span>Total cost</span>
                <strong>{formatINR(totalCost)}</strong>
              </div>
            </div>

            <div className="booking-summary-footer">
              <div className="summary-badge">Secure checkout</div>
              <div className="booking-summary-small">
                Total updates automatically as you change travelers.
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}

