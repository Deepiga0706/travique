import React, { useState } from 'react';
import Footer from '../Components/Footer';

const sections = [
  {
    title: 'Information We Collect',
    content: `We collect information you provide directly when you make a booking, create an account, or contact us. This includes your full name, email address, phone number, travel dates, and payment details. We also collect technical data such as your IP address, browser type, and pages visited when you use our website.`
  },
  {
    title: 'How We Use Your Information',
    content: `Your information is used to process bookings and reservations, send booking confirmations and travel updates, personalise your travel experience, respond to customer support queries, send newsletters and promotional offers (only with your consent), and improve our website and service quality.`
  },
  {
    title: 'Data Security',
    content: `We implement industry-standard security measures including SSL encryption, secure servers, and restricted access controls to protect your personal data. While we take every reasonable precaution, no method of transmission over the internet is 100% secure. We encourage you to use strong passwords and to log out after using shared devices.`
  },
  {
    title: 'Cookies & Analytics',
    content: `Travique uses cookies to enhance your browsing experience, remember your preferences, and analyse site traffic. We use analytics tools such as Google Analytics to understand how visitors interact with our site. You may disable cookies through your browser settings; however, some features of the site may not function correctly without them.`
  },
  {
    title: 'Third-Party Services',
    content: `We may share your information with trusted third-party partners including payment processors, hotel and airline providers, and travel insurance companies — solely to fulfil your booking. These partners are bound by their own privacy policies and are not permitted to use your data for any other purpose. We do not sell your personal information to any third party.`
  },
  {
    title: 'Contact Information',
    content: `If you have any questions or concerns regarding this Privacy Policy, please contact us at mailtravique@gmail.com or call +91 98765 43210. You may also write to us at Travique Premium Private Ltd., Mumbai, India. We will respond to all privacy-related queries within 5 business days.`
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

export default function PrivacyPolicy() {
  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh' }}>
      {/* Hero banner */}
      <div style={{ background: 'linear-gradient(135deg, #003B36, #005F5B)', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', margin: 0, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800 }}>Privacy Policy</h1>
        <p style={{ color: 'rgba(255,255,255,0.78)', marginTop: 10, fontSize: '1rem' }}>
          Last updated: January 2026 · Travique Premium Private Ltd.
        </p>
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 20px' }}>
        <p style={{ color: '#6B7280', lineHeight: 1.7, marginBottom: 32, fontSize: '0.97rem' }}>
          At Travique, your privacy is our priority. This policy explains how we collect, use, and protect your personal information when you use our website and services.
        </p>
        {sections.map((s, i) => <AccordionItem key={i} title={s.title} content={s.content} />)}
      </div>

      <Footer />
    </div>
  );
}
