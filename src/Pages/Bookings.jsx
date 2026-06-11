import React, { useEffect, useMemo, useState } from 'react';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';

import { getMyBookingsCombined } from '../services/customTrips';

function safeArray(v) {
  return Array.isArray(v) ? v : [];
}

function formatINR(amount) {
  const n = Number(amount || 0);
  try { return `₹${n.toLocaleString('en-IN')}`; }
  catch { return `₹${n}`; }
}

function shortId(id) {
  if (!id) return '—';
  const s = String(id);
  return s.length > 8 ? s.slice(0, 8) + '...' : s;
}

function StatusChip({ status }) {
  const s = (status || '').toLowerCase();
  let bg, color, label;
  if (s === 'confirmed' || s === 'accepted') {
    bg = 'rgba(22,163,74,0.10)'; color = '#15803d'; label = '✅ Confirmed';
  } else if (s.includes('cancel') || s === 'rejected') {
    bg = 'rgba(220,38,38,0.10)'; color = '#dc2626'; label = '❌ ' + (s === 'rejected' ? 'Rejected' : 'Cancelled');
  } else {
    bg = 'rgba(234,88,12,0.10)'; color = '#ea580c'; label = '⏳ ' + (status || 'Pending Review');
  }
  return (
    <span style={{ display:'inline-flex', alignItems:'center', padding:'5px 12px', borderRadius:999, background:bg, color, fontWeight:700, fontSize:'0.78rem', whiteSpace:'nowrap' }}>
      {label}
    </span>
  );
}

