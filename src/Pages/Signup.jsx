import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export default function Signup({ onAuth }){
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
async function onSubmit(e){
  e.preventDefault();

  const v = validate();

  if(v){
    setErr(v);
    return;
  }

  try {
    console.log("API URL:", process.env.REACT_APP_API_URL);
    await axios.post(
     `${process.env.REACT_APP_API_URL}/api/user/signup`,
      {
        firstname: form.name,
        lastname: "",
        email: form.email.toLowerCase(),
        phone: form.phone,
        password: form.password,
        confirmpassword: form.confirm
      }
    );

    navigate("/login");

  } catch(error) {

    setErr(
      error.response?.data?.message ||
      "Signup failed"
    );

  }
}




  useEffect(()=>{ setErr('') }, [form])

  return (
    <div className="page" style={{background:'var(--light-bg)',minHeight:'100vh'}}>
      <div className="container" style={{padding:'80px 20px',maxWidth:720,margin:'0 auto'}}>
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
};
