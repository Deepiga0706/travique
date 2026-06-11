import React, { useEffect, useMemo, useState } from 'react';
import '../styles/Profile.css';

function safeParse(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function Profile() {
  const user = useMemo(() => safeParse('travique_current_user'), []);

  const [toast, setToast] = useState(null);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  // Local profile state (edit mode)
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(() => ({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  }));

  useEffect(() => {
    setForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
  }, [user]);

  // Profile picture (avatar)
  const [avatarUrl, setAvatarUrl] = useState(() => user?.avatarUrl || '');
  useEffect(() => {
    setAvatarUrl(user?.avatarUrl || '');
  }, [user]);

  // Preferences
  const [prefs, setPrefs] = useState(() => ({
    emailUpdates: user?.preferences?.emailUpdates ?? true,
    whatsappUpdates: user?.preferences?.whatsappUpdates ?? false,
  }));

  // Bookings
  const bookings = useMemo(() => {
    // Expected key(s) if backend wiring exists later.
    return (
      safeParse('travique_my_bookings') ||
      safeParse('travique_bookings') ||
      []
    );
  }, []);

  const myTrips = useMemo(() => {
    if (!bookings?.length) return [];
    const email = user?.email;
    if (!email) return bookings;
    // Allow both schemas: booking.userEmail or booking.customerEmail
    return bookings.filter(
      (b) => b?.userEmail === email || b?.customerEmail === email
    );
  }, [bookings, user?.email]);

  const kpis = useMemo(() => {
    const total = myTrips.length;
    const confirmed = myTrips.filter((t) => (t.status || '').toLowerCase() === 'confirmed').length;
    const pending = myTrips.filter((t) => (t.status || '').toLowerCase() === 'pending').length;
    return { total, confirmed, pending };
  }, [myTrips]);

  const avatarInitial = useMemo(() => {
    const n = (form.name || user?.name || '').trim();
    if (!n) return '?';
    return n[0].toUpperCase();
  }, [form.name, user?.name]);

  function validateProfile(next) {
    if (!next.name?.trim()) return 'Name is required.';
    if (!next.email?.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(next.email)) return 'Enter a valid email.';
    if (!next.phone?.trim() || !/^\d{6,15}$/.test(next.phone.replace(/\s/g, ''))) return 'Enter a valid phone number (6-15 digits).';
    return '';
  }

  function onSaveProfile(e) {
    e.preventDefault();
    const next = {
      ...user,
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      avatarUrl,
      preferences: {
        emailUpdates: prefs.emailUpdates,
        whatsappUpdates: prefs.whatsappUpdates,
      },
    };

    const err = validateProfile(next);
    if (err) {
      setToast({ type: 'error', msg: err });
      return;
    }

    localStorage.setItem('travique_current_user', JSON.stringify(next));
    setEditMode(false);
    setToast({ type: 'success', msg: 'Profile updated successfully.' });
  }

  if (!user) {
    return (
      <div className="container profile-page">
        <div style={{ padding: 80 }}>Please login to view your profile.</div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      <div className="profile-layout">
        {/* LEFT: Summary + Trips */}
        <section className="profile-card">
          <div className="profile-card-inner">
            <div className="profile-top">
              <div className="profile-avatar" aria-label="Profile avatar">
                {avatarUrl ? <img src={avatarUrl} alt="Avatar" /> : avatarInitial}
              </div>

              <div className="profile-title">
                <h2>{form.name || user.firstname ? `${user.firstname || ''} ${user.lastname || ''}`.trim() : user.name || user.email?.split('@')[0]}</h2>
                <p>{user.email}</p>
                {user.phone && <p style={{ marginTop: 2 }}>{user.phone}</p>}
                <p style={{ marginTop: 4, fontSize: 11, color: 'var(--profile-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                  Member since {user.createdAt ? new Date(user.createdAt).getFullYear() : 'Travique'}
                </p>
              </div>
            </div>

            <div className="kpi-grid">
              <div className="kpi">
                <div className="kpi-label">Trips</div>
                <div className="kpi-value">{kpis.total}</div>
              </div>
              <div className="kpi">
                <div className="kpi-label">Confirmed</div>
                <div className="kpi-value">{kpis.confirmed}</div>
              </div>
              <div className="kpi">
                <div className="kpi-label">Pending</div>
                <div className="kpi-value">{kpis.pending}</div>
              </div>
              <div className="kpi">
                <div className="kpi-label">Member since</div>
                <div className="kpi-value">{user.createdAt ? new Date(user.createdAt).getFullYear() : '—'}</div>
              </div>
            </div>

            <div className="section-divider" />

            <div>
              <span className="label">My Trips</span>
              {myTrips?.length ? (
                <div className="mini-list">
                  {myTrips.slice(0, 6).map((t, idx) => (
                    <div className="trip-item" key={t._id || t.id || idx}>
                      <div className="trip-title">{t.packageTitle || t.package?.title || t.title || 'Trip'}</div>
                      <div className="trip-meta">
                        <span>{t.travelDate ? new Date(t.travelDate).toLocaleDateString('en-IN') : '—'}</span>
                        <span>•</span>
                        <span style={{ fontWeight: 800, color: 'var(--profile-emerald)' }}>{(t.status || 'pending').toUpperCase()}</span>
                        {t.totalAmount != null && (
                          <span>₹{Number(t.totalAmount).toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="small-subtitle">No bookings found yet. Book your next trip to see it here.</div>
              )}

              <div className="actions" style={{ justifyContent: 'flex-start', marginTop: 14 }}>
                <button
                  className="btn-outline"
                  type="button"
                  onClick={() => {
                    const payload = {
                      user: safeParse('travique_current_user'),
                      bookings: safeParse('travique_my_bookings') || safeParse('travique_bookings') || [],
                    };
                    downloadJson('travique-my-data.json', payload);
                  }}
                >
                  Download my data
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT: Edit profile + Preferences + Security */}
        <section className="profile-card">
          <div className="profile-card-inner">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <span className="label">Account</span>
                <div className="small-subtitle">Edit your details and preferences.</div>
              </div>

              <div className="actions" style={{ marginTop: 0 }}>
                <button
                  type="button"
                  className="btn-gold"
                  onClick={() => setEditMode((v) => !v)}
                >
                  {editMode ? 'Close' : 'Edit profile'}
                </button>
              </div>
            </div>

            <div className="section-divider" style={{ margin: '18px 0' }} />

            {/* Avatar uploader */}
            <div>
              <span className="label">Profile picture</span>
              <div className="small-subtitle" style={{ marginBottom: 10 }}>
                Upload a photo (stored in localStorage for now) or keep the initial avatar.
              </div>

              <input
                className="input"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (file.size > 2_000_000) {
                    setToast({ type: 'error', msg: 'Please select an image under 2MB.' });
                    return;
                  }

                  const reader = new FileReader();
                  reader.onload = () => {
                    const url = String(reader.result || '');
                    setAvatarUrl(url);
                    setToast({ type: 'success', msg: 'Avatar ready. Save profile to apply.' });
                  };
                  reader.readAsDataURL(file);
                }}
                disabled={!editMode}
              />

              {avatarUrl && (
                <div style={{ marginTop: 10 }}>
                  <div className="small-subtitle" style={{ marginBottom: 10 }}>Preview</div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                    <div className="profile-avatar" style={{ width: 56, height: 56 }}>
                      <img src={avatarUrl} alt="Avatar preview" />
                    </div>
                    <button
                      className="btn-outline"
                      type="button"
                      disabled={!editMode}
                      onClick={() => setAvatarUrl('')}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Edit form */}
            <form onSubmit={onSaveProfile} style={{ marginTop: 18 }}>
              <div className="row">
                <div>
                  <label className="label">Full name</label>
                  <input
                    className="input"
                    value={form.name}
                    onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                    disabled={!editMode}
                  />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input
                    className="input"
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div className="row" style={{ marginTop: 12 }}>
                <div>
                  <label className="label">Phone</label>
                  <input
                    className="input"
                    value={form.phone}
                    onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                    disabled={!editMode}
                    placeholder="e.g. 9876543210"
                  />
                </div>
                <div>
                  <label className="label">Notifications</label>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      checked={prefs.emailUpdates}
                      disabled={!editMode}
                      onChange={(e) => setPrefs((p) => ({ ...p, emailUpdates: e.target.checked }))}
                    />
                    <div>
                      <div style={{ fontWeight: 800, color: 'var(--profile-emerald)' }}>Email updates</div>
                      <div className="hint">Offers & trip reminders</div>
                    </div>
                  </div>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      checked={prefs.whatsappUpdates}
                      disabled={!editMode}
                      onChange={(e) => setPrefs((p) => ({ ...p, whatsappUpdates: e.target.checked }))}
                    />
                    <div>
                      <div style={{ fontWeight: 800, color: 'var(--profile-emerald)' }}>WhatsApp updates</div>
                      <div className="hint">Only for important messages</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section-divider" style={{ margin: '18px 0' }} />

              <span className="label">Security</span>
              <div className="small-subtitle" style={{ marginBottom: 12 }}>
                Password change UI is frontend-only (placeholder). Hook it to backend when available.
              </div>

              <div className="row">
                <div>
                  <label className="label">Current password</label>
                  <input className="input" type="password" disabled={!editMode} placeholder="••••••••" />
                </div>
                <div>
                  <label className="label">New password</label>
                  <input className="input" type="password" disabled={!editMode} placeholder="Minimum 6 characters" />
                </div>
              </div>

              <div className="row" style={{ marginTop: 12 }}>
                <div>
                  <label className="label">Confirm password</label>
                  <input className="input" type="password" disabled={!editMode} placeholder="Repeat new password" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <button
                    className="btn-outline"
                    type="button"
                    disabled={!editMode}
                    onClick={() => setToast({ type: 'success', msg: 'Password change is a placeholder in this UI.' })}
                  >
                    Change password
                  </button>
                </div>
              </div>

              <div className="actions">
                <button className="btn-outline" type="button" disabled={!editMode} onClick={() => {
                  setForm({ name: user.name || '', email: user.email || '', phone: user.phone || '' });
                  setAvatarUrl(user.avatarUrl || '');
                  setPrefs({
                    emailUpdates: user?.preferences?.emailUpdates ?? true,
                    whatsappUpdates: user?.preferences?.whatsappUpdates ?? false,
                  });
                  setEditMode(false);
                  setToast({ type: 'success', msg: 'Changes discarded.' });
                }}>
                  Cancel
                </button>

                <button className="btn-gold" type="submit" disabled={!editMode}>
                  Save changes
                </button>

                <button
                  className="btn-outline"
                  type="button"
                  onClick={() => {
                    localStorage.removeItem('travique_current_user');
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/';
                  }}
                >
                  Logout
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

