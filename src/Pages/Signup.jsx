import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getUsers(){
  try{ return JSON.parse(localStorage.getItem('travique_users')||'[]') }catch(e){return[]}
}

export default function Signup(){
  const [form,setForm] = useState({name:'',email:'',phone:'',password:'',confirm:''});
  const [err,setErr] = useState('');
  const navigate = useNavigate();

  function validate(){
    if(!form.name||!form.email||!form.phone||!form.password||!form.confirm) return 'Please fill all fields.';
    const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if(!emailRe.test(form.email)) return 'Enter a valid email.';
    if(form.password.length < 6) return 'Password must be at least 6 characters.';
    if(form.password !== form.confirm) return 'Passwords do not match.';
    if(!/^\d{6,15}$/.test(form.phone)) return 'Enter a valid phone number.';
    return '';
  }

  function onSubmit(e){
    e.preventDefault();
    const v = validate();
    if(v){ setErr(v); return }

    const users = getUsers();
    if(users.find(u=>u.email.toLowerCase()===form.email.toLowerCase())){
      setErr('An account with this email already exists.');
      return;
    }

    const user = {name: form.name, email: form.email.toLowerCase(), phone: form.phone, password: form.password};
    users.push(user);
    localStorage.setItem('travique_users', JSON.stringify(users));
    localStorage.setItem('travique_current_user', JSON.stringify(user));
    window.dispatchEvent(new Event('travique-auth'));
    navigate('/');
  }

  return (
    <div className="page auth-page">
      <div className="container" style={{padding:'80px 20px',maxWidth:720}}>
        <div className="auth-card">
          <h2>Create an account</h2>
          <p className="muted">Join Travique to manage bookings and get personalised offers.</p>
          <form onSubmit={onSubmit} className="auth-form">
            {err && <div className="auth-error">{err}</div>}
            <label>Full Name</label>
            <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />

            <label>Email Address</label>
            <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />

            <label>Phone Number</label>
            <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />

            <label>Password</label>
            <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />

            <label>Confirm Password</label>
            <input type="password" value={form.confirm} onChange={e=>setForm({...form,confirm:e.target.value})} />

            <button className="btn btn-primary" type="submit">Sign Up</button>
          </form>

          <div className="auth-footer">Already have an account? <button className="link-btn" onClick={()=>navigate('/login')}>Login</button></div>
        </div>
      </div>
    </div>
  )
}
