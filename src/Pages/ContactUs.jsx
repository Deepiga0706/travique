import React, { useState } from 'react';
import Footer from '../Components/Footer';
import '../styles/ContactUs.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim())            e.name    = 'Please enter your name.';
    if (!form.email.trim())           e.email   = 'Please enter your email address.';
    else if (!EMAIL_RE.test(form.email.trim())) e.email = 'Please enter a valid email address.';
    if (!form.message.trim())         e.message = 'Please enter your message.';
    return e;
  }

  function handleChange(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
    setSuccess(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    setTimeout(() => {
      // Store in localStorage for demo
      const existing = JSON.parse(localStorage.getItem('travique_contact_messages') || '[]');
      existing.push({ ...form, submittedAt: new Date().toISOString() });
      localStorage.setItem('travique_contact_messages', JSON.stringify(existing));

      setForm(f => ({ ...f, message: '' }));
      setErrors({});
      setSubmitting(false);
      setSuccess(true);
    }, 1000);
  }

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

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {/* Success toast */}
            {success && (
              <div style={{ background: '#d1fae5', color: '#065f46', border: '1px solid #6ee7b7', borderRadius: 10, padding: '14px 18px', marginBottom: 16, fontWeight: 600, fontSize: '0.95rem', lineHeight: 1.5 }}>
                ✅ Thank you for contacting Travique!<br />
                <span style={{ fontWeight: 400 }}>Our team will get back to you shortly.</span>
              </div>
            )}

            <label className="contact-label">Name</label>
            <input
              className="contact-input"
              value={form.name}
              onChange={e => handleChange('name', e.target.value)}
              placeholder="Your full name"
              style={errors.name ? { borderColor: '#dc2626' } : undefined}
            />
            {errors.name && <span style={{ color: '#dc2626', fontSize: '0.82rem', marginTop: -6, marginBottom: 4, display: 'block' }}>{errors.name}</span>}

            <label className="contact-label">Email</label>
            <input
              className="contact-input"
              type="email"
              value={form.email}
              onChange={e => handleChange('email', e.target.value)}
              placeholder="you@example.com"
              style={errors.email ? { borderColor: '#dc2626' } : undefined}
            />
            {errors.email && <span style={{ color: '#dc2626', fontSize: '0.82rem', marginTop: -6, marginBottom: 4, display: 'block' }}>{errors.email}</span>}

            <label className="contact-label">Message</label>
            <textarea
              className="contact-textarea"
              value={form.message}
              onChange={e => handleChange('message', e.target.value)}
              placeholder="How can we help you?"
              style={errors.message ? { borderColor: '#dc2626' } : undefined}
            />
            {errors.message && <span style={{ color: '#dc2626', fontSize: '0.82rem', marginTop: -6, marginBottom: 4, display: 'block' }}>{errors.message}</span>}

            <button
              className="btn btn-primary contact-submit"
              type="submit"
              disabled={submitting}
              style={{ opacity: submitting ? 0.75 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
