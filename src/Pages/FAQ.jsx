import React from 'react';

const faqs = [
  { q: 'How do I book a package?', a: 'You can book by contacting our concierge or using the booking form. We handle all logistics for you.' },
  { q: 'Can you customise itineraries?', a: 'Yes — every trip is tailored to your preferences, budget and travel dates.' },
  { q: 'What is your cancellation policy?', a: 'Cancellation terms vary by package; we provide clear policies at time of booking.' }
];

export default function FAQ() {
  return (
    <div className="page faq-page">
      <div className="container" style={{padding:'80px 20px'}}>
        <h1>Frequently Asked Questions</h1>
        <div style={{marginTop:24}}>
          {faqs.map((f, i) => (
            <details key={i} style={{marginBottom:12}}>
              <summary style={{fontWeight:700}}>{f.q}</summary>
              <p style={{marginTop:8}}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
