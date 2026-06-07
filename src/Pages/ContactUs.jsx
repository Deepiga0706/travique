import React from 'react';

export default function ContactUs() {
  return (
    <div className="page contact-page">
      <div className="container" style={{padding:'80px 20px'}}>
        <h1>Contact Travique</h1>
        <p className="muted">Reach our concierge team for bespoke itineraries and enquiries.</p>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginTop:24}}>
          <div>
            <h3>Contact Information</h3>
            <p>Email: <a href="mailto:mailtravique@gmail.com">mailtravique@gmail.com</a></p>
            <p>Phone: +91 98765 43210</p>
            <p>Address: Mumbai, India</p>
          </div>
          <form style={{background:'#fff',padding:18,borderRadius:12,boxShadow:'0 8px 30px rgba(2,38,35,0.06)'}} onSubmit={e=>e.preventDefault()}>
            <label>Name</label>
            <input style={{width:'100%',padding:10,marginTop:8,borderRadius:8,border:'1px solid #e5e7eb'}} />
            <label style={{marginTop:12,display:'block'}}>Email</label>
            <input style={{width:'100%',padding:10,marginTop:8,borderRadius:8,border:'1px solid #e5e7eb'}} />
            <label style={{marginTop:12,display:'block'}}>Message</label>
            <textarea style={{width:'100%',padding:10,marginTop:8,borderRadius:8,border:'1px solid #e5e7eb',minHeight:120}} />
            <button className="btn btn-primary" style={{marginTop:12}}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
