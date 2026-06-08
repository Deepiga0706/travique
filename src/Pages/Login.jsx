import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";



export default function Login({ onAuth }){
  const [form,setForm] = useState({email:'',password:''});
  const [err,setErr] = useState('');
  const navigate = useNavigate();

 async function onSubmit(e){
  e.preventDefault();

  if(!form.email || !form.password){
    setErr("Please fill both fields.");
    return;
  }

  try{

    const response = await axios.post(
      "http://localhost:5000/api/user/login",
      {
        email: form.email,
        password: form.password
      }
    );

    localStorage.setItem(
      "token",
      response.data.token
    );

    localStorage.setItem(
      "travique_current_user",
      JSON.stringify(response.data.user)
    );

    if(typeof onAuth === "function"){
      onAuth(response.data.user);
    }

    if (response.data.user?.role === "admin") {
  navigate("/admin");
} else {
  navigate("/");
}

  }catch(error){

    setErr(
      error.response?.data?.message ||
      "Login failed"
    );

  }
}

  useEffect(()=>{ setErr('') }, [form])

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
