import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import StatusBadge from '../Components/StatusBadge';
import { getCustomTripDetails } from '../services/customTrips';

export default function CustomTripDetails() {
  const { id } = useParams();
  const titleId = useMemo(() => 'customTripDetailsTitle', []);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getCustomTripDetails(id);
        if (!mounted) return;
        // Backend returns { success: true, trip: { ...fields } }
        const payload = res.data || res;
        setData(payload.trip || payload.customTrip || payload.request || payload);
      } catch (e) {
        if (!mounted) return;
        setErr(e?.response?.data?.message || 'Failed to load request');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="page" style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
        <div className="container" style={{ padding: '80px 20px' }}>
          <h2 id={titleId} style={{ color: 'var(--primary)' }}>
            Loading...
          </h2>
        </div>
        <Footer />
      </div>
    );
  }

  if (err) {
    return (
      <div className="page" style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
        <div className="container" style={{ padding: '80px 20px' }}>
          <h2 style={{ color: 'var(--primary)' }}>Unable to load request</h2>
          <p className="muted">{err}</p>
          <Link to="/bookings" className="btn btn-outline">
            Back to My Bookings
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const req = data?.fullName ? data : (data?.customTrip || data?.request || data);

  return (
    <div className="page" style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
      <div className="container" style={{ padding: '80px 20px' }}>
        <h2 id={titleId} style={{ color: 'var(--primary)' }}>
          Custom Trip Request
        </h2>

        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            border: '1px solid var(--light-bg)',
            padding: 16,
            boxShadow: '0 12px 30px rgba(0,59,54,0.08)',
            marginTop: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div style={{ fontWeight: 1000, fontSize: '1.2rem', color: 'var(--text-dark)' }}>
                {req?.destination || '—'}
              </div>
              <div style={{ color: 'var(--text-muted)', marginTop: 6, fontWeight: 700 }}>
                📅 {req?.travelDate ? new Date(req.travelDate).toLocaleDateString('en-IN') : '—'}
              </div>
            </div>
            <StatusBadge status={req?.status || 'Pending Review'} />
          </div>

          <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Full Name</div>
              <div style={{ fontWeight: 1000 }}>{req?.fullName || '—'}</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Email</div>
              <div style={{ fontWeight: 1000 }}>{req?.email || '—'}</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Phone</div>
              <div style={{ fontWeight: 1000 }}>{req?.phoneNumber || '—'}</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Travelers</div>
              <div style={{ fontWeight: 1000 }}>{req?.numberOfTravelers ?? '—'}</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Budget</div>
              <div style={{ fontWeight: 1000 }}>{req?.budgetRange || '—'}</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Accommodation</div>
              <div style={{ fontWeight: 1000 }}>{req?.accommodationPreference || '—'}</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Mode of Travel</div>
              <div style={{ fontWeight: 1000 }}>{req?.modeOfTravel || '—'}</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Interests</div>
              <div style={{ fontWeight: 1000 }}>
                {Array.isArray(req?.travelInterests)
                  ? req.travelInterests.join(', ')
                  : req?.travelInterests || '—'}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Additional Requirements</div>
            <div style={{ marginTop: 6, fontWeight: 800, color: 'var(--text-dark)' }}>{req?.additionalRequirements || '—'}</div>
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <Link to="/bookings" className="btn btn-outline" style={{ textDecoration: 'none' }}>
            Back to My Bookings
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

