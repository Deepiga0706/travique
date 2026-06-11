import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createCustomTrip } from '../services/customTrips';

import '../styles/customizeTrip.css';


const travelInterestOptions = [
  'Beach',
  'Adventure',
  'Honeymoon',
  'Family',
  'Wildlife',
  'Cultural',
  'Spiritual',
];

export default function CustomizeTrip() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    destination: '',
    travelDate: '',
    numberOfTravelers: '',
    budgetRange: '',
    accommodationPreference: '',
    travelInterests: [],
    modeOfTravel: '',
    additionalRequirements: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const titleId = useMemo(() => 'customizeTripTitle', []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleInterest = (interest) => {
    setForm((prev) => {
      const exists = prev.travelInterests.includes(interest);
      const next = exists
        ? prev.travelInterests.filter((i) => i !== interest)
        : [...prev.travelInterests, interest];
      return { ...prev, travelInterests: next };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // token is added by getAuthHeaders() in the api service

    const currentUser = (() => {
      try {
        return JSON.parse(localStorage.getItem('travique_current_user') || 'null');
      } catch {
        return null;
      }
    })();

    const payload = {
      userId: currentUser?._id || currentUser?.id || undefined,
      fullName: form.fullName,
      email: form.email,
      phoneNumber: form.phoneNumber,
      destination: form.destination,
      travelDate: form.travelDate,
      numberOfTravelers: form.numberOfTravelers,
      budgetRange: form.budgetRange,
      accommodationPreference: form.accommodationPreference,
      travelInterests: form.travelInterests,
      modeOfTravel: form.modeOfTravel,
      additionalRequirements: form.additionalRequirements,
      status: 'Pending Review',
    };

    try {
      await createCustomTrip(payload);
      setSubmitted(true);
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to submit custom trip request. Please try again.');
    }
  };


  if (submitted) {
    return (
      <div className="customize-page">
        <div className="customize-wrap">
          <section className="customize-hero" aria-labelledby={titleId}>
            <div className="customize-hero-inner">

              <div className="customize-hero-icon" aria-hidden="true">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C15.866 2 19 5.134 19 9C19 13 16 16 12 22C8 16 5 13 5 9C5 5.134 8.134 2 12 2Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.5 9.2C9.5 7.7 10.5 6.8 12 6.8C13.5 6.8 14.5 7.7 14.5 9.2C14.5 10.7 13.5 11.6 12 11.6C10.5 11.6 9.5 10.7 9.5 9.2Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
              </div>

              <div className="customize-hero-copy">
                <h1 id={titleId}>Customize Your Dream Vacation</h1>
                <p>
                  Thank you! Our travel experts will contact you shortly.
                </p>
                <div style={{ marginTop: 18, textAlign: 'center' }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => navigate('/bookings')}
                  >
                    View in My Bookings
                  </button>
                </div>

              </div>

              <div className="customize-back">
                <Link className="customize-link" to="/">
                  Back to Home
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="customize-page">
      <div className="customize-wrap">
        <section className="customize-hero" aria-labelledby={titleId}>
          <div className="customize-hero-inner">
            <div className="customize-hero-icon" aria-hidden="true">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2C15.866 2 19 5.134 19 9C19 13 16 16 12 22C8 16 5 13 5 9C5 5.134 8.134 2 12 2Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.5 9.2C9.5 7.7 10.5 6.8 12 6.8C13.5 6.8 14.5 7.7 14.5 9.2C14.5 10.7 13.5 11.6 12 11.6C10.5 11.6 9.5 10.7 9.5 9.2Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            </div>

            <div className="customize-hero-copy">
              <h1 id={titleId}>Customize Your Dream Vacation</h1>
              <p>
                Can't find the perfect package? Tell us your destination, budget, travel dates, and preferences, and we'll create a personalized itinerary just for you.
              </p>
            </div>
          </div>
        </section>

        <section className="customize-form-section">
          <div className="customize-card">
            <h2 className="customize-form-title">Tell us your trip details</h2>

            <form className="customize-form" onSubmit={onSubmit}>
              <div className="customize-grid">
                <label className="field">
                  <span>Full Name</span>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={onChange}
                    required
                    placeholder="Your full name"
                  />
                </label>

                <label className="field">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    required
                    placeholder="you@example.com"
                  />
                </label>

                <label className="field">
                  <span>Phone Number</span>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={onChange}
                    required
                    placeholder="Enter phone number"
                  />
                </label>

                <label className="field">
                  <span>Destination</span>
                  <input
                    type="text"
                    name="destination"
                    value={form.destination}
                    onChange={onChange}
                    required
                    placeholder="e.g., Maldives, Switzerland"
                  />
                </label>

                <label className="field">
                  <span>Travel Date</span>
                  <input
                    type="date"
                    name="travelDate"
                    value={form.travelDate}
                    onChange={onChange}
                    required
                  />
                </label>

                <label className="field">
                  <span>Number of Travelers</span>
                  <input
                    type="number"
                    name="numberOfTravelers"
                    value={form.numberOfTravelers}
                    onChange={onChange}
                    required
                    min={1}
                    placeholder="1"
                  />
                </label>

                <label className="field">
                  <span>Budget Range</span>
                  <select
                    name="budgetRange"
                    value={form.budgetRange}
                    onChange={onChange}
                    required
                  >
                    <option value="">Select budget</option>
                    <option value="Budget">Budget</option>
                    <option value="Mid-range">Mid-range</option>
                    <option value="Premium">Premium</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </label>

                <label className="field">
                  <span>Accommodation Preference</span>
                  <select
                    name="accommodationPreference"
                    value={form.accommodationPreference}
                    onChange={onChange}
                    required
                  >
                    <option value="">Select preference</option>
                    <option value="3★">3★</option>
                    <option value="4★">4★</option>
                    <option value="5★">5★</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </label>

                <div className="field field-interests">
                  <span>Travel Interests</span>
                  <div className="chips">
                    {travelInterestOptions.map((interest) => {
                      const active = form.travelInterests.includes(interest);
                      return (
                        <button
                          key={interest}
                          type="button"
                          className={`chip ${active ? 'active' : ''}`}
                          onClick={() => toggleInterest(interest)}
                        >
                          {interest}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label className="field">
                  <span>mode of travel</span>
                  <select
                    name="modeOfTravel"
                    value={form.modeOfTravel}
                    onChange={onChange}
                    required
                  >
                    <option value="">Select mode</option>
                    <option value="Flight">Flight</option>
                    <option value="Train">Train</option>
                    <option value="Road trip">Road trip</option>
                    <option value="Cruise">Cruise</option>
                    <option value="Mixed">Mixed</option>
                  </select>
                </label>

                <label className="field field-full">
                  <span>Additional Requirements</span>
                  <textarea
                    name="additionalRequirements"
                    value={form.additionalRequirements}
                    onChange={onChange}
                    placeholder="Any special requests, celebrations, accessibility needs, etc."
                    rows={4}
                  />
                </label>
              </div>

              <div className="customize-submit-row">
                <button className="btn btn-primary customize-submit" type="submit">
                  ✨ Create My Custom Trip
                </button>
              </div>

              <p className="customize-note">
                Submit this form and our team will build a personalized itinerary tailored to your preferences.
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

