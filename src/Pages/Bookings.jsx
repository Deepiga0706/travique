import React, { useEffect, useMemo, useState } from 'react';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import StatusBadge from '../Components/StatusBadge';
import { getMyBookingsCombined } from '../services/customTrips';

function safeArray(v) {
  return Array.isArray(v) ? v : [];
}

function formatINR(amount) {
  const n = Number(amount || 0);
  try {
    return `₹${n.toLocaleString('en-IN')}`;
  } catch {
    return `₹${n}`;
  }
}

function Badge({ children }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px 10px',
        borderRadius: 999,
        border: '1px solid rgba(0,95,91,0.18)',
        background: 'rgba(0,95,91,0.06)',
        color: 'var(--primary)',
        fontWeight: 900,
        fontSize: '0.82rem',
      }}
    >
      {children}
    </span>
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

        // Backward compatible fallback: keep existing localStorage behavior.
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
    return () => {
      mounted = false;
    };
  }, []);

  const visibleCustom = useMemo(() => {
    // Keep custom trips visible until completed/confirmed(=Accepted), cancelled or rejected.
    // Requirement: remain visible until completed/cancelled/rejected.
    return customTrips.filter((t) => {
      const s = t?.status;
      if (!s) return true;
      return !['Cancelled', 'Rejected'].includes(s);
    });
  }, [customTrips]);

  const allCount = (normalBookings?.length || 0) + (visibleCustom?.length || 0);

  if (loading) {
    return (
      <div className="page" style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
        <div className="container" style={{ padding: '80px 20px' }}>
          <h2 style={{ color: 'var(--primary)' }}>{title}</h2>
          <p className="muted">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!allCount && !err) {
    return (
      <div className="page" style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
        <div className="container" style={{ padding: '80px 20px' }}>
          <h2 style={{ color: 'var(--primary)' }}>{title}</h2>
          <p className="muted">You currently have no bookings. Book your next trip with Travique.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page" style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
      <div className="container" style={{ padding: '80px 20px' }}>
        <h2 style={{ color: 'var(--primary)' }}>{title}</h2>

        {err ? (
          <div
            style={{
              marginTop: 10,
              background: '#fee2e2',
              color: '#991b1b',
              padding: 12,
              borderRadius: 12,
              fontWeight: 700,
            }}
          >
            {err}
          </div>
        ) : null}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16,
            marginTop: 18,
          }}
        >
          {/* Regular bookings */}
          {normalBookings.map((b, idx) => (
            <div
              key={b.bookingId || b._id || idx}
              style={{
                background: '#fff',
                borderRadius: 16,
                border: '1px solid var(--light-bg)',
                padding: 12,
                boxShadow: '0 12px 30px rgba(0,59,54,0.08)',
              }}
            >
              <div style={{ display: 'flex', gap: 14, alignItems: 'stretch', flexDirection: 'row' }}>
                <div>
                  <img
                    src={b.packageImage}
                    alt={b.packageTitle || 'Package'}
                    style={{
                      width: '100%',
                      height: 90,
                      objectFit: 'cover',
                      borderRadius: 14,
                      border: '1px solid var(--light-bg)',
                    }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-dark)', fontWeight: 900 }}>{b.packageTitle}</h3>
                      <div style={{ color: 'var(--text-muted)', marginTop: 6, fontWeight: 700 }}>📍 {b.destination}</div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 1000, color: 'var(--travique-gold)', fontSize: '1.2rem' }}>
                        {formatINR(b.totalAmount)}
                      </div>
                      <div
                        style={{
                          marginTop: 6,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '6px 10px',
                          borderRadius: 999,
                          border: '1px solid rgba(0,95,91,0.18)',
                          background: 'rgba(0,95,91,0.06)',
                          color: 'var(--primary)',
                          fontWeight: 900,
                          fontSize: '0.82rem',
                        }}
                      >
                        ✅ Confirmed
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>
                      📅 {b.travelDate ? new Date(b.travelDate).toLocaleDateString('en-IN') : '—'}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>👥 {b.numberOfTravelers ?? '—'} Travelers</div>
                    <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>🧾 Booking ID</div>
                    <div style={{ color: 'var(--travique-dark)', fontWeight: 1000 }}>{b.bookingId || b._id || '—'}</div>
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <Link to="/" className="btn btn-outline" style={{ fontSize: 13, padding: '7px 12px', textDecoration: 'none' }}>
                      Browse More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Custom trip requests */}
          {visibleCustom.map((t, idx) => (
            <div
              key={t._id || t.customTripId || idx}
              style={{
                background: '#fff',
                borderRadius: 16,
                border: '1px solid var(--light-bg)',
                padding: 12,
                boxShadow: '0 12px 30px rgba(0,59,54,0.08)',
              }}
            >
              <div style={{ display: 'flex', gap: 14, alignItems: 'stretch', flexDirection: 'row' }}>
                <div>
                  <img
                    src={t.packageImage || t.coverImage || t.thumbnail || '/images/group_pic.jpg'}
                    alt="Custom Trip"
                    style={{ width: '100%', height: 90, objectFit: 'cover', borderRadius: 14, border: '1px solid var(--light-bg)' }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-dark)', fontWeight: 900 }}>Custom Trip</h3>
                      <div style={{ color: 'var(--text-muted)', marginTop: 6, fontWeight: 700 }}>📍 {t.destination || '—'}</div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <Badge>Custom Trip</Badge>
                    </div>
                  </div>

                  <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>
                      📅 {t.travelDate ? new Date(t.travelDate).toLocaleDateString('en-IN') : '—'}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>👥 {t.numberOfTravelers ?? '—'} Travelers</div>
                    <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>🧾 Request ID</div>
                    <div style={{ color: 'var(--travique-dark)', fontWeight: 1000 }}>{t._id || '—'}</div>
                  </div>

                  <div style={{ marginTop: 10 }}>
                    <StatusBadge status={t.status || 'Pending Review'} />
                  </div>

                  <div style={{ marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <Link
                      to={`/custom-trip/${t._id}`}
                      className="btn btn-primary"
                      style={{ fontSize: 13, padding: '7px 12px', textDecoration: 'none' }}
                    >
                      View Details
                    </Link>
                    {t.status && ['Accepted', 'Cancelled', 'Rejected'].includes(t.status) ? (
                      <span
                        style={{
                          alignSelf: 'center',
                          padding: '6px 10px',
                          borderRadius: 999,
                          border: '1px solid rgba(0,95,91,0.18)',
                          background: 'rgba(0,95,91,0.06)',
                          color: 'var(--primary)',
                          fontWeight: 900,
                          fontSize: '0.82rem',
                        }}
                      >
                        ✅ Updated
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

