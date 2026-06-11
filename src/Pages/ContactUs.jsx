import React from 'react';
import Footer from '../Components/Footer';

import '../styles/ContactUs.css';

export default function ContactUs() {
  return (
    <div className="page contact-page">
      <div className="container contact-container">
        <div className="contact-hero">
          <h1 className="contact-title">Contact Travique</h1>
          <p className="contact-subtitle">
            Reach our concierge team for bespoke itineraries and enquiries.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h3 className="contact-section-title">Contact Information</h3>
            <p>
              Email:{' '}
              <a className="contact-link" href="mailto:mailtravique@gmail.com">
                mailtravique@gmail.com
              </a>
            </p>
            <p>Phone: +91 98765 43210</p>
            <p>Address: Mumbai, India</p>
          </div>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <label className="contact-label">Name</label>
            <input className="contact-input" />

            <label className="contact-label">Email</label>
            <input className="contact-input" />

            <label className="contact-label">Message</label>
            <textarea className="contact-textarea" />

            <button className="btn btn-primary contact-submit" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

