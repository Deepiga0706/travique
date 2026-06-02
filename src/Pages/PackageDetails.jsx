import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import packages from '../data/packages';

function ItineraryItem({it}){
  const [open,setOpen] = useState(false);
  return (
    <div className="itinerary-item">
      <button className="itinerary-toggle" onClick={()=>setOpen(o=>!o)}>
        <strong>Day {it.day} – {it.title}</strong>
        <span>{open ? '−' : '+'}</span>
      </button>
      {open && <div className="itinerary-body">{it.details}</div>}
    </div>
  )
}

export default function PackageDetails(){
  const { id } = useParams();
  const pkg = packages.find(p=>p.id===id);
  if(!pkg) return <div className="container" style={{padding:80}}>Package not found.</div>

  return (
    <div className="package-page">
      <div style={{height:360,backgroundImage:`url(${pkg.image})`,backgroundSize:'cover',backgroundPosition:'center'}} />
      <div className="container" style={{padding:24,maxWidth:1000}}>
        <h2>{pkg.title}</h2>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
          <div className="muted">{pkg.duration} • {pkg.destination}</div>
          <div className="price" style={{fontSize:18,fontWeight:800}}>{pkg.price}</div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:20,marginTop:18}}>
          <div>
            <h4>Overview</h4>
            <p className="muted">{pkg.description}</p>

            <h4 style={{marginTop:16}}>Inclusions</h4>
            <ul>{pkg.inclusions.map((i,idx)=>(<li key={idx}>{i}</li>))}</ul>

            <h4 style={{marginTop:12}}>Exclusions</h4>
            <ul>{pkg.exclusions.map((i,idx)=>(<li key={idx}>{i}</li>))}</ul>

            <h4 style={{marginTop:12}}>Highlights</h4>
            <ul>{pkg.highlights.map((h,idx)=>(<li key={idx}>{h}</li>))}</ul>

            <h4 style={{marginTop:18}}>Itinerary</h4>
            <div className="itinerary-list">
              {pkg.itinerary.map(it=> <ItineraryItem key={it.day} it={it} />)}
            </div>
          </div>

          <aside style={{background:'#fff',padding:18,borderRadius:12,boxShadow:'0 8px 30px rgba(2,38,35,0.06)'}}>
            <h4>Book This Package</h4>
            <p className="muted">{pkg.duration}</p>
            <div style={{fontSize:18,fontWeight:800,margin:'12px 0'}}>{pkg.price}</div>
            <button className="btn btn-primary">Book Now</button>
          </aside>
        </div>
      </div>
    </div>
  )
}
