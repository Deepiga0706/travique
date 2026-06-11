import React, { useState } from 'react';
import Footer from '../Components/Footer';

const faqs = [
  {
    q: 'How do I book a package?',
    a: 'You can book a package directly on our website by browsing the packages, selecting your preferred option, and clicking "Book Now". Alternatively, contact our concierge team at mailtravique@gmail.com or call +91 98765 43210 and we will handle the entire process for you.'
  },
  {
    q: 'Can I customize my trip?',
    a: 'Absolutely! Every Travique package can be fully customized. You can adjust the duration, hotel category, activities, meals, and transport preferences. Use the "Customize Trip" option on any package page or reach out to our team directly for a bespoke itinerary.'
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept UPI, net banking, credit and debit cards (Visa, Mastercard, RuPay), and direct bank transfers. A minimum advance of 25% is required to confirm your booking, with the remaining balance due at least 15 days before departure.'
  },
  {
    q: 'What is the cancellation policy?',
    a: 'Cancellations 30+ days before departure receive a 90% refund. 15–29 days prior: 50% refund. 7–14 days prior: 25% refund. Within 7 days: no refund. All refunds are processed within 7–10 business days. Please refer to our Terms & Conditions page for full details.'
  },
  {
    q: 'Are flights included in the packages?',
    a: 'Flight inclusion depends on the specific package. Our international packages typically include return airfare, while domestic packages are usually land-only. The package details page clearly mentions whether flights are included. You can also request flight-inclusive pricing from our team.'
  },
  {
    q: 'Can I travel as part of a group?',
    a: 'Yes! We offer specially curated group tour packages with dedicated group coordinators. For private group bookings of 10 or more travellers, we provide customized pricing and exclusive itineraries. Contact us to discuss your group travel requirements.'
  },
  {
    q: 'How do I contact support?',
    a: 'Our support team is available Monday to Saturday, 9:00 AM – 7:00 PM IST. You can reach us by email at mailtravique@gmail.com, by phone at +91 98765 43210, or via the Contact Us page on our website. We typically respond to all queries within 24 hours.'
  },
];

function AccordionItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: '#fff',
      borderRadius: 12,
      marginBottom: 12,
      boxShadow: '0 4px 16px rgba(0,59,54,0.06)',
      border: '1px solid #ECEEEF',
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', padding: '18px 22px', background: 'none',
          border: 'none', cursor: 'pointer', textAlign: 'left', gap: 12,
        }}
      >
        <span style={{ fontWeight: 700, fontSize: '1rem', color: '#003B36' }}>{q}</span>
        <span style={{
          fontSize: 20, color: '#F5C400', fontWeight: 700, lineHeight: 1, flexShrink: 0,
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.25s ease',
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? 300 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.35s ease',
      }}>
        <p style={{ margin: 0, padding: '0 22px 20px', color: '#6B7280', lineHeight: 1.7, fontSize: '0.95rem' }}>
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh' }}>
      {/* Hero banner */}
      <div style={{ background: 'linear-gradient(135deg, #003B36, #005F5B)', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', margin: 0, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800 }}>Frequently Asked Questions</h1>
        <p style={{ color: 'rgba(255,255,255,0.78)', marginTop: 10, fontSize: '1rem' }}>
          Everything you need to know about booking with Travique
        </p>
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 20px' }}>
        {faqs.map((f, i) => <AccordionItem key={i} q={f.q} a={f.a} />)}

        <div style={{ textAlign: 'center', marginTop: 36, padding: '28px', background: '#fff', borderRadius: 14, boxShadow: '0 4px 16px rgba(0,59,54,0.06)', border: '1px solid #ECEEEF' }}>
          <p style={{ color: '#1F2937', fontWeight: 600, margin: '0 0 12px' }}>Still have questions?</p>
          <a href="/contact" style={{ background: '#003B36', color: '#fff', padding: '12px 28px', borderRadius: 40, fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>
            Contact Our Team
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
