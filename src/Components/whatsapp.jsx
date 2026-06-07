import { useState } from "react";
import packagesData from "../data/packages";

// Provide data used by the preview widget: list of packages and unique destinations
const PACKAGES = packagesData || [];
const DESTINATIONS = Array.from(new Set(PACKAGES.map(p => p.destination).filter(Boolean)));

function EnquireModal({ onClose }) {
  const [form, setForm] = useState({ name:"", phone:"", email:"", destination:"", travelDate:"", travelers:"2", message:"" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState("");
  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
  const inp = (name) => ({ padding:"10px 12px", border:`1.5px solid ${focused===name?"#1a3c2e":"#e0e0e0"}`, borderRadius:8, fontSize:14, color:"#222", outline:"none", width:"100%", boxSizing:"border-box" });

  return (
    <div onClick={(e) => e.target===e.currentTarget && onClose()} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", backdropFilter:"blur(3px)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ background:"#fff", borderRadius:16, width:"100%", maxWidth:520, boxShadow:"0 20px 60px rgba(0,0,0,0.3)", overflow:"hidden" }}>
        <div style={{ background:"linear-gradient(135deg,#1a3c2e,#2d6a4f)", padding:"24px 28px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:20, fontWeight:700, color:"#fff" }}>✈️ Plan Your Dream Trip</div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,0.7)", marginTop:4 }}>We'll get back to you within 2 hours</div>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.15)", border:"none", color:"#fff", width:32, height:32, borderRadius:"50%", cursor:"pointer", fontSize:18 }}>✕</button>
        </div>
        <div style={{ padding:"24px 28px" }}>
          {submitted ? (
            <div style={{ textAlign:"center", padding:"40px 20px" }}>
              <div style={{ fontSize:52, marginBottom:12 }}>🎉</div>
              <div style={{ fontSize:20, fontWeight:700, color:"#1a3c2e", marginBottom:8 }}>Enquiry Sent!</div>
              <div style={{ fontSize:14, color:"#666" }}>Our team will contact you shortly on <strong>{form.phone}</strong>.<br/>You can also WhatsApp us for a faster response or email <a href="mailto:mailtravique@gmail.com">mailtravique@gmail.com</a>.</div>
              <button onClick={onClose} style={{ marginTop:20, width:"100%", padding:13, background:"linear-gradient(135deg,#e6b800,#f5d000)", border:"none", borderRadius:8, cursor:"pointer", fontSize:15, fontWeight:700, color:"#1a3c2e" }}>Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display:"flex", gap:14, marginBottom:14 }}>
                <div style={{ flex:1 }}>
                  <label style={{ fontSize:12, fontWeight:600, color:"#444", textTransform:"uppercase", letterSpacing:0.5, display:"block", marginBottom:5 }}>Full Name *</label>
                  <input required name="name" placeholder="Your name" value={form.name} onChange={handleChange} style={inp("name")} onFocus={()=>setFocused("name")} onBlur={()=>setFocused("")} />
                </div>
                <div style={{ flex:1 }}>
                  <label style={{ fontSize:12, fontWeight:600, color:"#444", textTransform:"uppercase", letterSpacing:0.5, display:"block", marginBottom:5 }}>Phone *</label>
                  <input required name="phone" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} style={inp("phone")} onFocus={()=>setFocused("phone")} onBlur={()=>setFocused("")} />
                </div>
              </div>
              <div style={{ marginBottom:14 }}>
                <label style={{ fontSize:12, fontWeight:600, color:"#444", textTransform:"uppercase", letterSpacing:0.5, display:"block", marginBottom:5 }}>Email</label>
                <input name="email" placeholder="your@email.com" type="email" value={form.email} onChange={handleChange} style={inp("email")} onFocus={()=>setFocused("email")} onBlur={()=>setFocused("")} />
              </div>
              <div style={{ display:"flex", gap:14, marginBottom:14 }}>
                <div style={{ flex:1 }}>
                  <label style={{ fontSize:12, fontWeight:600, color:"#444", textTransform:"uppercase", letterSpacing:0.5, display:"block", marginBottom:5 }}>Destination</label>
                  <select name="destination" value={form.destination} onChange={handleChange} style={{ padding:"10px 12px", border:"1.5px solid #e0e0e0", borderRadius:8, fontSize:14, color:"#222", background:"#fff", width:"100%", boxSizing:"border-box" }}>
                    <option value="">Select destination</option>
                    {DESTINATIONS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div style={{ flex:1 }}>
                  <label style={{ fontSize:12, fontWeight:600, color:"#444", textTransform:"uppercase", letterSpacing:0.5, display:"block", marginBottom:5 }}>Travel Month</label>
                  <input name="travelDate" type="month" value={form.travelDate} onChange={handleChange} style={inp("date")} onFocus={()=>setFocused("date")} onBlur={()=>setFocused("")} />
                </div>
              </div>
              <div style={{ marginBottom:14 }}>
                <label style={{ fontSize:12, fontWeight:600, color:"#444", textTransform:"uppercase", letterSpacing:0.5, display:"block", marginBottom:5 }}>No. of Travelers</label>
                <select name="travelers" value={form.travelers} onChange={handleChange} style={{ padding:"10px 12px", border:"1.5px solid #e0e0e0", borderRadius:8, fontSize:14, color:"#222", background:"#fff", width:"100%", boxSizing:"border-box" }}>
                  {["1","2","3","4","5","6","7","8","9","10+"].map(n => <option key={n} value={n}>{n} {n==="1"?"Person":"People"}</option>)}
                </select>
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={{ fontSize:12, fontWeight:600, color:"#444", textTransform:"uppercase", letterSpacing:0.5, display:"block", marginBottom:5 }}>Message (Optional)</label>
                <textarea name="message" placeholder="Tell us your preferences, budget, special requests..." value={form.message} onChange={handleChange} style={{ padding:"10px 12px", border:`1.5px solid ${focused==="msg"?"#1a3c2e":"#e0e0e0"}`, borderRadius:8, fontSize:14, color:"#222", outline:"none", resize:"vertical", minHeight:80, fontFamily:"inherit", width:"100%", boxSizing:"border-box" }} onFocus={()=>setFocused("msg")} onBlur={()=>setFocused("")} />
              </div>
              <button type="submit" style={{ width:"100%", padding:13, background:"linear-gradient(135deg,#e6b800,#f5d000)", border:"none", borderRadius:8, cursor:"pointer", fontSize:15, fontWeight:700, color:"#1a3c2e", letterSpacing:1 }}>
                🚀 Send Enquiry — We'll Call You Back!
              </button>
              <p style={{ textAlign:"center", fontSize:12, color:"#999", marginTop:10, margin:"10px 0 0" }}>Or WhatsApp us or email <a href="mailto:mailtravique@gmail.com">mailtravique@gmail.com</a> for instant response</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function PackageCards() {
  const [offset, setOffset] = useState(0);
  const cardW = 236;
  const maxOffset = Math.max(0, PACKAGES.length - 4);
  const prev = () => setOffset(o => Math.max(0, o-1));
  const next = () => setOffset(o => Math.min(maxOffset, o+1));

  return (
    <div style={{ maxWidth:1200, margin:"0 auto 60px" }}>
      <div style={{ fontSize:13, fontWeight:600, letterSpacing:2, color:"#e6b800", textTransform:"uppercase", marginBottom:6 }}>Travique Premium</div>
      <div style={{ fontSize:32, fontWeight:700, color:"#1a3c2e", marginBottom:24 }}>GT Premium Group Tours</div>
      <div style={{ position:"relative", overflow:"hidden" }}>
        {offset > 0 && <button onClick={prev} style={{ position:"absolute", left:-20, top:"45%", transform:"translateY(-50%)", background:"#fff", border:"none", borderRadius:"50%", width:40, height:40, fontSize:20, cursor:"pointer", boxShadow:"0 2px 12px rgba(0,0,0,0.2)", zIndex:10, color:"#1a3c2e", fontWeight:700 }}>‹</button>}
        <div style={{ display:"flex", gap:16, transition:"transform 0.4s ease", transform:`translateX(-${offset*cardW}px)` }}>
          {PACKAGES.map(pkg => (
            <div key={pkg.id} style={{ flex:"0 0 220px", borderRadius:12, overflow:"hidden", position:"relative", cursor:"pointer", boxShadow:"0 4px 20px rgba(0,0,0,0.15)" }}>
              <img src={pkg.image} alt={pkg.title} style={{ width:"100%", height:280, objectFit:"cover", display:"block" }} />
              <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(to top,#e6b800 0%,#f5d000 70%,transparent 100%)", padding:"40px 14px 14px" }}>
                <div style={{ fontSize:9, fontWeight:700, color:"#1a3c2e", textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>{pkg.tag}</div>
                <div style={{ fontSize:10, fontWeight:700, color:"#1a3c2e", textTransform:"uppercase", marginBottom:4 }}>{pkg.nights} Nights {pkg.days} Days</div>
                <div style={{ fontSize:14, fontWeight:900, color:"#1a3c2e", textTransform:"uppercase", lineHeight:1.3, marginBottom:6 }}>{pkg.title}</div>
                <div style={{ fontSize:8, fontWeight:700, color:"#1a3c2e", textTransform:"uppercase", letterSpacing:0.5, borderTop:"1px solid rgba(26,60,46,0.2)", paddingTop:6 }}>Book It Right Now · Limited Seats Only</div>
              </div>
            </div>
          ))}
        </div>
        {offset < maxOffset && <button onClick={next} style={{ position:"absolute", right:-20, top:"45%", transform:"translateY(-50%)", background:"#fff", border:"none", borderRadius:"50%", width:40, height:40, fontSize:20, cursor:"pointer", boxShadow:"0 2px 12px rgba(0,0,0,0.2)", zIndex:10, color:"#1a3c2e", fontWeight:700 }}>›</button>}
      </div>
      <button style={{ display:"block", margin:"24px auto 0", background:"#e6b800", color:"#1a3c2e", border:"none", padding:"12px 40px", fontWeight:700, fontSize:13, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", borderRadius:4 }}>Know More</button>
    </div>
  );
}

export default function TraviquComponents() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div style={{ fontFamily:"'Segoe UI',sans-serif", background:"#f5f5f5", minHeight:"100vh", padding:"40px 20px", position:"relative" }}>
      <style>{`@keyframes pulse{0%,100%{box-shadow:0 4px 20px rgba(37,211,102,0.5)}50%{box-shadow:0 4px 32px rgba(37,211,102,0.9)}}`}</style>
      <div style={{ textAlign:"center", marginBottom:48 }}>
        <h1 style={{ color:"#1a3c2e", fontSize:28, fontWeight:800, margin:0 }}>Trav<span style={{ color:"#e6b800" }}>ique</span></h1>
        <p style={{ color:"#888", fontSize:14, margin:"6px 0 0" }}>Component preview — Package Cards · Enquire Modal · WhatsApp Float</p>
      </div>
      <PackageCards />
     
      <div style={{ position:"fixed", bottom:28, right:24, zIndex:999 }}>
        <button onClick={() => setShowModal(true)} style={{ background:"linear-gradient(135deg,#e6b800,#f5d000)", color:"#1a3c2e", border:"none", borderRadius:8, padding:"14px 22px", fontWeight:700, fontSize:14, cursor:"pointer", boxShadow:"0 4px 20px rgba(230,184,0,0.5)", letterSpacing:0.5 }}>📋 ENQUIRE NOW</button>
      </div>
      {showModal && <EnquireModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

// Reusable widget for including on every page: WhatsApp floating button + Enquire CTA
export function WhatsAppWidget({ phone = "917812896197" }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <style>{`@keyframes pulse{0%,100%{box-shadow:0 4px 20px rgba(37,211,102,0.5)}50%{box-shadow:0 4px 32px rgba(37,211,102,0.9)}}`}</style>

      <div style={{ position:"fixed", bottom:28, right:24, zIndex:999 }}>
        <button onClick={() => setShowModal(true)} style={{ background:"linear-gradient(135deg,#e6b800,#f5d000)", color:"#1a3c2e", border:"none", borderRadius:8, padding:"14px 22px", fontWeight:700, fontSize:14, cursor:"pointer", boxShadow:"0 4px 20px rgba(230,184,0,0.5)", letterSpacing:0.5 }}>📋 ENQUIRE NOW</button>
      </div>
      {showModal && <EnquireModal onClose={() => setShowModal(false)} />}
    </>
  );
}
