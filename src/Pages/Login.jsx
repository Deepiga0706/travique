import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getUsers(){
  try{ return JSON.parse(localStorage.getItem('travique_users')||'[]') }catch(e){return[]}
}

export default function Login(){
  const [form,setForm] = useState({email:'',password:''});
  const [err,setErr] = useState('');
  const navigate = useNavigate();

  function onSubmit(e){
    e.preventDefault();
    if(!form.email||!form.password){ setErr('Please fill both fields.'); return }
    const users = getUsers();
    const user = users.find(u=>u.email.toLowerCase()===form.email.toLowerCase() && u.password===form.password);
    if(!user){ setErr('Invalid credentials.'); return }
    localStorage.setItem('travique_current_user', JSON.stringify(user));
    window.dispatchEvent(new Event('travique-auth'));
    navigate('/');
  }

  return (
    <div className="page auth-page">
      <div className="container" style={{padding:'80px 20px',maxWidth:720}}>
        <div className="auth-card">
          <h2>Sign in to your account</h2>
          <p className="muted">Access your profile, bookings and exclusive offers.</p>
          <form onSubmit={onSubmit} className="auth-form">
            {err && <div className="auth-error">{err}</div>}
            <label>Email Address</label>
            <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />

            <label>Password</label>
            <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />

            <button className="btn btn-primary" type="submit">Login</button>
          </form>

          <div className="auth-footer">Don't have an account? <button className="link-btn" onClick={()=>navigate('/signup')}>Sign Up</button></div>
        </div>
      </div>
    </div>
  )
}
