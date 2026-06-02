import React from 'react';

export default function Profile(){
  const user = (()=>{ try{ return JSON.parse(localStorage.getItem('travique_current_user')||'null') }catch(e){return null} })();
  if(!user) return (<div className="container" style={{padding:80}}>Please login to view your profile.</div>);
  return (
    <div className="container" style={{padding:80}}>
      <h2>My Profile</h2>
      <div style={{background:'#fff',padding:18,borderRadius:12,boxShadow:'0 8px 30px rgba(2,38,35,0.06)'}}> 
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>
    </div>
  )
}