/* Unified card for both normal bookings and custom trips */
function BookingCard({ image, title, destination, date, travelers, idLabel, idValue, amount, status, isCustom, actionLink, actionLabel, badgeLabel }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        borderRadius: 18,
        border: '1px solid #ECEEEF',
        boxShadow: hovered ? '0 20px 48px rgba(0,59,54,0.14)' : '0 6px 24px rgba(0,59,54,0.07)',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all 0.25s ease',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Image */}
      <div style={{ position:'relative', flexShrink:0 }}>
        <img
          src={image || '/images/group_pic.jpg'}
          alt={title || 'Booking'}
          style={{ width:'100%', height:180, objectFit:'cover', display:'block' }}
          onError={(e) => { e.target.src = '/images/group_pic.jpg'; }}
        />
        {/* Type chip over image */}
        <span style={{
          position:'absolute', top:12, left:12,
          background: isCustom ? '#003B36' : '#F5C400',
          color: isCustom ? '#F5C400' : '#003B36',
          fontSize:'0.72rem', fontWeight:800, padding:'4px 10px',
          borderRadius:999, letterSpacing:'0.5px', textTransform:'uppercase',
        }}>
          {isCustom ? 'Custom Trip' : 'Package'}
        </span>
        {/* Amount badge */}
        {amount && !isCustom && (
          <span style={{
            position:'absolute', top:12, right:12,
            background:'rgba(0,0,0,0.55)', color:'#F5C400',
            fontSize:'0.85rem', fontWeight:800, padding:'4px 10px', borderRadius:999,
          }}>
            {amount}
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding:'18px 18px 14px', display:'flex', flexDirection:'column', flex:1, gap:10 }}>
        {/* Title */}
        <h3 style={{
          margin:0, fontSize:18, fontWeight:700, color:'#003B36', lineHeight:1.3,
          display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden',
        }}>
          {title || 'Booking'}
        </h3>

        {/* Status */}
        <div><StatusChip status={status} /></div>

        {/* Details */}
        <div style={{ display:'flex', flexDirection:'column', gap:7, marginTop:2 }}>
          {destination && (
            <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:'0.88rem', color:'#6B7280' }}>
              <span style={{ fontSize:14 }}>📍</span>
              <span>{destination}</span>
            </div>
          )}
          {date && (
            <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:'0.88rem', color:'#6B7280' }}>
              <span style={{ fontSize:14 }}>📅</span>
              <span>{date}</span>
            </div>
          )}
          {travelers != null && (
            <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:'0.88rem', color:'#6B7280' }}>
              <span style={{ fontSize:14 }}>👥</span>
              <span>{travelers} Traveler{travelers !== 1 ? 's' : ''}</span>
            </div>
          )}
          {idValue && (
            <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:'0.88rem', color:'#6B7280' }}>
              <span style={{ fontSize:14 }}>🧾</span>
              <span style={{ color:'#003B36', fontWeight:700, fontFamily:'monospace' }}>
                {idLabel}: {shortId(idValue)}
              </span>
            </div>
          )}
          {badgeLabel && (
            <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:'0.88rem' }}>
              <span style={{ fontSize:14 }}>✨</span>
              <span style={{ color:'#003B36', fontWeight:600 }}>{badgeLabel}</span>
            </div>
          )}
        </div>

        {/* Spacer pushes button to bottom */}
        <div style={{ flex:1 }} />

        {/* Action button — fixed at bottom */}
        <div style={{ marginTop:8 }}>
          <Link
            to={actionLink || '/'}
            style={{
              display:'block', textAlign:'center', textDecoration:'none',
              background:'#003B36', color:'#F5C400',
              padding:'10px 0', borderRadius:10, fontWeight:700, fontSize:'0.9rem',
              transition:'background 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background='#005F5B'}
            onMouseLeave={e => e.currentTarget.style.background='#003B36'}
          >
            {actionLabel || 'View Details'}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Bookings() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [normalBookings, setNormalBookings] = useState([]);
  const [customTrips, setCustomTrips] = useState([]);

  const title = useMemo(() => 'My Bookings', []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getMyBookingsCombined();
        if (!mounted) return;
        const payload = res.data || res;
        const bookings = safeArray(payload.bookings || payload.normalBookings || payload.regularBookings);
        const custom = safeArray(payload.customTrips || payload.custom_trip_requests || payload.customRequests);
        setNormalBookings(bookings);
        setCustomTrips(custom);
      } catch (e) {
        if (!mounted) return;
        try {
          const raw1 = localStorage.getItem('travique_my_bookings');
          const raw2 = localStorage.getItem('travique_bookings');
          const local = raw1 ? JSON.parse(raw1) : raw2 ? JSON.parse(raw2) : [];
          setNormalBookings(safeArray(local));
          setCustomTrips([]);
        } catch {
          setErr(e?.response?.data?.message || 'Failed to load bookings');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const visibleCustom = useMemo(() => {
    return customTrips.filter((t) => {
      const s = t?.status;
      if (!s) return true;
      return !['Cancelled', 'Rejected'].includes(s);
    });
  }, [customTrips]);

  const allCount = (normalBookings?.length || 0) + (visibleCustom?.length || 0);

  /* ── Loading ── */
  if (loading) {
    return (
      <div style={{ background:'#F8F9FA', minHeight:'100vh' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'80px 20px' }}>
          <h2 style={{ color:'#003B36' }}>{title}</h2>
          <p style={{ color:'#6B7280', marginTop:8 }}>Loading your bookings...</p>
        </div>
        <Footer />
      </div>
    );
  }

  /* ── Empty ── */
  if (!allCount && !err) {
    return (
      <div style={{ background:'#F8F9FA', minHeight:'100vh' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'80px 20px' }}>
          <h2 style={{ color:'#003B36' }}>{title}</h2>
          <div style={{ marginTop:40, textAlign:'center', background:'#fff', borderRadius:18, padding:'60px 24px', border:'1px solid #ECEEEF', boxShadow:'0 6px 24px rgba(0,59,54,0.06)' }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🧳</div>
            <h3 style={{ color:'#003B36', margin:'0 0 8px' }}>No bookings yet</h3>
            <p style={{ color:'#6B7280', marginBottom:24 }}>Book your next trip with Travique and see it here.</p>
            <Link to="/" style={{ background:'#003B36', color:'#F5C400', padding:'12px 28px', borderRadius:40, fontWeight:700, textDecoration:'none', fontSize:'0.95rem' }}>
              Explore Packages
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  /* ── Main ── */
  return (
    <div style={{ background:'#F8F9FA', minHeight:'100vh' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'60px 20px 80px' }}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'baseline', gap:14, marginBottom:32 }}>
          <h2 style={{ color:'#003B36', margin:0, fontSize:'clamp(1.6rem,3vw,2rem)', fontWeight:800 }}>{title}</h2>
          <span style={{ background:'#F5C400', color:'#003B36', fontWeight:800, fontSize:'0.8rem', padding:'3px 12px', borderRadius:999 }}>
            {allCount} {allCount === 1 ? 'booking' : 'bookings'}
          </span>
        </div>

        {/* Error */}
        {err && (
          <div style={{ background:'#fee2e2', color:'#991b1b', padding:'12px 16px', borderRadius:12, marginBottom:24, fontWeight:600 }}>
            {err}
          </div>
        )}

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))', gap:24 }}>

          {/* Normal bookings */}
          {normalBookings.map((b, idx) => (
            <BookingCard
              key={b.bookingId || b._id || idx}
              image={b.packageImage}
              title={b.packageTitle}
              destination={b.destination || b.packageTitle}
              date={b.travelDate ? new Date(b.travelDate).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }) : null}
              travelers={b.numberOfTravelers}
              idLabel="Booking ID"
              idValue={b.bookingId || b._id}
              amount={b.totalAmount ? formatINR(b.totalAmount) : null}
              status={b.status || 'confirmed'}
              isCustom={false}
              actionLink="/"
              actionLabel="Browse More"
            />
          ))}

          {/* Custom trips */}
          {visibleCustom.map((t, idx) => (
            <BookingCard
              key={t._id || t.customTripId || idx}
              image={t.packageImage || t.coverImage || t.thumbnail || '/images/group_pic.jpg'}
              title={`Custom Trip — ${t.destination || 'Your Destination'}`}
              destination={t.destination}
              date={t.travelDate ? new Date(t.travelDate).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }) : null}
              travelers={t.numberOfTravelers}
              idLabel="Request ID"
              idValue={t._id}
              amount={null}
              status={t.status || 'Pending Review'}
              isCustom={true}
              badgeLabel={t.budgetRange ? `Budget: ${t.budgetRange}` : null}
              actionLink={`/custom-trip/${t._id}`}
              actionLabel="View Details"
            />
          ))}

        </div>
      </div>
      <Footer />
    </div>
  );
}
