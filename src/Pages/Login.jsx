import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export default function Login({ onAuth }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  // Forgot password state
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMsg, setResetMsg] = useState('');
  const [resetErr, setResetErr] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password) { setErr("Please fill both fields."); return; }
    try {

      const response = await axios.post("http://localhost:5000/api/user/login", {
        email: form.email,
        password: form.password
      });

console.log("LOGIN RESPONSE:", response.data.user);
      localStorage.setItem("token", response.data.token);
      const oldUser =
  JSON.parse(localStorage.getItem("travique_current_user")) || {};

const mergedUser = {
  ...oldUser,
  ...response.data.user
};

localStorage.setItem(
  "travique_current_user",
  JSON.stringify(mergedUser)
);
      if (typeof onAuth === "function") onAuth(response.data.user);
      if (response.data.user?.role?.toLowerCase() === "admin") navigate("/admin");
      else navigate("/");
    } catch (error) {
      setErr(error.response?.data?.message || "Login failed");
    }
  }

  async function onResetSubmit(e) {
    e.preventDefault();
    if (!resetEmail) { setResetErr("Please enter your email address."); return; }
    setResetLoading(true);
    setResetErr('');
    try {
      await axios.post("http://localhost:5000/api/user/forgot-password", { email: resetEmail });
      setResetMsg("Password reset link sent! Check your email inbox.");
    } catch (error) {
      setResetErr(error.response?.data?.message || "Failed to send reset email. Please try again.");
    } finally {
      setResetLoading(false);
    }
  }

  useEffect(() => { setErr(''); }, [form]);
  useEffect(() => { setResetMsg(''); setResetErr(''); }, [resetEmail]);

  return (
    <div style={{ background: '#ECEEEF', minHeight: '100vh' }}>
      <div style={{ padding: '80px 20px', maxWidth: 480, margin: '0 auto' }}>
        <div className="auth-card">
          <h2 style={{ color: '#003B36', marginBottom: 4 }}>Sign in to your account</h2>
          <p className="muted">Access your profile, bookings and exclusive offers.</p>

          <form onSubmit={onSubmit} className="auth-form">
            {err && <div className="auth-error">{err}</div>}

            <label>Email Address</label>
            <input
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
              <label style={{ margin: 0 }}>Password</label>
              <button
                type="button"
                className="link-btn"
                style={{ fontSize: '0.85rem' }}
                onClick={() => { setShowForgot(true); setResetMsg(''); setResetErr(''); setResetEmail(''); }}
              >
                Forgot password?
              </button>
            </div>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
            />

            <button className="btn btn-primary" type="submit" style={{ marginTop: 6 }}>Login</button>
          </form>

          <div className="auth-footer">
            Don't have an account?{' '}
            <button className="link-btn" onClick={() => navigate('/signup')}>Sign Up</button>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}
          onClick={() => setShowForgot(false)}
        >
          <div
            style={{ background: '#fff', borderRadius: 14, padding: 28, maxWidth: 420, width: '100%', boxShadow: '0 20px 50px rgba(0,59,54,0.18)' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, color: '#003B36' }}>Reset Password</h3>
              <button
                onClick={() => setShowForgot(false)}
                style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#6B7280', lineHeight: 1 }}
              >✕</button>
            </div>

            <p className="muted" style={{ marginBottom: 16 }}>
              Enter your registered email address and we'll send you a link to reset your password.
            </p>

            {resetMsg ? (
              <div style={{ background: '#d1fae5', color: '#065f46', padding: '12px 14px', borderRadius: 8, fontWeight: 600 }}>
                ✅ {resetMsg}
              </div>
            ) : (
              <form onSubmit={onResetSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {resetErr && <div className="auth-error">{resetErr}</div>}
                <input
                  value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={{ padding: 12, borderRadius: 8, border: '1px solid #ECEEEF', outline: 'none', fontSize: '0.95rem' }}
                />
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={resetLoading}
                  style={{ opacity: resetLoading ? 0.7 : 1 }}
                >
                  {resetLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
