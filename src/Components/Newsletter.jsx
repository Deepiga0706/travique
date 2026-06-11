import React, { useState, useEffect } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Auto-dismiss success toast after 5 seconds
  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => setSuccess(false), 5000);
    return () => clearTimeout(t);
  }, [success]);

  function handleSubscribe(e) {
    e.preventDefault();
    setError('');
    if (!email.trim() || !EMAIL_RE.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setEmail('');
    setSuccess(true);
  }

  return (
    <section className="newsletter container">
      <div className="newsletter-card">
        <div>
          <h3>Join Travique Newsletter</h3>
          <p className="muted">Get exclusive luxury travel deals and curated itineraries.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
          <form onSubmit={handleSubscribe} className="newsletter-form" noValidate>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); setSuccess(false); }}
              placeholder="Your email address"
            />
            <button className="btn btn-primary" type="submit">Subscribe</button>
          </form>

          {error && (
            <p style={{ margin: 0, color: '#dc2626', fontSize: '0.85rem', paddingLeft: 2 }}>
              {error}
            </p>
          )}

          {success && (
            <p style={{ margin: 0, color: '#065f46', background: '#d1fae5', padding: '10px 14px', borderRadius: 8, fontSize: '0.9rem', fontWeight: 600 }}>
              🎉 Thank you for subscribing! You'll receive exclusive travel deals and destination updates.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
