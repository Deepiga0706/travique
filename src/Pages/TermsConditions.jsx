import React, { useState } from 'react';
import Footer from '../Components/Footer';

const sections = [
  {
    title: 'Booking & Reservation Terms',
    content: `All bookings made through Travique are subject to availability and confirmation. A booking is considered confirmed only upon receipt of a written confirmation from Travique along with the required advance payment. By completing a booking, you agree to these Terms & Conditions in full. Bookings made on behalf of a group are the responsibility of the lead traveller.`
  },
  {
    title: 'Payment Policy',
    content: `A minimum advance payment of 25% of the total package cost is required to confirm your booking. The remaining balance must be settled at least 15 days prior to the departure date. For bookings made within 15 days of departure, full payment is required at the time of booking. Travique accepts payments via UPI, net banking, credit/debit cards, and bank transfers.`
  },
  {
    title: 'Cancellation & Refund Policy',
    content: `Cancellations made 30 or more days before departure: 90% refund. Cancellations made 15–29 days before departure: 50% refund. Cancellations made 7–14 days before departure: 25% refund. Cancellations within 7 days of departure: No refund. Refunds are processed within 7–10 business days to the original payment method. No-shows are treated as last-minute cancellations with no refund.`
  },
  {
    title: 'Travel Responsibilities',
    content: `Travellers are responsible for ensuring their travel documents including passports, visas, and health certificates are valid and up to date. Travique is not liable for any losses arising from incorrect or expired documentation. Travellers must adhere to the laws and customs of the destination country. Travel insurance is strongly recommended for all bookings.`
  },
  {
    title: 'Package Changes & Availability',
    content: `Travique reserves the right to make minor changes to itineraries, hotel allocations, or routing when necessary due to operational, safety, or availability reasons. In the event of a significant change, travellers will be notified promptly and offered either an alternative arrangement of equivalent standard or a full refund. Package prices are subject to change without notice until confirmed in writing.`
  },
  {
    title: 'Liability Disclaimer',
    content: `Travique acts as an agent for hotels, airlines, transport operators, and other service providers. We are not liable for any injury, damage, loss, delay, or expense arising from acts of third-party suppliers, natural disasters, government actions, strikes, or any circumstance beyond our reasonable control. Our total liability to any traveller shall not exceed the total cost paid for the relevant package.`
  },
  {
    title: 'Contact Information',
    content: `For any queries regarding these Terms & Conditions, please reach out to us at mailtravique@gmail.com or call +91 98765 43210. Our office is located in Mumbai, India. Our customer support team is available Monday to Saturday, 9:00 AM to 7:00 PM IST.`
  },
];

function AccordionItem({ title, content }) {
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
        <span style={{ fontWeight: 700, fontSize: '1rem', color: '#003B36' }}>{title}</span>
        <span style={{
          fontSize: 20, color: '#F5C400', fontWeight: 700, lineHeight: 1,
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.25s ease', flexShrink: 0,
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? 400 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.35s ease',
      }}>
        <p style={{ margin: 0, padding: '0 22px 20px', color: '#6B7280', lineHeight: 1.7, fontSize: '0.95rem' }}>
          {content}
        </p>
      </div>
    </div>
  );
}

export default function TermsConditions() {
  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh' }}>
      {/* Hero banner */}
      <div style={{ background: 'linear-gradient(135deg, #003B36, #005F5B)', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', margin: 0, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800 }}>Terms & Conditions</h1>
        <p style={{ color: 'rgba(255,255,255,0.78)', marginTop: 10, fontSize: '1rem' }}>
          Last updated: January 2026 · Travique Premium Private Ltd.
        </p>
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 20px' }}>
        <p style={{ color: '#6B7280', lineHeight: 1.7, marginBottom: 32, fontSize: '0.97rem' }}>
          Please read these Terms & Conditions carefully before booking any travel package with Travique. By using our services, you agree to be bound by these terms.
        </p>
        {sections.map((s, i) => <AccordionItem key={i} title={s.title} content={s.content} />)}
      </div>

      <Footer />
    </div>
  );
}
